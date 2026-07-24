import type { ReactNode } from "react";
import { PlayCircle } from "lucide-react";

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
 * Training" component (node 2318:26997), used on the HeartChart Resources
 * page as the "Let's prepare for your HeartChart Weekend" banner.
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
      className={className}
      innerClassName="relative flex overflow-hidden border-white/30"
    >
      <div
        aria-hidden="true"
        className="from-nav-surface-from to-nav-surface-to absolute inset-0 bg-gradient-to-br"
      />
      <div className="relative flex w-full flex-col justify-center gap-10 px-16 py-10">
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
