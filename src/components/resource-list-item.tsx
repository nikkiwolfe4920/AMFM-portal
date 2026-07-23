import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface ResourceListItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  /** Accessible name for the trailing icon-only action, e.g. "Open {title}". */
  actionLabel: string;
}

/**
 * Icon-only trailing action is 48px (`size-12`), wider than Button's `icon`
 * size (`size-9`/36px) — no Figma reference confirms the action's exact
 * glyph, so ChevronRight is used as the default per COMPONENTS.md#resourcelistitem.
 */
export function ResourceListItem({
  icon: Icon,
  title,
  description,
  href,
  actionLabel,
}: ResourceListItemProps) {
  return (
    <div className="flex w-full items-center gap-2.5">
      <Icon aria-hidden="true" className="text-foreground size-8 shrink-0" />
      <div className="flex flex-1 flex-col gap-0.5">
        <p className="text-foreground text-sm font-medium">{title}</p>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <Button asChild variant="ghost" size="icon" className="size-12">
        <Link href={href} aria-label={actionLabel}>
          <ChevronRight aria-hidden="true" />
        </Link>
      </Button>
    </div>
  );
}
