"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState } from "react";
import {
  Atom,
  Blend,
  BookOpen,
  ChevronLeft,
  ChevronsUpDown,
  FileHeart,
  Grid2x2,
  Heart,
  HeartHandshake,
  Home,
  LifeBuoy,
  List,
  Network,
  Presentation,
  Send,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface GlobalNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
}

interface GlobalNavSectionData {
  heading: string;
  collapsedHeading: string;
  items: GlobalNavItem[];
}

const CHURCH_SECTION: GlobalNavSectionData = {
  heading: "Your Church",
  collapsedHeading: "Church",
  items: [
    { label: "Home", href: "/", icon: Home },
    { label: "Our Data Dashboard", href: "/dashboard", icon: Grid2x2 },
    { label: "Our Marriage Champions", href: "/champions", icon: Trophy },
    { label: "HeartChart Resources", href: "/heartchart-resources", icon: FileHeart },
    { label: "Training", href: "/training", icon: BookOpen },
  ],
};

const TOOLS_SECTION: GlobalNavSectionData = {
  heading: "Ministry Tools",
  collapsedHeading: "Tools",
  items: [
    { label: "Loveology", href: "/loveology", icon: Atom },
    {
      label: "Marriage Ministry Profile",
      href: "https://amfm.org/mmp",
      icon: Presentation,
      external: true,
    },
    { label: "Assessments", href: "/assessments", icon: List },
    { label: "Small Groups", href: "/small-groups", icon: Blend },
    { label: "Date Night Kits", href: "/date-night-kits", icon: Heart },
    { label: "Speaker Collective", href: "/speaker-collective", icon: Users },
    { label: "Counseling Network", href: "/counseling-network", icon: Network },
    { label: "WeDo", href: "https://wedowedo.com", icon: HeartHandshake, external: true },
  ],
};

const FOOTER_ITEMS: GlobalNavItem[] = [
  { label: "Refer a Leader", href: "/refer-a-leader", icon: Send },
  { label: "Support", href: "/support", icon: LifeBuoy },
];

/** Shared label-reveal transition: grows in after the rail has room, collapses instantly so text never wraps/squishes mid-animation. */
const REVEAL_TRANSITION =
  "overflow-hidden whitespace-nowrap transition-all ease-in-out motion-reduce:transition-none motion-reduce:delay-0";
const REVEAL_EXPANDED = "opacity-100 duration-300 delay-100";
const REVEAL_COLLAPSED = "opacity-0 duration-150 delay-0";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
}

function GlobalNavLogo({ expanded }: { expanded: boolean }) {
  return (
    <div
      role="img"
      aria-label="AMFM — Association of Marriage & Family Ministries"
      className="relative h-8 w-full"
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 flex items-center gap-2 transition-opacity duration-200 motion-reduce:transition-none",
          expanded ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <span className="font-display text-xl leading-none font-semibold text-sidebar-foreground">
          amfm
        </span>
        <span className="text-[9px] leading-[11px] font-semibold tracking-[0.5px] text-sidebar-foreground-tertiary uppercase">
          Association
          <br />
          of Marriage &amp;
          <br />
          Family Ministries
        </span>
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity duration-200 motion-reduce:transition-none",
          expanded ? "pointer-events-none opacity-0" : "opacity-100"
        )}
      >
        <span className="font-display text-base leading-none font-semibold text-sidebar-foreground">
          amfm
        </span>
      </div>
    </div>
  );
}

