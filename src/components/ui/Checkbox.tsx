"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

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
>(({ className, label, ...props }, ref) => {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3">
      <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          ref={ref}
          type="checkbox"
          className={cn(
            "peer absolute inset-0 h-full w-full cursor-pointer opacity-0",
            className,
          )}
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
              peer-checked:opacity-100
            "
            aria-hidden="true"
          />
        </span>
      </span>

      {label && (
        <span className="text-sm text-neutral-300">
          {label}
        </span>
      )}
    </label>
  );
});

Checkbox.displayName = "Checkbox";
