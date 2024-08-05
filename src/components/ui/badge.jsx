import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        success:
          "border-transparent bg-green-400 text-black shadow hover:bg-green-500",
        warning:
          "border-transparent bg-yellow-400 text-black shadow hover:bg-yellow-500",
        critical:
          "border-transparent bg-[#FF0000] text-black shadow hover:bg-red-500",
        high: "border-transparent bg-orange-400 text-black shadow hover:bg-orange-500",
        medium:
          "border-transparent bg-yellow-400 text-black shadow hover:bg-yellow-500",
        minimal:
          "border-transparent bg-green-400 text-black shadow hover:bg-green-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
