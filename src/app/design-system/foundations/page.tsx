import { HeartChartLogo } from "@/app/login/_components/heartchart-logo";
import { BlurOverlay } from "@/components/blur-overlay";

import { Section, Swatch } from "../_components/showcase";

const COLOR_SWATCHES: { name: string; className: string; hint?: string }[] = [
  { name: "background", className: "bg-background", hint: "Page surface" },
  { name: "foreground", className: "bg-foreground", hint: "Primary text (900)" },
  { name: "card", className: "bg-card", hint: "Raised surfaces" },
  {
    name: "primary",
    className: "bg-primary",
    hint: "Brand — bg-brand-solid #aa6140",
  },
  { name: "secondary", className: "bg-secondary" },
  { name: "muted", className: "bg-muted" },
  {
    name: "muted-foreground",
    className: "bg-muted-foreground",
    hint: "Placeholder text #717680",
  },
  { name: "accent", className: "bg-accent" },
  { name: "destructive", className: "bg-destructive" },
  { name: "border", className: "bg-border", hint: "border-primary #d5d7da" },
  {
    name: "border-secondary",
    className: "bg-border-secondary",
    hint: "Dividers #e9eaeb",
  },
  {
    name: "text-secondary",
    className: "bg-text-secondary",
    hint: "Field labels #414651",
  },
  {
    name: "text-tertiary",
    className: "bg-text-tertiary",
    hint: "Supporting copy #535862",
  },
  {
    name: "text-brand",
    className: "bg-text-brand",
    hint: "Brand link text #894e34",
  },
  { name: "overlay", className: "bg-overlay", hint: "Scrim #0a0d12" },
  {
    name: "highlight-gold",
    className: "bg-highlight-gold",
    hint: "Personalized emphasis on /welcome #e9c481",
  },
  {
    name: "brand-900",
    className: "bg-brand-900",
    hint: "CourseCard step 3 header #47261a",
  },
];

const GRADIENT_SWATCHES = [
  {
    name: "background-gradient-from → background-gradient-to",
    className: "from-background-gradient-from to-background-gradient-to bg-gradient-to-l",
    hint: "/heartchart-resources page shell — #f5eee0 → #fdf9f1, root-only (collapses to flat background in .dark)",
  },
];

const RADIUS_SWATCHES = [
  { name: "rounded-sm", className: "rounded-sm" },
  { name: "rounded-md", className: "rounded-md" },
  { name: "rounded-lg", className: "rounded-lg" },
  { name: "rounded-xl", className: "rounded-xl" },
  { name: "rounded-2xl", className: "rounded-2xl" },
  { name: "rounded-3xl", className: "rounded-3xl" },
];

const SHADOW_SWATCHES = [
  { name: "shadow-xs", className: "shadow-xs" },
  { name: "shadow-sm", className: "shadow-sm" },
  { name: "shadow-md", className: "shadow-md" },
  { name: "shadow-lg", className: "shadow-lg" },
  { name: "shadow-card", className: "shadow-card" },
  { name: "shadow-button-inset", className: "shadow-button-inset" },
];

const TYPE_SCALE = [
  { name: "text-xs", className: "text-xs", hint: "12px / 20px" },
  { name: "text-sm", className: "text-sm", hint: "14px / 22px" },
  { name: "text-base", className: "text-base", hint: "16px / 26px" },
  { name: "text-lg", className: "text-lg", hint: "18px" },
  { name: "text-xl", className: "text-xl", hint: "20px" },
  { name: "text-2xl", className: "text-2xl", hint: "24px" },
  { name: "text-3xl", className: "text-3xl", hint: "30px" },
];

const DISPLAY_TYPE_SCALE = [
  {
    name: "text-display-sm",
    className: "font-display text-display-sm font-normal",
    hint: "30px / 38px — PricingCard title",
  },
  {
    name: "text-display-md",
    className: "font-display text-display-md font-light",
    hint: "36px / 40px — CardTitle on /create-profile, page <h1> on /heartchart-resources",
  },
  {
    name: "text-display-lg",
    className: "font-display text-display-lg font-light",
    hint: "48px / 50px — /welcome subheading",
  },
  {
    name: "text-display-2xl",
    className: "font-display text-display-2xl font-light tracking-[-1.44px]",
    hint: "72px / 90px — /welcome main heading",
  },
];

