import assert from "node:assert/strict";
import test from "node:test";
import * as React from "react";
import { hasRenderableContent } from "../src/lib/has-renderable-content.ts";
import { acquireBodyScrollLock } from "../src/lib/body-scroll-lock.ts";
import { getFocusableElements } from "../src/lib/focusable-elements.ts";
import { filterAcceptedFiles, mergeSelectedFiles, matchesAcceptedType } from "../src/lib/file-upload.ts";

test("renderable-content detection handles empty nodes and preserves zero", () => {
  assert.equal(hasRenderableContent(null), false);
  assert.equal(hasRenderableContent(false), false);
  assert.equal(hasRenderableContent(true), false);
  assert.equal(hasRenderableContent("   "), false);
  assert.equal(hasRenderableContent([]), false);
  assert.equal(hasRenderableContent([null, false, " ", []]), false);
  assert.equal(hasRenderableContent(0), true);
  assert.equal(hasRenderableContent("text"), true);
  assert.equal(hasRenderableContent(React.createElement(React.Fragment, null, " ")), false);
  assert.equal(hasRenderableContent(React.createElement(React.Fragment, null, 0)), true);
  assert.equal(hasRenderableContent(React.createElement("span", null)), true);
});

test("body scroll lock restores the original style after the final release", () => {
  const originalDocument = globalThis.document;
  Object.defineProperty(globalThis, "document", {
    configurable: true,
    value: { body: { style: { overflow: "scroll" } } },
  });

  try {
    const releaseFirst = acquireBodyScrollLock();
    const releaseSecond = acquireBodyScrollLock();
    assert.equal(document.body.style.overflow, "hidden");

    releaseFirst();
    releaseFirst();
    assert.equal(document.body.style.overflow, "hidden");

    releaseSecond();
    assert.equal(document.body.style.overflow, "scroll");
  } finally {
    if (originalDocument === undefined) delete globalThis.document;
    else Object.defineProperty(globalThis, "document", { configurable: true, value: originalDocument });
  }
});

test("focusable-element discovery filters disabled, hidden, negative-tabindex, and invisible elements", () => {
  const originalWindow = globalThis.window;
  const makeElement = ({ disabled = false, tabIndex = 0, hidden = false, visibility = "visible", rectCount = 1 } = {}) => ({
    tabIndex,
    visibility,
    matches: (selector) => selector === ":disabled" && disabled,
    closest: () => hidden ? {} : null,
    getClientRects: () => ({ length: rectCount }),
  });

  const visible = makeElement();
  const candidates = [
    visible,
    makeElement({ disabled: true }),
    makeElement({ tabIndex: -2 }),
    makeElement({ hidden: true }),
    makeElement({ visibility: "hidden" }),
    makeElement({ rectCount: 0 }),
  ];
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: { getComputedStyle: (element) => ({ visibility: element.visibility }) },
  });

  try {
    const container = { querySelectorAll: () => candidates };
    assert.deepEqual(getFocusableElements(container), [visible]);
  } finally {
    if (originalWindow === undefined) delete globalThis.window;
    else Object.defineProperty(globalThis, "window", { configurable: true, value: originalWindow });
  }
});


test("file upload validation enforces extensions, MIME wildcards, and size limits", () => {
  const pdf = { name: "invoice.PDF", type: "application/pdf", size: 200 };
  const image = { name: "cover.png", type: "image/png", size: 1200 };
  const script = { name: "payload.js", type: "text/javascript", size: 10 };

  assert.equal(matchesAcceptedType(pdf, ".pdf, image/*"), true);
  assert.equal(matchesAcceptedType(image, ".pdf, image/*"), true);
  assert.equal(matchesAcceptedType(script, ".pdf, image/*"), false);

  const result = filterAcceptedFiles([pdf, image, script], ".pdf, image/*", 1000);
  assert.deepEqual(result.accepted, [pdf]);
  assert.equal(result.rejectedTypeCount, 1);
  assert.equal(result.rejectedSizeCount, 1);
});

test("rejected single-file uploads do not erase an existing valid selection", () => {
  const existing = { name: "good.pdf", size: 100, lastModified: 1 };
  const rejected = { name: "too-large.pdf", size: 5000, lastModified: 2 };
  assert.deepEqual(mergeSelectedFiles([existing], [], false), [existing]);
  assert.deepEqual(mergeSelectedFiles([existing], [rejected], false), [rejected]);
});

test("multiple-file uploads deduplicate both existing and incoming selections", () => {
  const existing = { name: "a.pdf", size: 100, lastModified: 1 };
  const duplicate = { name: "a.pdf", size: 100, lastModified: 1 };
  const next = { name: "b.pdf", size: 200, lastModified: 2 };
  assert.deepEqual(mergeSelectedFiles([existing], [duplicate, next, next], true), [existing, next]);
});
