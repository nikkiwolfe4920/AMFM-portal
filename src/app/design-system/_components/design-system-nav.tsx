import Link from "next/link";

const SECTIONS = [
  { href: "/design-system", label: "Overview" },
  { href: "/design-system/foundations", label: "Foundations" },
  { href: "/design-system/components", label: "Components" },
  { href: "/design-system/patterns", label: "Patterns" },
  { href: "/design-system/pages", label: "Pages" },
];

export function DesignSystemNav() {
  return (
    <nav
      aria-label="Design system sections"
      className="flex flex-wrap gap-2 border-b py-4"
    >
      {SECTIONS.map((section) => (
        <Link
          key={section.href}
          href={section.href}
          className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px]"
        >
          {section.label}
        </Link>
      ))}
    </nav>
  );
}
