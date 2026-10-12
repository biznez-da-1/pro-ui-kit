import * as React from "react";
import { cn } from "@/lib/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-ui border bg-surface px-3 py-2 text-sm text-surface-foreground",
          "placeholder:text-muted-foreground",
          "transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-danger/70 focus-visible:border-danger focus-visible:ring-danger/30"
            : "border-border focus-visible:border-ring focus-visible:ring-ring/30",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
