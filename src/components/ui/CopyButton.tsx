"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";

export interface CopyButtonProps {
  value: string;
  className?: string;
  label?: string;
}

export function CopyButton({ value, className, label = "Copy" }: CopyButtonProps) {
  const [copiedValue, setCopiedValue] = React.useState<string | null>(null);
  const [failedValue, setFailedValue] = React.useState<string | null>(null);
  const accessibleLabel = label.trim() || "Copy";
  const copied = copiedValue === value;
  const copyFailed = failedValue === value;
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const handleCopy = async () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    setCopiedValue(null);
    setFailedValue(null);

    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(value);
      setCopiedValue(value);
      timeoutRef.current = setTimeout(() => {
        setCopiedValue(null);
        timeoutRef.current = null;
      }, 2000);
    } catch {
      setFailedValue(value);
    }
  };

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : accessibleLabel}
        title={copied ? "Copied" : accessibleLabel}
        className={cn(
          "inline-flex h-9 items-center justify-center gap-2 rounded-ui border border-border bg-surface px-3 text-sm font-medium text-surface-foreground transition-colors",
          "hover:bg-muted hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
      >
        {copied ? <><Check className="h-4 w-4 text-success" aria-hidden="true" /><span>Copied</span></> : <><Copy className="h-4 w-4" aria-hidden="true" /><span>{accessibleLabel}</span></>}
      </button>
      <span role="status" aria-live="polite" className="text-xs text-muted-foreground">
        {copied ? "Copied to clipboard." : copyFailed ? "Could not copy. Check clipboard permissions and try again." : ""}
      </span>
    </div>
  );
}
