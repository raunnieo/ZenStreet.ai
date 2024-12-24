"use client";

import { useFormContext } from "@/context/FormContext";
import Step1 from "@/forms/Step1";
import Step2 from "@/forms/Step2";
import Step3 from "@/forms/Step3";
import Step4 from "@/forms/Step4";
import Step5 from "@/forms/Step5";
import ProgressBar from "@/components/ProgressBar";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function FormContent() {
  const { step, errors } = useFormContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full max-w-2xl mx-auto p-6">Loading...</div>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      {step < 5 && <ProgressBar />}
      <div className="min-h-[480px] relative">
        <AnimatePresence mode="wait">
          {step === 1 && <Step1 key="step1" />}
          {step === 2 && <Step2 key="step2" />}
          {step === 3 && <Step3 key="step3" />}
          {step === 4 && <Step4 key="step4" />}
          {step === 5 && <Step5 key="step5" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
