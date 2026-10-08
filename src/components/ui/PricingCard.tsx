import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  button?: React.ReactNode;
  popular?: boolean;
  className?: string;
}

export function PricingCard({
  title,
  price,
  period,
  description,
  features,
  button,
  popular = false,
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-2xl border bg-neutral-950 p-6 shadow-lg",
        popular
          ? "border-indigo-500/50 ring-1 ring-indigo-500/20"
          : "border-neutral-800",
        className,
      )}
    >
      {popular && (
        <div className="absolute -top-3 left-6 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
          Most Popular
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold text-white">
          {title}
        </h3>

        {description && (
          <p className="mt-2 text-sm leading-6 text-neutral-400">
            {description}
          </p>
        )}

        <div className="mt-6 flex items-baseline gap-1">
          <span className="text-4xl font-bold tracking-tight text-white">
            {price}
          </span>

          {period && (
            <span className="text-sm text-neutral-500">
              {period}
            </span>
          )}
        </div>
      </div>

      <ul className="mt-8 flex-1 space-y-3">
        {features.map((feature, index) => (
          <li
            key={`${feature}-${index}`}
            className="flex items-start gap-3 text-sm text-neutral-300"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
              <Check
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />
            </span>

            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {button && (
        <div className="mt-8">
          {button}
        </div>
      )}
    </div>
  );
}
