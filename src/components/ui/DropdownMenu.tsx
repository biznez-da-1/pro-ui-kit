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
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  align?: "left" | "right";
  className?: string;
}

export function DropdownMenu({
  trigger,
  items,
  align = "right",
  className,
}: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false);

  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={menuRef}
      className="relative inline-block text-left"
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {trigger}
      </button>

      {open && (
        <div
          role="menu"
          className={cn(
            "absolute z-50 mt-2 min-w-48 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 p-1 shadow-2xl",
            align === "right"
              ? "right-0"
              : "left-0",
            className,
          )}
        >
          {items.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              onClose={() => setOpen(false)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function MenuItem({
  item,
  onClose,
}: {
  item: DropdownMenuItem;
  onClose: () => void;
}) {
  const [submenuOpen, setSubmenuOpen] =
    React.useState(false);

  const hasSubmenu =
    Boolean(item.submenu?.length);

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
        onClick={handleSelect}
        onMouseEnter={() =>
          hasSubmenu && setSubmenuOpen(true)
        }
        className={cn(
          "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-indigo-500",
          item.destructive
            ? "text-red-400 hover:bg-red-500/10"
            : "text-neutral-200 hover:bg-neutral-800",
          item.disabled &&
            "cursor-not-allowed opacity-40",
        )}
      >
        {item.checked ? (
          <Check
            className="h-4 w-4 shrink-0"
            aria-hidden="true"
          />
        ) : (
          <span className="h-4 w-4 shrink-0" />
        )}

        <span className="min-w-0 flex-1">
          {item.label}
        </span>

        {hasSubmenu && (
          <ChevronRight
            className="h-4 w-4 shrink-0 text-neutral-500"
            aria-hidden="true"
          />
        )}
      </button>

      {hasSubmenu && submenuOpen && (
        <div
          role="menu"
          className="absolute left-full top-0 z-50 ml-1 min-w-48 rounded-xl border border-neutral-800 bg-neutral-950 p-1 shadow-2xl"
        >
          {item.submenu?.map((subitem) => (
            <MenuItem
              key={subitem.id}
              item={subitem}
              onClose={onClose}
            />
          ))}
        </div>
      )}
    </div>
  );
}
