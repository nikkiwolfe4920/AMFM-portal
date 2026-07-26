import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SettingsSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
  panelClassName?: string;
}

function SettingsSection({
  title,
  children,
  className,
  panelClassName,
}: SettingsSectionProps) {
  return (
    <section data-slot="settings-section" className={cn("flex flex-col gap-4", className)}>
      <h3 className="text-xs font-semibold tracking-label text-muted-foreground uppercase">
        {title}
      </h3>
      <div
        data-slot="settings-section-panel"
        className={cn("rounded-2xl bg-secondary p-8", panelClassName)}
      >
        {children}
      </div>
    </section>
  );
}

export { SettingsSection };
export type { SettingsSectionProps };
