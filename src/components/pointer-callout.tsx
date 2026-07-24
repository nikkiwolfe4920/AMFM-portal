import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface PointerCalloutProps {
  children: React.ReactNode;
  /**
   * Which edge the speech-bubble pointer/tail is drawn on. The four cardinal
   * values render a small rotated-square notch cut into that edge.
   * `"bottom-left-diagonal"` instead renders the long diagonal tail asset
   * (`/speechbubblepointer.svg`) hanging off the bottom-left corner — used
   * when the callout needs to point down toward a specific element below
   * and to the left (e.g. `WeDoCard`'s illustration) rather than just
   * marking its nearest edge.
   */
  pointerPosition?: "top" | "right" | "bottom" | "left" | "bottom-left-diagonal";
  className?: string;
}

const POINTER_POSITION_CLASSES: Record<
  Exclude<PointerCalloutProps["pointerPosition"], "bottom-left-diagonal" | undefined>,
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
  const isDiagonal = pointerPosition === "bottom-left-diagonal";

  return (
    <div
      data-slot="pointer-callout"
      className={cn("relative rounded-lg border bg-muted p-4", className)}
    >
      {isDiagonal ? (
        <Image
          src="/speechbubblepointer.svg"
          alt=""
          aria-hidden="true"
          width={18}
          height={20}
          unoptimized
          className="absolute top-full left-8 -translate-y-px"
        />
      ) : (
        <span
          aria-hidden="true"
          className={cn(
            "absolute size-3 rotate-45 border bg-muted",
            POINTER_POSITION_CLASSES[pointerPosition]
          )}
        />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}

export { PointerCallout };
