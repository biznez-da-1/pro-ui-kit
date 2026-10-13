import * as React from "react";
import { cn } from "@/lib/cn";

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date?: string;
  icon?: React.ReactNode;
  status?: "default" | "success" | "warning" | "danger";
}

export interface TimelineProps {
  items: TimelineItem[];
  /** Accessible name for the ordered timeline list. */
  label?: string;
  className?: string;
}

const statusClasses = {
  default: "border-border bg-muted text-muted-foreground",
  success: "border-success/40 bg-success/10 text-success",
  warning: "border-warning/40 bg-warning/10 text-warning",
  danger: "border-danger/40 bg-danger/10 text-danger",
};

export function Timeline({
  items,
  label = "Timeline",
  className,
}: TimelineProps) {
  const accessibleLabel = label.trim() || "Timeline";

  if (items.length === 0) {
    return (
      <p role="status" className={cn("py-6 text-center text-sm text-muted-foreground", className)}>
        No timeline events yet.
      </p>
    );
  }

  return (
    <ol aria-label={accessibleLabel} className={cn("relative m-0 list-none p-0", className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const titleText = item.title.trim() || "Timeline event";
        const descriptionText = item.description?.trim();
        const dateText = item.date?.trim();

        return (
          <li
            key={item.id}
            className="relative flex gap-4"
          >
            {!isLast && (
              <div
                className="absolute left-4 top-9 h-[calc(100%-1rem)] w-px bg-border"
                aria-hidden="true"
              />
            )}

            <div
              aria-hidden="true"
              className={cn(
                "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                statusClasses[item.status ?? "default"],
              )}
            >
              {item.icon ?? (
                <span
                  className="h-2.5 w-2.5 rounded-full bg-current"
                  aria-hidden="true"
                />
              )}
            </div>

            <div
              className={cn(
                "min-w-0 flex-1",
                !isLast && "pb-8",
              )}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-surface-foreground">
                  {titleText}
                </h3>

                {dateText && (
                  <time className="text-xs text-muted-foreground">
                    {dateText}
                  </time>
                )}
              </div>

              {descriptionText && (
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {descriptionText}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
