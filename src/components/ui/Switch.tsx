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
        />
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 rounded-full border border-neutral-700 bg-neutral-800 transition-colors",
            "peer-checked:border-indigo-500 peer-checked:bg-indigo-600",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-neutral-950",
            "peer-disabled:opacity-50",
          )}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5"
        />
      </span>
    );

    if (label == null) return control;

    return (
      <label htmlFor={inputId} className={cn("inline-flex items-center gap-3", disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer")}>
        {control}
        <span className="text-sm text-neutral-300">{label}</span>
      </label>
    );
  },
);

Switch.displayName = "Switch";
