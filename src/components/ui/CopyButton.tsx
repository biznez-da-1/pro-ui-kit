"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";

export interface CopyButtonProps {
  value: string;
  className?: string;
  label?: string;
}

export function CopyButton({
  value,
  className,
  label = "Copy",
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);
  const [copyFailed, setCopyFailed] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const buttonLabel = label.trim() || "Copy";

  React.useEffect(() => () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyFailed(false);
      setCopied(true);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null;
      }, 2000);
    } catch {
      setCopied(false);
      setCopyFailed(true);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : copyFailed ? "Copy failed" : buttonLabel}
      title={copied ? "Copied" : copyFailed ? "Copy failed" : buttonLabel}
      className={cn(
        "inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-neutral-800 bg-neutral-950 px-3 text-sm font-medium text-neutral-300 transition-colors",
        "hover:bg-neutral-900 hover:text-white",
        "focus:outline-none focus:ring-2 focus:ring-indigo-500",
        className,
      )}
    >
      {copied ? (
        <>
          <Check
            className="h-4 w-4 text-emerald-400"
            aria-hidden="true"
          />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Copy
            className="h-4 w-4"
            aria-hidden="true"
          />
          <span>{copyFailed ? "Copy failed" : buttonLabel}</span>
        </>
      )}
    </button>
  );
}
