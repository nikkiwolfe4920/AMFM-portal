import * as React from "react";

import { cn } from "@/lib/utils";

interface PointerCalloutProps {
  children: React.ReactNode;
  /** Which edge the speech-bubble pointer/tail is drawn on. */
  pointerPosition?: "top" | "right" | "bottom" | "left";
  className?: string;
}

const POINTER_POSITION_CLASSES: Record<
  NonNullable<PointerCalloutProps["pointerPosition"]>,
  string
> = {
  top: "-top-1.5 left-6 border-r-0 border-b-0",
  right: "top-6 -right-1.5 border-t-0 border-l-0",
  bottom: "-bottom-1.5 left-6 border-t-0 border-l-0",
  left: "top-6 -left-1.5 border-r-0 border-b-0",
};

/**
 * Speech-bubble container with a visible directional pointer — see
 * COMPONENTS.md#pointercallout. Only the static, always-visible variant is
 * implemented; a possible interactive/popover variant ("Why does this
 * matter?", "Understanding your data") is explicitly not built here — see
 * that entry's Implementation rules.
 */
function PointerCallout({
  children,
  pointerPosition = "left",
  className,
}: PointerCalloutProps) {
  return (
    <div
      data-slot="pointer-callout"
      className={cn(
        "relative rounded-lg border bg-background p-4 shadow-sm",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute size-3 rotate-45 border bg-background",
          POINTER_POSITION_CLASSES[pointerPosition]
        )}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

export { PointerCallout };
