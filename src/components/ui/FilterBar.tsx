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
}

function hasRenderableContent(node: React.ReactNode): boolean {
  if (node == null || typeof node === "boolean") return false;
  if (typeof node === "string") return node.trim().length > 0;
  if (typeof node === "number") return true;
  if (Array.isArray(node)) return node.some(hasRenderableContent);
  if (React.isValidElement(node) && node.type === React.Fragment) {
    const fragment = node as React.ReactElement<{ children?: React.ReactNode }>;
    return hasRenderableContent(fragment.props.children);
  }
  return true;
}

export function FilterBar({
  options,
  value,
  onChange,
  onClear,
  children,
  className,
}: FilterBarProps) {
  const hasActiveFilter = Boolean(value?.trim());
  const hasClearAction = hasActiveFilter && Boolean(onClear);
  const hasChildren = hasRenderableContent(children);

  if (options.length === 0 && !hasChildren && !hasClearAction) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-2xl border border-neutral-800 bg-neutral-950 p-3",
        className,
      )}
    >
      {(options.length > 0 || hasClearAction) && (
      <div className="flex items-center gap-2 text-sm font-medium text-neutral-400">
        <Filter
          className="h-4 w-4"
          aria-hidden="true"
        />
        <span>Filter</span>
      </div>
      )}

      {options.length > 0 && (
        <select
          value={value ?? ""}
          onChange={(event) => onChange?.(event.target.value)}
          aria-label="Filter"
          className="h-9 min-w-32 rounded-lg border border-neutral-800 bg-neutral-900 px-3 text-sm text-neutral-200 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
        >
          <option value="">All</option>

          {options.map((option) => (
            <option
              key={option.id}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      )}

      {hasChildren ? children : null}

      {hasClearAction && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-neutral-400"
        >
          <X
            className="h-4 w-4"
            aria-hidden="true"
          />
          Clear
        </Button>
      )}
    </div>
  );
}
