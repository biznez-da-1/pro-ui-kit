import * as React from "react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/cn";

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  const titleText = title.trim() || "Nothing here yet";
  const descriptionText = description?.trim();

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center",
        className,
      )}
    >
      <div aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-muted text-muted-foreground">
        {icon ?? (
          <Inbox
            className="h-5 w-5"
            aria-hidden="true"
          />
        )}
      </div>

      <h3 className="mt-4 text-lg font-semibold text-surface-foreground">
        {titleText}
      </h3>

      {descriptionText && (
        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          {descriptionText}
        </p>
      )}

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}
