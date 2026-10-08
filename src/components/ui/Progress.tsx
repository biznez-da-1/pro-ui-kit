import { cn } from "@/lib/cn";

export interface ProgressProps {
  value?: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
}

export function Progress({
  value = 0,
  max = 100,
  className,
  showLabel = false,
}: ProgressProps) {
  const safeMax = max > 0 ? max : 100;
  const percentage = Math.min(
    100,
    Math.max(0, (value / safeMax) * 100),
  );

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="mb-2 flex items-center justify-between text-xs text-neutral-400">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}

      <div
        className="h-2 w-full overflow-hidden rounded-full bg-neutral-800"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={safeMax}
      >
        <div
          className="h-full rounded-full bg-indigo-500 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
