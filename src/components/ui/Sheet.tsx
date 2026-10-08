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
  React.useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "sheet-title" : undefined}
      aria-describedby={description ? "sheet-description" : undefined}
    >
      <button
        type="button"
        aria-label="Close sheet"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={cn(
          "fixed z-10 overflow-y-auto bg-neutral-950 p-6 shadow-2xl",
          "border-neutral-800",
          sideClasses[side],
          className,
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close sheet"
          className="absolute right-4 top-4 rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {(title || description) && (
          <div className="mb-6 pr-10">
            {title && (
              <h2
                id="sheet-title"
                className="text-xl font-semibold text-white"
              >
                {title}
              </h2>
            )}

            {description && (
              <p
                id="sheet-description"
                className="mt-2 text-sm leading-6 text-neutral-400"
              >
                {description}
              </p>
            )}
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
