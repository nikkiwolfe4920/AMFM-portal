"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Blend,
  Building2,
  ChevronsRight,
  ChevronsUpDown,
  CreditCard,
  FileHeart,
  FileText,
  Heart,
  HeartHandshake,
  Home,
  LayoutGrid,
  LifeBuoy,
  List,
  Presentation,
  Settings,
  Share,
  Share2,
  Trophy,
  User,
  Users,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavLinkItem {
  label: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
  implemented?: boolean;
}

/**
 * Placeholder routes — no dashboard/IA has been built yet for most of these
 * destinations (see COMPONENTS.md#globalnav Implementation rules). "Home",
 * "Our Marriage Champions", "HeartChart Resources", and the two external URLs
 * are the only real, verified destinations.
 */
const CHURCH_LINKS: NavLinkItem[] = [
  { label: "Home", href: "/", icon: Home, implemented: true },
  { label: "Our Data Dashboard", href: "/dashboard", icon: LayoutGrid },
  {
    label: "Our Marriage Champions",
    href: "/marriage-champions",
    icon: Trophy,
    implemented: true,
  },
  {
    label: "HeartChart Resources",
    href: "/heartchart-resources",
    icon: FileHeart,
    implemented: true,
  },
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

/**
 * The account card's third-tier flyout — opened by clicking the avatar/name
 * (see NavAccountCard). Same placeholder-route caveat as the nav links above:
 * no settings/billing/legal routes exist yet.
 */
const ACCOUNT_MENU_LINKS: NavLinkItem[] = [
  { label: "Personal Profile", href: "/profile", icon: User },
  { label: "Church Profile", href: "/church-profile", icon: Building2 },
  { label: "Account Settings", href: "/account-settings", icon: Settings },
  { label: "Subscription & Billing", href: "/billing", icon: CreditCard },
  { label: "Terms & Privacy", href: "/terms-privacy", icon: FileText },
];

const TRANSITION =
  "transition-[max-width,opacity,padding,gap] duration-300 ease-in-out motion-reduce:transition-none";
const FADE_TRANSITION = "transition-opacity duration-300 ease-in-out motion-reduce:transition-none";
const INSET_TRANSITION =
  "transition-[left,right,opacity] duration-300 ease-in-out motion-reduce:transition-none";

type RouteStatus = "implemented" | "placeholder" | "external";

function getRouteStatus(item: NavLinkItem): RouteStatus {
  if (item.external) return "external";
  return item.implemented ? "implemented" : "placeholder";
}

// Above this viewport width the rail stays pinned expanded — see
// COMPONENTS.md#globalnav and DESIGN.md's Breakpoints (a documented
// exception to "don't add a custom breakpoint without a design reference").
const PINNED_OPEN_QUERY = "(min-width: 1600px)";

interface GlobalNavProps {
  className?: string;
  /** Uncontrolled initial state — defaults to collapsed, matching the Figma default. */
  defaultOpen?: boolean;
  /**
   * Overrides the route-derived active item, e.g. so `/design-system` can
   * demo the active state regardless of which page it's rendered on. Real
   * call sites should omit this and let `usePathname()` decide.
   */
  activeHref?: string;
  /**
   * Renders the rail as a fixed, viewport-pinned overlay with an in-flow
   * spacer reserving its collapsed width, so hover/focus expansion overlays
   * page content instead of pushing it — see COMPONENTS.md#globalnav
   * Implementation rules. Defaults to `false` so the /design-system gallery
   * (and any other bounded, non-app-shell demo context) keeps rendering the
   * rail as a plain in-flow element. Real app-shell consumers
   * (`MarriageChampionsPageShell`, `/heartchart-resources`) should set this.
   */
  overlay?: boolean;
}

/**
 * Fixed-dark app-shell navigation rail. Collapses to an 80px icon-only rail
 * by default and expands to a 296px labeled panel on hover (or keyboard
 * focus) — see COMPONENTS.md#globalnav for the full contract.
 */
export function GlobalNav({
  className,
  defaultOpen = false,
  activeHref,
  overlay = false,
}: GlobalNavProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [pinnedOpen, setPinnedOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLElement>(null);
  const hoveredRef = React.useRef(defaultOpen);
  const focusedRef = React.useRef(false);
  const accountMenuOpenRef = React.useRef(false);

  const syncOpen = React.useCallback(() => {
    setOpen(
      hoveredRef.current || focusedRef.current || accountMenuOpenRef.current || pinnedOpen
    );
  }, [pinnedOpen]);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(PINNED_OPEN_QUERY);
    const handleChange = () => setPinnedOpen(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  React.useEffect(() => {
    syncOpen();
  }, [syncOpen]);

  const handleMouseEnter = React.useCallback(() => {
    hoveredRef.current = true;
    syncOpen();
  }, [syncOpen]);

  const handleMouseLeave = React.useCallback(() => {
    hoveredRef.current = false;
    syncOpen();
  }, [syncOpen]);

  const handleFocus = React.useCallback(() => {
    focusedRef.current = true;
    syncOpen();
  }, [syncOpen]);

  const handleBlur = React.useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      // Focus moving to another element still inside the rail (or into the
      // account menu's portal-rendered content) isn't a real blur — ignore it.
      const nextTarget = event.relatedTarget;
      if (
        (nextTarget instanceof Node && rootRef.current?.contains(nextTarget)) ||
        accountMenuOpenRef.current
      ) {
        return;
      }
      focusedRef.current = false;
      syncOpen();
    },
    [syncOpen]
  );

  const handleAccountMenuOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      accountMenuOpenRef.current = nextOpen;
      syncOpen();
    },
    [syncOpen]
  );

  React.useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      hoveredRef.current = false;
      focusedRef.current = false;
      setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const rail = (
    <nav
      ref={rootRef}
      aria-label="Main"
      data-state={open ? "open" : "closed"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-nav-surface-from/90 to-nav-surface-to/90 backdrop-blur-2xl",
        "transition-[width] duration-300 ease-in-out motion-reduce:transition-none",
        open ? "w-74" : "w-20",
        // `overlay`: fixed to the viewport (not the layout flow), so
        // expanding the rail on hover paints over page content instead of
        // reflowing it — see COMPONENTS.md#globalnav Implementation rules.
        overlay ? "fixed inset-y-3 left-3 z-40" : "h-full",
        className
      )}
    >
      <div className="flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto pt-6">
        <NavHeader open={open} />
        <div className="flex flex-col">
          <NavSection
            open={open}
            headingOpen="Your Church"
            headingClosed="Church"
            items={CHURCH_LINKS}
            activeHref={activeHref}
          />
          <NavSection
            open={open}
            headingOpen="Ministry Tools"
            headingClosed="Tools"
            items={TOOLS_LINKS}
            activeHref={activeHref}
          />
        </div>
      </div>
      <div className="flex shrink-0 flex-col gap-4 px-4 pb-6">
        <div className="flex flex-col">
          {FOOTER_LINKS.map((item) => (
            <NavItem key={item.label} item={item} open={open} activeHref={activeHref} />
          ))}
        </div>
        <NavAccountCard open={open} onMenuOpenChange={handleAccountMenuOpenChange} />
      </div>
    </nav>
  );

  if (!overlay) return rail;

  return (
    <>
      {/*
        In-flow spacer reserving the rail's collapsed (or pinned-open, see
        PINNED_OPEN_QUERY) width — the rail itself is `fixed` above and no
        longer participates in layout, so surrounding flex/grid siblings
        need this to avoid sitting underneath it. 26/80 = the collapsed/
        pinned-open rail width (20/74) plus its 3-unit (12px) left/right
        gutters — see COMPONENTS.md#globalnav.
      */}
      <div
        aria-hidden="true"
        className={cn(
          "shrink-0 transition-[width] duration-300 ease-in-out motion-reduce:transition-none",
          pinnedOpen ? "w-80" : "w-26"
        )}
      />
      {rail}
    </>
  );
}

