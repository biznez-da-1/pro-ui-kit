import * as React from "react";
import { cn } from "@/lib/cn";
import { CopyButton } from "./CopyButton";

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({
  code,
  language = "text",
  filename,
  className,
}: CodeBlockProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-lg",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-neutral-800 bg-neutral-900/70 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          {filename && (
            <span className="truncate text-sm font-medium text-neutral-200">
              {filename}
            </span>
          )}

          {!filename && (
            <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              {language}
            </span>
          )}
        </div>

        <CopyButton
          value={code}
          label="Copy"
          className="shrink-0"
        />
      </div>

      <pre className="overflow-x-auto p-4 text-sm leading-6">
        <code className="font-mono text-neutral-300">
          {code}
        </code>
      </pre>
    </div>
  );
}
