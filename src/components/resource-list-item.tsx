import type { LucideIcon } from "lucide-react";
import { Download } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface ResourceListItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  /** Accessible name for the trailing download action, e.g. "Download {title}". */
  actionLabel: string;
}

/**
 * One downloadable resource row inside a resource card — see
 * COMPONENTS.md#resourcelistitem. Figma: AMFM Portal "HeartChart Resources"
 * component (node 2361:19280), "Table cell" instances.
 */
export function ResourceListItem({
  icon: Icon,
  title,
  description,
  href,
  actionLabel,
}: ResourceListItemProps) {
  return (
    <div className="flex w-full items-start gap-3">
      <Icon
        aria-hidden="true"
        data-slot="resource-list-item-icon"
        className="text-fg-quaternary size-8 shrink-0"
      />
      <div className="flex flex-1 flex-col gap-1">
        <p className="text-foreground text-base font-semibold">{title}</p>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <Button
        asChild
        variant="outline"
        size="iconLg"
        className="shrink-0"
      >
        <Link href={href} aria-label={actionLabel}>
          <Download aria-hidden="true" />
        </Link>
      </Button>
    </div>
  );
}
