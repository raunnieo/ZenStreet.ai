"use client";

import { useFormContext } from "@/context/FormContext";

export default function ProgressBar() {
  const { step } = useFormContext();
  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-[#16678c] dark:text-[#5299bd]">
          Step {step} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-[#16678c] dark:text-[#5299bd]">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#16678c] dark:bg-[#5299bd] transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
