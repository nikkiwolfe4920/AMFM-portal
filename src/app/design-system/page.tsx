import type * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HeartChartLogo } from "@/app/login/_components/heartchart-logo";

function Section({
  title,
  description,
  children,
}: React.PropsWithChildren<{ title: string; description?: string }>) {
  return (
    <section className="flex flex-col gap-6 border-b py-12 first:pt-0 last:border-b-0">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description ? (
          <p className="text-muted-foreground max-w-2xl text-sm">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function Swatch({
  name,
  className,
  hint,
}: {
  name: string;
  className: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`h-16 w-full rounded-md border ${className}`} />
      <div className="flex flex-col">
        <span className="text-sm font-medium">{name}</span>
        {hint ? (
          <span className="text-muted-foreground text-xs">{hint}</span>
        ) : null}
      </div>
    </div>
  );
}

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
];

const RADIUS_SWATCHES = [
  { name: "rounded-sm", className: "rounded-sm" },
  { name: "rounded-md", className: "rounded-md" },
  { name: "rounded-lg", className: "rounded-lg" },
  { name: "rounded-xl", className: "rounded-xl" },
  { name: "rounded-2xl", className: "rounded-2xl" },
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

export default function DesignSystemPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-6 py-12 md:px-8">
      <p className="text-muted-foreground text-sm font-medium">AMFM Portal</p>
      <h1 className="text-3xl font-semibold tracking-tight">Design system</h1>
      <p className="text-muted-foreground max-w-2xl text-sm">
        Living reference for the tokens and primitives documented in{" "}
        <code className="bg-muted rounded px-1 py-0.5 text-xs">DESIGN.md</code>.
        This page renders the actual Tailwind utilities and shadcn/ui
        primitives used across the app — if it drifts from{" "}
        <code className="bg-muted rounded px-1 py-0.5 text-xs">DESIGN.md</code>{" "}
        or from{" "}
        <code className="bg-muted rounded px-1 py-0.5 text-xs">globals.css</code>
        , one of them is out of date.
      </p>

      <Section
        title="Color"
        description="Semantic tokens defined in globals.css, exposed as Tailwind utilities via @theme inline. Always consume the utility, never a raw hex value."
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {COLOR_SWATCHES.map((swatch) => (
            <Swatch key={swatch.name} {...swatch} />
          ))}
        </div>
      </Section>

      <Section
        title="Typography"
        description="Geist (sans) via next/font/google. The xs/sm/base tiers use fixed pixel line-heights (not font-size ratios) to match the brand type scale."
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
        title="Brand mark"
        description="The HeartChart wordmark, exported from Figma as public/heartchart-logo.svg. Rendered via next/image (unoptimized, since it's a pre-rasterized static asset)."
      >
        <div className="flex flex-col items-center gap-3 py-4">
          <HeartChartLogo />
          <p className="text-xs">Powered by AMFM.org</p>
        </div>
      </Section>

      <Section
        title="Spacing"
        description="Tailwind's default spacing scale (multiples of 0.25rem) — no custom spacing tokens are needed; every value used in the Figma source maps onto it exactly."
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

      <Section title="Radius">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {RADIUS_SWATCHES.map((r) => (
            <Swatch key={r.name} name={r.name} className={`bg-muted ${r.className}`} />
          ))}
        </div>
      </Section>

      <Section
        title="Shadows"
        description="shadow-card and shadow-button-inset are custom tokens added for the branded auth surface (see DESIGN.md)."
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
        title="Buttons"
        description="Default and outline variants carry the brand skeuomorphic finish (shadow-button-inset + translucent inner border on default)."
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="default">Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Icon button">
              +
            </Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>
      </Section>

      <Section title="Form controls">
        <div className="grid max-w-sm gap-6">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ds-email">Email</Label>
            <Input id="ds-email" type="email" placeholder="Enter your email" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ds-disabled">Disabled</Label>
            <Input id="ds-disabled" disabled placeholder="Disabled input" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ds-invalid">Invalid</Label>
            <Input id="ds-invalid" aria-invalid defaultValue="not-an-email" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="ds-checkbox" defaultChecked />
            <Label htmlFor="ds-checkbox">This is a trusted device</Label>
          </div>
        </div>
      </Section>

      <Section title="Card">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>Card description text.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Generic shadcn/ui Card primitive.</p>
          </CardContent>
        </Card>
      </Section>

      <Section
        title="Dialog"
        description="White surface, rounded-2xl, shadow-2xl, with a grey (muted-foreground) close X in a size-11 hit target — modeled on the Figma modal chrome (AMFM Portal file, node 1829:19828). Theme-aware like the rest of the component library, not fixed-light."
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="p-6 pr-14">
              <DialogTitle>Dialog title</DialogTitle>
              <DialogDescription>
                Generic shadcn/ui-pattern Dialog primitive, built on
                @radix-ui/react-dialog.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </Section>
    </div>
  );
}
