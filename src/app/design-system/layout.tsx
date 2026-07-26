import type * as React from "react";

import { DesignSystemNav } from "./_components/design-system-nav";

export default function DesignSystemLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <main className="mx-auto flex w-full max-w-page-wide flex-col gap-2 px-6 py-12 md:px-8 [&_code]:text-foreground [&_kbd]:text-foreground [&_li_a]:underline [&_li_a]:underline-offset-2 [&_p_a]:underline [&_p_a]:underline-offset-2">
      <p className="text-muted-foreground text-sm font-medium">AMFM Portal</p>
      <h1 className="text-3xl font-semibold tracking-tight">Design system</h1>
      <p className="text-muted-foreground max-w-2xl text-sm">
        Rendered design-system reference for Figma-backed foundations,
        component contracts, patterns, and pages. It mirrors{" "}
        <code className="bg-muted rounded px-1 py-0.5 text-xs">DESIGN.md</code>,{" "}
        <code className="bg-muted rounded px-1 py-0.5 text-xs">
          COMPONENTS.md
        </code>, and{" "}
        <code className="bg-muted rounded px-1 py-0.5 text-xs">
          IMPLEMENTATION.md
        </code>{" "}
        by showing the actual app code plus the audit paths used to keep Figma
        extraction, tokens, components, patterns, and pages aligned.
      </p>
      <DesignSystemNav />
      {children}
    </main>
  );
}
