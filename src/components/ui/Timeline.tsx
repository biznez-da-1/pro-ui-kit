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
  className,
}: TimelineProps) {
  return (
    <div className={cn("relative", className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
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
                  {item.title}
                </h3>

                {item.date && (
                  <time className="text-xs text-muted-foreground">
                    {item.date}
                  </time>
                )}
              </div>

              {item.description && (
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
