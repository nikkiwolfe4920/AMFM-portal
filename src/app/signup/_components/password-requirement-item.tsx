import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface PasswordRequirementItemProps {
  met: boolean;
  children: React.ReactNode;
}

export function PasswordRequirementItem({ met, children }: PasswordRequirementItemProps) {
  return (
    <div className="flex w-full items-start gap-2">
      <span
        aria-hidden="true"
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
          met ? "bg-status-success" : "bg-border"
        )}
      >
        <Check className="size-3 text-white" />
      </span>
      <p className={cn("flex-1 text-sm", met ? "text-foreground" : "text-text-tertiary")}>
        {children}
      </p>
    </div>
  );
}
