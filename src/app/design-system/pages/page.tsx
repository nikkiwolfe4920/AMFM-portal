import Link from "next/link";

const PAGES = [
  {
    href: "/",
    title: "Home",
    figma: "Product copy page; no dedicated Figma screen tracked yet.",
    composition: "PhotoBackdrop + Button + DposystemLearnMore dialog trigger.",
    status:
      "Live route. The learn-more modal pattern is tracked under Patterns, while the homepage itself remains a product page reference.",
  },
  {
    href: "/login",
    title: "Login",
    figma: "AMFM Portal — Onboarding/login node 1909:25767.",
    composition:
      "PhotoBackdrop + AuthCard + HeartChartLogo + GoogleIcon + Button/Input/Label/Checkbox.",
    status: "Live route. Auth composition is tracked as the Auth card pattern.",
  },
  {
    href: "/signup",
    title: "Sign up",
    figma: "AMFM Portal — Onboarding/sign up node 1909:25768.",
    composition:
      "PhotoBackdrop + AuthCard + HeartChartLogo + GoogleIcon + Button/Input/Label + PasswordRequirementItem.",
    status:
      "Live route. Sign-up default and success states are tracked as Auth card patterns.",
  },
  {
    href: "/create-profile",
    title: "Create profile",
    figma: "AMFM Portal — Onboarding/Create Profile node 1909:25769.",
    composition:
      "PhotoBackdrop + Card + HeartChartLogo + Button/Input/InputGroup/Select/Label + PricingCard.",
    status:
      "Live route. Full form-card composition is tracked as the Create profile card pattern.",
  },
  {
    href: "/welcome",
    title: "Welcome",
    figma: "AMFM Portal — Onboarding/First run church admin node 1909:25772.",
    composition:
      "PhotoBackdrop radial scrim + display heading + VideoPlayer + Button.",
    status:
      "Live route. Welcome hero is tracked as a reduced-height pattern; video source/captions remain product-owned.",
  },
  {
    href: "/heartchart-resources",
    title: "HeartChart Resources",
    figma:
      'AMFM Portal — "HeartChart Resources" component node 2361:19280, rendered as node 3722:19475.',
    composition:
      "GlobalNav + page heading + TopHero + CourseCard row + ElevatedCard resource lists + FooterCta.",
    status:
      "Live route. Full page composition is tracked as a Patterns entry; resource destinations remain placeholders.",
  },
  {
    href: "/dashboard",
    title: "Our Data Dashboard",
    figma: 'AMFM Portal — "HeartChart Dashboard / premium" node 4255:30872.',
    composition:
      "GlobalNav + HeartChartSummary + WeDoCard + chart cards + DashboardFilterMenu + HorizontalTabs.",
    status:
      "Live route with representative data only. Dashboard chart cleanup from PR #60 is the current baseline; detailed component contracts live in COMPONENTS.md.",
  },
  {
    href: "/marriage-champions",
    title: "Our Marriage Champions",
    figma:
      'AMFM Portal — "Our Marriage Champions / Populated" node 3724:23444.',
    composition:
      "MarriageChampionsPageShell + GlobalNav + ElevatedCard + Card header + Table + Select + StatusTag.",
    status:
      "Live route with representative team data. Table/status primitives are tracked under Components.",
  },
  {
    href: "/marriage-champions-empty",
    title: "Our Marriage Champions (Empty)",
    figma: 'AMFM Portal — "Our Marriage Champions / Empty" node 3724:23167.',
    composition:
      "MarriageChampionsPageShell + GlobalNav + ElevatedCard + BlurOverlay + VideoPlayer + Button.",
    status:
      "Live demonstration route for the empty state. Invite-user modal is now tracked in the July MVP modal family pattern.",
  },
];

export default function PagesIndexPage() {
  return (
    <div className="flex flex-col gap-6 py-8">
      <p className="text-muted-foreground max-w-2xl text-sm">
        Full routed screens implemented from Figma or product copy. Pages show
        where component and pattern contracts are consumed; modal overlays and
        other reusable compositions are tracked under Patterns rather than as
        standalone routes.
      </p>
      <div className="flex flex-col divide-y rounded-lg border">
        {PAGES.map((page) => (
          <div key={page.href} className="flex flex-col gap-3 p-5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold">{page.title}</h3>
              <Link
                href={page.href}
                className="text-text-brand text-sm font-medium hover:underline"
              >
                View live →
              </Link>
            </div>
            <dl className="flex flex-col gap-2 text-sm">
              <div className="grid gap-1 sm:grid-cols-4">
                <dt className="font-medium text-foreground">Figma</dt>
                <dd className="text-muted-foreground sm:col-span-3">
                  {page.figma}
                </dd>
              </div>
              <div className="grid gap-1 sm:grid-cols-4">
                <dt className="font-medium text-foreground">Composition</dt>
                <dd className="text-muted-foreground sm:col-span-3">
                  {page.composition}
                </dd>
              </div>
              <div className="grid gap-1 sm:grid-cols-4">
                <dt className="font-medium text-foreground">Status</dt>
                <dd className="text-muted-foreground sm:col-span-3">
                  {page.status}
                </dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
