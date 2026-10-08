"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface SliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

export function Slider({
  value,
  defaultValue = 50,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  disabled = false,
  className,
}: SliderProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);

  const currentValue = value ?? internalValue;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = Number(event.target.value);

    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
  };

  return (
    <div className={cn("w-full", className)}>
      <input
        type="range"
        value={currentValue}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={handleChange}
        aria-label="Slider"
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-neutral-800 accent-white disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
}
