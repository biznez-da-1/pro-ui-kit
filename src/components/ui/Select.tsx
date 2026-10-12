import * as React from "react";
import { cn } from "@/lib/cn";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error = false, ...props }, ref) => (
    <select
      ref={ref}
      {...props}
      aria-invalid={error ? true : props["aria-invalid"]}
      className={cn(
        "flex h-10 w-full appearance-none rounded-ui border bg-surface px-3 py-2 text-sm text-surface-foreground",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        "disabled:cursor-not-allowed disabled:opacity-50",
        error
          ? "border-danger/70 focus-visible:border-danger focus-visible:ring-danger/30"
          : "border-border focus-visible:border-ring focus-visible:ring-ring/30",
        className,
      )}
    />
  ),
);

Select.displayName = "Select";