function GlobalNavSectionHeading({
  expanded,
  full,
  collapsed,
}: {
  expanded: boolean;
  full: string;
  collapsed: string;
}) {
  return (
    <div className="relative h-5 px-5 pb-1">
      <p
        className={cn(
          "absolute inset-x-5 top-0 text-left text-xs font-semibold whitespace-nowrap text-sidebar-foreground-tertiary tracking-[0.24px] transition-opacity duration-200 motion-reduce:transition-none",
          expanded ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        {full}
      </p>
      <p
        className={cn(
          "absolute inset-x-5 top-0 text-center text-xs font-semibold whitespace-nowrap text-sidebar-foreground-tertiary tracking-[0.24px] transition-opacity duration-200 motion-reduce:transition-none",
          expanded ? "pointer-events-none opacity-0" : "opacity-100"
        )}
      >
        {collapsed}
      </p>
    </div>
  );
}

function GlobalNavLink({
  item,
  expanded,
  active,
}: {
  item: GlobalNavItem;
  expanded: boolean;
  active: boolean;
}) {
  const Icon = item.icon;

  const row = (
    <span
      className={cn(
        "flex w-full items-center gap-2 rounded-sm px-3 py-2 transition-colors motion-reduce:transition-none",
        active
          ? "bg-gradient-to-r from-sidebar-active-from to-sidebar-active-to"
          : "hover:bg-sidebar-accent"
      )}
    >
      <Icon
        aria-hidden="true"
        className={cn(
          "size-6 shrink-0",
          active ? "text-sidebar-foreground opacity-70" : "text-sidebar-foreground-secondary"
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          REVEAL_TRANSITION,
          "text-sm font-medium",
          active ? "text-sidebar-foreground" : "text-sidebar-foreground-secondary",
          expanded ? cn("max-w-45", REVEAL_EXPANDED) : cn("max-w-0", REVEAL_COLLAPSED)
        )}
      >
        {item.label}
      </span>
    </span>
  );

  const sharedClassName =
    "block rounded-sm py-0.5 focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:outline-none";

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        title={item.label}
        aria-label={item.label}
        className={sharedClassName}
      >
        {row}
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      title={item.label}
      aria-label={item.label}
      aria-current={active ? "page" : undefined}
      className={sharedClassName}
    >
      {row}
    </Link>
  );
}

function GlobalNavAccountCard({
  name,
  email,
  avatarUrl,
  online,
  expanded,
  onClick,
}: {
  name: string;
  email: string;
  avatarUrl?: string;
  online: boolean;
  expanded: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${name} account`}
      className={cn(
        "relative flex h-17 w-full items-center rounded-xl border border-sidebar-border-secondary bg-sidebar-surface p-3",
        expanded ? "justify-start gap-2" : "justify-center"
      )}
    >
      <span className="relative size-10 shrink-0 overflow-hidden rounded-full border border-black/8">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt=""
            width={40}
            height={40}
            unoptimized
            className="size-full object-cover"
          />
        ) : (
          <span className="flex size-full items-center justify-center bg-sidebar-active-from text-sm font-semibold text-sidebar-foreground">
            {getInitials(name)}
          </span>
        )}
        {online ? (
          <span className="absolute -right-px -bottom-px size-2.5 rounded-full border-[1.5px] border-sidebar bg-sidebar-online-indicator" />
        ) : null}
      </span>

      <span
        className={cn(
          REVEAL_TRANSITION,
          "flex min-w-0 flex-col text-left",
          expanded ? cn("max-w-40", REVEAL_EXPANDED) : cn("max-w-0", REVEAL_COLLAPSED)
        )}
      >
        <span className="truncate text-sm font-semibold text-sidebar-foreground">{name}</span>
        <span className="truncate text-sm font-normal text-sidebar-foreground-tertiary">
          {email}
        </span>
      </span>

      <span
        aria-hidden="true"
        className={cn(
          "absolute top-[7px] right-[7px] flex size-6 items-center justify-center rounded-sm text-sidebar-foreground-tertiary transition-opacity duration-200 motion-reduce:transition-none",
          expanded ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <ChevronsUpDown className="size-4" />
      </span>
    </button>
  );
}

export interface GlobalNavProps {
  /** Display name shown (expanded) in the account card; also used to derive the avatar-fallback initials. */
  name: string;
  email: string;
  /** Caller-supplied avatar image. Falls back to an initials avatar when omitted. */
  avatarUrl?: string;
  /** Presence dot on the avatar. Purely presentational — no real presence backend is wired up yet. */
  online?: boolean;
  /** Whether the rail starts expanded. Defaults to the Figma-specified collapsed default. */
  defaultExpanded?: boolean;
  /** Fires when the account card is activated (no account menu is wired up yet — see COMPONENTS.md). */
  onAccountClick?: () => void;
  className?: string;
}

export function GlobalNav({
  name,
  email,
  avatarUrl,
  online = false,
  defaultExpanded = false,
  onAccountClick,
  className,
}: GlobalNavProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const pathname = usePathname();
  const contentId = useId();

  return (
    <nav
      aria-label="Global"
      className={cn(
        "relative flex h-full shrink-0 flex-col rounded-2xl border border-sidebar-border bg-gradient-to-b from-sidebar-gradient-from to-sidebar-gradient-to backdrop-blur-[20px] transition-[width] duration-300 ease-in-out motion-reduce:transition-none",
        expanded ? "w-74 delay-0" : "w-20 delay-100",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        aria-controls={contentId}
        aria-label={expanded ? "Collapse navigation" : "Expand navigation"}
        className="absolute top-9 -right-3 z-10 flex size-6 items-center justify-center rounded-full border border-sidebar-border-secondary bg-sidebar-surface text-sidebar-foreground-tertiary shadow-sm transition-colors hover:bg-sidebar hover:text-sidebar-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:outline-none"
      >
        <ChevronLeft
          aria-hidden="true"
          className={cn(
            "size-3.5 transition-transform duration-300 motion-reduce:transition-none",
            expanded ? "rotate-0" : "rotate-180"
          )}
        />
      </button>

      <div id={contentId} className="flex min-h-0 flex-1 flex-col gap-8 pt-6">
        <div className="px-5">
          <GlobalNavLogo expanded={expanded} />
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto">
          <GlobalNavSectionHeading
            expanded={expanded}
            full={CHURCH_SECTION.heading}
            collapsed={CHURCH_SECTION.collapsedHeading}
          />
          <div className="flex flex-col px-4 pb-5">
            {CHURCH_SECTION.items.map((item) => (
              <GlobalNavLink
                key={item.label}
                item={item}
                expanded={expanded}
                active={pathname === item.href}
              />
            ))}
          </div>

          <GlobalNavSectionHeading
            expanded={expanded}
            full={TOOLS_SECTION.heading}
            collapsed={TOOLS_SECTION.collapsedHeading}
          />
          <div className="flex flex-col px-4 pb-5">
            {TOOLS_SECTION.items.map((item) => (
              <GlobalNavLink
                key={item.label}
                item={item}
                expanded={expanded}
                active={pathname === item.href}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 pb-6">
        <div className="flex flex-col">
          {FOOTER_ITEMS.map((item) => (
            <GlobalNavLink
              key={item.label}
              item={item}
              expanded={expanded}
              active={pathname === item.href}
            />
          ))}
        </div>
        <GlobalNavAccountCard
          name={name}
          email={email}
          avatarUrl={avatarUrl}
          online={online}
          expanded={expanded}
          onClick={onAccountClick}
        />
      </div>
    </nav>
  );
}
