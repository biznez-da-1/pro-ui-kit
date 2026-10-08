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
  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? "",
  );

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
      {options.map((option) => {
        const id = `${name ?? "radio-group"}-${option.value}`;
        const optionDisabled = disabled || option.disabled;

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
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              disabled={optionDisabled}
              onChange={() => handleChange(option.value)}
              className="sr-only"
            />

            <span
              aria-hidden="true"
              className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
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
                {option.label}
              </span>

              {option.description && (
                <span className="mt-0.5 block text-xs text-neutral-500">
                  {option.description}
                </span>
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
}
