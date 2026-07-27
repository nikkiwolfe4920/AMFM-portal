import Link from "next/link";
import { QrCode } from "lucide-react";

import { GlobalNav } from "@/components/global-nav";
import { FellowshipOfTheParksLogo } from "@/components/fellowship-of-the-parks-logo";
import { ElevatedCard } from "@/components/elevated-card";
import { BlurOverlay } from "@/components/blur-overlay";
import { FooterCta } from "@/components/footer-cta";
import { DashboardContent } from "@/components/dashboard-content";
import { Button } from "@/components/ui/button";

export default function DashboardEmptyPage() {
  return (
    <div className="from-background-gradient-from to-background-gradient-to flex min-h-screen bg-gradient-to-l">
      <GlobalNav overlay />

      <div className="flex min-w-0 flex-1 flex-col">
        <main className="min-w-0 flex-1 p-8">
          <div className="flex w-full flex-wrap items-center justify-between gap-4">
            <h1 className="font-display text-display-md min-w-60 shrink-0 font-light text-foreground">
              Our Data Dashboard
            </h1>
            <FellowshipOfTheParksLogo />
          </div>

          <ElevatedCard
            className="mt-8"
            innerClassName="relative h-dashboard-empty-preview overflow-hidden p-8"
          >
            <BlurOverlay>
              <DashboardContent />
            </BlurOverlay>

            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="flex max-w-2xl flex-col items-center gap-6 text-center">
                <h2 className="font-display text-display-lg font-light text-foreground">
                  Nothing here <span className="text-primary">yet</span>
                  &mdash;
                  <br aria-hidden="true" />
                  but that won&rsquo;t last long.
                </h2>

                <div className="flex flex-col text-base">
                  <p className="text-text-secondary">
                    Once{" "}
                    <span className="font-semibold text-foreground">
                      7 people from your church take HeartChart
                    </span>
                    , your dashboard comes to life.
                  </p>
                  <p className="text-muted-foreground">
                    (Why 7 completions? It keeps things anonymous.)
                  </p>
                </div>

                <Button size="compact">
                  <QrCode aria-hidden="true" />
                  Share your Unique QR Code and Link
                </Button>

                <p className="text-text-tertiary text-base">
                  Checkout the{" "}
                  <Link
                    href="/heartchart-resources"
                    className="text-primary underline"
                  >
                    HeartChart Resource page
                  </Link>{" "}
                  for tips to get started.
                </p>
              </div>
            </div>
          </ElevatedCard>
        </main>

        <FooterCta
          heading="Start using all the tools today."
          ctaLabel="Upgrade to Premium"
        />
      </div>
    </div>
  );
}
