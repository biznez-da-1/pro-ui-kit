"use client";

import * as React from "react";
import { Filter, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "./Button";

export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

export interface FilterBarProps {
  options: FilterOption[];
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  children?: React.ReactNode;
  className?: string;
  label?: string;
}

export function FilterBar({ options, value, onChange, onClear, children, className, label = "Filter by" }: FilterBarProps) {
  const selectId = React.useId();
  const hasActiveFilter = value !== undefined && value !== "";

  return (
    <div className={cn("flex flex-wrap items-center gap-2 rounded-ui-xl border border-border bg-surface p-3", className)}>
      {options.length > 0 && (
        <div className="flex min-w-0 items-center gap-2">
          <label htmlFor={selectId} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Filter className="h-4 w-4" aria-hidden="true" />
            <span>{label}</span>
          </label>
          <select
            id={selectId}
            value={value ?? ""}
            onChange={(event) => onChange?.(event.target.value)}
            className="h-9 min-w-32 rounded-ui border border-border bg-muted px-3 text-sm text-surface-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
          >
            <option value="">All</option>
            {options.map((option) => <option key={option.id} value={option.value}>{option.label}</option>)}
          </select>
        </div>
      )}

      {children}

      {hasActiveFilter && onClear && (
        <Button type="button" variant="ghost" size="sm" onClick={onClear} className="text-muted-foreground">
          <X className="h-4 w-4" aria-hidden="true" />
          Clear filters
        </Button>
      )}
    </div>
  );
}
