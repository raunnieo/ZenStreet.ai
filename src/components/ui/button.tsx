"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16678c] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#16678c] text-white hover:bg-[#135270] shadow-sm",
        outline:
          "border-2 border-[#16678c] text-[#16678c] hover:bg-[#16678c]/10",
        secondary: "bg-[#e8f0fe] text-[#16678c] hover:bg-[#d1e3fd]",
        ghost: "text-[#16678c] hover:bg-[#16678c]/10",
        link: "text-[#16678c] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const MotionButton = motion.button;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : MotionButton;
    const motionProps: HTMLMotionProps<"button"> = {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    };

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...motionProps}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
