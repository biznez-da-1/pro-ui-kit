import * as React from "react";

/** Returns whether a node contains a textual label rather than only decorative elements. */
export function hasTextContent(node: React.ReactNode): boolean {
  if (typeof node === "string") return node.trim().length > 0;
  if (typeof node === "number") return true;
  if (Array.isArray(node)) return node.some(hasTextContent);
  if (React.isValidElement(node)) {
    const element = node as React.ReactElement<{ children?: React.ReactNode }>;
    return hasTextContent(element.props.children);
  }
  return false;
}
