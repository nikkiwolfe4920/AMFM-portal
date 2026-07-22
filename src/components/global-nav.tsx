"use client";

import * as React from "react";
import Link from "next/link";
import {
  BookOpen,
  Blend,
  ChevronsRight,
  ChevronsUpDown,
  FileHeart,
  Heart,
  HeartHandshake,
  Home,
  LayoutGrid,
  LifeBuoy,
  List,
  Presentation,
  Share,
  Share2,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface NavLinkItem {
  label: string;
  href: string;
  icon: LucideIcon;
  active?: boolean;
  external?: boolean;
}

/**
 * Placeholder routes — no dashboard/IA has been built yet for most of these
 * destinations (see COMPONENTS.md#globalnav Implementation rules). "Home"
 * and the two external URLs are the only real, verified destinations.
 */
const CHURCH_LINKS: NavLinkItem[] = [
  { label: "Home", href: "/", icon: Home, active: true },
  { label: "Our Data Dashboard", href: "/dashboard", icon: LayoutGrid },
  { label: "Our Marriage Champions", href: "/marriage-champions", icon: Trophy },
  { label: "HeartChart Resources", href: "/heartchart-resources", icon: FileHeart },
  { label: "Training", href: "/training", icon: BookOpen },
];

const TOOLS_LINKS: NavLinkItem[] = [
  { label: "Loveology", href: "/loveology", icon: ChevronsRight },
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
  { label: "Counseling Network", href: "/counseling-network", icon: Share2 },
  { label: "WeDo", href: "https://wedowedo.com", icon: HeartHandshake, external: true },
];

const FOOTER_LINKS: NavLinkItem[] = [
  { label: "Refer a Leader", href: "/refer-a-leader", icon: Share },
  { label: "Support", href: "/support", icon: LifeBuoy },
];

const TRANSITION =
  "transition-[max-width,opacity,padding,gap] duration-300 ease-in-out motion-reduce:transition-none";
const FADE_TRANSITION = "transition-opacity duration-300 ease-in-out motion-reduce:transition-none";

interface GlobalNavProps {
  className?: string;
  /** Uncontrolled initial state — defaults to collapsed, matching the Figma default. */
  defaultOpen?: boolean;
}

/**
 * Fixed-dark app-shell navigation rail. Collapses to an 80px icon-only rail
 * by default and expands to a 296px labeled panel on click — see
 * COMPONENTS.md#globalnav for the full contract.
 */
export function GlobalNav({ className, defaultOpen = false }: GlobalNavProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const rootRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <nav
      ref={rootRef}
      aria-label="Main"
      data-state={open ? "open" : "closed"}
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-nav-surface-from/90 to-nav-surface-to/90 backdrop-blur-2xl",
        "transition-[width] duration-300 ease-in-out motion-reduce:transition-none",
        open ? "w-74" : "w-20",
        className
      )}
    >
      <div className="flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto pt-6">
        <NavHeader open={open} onToggle={() => setOpen((v) => !v)} />
        <div className="flex flex-col">
          <NavSection
            open={open}
            headingOpen="Your Church"
            headingClosed="Church"
            items={CHURCH_LINKS}
          />
          <NavSection
            open={open}
            headingOpen="Ministry Tools"
            headingClosed="Tools"
            items={TOOLS_LINKS}
          />
        </div>
      </div>
      <div className="flex shrink-0 flex-col gap-4 px-4 pb-6">
        <div className="flex flex-col">
          {FOOTER_LINKS.map((item) => (
            <NavItem key={item.label} item={item} open={open} />
          ))}
        </div>
        <NavAccountCard open={open} />
      </div>
    </nav>
  );
}

function NavHeader({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <div className={cn("flex h-8 shrink-0 items-center", TRANSITION, open ? "px-5" : "px-4")}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-label={open ? "Collapse navigation" : "Expand navigation"}
        className="focus-visible:ring-ring/50 relative flex h-8 w-full items-center overflow-hidden rounded-sm outline-none focus-visible:ring-[3px]"
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            FADE_TRANSITION,
            open ? "opacity-0" : "opacity-100"
          )}
        >
          <NavWordmark />
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 flex items-center justify-start",
            FADE_TRANSITION,
            open ? "opacity-100" : "opacity-0"
          )}
        >
          <NavWordmarkFull />
        </span>
      </button>
    </div>
  );
}

