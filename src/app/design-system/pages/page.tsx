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
            <p className="text-muted-foreground text-sm">
              <span className="font-medium">Figma:</span> {page.figma}
            </p>
            <p className="text-muted-foreground text-sm">
              <span className="font-medium">Built from:</span> {page.builtFrom}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
