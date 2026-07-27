"use client";

import * as React from "react";

import { HorizontalTabs } from "@/components/ui/tabs";
import { DashboardFilterMenu } from "@/components/dashboard-filter-menu";

/**
 * Small client-boundary wrappers for gallery demos that need local
 * interactive state — kept out of the (server) design-system components
 * page since a Server Component can't pass event-handler props directly to
 * a Client Component. Pushes the client boundary down to just these demos
 * rather than marking the whole gallery page a Client Component.
 */

const TWO_TAB_OPTIONS = [
  { label: "Couples", value: "couples" },
  { label: "Singles", value: "singles" },
];

const THREE_TAB_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Couples", value: "couples" },
  { label: "Singles", value: "singles" },
];

function HorizontalTabsDemo() {
  const [twoTabValue, setTwoTabValue] = React.useState("couples");
  const [threeTabValue, setThreeTabValue] = React.useState("singles");

  return (
    <div className="flex flex-col gap-4">
      <HorizontalTabs
        tabs={TWO_TAB_OPTIONS}
        value={twoTabValue}
        onValueChange={setTwoTabValue}
      />
      <HorizontalTabs
        tabs={THREE_TAB_OPTIONS}
        value={threeTabValue}
        onValueChange={setThreeTabValue}
      />
    </div>
  );
}

interface DashboardFilterMenuDemoProps {
  groups: { label: string; options: { label: string; value: string }[] }[];
}

function DashboardFilterMenuDemo({ groups }: DashboardFilterMenuDemoProps) {
  const [values, setValues] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(groups.map((group) => [group.label, "all"]))
  );

  const filterGroups = groups.map((group) => ({
    ...group,
    value: values[group.label],
  }));

  function handleChange(group: string, value: string) {
    setValues((previous) => ({ ...previous, [group]: value }));
  }

  return (
    <DashboardFilterMenu
      groups={filterGroups}
      onChange={handleChange}
      resultCount={1309}
      totalCount={1309}
    />
  );
}

export { HorizontalTabsDemo, DashboardFilterMenuDemo };
