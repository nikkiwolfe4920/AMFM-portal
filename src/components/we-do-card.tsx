import Image from "next/image";
import { Eye, QrCode } from "lucide-react";

import { ElevatedCard } from "@/components/elevated-card";
import { Button } from "@/components/ui/button";
import { PointerCallout } from "@/components/pointer-callout";
import { cn } from "@/lib/utils";

interface WeDoCardProps {
  coupleCount: number;
  quote: string;
  /**
   * Substring of `quote` to render in the WeDo brand red, matching Figma's
   * emphasis inside the pull-quote (e.g. "being a listener"). Rendered plain
   * if omitted or not found in `quote`.
   */
  highlightedPhrase?: string;
  /** Attribution line under the quote, e.g. "Your Current WeDo Pulse". */
  quoteSource?: string;
  /** Countdown copy rendered as "Next Pulse in {nextPulseLabel}", e.g. "2d 10h". Omitted entirely if not provided. */
  nextPulseLabel?: string;
  onSeeResults?: () => void;
  onShareCode?: () => void;
  className?: string;
}

/**
 * Church-wide WeDo engagement snapshot — the counterpart card to
 * HeartChartSummary. See COMPONENTS.md#wedocard.
 */
function WeDoCard({
  coupleCount,
  quote,
  highlightedPhrase,
  quoteSource = "Your Current WeDo Pulse",
  nextPulseLabel,
  onSeeResults,
  onShareCode,
  className,
}: WeDoCardProps) {
  return (
    <ElevatedCard
      className={cn("w-full max-w-[564px]", className)}
      innerClassName="flex h-full flex-col gap-6 px-4 py-5"
    >
      <div className="flex w-full items-start justify-between gap-4">
        <Image
          src="/We-do-logo.svg"
          alt="WeDo"
          width={82}
          height={32}
          className="h-8 w-auto"
          unoptimized
        />
        {nextPulseLabel && (
          <span className="shrink-0 text-xs font-medium text-muted-foreground">
            Next Pulse in {nextPulseLabel}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-end gap-2">
          <span className="text-5xl leading-10 font-semibold tracking-[-0.96px] text-wedo-brand">
            {coupleCount.toLocaleString()}
          </span>
          <span className="pb-0.5 text-base text-muted-foreground">
            {coupleCount === 1 ? "Couple" : "Couples"}
          </span>
        </div>
        <p className="text-base font-semibold text-muted-foreground">
          Active in the app today
        </p>
      </div>

      <PointerCallout pointerPosition="left">
        <div className="flex items-start gap-3">
          <Image
            src="/We-do.png"
            alt=""
            aria-hidden="true"
            width={1196}
            height={1230}
            unoptimized
            className="size-16 shrink-0 object-contain"
          />
          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-semibold tracking-[0.24px] text-text-tertiary uppercase">
              Most of your couples say...
            </p>
            <p className="text-sm text-foreground">
              &ldquo;{renderQuote(quote, highlightedPhrase)}&rdquo;
            </p>
            <p className="text-xs text-muted-foreground">Source: {quoteSource}</p>
          </div>
        </div>
      </PointerCallout>

      <div className="mt-auto flex flex-wrap items-center gap-3">
        <Button variant="outline" size="compact" onClick={onSeeResults}>
          <Eye />
          See Results
        </Button>
        <Button variant="outline" size="compact" onClick={onShareCode}>
          <QrCode />
          Share Your Code
        </Button>
      </div>
    </ElevatedCard>
  );
}

/** Wraps the first occurrence of `highlight` in `quote` in the WeDo brand red, matching Figma's pull-quote emphasis. Falls back to plain text if `highlight` is omitted or not found. */
function renderQuote(quote: string, highlight?: string) {
  if (!highlight) return quote;
  const index = quote.indexOf(highlight);
  if (index === -1) return quote;

  return (
    <>
      {quote.slice(0, index)}
      <span className="font-medium text-wedo-brand">{highlight}</span>
      {quote.slice(index + highlight.length)}
    </>
  );
}

export { WeDoCard };
