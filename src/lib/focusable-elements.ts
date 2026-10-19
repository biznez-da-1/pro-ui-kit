const FOCUSABLE_SELECTOR =
  'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([type="hidden"]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), summary:not([tabindex="-1"]), iframe:not([tabindex="-1"]), audio[controls]:not([tabindex="-1"]), video[controls]:not([tabindex="-1"]), [contenteditable]:not([contenteditable="false"]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])';

export function getFocusableElements(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];

  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter((element) => {
    if (
      element.matches(":disabled") ||
      element.tabIndex < 0 ||
      element.closest('[aria-hidden="true"], [inert], [hidden]')
    ) {
      return false;
    }

    if (element.getClientRects().length === 0) return false;

    const styles = window.getComputedStyle(element);
    return styles.visibility !== "hidden" && styles.visibility !== "collapse";
  });
}
