"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/cn";

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  onClear?: () => void;
  className?: string;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, defaultValue, onChange, onClear, className, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);
    const [internalValue, setInternalValue] = React.useState(String(defaultValue ?? ""));
    const currentValue = value !== undefined ? String(value ?? "") : internalValue;
    const hasValue = currentValue.length > 0;
    const explicitLabel = props["aria-label"]?.trim();
    const labelledBy = props["aria-labelledby"]?.trim();
    const accessibleLabel = explicitLabel || (labelledBy ? undefined : "Search");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) setInternalValue(event.target.value);
      onChange?.(event);
    };

    const handleClear = () => {
      if (value === undefined) setInternalValue("");
      onClear?.();
      inputRef.current?.focus();
    };

    return (
      <div className={cn("relative w-full", className)}>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <input
          ref={inputRef}
          type="search"
          value={currentValue}
          onChange={handleChange}
          className={cn(
            "h-10 w-full rounded-ui border border-border bg-surface py-2 pl-9 pr-10 text-sm text-surface-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
            onClear && "[&::-webkit-search-cancel-button]:hidden",
          )}
          {...props}
          aria-label={accessibleLabel}
        />
        {hasValue && onClear && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-ui text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";
