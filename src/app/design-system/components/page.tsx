import Link from "next/link";
import Image from "next/image";
import { ClipboardCheck, FileBadge, Plus, Share2, Upload } from "lucide-react";

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
import { HelperText } from "@/components/ui/helper-text";
import { Input } from "@/components/ui/input";
import { InputActionGroup } from "@/components/ui/input-action-group";
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
import { ChartScaleMarker } from "@/components/chart-scale-marker";
import { HeartChartSummary } from "@/components/heartchart-summary";
import { WeDoCard } from "@/components/we-do-card";
import { PointerCallout } from "@/components/pointer-callout";
import { PointerCalloutArrow } from "@/components/pointer-callout-arrow";
import { ParticipationVerticalBarCard } from "@/components/participation-vertical-bar-card";
import { StatusSnapshotCard } from "@/components/status-snapshot-card";
import { CommitmentConnectionChart } from "@/components/commitment-connection-chart";
import {
  HorizontalTabsDemo,
  DashboardFilterMenuDemo,
} from "../_components/dashboard-showcase-demos";
import { SnapshotVideoCard } from "@/components/snapshot-video-card";
import { FullWidthBarChart } from "@/components/full-width-bar-chart";
import { PieChartCard } from "@/components/pie-chart-card";
import { ScaleChartCard } from "@/components/scale-chart-card";
import {
  AGE_GROUPS_DATA,
  CAUTION_FLAGS_DATA,
  DASHBOARD_FILTER_GROUPS,
  FAITH_JOURNEY_PIE,
  FULL_WIDTH_BAR_CHART_DATA,
  GOD_CONNECTION_PIE,
  KIDS_DATA,
  RELATIONSHIP_HEALTH_RESPONSE_COUNT,
  RELATIONSHIP_HEALTH_SUMMARY,
  RELATIONSHIP_HEALTH_ZONE_LABELS,
  RELATIONSHIP_STATUS_DATA,
} from "@/lib/dashboard-data";
import { AmfmLogo } from "@/app/create-profile/_components/amfm-logo";
import { BenefitListItem } from "@/app/create-profile/_components/benefit-list-item";
import { PasswordRequirementItem } from "@/app/signup/_components/password-requirement-item";
import { SignupSuccess } from "@/app/signup/_components/signup-success";
import { GlobalNav } from "@/components/global-nav";
import { VideoPlayer } from "@/components/video-player";
import { HeartChartModalShell } from "@/components/heartchart-modal-shell";
import { InfoNote } from "@/components/info-note";
import { ModalTextSection } from "@/components/modal-text-section";
import { ParticipationTrendCard } from "@/components/participation-trend-card";
import { TipCarousel } from "@/components/tip-carousel";
import { BlurOverlay } from "@/components/blur-overlay";
import { ResourceListItem } from "@/components/resource-list-item";
import { ElevatedCard } from "@/components/elevated-card";
import { TopHero } from "@/components/top-hero";
import { CourseCard } from "@/components/course-card";
import { FooterCta } from "@/components/footer-cta";
import { StatusTag } from "@/components/ui/status-tag";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@/components/ui/table";

import { ComponentShowcase } from "../_components/showcase";
import {
  HeartChartLastFourWeeksModalDemo,
  HeartChartLinkCardDemo,
  HeartChartLinkModalDemo,
  HeartChartQuickTipModalDemo,
  HeartChartResourcesQuickStartModalDemo,
  InviteUserModalDemo,
} from "../_components/heartchart-modal-demos";
import {
  ChurchProfileSettingsModalDemo,
  SettingsAssetUploadDemo,
  SettingsCampusListDemo,
  SettingsModalShellDemo,
  SettingsSectionDemo,
} from "./_components/settings-demos";

const participationTrendDemoPoints = [
  { label: "Mar 23", value: 1 },
  { label: "Mar 25", value: 1 },
  { label: "Mar 27", value: 1 },
  { label: "Mar 29", value: 3 },
  { label: "Mar 30", value: 0 },
  { label: "Apr 1", value: 0 },
  { label: "Apr 2", value: 3 },
  { label: "Apr 4", value: 3 },
  { label: "Apr 5", value: 4 },
  { label: "Apr 7", value: 3 },
  { label: "Apr 8", value: 1 },
  { label: "Apr 10", value: 0 },
  { label: "Apr 12", value: 2 },
  { label: "Apr 14", value: 2 },
  { label: "Apr 16", value: 2 },
  { label: "Apr 18", value: 1 },
  { label: "Apr 19", value: 4 },
];

const tipCarouselDemoItems = [
  {
    title: "Start with personal invites",
    description:
      "Encourage champions to personally reach out to a few couples or individuals who have not taken HeartChart yet.",
  },
  {
    title: "Use natural moments",
    description:
      "In small groups, mentoring, or coaching conversations, ask: Have you taken HeartChart yet?",
  },
  {
    title: "Make it easy in the moment",
    description:
      "Have the link or QR code ready so people can complete it right then.",
  },
];

