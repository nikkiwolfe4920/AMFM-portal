"use client";

import { useRef } from "react";
import type { ComponentProps, ElementType, ReactElement, ReactNode } from "react";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SettingsNavItem {
  id: string;
  label: string;
  href: string;
  icon: ElementType<{ className?: string; "aria-hidden"?: boolean }>;
}

interface SettingsModalShellProps
  extends Omit<ComponentProps<typeof Dialog>, "children"> {
  title: string;
  description: string;
  trigger: ReactElement;
  navItems: SettingsNavItem[];
  activeNavItemId: string;
  children: ReactNode;
  className?: string;
}

function SettingsModalShell({
  title,
  description,
  trigger,
  navItems,
  activeNavItemId,
  children,
  className,
  ...dialogProps
}: SettingsModalShellProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  function renderNavLinks(layout: "desktop" | "mobile") {
    return navItems.map((item) => {
      const Icon = item.icon;
      const active = item.id === activeNavItemId;

      return (
        <a
          key={item.id}
          href={item.href}
          aria-current={active ? "page" : undefined}
          className={cn(
            "flex items-center gap-2 rounded-sm text-sm font-medium transition-colors",
            layout === "desktop"
              ? "min-h-11 px-3 py-2"
              : "min-h-9 shrink-0 px-3 py-1.5",
            active
              ? "bg-muted text-foreground"
              : "text-text-secondary hover:bg-muted/60 hover:text-foreground"
          )}
        >
          <Icon
            aria-hidden
            className={cn("shrink-0", layout === "desktop" ? "size-6" : "size-5", active ? "opacity-70" : undefined)}
          />
          <span>{item.label}</span>
        </a>
      );
    });
  }

  return (
    <Dialog {...dialogProps}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        overlayClassName="bg-overlay/85 backdrop-blur-sm"
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          titleRef.current?.focus();
        }}
        className={cn(
          "h-192 max-h-modal-shell sm:max-w-modal-settings rounded-xl border border-border-secondary bg-background p-0 shadow-card",
          className
        )}
      >
        <div
          data-slot="settings-modal-shell"
          className="grid h-full min-h-0 grid-cols-1 overflow-hidden bg-background md:grid-cols-settings-modal"
        >
          <aside
            data-slot="settings-modal-nav"
            className="border-border-secondary hidden h-full flex-col gap-3 border-r bg-secondary p-6 md:flex"
          >
            <p className="px-2 text-xs font-semibold tracking-label text-fg-quaternary">
              SETTINGS
            </p>
            <nav aria-label="Settings" className="flex flex-col gap-1">
              {renderNavLinks("desktop")}
            </nav>
          </aside>
          <div
            data-slot="settings-modal-main"
            className="flex h-full min-h-0 flex-col bg-background pb-12"
          >
            <nav
              aria-label="Settings sections"
              data-slot="settings-modal-mobile-nav"
              className="flex flex-wrap gap-2 border-b border-border-secondary bg-secondary py-3 pl-4 pr-14 md:hidden"
            >
              {renderNavLinks("mobile")}
            </nav>
            <DialogHeader className="gap-0 px-6 pt-12 pb-8 pr-16 sm:px-16">
              <DialogTitle
                ref={titleRef}
                tabIndex={-1}
                className="font-display text-display-md leading-display-md font-light outline-none"
              >
                {title}
              </DialogTitle>
              <DialogDescription className="text-sm text-text-tertiary">
                {description}
              </DialogDescription>
            </DialogHeader>
            <div
              data-slot="settings-modal-body"
              className="min-h-0 flex-1 overflow-y-auto px-6 sm:px-16"
            >
              {children}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { SettingsModalShell };
export type { SettingsModalShellProps, SettingsNavItem };
