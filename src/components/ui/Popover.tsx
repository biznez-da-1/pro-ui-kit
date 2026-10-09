"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface PopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** A single focusable trigger element, preferably a native button or Button component. */
  trigger: React.ReactElement;
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
        containerRef.current?.querySelector<HTMLElement>('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const triggerElement = React.cloneElement(
    trigger as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
    {
      "aria-haspopup": "dialog",
      "aria-expanded": open,
      "aria-label": trigger.props["aria-label"] ?? label,
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        (trigger.props as React.HTMLAttributes<HTMLElement>).onClick?.(event);
        if (!event.defaultPrevented) onOpenChange(!open);
      },
    } as React.HTMLAttributes<HTMLElement>,
  );

  return (
    <div ref={containerRef} className="relative inline-block">
      {triggerElement}
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
