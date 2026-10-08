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
}

export function Tabs({
  tabs,
  defaultTab,
  className,
}: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(
    defaultTab ?? tabs[0]?.id,
  );

  const activeContent = tabs.find(
    (tab) => tab.id === activeTab,
  )?.content;

  return (
    <div className={cn("w-full", className)}>
      <div
        role="tablist"
        className="flex gap-1 overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950 p-1"
      >
        {tabs.map((tab) => {
          const active = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-indigo-500",
                active
                  ? "bg-neutral-800 text-white shadow-sm"
                  : "text-neutral-400 hover:bg-neutral-900 hover:text-white",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        className="mt-4"
      >
        {activeContent}
      </div>
    </div>
  );
}
