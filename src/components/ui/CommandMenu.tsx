"use client";

import * as React from "react";
import { Command, Search } from "lucide-react";
import { cn } from "@/lib/cn";

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  onSelect: () => void;
}

export interface CommandMenuProps {
  open: boolean;
  onClose: () => void;
  items: CommandItem[];
  placeholder?: string;
  className?: string;
}

export function CommandMenu({
  open,
  onClose,
  items,
  placeholder = "Search commands...",
  className,
}: CommandMenuProps) {
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);

  const filtered = items.filter((item) => {
    const search = query.toLowerCase();

    return (
      item.label.toLowerCase().includes(search) ||
      item.description?.toLowerCase().includes(search)
    );
  });

  React.useEffect(() => {
    if (!open) return;

    setQuery("");
    setActiveIndex(0);
  }, [open]);

  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((index) =>
          Math.min(index + 1, Math.max(filtered.length - 1, 0)),
        );
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
      }

      if (event.key === "Enter") {
        event.preventDefault();

        const item = filtered[activeIndex];

        if (item) {
          item.onSelect();
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, filtered, activeIndex, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command menu"
    >
      <button
        type="button"
        aria-label="Close command menu"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={cn(
          "relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl",
          className,
        )}
      >
        <div className="flex items-center gap-3 border-b border-neutral-800 px-4">
          <Search
            className="h-5 w-5 shrink-0 text-neutral-500"
            aria-hidden="true"
          />

          <input
            autoFocus
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            placeholder={placeholder}
            className="h-14 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
          />

          <kbd className="hidden rounded-md border border-neutral-800 bg-neutral-900 px-2 py-1 text-xs text-neutral-500 sm:inline-flex">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
              <Command
                className="h-6 w-6 text-neutral-600"
                aria-hidden="true"
              />

              <p className="mt-3 text-sm font-medium text-neutral-300">
                No commands found
              </p>

              <p className="mt-1 text-xs text-neutral-500">
                Try a different search.
              </p>
            </div>
          ) : (
            filtered.map((item, index) => {
              const active = index === activeIndex;

              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => {
                    item.onSelect();
                    onClose();
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors",
                    active
                      ? "bg-neutral-900"
                      : "hover:bg-neutral-900/60",
                  )}
                >
                  {item.icon && (
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950 text-neutral-400">
                      {item.icon}
                    </span>
                  )}

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-white">
                      {item.label}
                    </span>

                    {item.description && (
                      <span className="mt-0.5 block truncate text-xs text-neutral-500">
                        {item.description}
                      </span>
                    )}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
