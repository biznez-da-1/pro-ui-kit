"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

export interface NavbarProps {
  logo?: React.ReactNode;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  mobileMenu?: React.ReactNode;
  className?: string;
}

export function Navbar({
  logo,
  children,
  actions,
  mobileMenu,
  className,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const mobileMenuId = React.useId();
  const mobileToggleRef = React.useRef<HTMLButtonElement>(null);

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        "relative border-b border-border bg-surface backdrop-blur-xl",
        className,
      )}
      onKeyDown={(event) => {
        if (event.key === "Escape" && mobileOpen) {
          event.preventDefault();
          event.stopPropagation();
          setMobileOpen(false);
          mobileToggleRef.current?.focus();
        }
      }}
    >
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-6">
          {logo && <div className="shrink-0">{logo}</div>}
          <div className="hidden items-center gap-1 md:flex">{children}</div>
        </div>

        <div className="hidden items-center gap-3 md:flex">{actions}</div>

        <button
          ref={mobileToggleRef}
          type="button"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls={mobileMenuId}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-ui-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      <div id={mobileMenuId} hidden={!mobileOpen} className="border-t border-border px-4 py-4 md:hidden">
        <div className="flex flex-col gap-2">{mobileMenu ?? children}</div>
        {actions && <div className="mt-4 border-t border-border pt-4">{actions}</div>}
      </div>
    </nav>
  );
}
