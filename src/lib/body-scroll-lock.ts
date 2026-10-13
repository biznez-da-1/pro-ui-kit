let activeLocks = 0;
let originalOverflow: string | null = null;

/**
 * Acquires a shared body scroll lock for modal surfaces.
 * The original overflow style is restored only after the last active lock is released.
 */
export function acquireBodyScrollLock(): () => void {
  if (typeof document === "undefined" || !document.body) {
    return () => {};
  }

  if (activeLocks === 0) {
    originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }

  activeLocks += 1;
  let released = false;

  return () => {
    if (released) return;
    released = true;
    activeLocks = Math.max(0, activeLocks - 1);

    if (activeLocks === 0 && typeof document !== "undefined" && document.body) {
      document.body.style.overflow = originalOverflow ?? "";
      originalOverflow = null;
    }
  };
}
