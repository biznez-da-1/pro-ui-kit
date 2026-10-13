"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}

const sideClasses = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
  bottom: "left-1/2 top-full mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
};

export function Tooltip({ content, children, side = "top", className }: TooltipProps) {
  const [focused, setFocused] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const open = focused || hovered;
  const tooltipId = React.useId();
  const child = React.Children.only(children);

  const trigger = React.cloneElement(child, {
    "aria-describedby": [child.props["aria-describedby"], tooltipId].filter(Boolean).join(" "),
    onFocus: (event: React.FocusEvent<HTMLElement>) => {
      child.props.onFocus?.(event);
      setFocused(true);
    },
    onBlur: (event: React.FocusEvent<HTMLElement>) => {
      child.props.onBlur?.(event);
      setFocused(false);
    },
    onMouseEnter: (event: React.MouseEvent<HTMLElement>) => {
      child.props.onMouseEnter?.(event);
    },
    onMouseLeave: (event: React.MouseEvent<HTMLElement>) => {
      child.props.onMouseLeave?.(event);
    },
  } as React.HTMLAttributes<HTMLElement>);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          event.stopPropagation();
          setFocused(false);
          setHovered(false);
        }
      }}
    >
      {trigger}
      <span
        id={tooltipId}
        role="tooltip"
        hidden={!open}
        className={cn(
          "pointer-events-none absolute z-50 whitespace-nowrap rounded-lg border border-border bg-muted px-2.5 py-1.5 text-xs font-medium text-foreground shadow-xl",
          sideClasses[side],
          className,
        )}
      >
        {content}
      </span>
    </span>
  );
}
