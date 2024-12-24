"use client";

import { useFormContext } from "../context/FormContext";
import { validateField } from "../utils/validation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, UserRound, HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StepNavigation } from "@/components/StepNavigation";
import { motion } from "framer-motion";
import { pageTransition } from "@/utils/animations";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Step1 = () => {
  const { formData, setFormData, errors, setErrors } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Special handling for phone number
    if (name === "phone") {
      // Remove non-digits
      const numbersOnly = value.replace(/\D/g, "");
      // Limit to 10 digits
      const truncated = numbersOnly.slice(0, 10);
      // Update form with cleaned value
      const updates = { [name]: truncated };
      setFormData(updates);

      // Validate phone number
      const error = validateField(name, truncated);
      interface FormErrors {
        [key: string]: string | undefined;
      }

      interface FormData {
        fullName?: string;
        email?: string;
        phone?: string;
        MBTI?: string;
        linkedin?: string;
      }
      return;
    }

    // Handle other fields normally
    const updates = { [name]: value };
    setFormData(updates);
    const error = validateField(name, value);
    interface FormErrors {
      [key: string]: string | undefined;
    }

    // Update errors directly with the new object
    setErrors({
      ...errors,
      [name]: error || "",
    });
  };

  return (
    <motion.div key="step1" {...pageTransition}>
      <Card className="border-border bg-card">
        <CardContent className="p-6 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <User className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-2xl font-semibold text-foreground">
                Personal Information
              </h2>
            </div>
            <div className="space-y-4 flex-grow">
              {/* Full Name field */}
              <div className="grid gap-2">
                <Label
                  htmlFor="fullName"
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-2">
                    <span>Full Name</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Enter your legal full name as it appears on official
                            documents
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  {errors.fullName && (
                    <span className="text-red-500 text-sm">
                      {errors.fullName}
                    </span>
                  )}
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  className={errors.fullName ? "border-red-500" : ""}
                  placeholder="Enter your full legal name"
                  value={formData.fullName || ""}
                  onChange={handleChange}
                />
              </div>

              {/* Email and Phone fields in same line */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email field */}
                <div className="grid gap-2">
                  <Label
                    htmlFor="email"
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-2">
                      <span>Professional Email</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Use your work email for better verification
                              chances
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    {errors.email && (
                      <span className="text-red-500 text-sm">
                        {errors.email}
                      </span>
                    )}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none z-20" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      className={`pl-9 ${errors.email ? "border-red-500" : ""}`}
                      placeholder="your.name@company.com"
                      value={formData.email || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Phone field */}
                <div className="grid gap-2">
                  <Label
                    htmlFor="phone"
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-2">
                      <span>Contact Number</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Enter a valid phone number where we can reach you
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    {errors.phone && (
                      <span className="text-red-500 text-sm">
                        {errors.phone}
                      </span>
                    )}
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none z-20" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      className={`pl-9 ${errors.phone ? "border-red-500" : ""}`}
                      placeholder="10-digit phone number"
                      maxLength={10}
                      value={formData.phone || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* MBTI field */}
              <div className="grid gap-2">
                <Label
                  htmlFor="MBTI"
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-2">
                    <span>MBTI Personality Type (Optional)</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Share your 16 personalities type if you know it.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  {errors.MBTI && (
                    <span className="text-red-500 text-sm">{errors.MBTI}</span>
                  )}
                </Label>
                <div className="relative">
                  <UserRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none z-20" />
                  <Input
                    id="MBTI"
                    name="MBTI"
                    className="pl-9"
                    placeholder="Your Personality Type"
                    value={formData.MBTI || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-4">
                We value your privacy and will not share your information.
              </p>
            </div>
          </div>
          <StepNavigation isFirstStep />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Step1;
