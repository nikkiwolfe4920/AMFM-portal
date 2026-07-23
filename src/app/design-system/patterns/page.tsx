import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
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
import { InputGroup } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuthCard } from "@/app/login/_components/auth-card";
import { GoogleIcon } from "@/app/login/_components/google-icon";
import { HeartChartLogo } from "@/app/login/_components/heartchart-logo";
import { DposystemStory } from "@/app/_components/dposystem-story";
import { PricingCard } from "@/app/create-profile/_components/pricing-card";
import { PasswordRequirementItem } from "@/app/signup/_components/password-requirement-item";
import { SignupSuccess } from "@/app/signup/_components/signup-success";

import { Section } from "../_components/showcase";

const PATTERN_ROLE_OPTIONS = ["Senior Leader", "Pastor", "Ministry Leader", "Volunteer Leader", "Other"];
const PATTERN_GOAL_OPTIONS = [
  "Launch a marriage ministry",
  "Start using HeartChart with couples",
  "Help couples in crisis",
  "Explore what AMFM can help us do",
];
const PATTERN_FREE_MEMBERSHIP_BENEFITS = [
  "Give couples free access to HeartChart",
  "Brand the experience with your church logo",
  "See simple relationship-health insights",
  "Add campuses, locations, or ministry teams",
  "Get up and running in one Sunday",
  "No credit card needed",
];

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
                <Input
                  id="pattern-signup-password"
                  type="password"
                  defaultValue="Sunshine1"
                  placeholder="Create a password"
                />
              </div>
              <div className="flex w-full flex-col gap-3">
                <PasswordRequirementItem met={true}>
                  Must be at least 8 characters
                </PasswordRequirementItem>
                <PasswordRequirementItem met={false}>
                  Must contain one special character
                </PasswordRequirementItem>
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
          The password field above is pre-filled (
          <code className="bg-muted rounded px-1 py-0.5">Sunshine1</code>) to
          show both checklist states at once —{" "}
          <code className="bg-muted rounded px-1 py-0.5">
            PasswordRequirementItem
          </code>{" "}
          is wired to the live <code className="bg-muted rounded px-1 py-0.5">password</code>{" "}
          value on the real <code className="bg-muted rounded px-1 py-0.5">/signup</code> form;
          see <code className="bg-muted rounded px-1 py-0.5">COMPONENTS.md#passwordrequirementitem</code>.
        </p>
        <Link
          href="/signup"
          className="text-text-brand text-sm font-medium hover:underline"
        >
          View live at /signup →
        </Link>
      </Section>

      <Section
        id="auth-card-signup-success"
        title="Auth card — sign up success"
        description="SignupForm's Success state: once the form's native validation passes and submission succeeds, SignupCardContent swaps the Google button/divider/form/login-link content for SignupSuccess inside the same AuthCard shell. Has no Figma reference — see COMPONENTS.md#signupsuccess."
      >
        <div className="bg-muted/30 flex justify-center rounded-lg border p-8">
          <AuthCard>
            <SignupSuccess name="Jordan Ellis" />
          </AuthCard>
        </div>
        <Link
          href="/signup"
          className="text-text-brand text-sm font-medium hover:underline"
        >
          View live at /signup (submit the form) →
        </Link>
      </Section>

      <Section
        id="create-profile-card"
        title="Create profile card"
        description='PhotoBackdrop + Card (CardHeader/CardContent/CardFooter, restyled to a flush flex layout — see COMPONENTS.md#card) + HeartChartLogo + full field set (Input/Select/InputGroup, all required) + PricingCard, composed on /create-profile. Uses the generic, theme-aware Card primitive rather than the fixed-light AuthCard pattern above — AuthCard’s nested outer-shell/inner-panel anatomy doesn’t match this wider, section-divided frame. Rendered here without the full-bleed PhotoBackdrop so it fits the page layout — see /create-profile for the live full-screen version.'
      >
        <div className="bg-muted/30 flex justify-center rounded-lg border p-8">
          <Card className="w-full max-w-4xl gap-0 rounded-2xl border-none py-0 shadow-xl">
            <CardHeader className="flex flex-col gap-0 px-6 pt-6">
              <div className="flex w-full items-center gap-4">
                <div className="flex flex-1 flex-col gap-0.5">
                  <CardTitle className="font-display text-display-md leading-[2.5rem] text-foreground font-light">
                    Create profile
                  </CardTitle>
                  <CardDescription className="text-text-tertiary">
                    Help us personalize your experience
                  </CardDescription>
                </div>
                <HeartChartLogo />
              </div>
              <div className="border-border-secondary mt-5 w-full border-t" />
            </CardHeader>
            <CardContent className="flex flex-col gap-10 pt-5 lg:flex-row lg:items-start">
              <div className="flex flex-1 flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="pattern-create-profile-org" required>
                    Church or Organization name
                  </Label>
                  <Input
                    id="pattern-create-profile-org"
                    placeholder="Enter church or organization name"
                  />
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="pattern-create-profile-location" required>
                      Location
                    </Label>
                    <Input
                      id="pattern-create-profile-location"
                      placeholder="Enter your zip"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="pattern-create-profile-attendance" required>
                      Average Weekly Attendance
                    </Label>
                    <Input
                      id="pattern-create-profile-attendance"
                      type="number"
                      placeholder="Enter a number"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="pattern-create-profile-website" required>
                    Website
                  </Label>
                  <InputGroup
                    id="pattern-create-profile-website"
                    addon="http://"
                    placeholder="yourchurch.com"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="pattern-create-profile-role" required>
                    Your role
                  </Label>
                  <Select>
                    <SelectTrigger id="pattern-create-profile-role" className="w-full">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      {PATTERN_ROLE_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="pattern-create-profile-goal" required>
                    Your primary goal
                  </Label>
                  <Select>
                    <SelectTrigger id="pattern-create-profile-goal" className="w-full">
                      <SelectValue placeholder="What's your main objective? " />
                    </SelectTrigger>
                    <SelectContent>
                      {PATTERN_GOAL_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="w-full lg:w-92 lg:shrink-0">
                <PricingCard
                  title="Free Membership"
                  benefits={PATTERN_FREE_MEMBERSHIP_BENEFITS}
                />
              </div>
            </CardContent>
            <CardFooter className="flex-col items-stretch gap-0 px-0 pt-8 pb-0">
              <div className="border-border-secondary border-t" />
              <div className="flex justify-end px-6 py-6">
                <Button>Start using HeartChart</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
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
