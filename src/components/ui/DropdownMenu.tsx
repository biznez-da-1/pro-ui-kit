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
  trigger: React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>>;
  items: DropdownMenuItem[];
  align?: "left" | "right";
  className?: string;
}

export function DropdownMenu({ trigger, items, align = "right", className }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const closeMenu = React.useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) requestAnimationFrame(() => rootRef.current?.querySelector<HTMLButtonElement>("button")?.focus());
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const first = menuRef.current?.querySelector<HTMLButtonElement>(':scope > div > button[role^="menuitem"]:not(:disabled)');
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
      if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;

      const activeElement = document.activeElement as HTMLElement | null;
      const activeMenu = activeElement?.closest<HTMLDivElement>('[role="menu"]');
      if (!activeMenu || !rootRef.current?.contains(activeMenu)) return;

      const enabled = Array.from(
        activeMenu.querySelectorAll<HTMLButtonElement>(':scope > div > button[role^="menuitem"]:not(:disabled)'),
      );
      if (!enabled.length) return;
      event.preventDefault();
      const index = enabled.indexOf(activeElement as HTMLButtonElement);
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

  const triggerElement = React.cloneElement(trigger, {
    type: "button",
    "aria-haspopup": "menu",
    "aria-expanded": open,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
      trigger.props.onClick?.(event);
      setOpen((value) => !value);
    },
    onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => {
      trigger.props.onKeyDown?.(event);
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
            "absolute z-50 mt-2 min-w-48 overflow-hidden rounded-xl border border-border bg-surface p-1 shadow-2xl",
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

function MenuItem({
  item,
  onClose,
  onNavigateBack,
}: {
  item: DropdownMenuItem;
  onClose: () => void;
  onNavigateBack?: () => void;
}) {
  const [submenuOpen, setSubmenuOpen] = React.useState(false);
  const hasSubmenu = Boolean(item.submenu?.length);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const submenuRef = React.useRef<HTMLDivElement>(null);

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
        ref={triggerRef}
        type="button"
        role={item.checked === undefined ? "menuitem" : "menuitemcheckbox"}
        aria-checked={item.checked}
        disabled={item.disabled}
        aria-haspopup={hasSubmenu ? "menu" : undefined}
        aria-expanded={hasSubmenu ? submenuOpen : undefined}
        onClick={handleSelect}
        onKeyDown={(event) => {
          if (
            hasSubmenu &&
            submenuOpen &&
            (event.key === "ArrowLeft" || event.key === "Escape")
          ) {
            event.preventDefault();
            event.stopPropagation();
            setSubmenuOpen(false);
            triggerRef.current?.focus();
          } else if (
            hasSubmenu &&
            (event.key === "Enter" || event.key === " ")
          ) {
            event.preventDefault();
            const nextOpen = !submenuOpen;
            setSubmenuOpen(nextOpen);
            if (nextOpen) {
              requestAnimationFrame(() => {
                submenuRef.current?.querySelector<HTMLButtonElement>(':scope > div > button[role^="menuitem"]:not(:disabled)')?.focus();
              });
            }
          } else if (hasSubmenu && event.key === "ArrowRight") {
            event.preventDefault();
            setSubmenuOpen(true);
            requestAnimationFrame(() => {
              submenuRef.current?.querySelector<HTMLButtonElement>(':scope > div > button[role^="menuitem"]:not(:disabled)')?.focus();
            });
          } else if (
            onNavigateBack &&
            (event.key === "ArrowLeft" || event.key === "Escape")
          ) {
            event.preventDefault();
            event.stopPropagation();
            onNavigateBack();
          }
        }}
        onMouseEnter={() => hasSubmenu && setSubmenuOpen(true)}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
          item.destructive ? "text-danger hover:bg-danger/10" : "text-surface-foreground hover:bg-muted",
          item.disabled && "cursor-not-allowed opacity-40",
        )}
      >
        {item.checked ? <Check className="h-4 w-4 shrink-0" aria-hidden="true" /> : <span className="h-4 w-4 shrink-0" aria-hidden="true" />}
        <span className="min-w-0 flex-1">{item.label}</span>
        {hasSubmenu && <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />}
      </button>
      {hasSubmenu && submenuOpen && (
        <div ref={submenuRef} role="menu" aria-label={item.label} className="absolute left-full top-0 z-50 ml-1 min-w-48 rounded-xl border border-border bg-surface p-1 shadow-2xl">
          {item.submenu?.map((subitem) => (
            <MenuItem
              key={subitem.id}
              item={subitem}
              onClose={onClose}
              onNavigateBack={() => {
                setSubmenuOpen(false);
                triggerRef.current?.focus();
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