/**
 * Static brand mark — cross-fades between the collapsed logomark and the
 * expanded lockup, both real exported assets (public/AMFM_Collaped.svg,
 * public/AMFM_Expanded.svg). No longer a click target: expand/collapse is
 * driven by hovering (or keyboard-focusing) the rail itself, not the logo.
 */
function NavHeader({ open }: { open: boolean }) {
  return (
    <div
      role="img"
      aria-label="amfm — Association of Marriage & Family Ministries"
      className="relative flex h-8 shrink-0 items-center overflow-hidden"
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 flex items-center justify-center",
          FADE_TRANSITION,
          open ? "opacity-0" : "opacity-100"
        )}
      >
        <Image
          src="/AMFM_Collaped.svg"
          alt=""
          width={48}
          height={17}
          className="block h-[17px] w-auto"
          unoptimized
        />
      </span>
      <span
        aria-hidden="true"
        className={cn(
          // left-5 (not padding on this wrapper) so the expanded lockup lines up
          // with "Your Church" below — see NavSection's inset-x-5 heading, which
          // uses the same fix for the same containing-block/padding-box reason.
          "absolute inset-y-0 left-5 flex items-center",
          FADE_TRANSITION,
          open ? "opacity-100" : "opacity-0"
        )}
      >
        <Image
          src="/AMFM_Expanded.svg"
          alt=""
          width={169}
          height={33}
          className="block h-8 w-auto"
          unoptimized
        />
      </span>
    </div>
  );
}

