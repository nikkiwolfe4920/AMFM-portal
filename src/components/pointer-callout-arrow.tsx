import Image from "next/image";

import { cn } from "@/lib/utils";

interface PointerCalloutArrowProps {
  /** Leading emphasized word/phrase, rendered in the foreground color at regular weight (e.g. "HeartChart"). */
  emphasis: string;
  /** Rest of the sentence, rendered at light weight in the muted tertiary color. */
  text: string;
  /**
   * Which side the curved arrow renders on. `"left"` points up-left and
   * leads the text; `"right"` points up-right and trails it.
   */
  side: "left" | "right";
  className?: string;
}

/**
 * Small curved-arrow + serif caption pairing HeartChartSummary with WeDoCard
 * on the dashboard — see COMPONENTS.md#pointercalloutarrow. Distinct from
 * `PointerCallout` (the bordered speech-bubble primitive) despite the
 * similar name: this is a plain arrow-and-text caption, not a bubble.
 */
function PointerCalloutArrow({
  emphasis,
  text,
  side,
  className,
}: PointerCalloutArrowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3",
        side === "right" && "flex-row-reverse text-right",
        className
      )}
    >
      <Image
        src={side === "left" ? "/Arrowup-left.svg" : "/Arrowup-right.svg"}
        alt=""
        aria-hidden="true"
        width={59}
        height={58}
        unoptimized
        className="h-11 w-auto shrink-0"
      />
      <p className="font-display text-xl leading-display-sm text-text-tertiary">
        <span className="font-normal text-foreground">{emphasis}</span>{" "}
        <span className="font-light">{text}</span>
      </p>
    </div>
  );
}

export { PointerCalloutArrow };
