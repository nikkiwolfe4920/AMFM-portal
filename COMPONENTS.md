# AMFM Portal — COMPONENTS.md

**The AI implementation contract.** This file is the source of truth for component behavior: anatomy, variants, states, props, tokens, accessibility, responsive behavior, and Figma reference. Design foundations (color/type/spacing/shadow tokens, breakpoints, motion, a11y principles) live in **[`DESIGN.md`](./DESIGN.md)** — this file only documents how those foundations compose into components. AI-facing implementation rules live in **[`IMPLEMENTATION.md`](./IMPLEMENTATION.md)**.

```
Figma Design Standards → DESIGN.md → COMPONENTS.md → React Components → /design-system Visual Validation
```

Every component below is rendered live at **`/design-system`** (`src/app/design-system/components`). If a component's rendered behavior and its entry here disagree, one of them is stale — fix both in the same change.

**Before creating a new component**: search this file first. Reuse or extend an existing entry before writing new markup — see the Component Creation Process in `CLAUDE.md`. When you do add a new component, add its entry here (with a `Draft` status) in the same change that adds the code.

---

## Button

**Status**: Production Ready
**Source**: `src/components/ui/button.tsx`
**Figma**: AMFM Portal file, node `3273:19658` ("Primary" button set) and siblings — see `figma/figma-links.md`

### Purpose

Reusable interactive action element for triggering a command (form submit, navigation, dialog open) — the single control every clickable action in the app should route through.

### Anatomy

- Root `<button>` (or `<a>`/any element via `asChild` + Radix `Slot`)
- Optional leading `Loader2Icon` (spinning) when `loading`
- Label (`children`) — text or icon, or both

### Variants (`variant` prop)

| Variant | Use for |
|---|---|
| `default` | Primary/brand action — one per view in most cases |
| `outline` | Secondary action alongside a `default` button |
| `secondary` | Lower-emphasis action, neutral fill |
| `destructive` | Irreversible/destructive action (delete, remove) |
| `ghost` | Lowest-emphasis inline action, no fill until hover |
| `link` | Renders as inline text, no button chrome |

### Sizes (`size` prop)

`sm`, `default`, `lg`, `icon` (square, for icon-only buttons — always pair with `aria-label`).

### States