const SPACING_SCALE = [
  { n: 1, className: "w-1" },
  { n: 2, className: "w-2" },
  { n: 3, className: "w-3" },
  { n: 4, className: "w-4" },
  { n: 5, className: "w-5" },
  { n: 6, className: "w-6" },
  { n: 8, className: "w-8" },
  { n: 10, className: "w-10" },
  { n: 12, className: "w-12" },
  { n: 16, className: "w-16" },
  { n: 20, className: "w-20" },
  { n: 24, className: "w-24" },
  { n: 32, className: "w-32" },
];

const BREAKPOINTS = [
  { name: "sm", width: "640px", target: "Large phones (landscape)" },
  { name: "md", width: "768px", target: "Tablets (portrait)" },
  { name: "lg", width: "1024px", target: "Tablets (landscape), small laptops" },
  { name: "xl", width: "1280px", target: "Desktops" },
  { name: "2xl", width: "1536px", target: "Large / wide monitors" },
];

const ACCESSIBILITY_PRINCIPLES = [
  "Interactive elements are real elements (<button>, <a>/Link) — never a div/span with onClick.",
  "Every focusable primitive keeps a visible focus ring.",
  "Disabled state uses the native disabled attribute, not just a style.",
  "Invalid state is driven by aria-invalid, not a visual-only prop.",
  "Color is never the only signal for destructive/error state.",
  "Text/background pairings use a token's matching *-foreground for WCAG AA contrast.",
  "One h1 per page, ordered heading levels, labeled form controls, real landmark elements.",
];

