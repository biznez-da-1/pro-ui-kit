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
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  if (steps.length === 0) {
    return <p role="status" className={cn("text-sm text-neutral-500", className)}>No steps available.</p>;
  }

  const requestedStep = Number.isFinite(currentStep) ? Math.trunc(currentStep) : 1;
  const activeStep = Math.min(steps.length, Math.max(1, requestedStep));

  return (
    <ol className={cn("flex w-full items-start", className)}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const completed = stepNumber < activeStep;
        const active = stepNumber === activeStep;
        const label = step.label.trim() || `Step ${stepNumber}`;
        const description = step.description?.trim();

        return (
          <li key={step.id} className="flex min-w-0 flex-1 items-start">
            <div className="flex min-w-0 flex-1 flex-col items-center text-center">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors",
                  completed && "border-emerald-500 bg-emerald-500 text-white",
                  active && "border-indigo-500 bg-indigo-600 text-white",
                  !completed && !active && "border-neutral-700 bg-neutral-950 text-neutral-500",
                )}
                aria-current={active ? "step" : undefined}
                aria-label={`${label}: ${completed ? "completed" : active ? "current step" : "upcoming"}`}
              >
                {completed ? <Check className="h-4 w-4" aria-hidden="true" /> : stepNumber}
              </div>
              <div className="mt-3">
                <p className={cn("text-sm font-medium", active || completed ? "text-white" : "text-neutral-500")}>{label}</p>
                {description && <p className="mt-1 text-xs leading-5 text-neutral-500">{description}</p>}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={cn("mt-[18px] h-px flex-1", completed ? "bg-emerald-500" : "bg-neutral-800")} aria-hidden="true" />
            )}
          </li>
        );
      })}
    </ol>
  );
}
