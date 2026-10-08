import * as React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/cn";

export interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: number;
  trendLabel?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  trend,
  trendLabel,
  icon,
  className,
}: StatCardProps) {
  const hasTrend = typeof trend === "number";
  const isPositive = hasTrend && trend >= 0;

  return (
    <div
      className={cn(
        "rounded-2xl border border-neutral-800 bg-neutral-950 p-5 shadow-lg",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-neutral-400">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-white">
            {value}
          </p>

          {description && (
            <p className="mt-2 text-sm text-neutral-500">
              {description}
            </p>
          )}
        </div>

        {icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-300">
            {icon}
          </div>
        )}
      </div>

      {hasTrend && (
        <div className="mt-5 flex items-center gap-2 text-sm">
          <span
            className={cn(
              "inline-flex items-center gap-1 font-medium",
              isPositive
                ? "text-emerald-400"
                : "text-red-400",
            )}
          >
            {isPositive ? (
              <ArrowUp
                className="h-4 w-4"
                aria-hidden="true"
              />
            ) : (
              <ArrowDown
                className="h-4 w-4"
                aria-hidden="true"
              />
            )}

            {Math.abs(trend)}%
          </span>

          {trendLabel && (
            <span className="text-neutral-500">
              {trendLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
