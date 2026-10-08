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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : label}
      title={copied ? "Copied" : label}
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
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
