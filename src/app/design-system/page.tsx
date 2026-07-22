import Link from "next/link";

const PIPELINE_STEPS = [
  "Figma Design Standards",
  "DESIGN.md",
  "COMPONENTS.md",
  "React Components",
  "/design-system Visual Validation",
];

const SECTIONS = [
  {
    href: "/design-system/foundations",
    title: "Foundations",
    description:
      "Brand principles, color, typography, spacing, radius, shadows, breakpoints, motion, and accessibility standards — mirrors DESIGN.md.",
  },
  {
    href: "/design-system/components",
    title: "Components",
    description:
      "Every UI primitive and its variants, states, tokens, and Figma reference — mirrors COMPONENTS.md.",
  },
  {
    href: "/design-system/patterns",
    title: "Patterns",
    description:
      "Recurring cross-component compositions (auth card, learn-more dialog, story carousel, responsive grid).",
  },
  {
    href: "/design-system/pages",
    title: "Pages",
    description:
      "Full screens implemented from Figma, with their Figma reference and the patterns/components they're built from.",
  },
];

export default function DesignSystemOverviewPage() {
  return (
    <div className="flex flex-col gap-10 py-8">
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Figma → code → validation pipeline
        </h2>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {PIPELINE_STEPS.map((step, index) => (
            <span key={step} className="flex items-center gap-2">
              <span className="bg-muted rounded-md px-2.5 py-1 font-medium">
                {step}
              </span>
              {index < PIPELINE_STEPS.length - 1 ? (
                <span aria-hidden className="text-muted-foreground">
                  →
                </span>
              ) : null}
            </span>
          ))}
        </div>
        <p className="text-muted-foreground max-w-2xl text-sm">
          Designers define standards in Figma.{" "}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">
            DESIGN.md
          </code>{" "}
          captures the design foundations those standards produce.{" "}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">
            COMPONENTS.md
          </code>{" "}
          captures the component contracts built from those foundations. Code
          implements the contract. This section renders the implementation
          back against the same standards for visual validation.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="focus-visible:ring-ring/50 flex flex-col gap-2 rounded-lg border p-5 outline-none hover:bg-accent/50 focus-visible:ring-[3px]"
          >
            <h3 className="text-lg font-semibold">{section.title}</h3>
            <p className="text-muted-foreground text-sm">
              {section.description}
            </p>
          </Link>
        ))}
      </section>

      <section className="flex flex-col gap-2 text-sm">
        <h2 className="text-xl font-semibold tracking-tight">Reference docs</h2>
        <ul className="text-muted-foreground flex flex-col gap-1">
          <li>
            <code className="bg-muted rounded px-1 py-0.5 text-xs">
              DESIGN.md
            </code>{" "}
            — design foundations (source of truth)
          </li>
          <li>
            <code className="bg-muted rounded px-1 py-0.5 text-xs">
              COMPONENTS.md
            </code>{" "}
            — component contracts (source of truth)
          </li>
          <li>
            <code className="bg-muted rounded px-1 py-0.5 text-xs">
              IMPLEMENTATION.md
            </code>{" "}
            — AI implementation rules
          </li>
          <li>
            <code className="bg-muted rounded px-1 py-0.5 text-xs">
              design-system/
            </code>{" "}
            — documentation-content index mirroring this section&apos;s
            structure
          </li>
          <li>
            <code className="bg-muted rounded px-1 py-0.5 text-xs">
              figma/component-map.json
            </code>{" "}
            &amp;{" "}
            <code className="bg-muted rounded px-1 py-0.5 text-xs">
              figma/figma-links.md
            </code>{" "}
            — Figma references
          </li>
        </ul>
      </section>
    </div>
  );
}
