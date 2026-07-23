import type * as React from "react";

import { DesignSystemNav } from "./_components/design-system-nav";

export default function DesignSystemLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-2 px-6 py-12 md:px-8">
      <p className="text-muted-foreground text-sm font-medium">AMFM Portal</p>
      <h1 className="text-3xl font-semibold tracking-tight">Design system</h1>
      <p className="text-muted-foreground max-w-2xl text-sm">
        Living, rendered reference for{" "}
        <code className="bg-muted rounded px-1 py-0.5 text-xs">DESIGN.md</code>{" "}
        and{" "}
        <code className="bg-muted rounded px-1 py-0.5 text-xs">
          COMPONENTS.md
        </code>
        . This section renders the actual Tailwind utilities and shadcn/ui
        primitives used across the app — if it drifts from those files, one of
        them is out of date.
      </p>
      <DesignSystemNav />
      {children}
    </div>
  );
}