function NavSection({
  open,
  headingOpen,
  headingClosed,
  items,
  activeHref,
}: {
  open: boolean;
  headingOpen: string;
  headingClosed: string;
  items: NavLinkItem[];
  activeHref?: string;
}) {
  return (
    <div className="flex flex-col">
      <div className="relative h-5 pb-1">
        {/*
          Insets live on the <p> elements themselves (not padding on this
          wrapper): an absolutely positioned child resolves inset-x-0
          against the wrapper's padding box, so parent padding has no
          effect on it — see the 5px/4px inset mirroring the header's
          own px-5/px-4 indent below.
        */}
        <p
          aria-hidden={open}
          className={cn(
            "text-nav-foreground-subtle absolute top-0 text-center text-xs leading-5 font-semibold tracking-[0.24px]",
            INSET_TRANSITION,
            open ? "inset-x-5 opacity-0" : "inset-x-4 opacity-100"
          )}
        >
          {headingClosed}
        </p>
        <p
          aria-hidden={!open}
          className={cn(
            "text-nav-foreground-subtle absolute top-0 text-left text-xs leading-5 font-semibold tracking-[0.24px]",
            INSET_TRANSITION,
            open ? "inset-x-5 opacity-100" : "inset-x-4 opacity-0"
          )}
        >
          {headingOpen}
        </p>
      </div>
      <div className="flex flex-col px-4 pb-5">
        {items.map((item) => (
          <NavItem key={item.label} item={item} open={open} activeHref={activeHref} />
        ))}
      </div>
    </div>
  );
}

function NavItem({
  item,
  open,
  activeHref,
}: {
  item: NavLinkItem;
  open: boolean;
  activeHref?: string;
}) {
  const { label, href, icon: Icon, external } = item;
  const pathname = usePathname();
  const active = (activeHref ?? pathname) === href;
  const routeStatus = getRouteStatus(item);
  const prefetchDisabled = routeStatus === "placeholder";

  return (
    <Link
      href={href}
      prefetch={prefetchDisabled ? false : undefined}
      aria-current={active ? "page" : undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      data-route-status={routeStatus}
      data-prefetch={prefetchDisabled ? "disabled" : undefined}
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

function NavAccountCard({
  open,
  onMenuOpenChange,
}: {
  open: boolean;
  onMenuOpenChange: (open: boolean) => void;
}) {
  return (
    <DropdownMenu onOpenChange={onMenuOpenChange}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "border-nav-border focus-visible:ring-ring/50 relative flex h-[68px] w-full shrink-0 gap-4 rounded-xl border outline-none focus-visible:ring-[3px]",
            TRANSITION,
            // Collapsed matches Figma's dedicated centered layout (p-0,
            // justify-center) rather than reusing the expanded state's
            // left-aligned one (items-start, p-3) — without this the avatar
            // renders flush-left inside the padded box instead of centered.
            open ? "items-start p-3" : "items-center justify-center p-0"
          )}
        >
          <span
            className={cn("flex min-w-0 items-center", open ? "flex-1 gap-2" : "flex-none gap-0")}
          >
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
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        align="end"
        sideOffset={12}
        className="border-nav-border bg-nav-surface-from/95 w-64 rounded-2xl border p-2 shadow-2xl backdrop-blur-2xl"
      >
        {ACCOUNT_MENU_LINKS.map((item) => {
          const { label, href, icon: Icon } = item;
          const routeStatus = getRouteStatus(item);
          const prefetchDisabled = routeStatus === "placeholder";

          return (
            <DropdownMenuItem key={label} asChild className="focus:bg-white/5 rounded-lg p-2.5">
              <Link
                href={href}
                prefetch={prefetchDisabled ? false : undefined}
                data-route-status={routeStatus}
                data-prefetch={prefetchDisabled ? "disabled" : undefined}
                className="flex items-center gap-3"
              >
                <Icon aria-hidden="true" className="text-nav-foreground-muted shrink-0" />
                <span className="text-nav-foreground text-sm font-medium">{label}</span>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
