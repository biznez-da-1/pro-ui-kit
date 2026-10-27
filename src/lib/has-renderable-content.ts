import * as React from "react";

/** Returns whether a React node contains content that can meaningfully render. */
export function hasRenderableContent(node: React.ReactNode): boolean {
  if (node == null || typeof node === "boolean") return false;
  if (typeof node === "string") return node.trim().length > 0;
  if (typeof node === "number") return true;
  if (Array.isArray(node)) return node.some(hasRenderableContent);
  if (React.isValidElement(node) && node.type === React.Fragment) {
    const fragment = node as React.ReactElement<{ children?: React.ReactNode }>;
    return hasRenderableContent(fragment.props.children);
  }
  return true;
}
