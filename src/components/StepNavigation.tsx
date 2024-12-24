"use client";

import { useFormContext } from "@/context/FormContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface StepNavigationProps {
  isFirstStep?: boolean;
  isLastStep?: boolean;
}

export function StepNavigation({
  isFirstStep,
  isLastStep,
}: StepNavigationProps) {
  const { prevStep, nextStep } = useFormContext();

  return (
    <div className="flex justify-between gap-4 mt-6">
      {!isFirstStep && (
        <Button
          variant="outline"
          onClick={prevStep}
          className="min-w-[100px] bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground border-input transition-colors"
        >
          Back
        </Button>
      )}
      <Button
        variant="default"
        onClick={nextStep}
        className={`${!isFirstStep ? "flex-1" : "w-full"}`}
      >
        {isLastStep ? "Submit" : "Continue"}
      </Button>
    </div>
  );
}
