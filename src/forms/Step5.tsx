import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { pageTransition } from "@/utils/animations";

const Step5 = () => {
  return (
    <motion.div key="step5" {...pageTransition}>
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-col items-center gap-4">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
          <h2 className="text-3xl font-bold text-center text-foreground">
            Thank You!
          </h2>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-lg text-muted-foreground">
            Your registration has been successfully submitted.
          </p>
          <p className="text-muted-foreground">
            We'll be in touch with you shortly via email with further details.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Step5;
