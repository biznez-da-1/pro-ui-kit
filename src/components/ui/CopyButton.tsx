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
  const copied = copiedValue === value;
  const copyFailed = failedValue === value;
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const handleCopy = async () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
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
        aria-label={copied ? "Copied" : label}
        title={copied ? "Copied" : label}
        className={cn(
          "inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-neutral-800 bg-neutral-950 px-3 text-sm font-medium text-neutral-300 transition-colors",
          "hover:bg-neutral-900 hover:text-white",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
          className,
        )}
      >
        {copied ? <><Check className="h-4 w-4 text-emerald-400" aria-hidden="true" /><span>Copied</span></> : <><Copy className="h-4 w-4" aria-hidden="true" /><span>{label}</span></>}
      </button>
      <span role="status" aria-live="polite" className="text-xs text-neutral-400">
        {copied ? "Copied to clipboard." : copyFailed ? "Could not copy. Check clipboard permissions and try again." : ""}
      </span>
    </div>
  );
}
