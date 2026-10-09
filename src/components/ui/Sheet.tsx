"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  side?: "left" | "right" | "top" | "bottom";
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const sideClasses = {
  left: "inset-y-0 left-0 w-full max-w-sm border-r",
  right: "inset-y-0 right-0 w-full max-w-sm border-l",
  top: "inset-x-0 top-0 max-h-[85vh] border-b",
  bottom: "inset-x-0 bottom-0 max-h-[85vh] border-t",
};

export function Sheet({
  open,
  onClose,
  side = "right",
  title,
  description,
  children,
  className,
}: SheetProps) {
  const titleId = React.useId();
  const descriptionId = React.useId();
  const panelRef = React.useRef<HTMLDivElement>(null);
  const onCloseRef = React.useRef(onClose);
  onCloseRef.current = onClose;

  React.useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const getFocusable = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>(focusableSelector) ?? [])
        .filter((element) => element.getClientRects().length > 0);

    const focusFirst = () => {
      const first = getFocusable()[0];
      (first ?? panel)?.focus();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      const focusable = getFocusable();
      if (focusable.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    focusFirst();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button type="button" aria-label="Close sheet" tabIndex={-1} className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(
          "fixed z-10 overflow-y-auto bg-neutral-950 p-6 shadow-2xl focus:outline-none",
          "border-neutral-800",
          sideClasses[side],
          className,
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close sheet"
          className="absolute right-4 top-4 rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        {(title || description) && (
          <div className="mb-6 pr-10">
            {title && <h2 id={titleId} className="text-xl font-semibold text-white">{title}</h2>}
            {description && <p id={descriptionId} className="mt-2 text-sm leading-6 text-neutral-400">{description}</p>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
