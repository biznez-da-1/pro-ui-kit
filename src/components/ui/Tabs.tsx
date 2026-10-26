"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface TabsProps {
  tabs: {
    id: string;
    label: string;
    content: React.ReactNode;
  }[];
  defaultTab?: string;
  className?: string;
  label?: string;
}

export function Tabs({
  tabs,
  defaultTab,
  className,
  label = "Content tabs",
}: TabsProps) {
  const accessibleLabel = label.trim() || "Content tabs";
  const initialTab = tabs.some((tab) => tab.id === defaultTab)
    ? defaultTab
    : tabs[0]?.id;
  const [activeTab, setActiveTab] = React.useState<string | undefined>(initialTab);
  const selectedTab = tabs.some((tab) => tab.id === activeTab)
    ? activeTab
    : tabs[0]?.id;
  const baseId = React.useId();
  const tabRefs = React.useRef(new Map<string, HTMLButtonElement>());

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (!tabs.length) return;

    let nextIndex: number | undefined;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    setActiveTab(nextTab.id);
    tabRefs.current.get(nextTab.id)?.focus();
  };

  return (
    <div className={cn("w-full", className)}>
      {tabs.length === 0 ? (
        <p role="status" className="text-sm text-neutral-500">
          No tabs available.
        </p>
      ) : (
        <>
          <div
            role="tablist"
            aria-label={accessibleLabel}
            className="flex gap-1 overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950 p-1"
          >
            {tabs.map((tab, index) => {
              const active = tab.id === selectedTab;
              const tabLabel = tab.label.trim() || tab.id.trim() || `Tab ${index + 1}`;
              const tabId = `${baseId}-tab-${index}`;

              return (
                <button
                  key={tab.id}
                  ref={(node) => {
                    if (node) tabRefs.current.set(tab.id, node);
                    else tabRefs.current.delete(tab.id);
                  }}
                  id={tabId}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls={`${baseId}-panel-${index}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className={cn(
                    "shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-indigo-500",
                    active
                      ? "bg-neutral-800 text-white shadow-sm"
                      : "text-neutral-400 hover:bg-neutral-900 hover:text-white",
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
              className="mt-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {tab.content}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
