"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "@/lib/utils";

interface FilterGroup {
  label: string;
  options: { label: string; value: string }[];
  value: string;
}

interface DashboardFilterMenuProps {
  groups: FilterGroup[];
  onChange: (group: string, value: string) => void;
  resultCount: number;
  totalCount: number;
  className?: string;
}

function slugify(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

/**
 * Demographic filter row (Gender, Relationship Status, Years in
 * Relationship, Kids, Age) — see COMPONENTS.md#dashboardfiltermenu. Each
 * group is a single-select radiogroup of independent pill chips, not one
 * shared pill container — deliberately distinct from HorizontalTabs even
 * though both render as pill-shaped controls; see that entry's
 * Implementation rules for why the two must not share an interactive
 * primitive.
 */
function DashboardFilterMenu({
  groups,
  onChange,
  resultCount,
  totalCount,
  className,
}: DashboardFilterMenuProps) {
  return (
    <div
      data-slot="dashboard-filter-menu"
      className={cn("flex flex-wrap items-start gap-6", className)}
    >
      <div className="flex shrink-0 flex-col gap-1">
        <span className="text-sm text-muted-foreground">Showing</span>
        <span className="text-3xl leading-none font-bold text-foreground">
          {resultCount.toLocaleString()}
        </span>
        <span className="text-sm text-muted-foreground">
          of {totalCount.toLocaleString()} people
        </span>
      </div>

      <div aria-hidden="true" className="hidden h-32 w-px shrink-0 bg-border-secondary sm:block" />

      <div className="flex flex-1 flex-wrap gap-x-16 gap-y-4">
        {groups.map((group) => {
          const labelId = `dashboard-filter-${slugify(group.label)}-label`;
          return (
            <div key={group.label} className="flex flex-col gap-3">
              <span id={labelId} className="text-sm font-semibold text-foreground">
                {group.label}
              </span>
              <RadioGroupPrimitive.Root
                value={group.value}
                onValueChange={(value) => onChange(group.label, value)}
                aria-labelledby={labelId}
                className="flex flex-wrap items-center gap-1"
              >
                {group.options.map((option) => {
                  const active = option.value === group.value;
                  return (
                    <RadioGroupPrimitive.Item
                      key={option.value}
                      value={option.value}
                      className={cn(
                        "focus-visible:ring-ring/50 h-7 rounded-full px-3 text-sm whitespace-nowrap outline-none transition-colors focus-visible:ring-[3px]",
                        active
                          ? "bg-foreground text-background"
                          : "border border-border-secondary bg-background text-text-tertiary hover:bg-accent"
                      )}
                    >
                      {option.label}
                    </RadioGroupPrimitive.Item>
                  );
                })}
              </RadioGroupPrimitive.Root>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { DashboardFilterMenu };
