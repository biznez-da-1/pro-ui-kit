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
  label?: string;
}

export function FileUpload({
  accept,
  multiple = false,
  maxSize,
  onFilesChange,
  className,
  disabled = false,
  label = "Upload files",
}: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const generatedId = React.useId();
  const [files, setFiles] = React.useState<File[]>([]);
  const [dragging, setDragging] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const matchesAccept = (file: File) => {
    if (!accept?.trim()) return true;
    const fileName = file.name.toLowerCase();
    const mimeType = file.type.toLowerCase();
    return accept
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean)
      .some((item) => {
        if (item.startsWith(".")) return fileName.endsWith(item);
        if (item.endsWith("/*")) return mimeType.startsWith(item.slice(0, -1));
        return mimeType === item;
      });
  };

  const processFiles = (incoming: File[]) => {
    const tooLarge = (file: File) => maxSize != null && maxSize >= 0 && file.size > maxSize;
    const rejectedSize = incoming.filter(tooLarge);
    const rejectedType = incoming.filter((file) => !tooLarge(file) && !matchesAccept(file));
    const accepted = incoming.filter((file) => !tooLarge(file) && matchesAccept(file));
    const uniqueAccepted = multiple
      ? accepted.filter((file) => !files.some((existing) =>
          existing.name === file.name && existing.size === file.size && existing.lastModified === file.lastModified,
        ))
      : accepted.slice(0, 1);
    const nextFiles = multiple ? [...files, ...uniqueAccepted] : uniqueAccepted;
    setFiles(nextFiles);
    onFilesChange?.(nextFiles);

    const messages: string[] = [];
    if (uniqueAccepted.length) messages.push(`${uniqueAccepted.length} file(s) selected.`);
    if (rejectedSize.length) messages.push(`${rejectedSize.length} file(s) exceeded the ${(maxSize! / 1024 / 1024).toFixed(1)} MB size limit.`);
    if (rejectedType.length) messages.push(`${rejectedType.length} file(s) did not match the accepted file types.`);
    if (!incoming.length) messages.push("No files selected.");
    if (multiple && accepted.length > uniqueAccepted.length) messages.push("Duplicate files were skipped.");
    setMessage(messages.join(" "));
  };

  const removeFile = (index: number) => {
    const nextFiles = files.filter((_, fileIndex) => fileIndex !== index);
    setFiles(nextFiles);
    onFilesChange?.(nextFiles);
    setMessage("File removed.");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(Array.from(event.target.files ?? []));
    event.target.value = "";
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
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
        aria-label={label}
        aria-disabled={disabled || undefined}
        aria-describedby={`${generatedId}-hint ${generatedId}-status`}
        onClick={() => { if (!disabled) inputRef.current?.click(); }}
        onKeyDown={(event) => {
          if (!disabled && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(event) => { event.preventDefault(); if (!disabled) setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
          dragging ? "border-indigo-500 bg-indigo-500/10" : "border-neutral-800 bg-neutral-950 hover:border-neutral-700 hover:bg-neutral-900/50",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <input ref={inputRef} type="file" accept={accept} multiple={multiple} disabled={disabled} onChange={handleInputChange} className="sr-only" tabIndex={-1} aria-hidden="true" />
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900 text-neutral-400">
          <Upload className="h-5 w-5" aria-hidden="true" />
        </div>
        <p className="mt-4 text-sm font-medium text-white">Drop files here or click to browse</p>
        <p id={`${generatedId}-hint`} className="mt-1 text-xs text-neutral-500">
          {accept ? `Accepted: ${accept}` : "Select a file from your device"}
          {maxSize ? ` · Up to ${(maxSize / 1024 / 1024).toFixed(1)} MB per file` : ""}
        </p>
      </div>

      <p id={`${generatedId}-status`} role="status" aria-live="polite" className="mt-2 min-h-5 text-sm text-neutral-300">
        {message}
      </p>

      {files.length > 0 && (
        <ul className="mt-3 space-y-2" aria-label="Selected files">
          {files.map((file, index) => (
            <li key={`${file.name}-${file.lastModified}-${index}`} className="flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-neutral-200">{file.name}</p>
                <p className="mt-0.5 text-xs text-neutral-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button type="button" onClick={() => removeFile(index)} aria-label={`Remove ${file.name}`} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
