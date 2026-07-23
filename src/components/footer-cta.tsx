import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FooterCtaProps {
  heading: string;
  ctaLabel: string;
  onCtaClick?: () => void;
  className?: string;
}

/**
 * Full-bleed footer banner prompting a free-tier account to upgrade — see
 * COMPONENTS.md#footercta. Figma: AMFM Portal "Footer CTA" component (node
 * 1909:25789), used at the bottom of the HeartChart Resources page and the
 * HeartChart Dashboard "No data" state. Per its Figma dev annotation, "This
 * component only shows if they have a free account."
 */
export function FooterCta({
  heading,
  ctaLabel,
  onCtaClick,
  className,
}: FooterCtaProps) {
  return (
    <div
      className={cn(
        "bg-primary relative flex w-full items-center justify-center overflow-hidden px-16 py-16",
        className
      )}
    >
      <div className="flex max-w-320 flex-wrap items-center justify-center gap-6">
        <p className="font-display text-display-md text-primary-foreground max-w-3xl font-light">
          {heading}
        </p>
        <Button
          variant="outline"
          onClick={onCtaClick}
          className="border-primary-foreground/30 bg-transparent text-primary-foreground shrink-0 hover:bg-white/10"
        >
          <Sparkles aria-hidden="true" />
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}
