import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthCard } from "@/app/login/_components/auth-card";
import { GoogleIcon } from "@/app/login/_components/google-icon";
import { HeartChartLogo } from "@/app/login/_components/heartchart-logo";
import { DposystemStory } from "@/app/_components/dposystem-story";

import { Section } from "../_components/showcase";

export default function PatternsPage() {
  return (
    <div className="flex flex-col">
      <Section
        id="auth-card"
        title="Auth card"
        description="PhotoBackdrop + AuthCard + HeartChartLogo + Button/Input/Label/Checkbox, composed on /login. Rendered here without the full-bleed PhotoBackdrop so it fits the page layout — see /login for the live full-screen version."
      >
        <div className="bg-muted/30 flex justify-center rounded-lg border p-8">
          <AuthCard>
            <div className="flex w-full flex-col items-center gap-3 pb-4">
              <HeartChartLogo />
              <p className="text-xs">Powered by AMFM.org</p>
            </div>
            <Button variant="outline" className="text-text-secondary w-full gap-3">
              <GoogleIcon className="size-6" />
              Log in with Google
            </Button>
            <div className="flex w-full items-center gap-2">
              <div className="bg-border-secondary h-px flex-1" />
              <span className="text-text-tertiary text-sm font-medium">or</span>
              <div className="bg-border-secondary h-px flex-1" />
            </div>
            <div className="flex w-full flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="pattern-email">Email</Label>
                <Input id="pattern-email" type="email" placeholder="Enter your email" />
              </div>
              <div className="flex items-start gap-2">
                <Checkbox id="pattern-trusted" className="mt-0.5" />
                <Label htmlFor="pattern-trusted">This is a trusted device</Label>
              </div>
            </div>
            <Button className="w-full">Log in</Button>
          </AuthCard>
        </div>
        <Link
          href="/login"
          className="text-text-brand text-sm font-medium hover:underline"
        >
          View live at /login →
        </Link>
      </Section>

      <Section
        id="learn-more-dialog"
        title="Learn-more dialog"
        description="Dialog + a story carousel, triggered from an inline text link — used for the homepage's DPOsystem blurb without navigating away."
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open story (demo trigger)</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="sr-only">About DPOsystem</DialogTitle>
            <DposystemStory />
          </DialogContent>
        </Dialog>
        <p className="text-muted-foreground text-xs">
          Production trigger is{" "}
          <code className="bg-muted rounded px-1 py-0.5">
            DposystemLearnMore
          </code>{" "}
          (styled as white underlined text for the photo backdrop) — see{" "}
          <Link href="/" className="text-text-brand hover:underline">
            the homepage
          </Link>
          .
        </p>
      </Section>

      <Section
        id="responsive-grid"
        title="Responsive grid"
        description="Standard mobile-first grid pattern from DESIGN.md's Layout/grid rules — 1 column on mobile, 2 from sm, 4 from lg. Reach for this before inventing a new grid shape."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="bg-muted flex h-20 items-center justify-center rounded-md text-sm font-medium"
            >
              Item {index + 1}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
