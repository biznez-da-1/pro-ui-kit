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
  const titleText = title?.trim();
  const descriptionText = description?.trim();
  const panelRef = React.useRef<HTMLDivElement>(null);
  const onCloseRef = React.useRef(onClose);
  onCloseRef.current = onClose;

  React.useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const focusableSelector =
      'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([type="hidden"]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), summary:not([tabindex="-1"]), iframe:not([tabindex="-1"]), audio[controls]:not([tabindex="-1"]), video[controls]:not([tabindex="-1"]), [contenteditable]:not([contenteditable="false"]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])';

    const getFocusable = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>(focusableSelector) ?? []).filter(
        (element) =>
          element.getClientRects().length > 0 &&
          !element.closest('[aria-hidden="true"]'),
      );

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
      const activeElement = document.activeElement;
      const focusIsOutsidePanel = !panel.contains(activeElement);

      if (
        event.shiftKey &&
        (activeElement === first ||
          activeElement === panel ||
          focusIsOutsidePanel)
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (activeElement === last || focusIsOutsidePanel)
      ) {
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
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={titleText ? undefined : "Sheet"}
        aria-labelledby={titleText ? titleId : undefined}
        aria-describedby={descriptionText ? descriptionId : undefined}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            onCloseRef.current();
          }
        }}
        className={cn(
          "fixed z-10 overflow-y-auto bg-surface p-6 shadow-2xl focus:outline-none",
          "border-border",
          sideClasses[side],
          className,
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close sheet"
          className="absolute right-4 top-4 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        {(titleText || descriptionText) && (
          <div className="mb-6 pr-10">
            {titleText && (
              <h2 id={titleId} className="text-xl font-semibold text-surface-foreground">
                {titleText}
              </h2>
            )}
            {descriptionText && (
              <p id={descriptionId} className="mt-2 text-sm leading-6 text-muted-foreground">
                {descriptionText}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
