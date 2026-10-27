let activeLocks = 0;
let originalOverflow: string | null = null;

/** Locks body scrolling until the final modal releases its lock. */
export function acquireBodyScrollLock(): () => void {
  if (typeof document === "undefined" || !document.body) return () => {};

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
