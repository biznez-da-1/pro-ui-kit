"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

export interface AccordionItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  className?: string;
}

export function Accordion({
  items,
  type = "single",
  defaultValue,
  className,
}: AccordionProps) {
  const baseId = React.useId();
  const [open, setOpen] = React.useState<Set<string>>(() => {
    if (defaultValue == null) return new Set();
    const values = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    const validIds = new Set(items.map((item) => item.id));
    return new Set(
      (type === "single" ? values.slice(0, 1) : values).filter((id) => validIds.has(id)),
    );
  });

  const toggle = (id: string) => {
    setOpen((previous) => {
      if (previous.has(id)) {
        const next = new Set(previous);
        next.delete(id);
        return next;
      }
      if (type === "single") return new Set([id]);
      const next = new Set(previous);
      next.add(id);
      return next;
    });
  };

  if (items.length === 0) {
    return <p role="status" className={cn("text-sm text-neutral-500", className)}>No sections available.</p>;
  }

  return (
    <div className={cn("divide-y divide-neutral-800 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950", className)}>
      {items.map((item, index) => {
        const isOpen = open.has(item.id);
        const contentId = `${baseId}-content-${index}`;
        const title = typeof item.title === "string" && !item.title.trim()
          ? `Section ${index + 1}`
          : item.title;

        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => { if (!item.disabled) toggle(item.id); }}
              disabled={item.disabled}
              aria-expanded={isOpen}
              aria-controls={isOpen ? contentId : undefined}
              className={cn(
                "flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-neutral-100 transition-colors",
                "hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500",
                item.disabled && "cursor-not-allowed opacity-50",
              )}
            >
              <span>{title}</span>
              <ChevronDown
                className={cn("h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200", isOpen && "rotate-180")}
                aria-hidden="true"
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={contentId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 text-sm leading-relaxed text-neutral-400">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
