"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TipCarouselItem {
  title: string;
  description: React.ReactNode;
}

interface TipCarouselProps extends React.ComponentProps<"div"> {
  items: TipCarouselItem[];
  ariaLabel: string;
  visibleItemCount?: 1 | 2;
  previousLabel?: string;
  nextLabel?: string;
}

function TipCarousel({
  items,
  ariaLabel,
  visibleItemCount = 2,
  previousLabel = "Previous tip",
  nextLabel = "Next tip",
  className,
  ...props
}: TipCarouselProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const visibleItems = getVisibleTipCarouselItems(items, activeIndex, visibleItemCount);
  const canPage = items.length > 1;

  function showPreviousTip() {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? items.length - 1 : currentIndex - 1
    );
  }

  function showNextTip() {
    setActiveIndex((currentIndex) => (currentIndex + 1) % items.length);
  }

  return (
    <div data-slot="tip-carousel" className={cn("relative", className)} {...props}>
      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        aria-live="polite"
        aria-label={ariaLabel}
      >
        {visibleItems.map((item, index) => (
          <article
            key={`${item.title}-${index}`}
            data-slot="tip-carousel-card"
            className={cn(
              "border-border-secondary flex min-h-36 flex-col gap-3 rounded-md border bg-background p-5",
              index > 0 && "hidden sm:flex"
            )}
          >
            <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
            <div className="text-sm text-text-secondary">{item.description}</div>
          </article>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2" aria-hidden="true">
        {items.map((item, index) => (
          <span
            key={`${item.title}-${index}`}
            data-slot="tip-carousel-dot"
            className={cn(
              "size-2 rounded-full",
              index === activeIndex ? "bg-primary" : "bg-muted"
            )}
          />
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label={previousLabel}
        disabled={!canPage}
        onClick={showPreviousTip}
        className="absolute top-1/2 -left-4 -translate-y-1/2 rounded-full bg-background"
      >
        <ArrowLeft aria-hidden />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label={nextLabel}
        disabled={!canPage}
        onClick={showNextTip}
        className="absolute top-1/2 -right-4 -translate-y-1/2 rounded-full bg-background"
      >
        <ArrowRight aria-hidden />
      </Button>
    </div>
  );
}

function getVisibleTipCarouselItems(
  items: TipCarouselItem[],
  activeIndex: number,
  visibleItemCount: 1 | 2
) {
  const safeVisibleItemCount = Math.min(visibleItemCount, items.length);

  return Array.from({ length: safeVisibleItemCount }, (_, offset) => {
    const itemIndex = (activeIndex + offset) % items.length;
    return items[itemIndex];
  });
}

export { TipCarousel };
export type { TipCarouselItem, TipCarouselProps };