export default function FoundationsPage() {
  return (
    <div className="flex flex-col">
      <Section
        id="color"
        title="Color"
        description="Semantic tokens defined in src/tokens/colors.css, exposed as Tailwind utilities via @theme inline. Always consume the utility, never a raw hex value."
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {COLOR_SWATCHES.map((swatch) => (
            <Swatch key={swatch.name} {...swatch} />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4">
          {GRADIENT_SWATCHES.map((swatch) => (
            <Swatch key={swatch.name} {...swatch} />
          ))}
        </div>
      </Section>

      <Section
        id="typography"
        title="Typography"
        description="Geist (sans) via next/font/google. The xs/sm/base tiers use fixed pixel line-heights (not font-size ratios), defined in src/tokens/typography.css, to match the brand type scale."
      >
        <div className="flex flex-col gap-4">
          {TYPE_SCALE.map((type) => (
            <div key={type.name} className="flex items-baseline gap-4">
              <span className="text-muted-foreground w-28 shrink-0 font-mono text-xs">
                {type.name}
              </span>
              <span className={type.className}>
                The quick brown fox jumps over the lazy dog
              </span>
              {type.hint ? (
                <span className="text-muted-foreground ml-auto shrink-0 text-xs">
                  {type.hint}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="display-typography"
        title="Display typography"
        description="Financier Display (font-display) via next/font/local — the real, licensed Klim Type Foundry face (public/fonts/, weights 300/400/500/700/900), self-hosted since it isn't available via next/font/google. Only pair with the Figma-specified weight (font-light for display-md, font-normal for display-sm); never use font-display with the body type scale."
      >
        <div className="flex flex-col gap-4">
          {DISPLAY_TYPE_SCALE.map((type) => (
            <div key={type.name} className="flex items-baseline gap-4">
              <span className="text-muted-foreground w-32 shrink-0 font-mono text-xs">
                {type.name}
              </span>
              <span className={type.className}>Create profile</span>
              <span className="text-muted-foreground ml-auto shrink-0 text-xs">
                {type.hint}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="brand-mark"
        title="Brand mark"
        description="The HeartChart wordmark, exported from Figma as public/heartchart-logo.svg. Rendered via next/image (unoptimized, since it's a pre-rasterized static asset)."
      >
        <div className="flex flex-col items-center gap-3 py-4">
          <HeartChartLogo />
          <p className="text-xs">Powered by AMFM.org</p>
        </div>
      </Section>

      <Section
        id="spacing"
        title="Spacing"
        description="Tailwind's default spacing scale (multiples of 0.25rem, documented as a deliberate no-override in src/tokens/spacing.css) — every value used in the Figma login screen maps onto it exactly."
      >
        <div className="flex flex-col gap-2">
          {SPACING_SCALE.map((s) => (
            <div key={s.n} className="flex items-center gap-4">
              <span className="text-muted-foreground w-12 shrink-0 font-mono text-xs">
                {s.n}
              </span>
              <div className={`bg-primary h-3 ${s.className}`} />
              <span className="text-muted-foreground text-xs">{s.n * 0.25}rem</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="radius" title="Radius" description="Defined in src/tokens/radius.css.">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {RADIUS_SWATCHES.map((r) => (
            <Swatch key={r.name} name={r.name} className={`bg-muted ${r.className}`} />
          ))}
        </div>
      </Section>

      <Section
        id="shadows"
        title="Shadows"
        description="shadow-card and shadow-button-inset (src/tokens/shadows.css) are custom tokens added for the branded auth surface and button finish (see DESIGN.md)."
      >
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          {SHADOW_SWATCHES.map((s) => (
            <div key={s.name} className="flex flex-col items-center gap-3 py-4">
              <div className={`bg-card size-16 rounded-md ${s.className}`} />
              <span className="text-sm font-medium">{s.name}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="blur-overlay"
        title="Blur overlay"
        description="Renders real content as an inert, blurred backdrop (blur-[2px], fading to the surrounding surface color) so it reads as 'there, but not yet actionable' behind a centered empty-state call-to-action — see BlurOverlay in COMPONENTS.md. Introduced for /marriage-champions-empty (Figma node 3724:23178)."
      >
        <div className="overflow-hidden rounded-lg border">
          <BlurOverlay>
            <div className="grid grid-cols-3 gap-px bg-transparent p-6 text-sm">
              <span className="font-semibold">Olivia Rhye</span>
              <span className="text-muted-foreground">olivia@untitledui.com</span>
              <span className="text-muted-foreground">North Campus</span>
              <span className="font-semibold">Phoenix Baker</span>
              <span className="text-muted-foreground">phoenix@untitledui.com</span>
              <span className="text-muted-foreground">South Campus</span>
            </div>
          </BlurOverlay>
        </div>
        <p className="text-muted-foreground text-xs">
          Always <code className="bg-muted rounded px-1">aria-hidden</code> and{" "}
          <code className="bg-muted rounded px-1">pointer-events-none</code> — decorative
          only, never a substitute for a real disabled/loading state on interactive content.
        </p>
      </Section>

      <Section
        id="breakpoints"
        title="Breakpoints & layout"
        description="Tailwind's default breakpoints, used mobile-first. See DESIGN.md's Layout/grid rules for the full grid-column/gap table."
      >
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th scope="col" className="px-4 py-2 font-semibold">
                  Breakpoint
                </th>
                <th scope="col" className="px-4 py-2 font-semibold">
                  Min width
                </th>
                <th scope="col" className="px-4 py-2 font-semibold">
                  Target devices
                </th>
              </tr>
            </thead>
            <tbody>
              {BREAKPOINTS.map((bp) => (
                <tr key={bp.name} className="border-t">
                  <td className="px-4 py-2 font-mono">{bp.name}</td>
                  <td className="text-muted-foreground px-4 py-2">{bp.width}</td>
                  <td className="text-muted-foreground px-4 py-2">{bp.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section
        id="accessibility"
        title="Accessibility standards"
        description="See DESIGN.md's Accessibility standards section for full detail."
      >
        <ul className="flex flex-col gap-2 text-sm">
          {ACCESSIBILITY_PRINCIPLES.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden className="text-primary">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="motion"
        title="Motion"
        description="Enter/exit transitions use tw-animate-css utilities at the call site (see Dialog in Components). Any custom scroll/animation behavior must respect prefers-reduced-motion."
      >
        <p className="text-muted-foreground text-sm">
          See the Dialog and story-carousel examples under{" "}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">
            /design-system/components
          </code>{" "}
          and{" "}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">
            /design-system/patterns
          </code>{" "}
          for motion in context.
        </p>
      </Section>
    </div>
  );
}
