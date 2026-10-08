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
          "flex h-10 w-full rounded-xl border bg-neutral-950 px-3 py-2 text-sm text-white",
          "placeholder:text-neutral-500",
          "transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-950",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-red-500/70 focus:border-red-500 focus:ring-red-500/30"
            : "border-neutral-800 focus:border-indigo-500 focus:ring-indigo-500/30",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
