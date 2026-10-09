"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  active?: boolean;
  onClick?: () => void;
}

export interface SidebarProps {
  items: SidebarItem[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  className?: string;
}

export function Sidebar({
  items,
  header,
  footer,
  collapsed = false,
  onCollapsedChange,
  className,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-full min-h-[400px] flex-col border-r border-neutral-800 bg-neutral-950 transition-[width] duration-200 motion-reduce:transition-none",
        collapsed ? "w-20" : "w-64",
        className,
      )}
    >
      <div className="flex min-h-16 items-center border-b border-neutral-800 px-3">
        <div className="min-w-0 flex-1 overflow-hidden">
          {!collapsed && header}
        </div>

        {onCollapsedChange && (
          <button
            type="button"
            onClick={() => onCollapsedChange(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            ) : (
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        )}
      </div>

      <nav aria-label="Sidebar navigation" className="flex-1 overflow-y-auto p-3">
        <div className="space-y-1">
          {items.map((item) => {
            const content = (
              <>
                {item.icon && (
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center" aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                {!collapsed && <span className="truncate">{item.label}</span>}
              </>
            );

            const itemClassName = cn(
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors motion-reduce:transition-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
              collapsed && "justify-center",
              item.active
                ? "bg-indigo-600/15 text-indigo-300"
                : "text-neutral-400 hover:bg-neutral-900 hover:text-white",
            );

            if (item.href) {
              return (
                <a
                  key={item.id}
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  title={collapsed ? item.label : undefined}
                  aria-label={collapsed ? item.label : undefined}
                  className={itemClassName}
                >
                  {content}
                </a>
              );
            }

            return (
              <button
                key={item.id}
                type="button"
                onClick={item.onClick}
                title={collapsed ? item.label : undefined}
                aria-label={collapsed ? item.label : undefined}
                className={itemClassName}
              >
                {content}
              </button>
            );
          })}
        </div>
      </nav>

      {footer && (
        <div className="border-t border-neutral-800 p-3">
          {collapsed ? null : footer}
        </div>
      )}
    </aside>
  );
}
