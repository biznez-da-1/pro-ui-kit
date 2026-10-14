"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options: RadioOption[];
  name?: string;
  label?: string;
  orientation?: "vertical" | "horizontal";
  disabled?: boolean;
  className?: string;
}

export function RadioGroup({
  value,
  defaultValue,
  onValueChange,
  options,
  name,
  label = "Options",
  orientation = "vertical",
  disabled = false,
  className,
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const generatedId = React.useId();
  const groupName = name ?? generatedId;
  const selectedValue = value ?? internalValue;
  const accessibleLabel = label.trim() || "Options";

  const handleChange = (nextValue: string) => {
    if (value === undefined) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <fieldset
      disabled={disabled}
      aria-label={accessibleLabel}
      className={cn(
        "min-w-0 border-0 p-0",
        disabled && "opacity-60",
        className,
      )}
    >
      <legend className="sr-only">{accessibleLabel}</legend>
      <div className={cn("flex gap-3", orientation === "vertical" ? "flex-col" : "flex-row flex-wrap")}>
        {options.length === 0 && (
          <p role="status" className="text-sm text-muted-foreground">
            No options available.
          </p>
        )}
        {options.map((option, index) => {
          const id = `${generatedId}-option-${index}`;
          const optionDisabled = disabled || option.disabled;
          const optionLabel = option.label.trim() || option.value.trim() || `Option ${index + 1}`;
          const optionDescription = option.description?.trim();

          return (
            <label
              key={option.value}
              htmlFor={id}
              className={cn("flex items-start gap-3", optionDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer")}
            >
              <input
                id={id}
                type="radio"
                name={groupName}
                value={option.value}
                checked={selectedValue === option.value}
                disabled={optionDisabled}
                onChange={() => handleChange(option.value)}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                  "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
                  selectedValue === option.value ? "border-primary bg-primary" : "border-border bg-surface",
                )}
              >
                {selectedValue === option.value && <span className="h-2 w-2 rounded-full bg-primary-foreground" />}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium text-surface-foreground">{optionLabel}</span>
                {optionDescription && <span className="mt-0.5 block text-xs text-muted-foreground">{optionDescription}</span>}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
