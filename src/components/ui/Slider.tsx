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
  label?: string;
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
  label = "Slider",
  className,
}: SliderProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const safeMin = Number.isFinite(min) ? min : 0;
  const safeMax = Number.isFinite(max) && max > safeMin ? max : safeMin + 100;
  const safeStep = Number.isFinite(step) && step > 0 ? step : 1;
  const rawValue = value ?? internalValue;
  const numericValue = Number.isFinite(rawValue) ? rawValue : safeMin;
  const currentValue = Math.min(safeMax, Math.max(safeMin, numericValue));
  const accessibleLabel = label.trim() || "Slider";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = Number(event.target.value);
    if (value === undefined) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <div className={cn("w-full", className)}>
      <input
        type="range"
        value={currentValue}
        min={safeMin}
        max={safeMax}
        step={safeStep}
        disabled={disabled}
        onChange={handleChange}
        aria-label={accessibleLabel}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-neutral-800 accent-white disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
}
