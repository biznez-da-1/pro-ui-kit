import * as React from "react";
import {
  CheckCircle2,
  Info,
  TriangleAlert,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/cn";

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
}

const variants = {
  info: {
    icon: Info,
    className: "border-primary/30 bg-primary/10 text-primary",
  },
  success: {
    icon: CheckCircle2,
    className: "border-success/30 bg-success/10 text-success",
  },
  warning: {
    icon: TriangleAlert,
    className: "border-warning/30 bg-warning/10 text-warning",
  },
  error: {
    icon: XCircle,
    className: "border-danger/30 bg-danger/10 text-danger",
  },
};

export function Alert({
  variant = "info",
  title,
  className,
  children,
  ...props
}: AlertProps) {
  const config = variants[variant];
  const Icon = config.icon;
  const isError = variant === "error";
  const titleText = title?.trim();
  const alertContent = typeof children === "string" ? children.trim() : children;
  const hasAlertContent =
    alertContent != null &&
    alertContent !== false &&
    alertContent !== true &&
    alertContent !== "";

  return (
    <div
      {...props}
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      aria-atomic="true"
      className={cn(
        "flex gap-3 rounded-2xl border p-4",
        config.className,
        className,
      )}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div className="min-w-0">
        {titleText && <p className="text-sm font-semibold text-surface-foreground">{titleText}</p>}
        {hasAlertContent ? (
          <div className="mt-1 text-sm leading-6 text-foreground">{alertContent}</div>
        ) : !titleText ? (
          <div className="mt-1 text-sm leading-6 text-foreground">No details provided.</div>
        ) : null}
      </div>
    </div>
  );
}
