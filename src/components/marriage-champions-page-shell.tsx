import * as React from "react";

import { FellowshipOfTheParksLogo } from "@/components/fellowship-of-the-parks-logo";
import { GlobalNav } from "@/components/global-nav";

/**
 * Shared page shell for the "Our Marriage Champions" screen's two Figma
 * states (Populated — /marriage-champions, Empty — /marriage-champions-empty):
 * GlobalNav rail + page-gradient background + the page's h1/church-logo
 * header row. Extracted once the Empty state confirmed a second real use
 * site, matching the promotion precedent already documented for
 * VideoPlayer/FellowshipOfTheParksLogo in COMPONENTS.md.
 */
export function MarriageChampionsPageShell({
  children,
}: React.PropsWithChildren) {
  return (
    <div className="from-background-gradient-from to-background-gradient-to flex min-h-screen bg-gradient-to-l">
      <GlobalNav overlay />

      <div className="flex min-w-0 flex-1 flex-col">
        <main className="min-w-0 flex-1 p-8">
          <div className="flex w-full flex-wrap items-center gap-4">
            <h1 className="font-display text-display-md text-foreground min-w-[320px] shrink-0 font-light">
              Our Marriage Champions
            </h1>
            <div className="flex flex-1 justify-end">
              <FellowshipOfTheParksLogo />
            </div>
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}