export default function ComponentsPage() {
  return (
    <div className="flex flex-col divide-y">
      <ComponentShowcase
        name="Button"
        status="Branch Audit"
        purpose="Reusable interactive action element for triggering a command (form submit, navigation, dialog open)."
        docsAnchor="button"
        figmaReference='AMFM Portal — node 3273:19658 ("Primary" button set, default 46px) and siblings; icon-leading sizes confirmed on node 3724:23184 ("Invite Marriage Champions", sm 42px), node 1894:16263 ("Get Started", lg 50px), and node 1903:19737 ("Add a campus", compact 38px)'
        tokens={[
          "bg-primary",
          "text-primary-foreground",
          "text-button-primary-icon",
          "bg-button-outline-bg",
          "border-button-outline-border",
          "text-button-outline-fg",
          "text-button-outline-icon",
          "bg-button-outline-reversed-bg",
          "border-button-outline-reversed-border",
          "text-button-outline-reversed-fg",
          "text-button-outline-reversed-icon",
          "bg-text-brand",
          "border-border-brand",
          "bg-muted",
          "text-fg-disabled",
          "shadow-button-inset",
          "shadow-xs",
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
            <Button size="compact">Compact</Button>
            <Button variant="link" size="inline" asChild>
              <a href="#heartchartlinkmodal">
                <Upload aria-hidden="true" />
                Upload your logo in settings
              </a>
            </Button>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Icon button">
              +
            </Button>
            <Button disabled>Disabled</Button>
            <Button loading>Log in</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">
              <FileBadge aria-hidden="true" />
              Invite Marriage Champions
            </Button>
          </div>
          <p className="text-muted-foreground text-xs">
            Tab to a button to see the focused state; hover to see the hover
            fill. Icons on the <code className="bg-muted rounded px-1">default</code>{" "}
            variant use <code className="bg-muted rounded px-1">
              text-button-primary-icon
            </code>{" "}
            while labels remain <code className="bg-muted rounded px-1">
              text-primary-foreground
            </code>.
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
          "text-destructive",
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
            <Input
              id="ds-invalid"
              aria-invalid
              aria-describedby="ds-invalid-helper"
              defaultValue="not-an-email"
            />
            <HelperText id="ds-invalid-helper" error>
              Enter a valid email address.
            </HelperText>
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
        name="InputActionGroup"
        status="Draft"
        purpose="Pairs an Input with an attached trailing action button when the action directly operates on the input value."
        docsAnchor="inputactiongroup"
        figmaReference="AMFM Portal — Modal/Settings/Church Profile node 3724:20992, add-campus field/action row"
        tokens={[
          "border-input",
          "bg-background",
          "border-border-brand",
          "border-border-destructive-subtle",
          "shadow-xs",
          "transition-control",
          "Button default/controlSegment",
        ]}
        states={["Default", "Focused", "Disabled", "Action disabled", "Submit action"]}
      >
        <div className="grid max-w-sm gap-6">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ds-campus-action">Campus name</Label>
            <InputActionGroup
              id="ds-campus-action"
              name="campusName"
              placeholder="Campus name"
              actionLabel="Add"
              actionIcon={<Plus aria-hidden="true" />}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ds-campus-action-disabled">Campus name</Label>
            <InputActionGroup
              id="ds-campus-action-disabled"
              name="campusNameDisabled"
              placeholder="Campus name"
              actionLabel="Add"
              actionIcon={<Plus aria-hidden="true" />}
              actionDisabled
            />
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
        name="ResourceListItem"
        status="Production Ready"
        purpose="Presents one downloadable resource (icon, title, supporting description, trailing download action) inside a card-based list — used on /heartchart-resources."
        docsAnchor="resourcelistitem"
        figmaReference='AMFM Portal — HeartChart Resources node 2361:19280, six "Table cell" instances across the Optional Resources and Premium Resources cards'
        tokens={["text-foreground", "text-muted-foreground", "text-fg-quaternary", "shadow-xs", "rounded-md"]}
        states={["Default"]}
      >
        <div className="flex max-w-md flex-col gap-6">
          <ResourceListItem
            icon={ClipboardCheck}
            title="HeartChart Weekend Service Kit"
            description="Plan, host, and guide your HeartChart service moment"
            href="#"
            actionLabel="Download HeartChart Weekend Service Kit"
          />
          <ResourceListItem
            icon={Share2}
            title="HeartChart Promotional Kit"
            description="Emails, social, and assets to drive participation"
            href="#"
            actionLabel="Download HeartChart Promotional Kit"
          />
        </div>
        <p className="text-muted-foreground mt-4 text-xs">
          The trailing action downloads the resource — confirmed by Figma&apos;s own interaction
          annotation — not a navigation chevron. See{" "}
          <code className="bg-muted rounded px-1 py-0.5">COMPONENTS.md#resourcelistitem</code>.
          View live at{" "}
          <Link href="/heartchart-resources" className="text-text-brand hover:underline">
            /heartchart-resources
          </Link>
          .
        </p>
      </ComponentShowcase>

      <ComponentShowcase
        name="ElevatedCard"
        status="Production Ready"
        purpose="Shared nested-shell surface (outer shadow-card shell wrapping an inner bordered panel) used by TopHero and the HeartChart Resources cards."
        docsAnchor="elevatedcard"
        figmaReference='AMFM Portal — shared shape confirmed on "Featured Training" (node 2318:26997) and the HeartChart Resources cards (node 2361:19280)'
        tokens={["bg-background", "shadow-card", "rounded-2xl", "rounded-md", "border-border"]}
        states={["Default"]}
      >
        <ElevatedCard className="max-w-sm">
          <p className="p-6 text-sm">Outer shadow-card shell + inner bordered panel.</p>
        </ElevatedCard>
        <p className="text-muted-foreground mt-4 text-xs">
          Extracted once a third real instance of this shape appeared, per{" "}
          <code className="bg-muted rounded px-1 py-0.5">HeartChartSummary</code>&apos;s own
          documented precedent — see{" "}
          <code className="bg-muted rounded px-1 py-0.5">COMPONENTS.md#elevatedcard</code>.
        </p>
      </ComponentShowcase>

      <ComponentShowcase
        name="TopHero"
        status="Production Ready"
        purpose="Full-bleed photo hero for a dashboard page's featured training/promo banner — a two-tone heading, supporting copy, and a video CTA. Fixed 512px height; the photo bleeds to the card's true outer edge with a thin pinstripe border marking the inset."
        docsAnchor="tophero"
        figmaReference='AMFM Portal — "Featured Training" component (node 4194:25820)'
        tokens={[
          "text-nav-foreground",
          "text-highlight-gold",
          "text-nav-foreground-muted",
          "text-display-lg",
          "text-display-2xl",
        ]}
        states={["Default"]}
      >
        <TopHero
          eyebrowHeading="Let's prepare for your"
          highlightHeading="HeartChart Weekend"
          description="Three simple steps to get your people engaged—and your dashboard up and running."
          ctaLabel="Watch the Overview"
        />
        <p className="text-muted-foreground mt-4 text-xs">
          The congregation-stage photo bleeds to the card&apos;s true outer edge behind a pinstripe
          border, per{" "}
          <code className="bg-muted rounded px-1 py-0.5">COMPONENTS.md#tophero</code>. View live at{" "}
          <Link href="/heartchart-resources" className="text-text-brand hover:underline">
            /heartchart-resources
          </Link>
          .
        </p>
      </ComponentShowcase>

      <ComponentShowcase
        name="CourseCard"
        status="Production Ready"
        purpose="One step in a fixed 3-step course pattern — numbered header, video-cover CTA, and a supporting checklist."
        docsAnchor="coursecard"
        figmaReference='AMFM Portal — "Course Card" component (node 2074:45130)'
        tokens={["bg-text-brand", "text-white", "bg-muted", "text-muted-foreground", "text-primary"]}
        states={["Step 1", "Step 2", "Step 3"]}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <CourseCard
            step={1}
            eyebrow="Before the weekend service"
            title="Get Your Team Ready"
            imageSrc="/Step-1.png"
            videoCtaLabel="See How It Works"
            checklist={[
              "Share your QR code and link with your team to start your dashboard",
              "Upload your logo (recommended)",
            ]}
          />
          <CourseCard
            step={2}
            eyebrow="During service"
            title="Create the Moment"
            imageSrc="/Step-2.png"
            videoCtaLabel="See How It Works"
            checklist={["Give people 3 minutes to complete their HeartChart"]}
          />
          <CourseCard
            step={3}
            eyebrow="Don't miss this"
            title="Point Them to the Next Step"
            imageSrc="/Step-3.png"
            videoCtaLabel="See How It Works"
            hideArrow
            checklist={["Use your dashboard to guide next steps"]}
          />
        </div>
        <p className="text-muted-foreground mt-4 text-xs">
          See{" "}
          <code className="bg-muted rounded px-1 py-0.5">COMPONENTS.md#coursecard</code> for the
          full contract. View the full 3-step pattern with real copy at{" "}
          <Link href="/heartchart-resources" className="text-text-brand hover:underline">
            /heartchart-resources
          </Link>
          .
        </p>
      </ComponentShowcase>

      <ComponentShowcase
        name="FooterCta"
        status="Draft"
        purpose="Full-bleed banner prompting a free-tier account to upgrade to Premium — used at the bottom of /heartchart-resources and /dashboard-empty."
        docsAnchor="footercta"
        figmaReference='AMFM Portal — "Footer CTA" component (node 1909:25789); also instanced on "Data Dashboard Empty State" (node 3899:27502)'
        tokens={[
          "bg-primary",
          "text-primary-foreground",
          "text-display-md",
          "bg-button-outline-reversed-bg",
          "border-button-outline-reversed-border",
          "text-button-outline-reversed-fg",
          "text-button-outline-reversed-icon",
        ]}
        states={["Default"]}
      >
        <FooterCta heading="Start using all the tools today." ctaLabel="Upgrade to Premium" />
        <p className="text-muted-foreground mt-4 text-xs">
          Figma&apos;s dev annotation notes this &quot;only shows if they have a free
          account.&quot; The background texture asset is blocked in this environment — renders a
          flat <code className="bg-muted rounded px-1 py-0.5">bg-primary</code> fill instead, see{" "}
          <code className="bg-muted rounded px-1 py-0.5">COMPONENTS.md#footercta</code>.
        </p>
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
        name="HeartChartModalShell"
        status="Draft"
        purpose="Reusable HeartChart modal-family shell: shared overlay, accessible title/close header, optional divider, body slot, optional footer, and Figma-sized width variants."
        docsAnchor="heartchartmodalshell"
        figmaReference="AMFM Portal — HeartChart link Modal (1903:19737; earlier component reference 3724:20579), Modal / quick tip (3727:32459), Modal / last 4 weeks (3727:32514), HeartChart Resources / Quick Start (3727:32687)"
        tokens={[
          "bg-background",
          "bg-overlay/85",
          "backdrop-blur-sm",
          "border-border-secondary",
          "bg-secondary",
          "rounded-2xl",
          "rounded-md",
          "shadow-2xl",
        ]}
        states={["Closed", "Open", "Framed", "Plain", "Footer", "No divider"]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <HeartChartModalShell
            title="HeartChart link"
            description="Shareable HeartChart link modal shell preview."
            trigger={
              <Button type="button" variant="outline">
                Open framed shell
              </Button>
            }
            size="xl"
            footer={
              <Button type="button" size="compact">
                <Plus aria-hidden="true" />
                Add a campus
              </Button>
            }
          >
            <div className="border-border-secondary rounded-md border bg-secondary p-4">
              <p className="text-sm font-medium text-foreground">
                HeartChart URL or QR content composes here.
              </p>
              <p className="text-muted-foreground mt-1 text-sm">
                The shell owns chrome; modal-specific rows stay separate.
              </p>
            </div>
          </HeartChartModalShell>
          <HeartChartModalShell
            title="Quick Start Guide"
            description="Plain HeartChart video modal shell preview."
            trigger={
              <Button type="button" variant="outline">
                Open plain shell
              </Button>
            }
            size="lg"
            framed={false}
            showDivider={false}
          >
            <div className="bg-overlay/90 flex aspect-video items-center justify-center rounded-md text-sm font-medium text-white">
              Video content slot
            </div>
          </HeartChartModalShell>
        </div>
        <p className="text-muted-foreground mt-4 text-xs">
          Foundation shell — URL rows are now composed by HeartChartLinkCard; video controls,
          charts, and tips carousel content should follow as separate child components with their
          own tests. See{" "}
          <code className="bg-muted rounded px-1 py-0.5">COMPONENTS.md#heartchartmodalshell</code>.
        </p>
      </ComponentShowcase>

      <ComponentShowcase
        name="SettingsModalShell"
        status="Draft"
        purpose="Reusable settings/account modal shell with left navigation, visible title/description header, and scrollable content pane."
        docsAnchor="settingsmodalshell"
        figmaReference="AMFM Portal — Modal/Settings/Church Profile node 3724:20992, Settings/Church Profile instance node 3724:21598"
        tokens={[
          "bg-overlay/85",
          "bg-background",
          "bg-secondary",
          "border-border-secondary",
          "text-fg-quaternary",
          "font-display",
          "text-display-md",
          "max-w-modal-settings",
          "grid-cols-settings-modal",
          "shadow-card",
        ]}
        states={["Closed", "Open", "Active nav", "Scrollable body"]}
      >
        <SettingsModalShellDemo />
      </ComponentShowcase>

      <ComponentShowcase
        name="SettingsSection"
        status="Draft"
        purpose="Reusable settings section molecule: uppercase section label plus rounded secondary panel."
        docsAnchor="settingssection"
        figmaReference="AMFM Portal — Modal/Settings/Church Profile node 3724:20992, CHURCH LOGO / BASIC INFORMATION / CAMPUSES section groups"
        tokens={["bg-secondary", "text-muted-foreground", "tracking-label", "rounded-2xl"]}
        states={["Default"]}
      >
        <SettingsSectionDemo />
      </ComponentShowcase>

      <ComponentShowcase
        name="SettingsAssetUpload"
        status="Draft"
        purpose="Reusable settings asset-upload row: preview, upload action, remove action, and accepted-file helper copy."
        docsAnchor="settingsassetupload"
        figmaReference="AMFM Portal — Modal/Settings/Church Profile node 3724:20992, CHURCH LOGO upload block"
        tokens={[
          "bg-secondary",
          "text-muted-foreground",
          "Button outline/control",
          "Button link/inline",
          "rounded-xs",
        ]}
        states={["Default", "Missing callback disabled"]}
      >
        <SettingsAssetUploadDemo />
      </ComponentShowcase>

      <ComponentShowcase
        name="SettingsCampusList"
        status="Draft"
        purpose="Reusable settings campus list rows with edit/remove utility actions."
        docsAnchor="settingscampuslist"
        figmaReference="AMFM Portal — Modal/Settings/Church Profile node 3724:20992, CAMPUSES list rows"
        tokens={[
          "bg-secondary",
          "border-border-secondary",
          "text-foreground",
          "text-fg-quaternary",
          "grid-cols-settings-campus-row",
          "Button ghost/icon",
        ]}
        states={["Default", "Disabled actions"]}
      >
        <SettingsCampusListDemo />
      </ComponentShowcase>

      <ComponentShowcase
        name="ChurchProfileSettingsModal"
        status="Draft"
        purpose="Composed Church Profile settings modal pattern built from SettingsModalShell and reusable settings/form molecules."
        docsAnchor="churchprofilesettingsmodal"
        figmaReference="AMFM Portal — Modal/Settings/Church Profile node 3724:20992"
        tokens={[
          "max-w-modal-settings",
          "max-w-settings-content",
          "grid-cols-settings-modal",
          "grid-cols-settings-field-pair",
          "grid-cols-settings-address",
          "bg-secondary",
          "border-input",
          "shadow-card",
        ]}
        states={["Closed", "Open", "Scrollable form", "Active nav", "Add campus"]}
      >
        <ChurchProfileSettingsModalDemo />
      </ComponentShowcase>

      <ComponentShowcase
        name="InfoNote"
        status="Draft"
        purpose="Reusable low-emphasis informational note with icon, semantic note role, and tokenized secondary surface styling."
        docsAnchor="infonote"
        figmaReference="AMFM Portal — Modal / invite user node 3724:23382, informational role note"
        tokens={[
          "bg-secondary",
          "border-border-secondary",
          "text-text-secondary",
          "text-foreground",
        ]}
        states={["Default", "Custom icon"]}
      >
        <InfoNote>
          <p>
            Marriage Champions can view HeartChart and AMFM Premium content but cannot
            change <span className="font-semibold text-foreground">Fellowship of the Parks</span>{" "}
            profile information or access billing details.
          </p>
        </InfoNote>
      </ComponentShowcase>

      <ComponentShowcase
        name="ModalTextSection"
        status="Draft"
        purpose="Reusable modal body text block: labelled section, optional divider, heading, and stacked supporting copy."
        docsAnchor="modaltextsection"
        figmaReference="AMFM Portal — Modal/quick tip node 3727:32459, Growing Momentum body section"
        tokens={["border-border-secondary", "text-foreground", "text-text-secondary"]}
        states={["Divided", "Undivided"]}
      >
        <div className="max-w-xl">
          <ModalTextSection title="Growing Momentum">
            <p>
              Momentum is on your side—now widen the net. Reinforce it from the
              platform, equip small group leaders, and follow up midweek.
            </p>
            <p>
              We’ve got simple tools and templates to help you reach those who
              haven’t jumped in yet.
            </p>
          </ModalTextSection>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        name="ParticipationTrendCard"
        status="Draft"
        purpose="Reusable participation metric and inline SVG trend chart block for modal or page surfaces."
        docsAnchor="participationtrendcard"
        figmaReference="AMFM Portal — Modal / last 4 weeks node 3727:32514, March 23-April 19 chart block"
        tokens={[
          "text-foreground",
          "text-muted-foreground",
          "text-fg-quaternary",
          "border-border-secondary",
          "fill-primary/10",
          "stroke-primary",
        ]}
        states={["Default", "Edge-aligned x-axis labels"]}
      >
        <div className="max-w-2xl">
          <ParticipationTrendCard
            dateRange="March 23 – April 19"
            total={62}
            totalLabel="Total this month"
            points={participationTrendDemoPoints}
            chartAriaLabel="Daily HeartChart completions from March 23 through April 19."
            xAxisLabels={["Mar 23", "Mar 30", "Apr 5", "Apr 12", "Apr 19"]}
          />
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        name="TipCarousel"
        status="Draft"
        purpose="Reusable two-card guidance carousel with semantic article cards, labelled region, dots, and shared icon buttons."
        docsAnchor="tipcarousel"
        figmaReference="AMFM Portal — Modal / last 4 weeks node 3727:32514, invitation tip cards"
        tokens={[
          "bg-background",
          "border-border-secondary",
          "text-foreground",
          "text-text-secondary",
          "bg-primary",
          "bg-muted",
        ]}
        states={["First page", "Next", "Previous", "Single-page disabled controls"]}
      >
        <div className="max-w-2xl">
          <TipCarousel items={tipCarouselDemoItems} ariaLabel="HeartChart invitation tips" />
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        name="HeartChartLinkCard"
        status="Draft"
        purpose="Reusable HeartChart URL and QR action card: QR preview, labelled read-only URL field, copy action, share action, and download-QR action."
        docsAnchor="heartchartlinkcard"
        figmaReference='AMFM Portal — HeartChart link Modal node 1903:19737, nested "_HeartChart - Church - URL" row; earlier component reference node 3724:20579'
        tokens={[
          "bg-secondary",
          "bg-background",
          "border-border-secondary",
          "border-input",
          "text-text-secondary",
          "text-muted-foreground",
          "text-fg-quaternary",
          "bg-button-outline-bg",
          "border-button-outline-border",
          "text-button-outline-fg",
          "text-button-outline-icon",
          "shadow-xs",
        ]}
        states={["Default", "Hover", "Focus", "No QR image", "With QR image", "Missing callback disabled"]}
      >
        <HeartChartLinkCardDemo />
      </ComponentShowcase>

      <ComponentShowcase
        name="HeartChartLinkModal"
        status="Draft"
        purpose="Full first HeartChart modal pattern composed from HeartChartModalShell and HeartChartLinkCard."
        docsAnchor="heartchartlinkmodal"
        figmaReference="AMFM Portal — HeartChart link Modal node 1903:19737; earlier component reference node 3724:20579"
        tokens={[
          "bg-overlay/85",
          "backdrop-blur-sm",
          "bg-background",
          "bg-secondary",
          "border-border-secondary",
          "text-text-tertiary",
          "text-text-brand",
          "shadow-2xl",
        ]}
        states={["Closed", "Open", "Footer action", "Header preview"]}
      >
        <HeartChartLinkModalDemo settingsHref="https://example.com/settings" />
        <p className="text-muted-foreground mt-4 text-xs">
          View the dedicated{" "}
          <Link
            href="/design-system/components/heart-chart-link-modal"
            className="text-text-brand font-medium hover:underline"
          >
            HeartChartLinkModal documentation
          </Link>
          .
        </p>
      </ComponentShowcase>

      <ComponentShowcase
        name="InviteUserModal"
        status="Draft"
        purpose="July MVP invite-team modal composed from the shared modal shell plus Input, Select, Label, and Button primitives."
        docsAnchor="inviteusermodal"
        figmaReference="AMFM Portal — Modal / invite user node 3724:23382"
        tokens={[
          "bg-overlay/85",
          "bg-background",
          "bg-secondary",
          "border-border-secondary",
          "text-text-tertiary",
          "text-text-secondary",
          "border-input",
          "shadow-xs",
        ]}
        states={["Closed", "Open", "Empty email", "Selected role", "Footer actions"]}
      >
        <InviteUserModalDemo />
      </ComponentShowcase>

      <ComponentShowcase
        name="HeartChartQuickTipModal"
        status="Draft"
        purpose="July MVP HeartChart quick-tip modal with video, content copy, and a resource CTA footer."
        docsAnchor="heartchartquicktipmodal"
        figmaReference="AMFM Portal — Modal/quick tip node 3727:32459"
        tokens={[
          "bg-overlay/85",
          "bg-background",
          "border-border-secondary",
          "text-foreground",
          "text-text-secondary",
          "shadow-2xl",
        ]}
        states={["Closed", "Open", "Video poster", "Footer CTA"]}
      >
        <HeartChartQuickTipModalDemo />
      </ComponentShowcase>

      <ComponentShowcase
        name="HeartChartLastFourWeeksModal"
        status="Draft"
        purpose="July MVP HeartChart participation trend modal with accessible chart summary and reusable tip-card structure."
        docsAnchor="heartchartlastfourweeksmodal"
        figmaReference="AMFM Portal — Modal / last 4 weeks node 3727:32514"
        tokens={[
          "bg-overlay/85",
          "bg-background",
          "border-border-secondary",
          "text-foreground",
          "text-text-secondary",
          "text-muted-foreground",
          "bg-primary/10",
          "bg-muted",
        ]}
        states={["Closed", "Open", "Trend chart", "Tip cards", "Carousel controls"]}
      >
        <HeartChartLastFourWeeksModalDemo />
      </ComponentShowcase>

      <ComponentShowcase
        name="HeartChartResourcesQuickStartModal"
        status="Draft"
        purpose="July MVP HeartChart Resources quick-start video modal proving the shell's plain no-frame/no-divider variant."
        docsAnchor="heartchartresourcesquickstartmodal"
        figmaReference="AMFM Portal — HeartChart Resources / Quick Start Guide modal node 3727:32687"
        tokens={[
          "bg-overlay/85",
          "bg-background",
          "grid-rows-modal-no-divider",
          "shadow-2xl",
        ]}
        states={["Closed", "Open", "Video poster", "No frame", "No divider"]}
      >
        <HeartChartResourcesQuickStartModalDemo />
      </ComponentShowcase>

      <ComponentShowcase
        name="PhotoBackdrop"
        status="Production Ready"
        purpose="Full-bleed background photo + dark scrim shared by any onboarding-style surface built on the same Figma photo background — now with two scrim treatments."
        docsAnchor="photobackdrop"
        figmaReference='AMFM Portal — Onboarding/login node 1909:25767 ("flat" scrim); Onboarding/First run church admin node 1909:25772 ("radial" scrim, /welcome)'
        tokens={[
          "bg-login-photo",
          "bg-overlay",
          "backdrop-blur-photo",
          "backdrop-blur-sm",
          "bg-photo-backdrop-radial-scrim",
        ]}
        states={["flat scrim (default)", "radial scrim"]}
      >
        {/* PhotoBackdrop itself is min-h-screen by design (full-bleed page
            chrome) — rendered here as scaled-down illustrative previews of
            each scrim's visual treatment, same convention already used for
            AuthCard/Card at /design-system/patterns, rather than embedding
            the real full-screen component inline. */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground font-mono text-xs">scrim=&quot;flat&quot;</span>
            <div className="relative h-56 overflow-hidden rounded-lg">
              <div className="bg-login-photo absolute inset-0 bg-cover bg-center backdrop-blur-photo" />
              <div className="bg-overlay absolute inset-0 opacity-85 backdrop-blur-sm" />
              <p className="text-nav-foreground absolute inset-0 flex items-center justify-center text-center text-sm font-medium">
                /login, /signup,
                <br />
                /create-profile, /
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground font-mono text-xs">scrim=&quot;radial&quot;</span>
            <div className="relative h-56 overflow-hidden rounded-lg">
              <div className="bg-login-photo absolute inset-0 bg-cover bg-center" />
              <div className="bg-photo-backdrop-radial-scrim absolute inset-0" />
              <p className="text-nav-foreground absolute inset-0 flex items-center justify-center text-sm font-medium">
                /welcome
              </p>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground mt-4 text-xs">
          Both variants share the same background photo
          (<code className="bg-muted rounded px-1 py-0.5">public/login-background.jpg</code>) —
          see <code className="bg-muted rounded px-1 py-0.5">COMPONENTS.md#photobackdrop</code>{" "}
          for why <code className="bg-muted rounded px-1 py-0.5">/welcome</code> reuses this photo
          rather than a distinct export. Every consumer&apos;s content must carry{" "}
          <code className="bg-muted rounded px-1 py-0.5">relative z-10</code> — the scrim is
          absolutely positioned and paints above unpositioned content regardless of DOM order; see{" "}
          <code className="bg-muted rounded px-1 py-0.5">DESIGN.md</code>&apos;s &quot;Stacking
          order on full-bleed backdrops.&quot; View live at{" "}
          <Link href="/login" className="text-text-brand hover:underline">
            /login
          </Link>{" "}
          and{" "}
          <Link href="/welcome" className="text-text-brand hover:underline">
            /welcome
          </Link>
          .
        </p>
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
        <Button variant="outline" className="gap-3">
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
        name="ChartScaleMarker"
        status="Draft"
        purpose="Downward triangle + thin vertical stem marking a reference point on a horizontal 0–100% scale track — the shared marker glyph behind both HeartChartSummary's participation-level indicator and ScaleChartCard's National Average marker."
        docsAnchor="chartscalemarker"
        figmaReference='AMFM Portal — "Marker" vector asset shared by the HeartChart Summary component set (node 1993:36348) and the Scale chart National Average marker (node 4255:30892, "Text and marker" group) — both resolve to the same triangle-topped-line asset'
        tokens={["bg-muted-foreground", "bottom-heartchart-marker", "w-heartchart-marker-stem"]}
        states={["Default"]}
      >
        <div className="flex w-72 flex-col gap-8 pt-4">
          <div className="relative h-6 w-full rounded-md bg-muted">
            <ChartScaleMarker position={20} />
          </div>
          <div className="relative h-6 w-full rounded-md bg-muted">
            <ChartScaleMarker position={65} />
          </div>
        </div>
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
        name="WeDoCard"
        status="Draft"
        purpose="Church-wide WeDo (couples relationship app) engagement snapshot — the counterpart card to HeartChartSummary, pairing a daily couple-activity stat with a qualitative pull-quote and entry points into results/sharing."
        docsAnchor="wedocard"
        figmaReference='AMFM Portal — node 4255:30872 ("HeartChart Dashboard / premium"), _Summary Data region, right-hand instance'
        tokens={[
          "wedo-brand",
          "shadow-card",
          "rounded-2xl",
          "border",
          "border-border-secondary",
          "bg-muted",
          "text-foreground",
          "text-muted-foreground",
          "text-text-tertiary",
        ]}
        states={["Default"]}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <WeDoCard
            width="fluid"
            coupleCount={363}
            quote="When it comes to being a listener in our relationship, I would rate myself: Excellent — I give full attention and seek to understand."
            highlightedPhrase="being a listener"
            nextPulseLabel="2d 16h"
          />
        </div>
        <p className="text-muted-foreground mt-4 text-xs">
          Wrapped in the same <code>grid grid-cols-1 gap-6 lg:grid-cols-2</code> grid as the real
          dashboard call site (<code>dashboard-content.tsx</code>), with <code>width=&quot;fluid&quot;</code>{" "}
          instead of the standalone <code>max-w-heartchart-card</code> cap, so at <code>lg</code> and
          above this renders at the same width it does on <code>/dashboard</code> (one column of that
          two-card grid) rather than an arbitrarily narrower gallery width.
        </p>
      </ComponentShowcase>

      <ComponentShowcase
        name="PointerCallout"
        status="Draft"
        purpose="Speech-bubble-style container with a visible directional pointer, used to anchor a short quote or contextual note to a specific piece of content — the shared primitive behind WeDoCard's pull-quote."
        docsAnchor="pointercallout"
        figmaReference='AMFM Portal — node 4255:30872, nested inside the WeDoCard instance (_Summary Data region); "left-diagonal" tail confirmed against node 4255:30880'
        tokens={["border-border-secondary", "rounded-lg", "bg-muted"]}
        states={["top", "right", "bottom", "left", "left-diagonal"]}
      >
        <div className="flex flex-wrap items-start gap-8">
          <PointerCallout pointerPosition="top" className="w-56">
            <p className="text-sm text-foreground">Top pointer (cardinal notch)</p>
          </PointerCallout>
          <PointerCallout pointerPosition="right" className="w-56">
            <p className="text-sm text-foreground">Right pointer (cardinal notch)</p>
          </PointerCallout>
          <PointerCallout pointerPosition="bottom" className="w-56">
            <p className="text-sm text-foreground">Bottom pointer (cardinal notch)</p>
          </PointerCallout>
          <PointerCallout pointerPosition="left" className="w-56">
            <p className="text-sm text-foreground">Left pointer (default)</p>
          </PointerCallout>
          <PointerCallout pointerPosition="left-diagonal" className="w-64">
            <p className="text-sm text-foreground">
              Left-diagonal tail — the variant reused inside WeDoCard&apos;s pull-quote.
            </p>
          </PointerCallout>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        name="PointerCalloutArrow"
        status="Draft"
        purpose="Small curved-arrow and serif caption pairing HeartChartSummary with WeDoCard on the dashboard — a plain arrow-and-text caption, distinct from the bordered PointerCallout speech bubble despite the similar name."
        docsAnchor="pointercalloutarrow"
        figmaReference='AMFM Portal — node 4255:30880 ("_Summary Data" → "Frame 525" → "Pointer Call-out" ×2), pixel-verified via Figma MCP get_metadata + get_design_context'
        tokens={["font-display", "text-xl", "leading-display-sm", "text-foreground", "text-text-tertiary"]}
        states={["left", "right"]}
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:gap-12">
          <PointerCalloutArrow
            side="left"
            emphasis="HeartChart"
            text="shows your people where they are."
            className="lg:flex-1"
          />
          <PointerCalloutArrow
            side="right"
            emphasis="WeDo"
            text="helps them get where they want to go."
            className="lg:flex-1"
          />
        </div>
        <p className="text-muted-foreground mt-4 text-xs">
          Text size/weight/color and the row&apos;s layout are pixel-verified against the
          &quot;Pointer Call-out&quot; child node; the decorative arrow&apos;s exact pixel offset in
          Figma is specific to this frame&apos;s fixed width and isn&apos;t reproduced literally — see
          COMPONENTS.md&apos;s Implementation rules for this component. The wrapper here matches the
          real dashboard call site (equal-width <code>lg:flex-1</code> columns) rather than a
          generic spaced-apart row, so at <code>lg</code> and above both captions visibly pack
          toward the shared inner seam instead of the outer edges.
        </p>
      </ComponentShowcase>

      <ComponentShowcase
        name="ParticipationVerticalBarCard"
        status="Draft"
        purpose="Presents a single categorical distribution as a labeled vertical bar chart inside a bordered sub-panel — one of three peer widgets inside the Bedford Campus Participation Profile card."
        docsAnchor="participationverticalbarcard"
        figmaReference='AMFM Portal — node 4255:30880, "Bedford Campus Participation Profile" card, first column ("Age Groups"); pixel-verified via Figma MCP get_metadata'
        tokens={[
          "border",
          "border-border-secondary",
          "chart-participation-fill-from",
          "chart-participation-fill-to",
          "chart-participation-value",
          "text-foreground",
        ]}
        states={["Default", "Empty"]}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <ParticipationVerticalBarCard
            title="Age Groups"
            icon={
              <Image
                src="/age-group-icon.svg"
                alt=""
                aria-hidden="true"
                width={23}
                height={17}
                unoptimized
              />
            }
            data={AGE_GROUPS_DATA}
          />
          <ParticipationVerticalBarCard
            title="Age Groups"
            icon={
              <Image
                src="/age-group-icon.svg"
                alt=""
                aria-hidden="true"
                width={23}
                height={17}
                unoptimized
              />
            }
            data={[]}
          />
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        name="StatusSnapshotCard"
        status="Draft"
        purpose="Horizontal bar list for a single categorical distribution — each bar spans the row's full height with a rounded trailing edge, replacing the removed ParticipationHorizontalBarCard for the Relationship Status and Kids dashboard tiles."
        docsAnchor="statussnapshotcard"
        figmaReference='AMFM Portal — node 4255:30880, "Bedford Campus Participation Profile" card, Relationship Status and Kids columns; pixel-verified via Figma MCP get_metadata (row height, bar geometry, and gradient stops)'
        tokens={[
          "border",
          "border-border-secondary",
          "chart-status-relationship-from",
          "chart-status-kids-from",
          "background",
          "text-text-secondary",
        ]}
        states={["relationship", "kids"]}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <StatusSnapshotCard
            variant="relationship"
            title="Relationship Status"
            data={RELATIONSHIP_STATUS_DATA}
          />
          <StatusSnapshotCard variant="kids" title="Kids" data={KIDS_DATA} />
        </div>
        <p className="text-muted-foreground mt-4 text-xs">
          Pixel-verified against Figma node 4255:30880 via MCP get_metadata: row height,
          bar geometry (rounded trailing edge only), gradient direction/stops, and the
          bar-width scaling curve all trace to real child-node measurements.
        </p>
      </ComponentShowcase>

      <ComponentShowcase
        name="HorizontalTabs"
        status="Draft"
        purpose="Pill-shaped segmented control that switches a card's displayed audience — confirmed used 4 times on the dashboard, always inside a Card's CardHeader/CardAction slot."
        docsAnchor="horizontaltabs"
        figmaReference='AMFM Portal — node 4255:30872, 4 confirmed instances ("Relationship Health", "Spiritual Snapshot", "Top 3 Caution Flags" (4255:30892), "Top 3 Expressed Needs" (4255:30894) card headers) — all 4 now confirmed matching: tabs sit directly beside the title (gap-16, no space-between), not pushed to the header’s far edge; "Top 3 Caution Flags"/"Top 3 Expressed Needs" previously had a stray sm:justify-between bug, fixed to match'
        tokens={[
          "border-border-secondary",
          "bg-muted",
          "text-foreground",
          "text-muted-foreground",
          "shadow-xs",
        ]}
        states={["Selected", "Unselected"]}
      >
        <HorizontalTabsDemo />
      </ComponentShowcase>

      <ComponentShowcase
        name="CommitmentConnectionChart"
        status="Draft"
        purpose="Static, Figma-verified Commitment × Connection scattergram for the Relationship Health dashboard card; exposes a semantic response-count summary while preserving the hand-labelled Figma graphic."
        docsAnchor="commitmentconnectionchart"
        figmaReference='AMFM Portal — parent frame node 4255:30872, "Relationship Health for Bedford Campus" card; raster asset child source node 4255:30881'
        tokens={[
          "w-full",
          "text-foreground",
          "text-text-tertiary",
          "bg-background",
        ]}
        states={["Static Figma asset", "Accessible response summary"]}
      >
        <div className="mx-auto max-w-2xl">
          <CommitmentConnectionChart
            responseCount={RELATIONSHIP_HEALTH_RESPONSE_COUNT}
            highlightedZone={RELATIONSHIP_HEALTH_SUMMARY.highlightedZone}
            zoneLabels={RELATIONSHIP_HEALTH_ZONE_LABELS}
          />
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        name="DashboardFilterMenu"
        status="Draft"
        purpose="Demographic filter row (Gender, Relationship Status, Years in Relationship, Kids, Age) that narrows CommitmentConnectionChart and FullWidthBarChart — each group is an independent single-select pill radiogroup."
        docsAnchor="dashboardfiltermenu"
        figmaReference={`AMFM Portal — node 4255:30872, below the "Relationship Health for Bedford Campus" card's chart, above FullWidthBarChart`}
        tokens={["border-border-secondary", "bg-foreground", "text-background", "text-text-tertiary", "bg-accent"]}
        states={["Inactive pill", "Active/selected pill"]}
      >
        <DashboardFilterMenuDemo groups={DASHBOARD_FILTER_GROUPS} />
      </ComponentShowcase>

      <ComponentShowcase
        name="SnapshotVideoCard"
        status="Draft"
        purpose="Short contextual video preview explaining the currently-highlighted relationship-health zone, alongside a 'Next Ministry Steps' call to action."
        docsAnchor="snapshotvideocard"
        figmaReference='AMFM Portal — node 4255:30872, "Relationship Health for Bedford Campus" card, right column (paired with CommitmentConnectionChart)'
        tokens={[
          "from-nav-surface-from",
          "to-nav-surface-to",
          "border",
          "text-foreground",
          "text-primary",
          "text-text-tertiary",
        ]}
        states={["With zone context", "Without zone context"]}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <SnapshotVideoCard
            title="Quick Snapshot"
            description={RELATIONSHIP_HEALTH_SUMMARY.description}
            zoneTitle={RELATIONSHIP_HEALTH_SUMMARY.highlightedZone}
            zoneHeadlineStat={RELATIONSHIP_HEALTH_SUMMARY.headlineStat}
            zoneHeadlineDescription={RELATIONSHIP_HEALTH_SUMMARY.headlineDescription}
          />
          <SnapshotVideoCard
            title="Quick Snapshot"
            description={RELATIONSHIP_HEALTH_SUMMARY.description}
          />
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        name="FullWidthBarChart"
        status="Draft"
        purpose="Ranked, full-bleed horizontal bar chart companion to CommitmentConnectionChart, breaking the relationship-health zones into a percentage-labeled bar list with a top axis and dashed reference gridlines."
        docsAnchor="fullwidthbarchart"
        figmaReference='AMFM Portal — Figma "BarLineChart" master component, node 1243:23077, confirmed via a direct node pull (top axis, dashed gridlines, per-bar label position, bar-fill gradient); instanced in the "Relationship Health for Bedford Campus" card (node 4255:30881), below DashboardFilterMenu'
        tokens={["from-primary", "chart-bar-fill-to", "text-text-secondary", "text-foreground", "text-chart-label", "tracking-label", "text-muted-foreground", "border-border-secondary"]}
        states={["Default", "Empty"]}
      >
        <div className="flex flex-col gap-8">
          <FullWidthBarChart data={FULL_WIDTH_BAR_CHART_DATA} />
          <div>
            <p className="text-muted-foreground mb-2 text-xs font-medium">Empty state</p>
            <FullWidthBarChart data={[]} />
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        name="PieChartCard"
        status="Draft"
        purpose="Multi-segment donut chart tile with a headline center stat and a text legend — confirmed reused twice in the Spiritual Snapshot card with different data and color families. Owns its own bordered/padded card shell, matching Figma's per-tile 'Pie chart' cell."
        docsAnchor="piechartcard"
        figmaReference='AMFM Portal — node 4255:30872, "Spiritual Snapshot for Bedford Campus" card (2 confirmed instances: faith journey, connection to God); card-wrapper and per-tile shell confirmed at node 4255:30885 (header/tabs) and 4255:30890/30891 (pie chart tiles)'
        tokens={[
          "chart-pie-purple-700",
          "chart-pie-purple-500",
          "chart-pie-purple-300",
          "chart-pie-purple-100",
          "chart-pie-green-700",
          "status-success",
          "chart-pie-green-300",
          "chart-pie-green-100",
          "border-border-secondary",
          "border",
        ]}
        states={["Purple palette", "Green palette"]}
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <PieChartCard
            title={FAITH_JOURNEY_PIE.title}
            centerStat={FAITH_JOURNEY_PIE.centerStat}
            segments={FAITH_JOURNEY_PIE.segments}
          />
          <PieChartCard
            title={GOD_CONNECTION_PIE.title}
            centerStat={GOD_CONNECTION_PIE.centerStat}
            segments={GOD_CONNECTION_PIE.segments}
          />
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        name="ScaleChartCard"
        status="Draft"
        purpose="Presents a single metric as a headline percentage plus a horizontal 0–100% scale plotting the church's value against a National Average marker — confirmed reused 6 times across two cards."
        docsAnchor="scalechartcard"
        figmaReference='AMFM Portal — node 4255:30872, "Top 3 Caution Flags for Bedford Campus" (4255:30892) and "Top 3 Expressed Needs for Bedford Campus" (4255:30894) cards (Figma layer "Scale chart/Default") — National Average label now floats above the track (was mistakenly in the bottom caption row); "Why does this matter?" now uses PlayCircle in text-text-tertiary (was a bare Play triangle in the brand link color)'
        tokens={[
          "chart-scale-blue-700",
          "chart-scale-blue-400",
          "chart-scale-blue-100",
          "chart-scale-blue-50",
          "chart-scale-blue-25",
          "border",
          "text-foreground",
          "text-muted-foreground",
          "text-chart-label",
          "tracking-label",
          "text-text-tertiary",
        ]}
        states={["Default"]}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CAUTION_FLAGS_DATA.map((flag) => (
            <ScaleChartCard key={flag.question} {...flag} />
          ))}
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        name="GlobalNav"
        status="Draft"
        purpose="The app's primary left-hand navigation rail — collapses to an 80px icon rail by default and expands to a 296px labeled panel on hover, with a smooth animated morph between the two. In real app-shell pages the expanded panel overlays content instead of pushing it, and stays pinned open above 1600px viewports."
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
        states={[
          "Collapsed (default)",
          "Expanded (hover/focus)",
          "Pinned open (≥1600px)",
          "Active item",
          "Hover",
          "Focus",
          "Account menu open",
        ]}
      >
        <div className="bg-nav-bg flex h-global-nav-demo items-start rounded-xl p-6">
          <GlobalNav activeHref="/marriage-champions" />
        </div>
        <p className="text-muted-foreground mt-4 text-xs">
          Hover the rail (or Tab into it) to expand it — move the pointer away, or press{" "}
          <kbd className="bg-muted rounded px-1 py-0.5">Escape</kbd>, to collapse it again. Click
          the avatar/name at the bottom to open the account menu (Personal Profile, Church
          Profile, Account Settings, Subscription &amp; Billing, Terms &amp; Privacy) — the rail
          stays expanded while that menu is open. See{" "}
          <code className="bg-muted rounded px-1 py-0.5">COMPONENTS.md#globalnav</code> for the
          full contract, including why its destination routes are placeholders. This gallery
          instance intentionally renders without the <code className="bg-muted rounded px-1 py-0.5">overlay</code>{" "}
          prop (so it stays inside this bounded demo box) — visit{" "}
          <Link href="/marriage-champions" className="text-text-brand hover:underline">
            /marriage-champions
          </Link>{" "}
          or{" "}
          <Link href="/heartchart-resources" className="text-text-brand hover:underline">
            /heartchart-resources
          </Link>{" "}
          to see the rail overlay page content on hover and stay pinned open at ≥1600px viewport
          widths.
        </p>
      </ComponentShowcase>

      <ComponentShowcase
        name="VideoPlayer"
        status="Draft"
        purpose="Plays an embedded video with a branded poster/paused state and a persistent scrubber control bar — introduced for the /welcome first-run screen's introduction video, now also used on /marriage-champions-empty's recruiting overlay."
        docsAnchor="videoplayer"
        figmaReference='AMFM Portal — node 1894:16438 ("Video player 16:9"), within Onboarding/First run church admin (node 1909:25772)'
        tokens={[
          "bg-overlay/30",
          "backdrop-blur-sm",
          "backdrop-blur-xs",
          "shadow-media-card",
          "rounded-2xl",
          "border-black/10",
        ]}
        states={["Paused (poster)", "Playing", "Muted", "Seeking", "Fullscreen"]}
      >
        <VideoPlayer poster="/login-background.jpg" title="Sample video player" className="max-w-md" />
        <p className="text-muted-foreground mt-4 text-xs">
          Real <code className="bg-muted rounded px-1 py-0.5">&lt;video&gt;</code> element with
          source-backed play/pause/seek/mute/fullscreen controls. No real video file or captions
          track has been supplied yet, so this gallery preview is poster-only and exposes no active
          media controls (see{" "}
          <code className="bg-muted rounded px-1 py-0.5">COMPONENTS.md#videoplayer</code> for the
          full list of open items). View live at{" "}
          <Link href="/welcome" className="text-text-brand hover:underline">
            /welcome
          </Link>
          .
        </p>
      </ComponentShowcase>

      <ComponentShowcase
        name="StatusTag"
        status="Draft"
        purpose='Small pill indicating a discrete, color-coded state (e.g. "Yes"/"No"/"Invited") — introduced for the Champion Training, Completed MMP, and Status columns on /marriage-champions.'
        docsAnchor="statustag"
        figmaReference='AMFM Portal — "Our Marriage Champions / Populated" (node 3724:23444), Table cell instances'
        tokens={[
          "bg-badge-success-bg",
          "border-badge-success-border",
          "text-badge-success-text",
          "bg-badge-error-bg",
          "border-badge-error-border",
          "text-badge-error-text",
          "bg-badge-warning-bg",
          "border-badge-warning-border",
          "text-badge-warning-text",
        ]}
        states={["success", "error", "warning"]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <StatusTag variant="success">Yes</StatusTag>
          <StatusTag variant="error">No</StatusTag>
          <StatusTag variant="warning">Invited</StatusTag>
        </div>
        <p className="text-muted-foreground mt-4 text-xs">
          The Figma reference shows the Status column&apos;s default (&quot;Active&quot;) state
          as plain text, not a pill — a 4th variant was not invented for it, see{" "}
          <code className="bg-muted rounded px-1 py-0.5">COMPONENTS.md#statustag</code>. Root-only
          tokens for now — no dark-mode Figma reference exists yet. View live at{" "}
          <Link href="/marriage-champions" className="text-text-brand hover:underline">
            /marriage-champions
          </Link>
          .
        </p>
      </ComponentShowcase>

      <ComponentShowcase
        name="Table"
        status="Draft"
        purpose="Tabular, multi-column record data with mixed cell content (text, an embedded Select, a StatusTag, a row action) — introduced for the team member roster on /marriage-champions."
        docsAnchor="table"
        figmaReference='AMFM Portal — "Our Marriage Champions / Populated" (node 3724:23444), Table frame'
        tokens={["border-border-secondary", "text-text-secondary", "text-foreground", "text-muted-foreground"]}
        states={["Default"]}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Campus</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold">Olivia Rhye</TableCell>
              <TableCell className="text-muted-foreground">North Campus</TableCell>
              <TableCell>
                <span className="text-muted-foreground">Active</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Natali Craig</TableCell>
              <TableCell className="text-muted-foreground">West Campus</TableCell>
              <TableCell>
                <StatusTag variant="warning">Invited</StatusTag>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p className="text-muted-foreground mt-4 text-xs">
          Row hover/focus, empty state, and mobile/tablet responsive behavior are not evidenced in
          the Figma reference — falls back to horizontal scroll on narrow viewports rather than a
          guessed collapse pattern, see{" "}
          <code className="bg-muted rounded px-1 py-0.5">COMPONENTS.md#table</code>. View the full
          roster (with Select and StatusTag cells) live at{" "}
          <Link href="/marriage-champions" className="text-text-brand hover:underline">
            /marriage-champions
          </Link>
          .
        </p>
      </ComponentShowcase>

      <ComponentShowcase
        name="BlurOverlay"
        status="Draft"
        purpose="Renders real content as an inert, faded backdrop behind a centered empty-state call-to-action — used on /marriage-champions-empty to preview the Team Members table, and on /dashboard-empty to preview the live DashboardContent composition, without making either interactive."
        docsAnchor="bluroverlay"
        figmaReference='AMFM Portal — "Our Marriage Champions / Empty" (node 3724:23167), "image 54" backdrop layer (node 3724:23178); also "Data Dashboard Empty State" (node 3899:27502)'
        tokens={["blur-inert-preview", "bg-radial", "from-background", "via-background", "to-background/0"]}
        states={["Default (only state — static, non-interactive)"]}
      >
        <div className="overflow-hidden rounded-lg border">
          <BlurOverlay>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Name</TableHeaderCell>
                  <TableHeaderCell>Campus</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold">Olivia Rhye</TableCell>
                  <TableCell className="text-muted-foreground">North Campus</TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">Active</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </BlurOverlay>
        </div>
        <p className="text-muted-foreground mt-4 text-xs">
          Always <code className="bg-muted rounded px-1 py-0.5">aria-hidden</code> — see the full
          empty-state composition (blurred table + VideoPlayer + heading + primary Button) live at{" "}
          <Link href="/marriage-champions-empty" className="text-text-brand hover:underline">
            /marriage-champions-empty
          </Link>
          , and the blurred-dashboard variant (DashboardContent + heading + primary Button + FooterCta)
          live at{" "}
          <Link href="/dashboard-empty" className="text-text-brand hover:underline">
            /dashboard-empty
          </Link>
          .
        </p>
      </ComponentShowcase>
    </div>
  );
}
