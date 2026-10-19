import test from "node:test";
import assert from "node:assert/strict";
import { acquireBodyScrollLock } from "../src/lib/body-scroll-lock.ts";

test("body scroll lock is a no-op without a document", () => {
  const originalDocument = globalThis.document;
  try {
    delete globalThis.document;
    assert.doesNotThrow(() => acquireBodyScrollLock()());
  } finally {
    if (originalDocument !== undefined) {
      globalThis.document = originalDocument;
    }
  }
});

test("nested locks restore the original overflow only after the final release", () => {
  const originalDocument = globalThis.document;
  const body = { style: { overflow: "auto" } };
  globalThis.document = { body };

  try {
    const releaseFirst = acquireBodyScrollLock();
    assert.equal(body.style.overflow, "hidden");

    const releaseSecond = acquireBodyScrollLock();
    releaseFirst();
    assert.equal(body.style.overflow, "hidden");

    releaseFirst();
    assert.equal(body.style.overflow, "hidden");

    releaseSecond();
    assert.equal(body.style.overflow, "auto");
    releaseSecond();
    assert.equal(body.style.overflow, "auto");
  } finally {
    if (originalDocument === undefined) {
      delete globalThis.document;
    } else {
      globalThis.document = originalDocument;
    }
  }
});

test("body scroll lock restores an originally empty overflow value", () => {
  const originalDocument = globalThis.document;
  const body = { style: { overflow: "" } };
  globalThis.document = { body };

  try {
    acquireBodyScrollLock()();
    assert.equal(body.style.overflow, "");
  } finally {
    if (originalDocument === undefined) {
      delete globalThis.document;
    } else {
      globalThis.document = originalDocument;
    }
  }
});
