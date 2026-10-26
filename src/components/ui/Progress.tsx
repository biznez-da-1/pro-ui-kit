import * as React from "react";
import { cn } from "@/lib/cn";

export interface ProgressProps {
  value?: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  label?: string;
}

export function Progress({ value = 0, max = 100, className, showLabel = false, label = "Progress" }: ProgressProps) {
  const labelId = React.useId();
  const safeMax = Number.isFinite(max) && max > 0 ? max : 100;
  const rawValue = Number.isFinite(value) ? value : 0;
  const safeValue = Math.min(safeMax, Math.max(0, rawValue));
  const percentage = (safeValue / safeMax) * 100;
  const accessibleLabel = label.trim() || "Progress";

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="mb-2 flex items-center justify-between text-xs text-neutral-400">
          <span id={labelId}>{accessibleLabel}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-neutral-800"
        role="progressbar"
        aria-label={showLabel ? undefined : accessibleLabel}
        aria-labelledby={showLabel ? labelId : undefined}
        aria-valuenow={safeValue}
        aria-valuemin={0}
        aria-valuemax={safeMax}
      >
        <div className="h-full rounded-full bg-indigo-500 transition-all duration-300" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
