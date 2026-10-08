import * as React from "react";
import { cn } from "@/lib/cn";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info";
}

const variants = {
  default:
    "border-neutral-700 bg-neutral-800 text-neutral-200",
  success:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  warning:
    "border-amber-500/20 bg-amber-500/10 text-amber-400",
  danger:
    "border-red-500/20 bg-red-500/10 text-red-400",
  info:
    "border-blue-500/20 bg-blue-500/10 text-blue-400",
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
