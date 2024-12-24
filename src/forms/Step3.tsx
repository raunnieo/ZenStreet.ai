"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/utils/animations";
import { useFormContext } from "../context/FormContext";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Settings, Target, HelpCircle } from "lucide-react";
import { validateField } from "../utils/validation";
import { StepNavigation } from "@/components/StepNavigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FIELDS_OF_INTEREST = [
  "Artificial Intelligence",
  "Marketing",
  "Design",
  "Software Development",
  "Data Science",
  "Business Analytics",
];

const Step3 = () => {
  const { formData, setFormData, errors, setErrors } = useFormContext();

  const handleInterestChange = (value: string) => {
    setFormData({ ...formData, primaryInterest: value });
    const error = validateField("primaryInterest", value);
    setErrors({
      ...errors,
      primaryInterest: error || "",
    });
  };

  const handleCheckboxChange = (id: string) => {
    const currentInterests = formData.interests || [];
    const updatedInterests = currentInterests.includes(id)
      ? currentInterests.filter((item: string) => item !== id)
      : [...currentInterests, id];

    setFormData({ ...formData, interests: updatedInterests });
    const error = validateField("interests", updatedInterests) || "";
    setErrors({
      ...errors,
      interests: error,
    });
  };

  const handleSubscriptionChange = (checked: boolean) => {
    setFormData({ ...formData, subscribeToUpdates: checked });
  };

  return (
    <motion.div key="step3" {...pageTransition}>
      <Card className="border-border bg-card">
        <CardContent className="p-6 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Target className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-2xl font-semibold text-foreground">
                Preferences
              </h2>
            </div>
            <div className="space-y-6">
              <div className="grid gap-2">
                <Label className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span>Primary Field of Interest</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Select the field that best matches your career
                            interests
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  {errors.primaryInterest && (
                    <span className="text-red-500 text-sm">
                      {errors.primaryInterest}
                    </span>
                  )}
                </Label>
                <Select
                  onValueChange={handleInterestChange}
                  value={formData.primaryInterest}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your primary field" />
                  </SelectTrigger>
                  <SelectContent>
                    {FIELDS_OF_INTEREST.map((field) => (
                      <SelectItem key={field} value={field}>
                        {field}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4">
                <Label className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span>What are you looking for?</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Select all opportunities you're interested in
                            pursuing
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  {errors.interests && (
                    <span className="text-red-500 text-sm">
                      {errors.interests}
                    </span>
                  )}
                </Label>
                <div className="grid gap-2">
                  {[
                    { id: "networking", label: "Networking Opportunities" },
                    { id: "jobs", label: "Job Openings" },
                    { id: "workshops", label: "Workshops & Certifications" },
                    { id: "projects", label: "Project Collaborations" },
                  ].map(({ id, label }) => (
                    <div key={id} className="flex items-center space-x-2">
                      <Checkbox
                        id={id}
                        checked={(formData.interests || []).includes(id)}
                        onCheckedChange={() => handleCheckboxChange(id)}
                      />
                      <label
                        htmlFor={id}
                        className="text-sm leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="subscribe">
                  Subscribe to updates and newsletters
                </Label>
                <Switch
                  id="subscribe"
                  checked={formData.subscribeToUpdates || false}
                  onCheckedChange={handleSubscriptionChange}
                />
              </div>
            </div>
          </div>
          <StepNavigation />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Step3;
