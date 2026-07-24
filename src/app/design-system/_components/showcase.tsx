import type * as React from "react";

import { cn } from "@/lib/utils";

export function Section({
  title,
  description,
  id,
  children,
}: React.PropsWithChildren<{
  title: string;
  description?: string;
  id?: string;
}>) {
  return (
    <section
      id={id}
      className="flex scroll-mt-24 flex-col gap-6 border-b py-12 first:pt-0 last:border-b-0"
    >
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

export function Swatch({
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

const STATUS_STYLES: Record<string, string> = {
  "Production Ready": "bg-primary/10 text-text-brand border-primary/30",
  "Branch Audit": "bg-badge-warning-bg text-badge-warning-text border-badge-warning-border",
  Approved: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  Draft: "bg-muted text-text-secondary border-border",
  Deprecated: "bg-destructive/10 text-destructive border-destructive/20",
};

export function StatusBadge({ status }: { status: keyof typeof STATUS_STYLES | string }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        STATUS_STYLES[status] ?? STATUS_STYLES.Draft
      )}
    >
      {status}
    </span>
  );
}

export function TokenList({ tokens }: { tokens: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tokens.map((token) => (
        <code
          key={token}
          className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs"
        >
          {token}
        </code>
      ))}
    </div>
  );
}

export function FigmaReference({ reference }: { reference: string | null }) {
  return (
    <p className="text-muted-foreground text-xs">
      <span className="font-medium">Figma:</span>{" "}
      {reference ?? "No reference yet — see figma/figma-links.md"}
    </p>
  );
}

export function StateList({ states }: { states: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5 text-xs">
      {states.map((state) => (
        <li
          key={state}
          className="border-border-secondary text-text-tertiary rounded-full border px-2 py-0.5"
        >
          {state}
        </li>
      ))}
    </ul>
  );
}

export function ComponentShowcase({
  name,
  status,
  purpose,
  tokens,
  states,
  figmaReference,
  docsAnchor,
  children,
}: React.PropsWithChildren<{
  name: string;
  status: string;
  purpose: string;
  tokens: string[];
  states: string[];
  figmaReference: string | null;
  docsAnchor: string;
}>) {
  return (
    <div id={docsAnchor} className="flex scroll-mt-24 flex-col gap-4 py-8 first:pt-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold tracking-tight">{name}</h2>
        <StatusBadge status={status} />
      </div>
      <p className="text-muted-foreground max-w-2xl text-sm">{purpose}</p>
      <div className="rounded-lg border p-6">{children}</div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium">States</span>
          <StateList states={states} />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium">Tokens used</span>
          <TokenList tokens={tokens} />
        </div>
      </div>
      <FigmaReference reference={figmaReference} />
      <p className="text-muted-foreground text-xs">
        Full contract:{" "}
        <code className="bg-muted rounded px-1 py-0.5">
          COMPONENTS.md#{docsAnchor}
        </code>
      </p>
    </div>
  );
}
