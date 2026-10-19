import test from "node:test";
import assert from "node:assert/strict";
import { shouldRenderFilterBar } from "../src/lib/filter-bar-state.ts";

test("does not render an empty FilterBar shell", () => {
  assert.equal(shouldRenderFilterBar(0, undefined, false), false);
  assert.equal(shouldRenderFilterBar(0, null, false), false);
  assert.equal(shouldRenderFilterBar(0, false, false), false);
  assert.equal(shouldRenderFilterBar(0, "", false), false);
});

test("renders FilterBar when options or meaningful children exist", () => {
  assert.equal(shouldRenderFilterBar(1, undefined, false), true);
  assert.equal(shouldRenderFilterBar(0, "Search", false), true);
  assert.equal(shouldRenderFilterBar(0, 0, false), true);
});

test("renders FilterBar for an active filter only when it can be cleared", () => {
  assert.equal(shouldRenderFilterBar(0, undefined, true), false);
  assert.equal(shouldRenderFilterBar(0, undefined, true, () => {}), true);
  assert.equal(shouldRenderFilterBar(0, undefined, false, () => {}), false);
});
