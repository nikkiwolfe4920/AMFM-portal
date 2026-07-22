import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
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
import { GoogleIcon } from "@/app/login/_components/google-icon";
import { HeartChartSummary } from "@/components/heartchart-summary";

import { ComponentShowcase } from "../_components/showcase";

export default function ComponentsPage() {
  return (
    <div className="flex flex-col divide-y">
      <ComponentShowcase
        name="Button"
        status="Production Ready"
        purpose="Reusable interactive action element for triggering a command (form submit, navigation, dialog open)."
        docsAnchor="button"
        figmaReference='AMFM Portal — node 3273:19658 ("Primary" button set) and siblings'
        tokens={[
          "bg-primary",
          "text-primary-foreground",
          "bg-text-brand",
          "border-border-brand",
          "bg-muted",
          "text-fg-disabled",
          "shadow-button-inset",
        ]}
        states={["Default", "Hover", "Focus", "Disabled", "Loading"]}
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
            <Button loading>Log in</Button>
          </div>
          <p className="text-muted-foreground text-xs">
            Tab to a button to see the focused state; hover to see the hover
            fill.
          </p>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        name="Input & Label"
        status="Production Ready"
        purpose="Single-line text entry control and its paired accessible label — the base control every text/email/password field composes."
        docsAnchor="input"
        figmaReference='AMFM Portal — node 3272:19436 ("Input" field set) and siblings'
        tokens={[
          "bg-background",
          "border-input",
          "border-border-brand",
          "border-border-destructive-subtle",
          "bg-muted/50",
          "text-text-secondary",
        ]}
        states={["Default", "Filled", "Focused", "Disabled", "Invalid"]}
      >
        <div className="grid max-w-sm gap-6">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ds-email">Email</Label>
            <Input id="ds-email" type="email" placeholder="Enter your email" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ds-filled">Filled</Label>
            <Input id="ds-filled" defaultValue="olivia@untitledui.com" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ds-disabled">Disabled</Label>
            <Input id="ds-disabled" disabled placeholder="Disabled input" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ds-invalid">Invalid</Label>
            <Input id="ds-invalid" aria-invalid defaultValue="not-an-email" />
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        name="Checkbox"
        status="Production Ready"
        purpose='Binary on/off selection control, e.g. "This is a trusted device" on /login.'
        docsAnchor="checkbox"
        figmaReference='AMFM Portal — Onboarding/login node 1909:25767 ("trusted device" control)'
        tokens={["border-input", "bg-primary", "border-primary", "ring-ring/50"]}
        states={["Default", "Checked", "Focus", "Invalid", "Disabled"]}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Checkbox id="ds-checkbox" defaultChecked />
            <Label htmlFor="ds-checkbox">This is a trusted device</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="ds-checkbox-disabled" disabled />
            <Label htmlFor="ds-checkbox-disabled">Disabled</Label>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        name="Card"
        status="Production Ready"
        purpose="Generic raised content surface for grouping related content — the base shadcn/ui Card, unmodified from upstream shape."
        docsAnchor="card"
        figmaReference='AMFM Portal — Onboarding/Create Profile node 1909:25769 (modal shell, header/content/footer)'
        tokens={["bg-card", "text-card-foreground", "border", "shadow-sm"]}
        states={["Default"]}
      >
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>Card description text.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Generic shadcn/ui Card primitive.</p>
          </CardContent>
        </Card>
        <p className="text-muted-foreground mt-4 text-xs">
          See{" "}
          <Link
            href="/design-system/patterns#create-profile-card"
            className="text-text-brand hover:underline"
          >
            the Create profile card pattern
          </Link>{" "}
          for this component composed with a header divider, <code className="bg-muted rounded px-1 py-0.5">CardAction</code>,
          and footer — live on <code className="bg-muted rounded px-1 py-0.5">/create-profile</code>.
        </p>
      </ComponentShowcase>

      <ComponentShowcase
        name="Dialog"
        status="Production Ready"
        purpose="Modal overlay for focused, blocking tasks or supplementary content without leaving the current page."
        docsAnchor="dialog"
        figmaReference="AMFM Portal — node 1829:19828 (modal chrome reference)"
        tokens={["bg-background", "text-foreground", "bg-overlay/50", "shadow-2xl"]}
        states={["Closed", "Open"]}
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
      </ComponentShowcase>

      <ComponentShowcase
        name="GoogleIcon"
        status="Production Ready"
        purpose='Google "G" mark for the "Log in with Google" button.'
        docsAnchor="googleicon"
        figmaReference={null}
        tokens={[]}
        states={["Static"]}
      >
        <Button variant="outline" className="text-text-secondary gap-3">
          <GoogleIcon className="size-6" />
          Log in with Google
        </Button>
      </ComponentShowcase>

      <ComponentShowcase
        name="HeartChartSummary"
        status="Draft"
        purpose="Church-wide HeartChart participation snapshot for an admin dashboard — completion count, percentage, and where it falls on the Early/Active/Strong/Exceptional scale."
        docsAnchor="heartchartsummary"
        figmaReference='AMFM Portal — node 1993:36348 ("HeartChart Summary" component set)'
        tokens={[
          "status-success",
          "status-success-strong",
          "status-warning",
          "status-warning-subtle",
          "shadow-card",
          "border-border-secondary",
          "bg-muted/50",
          "text-muted-foreground",
        ]}
        states={["Low", "Growing", "Exceptional"]}
      >
        <div className="flex flex-col gap-6">
          <HeartChartSummary percentage={1} completedCount={7} totalAttenders={2800} />
          <HeartChartSummary percentage={58} completedCount={1512} totalAttenders={2800} />
          <HeartChartSummary percentage={100} completedCount={2912} totalAttenders={2800} />
        </div>
        <Link
          href="/design-system/components/heart-chart"
          className="text-primary text-sm font-medium underline underline-offset-4"
        >
          View full HeartChartSummary documentation →
        </Link>
      </ComponentShowcase>
    </div>
  );
}
