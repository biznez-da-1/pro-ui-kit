"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { hasRenderableContent } from "@/lib/has-renderable-content";

export interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type"
  > {
  label?: React.ReactNode;
}

export const Checkbox = React.forwardRef<
  HTMLInputElement,
  CheckboxProps
>(({ className, label, disabled = false, "aria-label": ariaLabel, ...props }, ref) => {
  const hasLabel = hasRenderableContent(label);
  const labelText = hasLabel ? label : "Checkbox";
  const accessibleLabel = ariaLabel?.trim() || (!hasLabel ? "Checkbox" : undefined);

  return (
    <label className={cn("inline-flex items-center gap-3", disabled ? "cursor-not-allowed" : "cursor-pointer")}>
      <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          ref={ref}
          type="checkbox"
          className={cn(
            "peer absolute inset-0 h-full w-full cursor-pointer opacity-0",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          disabled={disabled}
          aria-label={accessibleLabel}
          {...props}
        />

        <span
          aria-hidden="true"
          className="
            flex
            h-5
            w-5
            items-center
            justify-center
            rounded-md
            border
            border-neutral-700
            bg-neutral-950
            transition-colors
            peer-checked:border-indigo-500
            peer-checked:bg-indigo-600
            peer-checked:[&>svg]:opacity-100
            peer-focus-visible:ring-2
            peer-focus-visible:ring-indigo-500
            peer-focus-visible:ring-offset-2
            peer-focus-visible:ring-offset-neutral-950
            peer-disabled:cursor-not-allowed
            peer-disabled:opacity-50
          "
        >
          <Check
            className="
              h-3.5
              w-3.5
              text-white
              opacity-0
              transition-opacity
            "
            aria-hidden="true"
          />
        </span>
      </span>

      {labelText && <span className="text-sm text-neutral-300">{labelText}</span>}
    </label>
  );
});

Checkbox.displayName = "Checkbox";
