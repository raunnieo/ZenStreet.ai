"use client";

import { useFormContext } from "../context/FormContext";
import { validateForm } from "../utils/validation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ClipboardCheck,
  User,
  Target,
  AlertCircle,
  MapPin,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { pageTransition } from "@/utils/animations";

const Step4 = () => {
  const { formData, errors, setErrors, setStep } = useFormContext();
  const { toast } = useToast();

  const handleSubmit = () => {
    // Only validate required fields that should have been filled in previous steps
    const requiredFields = {
      fullName: "Full Name is required",
      email: "Email is required",
      phone: "Phone number is required",
      streetAddress: "Street address is required",
      city: "City is required",
      state: "State is required",
      zipCode: "ZIP code is required",
      // Remove role and organization validation if they're not required
      // role: "Role is required",
      // organization: "Organization is required",
      primaryInterest: "Primary interest is required",
    };

    const newErrors: { [key: string]: string } = {};

    Object.entries(requiredFields).forEach(([field, message]) => {
      if (!formData[field]) {
        newErrors[field] = message;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please check your information and try again.",
      });
      return;
    }

    // If validation passes, proceed with submission
    setErrors({});
    console.log("Form submitted:", formData);
    toast({
      title: "Success!",
      description: "Your registration has been submitted successfully.",
    });
    setStep(5);
  };

  return (
    <motion.div key="step4" {...pageTransition}>
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-2xl font-semibold text-foreground">
            Review and Finalize
          </h2>
        </CardHeader>
        <CardContent className="space-y-8">
          {Object.keys(errors).length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please fix the following errors before submitting:
                <ul className="list-disc pl-4 mt-2">
                  {Object.values(errors).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            {/* Personal Details */}
            <Card className="border shadow-sm">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-lg font-semibold text-foreground">
                      Personal Details
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-foreground flex justify-between">
                      <span className="font-medium">Full Name:</span>
                      <span className="text-muted-foreground">
                        {formData.fullName}
                      </span>
                    </p>
                    <p className="text-foreground flex justify-between">
                      <span className="font-medium">Email:</span>
                      <span className="text-muted-foreground">
                        {formData.email}
                      </span>
                    </p>
                    <p className="text-foreground flex justify-between">
                      <span className="font-medium">Phone:</span>
                      <span className="text-muted-foreground">
                        {formData.phone}
                      </span>
                    </p>
                    {formData.linkedin && (
                      <p className="text-foreground flex justify-between">
                        <span className="font-medium">LinkedIn:</span>
                        <span className="text-muted-foreground">
                          {formData.linkedin}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address Details */}
            <Card className="border shadow-sm">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-lg font-semibold text-foreground">
                      Address Details
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-foreground flex justify-between">
                      <span className="font-medium">Street Address:</span>
                      <span className="text-muted-foreground">
                        {formData.streetAddress}
                      </span>
                    </p>
                    <p className="text-foreground flex justify-between">
                      <span className="font-medium">City:</span>
                      <span className="text-muted-foreground">
                        {formData.city}
                      </span>
                    </p>
                    <p className="text-foreground flex justify-between">
                      <span className="font-medium">State:</span>
                      <span className="text-muted-foreground">
                        {formData.state}
                      </span>
                    </p>
                    <p className="text-foreground flex justify-between">
                      <span className="font-medium">ZIP Code:</span>
                      <span className="text-muted-foreground">
                        {formData.zipCode}
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Areas of Interest */}
            <Card className="border shadow-sm">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-lg font-semibold text-foreground">
                      Areas of Interest
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-foreground flex justify-between">
                      <span className="font-medium">Primary Interest:</span>
                      <span className="text-muted-foreground">
                        {formData.primaryInterest}
                      </span>
                    </p>
                    <p className="text-foreground flex justify-between">
                      <span className="font-medium">Looking for:</span>
                      <span className="text-muted-foreground">
                        {(formData.interests || []).join(", ")}
                      </span>
                    </p>
                    <p className="text-foreground flex justify-between">
                      <span className="font-medium">Newsletter:</span>
                      <span className="text-muted-foreground">
                        {formData.subscribeToUpdates ? "Yes" : "No"}
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <p className="text-sm text-muted-foreground">
            Please review your information carefully before submitting. Once
            submitted, you'll receive a confirmation email.
          </p>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button onClick={() => setStep(3)}>Back to Edit</Button>
          <Button onClick={handleSubmit} className="flex-1">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default Step4;
