export function shouldRenderFilterBar(
  optionsLength: number,
  children: unknown,
  hasActiveFilter: boolean,
  onClear?: (() => void) | undefined,
): boolean {
  const hasChildren = children != null && children !== false && children !== "";
  return optionsLength > 0 || hasChildren || (hasActiveFilter && Boolean(onClear));
}
