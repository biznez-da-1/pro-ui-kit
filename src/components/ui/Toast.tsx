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
  success: { icon: CheckCircle2, className: "border-success/30 bg-success/10 text-success" },
  info: { icon: Info, className: "border-primary/30 bg-primary/10 text-primary" },
  warning: { icon: TriangleAlert, className: "border-warning/30 bg-warning/10 text-warning" },
  error: { icon: TriangleAlert, className: "border-danger/30 bg-danger/10 text-danger" },
};

export function Toast({ title, message, variant = "info", onClose, className }: ToastProps) {
  const config = variants[variant];
  const Icon = config.icon;
  const isError = variant === "error";

  return (
    <div
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      aria-atomic="true"
      className={cn(
        "flex w-full max-w-sm items-start gap-3 rounded-2xl border p-4 shadow-xl backdrop-blur-xl",
        config.className,
        className,
      )}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-surface-foreground">{title}</p>
        {message && <p className="mt-1 text-sm leading-5 text-foreground">{message}</p>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
