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
}

export function Popover({
  open,
  onOpenChange,
  trigger,
  children,
  align = "left",
  className,
}: PopoverProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onOpenChange(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  return (
    <div ref={containerRef} className="relative inline-block">
      <div
        role="button"
        tabIndex={0}
        onClick={() => onOpenChange(!open)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onOpenChange(!open);
          }
        }}
      >
        {trigger}
      </div>

      {open && (
        <div
          role="dialog"
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
