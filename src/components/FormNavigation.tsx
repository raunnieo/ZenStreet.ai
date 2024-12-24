"use client";

import { useFormContext } from '../context/FormContext';
import { ArrowLeft, ArrowRight } from "lucide-react";

const FormNavigation = () => {
  const { step, setStep } = useFormContext();

  return (
    <div className="flex justify-between mt-6 px-1">
      <button 
        onClick={() => setStep(step - 1)} 
        disabled={step === 1}
        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
          bg-background dark:bg-gray-700 border border-input dark:border-gray-600 
          hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-600
          disabled:opacity-50 disabled:pointer-events-none"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Previous
      </button>
      <button 
        onClick={() => setStep(step + 1)} 
        disabled={step === 4}
        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
          bg-primary text-primary-foreground dark:bg-blue-600 dark:text-white
          hover:bg-primary/90 dark:hover:bg-blue-700
          disabled:opacity-50 disabled:pointer-events-none"
      >
        Next <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </div>
  );
};

export default FormNavigation;
