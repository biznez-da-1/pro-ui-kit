import * as React from "react";
import { cn } from "@/lib/cn";

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function Kbd({
  children,
  className,
  ...props
}: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex min-h-6 items-center justify-center rounded-md border border-neutral-700 bg-neutral-900 px-2 font-mono text-xs font-medium text-neutral-300 shadow-sm",
        className,
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}
