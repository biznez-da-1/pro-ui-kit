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

          return (
            <React.Fragment key={`${item.label}-${index}`}>
              {index > 0 && (
                <li
                  aria-hidden="true"
                  className="text-neutral-600"
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
                    className="font-medium text-white"
                  >
                    {item.label}
                  </span>
                ) : item.href ? (
                  <a
                    href={item.href}
                    className="text-neutral-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="text-neutral-400">
                    {item.label}
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
      aria-label="More"
      className={cn(
        "inline-flex items-center justify-center text-neutral-500",
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
