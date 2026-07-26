import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface InputActionGroupProps
  extends Omit<React.ComponentProps<"input">, "children"> {
  actionLabel: string;
  actionAriaLabel?: string;
  actionIcon?: React.ReactNode;
  actionDisabled?: boolean;
  actionType?: "button" | "submit";
  onAction?: () => void;
}

function InputActionGroup({
  className,
  actionLabel,
  actionAriaLabel,
  actionIcon,
  actionDisabled,
  actionType = "button",
  onAction,
  disabled,
  ...props
}: InputActionGroupProps) {
  return (
    <div
      data-slot="input-action-group"
      className={cn(
        "border-input flex w-full min-w-0 items-stretch rounded-md border bg-background shadow-xs transition-control",
        "has-[:focus-visible]:border-2 has-[:focus-visible]:border-border-brand",
        "has-[[aria-invalid=true]]:border-border-destructive-subtle",
        "has-[:disabled]:bg-muted/50",
        className
      )}
    >
      <input
        data-slot="input-action-group-control"
        disabled={disabled}
        className="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground min-w-0 flex-1 rounded-l-md bg-transparent px-3.5 py-2.5 text-base text-foreground outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-muted-foreground disabled:opacity-100"
        {...props}
      />
      <Button
        type={actionType}
        variant="default"
        size="controlSegment"
        disabled={disabled || actionDisabled}
        onClick={onAction}
        aria-label={actionAriaLabel}
      >
        {actionIcon}
        {actionLabel}
      </Button>
    </div>
  );
}

export { InputActionGroup };
export type { InputActionGroupProps };
