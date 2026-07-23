import * as React from "react";

import { cn } from "@/lib/utils";

interface InputGroupProps extends React.ComponentProps<"input"> {
  /** Fixed, non-editable leading add-on (e.g. a URL scheme prefix like "http://"). */
  addon: React.ReactNode;
}

function InputGroup({ className, addon, ...props }: InputGroupProps) {
  return (
    <div
      data-slot="input-group"
      className={cn(
        "border-input flex w-full items-stretch rounded-md border bg-background shadow-xs transition-[color,box-shadow]",
        "has-[:focus-visible]:border-2 has-[:focus-visible]:border-border-brand",
        "has-[[aria-invalid=true]]:border-border-destructive-subtle",
        "has-[:disabled]:bg-muted/50",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="text-text-tertiary flex items-center rounded-l-md py-2.5 pr-3 pl-3.5 text-base"
      >
        {addon}
      </span>
      <input
        data-slot="input-group-control"
        className="border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex w-full min-w-0 rounded-r-md border-l bg-transparent px-3.5 py-2.5 text-base text-foreground outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-muted-foreground disabled:opacity-100"
        {...props}
      />
    </div>
  );
}

export { InputGroup };
