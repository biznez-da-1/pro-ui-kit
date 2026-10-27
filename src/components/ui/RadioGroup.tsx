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
  orientation = "vertical",
  disabled = false,
  className,
}: RadioGroupProps) {
  if (options.length === 0) {
    return <p role="status" className={cn("text-sm text-neutral-500", className)}>No options available.</p>;
  }

  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? "",
  );
  const generatedId = React.useId();
  const groupName = name?.trim() || generatedId;
  const selectedValue = value ?? internalValue;

  const handleChange = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
  };

  return (
    <div
      role="radiogroup"
      aria-label={name?.trim() || "Options"}
      aria-disabled={disabled}
      className={cn(
        "flex gap-3",
        orientation === "vertical"
          ? "flex-col"
          : "flex-row flex-wrap",
        disabled && "opacity-60",
        className,
      )}
    >
      {options.map((option, index) => {
        const id = `${generatedId}-option-${index}`;
        const optionDisabled = disabled || option.disabled;
        const optionLabel = option.label.trim() || option.value.trim() || `Option ${index + 1}`;
        const optionDescription = option.description?.trim();

        return (
          <label
            key={option.value}
            htmlFor={id}
            className={cn(
              "flex items-start gap-3",
              optionDisabled
                ? "cursor-not-allowed"
                : "cursor-pointer",
            )}
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
                "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-neutral-950",
                selectedValue === option.value
                  ? "border-white bg-white"
                  : "border-neutral-700 bg-neutral-950",
              )}
            >
              {selectedValue === option.value && (
                <span className="h-2 w-2 rounded-full bg-neutral-950" />
              )}
            </span>

            <span className="min-w-0">
              <span className="block text-sm font-medium text-white">
                {optionLabel}
              </span>

              {optionDescription && (
                <span className="mt-0.5 block text-xs text-neutral-500">
                  {optionDescription}
                </span>
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
}
