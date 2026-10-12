import * as React from "react";
import { cn } from "@/lib/cn";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info";
}

const variants = {
  default:
    "border-border bg-muted text-muted-foreground",
  success:
    "border-success/30 bg-success/10 text-success",
  warning:
    "border-warning/30 bg-warning/10 text-warning",
  danger:
    "border-danger/30 bg-danger/10 text-danger",
  info:
    "border-primary/30 bg-primary/10 text-primary",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
