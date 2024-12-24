"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  ValidationErrors,
  validateForm,
  validateField,
  validateSection,
} from "../utils/validation";
import {
  updateFormState,
  checkForUpdates,
  joinSession,
  leaveSession,
} from "../app/api/form/api";
import { debounce } from "../utils/debounce";

interface FieldUpdate {
  value: any;
  timestamp: number;
  clientId: string;
}

interface FormData {
  [field: string]: FieldUpdate;
}

interface FormContextType {
  step: number;
  setStep: (step: number) => void;
  formData: any;
  setFormData: (data: any) => void;
  errors: ValidationErrors;
  setErrors: (errors: ValidationErrors) => void;
  clearErrors: () => void;
  nextStep: () => void;
  prevStep: () => void;
}

interface FormProviderProps {
  children: ReactNode;
  initialSessionId: string;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({
  children,
  initialSessionId,
}: FormProviderProps) => {
  // Use useEffect for clientId generation to avoid hydration mismatch
  const [clientId, setClientId] = useState("");

  useEffect(() => {
    const storedId = window.sessionStorage.getItem("formClientId");
    const newId =
      storedId || `client_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    if (!storedId) {
      window.sessionStorage.setItem("formClientId", newId);
    }
    setClientId(newId);
  }, []);

  // Rest of state declarations
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [lastSync, setLastSync] = useState(0); // Changed from Date.now()
  const [isInitialized, setIsInitialized] = useState(false);
  const localUpdates = useRef<Set<string>>(new Set());

  // Convert field updates to simple values - moved to top
  const exposedFormData = Object.fromEntries(
    Object.entries(formData).map(([field, update]) => [field, update.value])
  );

  // Only proceed with initialization when clientId is available
  useEffect(() => {
    if (!initialSessionId || !clientId) return;

    const init = async () => {
      try {
        const result = await joinSession(initialSessionId, clientId);
        if (result?.data) {
          setFormData(result.data);
          setIsInitialized(true);
          console.log("Joined session with data:", result.data);
        }
      } catch (error) {
        console.error("Failed to join session:", error);
      }
    };

    init();

    return () => {
      if (clientId) {
        leaveSession(initialSessionId, clientId);
      }
    };
  }, [initialSessionId, clientId]);

  // Handle form updates with validation
  const handleFormDataUpdate = useCallback(
    (updates: any) => {
      console.log("Form update:", updates);
      setFormData((prev) => {
        const newData = { ...prev };
        Object.keys(updates).forEach((field) => {
          newData[field] = {
            value: updates[field],
            timestamp: Date.now(),
            clientId,
          };
          localUpdates.current.add(field);
        });
        return newData;
      });

      // Validate only the updated fields
      Object.keys(updates).forEach((field) => {
        const error = validateField(field, updates[field]);
        if (error) {
          setErrors((prev) => ({ ...prev, [field]: error }));
        } else {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
          });
        }
      });
    },
    [clientId]
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  // Add step navigation with validation using exposedFormData
  const nextStep = useCallback(() => {
    const currentStepErrors = validateSection(step, exposedFormData);
    if (Object.keys(currentStepErrors).length === 0) {
      setStep((prev) => Math.min(prev + 1, 5)); // Updated from 4 to 5
      clearErrors();
    } else {
      setErrors(currentStepErrors);
    }
  }, [step, exposedFormData, clearErrors]);

  const prevStep = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 1));
    clearErrors();
  }, [clearErrors]);

  // Sync changes to server
  useEffect(() => {
    if (!isInitialized || localUpdates.current.size === 0) return;

    const syncChanges = async () => {
      const updates = Object.fromEntries(
        Array.from(localUpdates.current).map((field) => [
          field,
          formData[field]?.value,
        ])
      );

      const result = await updateFormState(initialSessionId, updates, clientId);
      if (result?.timestamp) {
        setLastSync(result.timestamp);
        localUpdates.current.clear();
      }
    };

    syncChanges();
  }, [formData, initialSessionId, clientId, isInitialized]);

  // Poll for updates
  useEffect(() => {
    if (!isInitialized) return;

    const interval = setInterval(async () => {
      const updates = await checkForUpdates(
        initialSessionId,
        lastSync,
        clientId
      );
      if (updates?.modified) {
        setFormData((prev) => ({ ...prev, ...updates.data }));
        setLastSync(updates.lastModified);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [initialSessionId, lastSync, clientId, isInitialized]);

  // Show loading state until clientId is set
  if (!clientId) {
    return <div>Loading...</div>;
  }

  if (!isInitialized) {
    return <div>Initializing form session...</div>;
  }

  return (
    <FormContext.Provider
      value={{
        step,
        setStep,
        formData: exposedFormData,
        setFormData: handleFormDataUpdate,
        errors,
        setErrors,
        clearErrors,
        nextStep,
        prevStep,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
