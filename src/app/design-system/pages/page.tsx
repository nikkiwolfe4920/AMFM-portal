import Link from "next/link";

const PAGES = [
  {
    href: "/",
    title: "Home",
    figma: "— (product copy, no dedicated Figma screen)",
    builtFrom: "PhotoBackdrop, Button, DposystemLearnMore pattern",
  },
  {
    href: "/login",
    title: "Login",
    figma: 'AMFM Portal — Onboarding/login node 1909:25767',
    builtFrom:
      "Auth card pattern (PhotoBackdrop + AuthCard + HeartChartLogo + GoogleIcon + Button/Input/Label/Checkbox)",
  },
  {
    href: "/signup",
    title: "Sign up",
    figma: 'AMFM Portal — Onboarding/sign up node 1909:25768',
    builtFrom:
      "Auth card — sign up pattern (PhotoBackdrop + AuthCard + HeartChartLogo + GoogleIcon + Button/Input/Label). Password requirement checklist from Figma not implemented — see PasswordRequirementItem in COMPONENTS.md (Draft, missing \"met\" state reference).",
  },
  {
    href: "/create-profile",
    title: "Create profile",
    figma: 'AMFM Portal — Onboarding/Create Profile node 1909:25769',
    builtFrom:
      "PhotoBackdrop + Card (CardHeader/CardAction/CardContent/CardFooter) + HeartChartLogo + Button/Input/Label. Partial implementation — only the Church/Organization name, Location, and Average Weekly Attendance fields are built (plain Input, all Production Ready). The Website field (needs InputGroup), Your role / Your primary goal fields (need Select), the required-field asterisk marker (needs a Label variant), and the entire \"Free Membership\" pricing card (needs BenefitListItem, AmfmLogo, and PricingCard) are not implemented — all are Draft in COMPONENTS.md pending open design questions (a missing display-type-scale foundation, a blocked logo asset, and unconfirmed icon/UX decisions). See COMPONENTS.md for the full list.",
  },
  {
    href: "/welcome",
    title: "Welcome (first-run church admin)",
    figma: "AMFM Portal — Onboarding/First run church admin node 1909:25772",
    builtFrom:
      "PhotoBackdrop (new \"radial\" scrim variant) + a personalized heading (new text-display-lg/text-display-2xl tokens + highlight-gold color) + VideoPlayer (new, Draft) + Button. The background photo reuses public/login-background.jpg rather than a distinct export, and VideoPlayer has no real video source or captions file yet — both flagged in COMPONENTS.md/DESIGN.md's Known gaps. Side navigation is hidden per the Figma frame's own dev annotation.",
  },
  {
    href: "/heartchart-resources",
    title: "HeartChart Resources",
    figma: 'AMFM Portal — "HeartChart Resources" component (node 2361:19280, rendered on-canvas as node 3722:19475)',
    builtFrom:
      "GlobalNav + a page <h1> (font-display text-display-md) + TopHero (new, Draft) + a 3-step CourseCard pattern (new, Draft) inside an ElevatedCard (new, Production Ready) + two more ElevatedCard resource cards (Card's CardHeader/CardTitle/CardDescription/CardAction/CardContent, composed directly on ElevatedCard rather than the flat Card primitive) with ResourceListItem rows (updated to a real download-button treatment, Production Ready) + FooterCta (new, Draft), on the new background-gradient-from/background-gradient-to page-shell tokens. All real copy/icons/token values were pulled from the actual Figma node tree via the Figma MCP. TopHero's/CourseCard's photo assets and FooterCta's background texture remain blocked by this environment's egress policy (www.figma.com denied) and render gradient/flat-color placeholders instead — see COMPONENTS.md for each component's Implementation rules. Resource link destinations remain placeholder routes (\"#\"), the same category of gap already documented for GlobalNav's other nav links.",
  },
  {
    href: "/marriage-champions",
    title: "Our Marriage Champions",
    figma: 'AMFM Portal — "Our Marriage Champions / Populated" (node 3724:23444)',
    builtFrom:
      "GlobalNav (first real routed consumer — this is the page its own \"Our Marriage Champions\" nav item points to) + a page <h1> (font-display text-display-md) + ElevatedCard housing a Card header (CardTitle/CardDescription + a CardAction row composing Button variant=\"ghost\" with a leading icon and InputGroup with a leading Search icon addon, per the multi-action composition documented on Card) + Table (new, Draft) with per-row Select (Profile type) and StatusTag (new, Draft) instances for the Yes/No/Invited pills. Row delete affordance reuses Button size=\"icon\" variant=\"ghost\". The header's info icon (next to \"Completed MMP\") renders decoratively only — no Tooltip component exists in COMPONENTS.md yet, and one wasn't invented for this pass; see COMPONENTS.md#table Implementation rules. Row/cell data is representative sample data, not wired to a real backend.",
  },
];

export default function PagesIndexPage() {
  return (
    <div className="flex flex-col gap-6 py-8">
      <p className="text-muted-foreground max-w-2xl text-sm">
        Full screens implemented from Figma. A page isn&apos;t re-rendered
        inside this shell — that would duplicate routing/layout concerns —
        follow the link to view it live.
      </p>
      <div className="flex flex-col divide-y rounded-lg border">
        {PAGES.map((page) => (
          <div key={page.href} className="flex flex-col gap-2 p-5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold">{page.title}</h3>
              <Link
                href={page.href}
                className="text-text-brand text-sm font-medium hover:underline"
              >
                View live →
              </Link>
            </div>
            <p className="text-muted-foreground max-w-3xl text-sm">
              <span className="font-medium">Figma:</span> {page.figma}
            </p>
            <p className="text-muted-foreground max-w-3xl text-sm">
              <span className="font-medium">Built from:</span> {page.builtFrom}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
