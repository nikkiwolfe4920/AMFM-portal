import Image from "next/image";

import { cn } from "@/lib/utils";

interface PointerCalloutArrowProps {
  /** Leading emphasized word/phrase, rendered bold (e.g. "HeartChart"). */
  emphasis: string;
  /** Rest of the sentence, rendered at regular weight. */
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
        width={44}
        height={44}
        unoptimized
        className="shrink-0"
      />
      <p className="font-display text-lg text-foreground">
        <span className="font-bold">{emphasis}</span> {text}
      </p>
    </div>
  );
}

export { PointerCalloutArrow };
