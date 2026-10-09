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
  const initialTab = tabs.some((tab) => tab.id === defaultTab) ? defaultTab : tabs[0]?.id;
  const [activeTab, setActiveTab] = React.useState(initialTab);
  const baseId = React.useId();
  const tabRefs = React.useRef(new Map<string, HTMLButtonElement>());

  React.useEffect(() => {
    if (!tabs.some((tab) => tab.id === activeTab)) setActiveTab(tabs[0]?.id);
  }, [activeTab, tabs]);

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
      <div role="tablist" aria-label={label} className="flex gap-1 overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950 p-1">
        {tabs.map((tab, index) => {
          const active = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              ref={(node) => { if (node) tabRefs.current.set(tab.id, node); else tabRefs.current.delete(tab.id); }}
              id={`${baseId}-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={active ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                "shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                active ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-400 hover:bg-neutral-900 hover:text-white",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`${baseId}-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          tabIndex={0}
          hidden={tab.id !== activeTab}
          className="mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          {tab.content}
        </div>
      ))}
      {tabs.length === 0 && <p className="mt-4 text-sm text-neutral-400">No tabs available.</p>}
    </div>
  );
}
