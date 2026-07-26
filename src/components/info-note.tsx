import * as React from "react";
import { Info, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface InfoNoteProps extends React.ComponentProps<"div"> {
  icon?: LucideIcon;
  iconClassName?: string;
}

function InfoNote({
  children,
  className,
  icon: Icon = Info,
  iconClassName,
  role = "note",
  ...props
}: InfoNoteProps) {
  return (
    <div
      role={role}
      data-slot="info-note"
      className={cn(
        "border-border-secondary flex items-start gap-3 rounded-md border bg-secondary p-5 text-sm text-text-secondary",
        className
      )}
      {...props}
    >
      <Icon
        data-slot="info-note-icon"
        className={cn("text-text-secondary mt-0.5 size-5 shrink-0", iconClassName)}
        aria-hidden="true"
      />
      <div data-slot="info-note-content">{children}</div>
    </div>
  );
}

export { InfoNote };
export type { InfoNoteProps };
