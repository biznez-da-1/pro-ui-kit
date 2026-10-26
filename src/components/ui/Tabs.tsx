"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface TabsProps {
  tabs: { id: string; label: string; content: React.ReactNode }[];
  defaultTab?: string;
  className?: string;
  label?: string;
}

export function Tabs({ tabs, defaultTab, className, label = "Content tabs" }: TabsProps) {
  const accessibleLabel = label.trim() || "Content tabs";
  const initialTab = tabs.some((tab) => tab.id === defaultTab) ? defaultTab : tabs[0]?.id;
  const [activeTab, setActiveTab] = React.useState<string | undefined>(initialTab);
  const selectedTab = tabs.some((tab) => tab.id === activeTab) ? activeTab : tabs[0]?.id;
  const baseId = React.useId();
  const tabRefs = React.useRef(new Map<string, HTMLButtonElement>());

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!tabs.length) return;
    let next: number | undefined;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    const nextId = tabs[next].id;
    setActiveTab(nextId);
    tabRefs.current.get(nextId)?.focus();
  };

  return (
    <div className={cn("w-full", className)}>
      <div role="tablist" aria-label={accessibleLabel} className="flex gap-1 overflow-x-auto rounded-ui-lg border border-border bg-surface p-1">
        {tabs.map((tab, index) => {
          const active = tab.id === selectedTab;
          const tabLabel = tab.label.trim() || tab.id.trim() || `Tab ${index + 1}`;
          return (
            <button
              key={tab.id}
              ref={(node) => { if (node) tabRefs.current.set(tab.id, node); else tabRefs.current.delete(tab.id); }}
              id={`${baseId}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={active ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                "shrink-0 rounded-ui px-4 py-2 text-sm font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active ? "bg-muted text-surface-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {tabLabel}
            </button>
          );
        })}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          id={`${baseId}-panel-${index}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${index}`}
          tabIndex={0}
          hidden={tab.id !== selectedTab}
          className="mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {tab.content}
        </div>
      ))}
      {tabs.length === 0 && <p className="mt-4 text-sm text-muted-foreground">No tabs available.</p>}
    </div>
  );
}
