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
  const titleText = title.trim() || "Plan";
  const priceText = price.trim() || "—";
  const descriptionText = description?.trim();
  const periodText = period?.trim();

  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-ui-xl border bg-surface p-6 shadow-lg",
        popular
          ? "border-primary/50 ring-1 ring-primary/20"
          : "border-border",
        className,
      )}
    >
      {popular && (
        <div className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
          Most Popular
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold text-surface-foreground">
          {titleText}
        </h3>

        {descriptionText && (
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {descriptionText}
          </p>
        )}

        <div className="mt-6 flex items-baseline gap-1">
          <span className="text-4xl font-bold tracking-tight text-surface-foreground">
            {priceText}
          </span>

          {periodText && (
            <span className="text-sm text-muted-foreground">
              {periodText}
            </span>
          )}
        </div>
      </div>

      <ul className="mt-8 flex-1 space-y-3">
        {features.map((feature, index) => {
          const featureText = feature.trim() || `Feature ${index + 1}`;

          return (
            <li
              key={`${feature}-${index}`}
              className="flex items-start gap-3 text-sm text-surface-foreground"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                <Check
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />
              </span>

              <span>{featureText}</span>
            </li>
          );
        })}
      </ul>

      {button && (
        <div className="mt-8">
          {button}
        </div>
      )}
    </div>
  );
}
