import test from "node:test";
import assert from "node:assert/strict";
import { getFocusableElements } from "../src/lib/focusable-elements.ts";

function element(name, options = {}) {
  return {
    name,
    tabIndex: options.tabIndex ?? 0,
    matches: (selector) => selector === ":disabled" && Boolean(options.disabled),
    closest: () => options.excludedAncestor ? {} : null,
    getClientRects: () => options.noLayout ? [] : [{}],
    visibility: options.visibility ?? "visible",
  };
}

test("returns only visible, enabled elements that can receive focus", () => {
  const candidates = [
    element("button"),
    element("disabled", { disabled: true }),
    element("negative-tabindex", { tabIndex: -1 }),
    element("hidden-ancestor", { excludedAncestor: true }),
    element("display-none", { noLayout: true }),
    element("visibility-hidden", { visibility: "hidden" }),
    element("visibility-collapse", { visibility: "collapse" }),
    element("last-valid"),
  ];
  const originalWindow = globalThis.window;
  globalThis.window = {
    getComputedStyle: (candidate) => ({ visibility: candidate.visibility }),
  };

  try {
    const container = { querySelectorAll: () => candidates };
    assert.deepEqual(
      getFocusableElements(container).map((candidate) => candidate.name),
      ["button", "last-valid"],
    );
  } finally {
    if (originalWindow === undefined) {
      delete globalThis.window;
    } else {
      globalThis.window = originalWindow;
    }
  }
});

test("returns an empty list for a missing container", () => {
  assert.deepEqual(getFocusableElements(null), []);
});
