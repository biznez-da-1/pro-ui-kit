"use client";

import * as React from "react";
import { Command, Search } from "lucide-react";
import { cn } from "@/lib/cn";
import { acquireBodyScrollLock } from "@/lib/body-scroll-lock";
import { getFocusableElements } from "@/lib/focusable-elements";

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

export function CommandMenu({ open, onClose, items, placeholder = "Search commands...", className }: CommandMenuProps) {
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const baseId = React.useId();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const onCloseRef = React.useRef(onClose);
  onCloseRef.current = onClose;

  const filtered = items.filter((item) => {
    const search = query.trim().toLowerCase();
    return item.label.toLowerCase().includes(search) || Boolean(item.description?.toLowerCase().includes(search));
  });
  const activeOption = filtered[activeIndex];

  React.useEffect(() => {
    if (!open) return;
    const releaseScrollLock = acquireBodyScrollLock();
    const previouslyFocused = document.activeElement as HTMLElement | null;
    setQuery("");
    setActiveIndex(0);
    inputRef.current?.focus();

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = getFocusableElements(dialogRef.current);

      if (!focusable.length) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;
      const focusIsOutsideDialog = !dialogRef.current.contains(activeElement);

      if (
        event.shiftKey &&
        (activeElement === first || activeElement === dialogRef.current || focusIsOutsideDialog)
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (activeElement === last || focusIsOutsideDialog)
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleTabKey);
    return () => {
      releaseScrollLock();
      window.removeEventListener("keydown", handleTabKey);
      previouslyFocused?.focus();
    };
  }, [open]);

  React.useEffect(() => {
    setActiveIndex((index) => Math.min(index, Math.max(filtered.length - 1, 0)));
  }, [filtered.length]);

  React.useEffect(() => {
    if (!open || !activeOption) return;
    document.getElementById(`${baseId}-option-${activeIndex}`)?.scrollIntoView({
      block: "nearest",
    });
  }, [activeIndex, activeOption, baseId, open, query]);

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      onCloseRef.current();
    } else if (event.key === "ArrowDown" && filtered.length) {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % filtered.length);
    } else if (event.key === "ArrowUp" && filtered.length) {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + filtered.length) % filtered.length);
    } else if (event.key === "Home" && filtered.length) {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === "End" && filtered.length) {
      event.preventDefault();
      setActiveIndex(filtered.length - 1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const item = filtered[activeIndex];
      if (item) {
        item.onSelect();
        onCloseRef.current();
      }
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh]">
      <button type="button" aria-hidden="true" tabIndex={-1} className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={cn("relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl", className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${baseId}-title`}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          event.stopPropagation();

          const dialog = dialogRef.current;
          if (!dialog) return;
          const focusable = getFocusableElements(dialog);
          if (focusable.length === 0) {
            event.preventDefault();
            dialog.focus();
            return;
          }

          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          const activeElement = document.activeElement;
          const focusIsOutsideDialog = !dialog.contains(activeElement);

          if (event.shiftKey && (activeElement === first || activeElement === dialog || focusIsOutsideDialog)) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && (activeElement === last || focusIsOutsideDialog)) {
            event.preventDefault();
            first.focus();
          }
        }}
      >
        <h2 id={`${baseId}-title`} className="sr-only">Command menu</h2>
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            ref={inputRef}
            role="combobox"
            aria-autocomplete="list"
            value={query}
            onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); }}
            onKeyDown={handleInputKeyDown}
            placeholder={placeholder}
            aria-label="Search commands"
            aria-controls={`${baseId}-results`}
            aria-expanded="true"
            aria-activedescendant={filtered[activeIndex] ? `${baseId}-option-${activeIndex}` : undefined}
            className="h-14 min-w-0 flex-1 bg-transparent text-sm text-surface-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
          />
          <kbd className="hidden rounded-md border border-border bg-muted px-2 py-1 text-xs text-muted-foreground sm:inline-flex">ESC</kbd>
        </div>
        <div id={`${baseId}-results`} role="listbox" aria-label="Command results" className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
              <Command className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
              <p className="mt-3 text-sm font-medium text-foreground">No commands found</p>
              <p className="mt-1 text-xs text-muted-foreground">Try a different search.</p>
            </div>
          ) : filtered.map((item, index) => (
            <div
              key={item.id}
              id={`${baseId}-option-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => { item.onSelect(); onCloseRef.current(); }}
              className={cn(
                "flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                index === activeIndex ? "bg-muted" : "hover:bg-muted",
              )}
            >
              {item.icon && <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground">{item.icon}</span>}
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-surface-foreground">{item.label.trim() || "Command"}</span>
                {item.description?.trim() && <span className="mt-0.5 block truncate text-xs text-muted-foreground">{item.description.trim()}</span>}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