/**
 * Hand-authored text approximation of the "amfm" wordmark, matching
 * AmfmLogo's precedent (src/app/create-profile/_components/amfm-logo.tsx) —
 * the real exported asset is blocked by this environment's network policy,
 * see DESIGN.md Known gaps. Kept separate from AmfmLogo rather than reused
 * since the composition differs (no "Powered by" prefix, nav-fixed-dark
 * tokens instead of the auth-fixed-light tokens).
 */
function NavWordmark() {
  return (
    <span className="text-nav-foreground font-display text-lg leading-none font-semibold">
      amfm
    </span>
  );
}

function NavWordmarkFull() {
  return (
    <span className="flex items-center gap-2">
      <span className="text-nav-foreground font-display text-xl leading-none font-semibold">
        amfm
      </span>
      <span className="text-nav-foreground-subtle flex flex-col justify-center text-[5.5px] leading-[7px] font-semibold tracking-[0.4px] uppercase">
        <span>Association</span>
        <span>of Marriage</span>
        <span>&amp; Family Ministries</span>
      </span>
    </span>
  );
}

function NavSection({
  open,
  headingOpen,
  headingClosed,
  items,
}: {
  open: boolean;
  headingOpen: string;
  headingClosed: string;
  items: NavLinkItem[];
}) {
  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "relative h-5 pb-1",
          TRANSITION,
          open ? "px-5" : "px-4"
        )}
      >
        <p
          aria-hidden={open}
          className={cn(
            "text-nav-foreground-subtle absolute inset-x-0 top-0 text-center text-xs leading-5 font-semibold tracking-[0.24px]",
            FADE_TRANSITION,
            open ? "opacity-0" : "opacity-100"
          )}
        >
          {headingClosed}
        </p>
        <p
          aria-hidden={!open}
          className={cn(
            "text-nav-foreground-subtle absolute inset-x-0 top-0 text-left text-xs leading-5 font-semibold tracking-[0.24px]",
            FADE_TRANSITION,
            open ? "opacity-100" : "opacity-0"
          )}
        >
          {headingOpen}
        </p>
      </div>
      <div className="flex flex-col px-4 pb-5">
        {items.map((item) => (
          <NavItem key={item.label} item={item} open={open} />
        ))}
      </div>
    </div>
  );
}

function NavItem({ item, open }: { item: NavLinkItem; open: boolean }) {
  const { label, href, icon: Icon, active, external } = item;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "focus-visible:ring-ring/50 flex w-full shrink-0 items-center gap-3 rounded-sm px-3 py-2 outline-none focus-visible:ring-[3px]",
        active
          ? "from-nav-active-from to-nav-active-to bg-gradient-to-r"
          : "hover:bg-white/5"
      )}
    >
      <Icon
        aria-hidden="true"
        className={cn(
          "size-6 shrink-0",
          active ? "text-nav-foreground opacity-70" : "text-nav-foreground-muted"
        )}
      />
      <span
        className={cn(
          "overflow-hidden text-sm leading-[22px] font-medium whitespace-nowrap",
          TRANSITION,
          active ? "text-nav-foreground" : "text-nav-foreground-muted",
          open ? "max-w-60 opacity-100" : "max-w-0 opacity-0"
        )}
      >
        {label}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </span>
    </Link>
  );
}

function NavAccountCard({ open }: { open: boolean }) {
  return (
    <button
      type="button"
      className="border-nav-border focus-visible:ring-ring/50 relative flex w-full shrink-0 items-start gap-4 rounded-xl border p-3 outline-none focus-visible:ring-[3px]"
    >
      <span className="flex min-w-0 flex-1 items-center gap-2">
        <span className="relative size-10 shrink-0 rounded-full border border-black/8">
          <span
            aria-hidden="true"
            className="bg-nav-active-from text-nav-foreground flex size-full items-center justify-center rounded-full text-xs font-semibold"
          >
            OR
          </span>
          <span
            aria-hidden="true"
            className="bg-nav-success border-nav-bg absolute right-[-1px] bottom-[-1px] size-2.5 rounded-full border-[1.5px]"
          />
        </span>
        <span
          className={cn(
            "flex min-w-0 flex-col overflow-hidden text-left text-sm leading-[22px] whitespace-nowrap",
            TRANSITION,
            open ? "max-w-40 opacity-100" : "max-w-0 opacity-0"
          )}
        >
          <span className="text-nav-foreground font-semibold">Olivia Rhye</span>
          <span className="text-nav-foreground-subtle font-normal">
            olivia@untitledui.com
          </span>
        </span>
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-[7px] right-[7px] flex size-7 items-center justify-center rounded-sm",
          FADE_TRANSITION,
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <ChevronsUpDown className="text-nav-foreground-subtle size-4" />
      </span>
    </button>
  );
}
