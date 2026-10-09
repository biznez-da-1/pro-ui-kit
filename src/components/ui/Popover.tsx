"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface PopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
  label?: string;
}

export function Popover({
  open,
  onOpenChange,
  trigger,
  children,
  align = "left",
  className,
  label = "Additional details",
}: PopoverProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const onOpenChangeRef = React.useRef(onOpenChange);
  onOpenChangeRef.current = onOpenChange;

  React.useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onOpenChangeRef.current(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onOpenChangeRef.current(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative inline-block">
      <div
        ref={triggerRef}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={label}
        onClick={() => onOpenChange(!open)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onOpenChange(!open);
          }
        }}
        className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        {trigger}
      </div>

      {open && (
        <div
          role="dialog"
          aria-label={label}
          className={cn(
            "absolute z-50 mt-2 min-w-64 rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-white shadow-2xl",
            align === "left" && "left-0",
            align === "center" && "left-1/2 -translate-x-1/2",
            align === "right" && "right-0",
            className,
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
