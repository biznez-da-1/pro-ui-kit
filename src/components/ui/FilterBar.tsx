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
  const hasActiveFilter = value !== undefined && value !== "";

  return (
    <div className={cn("flex flex-wrap items-center gap-2 rounded-2xl border border-neutral-800 bg-neutral-950 p-3", className)}>
      {options.length > 0 && (
        <div className="flex min-w-0 items-center gap-2">
          <label htmlFor="filter-bar-select" className="flex items-center gap-2 text-sm font-medium text-neutral-400">
            <Filter className="h-4 w-4" aria-hidden="true" />
            <span>{label}</span>
          </label>
          <select
            id="filter-bar-select"
            value={value ?? ""}
            onChange={(event) => onChange?.(event.target.value)}
            className="h-9 min-w-32 rounded-lg border border-neutral-800 bg-neutral-900 px-3 text-sm text-neutral-200 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
          >
            <option value="">All</option>
            {options.map((option) => <option key={option.id} value={option.value}>{option.label}</option>)}
          </select>
        </div>
      )}

      {children}

      {hasActiveFilter && onClear && (
        <Button type="button" variant="ghost" size="sm" onClick={onClear} className="text-neutral-400">
          <X className="h-4 w-4" aria-hidden="true" />
          Clear filters
        </Button>
      )}
    </div>
  );
}
