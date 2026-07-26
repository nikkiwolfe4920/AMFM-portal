import { Edit3, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SettingsCampus {
  id: string;
  name: string;
}

interface SettingsCampusListProps {
  campuses: SettingsCampus[];
  onEditCampus?: (campus: SettingsCampus) => void;
  onRemoveCampus?: (campus: SettingsCampus) => void;
  className?: string;
}

function SettingsCampusList({
  campuses,
  onEditCampus,
  onRemoveCampus,
  className,
}: SettingsCampusListProps) {
  return (
    <div
      data-slot="settings-campus-list"
      className={cn("overflow-hidden rounded-2xl bg-secondary px-4", className)}
    >
      <ul className="divide-y divide-border-secondary">
        {campuses.map((campus) => (
          <li
            key={campus.id}
            className="grid min-h-16 grid-cols-settings-campus-row items-center gap-3 px-5 py-4"
          >
            <span className="truncate text-sm font-medium text-foreground">
              {campus.name}
            </span>
            <div className="flex items-center gap-0.5">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Remove ${campus.name}`}
                onClick={() => onRemoveCampus?.(campus)}
                disabled={!onRemoveCampus}
                className="size-7 text-fg-quaternary"
              >
                <Trash2 aria-hidden className="size-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Edit ${campus.name}`}
                onClick={() => onEditCampus?.(campus)}
                disabled={!onEditCampus}
                className="size-7 text-fg-quaternary"
              >
                <Edit3 aria-hidden className="size-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { SettingsCampusList };
export type { SettingsCampus, SettingsCampusListProps };
