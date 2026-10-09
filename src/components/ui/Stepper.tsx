import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export interface Step {
  id: string;
  label: string;
  description?: string;
}

export interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
  label?: string;
}

export function Stepper({ steps, currentStep, className, label = "Progress" }: StepperProps) {
  const current = steps.length ? Math.min(steps.length, Math.max(1, Number.isFinite(currentStep) ? Math.floor(currentStep) : 1)) : 0;

  return (
    <nav aria-label={label} className={cn("w-full", className)}>
      <ol className="flex w-full items-start">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const completed = stepNumber < current;
          const active = stepNumber === current;

          return (
            <React.Fragment key={step.id}>
              <li className="flex min-w-0 flex-1 flex-col items-center text-center">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors motion-reduce:transition-none",
                    completed && "border-emerald-500 bg-emerald-500 text-white",
                    active && "border-indigo-500 bg-indigo-600 text-white",
                    !completed && !active && "border-neutral-700 bg-neutral-950 text-neutral-500",
                  )}
                  aria-current={active ? "step" : undefined}
                  aria-label={`Step ${stepNumber}: ${step.label}${completed ? ", completed" : active ? ", current" : ""}`}
                >
                  {completed ? <Check className="h-4 w-4" aria-hidden="true" /> : stepNumber}
                </div>
                <div className="mt-3">
                  <p className={cn("text-sm font-medium", active || completed ? "text-white" : "text-neutral-500")}>
                    {step.label}
                  </p>
                  {step.description && <p className="mt-1 text-xs leading-5 text-neutral-500">{step.description}</p>}
                </div>
              </li>
              {index < steps.length - 1 && (
                <li className={cn("mt-[18px] h-px flex-1 list-none", completed ? "bg-emerald-500" : "bg-neutral-800")} aria-hidden="true" />
              )}
            </React.Fragment>
          );
        })}
      </ol>
      <p className="sr-only" aria-live="polite">
        {current ? `Step ${current} of ${steps.length}: ${steps[current - 1]?.label}` : "No steps available"}
      </p>
    </nav>
  );
}
