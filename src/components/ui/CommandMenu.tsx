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

export function CommandMenu(props: CommandMenuProps) {
  if (!props.open) return null;

  return (
    <CommandMenuContent
      onClose={props.onClose}
      items={props.items}
      placeholder={props.placeholder}
      className={props.className}
    />
  );
}

function CommandMenuContent({
  onClose,
  items,
  placeholder = "Search commands...",
  className,
}: Omit<CommandMenuProps, "open">) {
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const baseId = React.useId();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const onCloseRef = React.useRef(onClose);

  React.useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const filtered = items.filter((item) => {
    const search = query.trim().toLowerCase();
    return item.label.toLowerCase().includes(search) ||
      Boolean(item.description?.toLowerCase().includes(search));
  });
  const safeActiveIndex = Math.min(activeIndex, Math.max(filtered.length - 1, 0));
  const activeOption = filtered[safeActiveIndex];

  React.useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const releaseScrollLock = acquireBodyScrollLock();
    const dialog = dialogRef.current;
    inputRef.current?.focus();

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialog) return;
      const focusable = getFocusableElements(dialog);
      if (!focusable.length) {
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
    };

    window.addEventListener("keydown", handleTabKey);
    return () => {
      releaseScrollLock();
      window.removeEventListener("keydown", handleTabKey);
      if (previouslyFocused?.isConnected) previouslyFocused.focus();
    };
  }, []);

  React.useEffect(() => {
    if (!activeOption) return;
    document.getElementById(`${baseId}-option-${safeActiveIndex}`)?.scrollIntoView({
      block: "nearest",
    });
  }, [safeActiveIndex, activeOption, baseId, query]);

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
      const item = filtered[safeActiveIndex];
      if (item) {
        item.onSelect();
        onCloseRef.current();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh]">
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => onCloseRef.current()}
      />
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${baseId}-title`}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            onCloseRef.current();
          }
        }}
        className={cn("relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl focus:outline-none", className)}
      >
        <h2 id={`${baseId}-title`} className="sr-only">Command menu</h2>
        <div className="flex items-center gap-3 border-b border-neutral-800 px-4">
          <Search className="h-5 w-5 shrink-0 text-neutral-500" aria-hidden="true" />
          <input
            ref={inputRef}
            role="combobox"
            aria-autocomplete="list"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder={placeholder}
            aria-label="Search commands"
            aria-controls={`${baseId}-results`}
            aria-expanded="true"
            aria-activedescendant={activeOption ? `${baseId}-option-${safeActiveIndex}` : undefined}
            className="h-14 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
          />
          <kbd className="hidden rounded-md border border-neutral-800 bg-neutral-900 px-2 py-1 text-xs text-neutral-500 sm:inline-flex">ESC</kbd>
        </div>
        <div id={`${baseId}-results`} role="listbox" aria-label="Command results" className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
              <Command className="h-6 w-6 text-neutral-600" aria-hidden="true" />
              <p className="mt-3 text-sm font-medium text-neutral-300">No commands found</p>
              <p className="mt-1 text-xs text-neutral-500">Try a different search.</p>
            </div>
          ) : filtered.map((item, index) => (
            <div
              key={item.id}
              id={`${baseId}-option-${index}`}
              role="option"
              aria-selected={index === safeActiveIndex}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                item.onSelect();
                onCloseRef.current();
              }}
              className={cn(
                "flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors",
                index === safeActiveIndex ? "bg-neutral-900" : "hover:bg-neutral-900/60",
              )}
            >
              {item.icon && <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950 text-neutral-400">{item.icon}</span>}
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-white">{item.label.trim() || "Command"}</span>
                {item.description?.trim() && <span className="mt-0.5 block truncate text-xs text-neutral-500">{item.description.trim()}</span>}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
