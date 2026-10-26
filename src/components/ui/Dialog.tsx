"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { acquireBodyScrollLock } from "@/lib/body-scroll-lock";
import { getFocusableElements } from "@/lib/focusable-elements";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  className,
}: DialogProps) {
  const titleId = React.useId();
  const descriptionId = React.useId();
  const titleText = title?.trim();
  const descriptionText = description?.trim();
  const panelRef = React.useRef<HTMLDivElement>(null);
  const onCloseRef = React.useRef(onClose);

  React.useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  React.useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const releaseScrollLock = acquireBodyScrollLock();
    const panel = panelRef.current;
    const focusFirst = () => {
      const focusable = getFocusableElements(panel);
      (focusable[0] ?? panel)?.focus();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      const focusable = getFocusableElements(panel);
      if (focusable.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;
      const focusIsOutsidePanel = !panel.contains(activeElement);

      if (event.shiftKey && (activeElement === first || activeElement === panel || focusIsOutsidePanel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (activeElement === last || focusIsOutsidePanel)) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    focusFirst();

    return () => {
      releaseScrollLock();
      window.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocused?.isConnected) previouslyFocused.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
        className={cn("relative z-10 w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-2xl focus:outline-none", className)}
        role="dialog"
        aria-modal="true"
        aria-label={titleText ? undefined : "Dialog"}
        aria-labelledby={titleText ? titleId : undefined}
        aria-describedby={descriptionText ? descriptionId : undefined}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            onCloseRef.current();
          }
          if (event.key === "Tab") event.stopPropagation();
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        {(titleText || descriptionText) && (
          <div className="mb-5 pr-10">
            {titleText && <h2 id={titleId} className="text-xl font-semibold text-white">{titleText}</h2>}
            {descriptionText && <p id={descriptionId} className="mt-2 text-sm leading-6 text-neutral-400">{descriptionText}</p>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
