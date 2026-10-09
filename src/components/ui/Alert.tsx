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
    className: "border-blue-500/30 bg-blue-500/10 text-blue-300",
  },
  success: {
    icon: CheckCircle2,
    className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  },
  warning: {
    icon: TriangleAlert,
    className: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  },
  error: {
    icon: XCircle,
    className: "border-red-500/30 bg-red-500/10 text-red-300",
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

  return (
    <div
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      aria-atomic="true"
      className={cn(
        "flex gap-3 rounded-2xl border p-4",
        config.className,
        className,
      )}
      {...props}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div className="min-w-0">
        {title && <p className="text-sm font-semibold text-white">{title}</p>}
        <div className="mt-1 text-sm leading-6 text-neutral-300">{children}</div>
      </div>
    </div>
  );
}
