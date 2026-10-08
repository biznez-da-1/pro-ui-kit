import * as React from "react";
import { cn } from "@/lib/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}

const variants = {
  primary:
    "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:ring-indigo-500",
  secondary:
    "bg-neutral-800 text-white shadow-sm hover:bg-neutral-700 focus-visible:ring-neutral-500",
  outline:
    "border border-neutral-700 bg-transparent text-neutral-200 hover:bg-neutral-800 focus-visible:ring-neutral-500",
  ghost:
    "bg-transparent text-neutral-300 hover:bg-neutral-800 hover:text-white focus-visible:ring-neutral-500",
  destructive:
    "bg-red-600 text-white shadow-sm hover:bg-red-500 focus-visible:ring-red-500",
};

const sizes = {
  sm: "h-9 rounded-lg px-3 text-sm",
  md: "h-10 rounded-xl px-4 text-sm",
  lg: "h-12 rounded-xl px-6 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium",
          "transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
          "disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
