import * as React from "react";
import { cn } from "@/lib/cn";

export interface ActivityItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  icon?: React.ReactNode;
  className?: string;
}

export interface ActivityFeedProps {
  items: ActivityItem[];
  /** Accessible name for the activity list. */
  label?: string;
  className?: string;
}

export function ActivityFeed({
  items,
  label = "Activity feed",
  className,
}: ActivityFeedProps) {
  const accessibleLabel = label.trim() || "Activity feed";
  const containerClass = "divide-y divide-border overflow-hidden rounded-ui-xl border border-border bg-surface";

  if (items.length === 0) {
    return (
      <div className={cn(containerClass, className)}>
        <p role="status" className="px-4 py-8 text-center text-sm text-muted-foreground">
          No activity yet.
        </p>
      </div>
    );
  }

  return (
    <ul aria-label={accessibleLabel} className={cn("m-0 list-none p-0", containerClass, className)}>
      {items.map((item) => {
        const titleText = item.title.trim() || "Activity";
        const descriptionText = item.description?.trim();

        return (
          <li
            key={item.id}
            className={cn("flex gap-4 p-4 transition-colors hover:bg-muted", item.className)}
          >
            <div aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-ui-lg border border-border bg-muted text-muted-foreground">
              {item.icon ?? (
                <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="text-sm font-medium text-surface-foreground">
                  {titleText}
                </p>

                <time className="shrink-0 text-xs text-muted-foreground">
                  {item.timestamp}
                </time>
              </div>

              {descriptionText && (
                <p className="mt-1 text-sm leading-5 text-muted-foreground">
                  {descriptionText}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
