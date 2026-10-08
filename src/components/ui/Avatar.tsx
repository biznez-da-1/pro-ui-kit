"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

export function Avatar({
  src,
  alt = "",
  fallback = "?",
  size = "md",
  className,
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);

  const showImage = Boolean(src) && !imageError;

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-neutral-700 bg-neutral-800 font-semibold text-neutral-300",
        sizes[size],
        className,
      )}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span aria-hidden={alt ? "true" : undefined}>
          {fallback}
        </span>
      )}
    </div>
  );
}
