"use client";

import * as React from "react";
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface StorySlide {
  id: string;
  eyebrow: string;
  title: string;
  content: React.ReactNode;
}

const PHILOSOPHY_LAYERS = [
  "User Research",
  "Product Strategy",
  "Requirements",
  "Design System",
  "Engineering Standards",
  "AI-Assisted Development",
  "Testing & Deployment",
  "Continuous Improvement",
];

const OPERATING_SYSTEM_LAYERS = [
  {
    layer: "Research Layer",
    purpose: "Understands users and validates decisions",
  },
  {
    layer: "Product Layer",
    purpose: "Defines strategy, goals, and requirements",
  },
  {
    layer: "Design Layer",
    purpose: "Creates consistent experiences and interfaces",
  },
  { layer: "Engineering Layer", purpose: "Defines how software is built" },
  {
    layer: "AI Layer",
    purpose: "Accelerates execution within established standards",
  },
  { layer: "Quality Layer", purpose: "Ensures reliability and production readiness" },
];

function SlideHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-xs font-semibold tracking-wide text-text-brand uppercase">
        {eyebrow}
      </p>
      <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h3>
    </div>
  );
}

function ValueList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border-secondary bg-secondary/60 p-4">
      <p className="text-sm font-semibold text-foreground">Value:</p>
      <ul className="flex flex-col gap-1.5">
        {items.map((item) => (
          <li key={item} className="text-sm text-text-tertiary">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

const SLIDES: StorySlide[] = [
  {
    id: "intro",
    eyebrow: "DPOsystem",
    title: "Design → Product → Operations System",
    content: (
      <>
        <p>
          DPOsystem is a product development operating system that connects
          product strategy, UX design, engineering standards, and
          AI-assisted development into one unified framework for building
          scalable digital products.
        </p>
        <p>
          It creates a repeatable approach for moving from research and ideas
          → strategy → design → development → production while maintaining
          quality, consistency, and long-term maintainability.
        </p>
      </>
    ),
  },
  {
    id: "what-is",
    eyebrow: "What is DPOsystem?",
    title: "A shared operating model for fragmented teams",
    content: (
      <>
        <p>
          Modern product development is often fragmented. A typical product
          lifecycle involves different teams, tools, and decisions:
        </p>
        <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {[
            "Product teams define requirements",
            "Researchers gather insights",
            "Designers create experiences",
            "Engineers interpret designs",
            "Developers make technical decisions",
            "AI tools generate solutions without full product context",
          ].map((item) => (
            <li key={item} className="text-sm text-text-tertiary">
              {item}
            </li>
          ))}
        </ul>
        <p>This creates predictable challenges:</p>
        <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {[
            "inconsistent user experiences",
            "disconnected product decisions",
            "duplicated work",
            "unclear requirements",
            "technical debt",
            "slower development cycles",
            "difficulty maintaining quality as products grow",
          ].map((item) => (
            <li key={item} className="text-sm text-text-tertiary">
              {item}
            </li>
          ))}
        </ul>
        <p>
          DPOsystem creates a shared operating model where product, design,
          engineering, and AI development work together from a unified
          foundation.
        </p>
      </>
    ),
  },
  {
    id: "philosophy",
    eyebrow: "The DPOsystem Philosophy",
    title: "A connected system, not a collection of tasks",
    content: (
      <>
        <p>
          DPOsystem treats digital product creation as a connected system
          rather than a collection of individual tasks. Every decision
          builds upon the previous layer:
        </p>
        <ol className="flex flex-col items-stretch gap-1">
          {PHILOSOPHY_LAYERS.map((layer, index) => (
            <li key={layer} className="flex flex-col items-center gap-1">
              <span className="w-full rounded-md border border-border-secondary bg-secondary/60 px-4 py-2 text-center text-sm font-medium text-foreground">
                {layer}
              </span>
              {index < PHILOSOPHY_LAYERS.length - 1 && (
                <ArrowDown
                  aria-hidden
                  className="size-4 shrink-0 text-muted-foreground"
                />
              )}
            </li>
          ))}
        </ol>
        <p>
          The result is a more predictable, scalable, and disciplined way to
          build software.
        </p>
      </>
    ),
  },
  {
    id: "pillar-product",
    eyebrow: "The Four Pillars of DPOsystem · 1 of 4",
    title: "Product Intelligence",
    content: (
      <>
        <p className="font-medium text-foreground">
          Defining what should be built and why
        </p>
        <p>
          DPOsystem establishes product clarity before development begins.
          It creates alignment around:
        </p>
        <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {[
            "User needs",
            "Customer insights",
            "Business objectives",
            "Product vision",
            "Feature requirements",
            "Success criteria",
            "Measurable outcomes",
          ].map((item) => (
            <li key={item} className="text-sm text-text-tertiary">
              {item}
            </li>
          ))}
        </ul>
        <p>
          Instead of building based on assumptions, teams build from
          documented evidence and intentional product decisions.
        </p>
        <ValueList
          items={[
            "Reduces wasted development effort",
            "Improves product-market alignment",
            "Creates stronger prioritization",
            "Connects business goals to user outcomes",
            "Provides clarity across teams",
          ]}
        />
      </>
    ),
  },
  {
    id: "pillar-design",
    eyebrow: "The Four Pillars of DPOsystem · 2 of 4",
    title: "Design System Governance",
    content: (
      <>
        <p className="font-medium text-foreground">
          Creating a consistent product experience
        </p>
        <p>
          DPOsystem transforms a design system from a collection of UI
          assets into a strategic product foundation. It defines:
        </p>
        <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {[
            "Design principles",
            "Visual language",
            "Design tokens",
            "Component standards",
            "Interaction patterns",
            "Accessibility requirements",
            "Responsive behavior",
            "Implementation guidelines",
          ].map((item) => (
            <li key={item} className="text-sm text-text-tertiary">
              {item}
            </li>
          ))}
        </ul>
        <p>
          Every design decision follows an established system rather than
          individual interpretation.
        </p>
        <ValueList
          items={[
            "Creates consistent user experiences",
            "Reduces design fragmentation",
            "Accelerates design decisions",
            "Improves collaboration between designers and engineers",
            "Allows products to scale without losing quality",
          ]}
        />
      </>
    ),
  },
  {
    id: "pillar-engineering",
    eyebrow: "The Four Pillars of DPOsystem · 3 of 4",
    title: "Engineering Excellence",
    content: (
      <>
        <p className="font-medium text-foreground">
          Building software designed for the future
        </p>
        <p>
          DPOsystem introduces engineering standards that ensure software is
          built for production environments, not just initial release. It
          establishes expectations around:
        </p>
        <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {[
            "Scalable architecture",
            "Reusable components",
            "Clean code practices",
            "Type safety",
            "Accessibility",
            "Security",
            "Testing",
            "Performance",
            "Deployment readiness",
          ].map((item) => (
            <li key={item} className="text-sm text-text-tertiary">
              {item}
            </li>
          ))}
        </ul>
        <p>
          The goal is not simply to make software work. The goal is to
          create software that can evolve, scale, and be maintained by
          future teams.
        </p>
        <ValueList
          items={[
            "Higher-quality software",
            "Reduced technical debt",
            "More predictable development",
            "Easier future enhancements",
            "Lower maintenance costs",
          ]}
        />
      </>
    ),
  },
  {
    id: "pillar-ai",
    eyebrow: "The Four Pillars of DPOsystem · 4 of 4",
    title: "AI Development Intelligence",
    content: (
      <>
        <p className="font-medium text-foreground">
          Transforming AI from a code generator into a product engineering
          partner
        </p>
        <p>Traditional AI development focuses on output:</p>
        <p className="border-l-2 border-border-secondary pl-3 italic text-foreground">
          {`"Build this feature."`}
        </p>
        <p>DPOsystem changes the approach:</p>
        <p className="border-l-2 border-text-brand pl-3 italic text-foreground">
          {`"Understand the product system, follow the standards, and build within the established framework."`}
        </p>
        <p>AI operates with awareness of:</p>
        <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {[
            "Product strategy",
            "Design standards",
            "Engineering architecture",
            "Existing patterns",
            "Quality expectations",
          ].map((item) => (
            <li key={item} className="text-sm text-text-tertiary">
              {item}
            </li>
          ))}
        </ul>
        <p>
          AI becomes an accelerated member of the product development
          process rather than an isolated generation tool.
        </p>
        <ValueList
          items={[
            "Faster development cycles",
            "More consistent implementation",
            "Less rework",
            "Better quality output",
            "Stronger human-AI collaboration",
          ]}
        />
      </>
    ),
  },
  {
    id: "why-matters",
    eyebrow: "Why DPOsystem Matters",
    title: "As products grow, complexity grows",
    content: (
      <>
        <p>Without a system:</p>
        <ul className="flex flex-col gap-1.5">
          {[
            "More features create inconsistency",
            "More developers create architectural variation",
            "More designers create fragmented experiences",
            "More tools create disconnected workflows",
          ].map((item) => (
            <li key={item} className="text-sm text-text-tertiary">
              {item}
            </li>
          ))}
        </ul>
        <p>
          DPOsystem creates a governance layer that keeps the entire product
          ecosystem aligned. It allows teams to move faster because they
          spend less time reinventing decisions.
        </p>
      </>
    ),
  },
  {
    id: "operating-system",
    eyebrow: "DPOsystem as a Product Operating System",
    title: "The layers that build and maintain successful software",
    content: (
      <>
        <p>
          DPOsystem functions like an operating system for building digital
          products. It manages the different layers required to create and
          maintain successful software.
        </p>
        <div className="overflow-hidden rounded-lg border border-border-secondary">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">
              DPOsystem layers and their purpose
            </caption>
            <thead>
              <tr className="bg-secondary/60">
                <th scope="col" className="px-4 py-2 font-semibold text-foreground">
                  Layer
                </th>
                <th scope="col" className="px-4 py-2 font-semibold text-foreground">
                  Purpose
                </th>
              </tr>
            </thead>
            <tbody>
              {OPERATING_SYSTEM_LAYERS.map((row) => (
                <tr key={row.layer} className="border-t border-border-secondary">
                  <td className="px-4 py-2 font-medium text-foreground">
                    {row.layer}
                  </td>
                  <td className="px-4 py-2 text-text-tertiary">
                    {row.purpose}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: "business-value",
    eyebrow: "The Business Value of DPOsystem",
    title: "Built for startups, agencies, and enterprise teams",
    content: (
      <>
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-foreground">For Startups</p>
          <p>
            DPOsystem provides the structure of a mature product
            organization without requiring a large team. It enables:
          </p>
          <ul className="flex flex-col gap-1.5">
            {[
              "Faster product development",
              "Better decision-making",
              "Stronger product foundations",
              "Reduced technical debt",
              "More scalable growth",
            ].map((item) => (
              <li key={item} className="text-sm text-text-tertiary">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2 border-t border-border-secondary pt-4">
          <p className="font-semibold text-foreground">
            For Product Agencies and Consultancies
          </p>
          <p>
            DPOsystem creates a repeatable delivery methodology. Instead of
            delivering isolated projects, teams deliver through a proven
            product operating model. Benefits:
          </p>
          <ul className="flex flex-col gap-1.5">
            {[
              "Consistent quality across engagements",
              "Faster project execution",
              "Repeatable processes",
              "Higher-value client outcomes",
              "Stronger differentiation",
            ].map((item) => (
              <li key={item} className="text-sm text-text-tertiary">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2 border-t border-border-secondary pt-4">
          <p className="font-semibold text-foreground">For Enterprise Teams</p>
          <p>DPOsystem creates alignment across:</p>
          <ul className="flex flex-col gap-1.5">
            {["Product", "Design", "Engineering", "Leadership"].map((item) => (
              <li key={item} className="text-sm text-text-tertiary">
                {item}
              </li>
            ))}
          </ul>
          <p>
            It reduces organizational friction by establishing shared
            standards and decision-making frameworks.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "differentiator",
    eyebrow: "The Differentiator",
    title: "Better software, faster",
    content: (
      <>
        <p>Most AI development approaches optimize for:</p>
        <p className="text-lg font-semibold text-foreground">Speed.</p>
        <p>DPOsystem optimizes for:</p>
        <p className="text-lg font-semibold text-text-brand">
          Speed + Quality + Consistency + Scalability
        </p>
        <p>
          The goal is not simply to build software faster. The goal is to
          build better software faster.
        </p>
      </>
    ),
  },
];

export function DposystemStory() {
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const activeIndexRef = React.useRef(0);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const scrollToIndex = React.useCallback((index: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const clamped = Math.max(0, Math.min(index, SLIDES.length - 1));
    activeIndexRef.current = clamped;
    setActiveIndex(clamped);
    const slide = scroller.children[clamped] as HTMLElement | undefined;
    slide?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  }, []);

  const handleScroll = React.useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const index = Math.round(scroller.scrollLeft / scroller.clientWidth);
    const clamped = Math.max(0, Math.min(index, SLIDES.length - 1));
    activeIndexRef.current = clamped;
    setActiveIndex(clamped);
  }, []);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollToIndex(activeIndexRef.current + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollToIndex(activeIndexRef.current - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        scrollToIndex(0);
      } else if (event.key === "End") {
        event.preventDefault();
        scrollToIndex(SLIDES.length - 1);
      }
    },
    [scrollToIndex]
  );

  const isFirst = activeIndex === 0;
  const isLast = activeIndex === SLIDES.length - 1;

  return (
    <div className="flex min-w-0 flex-col gap-4 pt-2">
      <div
        className="relative min-w-0"
        role="region"
        aria-roledescription="carousel"
        aria-label="DPOsystem overview"
      >
        <div
          data-slot="dposystem-story-track"
          ref={scrollerRef}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          className="flex h-[min(70vh,560px)] snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] outline-none motion-reduce:scroll-auto focus-visible:ring-ring/50 focus-visible:ring-[3px] [&::-webkit-scrollbar]:hidden"
        >
          {SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${SLIDES.length}: ${slide.title}`}
              className="flex h-full w-full min-w-0 shrink-0 snap-start flex-col gap-4 overflow-y-auto px-6 py-8 sm:px-12 sm:py-10"
            >
              <SlideHeading eyebrow={slide.eyebrow} title={slide.title} />
              <div className="flex flex-col gap-3 text-sm leading-relaxed text-text-tertiary sm:text-base">
                {slide.content}
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollToIndex(activeIndexRef.current - 1)}
          disabled={isFirst}
          aria-label="Previous section"
          className="absolute top-1/2 left-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-xs backdrop-blur transition-opacity hover:bg-accent disabled:pointer-events-none disabled:opacity-0"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollToIndex(activeIndexRef.current + 1)}
          disabled={isLast}
          aria-label="Next section"
          className="absolute top-1/2 right-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-xs backdrop-blur transition-opacity hover:bg-accent disabled:pointer-events-none disabled:opacity-0"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 pb-2">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => scrollToIndex(index)}
            aria-label={`Go to section ${index + 1}: ${slide.title}`}
            aria-current={index === activeIndex}
            className={cn(
              "h-1.5 rounded-full transition-all",
              index === activeIndex
                ? "w-6 bg-primary"
                : "w-1.5 bg-border hover:bg-muted-foreground"
            )}
          />
        ))}
      </div>
    </div>
  );
}
