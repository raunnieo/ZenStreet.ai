"use client";

import { useFormContext } from "../context/FormContext";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MapPin, Building, Home, Map, HelpCircle } from "lucide-react";
import { validateField } from "../utils/validation";
import { StepNavigation } from "@/components/StepNavigation";
import { motion } from "framer-motion";
import { pageTransition } from "@/utils/animations";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Step2 = () => {
  const { formData, setFormData, errors, setErrors } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value);
    interface FormData {
      streetAddress?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      [key: string]: string | undefined;
    }

    interface FormErrors {
      streetAddress?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      [key: string]: string | undefined;
    }

    interface FormContextType {
      formData: FormData;
      setFormData: React.Dispatch<React.SetStateAction<FormData>>;
      errors: FormErrors;
      setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
    }
  };

  return (
    <motion.div key="step2" {...pageTransition}>
      <Card className="border-border bg-card">
        <CardContent className="p-6 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-2xl font-semibold text-foreground">
                Address Details
              </h2>
            </div>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="streetAddress"
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-2">
                    <span>Street Address</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Enter your complete street address</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  {errors.streetAddress && (
                    <span className="text-red-500 text-sm">
                      {errors.streetAddress}
                    </span>
                  )}
                </Label>
                <div className="relative">
                  <Home className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none z-20" />
                  <Input
                    id="streetAddress"
                    name="streetAddress"
                    className="pl-9"
                    placeholder="Enter street address"
                    value={formData.streetAddress || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label
                  htmlFor="city"
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-2">
                    <span>City</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Enter your city name</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  {errors.city && (
                    <span className="text-red-500 text-sm">{errors.city}</span>
                  )}
                </Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none z-20" />
                  <Input
                    id="city"
                    name="city"
                    className="pl-9"
                    placeholder="Enter city"
                    value={formData.city || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="state"
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-2">
                      <span>State</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Enter your state or province</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    {errors.state && (
                      <span className="text-red-500 text-sm">
                        {errors.state}
                      </span>
                    )}
                  </Label>
                  <div className="relative">
                    <Map className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none z-20" />
                    <Input
                      id="state"
                      name="state"
                      className="pl-9"
                      placeholder="Enter state"
                      value={formData.state || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label
                    htmlFor="zipCode"
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-2">
                      <span>ZIP Code</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Enter your 6-digit postal code</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    {errors.zipCode && (
                      <span className="text-red-500 text-sm">
                        {errors.zipCode}
                      </span>
                    )}
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none z-20" />
                    <Input
                      id="zipCode"
                      name="zipCode"
                      className="pl-9"
                      placeholder="Enter ZIP code"
                      value={formData.zipCode || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <StepNavigation />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Step2;
