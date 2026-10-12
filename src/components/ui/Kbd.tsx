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
        "inline-flex min-h-6 items-center justify-center rounded-md border border-border bg-muted px-2 font-mono text-xs font-medium text-surface-foreground shadow-sm",
        className,
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}
