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
import { InputGroup } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GoogleIcon } from "@/app/login/_components/google-icon";
import { HeartChartSummary } from "@/components/heartchart-summary";
import { AmfmLogo } from "@/app/create-profile/_components/amfm-logo";
import { BenefitListItem } from "@/app/create-profile/_components/benefit-list-item";
import { PasswordRequirementItem } from "@/app/signup/_components/password-requirement-item";
import { SignupSuccess } from "@/app/signup/_components/signup-success";
import { GlobalNav } from "@/components/global-nav";

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
          "text-primary",
        ]}
        states={["Default", "Filled", "Focused", "Disabled", "Invalid", "Required"]}
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
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ds-required" required>
              Required field
            </Label>
            <Input id="ds-required" required placeholder="Enter a value" />
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        name="Select"
        status="Production Ready"
        purpose='Single-choice selection from an enumerated option list, styled to match Input so the two read as one form-control family — used for "Your role" and "Your primary goal" on /create-profile.'
        docsAnchor="select"
        figmaReference='AMFM Portal — Onboarding/Create Profile node 1909:25769, nodes 1909:25261 ("Your role") and 1909:25262 ("Your primary goal"); chevron-down icon node 10:338'
        tokens={[
          "border-input",
          "bg-background",
          "border-border-brand",
          "border-border-destructive-subtle",
          "bg-muted/50",
          "shadow-xs",
        ]}
        states={["Placeholder", "Filled", "Open", "Focused", "Disabled", "Invalid"]}
      >
        <div className="grid max-w-sm gap-6">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ds-select-role">Your role</Label>
            <Select>
              <SelectTrigger id="ds-select-role" className="w-full">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                {["Senior Leader", "Pastor", "Ministry Leader", "Volunteer Leader", "Other"].map(
                  (option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ds-select-disabled">Disabled</Label>
            <Select disabled>
              <SelectTrigger id="ds-select-disabled" className="w-full">
                <SelectValue placeholder="Disabled select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="placeholder">Placeholder</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        name="InputGroup"
        status="Production Ready"
        purpose='Pairs an Input with a fixed, non-editable leading add-on — e.g. a URL scheme prefix — used for the "Website" field on /create-profile.'
        docsAnchor="inputgroup"
        figmaReference='AMFM Portal — Onboarding/Create Profile node 1909:25769, node 1909:25259 ("Website" field)'
        tokens={["border-input", "bg-background", "text-text-tertiary", "border-border-brand", "shadow-xs"]}
        states={["Default", "Focused", "Disabled", "Invalid"]}
      >
        <div className="grid max-w-sm gap-6">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ds-website" required>
              Website
            </Label>
            <InputGroup id="ds-website" addon="http://" placeholder="yourchurch.com" required />
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
        name="PasswordRequirementItem"
        status="Production Ready"
        purpose="Live-validation indicator for a single password rule, giving real-time feedback on whether a requirement is currently satisfied while the user types a new password on /signup."
        docsAnchor="passwordrequirementitem"
        figmaReference='AMFM Portal — Onboarding/sign up node 1909:25768, nodes 1909:25225-1909:25229 ("Check icon" + requirement text). Figma only shows the unmet default state — the met-state status-success color is a product decision, see COMPONENTS.md.'
        tokens={["bg-border", "bg-status-success", "text-text-tertiary", "text-foreground"]}
        states={["Unmet", "Met"]}
      >
        <div className="flex max-w-sm flex-col gap-3">
          <PasswordRequirementItem met={true}>
            Must be at least 8 characters
          </PasswordRequirementItem>
          <PasswordRequirementItem met={false}>
            Must contain one special character
          </PasswordRequirementItem>
        </div>
        <p className="text-muted-foreground mt-4 text-xs">
          Wired to the live <code className="bg-muted rounded px-1 py-0.5">password</code> field
          value on <code className="bg-muted rounded px-1 py-0.5">/signup</code> — try typing a
          password there to see both states update live.
        </p>
      </ComponentShowcase>

      <ComponentShowcase
        name="SignupSuccess"
        status="Draft"
        purpose="SignupForm's Success state — confirms account creation and hands the user off to /create-profile, the next real step in the onboarding funnel."
        docsAnchor="signupsuccess"
        figmaReference={null}
        tokens={["bg-status-success/10", "text-status-success", "text-foreground", "text-text-tertiary"]}
        states={["Static"]}
      >
        <div className="bg-muted/30 flex max-w-sm justify-center rounded-lg border p-8">
          <SignupSuccess name="Jordan Ellis" />
        </div>
        <p className="text-muted-foreground mt-4 text-xs">
          No Figma reference exists for a sign-up success screen — composed
          from already-verified tokens/primitives instead of leaving the
          success path unimplemented. See COMPONENTS.md#signupsuccess.
        </p>
      </ComponentShowcase>

      <ComponentShowcase
        name="BenefitListItem"
        status="Production Ready"
        purpose='Confirms an included benefit/feature in a static list — e.g. the "Free Membership" pricing card on /create-profile.'
        docsAnchor="benefitlistitem"
        figmaReference='AMFM Portal — Onboarding/Create Profile node 1909:25769, check-circle icon node 10:6386, instances 1909:25272-1909:25275, 2852:117176, 2852:117164'
        tokens={["text-primary", "text-text-tertiary"]}
        states={["Static"]}
      >
        <div className="flex max-w-sm flex-col gap-3">
          <BenefitListItem>Give couples free access to HeartChart</BenefitListItem>
          <BenefitListItem>Brand the experience with your church logo</BenefitListItem>
          <BenefitListItem>No credit card needed</BenefitListItem>
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
        name="AmfmLogo"
        status="Draft"
        purpose='Renders the AMFM ministry wordmark with a "Powered by" caption — the footer credit inside the "Free Membership" pricing card on /create-profile.'
        docsAnchor="amfmlogo"
        figmaReference='AMFM Portal — Onboarding/Create Profile node 1909:25769, node 1909:25281 ("Logo") + node 1909:25280 ("Powered by" caption)'
        tokens={["text-text-tertiary", "text-xs", "font-display"]}
        states={["Static"]}
      >
        <AmfmLogo />
        <p className="text-muted-foreground mt-4 text-xs">
          Hand-authored text approximation — the real exported asset is blocked by this
          environment&apos;s network policy (see <code className="bg-muted rounded px-1 py-0.5">COMPONENTS.md#amfmlogo</code>).
        </p>
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

      <ComponentShowcase
        name="GlobalNav"
        status="Draft"
        purpose="The app's primary left-hand navigation rail — collapses to an 80px icon rail by default and expands to a 296px labeled panel on hover, with a smooth animated morph between the two."
        docsAnchor="globalnav"
        figmaReference='AMFM Portal — collapsed node 2065:13660 ("Sidebar navigation"), expanded node 3727:25276 ("Content"); the account menu has no Figma node reference, built from a supplied screenshot instead (see Implementation rules)'
        tokens={[
          "bg-nav-surface-from",
          "bg-nav-surface-to",
          "border-nav-border",
          "from-nav-active-from",
          "to-nav-active-to",
          "text-nav-foreground",
          "text-nav-foreground-muted",
          "text-nav-foreground-subtle",
          "bg-nav-success",
        ]}
        states={["Collapsed (default)", "Expanded (hover/focus)", "Active item", "Hover", "Focus", "Account menu open"]}
      >
        <div className="bg-nav-bg flex h-[950px] items-start rounded-xl p-6">
          <GlobalNav />
        </div>
        <p className="text-muted-foreground mt-4 text-xs">
          Hover the rail (or Tab into it) to expand it — move the pointer away, or press{" "}
          <kbd className="bg-muted rounded px-1 py-0.5">Escape</kbd>, to collapse it again. Click
          the avatar/name at the bottom to open the account menu (Personal Profile, Church
          Profile, Account Settings, Subscription &amp; Billing, Terms &amp; Privacy) — the rail
          stays expanded while that menu is open. See{" "}
          <code className="bg-muted rounded px-1 py-0.5">COMPONENTS.md#globalnav</code> for the
          full contract, including why its destination routes are placeholders.
        </p>
      </ComponentShowcase>
    </div>
  );
}
