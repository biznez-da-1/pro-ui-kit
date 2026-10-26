"use client";
import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/cn";

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  onClear?: () => void;
  className?: string;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(({
  value,
  defaultValue,
  onChange,
  onClear,
  className,
  placeholder,
  "aria-label": ariaLabel,
  ...props
}, ref) => {
  const [internalValue, setInternalValue] = React.useState<string>(() => {
    if (typeof defaultValue === "string") return defaultValue;
    return defaultValue == null ? "" : String(defaultValue);
  });
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const hasValue = currentValue != null && String(currentValue).length > 0;
  const accessibleLabel = ariaLabel?.trim() || placeholder?.trim() || "Search";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(event.target.value);
    onChange?.(event);
  };
  const handleClear = () => {
    if (!isControlled) setInternalValue("");
    onClear?.();
  };

  return (
    <div className={cn("relative w-full", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" aria-hidden="true" />
      <input
        ref={ref}
        type="search"
        value={currentValue}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label={accessibleLabel}
        className="h-10 w-full rounded-xl border border-neutral-800 bg-neutral-950 py-2 pl-9 pr-10 text-sm text-white placeholder:text-neutral-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
        {...props}
      />
      {hasValue && onClear && (
        <button type="button" onClick={handleClear} aria-label="Clear search" className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
});
SearchInput.displayName = "SearchInput";
