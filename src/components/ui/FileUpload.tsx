"use client";

import * as React from "react";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/cn";

export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  onFilesChange?: (files: File[]) => void;
  className?: string;
  disabled?: boolean;
}

export function FileUpload({
  accept,
  multiple = false,
  maxSize,
  onFilesChange,
  className,
  disabled = false,
}: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<File[]>([]);
  const [dragging, setDragging] = React.useState(false);

  const processFiles = (incoming: File[]) => {
    const filtered = maxSize
      ? incoming.filter((file) => file.size <= maxSize)
      : incoming;

    const nextFiles = multiple
      ? [...files, ...filtered]
      : filtered.slice(0, 1);

    setFiles(nextFiles);
    onFilesChange?.(nextFiles);
  };

  const removeFile = (index: number) => {
    const nextFiles = files.filter(
      (_, fileIndex) => fileIndex !== index,
    );

    setFiles(nextFiles);
    onFilesChange?.(nextFiles);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    processFiles(Array.from(event.target.files ?? []));
    event.target.value = "";
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();

    if (disabled) return;

    setDragging(false);
    processFiles(Array.from(event.dataTransfer.files));
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={() => {
          if (!disabled) {
            inputRef.current?.click();
          }
        }}
        onKeyDown={(event) => {
          if (
            !disabled &&
            (event.key === "Enter" || event.key === " ")
          ) {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();

          if (!disabled) {
            setDragging(true);
          }
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors",
          dragging
            ? "border-indigo-500 bg-indigo-500/10"
            : "border-neutral-800 bg-neutral-950 hover:border-neutral-700 hover:bg-neutral-900/50",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleInputChange}
          className="hidden"
        />

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900 text-neutral-400">
          <Upload className="h-5 w-5" aria-hidden="true" />
        </div>

        <p className="mt-4 text-sm font-medium text-white">
          Drop files here or click to browse
        </p>

        <p className="mt-1 text-xs text-neutral-500">
          {accept
            ? `Accepted: ${accept}`
            : "Select a file from your device"}
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${file.lastModified}-${index}`}
              className="flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-3"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-neutral-200">
                  {file.name}
                </p>

                <p className="mt-0.5 text-xs text-neutral-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeFile(index)}
                aria-label={`Remove ${file.name}`}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
