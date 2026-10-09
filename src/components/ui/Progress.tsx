import { cn } from "@/lib/cn";

export interface ProgressProps {
  value?: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  label?: string;
}

export function Progress({
  value = 0,
  max = 100,
  className,
  showLabel = false,
  label = "Progress",
}: ProgressProps) {
  const safeMax = Number.isFinite(max) && max > 0 ? max : 100;
  const safeValue = Number.isFinite(value) ? Math.min(safeMax, Math.max(0, value)) : 0;
  const percentage = (safeValue / safeMax) * 100;

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="mb-2 flex items-center justify-between text-xs text-neutral-400">
          <span>{label}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}

      <div
        className="h-2 w-full overflow-hidden rounded-full bg-neutral-800"
        role="progressbar"
        aria-label={label}
        aria-valuenow={safeValue}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuetext={`${Math.round(percentage)}%`}
      >
        <div
          className="h-full rounded-full bg-indigo-500 transition-all duration-300 motion-reduce:transition-none"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
