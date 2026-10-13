"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, disabled, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const accessibleLabel =
      typeof label === "string" && !label.trim() ? "Toggle switch" : label;

    const control = (
      <span className="relative flex h-6 w-11 shrink-0">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          role="switch"
          disabled={disabled}
          className={cn("peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed", className)}
          {...props}
          aria-label={accessibleLabel == null ? (props["aria-label"] ?? "Toggle switch") : props["aria-label"]}
        />
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 rounded-full border border-border bg-muted transition-colors",
            "peer-checked:border-primary peer-checked:bg-primary",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
            "peer-disabled:opacity-50",
          )}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1 top-1 h-4 w-4 rounded-full bg-primary-foreground shadow-sm transition-transform peer-checked:translate-x-5"
        />
      </span>
    );

    if (accessibleLabel == null) return control;

    return (
      <label htmlFor={inputId} className={cn("inline-flex items-center gap-3", disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer")}>
        {control}
        <span className="text-sm text-foreground">{accessibleLabel}</span>
      </label>
    );
  },
);

Switch.displayName = "Switch";
