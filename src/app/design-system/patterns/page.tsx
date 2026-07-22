import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
        id="auth-card-signup"
        title="Auth card — sign up"
        description="Same PhotoBackdrop + AuthCard + HeartChartLogo shell as the login pattern above, composed on /signup with a 3-field form (Name/Email/Password) and no trusted-device checkbox. Rendered here without the full-bleed PhotoBackdrop so it fits the page layout — see /signup for the live full-screen version."
      >
        <div className="bg-muted/30 flex justify-center rounded-lg border p-8">
          <AuthCard>
            <div className="flex w-full flex-col items-center gap-3 pb-4">
              <HeartChartLogo />
              <p className="text-xs">Powered by AMFM.org</p>
            </div>
            <Button variant="outline" className="text-text-secondary w-full gap-3">
              <GoogleIcon className="size-6" />
              Sign up with Google
            </Button>
            <div className="flex w-full items-center gap-2">
              <div className="bg-border-secondary h-px flex-1" />
              <span className="text-text-tertiary text-sm font-medium">or</span>
              <div className="bg-border-secondary h-px flex-1" />
            </div>
            <div className="flex w-full flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="pattern-signup-name">Name</Label>
                <Input id="pattern-signup-name" type="text" placeholder="Enter your name" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="pattern-signup-email">Email</Label>
                <Input id="pattern-signup-email" type="email" placeholder="Enter your email" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="pattern-signup-password">Password</Label>
                <Input id="pattern-signup-password" type="password" placeholder="Create a password" />
              </div>
            </div>
            <Button className="w-full">Get started – It&apos;s Free</Button>
            <div className="flex items-start justify-center gap-1 text-sm">
              <span className="text-text-tertiary">Already have an account?</span>
              <Link href="/login" className="text-text-brand font-semibold">
                Log in
              </Link>
            </div>
          </AuthCard>
        </div>
        <p className="text-muted-foreground text-xs">
          Password requirement checklist from the Figma reference is{" "}
          <span className="font-medium">not implemented</span> — its
          &quot;met&quot; state has no Figma reference yet (see{" "}
          <code className="bg-muted rounded px-1 py-0.5">
            PasswordRequirementItem
          </code>{" "}
          in COMPONENTS.md, status Draft).
        </p>
        <Link
          href="/signup"
          className="text-text-brand text-sm font-medium hover:underline"
        >
          View live at /signup →
        </Link>
      </Section>

      <Section
        id="create-profile-card"
        title="Create profile card"
        description='PhotoBackdrop + Card (CardHeader/CardAction/CardContent/CardFooter) + HeartChartLogo, composed on /create-profile. Uses the generic, theme-aware Card primitive rather than the fixed-light AuthCard pattern above — AuthCard’s nested outer-shell/inner-panel anatomy doesn’t match this wider, section-divided frame. Rendered here without the full-bleed PhotoBackdrop so it fits the page layout — see /create-profile for the live full-screen version.'
      >
        <div className="bg-muted/30 flex justify-center rounded-lg border p-8">
          <Card className="w-full max-w-2xl rounded-2xl border-none shadow-xl">
            <CardHeader className="border-border-secondary border-b">
              <CardTitle className="text-3xl font-semibold tracking-tight">
                Create profile
              </CardTitle>
              <CardDescription>Help us personalize your experience</CardDescription>
              <CardAction>
                <HeartChartLogo />
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 pt-6">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="pattern-create-profile-org">
                  Church or Organization name
                </Label>
                <Input
                  id="pattern-create-profile-org"
                  placeholder="Enter church or organization name"
                />
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="pattern-create-profile-location">Location</Label>
                  <Input
                    id="pattern-create-profile-location"
                    placeholder="Enter your zip"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="pattern-create-profile-attendance">
                    Average Weekly Attendance
                  </Label>
                  <Input
                    id="pattern-create-profile-attendance"
                    type="number"
                    placeholder="Enter a number"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-border-secondary justify-end border-t pt-6">
              <Button>Start using HeartChart</Button>
            </CardFooter>
          </Card>
        </div>
        <p className="text-muted-foreground text-xs">
          Website field, Your role / Your primary goal fields, the required-field
          asterisk marker, and the &quot;Free Membership&quot; pricing card from the
          Figma reference are <span className="font-medium">not implemented</span> —
          they depend on <code className="bg-muted rounded px-1 py-0.5">Select</code>,{" "}
          <code className="bg-muted rounded px-1 py-0.5">InputGroup</code>,{" "}
          <code className="bg-muted rounded px-1 py-0.5">BenefitListItem</code>,{" "}
          <code className="bg-muted rounded px-1 py-0.5">AmfmLogo</code>, and{" "}
          <code className="bg-muted rounded px-1 py-0.5">PricingCard</code> (all
          Draft in COMPONENTS.md).
        </p>
        <Link
          href="/create-profile"
          className="text-text-brand text-sm font-medium hover:underline"
        >
          View live at /create-profile →
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
