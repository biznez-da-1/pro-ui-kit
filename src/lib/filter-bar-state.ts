function hasRenderableChildren(children: unknown): boolean {
  if (children == null || typeof children === "boolean") return false;
  if (typeof children === "string") return children.trim().length > 0;
  if (typeof children === "number") return true;
  if (Array.isArray(children)) return children.some(hasRenderableChildren);

  if (typeof children === "object" && "type" in children && "props" in children) {
    const element = children as { type?: unknown; props?: { children?: unknown } };
    if (element.type === Symbol.for("react.fragment")) {
      return hasRenderableChildren(element.props?.children);
    }
  }

  return true;
}

export function shouldRenderFilterBar(
  optionsLength: number,
  children: unknown,
  hasActiveFilter: boolean,
  onClear?: (() => void) | undefined,
): boolean {
  return optionsLength > 0 || hasRenderableChildren(children) || (hasActiveFilter && Boolean(onClear));
}
