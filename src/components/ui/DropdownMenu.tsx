"use client";

import * as React from "react";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export interface DropdownMenuItem {
  id: string;
  label: string;
  onSelect?: () => void;
  disabled?: boolean;
  checked?: boolean;
  destructive?: boolean;
  submenu?: DropdownMenuItem[];
}

export interface DropdownMenuProps {
  /** Use a single button-like element, such as the Button component. */
  trigger: React.ReactElement;
  items: DropdownMenuItem[];
  align?: "left" | "right";
  className?: string;
}

export function DropdownMenu({ trigger, items, align = "right", className }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLElement | null>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const closeMenu = React.useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const first = menuRef.current?.querySelector<HTMLButtonElement>('[role="menuitem"]:not(:disabled)');
    first?.focus();

    const handlePointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        closeMenu(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        closeMenu(true);
        return;
      }
      if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key) || !menuRef.current) return;
      const enabled = Array.from(menuRef.current.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)'));
      if (!enabled.length) return;
      event.preventDefault();
      const index = enabled.indexOf(document.activeElement as HTMLButtonElement);
      const next = event.key === "Home" ? 0
        : event.key === "End" ? enabled.length - 1
        : event.key === "ArrowDown" ? (index + 1 + enabled.length) % enabled.length
        : (index - 1 + enabled.length) % enabled.length;
      enabled[next]?.focus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, closeMenu]);

  const triggerElement = React.cloneElement(trigger as React.ReactElement<any>, {
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node;
      const originalRef = (trigger as any).ref;
      if (typeof originalRef === "function") originalRef(node);
      else if (originalRef && typeof originalRef === "object") originalRef.current = node;
    },
    type: "button",
    "aria-haspopup": "menu",
    "aria-expanded": open,
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      (trigger.props as any).onClick?.(event);
      setOpen((value) => !value);
    },
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
      (trigger.props as any).onKeyDown?.(event);
      if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setOpen(true);
      }
    },
  });

  return (
    <div ref={rootRef} className="relative inline-block text-left">
      {triggerElement}
      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Actions"
          onKeyDown={(event) => {
            if (event.key === "Tab") closeMenu(false);
          }}
          className={cn(
            "absolute z-50 mt-2 min-w-48 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 p-1 shadow-2xl",
            align === "right" ? "right-0" : "left-0",
            className,
          )}
        >
          {items.map((item) => (
            <MenuItem key={item.id} item={item} onClose={() => closeMenu(true)} />
          ))}
        </div>
      )}
    </div>
  );
}

function MenuItem({ item, onClose }: { item: DropdownMenuItem; onClose: () => void }) {
  const [submenuOpen, setSubmenuOpen] = React.useState(false);
  const hasSubmenu = Boolean(item.submenu?.length);

  const handleSelect = () => {
    if (item.disabled) return;
    if (hasSubmenu) {
      setSubmenuOpen((value) => !value);
      return;
    }
    item.onSelect?.();
    onClose();
  };

  return (
    <div className="relative">
      <button
        type="button"
        role="menuitem"
        disabled={item.disabled}
        aria-haspopup={hasSubmenu ? "menu" : undefined}
        aria-expanded={hasSubmenu ? submenuOpen : undefined}
        onClick={handleSelect}
        onMouseEnter={() => hasSubmenu && setSubmenuOpen(true)}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500",
          item.destructive ? "text-red-400 hover:bg-red-500/10" : "text-neutral-200 hover:bg-neutral-800",
          item.disabled && "cursor-not-allowed opacity-40",
        )}
      >
        {item.checked ? <Check className="h-4 w-4 shrink-0" aria-hidden="true" /> : <span className="h-4 w-4 shrink-0" aria-hidden="true" />}
        <span className="min-w-0 flex-1">{item.label}</span>
        {hasSubmenu && <ChevronRight className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden="true" />}
      </button>
      {hasSubmenu && submenuOpen && (
        <div role="menu" aria-label={item.label} className="absolute left-full top-0 z-50 ml-1 min-w-48 rounded-xl border border-neutral-800 bg-neutral-950 p-1 shadow-2xl">
          {item.submenu?.map((subitem) => <MenuItem key={subitem.id} item={subitem} onClose={onClose} />)}
        </div>
      )}
    </div>
  );
}
