import * as React from "react";

import { cn } from "@/lib/utils";

interface ModalTextSectionProps extends Omit<React.ComponentProps<"section">, "title"> {
  title: React.ReactNode;
  children: React.ReactNode;
  divided?: boolean;
}

function ModalTextSection({
  title,
  children,
  divided = true,
  className,
  ...props
}: ModalTextSectionProps) {
  const headingId = React.useId();

  return (
    <section
      data-slot="modal-text-section"
      aria-labelledby={headingId}
      className={cn(
        "flex flex-col gap-4",
        divided && "border-border-secondary border-t pt-6",
        className
      )}
      {...props}
    >
      <h3 id={headingId} className="text-xl font-semibold text-foreground">
        {title}
      </h3>
      <div
        data-slot="modal-text-section-content"
        className="flex flex-col gap-4 text-sm text-text-secondary"
      >
        {children}
      </div>
    </section>
  );
}

export { ModalTextSection };
export type { ModalTextSectionProps };
