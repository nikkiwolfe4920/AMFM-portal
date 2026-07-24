import type { ReactNode } from "react";
import { PlayCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { ElevatedCard } from "@/components/elevated-card";
import { Button } from "@/components/ui/button";

interface TopHeroProps {
  /** First heading line, e.g. "Let's prepare for your" — rendered in nav-foreground white. */
  eyebrowHeading: ReactNode;
  /** Second, emphasized heading line, e.g. "HeartChart Weekend" — rendered in highlight-gold. */
  highlightHeading: ReactNode;
  description: ReactNode;
  ctaLabel: string;
  onCtaClick?: () => void;
  className?: string;
}

/**
 * Full-bleed photo hero for a dashboard page's featured training/promo
 * banner — see COMPONENTS.md#tophero. Figma: AMFM Portal, "Featured
 * Training" component (node 4194:25820, superseding node 2318:26997), used
 * on the HeartChart Resources page as the "Let's prepare for your
 * HeartChart Weekend" banner.
 */
export function TopHero({
  eyebrowHeading,
  highlightHeading,
  description,
  ctaLabel,
  onCtaClick,
  className,
}: TopHeroProps) {
  return (
    <ElevatedCard
      className={cn("h-128", className)}
      innerClassName="flex overflow-hidden border-white/30"
      background={
        <>
          {/*
            Placeholder for the real congregation-stage photo (Figma node
            4194:25820) — the Figma asset host is blocked by this
            environment's egress policy (see DESIGN.md Known gaps, same
            class of gap as CourseCard/FooterCta). Replace this div with a
            `next/image` painted at the exact same layer the moment the
            photo is supplied and committed to `public/`.
          */}
          <div
            aria-hidden="true"
            className="from-nav-surface-from to-nav-surface-to absolute inset-0 bg-gradient-to-br"
          />
          {/* Figma's own legibility scrim: dark over the text column, clear over the right two-thirds. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-l from-black/0 from-20% to-black/70 to-70%"
          />
        </>
      }
    >
      <div className="flex w-full flex-col justify-center gap-10 px-16 py-10">
        <div className="flex max-w-[544px] flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="font-display flex flex-col font-light">
              <p className="text-nav-foreground text-display-lg">
                {eyebrowHeading}
              </p>
              <p className="text-display-2xl text-highlight-gold tracking-[-1.44px]">
                {highlightHeading}
              </p>
            </div>
            <p className="text-nav-foreground-muted max-w-md text-base">
              {description}
            </p>
          </div>
          <Button
            variant="outline"
            size="default"
            onClick={onCtaClick}
            className="w-fit"
          >
            <PlayCircle aria-hidden="true" />
            {ctaLabel}
          </Button>
        </div>
      </div>
    </ElevatedCard>
  );
}
