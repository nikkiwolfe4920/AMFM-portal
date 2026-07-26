"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const SECTIONS = [
  { href: "/design-system", label: "Overview" },
  { href: "/design-system/foundations", label: "Foundations" },
  { href: "/design-system/components", label: "Components" },
  { href: "/design-system/patterns", label: "Patterns" },
  { href: "/design-system/pages", label: "Pages" },
];

export function DesignSystemNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Design system sections"
      className="flex flex-wrap gap-2 border-b py-4"
    >
      {SECTIONS.map((section) => {
        const isActive =
          pathname === section.href ||
          (section.href !== "/design-system" &&
            pathname.startsWith(`${section.href}/`));

        return (
          <Link
            key={section.href}
            href={section.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-md border border-transparent px-3 py-1.5 text-sm font-medium text-muted-foreground outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring/50 focus-visible:ring-3",
              isActive &&
                "border-border-secondary bg-accent text-accent-foreground shadow-xs"
            )}
          >
            {section.label}
          </Link>
        );
      })}
    </nav>
  );
}
