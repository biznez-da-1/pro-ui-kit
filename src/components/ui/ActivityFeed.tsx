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
  className?: string;
}

export function ActivityFeed({
  items,
  className,
}: ActivityFeedProps) {
  return (
    <div
      className={cn(
        "divide-y divide-neutral-800 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950",
        className,
      )}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            "flex gap-4 p-4 transition-colors hover:bg-neutral-900/60",
            item.className,
          )}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-400">
            {item.icon ?? (
              <span
                className="h-2 w-2 rounded-full bg-indigo-500"
                aria-hidden="true"
              />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <p className="text-sm font-medium text-white">
                {item.title}
              </p>

              <time className="shrink-0 text-xs text-neutral-500">
                {item.timestamp}
              </time>
            </div>

            {item.description && (
              <p className="mt-1 text-sm leading-5 text-neutral-400">
                {item.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