| State | Behavior |
|---|---|
| Default | Base variant styling |
| Hover | `default`: fills `bg-text-brand` (not `bg-primary/90` — verified against Figma's "Primary Hover", not an opacity of `primary`). Other variants: standard `hover:bg-*` per variant. |
| Focus | `default`: keeps the `border-white/12` edge, adds a `border-brand`-colored ring (`focus-visible:ring-border-brand focus-visible:ring-4 focus-visible:ring-offset-2`) reproducing Figma's "Primary Focused" (2px white gap + 4px brand ring). Other variants: generic `focus-visible:ring-ring/50 focus-visible:ring-[3px]`. |
| Disabled | `default`: flat tokens (`bg-muted`, `border-border-secondary`, `text-fg-disabled`, `shadow-xs`, `disabled:opacity-100` to cancel the base fade). Other variants: generic `disabled:opacity-50`. |
| Loading | `loading` prop sets native `disabled`, `aria-busy`, `data-loading`, renders a spinning `Loader2Icon` before children. On `default`, forces the same fill as hover (`bg-text-brand`) rather than the disabled flat gray. |

### Properties / API

```ts
React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {
  asChild?: boolean;   // render as a different element via Radix Slot
  loading?: boolean;   // native <button> only, not compatible with asChild
}
```

### Design tokens used

`bg-primary`, `text-primary-foreground`, `bg-text-brand` (hover/loading fill), `border-border-brand` (focus ring), `bg-muted`, `border-border-secondary`, `text-fg-disabled` (disabled), `shadow-button-inset`, `shadow-xs`. See `DESIGN.md` Color tokens / Shadows.

### Accessibility requirements

- Native `<button>` semantics by default; `asChild` must resolve to a real interactive element (e.g. `<a href>`), never a non-interactive one.
- `size="icon"` requires a caller-supplied `aria-label`.
- Focus ring is never suppressed without an equivalent custom indicator (see `DESIGN.md` Accessibility standards).
- `loading` sets `aria-busy` so assistive tech announces the pending state.

### Responsive behavior

No layout behavior of its own — width and stacking are controlled by the caller (e.g. `w-full` on `/login`'s submit button). Hit target stays comfortably tappable at the `default`/`lg` sizes on all breakpoints; avoid `size="sm"` for primary mobile actions.

### Implementation rules

- Never hardcode colors — always use the tokens above.
- Always use `cva` variants, never inline ternaries for variant styling.
- Must support keyboard focus (native `<button>` gives this for free; don't override `tabIndex`).
- `loading` and `asChild` are mutually exclusive — don't pass both.

### Visual examples

All variants, sizes, and the disabled/loading states render at `/design-system/components#button`.

---

## Input

**Status**: Production Ready
**Source**: `src/components/ui/input.tsx`
**Figma**: AMFM Portal file, node `3272:19436` ("Input" field set) and siblings

### Purpose

Single-line text entry control for forms — the base control every text/email/password field composes.

### Anatomy

Bare `<input>` (matches upstream shadcn/ui shape — no wrapper, no built-in label/help-text/error-message chrome). Compose `Label` and validation messaging around it at the call site.

### Variants

None — a single visual treatment, differentiated only by `type` (`text`, `email`, `password`, etc.) and state.

### States

| State | Behavior |
|---|---|
| Default / Filled | `bg-background`, `text-foreground`, `px-3.5 py-2.5`, intrinsic height (no fixed `h-*`). Figma's "Default" and "Filled" are visually identical — filled is just this styling with a value present. |
| Focused | `focus-visible:border-2 focus-visible:border-border-brand` — a thicker, brand-colored border. No separate ring layer (unlike `Button`). |
| Invalid (`aria-invalid`) | `aria-invalid:border-border-destructive-subtle`, flat border only — no ring glow. |
| Disabled | `disabled:bg-muted/50` (verified pixel-exact against Figma's flat `#fafafa` composited on the white card), `disabled:text-muted-foreground`, `disabled:opacity-100` to cancel the base fade. Border unchanged from default. |

### Properties / API

`React.ComponentProps<"input">` — forwards every native input prop; no custom props.

### Design tokens used

`bg-background`, `text-foreground`, `placeholder:text-muted-foreground`, `border-input`, `border-border-brand` (focus), `border-border-destructive-subtle` (invalid), `bg-muted/50` + `text-muted-foreground` (disabled). See `DESIGN.md` Color tokens.

### Accessibility requirements

- Always pair with a `Label` via `htmlFor`/`id` — never rely on placeholder text as the only label.
- Surface real validity via `aria-invalid`, not a visual-only "error" prop.
- Disabled uses the native `disabled` attribute, not just a style.

### Responsive behavior

Full-width by default (`w-full`) within its flex container; no breakpoint-specific behavior of its own — sizing is controlled by the parent layout.

### Implementation rules

- Never hardcode colors, border widths, or padding — use the tokens/utilities above.
- Stays a bare `<input>` — no business logic (validation wiring, error message rendering) inside the primitive itself (see "No business logic in `src/components/ui`" in `CLAUDE.md`). Build field-level validation UI in the composing component.
- Figma's reference also shows a trailing help-circle icon and inline error message — treated as component-browser demo chrome only, not implemented, since no app-level validation wiring exists yet to attach one to. Revisit when real field-level validation lands.

### Visual examples

Default, filled, disabled, and invalid states render at `/design-system/components#input`.

---

## Label

**Status**: Production Ready
**Source**: `src/components/ui/label.tsx`

### Purpose

Accessible text label for a form control, visually distinct from body copy.

### Anatomy

Radix `Label.Root` wrapping text (and optionally an inline control, e.g. paired with `Checkbox`).

### Variants

None.

### States

Inherits `peer-disabled`/`group-data-[disabled=true]` styling (fades + `cursor-not-allowed`) when its paired control is disabled.

### Properties / API

`React.ComponentProps<typeof LabelPrimitive.Root>` — forwards every Radix `Label` prop, most commonly `htmlFor`.

### Design tokens used

`text-text-secondary` (distinct tier from body `text-foreground`).

### Accessibility requirements

- Always set `htmlFor` pointing at the control's `id`, or wrap the control, so screen readers announce the association.

### Responsive behavior

None — inline text, wraps naturally with its container.

### Implementation rules

- Never hardcode the text color — `text-text-secondary` is the token for form labels specifically, distinct from body/placeholder/tertiary text (see `DESIGN.md` Typography system).

### Visual examples

Rendered paired with `Input` and `Checkbox` at `/design-system/components#input` and `#checkbox`.

---

## Checkbox

**Status**: Production Ready
**Source**: `src/components/ui/checkbox.tsx`
**Figma**: AMFM Portal file, "trusted device" control on `/login`

### Purpose

Binary on/off selection control, e.g. "This is a trusted device" on `/login`.

### Anatomy

Radix `Checkbox.Root` (`size-4 rounded-[4px]`) + `Checkbox.Indicator` rendering a `CheckIcon` when checked.

### Variants

None.

### States

Default (unchecked), checked (`data-[state=checked]`, fills `bg-primary`), focused (`focus-visible:ring-ring/50 focus-visible:ring-[3px]`), invalid (`aria-invalid:border-destructive`), disabled (`disabled:opacity-50 disabled:cursor-not-allowed`).

### Properties / API

`React.ComponentProps<typeof CheckboxPrimitive.Root>` — forwards every Radix `Checkbox` prop (`checked`, `onCheckedChange`, `disabled`, etc.).

### Design tokens used

`border-input`, `bg-primary` / `text-primary-foreground` (checked), `border-primary` (checked border), `ring-ring/50` (focus).

### Accessibility requirements

- Always pair with a `Label` via `htmlFor`/`id`.
- Checked state is conveyed by both the filled background and the check glyph — never color alone.

### Responsive behavior

Fixed `size-4` at all breakpoints — a checkbox doesn't need responsive resizing; ensure its clickable area (label + box) stays comfortably tappable on mobile via the wrapping `Label`.

### Implementation rules

- `4px` corner radius is a deliberate arbitrary value (doesn't land on the `radius` scale) — don't stretch `rounded-sm`/`rounded-xs` to fit it instead.

### Visual examples

Rendered at `/design-system/components#checkbox` and in the `/login` form.

---

## Card

**Status**: Production Ready
**Source**: `src/components/ui/card.tsx`

### Purpose

Generic raised content surface for grouping related content — the base shadcn/ui `Card`, unmodified from upstream shape.

### Anatomy

`Card` (root) → `CardHeader` (grid, supports an optional `CardAction` in its top-right) → `CardTitle` / `CardDescription` → `CardContent` → `CardFooter`.

### Variants

None — compose sub-parts as needed; omit any part that isn't needed (e.g. no `CardFooter` if there's no footer content).

### States

None of its own — purely a layout/surface primitive. Interactive content inside it carries its own states.

### Properties / API

Each sub-component is `React.ComponentProps<"div">` — no custom props beyond `className`/children.

### Design tokens used

`bg-card`, `text-card-foreground`, default `border`, `shadow-sm`.

### Accessibility requirements

Purely structural — accessibility depends on the semantic content placed inside (use real headings in `CardTitle` slot content where appropriate for the page's heading hierarchy).

### Responsive behavior

Fluid width by default (fills its container); no built-in breakpoint behavior — control max-width/columns at the call site (see `DESIGN.md` Grid system).

### Implementation rules

- Keep this primitive matching upstream shadcn/ui shape exactly — a flat single-surface card. Don't bend it to fit a non-flat shape (see `AuthCard` below for why that pattern lives elsewhere).

### Visual examples

Rendered at `/design-system/components#card`.

---

## Dialog

**Status**: Production Ready
**Source**: `src/components/ui/dialog.tsx`
**Figma**: AMFM Portal file, node `1829:19828` (modal chrome reference)

### Purpose

Modal overlay for focused, blocking tasks or supplementary content (e.g. the homepage's "Learn More" DPOsystem story) without leaving the current page.

### Anatomy

`Dialog` (Radix root) → `DialogTrigger` → `DialogPortal` → `DialogOverlay` (scrim) + `DialogContent` (surface, optional built-in `DialogClose`) → `DialogHeader` (`DialogTitle` + `DialogDescription`) / `DialogFooter`.

### Variants

`DialogContent`'s `showCloseButton` prop (default `true`) — set `false` only when the caller renders its own close affordance.

### States

Open / closed, animated via `tw-animate-css` (`animate-in`/`animate-out`, `fade-in-0`/`fade-out-0`, `zoom-in-95`/`zoom-out-95`) driven by Radix's `data-state`. Close button: default / hover (`hover:bg-accent hover:text-foreground`) / focus (`focus-visible:ring-[3px]`).

### Properties / API

`Dialog`/`DialogTrigger`/`DialogClose` forward Radix's root props (`open`, `onOpenChange`, etc.). `DialogContent` adds `showCloseButton?: boolean` on top of Radix `Content` props.

### Design tokens used

`bg-background`/`text-foreground` (theme-aware surface, unlike the fixed-light `AuthCard`), `bg-overlay/50` (scrim), `rounded-2xl`, Tailwind's built-in `shadow-2xl`, `text-muted-foreground` (close icon).

### Accessibility requirements

- Radix handles focus trap, `Escape`-to-close, and return-focus-to-trigger automatically — don't override this behavior.
- `DialogTitle` is required for every `DialogContent` (use `sr-only` if the visible design has no heading, as in `DposystemLearnMore`) — never omit it, screen readers need an accessible name for the dialog.
- Close control is a `size-11` hit target — don't shrink it below that for a touch-usable close affordance.

### Responsive behavior

`w-full max-w-[calc(100%-2rem)]` on mobile, `sm:max-w-3xl` from `sm` up — never full-bleed edge-to-edge past mobile widths. Content inside (e.g. `DposystemStory`'s carousel) manages its own internal responsive layout.

### Implementation rules

- No default padding on `DialogContent` so full-bleed content (e.g. a carousel) can control its own layout — use `DialogHeader`/`DialogFooter` for the padded, upstream-shadcn-shaped case.
- Don't fight Radix's animation/focus-management primitives with custom JS — compose on top of `data-state`/`data-slot` instead.

### Visual examples

Rendered at `/design-system/components#dialog` and via the homepage "Learn More" trigger.

---

## PhotoBackdrop

**Status**: Production Ready
**Source**: `src/components/photo-backdrop.tsx`

### Purpose

Full-bleed background photo + dark scrim shared by any onboarding-style surface built on the same Figma photo background (currently `/login` and `/`).

### Anatomy

Outer full-viewport container → absolutely-positioned background image (`bg-[url('/login-background.jpg')] bg-cover bg-center`) → a blurred, scrim-tinted content layer (`children`).

### Variants

None — one visual treatment; `className` extends the content-layer container for per-page layout needs.

### States

None — static decorative backdrop.

### Properties / API

```ts
{ className?: string } & React.PropsWithChildren
```

### Design tokens used

`bg-overlay` (scrim, `opacity-85`), `backdrop-blur-[20px]` / `backdrop-blur-[8px]` (arbitrary blur values — no blur token exists yet; don't invent one without a second real use case per `CLAUDE.md`'s anti-premature-abstraction guidance).

### Accessibility requirements

Decorative background image — no `alt` text needed (it's a CSS background, not an `<img>`). Ensure content rendered inside still meets contrast requirements against the scrim (see `DESIGN.md` Accessibility standards).

### Responsive behavior

`min-h-screen w-full` fills the viewport at every breakpoint; content layer centers its children (`items-center justify-center`) regardless of viewport size.

### Implementation rules

- Shared across routes — changes here affect every consuming page; verify `/login` and `/` both still look correct after any edit.
- Don't duplicate this pattern per-route; extend `className` instead.

### Visual examples

Rendered live on `/login` and `/`; referenced (not re-rendered full-bleed) at `/design-system/patterns`.

---

## AuthCard

**Status**: Production Ready
**Source**: `src/app/login/_components/auth-card.tsx`

### Purpose

The nested auth-surface shape used by the `/login` card — an outer shadow/padding shell wrapping an inner bordered panel. Route-colocated, not a shared `src/components` primitive.

### Anatomy

Outer `div` (`rounded-2xl`, `shadow-card`, `p-2`) → inner bordered panel (`rounded-md`, `border-black/10`, `px-6 pt-5 pb-4`) → content wrapper (`w-90 max-w-90`, `children`).

### Variants

None.

### States

None of its own.

### Properties / API

```ts
{ className?: string } & React.PropsWithChildren
```

### Design tokens used

`bg-background`, `shadow-card`, `rounded-2xl`/`rounded-md`, `border-black/10` (hairline — a Tailwind opacity color, not a new token, see `DESIGN.md` "Adding a new color token").

### Accessibility requirements

Purely structural — a11y depends on content composed inside (form labels, headings, etc.).

### Responsive behavior

Fixed intrinsic width (`min-w-80`, inner `w-90 max-w-90`) — designed for the centered single-card auth layout, not a fluid responsive container. If a second auth-style screen needs a fluid variant, extend rather than duplicate.

### Implementation rules

- This is a *nested* shape that doesn't map onto the flat single-`<div>` `Card` primitive — kept colocated under `login/_components` rather than bent into `src/components/ui/card.tsx`. Build other auth-specific shapes next to the route that needs them, following this precedent, rather than generalizing `Card` to fit.

### Visual examples

Rendered live on `/login`; referenced at `/design-system/patterns`.

---

## HeartChartLogo

**Status**: Production Ready
**Source**: `src/app/login/_components/heartchart-logo.tsx`

### Purpose

Renders the exported HeartChart brand wordmark.

### Anatomy

`next/image` wrapping the pre-rasterized `public/heartchart-logo.svg` asset, `unoptimized` (no transform needed for a static SVG export).

### Variants / States

None — a static image.

### Properties / API

No props — fixed `183×32` intrinsic size, displayed `h-8 w-auto`.

### Design tokens used

None (raster asset, not token-driven).

### Accessibility requirements

`alt="HeartChart"` is set — don't remove it.

### Responsive behavior

`h-8 w-auto` scales proportionally; no breakpoint-specific sizing today.

### Implementation rules

- Don't re-derive this from code (an earlier code-rebuilt approximation was replaced once the real asset was supplied) — always render the committed SVG asset.

### Visual examples

Rendered at `/design-system/foundations#brand-mark` and on `/login`.

---

## GoogleIcon

**Status**: Production Ready
**Source**: `src/app/login/_components/google-icon.tsx`

### Purpose

Google "G" mark for the "Log in with Google" button.

### Anatomy

Hand-authored inline SVG (four-color Google "G" paths).

### Variants / States

None.

### Properties / API

`React.ComponentProps<"svg">` — forwards all native SVG props (used to set `size-6` at the call site).

### Design tokens used

None — fixed brand colors per Google's own mark, not app tokens (a third-party brand mark is exempt from the app's color-token rule).

### Accessibility requirements

`aria-hidden="true"` — decorative only; the adjacent button text ("Log in with Google") carries the accessible name.

### Responsive behavior

Sized via `size-*` utility at the call site (`size-6` today); no intrinsic responsive behavior.

### Implementation rules

- Hand-authored approximation of Google's mark, not a fetched raster — acceptable per `DESIGN.md` Known gaps; revisit only if pixel-exactness becomes a requirement.

### Visual examples

Rendered on `/login`'s "Log in with Google" button.

---

## DposystemLearnMore

**Status**: Production Ready
**Source**: `src/app/_components/dposystem-learn-more.tsx`

### Purpose

Homepage entry point (a "Learn More" text trigger) into the `DposystemStory` carousel, composed from `Dialog`.

### Anatomy

`Dialog` → `DialogTrigger` (styled as an inline underlined text link) → `DialogContent` (unpadded, `sr-only` `DialogTitle`) → `DposystemStory`.

### Variants / States

None beyond `Dialog`'s open/closed.

### Properties / API

No props — self-contained; route-colocated (`src/app/_components`), single use site (the homepage), not promoted to a shared primitive (see `CLAUDE.md`'s guidance against premature abstraction).

### Design tokens used

Inherits `Dialog`'s tokens; trigger text uses `text-white` (fixed, since it renders over `PhotoBackdrop`'s photo, not the theme-aware surface).

### Accessibility requirements

`DialogTitle` is present (visually hidden via `sr-only`) so the dialog has an accessible name even though the visible design has no heading — see `Dialog`'s accessibility requirements above.

### Responsive behavior

Inherits `Dialog`'s responsive sizing; trigger is inline text, wraps naturally.

### Implementation rules

- Keep colocated under `src/app/_components` unless a second real use site appears (per `CLAUDE.md` — don't promote to `src/components` speculatively).

### Visual examples

Rendered on `/` via the "Learn More" link in the DPOsystem blurb.

---

## DposystemStory

**Status**: Production Ready
**Source**: `src/app/_components/dposystem-story.tsx`

### Purpose

Horizontally snap-scrolling "story" carousel presenting the DPOsystem philosophy inside `DposystemLearnMore`'s dialog.

### Anatomy

ARIA carousel region (`role="region"`, `aria-roledescription="carousel"`) → scroll container (`snap-x snap-mandatory`, keyboard-navigable) → per-slide panels (`role="group"`, `aria-roledescription="slide"`, `SlideHeading` + prose/list content, some slides using `ValueList`) → prev/next buttons → dot indicators.

### Variants

None — content (`SLIDES`) is a fixed authored sequence, not a reusable variant surface.

### States

Per-slide active/inactive (drives dot indicator fill: `bg-primary` active vs `bg-border` inactive); prev/next buttons disable (`disabled:opacity-0 disabled:pointer-events-none`) at the first/last slide respectively.

### Properties / API

No props — content is authored inline (`SLIDES` constant); not designed to be re-parameterized for other content today (single use site).

### Design tokens used

`text-text-brand` (eyebrow labels), `text-foreground`/`text-text-tertiary` (headings/body), `border-border-secondary`, `bg-secondary/60` (`ValueList` panel), `bg-primary`/`bg-border` (dot indicators).

### Accessibility requirements

- Follows the ARIA carousel pattern exactly (`role="region"`/`aria-roledescription="carousel"` wrapping `role="group"`/`aria-roledescription="slide"`) — don't simplify this to plain `div`s.
- Scroll container is keyboard-navigable via `tabIndex={0}` with Arrow key / Home / End handling — required, not optional, since it replaces native scroll-snap keyboard behavior with explicit control for reliability across browsers.
- Respects `motion-reduce:scroll-auto` for the smooth-scroll behavior (see `DESIGN.md` Motion rules).
- Every flex/grid item ancestor of the horizontally-scrolling container needs `min-w-0` (the default `min-width: auto` on flex/grid items otherwise sizes them to content's max-content width, breaking wrapping/clipping instead of scrolling) — a load-bearing detail, don't remove it during a refactor.

### Responsive behavior

Slide height is `h-[min(70vh,560px)]`; slide content padding scales `px-6 py-8` (mobile) → `sm:px-12 sm:py-10`; lists inside slides go `grid-cols-1` → `sm:grid-cols-2`.

### Implementation rules

- Keep colocated under `src/app/_components` (single use site) rather than generalized into a reusable carousel primitive until a second real use case appears.
- Any new slide must follow the existing `StorySlide` shape and reuse `SlideHeading`/`ValueList` rather than one-off markup.

### Visual examples

Rendered on `/` via `DposystemLearnMore`; referenced at `/design-system/patterns#carousel`.

---

## HeartChartSummary

**Status**: Draft
**Source**: `src/components/heartchart-summary.tsx`
**Figma**: AMFM Portal file, node `1993:36348` ("HeartChart Summary" component set — "Growing" `1640:23457`/`1670:36217`, "Low" `1670:36549`, "Exceptional" `1670:36610` variants) — see `figma/figma-links.md`

### Purpose

Church-wide HeartChart participation snapshot for an admin dashboard: how many individuals have completed the HeartChart assessment out of the church's total attenders, and where that participation level falls on an Early → Active → Strong → Exceptional scale. Gives a church admin an at-a-glance read on engagement plus one-tap entry points into related actions (a contextual tip, historical trend, and the share link for driving more completions).

### Anatomy

- Outer elevated card (`shadow-card`, `rounded-2xl`) → bordered "Respondent snapshot" panel
  - `HeartChartLogo` (reused, top-left)
  - "Live Data" badge (dot + label, top-right, absolutely positioned)
  - Stat row: donut chart (percentage in its center) + big stat number/"Individual(s)" label + supporting attendee-count sentence
  - Participation scale panel (muted sub-panel):
    - Eyebrow label ("CHURCH-WIDE PARTICIPATION LEVEL")
    - Segmented scale bar — 4 fixed labeled segments (Early / Active / Strong / Exceptional), one highlighted per participation level, with a marker (downward triangle + a thin vertical stem into the bar, matching Figma's two-part marker asset) positioned within the active segment per `percentage`'s place in that level's range
    - Action row — three `Button` (`variant="outline" size="sm"`, with local height/icon-size/color overrides — see Implementation rules) instances: "Quick Tip" (lightbulb), "Last 4 Weeks" (trending line), "Share Your Link" (QR code)

### Variants

None (`variant` prop) — visual treatment is entirely driven by the derived participation level (see States), not a caller-chosen variant. This intentionally diverges from the Figma component, which exposes the level as a manually-set `state` variant (`Growing`/`Low`/`Execptional`, the latter a Figma typo corrected here to `Exceptional`) — see Implementation rules for why.

### States

Participation level is **derived from the `percentage` prop**, not passed in directly, using the thresholds from Figma's own dev annotations on node `1640:23474`:

| `percentage` | Level | Highlighted segment | Color | Number/text color |
|---|---|---|---|---|
| 0 | "Early" (no visual design yet — see `DESIGN.md` Known gaps) | Early *(fallback)* | Neutral (`status-warning` fallback) | `status-warning` *(fallback)* |
| 1–44 | Low | Active | `status-warning-subtle` → `status-warning` gradient | `status-warning` |
| 45–74 | Growing | Strong | `status-success-strong` → `status-success` gradient | `status-success` |
| 75–100 | Exceptional | Exceptional | `status-success-strong` → `status-success` gradient | `status-success` |

Other states:

| State | Behavior |
|---|---|
| Default | As above — the component has no loading/empty/error state of its own; it's a pure presentational read of caller-supplied numbers. Caller owns the loading/error UI while fetching the underlying stats (see Implementation rules). |
| Action buttons | Each of the three `Button` instances is optional-callback-driven (`onQuickTip`/`onViewLastFourWeeks`/`onShareLink`); a button renders (and is disabled-looking is *not* applied) regardless of whether a handler is passed — see Implementation rules. |

### Properties / API

```ts
interface HeartChartSummaryProps {
  /** 0–100. Independent of completedCount/totalAttenders — see Implementation rules. */
  percentage: number;
  completedCount: number;
  totalAttenders: number;
  onQuickTip?: () => void;
  onViewLastFourWeeks?: () => void;
  onShareLink?: () => void;
  className?: string;
}
```

### Design tokens used

`shadow-card`, `rounded-2xl`/`rounded-md`, `bg-background`, `border` (outer/inner card hairlines, participation-level sub-panel border) + `bg-muted/50` (participation-level sub-panel, badge — `bg-muted/50` reused per `Input`'s established `#fafafa`-over-white precedent, not a new gray token), `text-foreground` (badge text), `text-muted-foreground`/`bg-muted-foreground` (supporting sentence, "Individuals" caption, donut percentage label, inactive bar-segment text, marker triangle+stem, action button label/icon color), `border-secondary` (donut track ring — exact match, see Implementation rules), `bg-muted` (inactive bar segments), `status-success`/`status-success-strong`, `status-warning`/`status-warning-subtle` (new — see `DESIGN.md` Color tokens and Known gaps). `Button`'s own tokens for the three action buttons (see `Button` above).

**Deliberately not using `text-text-secondary`/`text-text-tertiary`/`fg-disabled`/`border-black/10`**, even though several are closer pixel matches to Figma's exact grays — `DESIGN.md`'s "Auth/onboarding surfaces are theme-fixed" section scopes those specifically to the fixed-light auth surface family (root-only, no `.dark` value by design). This card is a themed dashboard surface, not a fixed-light one, so reusing them left inactive scale segments, borders, and marker/tint colors stuck in their light-mode value under `.dark` — confirmed by actually toggling `.dark` during implementation and seeing bright, undarkened elements against an otherwise-dark card. Swapped to the equivalent theme-aware generic tokens (`foreground`/`muted-foreground`/`muted`/`border`) instead; this trades a small amount of pixel-exactness against the light-only Figma reference for correct, verified dark-mode behavior, per `IMPLEMENTATION.md`'s "No unverified dark mode" non-negotiable. This same reasoning now also covers the action buttons' label/icon color (see Implementation rules) — an exception is `border-secondary`, which Figma's own variable export confirmed as the donut track's literal fill and which already carries a verified `.dark` value, so no trade-off was needed there.

### Accessibility requirements

- The donut chart and segmented scale bar are supplementary visualizations of the same numbers already rendered as text (the big stat number, the attendee sentence, the segment labels) — screen reader users get the full picture from the text content alone; the SVG donut is marked `aria-hidden` and the scale bar's decorative marker is `aria-hidden`, so nothing is announced twice or announced as an unlabeled graphic.
- "Live Data" badge conveys status via the dot + text label together, not color alone (see `DESIGN.md` Accessibility standards — color is never the only signal).
- The highlighted scale segment is distinguished by both a fill color *and* its position/gradient — not color alone — but since all 4 segment labels are always visible as text regardless of which is active, the active state is also conveyed redundantly through the marker's position, satisfying the same principle from a second angle.
- All three action buttons render through `Button`, inheriting its keyboard focus, focus-visible ring, and `aria-label` conventions; each has a visible text label (not icon-only), so no extra `aria-label` is required.

### Responsive behavior

- Not yet responsive below its Figma-authored desktop width (the source frame is a fixed `564px`) — this is a known follow-up, not a deliberate fixed-width decision like `AuthCard`. Before shipping into a real dashboard route, verify against `DESIGN.md`'s Layout/grid rules (mobile-first, single column below `sm`) and add `sm:`/`md:` breakpoint handling for the stat row (donut + numbers) and the 3-button action row (which will need to wrap or stack on narrow viewports) — flagged here rather than guessed, since no dashboard route or Figma mobile frame exists yet to verify against.
- The card itself is otherwise fluid-width (`w-full`) so it can be dropped into a responsive grid per `DESIGN.md`'s Grid system once a consuming page exists.

### Implementation rules

- **`percentage` drives derived participation level, not a caller-set `state` prop.** Figma's component exposes the level as a manually chosen variant, but its own dev annotations document the exact thresholds (0 / 1–44 / 45–74 / 75+) that produce it — deriving from `percentage` is a single source of truth and can't drift out of sync the way two independently-set props could.
- **`percentage` is independent of `completedCount`/`totalAttenders`** — don't compute it as `completedCount / totalAttenders`. Figma's own content annotation says percentage is "of HeartCharts completed divided by the total number of people in the church," a different (larger) denominator than the "attenders" figure shown in the supporting sentence, and the "Exceptional" example shows `completedCount` (2,912) exceeding `totalAttenders` (2,800) while `percentage` still caps at 100 — treat all three as independent caller-supplied numbers, cap `percentage` display at 100 defensively, and pluralize "Individual"/"Individuals" off of `completedCount` rather than requiring a separate label prop.
- **Marker position is computed as a position *within the active quarter-segment*, not a flat `percentage`% of the full bar.** Figma's own three sample states (1% / 58% / 100%) place their marker at pixel offsets that only make sense once you notice each maps to *where that value falls inside its level's own range* (1–44 for Low, 45–74 for Growing, 75–100 for Exceptional), scaled into that level's 25%-wide quarter of the bar — e.g. 1% (the very start of Low's range) lands exactly on the Active segment's left edge, not 1% across the whole bar. A flat `left: ${percentage}%` mapping reproduces the Growing/Exceptional samples closely enough to look "roughly right" but places Low's marker deep inside the *Early* segment while the *Active* segment is the one highlighted — a visible mismatch between the marker and the segment it's supposed to point at. `getMarkerPosition(percentage, level)` reproduces Figma's actual per-sample offsets (verified against Figma's own metadata pixel values) via `(segmentIndex + (percentage − levelMin) / (levelMax − levelMin)) × 25`, using the same thresholds as `getParticipationLevel`/`LEVEL_RANGES` — a single source of truth, and still a continuous formula (not Figma's fixed per-variant pixel offsets), so it keeps working for any `percentage`, not just the three sample values.
- **Marker shape is a downward triangle plus a thin vertical stem** (`bg-muted-foreground`) spanning from just above the bar down into it, matching Figma's "Marker" vector asset (a triangle-topped line, not a bare triangle) — a bare CSS triangle with no stem read as visually incomplete next to Figma's reference.
- Reuse `Button` (`variant="outline" size="sm"`) for the three action buttons rather than hand-rolling button markup — their border/shadow/focus/hover treatment already matches Figma's skeuomorphic button reference exactly (`shadow-button-inset` is pixel-for-pixel Figma's "shadow-xs-skeuomorphic" effect; the border color, `border`/`border-primary` `#d5d7da`, is also an exact match, verified by sampling rendered pixels). Three local overrides via `className` bring the instances themselves closer to Figma's exact button spec without changing the shared `Button` primitive (which other call sites still use as-is):
  - `h-auto py-2` (was the `sm` size's fixed `h-8`/32px) — Figma's buttons are 38px tall, which falls out naturally from `py-2` (8px) plus `text-sm`'s 22px line-height; a fixed 32px read as visibly more cramped/heavier-bordered than Figma's more generous button.
  - `size-5` on each icon (was the `Button` base class's default `size-4`/16px for any icon without an explicit size class) — Figma's icons are 20px.
  - `gap-1` (was `sm`'s `gap-1.5`/6px) — Figma uses 4px between icon and label.
  - `text-muted-foreground` for icon/label color (was unset, inheriting the ambient near-black `foreground`, confirmed by sampling rendered pixels at `#181d27`) — Figma's button text/icon color is `text-secondary-700` (`#414651`), a root-only auth-surface token per `DESIGN.md`, so per this component's own established precedent (see Design tokens used above) it uses the closest theme-aware token instead rather than reproducing a color with no verified `.dark` value.
- Icons: `lucide-react`'s `Lightbulb`, `TrendingUp`, `QrCode` for Quick Tip / Last 4 Weeks / Share Your Link respectively (matching `iconLibrary` in `components.json`) — Figma's own icon names are `lightbulb-02`, `line-chart-up-02`, `qr-code-01`; these are the closest stable `lucide-react` equivalents, not pixel-identical to Figma's icon set (same category of approximation as `GoogleIcon`).
- Donut chart is a hand-built SVG (stroke-based ring, not a fetched/rasterized asset) so it can respond to an arbitrary `percentage` value — Figma's version is a set of pre-rendered PNGs per sample state, which can't generalize to real data. Track ring uses `stroke-border-secondary` (confirmed an exact match — see `DESIGN.md` Known gaps); the value arc uses `stroke-status-success`/`stroke-status-warning` per the derived level; the center percentage label uses `text-muted-foreground` (see Design tokens used above for why not Figma's literal `text-secondary-700`). Marked `aria-hidden` (see Accessibility).
- Single use site today (no consuming dashboard route yet) — colocated at `src/components` rather than a route's `_components` because it's an app-level (not route-specific) business component per `CLAUDE.md`'s structure guidance, and is expected to be consumed by a future dashboard route. Internal helpers (the donut renderer, the scale bar) are kept as unexported functions in the same file rather than extracted, per `CLAUDE.md`'s anti-premature-abstraction guidance — extract to shared primitives only once a second real chart/scale-bar use case appears.
- Don't skip the `Known gaps` items above (no dark-mode tokens, approximated donut track color, no 0%-state design, unverified responsive behavior) when promoting this component out of `Draft` — resolve them for real or get explicit product sign-off to ship without them.
- The outer shell (`p-2 shadow-card rounded-2xl` wrapping an inner bordered `rounded-md` panel) is the same nested-card shape as `AuthCard`, built locally rather than importing/extending it — `AuthCard` is intentionally route-colocated and fixed-width for the auth surface specifically, and (being fixed-light) uses `border-black/10` for its inner hairline where this component uses the theme-aware `border` instead (see the token-choice note above). This is now the *second* real instance of the nested-shell shape; if a third appears, extract it into a shared primitive (e.g. under `src/components`) instead of a third copy-paste.

### Visual examples

Rendered at `/design-system/components#heartchartsummary` (Low / Growing / Exceptional sample states), with a dedicated showcase page at `/design-system/components/heart-chart` (props table, accessibility notes, responsive behavior, and Figma reference in full). Not yet rendered in a real dashboard route — no such route exists in the app yet.
