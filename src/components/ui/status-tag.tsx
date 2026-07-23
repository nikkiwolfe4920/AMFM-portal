import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const statusTagVariants = cva(
  "inline-flex w-fit items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        success: "bg-badge-success-bg border-badge-success-border text-badge-success-text",
        error: "bg-badge-error-bg border-badge-error-border text-badge-error-text",
        warning: "bg-badge-warning-bg border-badge-warning-border text-badge-warning-text",
      },
    },
    defaultVariants: {
      variant: "success",
    },
  }
);

interface StatusTagProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof statusTagVariants> {}

function StatusTag({ className, variant, ...props }: StatusTagProps) {
  return (
    <span
      data-slot="status-tag"
      className={cn(statusTagVariants({ variant, className }))}
      {...props}
    />
  );
}

export { StatusTag, statusTagVariants };
