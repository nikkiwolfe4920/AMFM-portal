import { HeartHandshake } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PointerCallout } from "@/components/pointer-callout";
import { cn } from "@/lib/utils";

interface WeDoCardProps {
  coupleCount: number;
  quote: string;
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
  onSeeResults,
  onShareCode,
  className,
}: WeDoCardProps) {
  return (
    <div
      className={cn(
        "w-full max-w-[564px] rounded-2xl bg-background p-2 shadow-card",
        className
      )}
    >
      <div className="flex h-full flex-col gap-6 rounded-md border bg-background px-4 py-5">
        <WeDoLogo />

        <div className="flex flex-col gap-2">
          <div className="flex items-end gap-2">
            <span className="text-5xl leading-10 font-semibold tracking-[-0.96px] text-foreground">
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
          <p className="text-sm text-text-tertiary">
            <span className="font-semibold text-foreground">
              Most of your couples say...
            </span>{" "}
            &ldquo;{quote}&rdquo;
          </p>
        </PointerCallout>

        <div className="mt-auto flex flex-wrap items-center gap-3">
          <Button variant="outline" size="compact" onClick={onSeeResults}>
            See Results
          </Button>
          <Button variant="outline" size="compact" onClick={onShareCode}>
            Share Your Code
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Hand-authored wordmark approximation — the real WeDo brand mark/couple
 * illustration is unavailable in this environment (same class of gap as
 * AmfmLogo/GoogleIcon; see COMPONENTS.md#wedocard Implementation rules).
 */
function WeDoLogo() {
  return (
    <div className="inline-flex items-center gap-1.5" role="img" aria-label="WeDo">
      <HeartHandshake aria-hidden="true" className="size-6 text-primary" />
      <span className="text-lg font-semibold text-foreground">WeDo</span>
    </div>
  );
}

export { WeDoCard };
