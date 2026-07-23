import * as React from "react";

import { cn } from "@/lib/utils";

interface HelperTextProps extends React.ComponentProps<"p"> {
  /** Renders in the destructive color and announces as an alert — pair with the paired control's `aria-invalid`. */
  error?: boolean;
}

function HelperText({ className, error = false, ...props }: HelperTextProps) {
  return (
    <p
      data-slot="helper-text"
      role={error ? "alert" : undefined}
      className={cn(
        "text-sm",
        error ? "text-destructive" : "text-text-tertiary",
        className
      )}
      {...props}
    />
  );
}

export { HelperText };
