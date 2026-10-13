import * as React from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps
  extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

export function Breadcrumb({
  items,
  separator,
  className,
  ...props
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("w-full", className)}
      {...props}
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const label = item.label.trim() || (isLast ? "Current page" : `Breadcrumb ${index + 1}`);

          return (
            <React.Fragment key={`${item.label}-${index}`}>
              {index > 0 && (
                <li
                  aria-hidden="true"
                  className="text-muted-foreground"
                >
                  {separator ?? (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </li>
              )}

              <li>
                {isLast ? (
                  <span
                    aria-current="page"
                    className="font-medium text-surface-foreground"
                  >
                    {label}
                  </span>
                ) : item.href ? (
                  <a
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-foreground focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {label}
                  </a>
                ) : (
                  <span className="text-muted-foreground">
                    {label}
                  </span>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

export function BreadcrumbEllipsis({
  className,
}: {
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label="More breadcrumb items"
      className={cn(
        "inline-flex items-center justify-center text-muted-foreground",
        className,
      )}
    >
      <MoreHorizontal
        className="h-4 w-4"
        aria-hidden="true"
      />
    </span>
  );
}
