"use client";

import * as React from "react";
import { CheckCircle2, Info, TriangleAlert, X } from "lucide-react";
import { cn } from "@/lib/cn";

export interface ToastProps {
  title: string;
  message?: string;
  variant?: "success" | "info" | "warning" | "error";
  onClose?: () => void;
  className?: string;
}

const variants = {
  success: {
    icon: CheckCircle2,
    className:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  },
  info: {
    icon: Info,
    className:
      "border-blue-500/30 bg-blue-500/10 text-blue-300",
  },
  warning: {
    icon: TriangleAlert,
    className:
      "border-amber-500/30 bg-amber-500/10 text-amber-300",
  },
  error: {
    icon: TriangleAlert,
    className:
      "border-red-500/30 bg-red-500/10 text-red-300",
  },
};

export function Toast({
  title,
  message,
  variant = "info",
  onClose,
  className,
}: ToastProps) {
  const config = variants[variant];
  const Icon = config.icon;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex w-full max-w-sm items-start gap-3 rounded-2xl border p-4 shadow-xl backdrop-blur-xl",
        config.className,
        className,
      )}
    >
      <Icon
        className="mt-0.5 h-5 w-5 shrink-0"
        aria-hidden="true"
      />

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-white">
          {title}
        </p>

        {message && (
          <p className="mt-1 text-sm leading-5 text-neutral-300">
            {message}
          </p>
        )}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className="rounded-lg p-1 text-neutral-400 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
