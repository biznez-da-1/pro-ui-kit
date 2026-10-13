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
  const isPositive = hasTrend && trend > 0;
  const isNegative = hasTrend && trend < 0;
  const trendColorClass = isPositive
    ? "text-success"
    : isNegative
      ? "text-danger"
      : "text-muted-foreground";

  return (
    <div
      className={cn(
        "rounded-ui-xl border border-border bg-surface p-5 shadow-lg",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-surface-foreground">
            {value}
          </p>

          {description && (
            <p className="mt-2 text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        {icon && (
          <div aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-ui-lg border border-border bg-muted text-muted-foreground">
            {icon}
          </div>
        )}
      </div>

      {hasTrend && (
        <div className="mt-5 flex items-center gap-2 text-sm">
          <span
            className={cn(
              "inline-flex items-center gap-1 font-medium",
              trendColorClass,
            )}
          >
            <span className="sr-only">
              {isPositive ? "Increase" : isNegative ? "Decrease" : "No change"}{" "}
            </span>
            {isPositive ? (
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            ) : isNegative ? (
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            ) : null}
            {Math.abs(trend)}%
          </span>

          {trendLabel && (
            <span className="text-muted-foreground">
              {trendLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
