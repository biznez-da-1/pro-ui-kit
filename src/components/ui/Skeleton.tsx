import * as React from "react";
import { cn } from "@/lib/cn";

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-xl bg-neutral-800",
        className,
      )}
      {...props}
    />
  );
}
