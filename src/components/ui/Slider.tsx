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
  id?: string;
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
  label = "Value",
  id,
  className,
}: SliderProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const safeMin = Number.isFinite(min) ? min : 0;
  const safeMax = Number.isFinite(max) && max > safeMin ? max : safeMin + 100;
  const safeStep = Number.isFinite(step) && step > 0 ? step : 1;
  const rawValue = value ?? internalValue;
  const currentValue = Number.isFinite(rawValue)
    ? Math.min(safeMax, Math.max(safeMin, rawValue))
    : safeMin;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = Number(event.target.value);
    if (value === undefined) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <div className={cn("w-full", className)}>
      <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-foreground">
        {label} <span className="text-muted-foreground">({currentValue})</span>
      </label>
      <input
        id={inputId}
        type="range"
        value={currentValue}
        min={safeMin}
        max={safeMax}
        step={safeStep}
        disabled={disabled}
        onChange={handleChange}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
}
