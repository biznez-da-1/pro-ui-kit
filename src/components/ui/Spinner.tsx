import { cn } from "@/lib/cn";

export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

const sizes = {
  sm: "h-4 w-4 border-2",
  md: "h-5 w-5 border-2",
  lg: "h-8 w-8 border-[3px]",
};

export function Spinner({
  size = "md",
  className,
  label = "Loading",
}: SpinnerProps) {
  const accessibleLabel = label.trim() || "Loading";
  return (
    <span
      role="status"
      aria-label={accessibleLabel}
      className={cn(
        "inline-block animate-spin motion-reduce:animate-none rounded-full border-neutral-700 border-t-indigo-500",
        sizes[size],
        className,
      )}
    />
  );
}
