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
 * group is a single-select radiogroup, not a tablist — deliberately
 * distinct from HorizontalTabs even though both render as pill segmented
 * controls; see that entry's Implementation rules for why the two must not
 * share an interactive primitive.
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
      className={cn("flex flex-col gap-4", className)}
    >
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-semibold text-foreground">
          {resultCount.toLocaleString()}
        </span>{" "}
        of {totalCount.toLocaleString()} people
      </p>

      <div className="flex flex-wrap gap-x-8 gap-y-4">
        {groups.map((group) => {
          const labelId = `dashboard-filter-${slugify(group.label)}-label`;
          return (
            <div key={group.label} className="flex flex-col gap-2">
              <span
                id={labelId}
                className="text-xs font-semibold tracking-[0.24px] text-text-tertiary uppercase"
              >
                {group.label}
              </span>
              <RadioGroupPrimitive.Root
                value={group.value}
                onValueChange={(value) => onChange(group.label, value)}
                aria-labelledby={labelId}
                className="flex flex-wrap items-center gap-1 rounded-full bg-muted p-1"
              >
                {group.options.map((option) => {
                  const active = option.value === group.value;
                  return (
                    <RadioGroupPrimitive.Item
                      key={option.value}
                      value={option.value}
                      className={cn(
                        "focus-visible:ring-ring/50 rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap outline-none transition-colors focus-visible:ring-[3px]",
                        active
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
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
