"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

export function Accordion({ items, type = "single", defaultValue, className }: AccordionProps) {
  const [open, setOpen] = React.useState<Set<string>>(() => {
    if (defaultValue == null) return new Set();
    const values = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    return new Set(type === "single" ? values.slice(0, 1) : values);
  });
  const baseId = React.useId();
  const reduceMotion = useReducedMotion();

  const toggle = (id: string) => setOpen((previous) => {
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

  return (
    <div className={cn("divide-y divide-neutral-800 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950", className)}>
      {items.map((item, index) => {
        const isOpen = open.has(item.id);
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div key={item.id}>
            <h3 className="m-0">
              <button
                id={triggerId}
                type="button"
                onClick={() => { if (!item.disabled) toggle(item.id); }}
                disabled={item.disabled}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className={cn(
                  "flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-neutral-100 transition-colors",
                  "hover:bg-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500",
                  item.disabled && "cursor-not-allowed opacity-50",
                )}
              >
                <span>{item.title}</span>
                <ChevronDown className={cn("h-4 w-4 shrink-0 text-neutral-500 transition-transform", !reduceMotion && "duration-200", isOpen && "rotate-180")} aria-hidden="true" />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 text-sm leading-relaxed text-neutral-400">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
