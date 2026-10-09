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
        "flex h-10 w-full appearance-none rounded-xl border bg-neutral-950 px-3 py-2 text-sm text-white",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
        "disabled:cursor-not-allowed disabled:opacity-50",
        error
          ? "border-red-500/70 focus-visible:border-red-500 focus-visible:ring-red-500/30"
          : "border-neutral-800 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/30",
        className,
      )}
    />
  ),
);

Select.displayName = "Select";
