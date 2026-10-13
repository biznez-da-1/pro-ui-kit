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
  const filenameText = filename?.trim();
  const languageText = language.trim() || "text";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-ui-xl border border-border bg-surface shadow-lg",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-border bg-muted px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          {filenameText && (
            <span className="truncate text-sm font-medium text-surface-foreground">
              {filenameText}
            </span>
          )}

          {!filenameText && (
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {languageText}
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
        <code className="font-mono text-surface-foreground">
          {code}
        </code>
      </pre>
    </div>
  );
}
