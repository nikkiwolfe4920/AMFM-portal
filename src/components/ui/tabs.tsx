"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

interface HorizontalTabsProps {
  tabs: { label: string; value: string }[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

function HorizontalTabs({
  tabs,
  value,
  onValueChange,
  className,
}: HorizontalTabsProps) {
  return (
    <TabsPrimitive.Root
      data-slot="horizontal-tabs"
      value={value}
      onValueChange={onValueChange}
      className={className}
    >
      <TabsPrimitive.List className="inline-flex items-center gap-1 rounded-full bg-muted p-1">
        {tabs.map((tab) => {
          const active = tab.value === value;
          return (
            <TabsPrimitive.Trigger
              key={tab.value}
              value={tab.value}
              className={cn(
                "focus-visible:ring-ring/50 rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap outline-none transition-colors focus-visible:ring-[3px]",
                active
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </TabsPrimitive.Trigger>
          );
        })}
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  );
}

export { HorizontalTabs };
