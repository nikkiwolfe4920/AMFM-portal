# AMFM Portal — DESIGN.md

**Design foundations only.** This file is the source of truth for brand principles, visual language, and design tokens — the raw material every component is built from. Component-level contracts (anatomy, variants, states, props, a11y, Figma references) live in **[`COMPONENTS.md`](./COMPONENTS.md)**, not here. AI-facing implementation rules live in **[`IMPLEMENTATION.md`](./IMPLEMENTATION.md)**.

```
Figma Design Standards → DESIGN.md → COMPONENTS.md → React Components → /design-system Visual Validation
```

- **Figma** is the visual design artifact.
- **DESIGN.md** (this file) is the design rules — foundations, not components.
- **COMPONENTS.md** is the component behavior contract.
- **Code** (`src/components`, `src/tokens`) is the implementation.
- **`/design-system`** is where the documented standards are rendered and visually validated against Figma.

This documents the tokens and conventions that already exist in the codebase (`src/tokens/*.css`, `src/app/globals.css`, `components.json`) — it doesn't introduce a parallel system. If code and this file disagree, treat it as a bug and reconcile them in the same change.

A living, rendered reference of everything below lives at **`/design-system`** (`src/app/design-system/`) — it renders the actual Tailwind utilities and primitives, not a description of them. If that page and this file disagree, one of them is stale; fix both in the same change.

## Brand principles

- **Origin**: the brand tokens (primary color, extended text/border scale, type line-heights, card/button shadows) were introduced to implement the `/login` screen from Figma ("AMFM Portal" file, node `Onboarding/login`, `1909:25767`) and are now the standard for the rest of the app, not a one-off for that page. See `figma/figma-links.md` for the full node reference list.
- **Warm, editorial, trustworthy**: the brand color is a terracotta/clay tone (`primary`, `#aa6140`), not a generic SaaS blue — used deliberately, not as a placeholder neutral.
- **Tokens over instances**: every visual decision (color, spacing, radius, shadow, type size) must trace back to a named token. A value that can't be named isn't ready to ship — see "Adding a new color token" below before inlining anything new.
- **Consistency over novelty**: reuse an existing token/pattern before introducing a new one, per the Decision Making Hierarchy in `CLAUDE.md`.

## Visual language

- **Style baseline**: shadcn/ui `new-york`, `neutral` base color (`components.json`).
- **Color model**: all color tokens are defined in `oklch()`, not hex/rgb. Add new colors in `oklch()` too, so lightness/chroma stay comparable across the palette. (Figma tokens are specified in hex — convert to `oklch()` before adding, don't inline the hex.)
- **Theming**: light theme in `:root`, dark theme in `.dark` (`src/tokens/colors.css`). Dark mode is class-based (`@custom-variant dark (&:is(.dark *))`, declared in `src/app/globals.css`), not `prefers-color-scheme` — toggling dark mode means adding/removing the `.dark` class on an ancestor (typically `<html>`), not relying on the OS setting alone.
- **Tailwind v4 CSS-first config**: there is no `tailwind.config.js`. All theme tokens are registered via `@theme inline` blocks across `src/tokens/*.css`, imported into `src/app/globals.css`, which maps CSS custom properties to Tailwind utilities (e.g. `--color-primary` → `bg-primary`, `text-primary`, `border-primary`, etc.). New tokens must go through this same token-file + `@theme inline` structure, not a separate config file.
- **Auth/onboarding surfaces are theme-fixed**: the `/login` card (and any sibling onboarding screens built the same way) render as a fixed light surface regardless of the app's light/dark toggle — it sits on a photo background, not the app shell. The tokens unique to it (`text-secondary`, `text-tertiary`, `text-brand`, `border-secondary`, `border-brand`, `border-destructive-subtle`, `fg-disabled`, `overlay`) are therefore only defined in `:root`, not `.dark`. Tokens shared with the rest of the app (`primary`, `foreground`, `border`, `muted-foreground`, …) are defined in both, as before.

## Design tokens

Token source files: `src/tokens/colors.css`, `typography.css`, `spacing.css`, `radius.css`, `shadows.css`, `motion.css` — each `@import`ed into `src/app/globals.css`. Every category maps directly to the sections below; if you add or change a token, update both the CSS file and this section in the same change.

### Color tokens

Defined once per theme (`:root` / `.dark`) as raw values in `src/tokens/colors.css`, then exposed to Tailwind via `@theme inline` as `--color-*`. Always consume the Tailwind utility (`bg-card`, `text-muted-foreground`), never the raw CSS variable or a hardcoded color.

| Token | Utility examples | Purpose |
|---|---|---|
| `background` / `foreground` | `bg-background`, `text-foreground` | Page-level base surface and text. `foreground` = brand "text-primary (900)" `#181d27`. |
| `card` / `card-foreground` | `bg-card`, `text-card-foreground` | Raised content surfaces |
| `popover` / `popover-foreground` | `bg-popover`, `text-popover-foreground` | Floating surfaces (dropdowns, popovers) |
| `primary` / `primary-foreground` | `bg-primary`, `text-primary-foreground` | Brand action color — the terracotta `#aa6140` from the login button, white foreground. This *is* the brand, not a placeholder neutral. |
| `secondary` / `secondary-foreground` | `bg-secondary`, `text-secondary-foreground` | Secondary actions |
| `muted` / `muted-foreground` | `bg-muted`, `text-muted-foreground` | De-emphasized backgrounds/text. `muted-foreground` = brand "text-placeholder" `#717680` — this is what `Input`'s `placeholder:` color resolves to. |
| `accent` / `accent-foreground` | `bg-accent`, `text-accent-foreground` | Hover/highlight states |
| `destructive` | `bg-destructive`, `text-destructive` | Destructive actions, error states |
| `border` | `border-border` | Default border color. = brand "border-primary" `#d5d7da` (form control borders). |
| `border-secondary` | `border-border-secondary`, `bg-border-secondary` | Lighter divider-only border, e.g. the "or" divider rule on `/login`. `#e9eaeb` — distinct from `border`, don't collapse the two. |
| `input` | `border-input` | Form control borders (kept equal to `border`) |
| `ring` | `ring-ring` | Focus ring color |
| `text-secondary` | `text-text-secondary` | Field labels / semibold button text on light surfaces — `#414651` |
| `text-tertiary` | `text-text-tertiary` | Supporting/de-emphasized copy (e.g. divider "or" text, "Don't have an account?") — `#535862` |
| `text-brand` | `text-text-brand` | Brand-colored inline links/text (e.g. "Forgot password", "Sign up") — `#894e34`. Distinct from `primary`: this is a muted, text-legible shade, not the saturated button fill. Also reused as `Button`'s `default`-variant hover fill — see `COMPONENTS.md`. |
| `border-brand` | `border-border-brand`, `ring-border-brand` | Brand-tinted focus color — `#c07858`. Root-only, same as the other auth-derived tokens above — no dark-mode value has a Figma reference yet. |
| `border-destructive-subtle` | `border-border-destructive-subtle` | Lighter error border tier — `#fda29b` — distinct from `destructive` (which is the saturated fill/ring shade). Not reproducible as an opacity of `destructive` (chroma/hue don't line up cleanly), so it's a real second token, analogous to `border`/`border-secondary`. |
| `fg-disabled` | `text-fg-disabled` | Disabled-state label text — `#a4a7ae`. Distinct from `muted-foreground` (a different, warmer gray per Figma). |
| `overlay` | `bg-overlay` | Dark scrim tint used over background photography — `#0a0d12` |
| `status-success` | `text-status-success`, `from-status-success`, `to-status-success` | Positive participation-level indicator (HeartChartSummary's "Growing"/"Exceptional" states) — `#76936b` |
| `status-success-strong` | `from-status-success-strong` | Darker anchor for the success-state gradient bar — `#647c5a` |
| `status-warning` | `text-status-warning`, `to-status-warning` | Low-participation-level indicator (HeartChartSummary's "Low" state) — `#c88c23`. Deliberately the *darker* of the two warning shades (unlike `status-success`, which is the lighter of its pair) — Figma uses the darker tone for text/emphasis here since the lighter tone alone doesn't meet contrast on white. |
| `status-warning-subtle` | `from-status-warning-subtle` | Lighter anchor for the warning-state gradient bar — `#e3b35e` |
| `chart-1` … `chart-5` | `bg-chart-1`, `text-chart-2`, etc. | Data visualization palette |
| `sidebar*` | `bg-sidebar`, `text-sidebar-foreground`, etc. | Sidebar-specific surface/text/border/ring, kept separate from the main surface so a sidebar can theme independently |

Every `*-foreground` token exists to be paired with its base token for text-on-surface contrast — don't mix a token's foreground with a different surface (e.g. don't use `primary-foreground` text on a `card` background).

**Adding a new color token**: add the raw value to both `:root` and `.dark` in `src/tokens/colors.css` (unless it's an auth/onboarding-only token — see Visual language above), then add the corresponding `--color-*` line in that file's `@theme inline` block. Don't invent a second token for a color that's a Tailwind opacity modifier away from an existing one (e.g. use `bg-primary/90` instead of a new `primary-hover` token), and don't invent one for a color already covered by a Tailwind static color at the right opacity (e.g. the login card's inner hairline border is just `border-black/10`, not a new token).

### Radius

One base token, `--radius: 0.625rem` (`src/tokens/radius.css`, `:root` only — not overridden in `.dark`), expanded into a scale via `@theme inline`:

| Utility | Value |
|---|---|
| `rounded-sm` | `--radius` − 4px (6px) |
| `rounded-md` | `--radius` − 2px (8px) |
| `rounded-lg` | `--radius` (base, 10px) |
| `rounded-xl` | `--radius` + 4px (14px) |
| `rounded-2xl` | Tailwind's built-in default (16px) — not overridden locally, and already matches the brand's `radius-2xl`, so no token change was needed for it. |

Use these scale utilities, not arbitrary `rounded-[Npx]` values, so a future change to `--radius` propagates everywhere.

### Typography system

- **Fonts**: `Geist` (sans) and `Geist Mono` (mono), loaded via `next/font/google` in `src/app/layout.tsx` and exposed as `--font-geist-sans` / `--font-geist-mono`, mapped to Tailwind's `--font-sans` / `--font-mono` in `src/tokens/typography.css`. Use the `font-sans` / `font-mono` utilities — don't import another font or hardcode a `font-family`. (The Figma source specifies Inter; this was a deliberate call to keep Geist as the established codebase convention rather than add a second font — visually very close, not pixel-identical.)
- **Scale**: use Tailwind's default type scale (`text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, …) rather than one-off `text-[Npx]` values. Pair size with an explicit weight (`font-medium`, `font-semibold`) and, for headings, `tracking-tight`.
- **Line-heights are overridden for `xs`/`sm`/`base`** in `src/tokens/typography.css` to fixed pixel values (not the default font-size ratios), to match the brand type scale used throughout `/login`:

  | Utility | Size | Line-height |
  |---|---|---|
  | `text-xs` | 12px | 20px (was ~16px) |
  | `text-sm` | 14px | 22px (was 20px) |
  | `text-base` | 16px | 26px (was 24px) |

  This is a global change (not scoped to `/login`) — every existing `text-sm`/`text-xs`/`text-base` usage picks up the new line-height automatically. Don't add a one-off `leading-[Npx]` where one of these three sizes already applies.
- **Button labels are `font-semibold`**, not `font-medium` — see `Button` in `COMPONENTS.md`.
- **Body text color** is `text-foreground` (set globally on `body` in `globals.css`); use `text-muted-foreground` for placeholder/lowest-emphasis text, `text-text-tertiary` for supporting copy, and `text-text-secondary` for form labels — don't reach for a lower-opacity `text-foreground` as a substitute for any of these.

### Spacing system

- No custom spacing scale (`src/tokens/spacing.css` documents this decision) — use Tailwind's default spacing scale (`p-4`, `gap-6`, `py-8`, etc.) in multiples of `0.25rem`. This was verified against every spacing value in the Figma login screen (2, 4, 6, 8, 12, 16, 20, 24, 32, 64, 160px) — all map exactly onto Tailwind's default scale, so no custom spacing tokens were added.
- Prefer `gap-*` on flex/grid containers over margin utilities on children for spacing between siblings; reserve margin for spacing a single element from unrelated neighbors.
- Common layout rhythm already in use: `p-8` for page-level padding, `gap-6` between major stacked sections, `gap-3` between related inline controls (e.g. a button group) — match these rather than picking arbitrary values per component.

### Shadows

Two custom tokens in `src/tokens/shadows.css` (Tailwind v4 auto-generates `shadow-*` utilities from `--shadow-*` theme keys) alongside Tailwind's built-in `shadow-xs`…`shadow-2xl`:

| Utility | Use |
|---|---|
| `shadow-card` | The elevated white auth card on `/login` — a 3-layer shadow, tinted with the `overlay` color rather than pure black. |
| `shadow-button-inset` | The skeuomorphic finish on solid/outline buttons: an outer `shadow-xs`-equivalent drop shadow plus a two-layer inset ring (a 1px full-perimeter highlight + a 2px bottom shade) that gives buttons a subtle "pressed glass" edge. |

Don't hand-roll either of these as an arbitrary `shadow-[...]` value at a call site; use the token.

## Layout/grid rules

Single source of truth for responsive behavior across design and engineering. Every layout, component, and pattern must adapt across the breakpoints below using Tailwind's responsive utilities (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`).

### Philosophy

This project is mobile-first: build the unprefixed (mobile) layout first, then layer on `sm:`/`md:`/`lg:`/`xl:` overrides as the viewport grows — never the reverse. Responsive layouts must preserve usability, maintain visual hierarchy, prioritize content readability, avoid unnecessary layout shift between breakpoints, and stay accessible (see Accessibility standards below) at every size. Don't design a desktop layout first and retrofit mobile behavior afterward.

### Breakpoints

Use Tailwind's default breakpoints as-is — don't add a custom breakpoint without a design reference that needs one.

| Breakpoint | Min width | Target devices |
|---|---|---|
| `sm` | 640px | Large phones (landscape) |
| `md` | 768px | Tablets (portrait) |
| `lg` | 1024px | Tablets (landscape), small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large / wide monitors |

### Layout strategy by viewport

- **Mobile (below `sm`, <640px)**: single-column layouts; cards full width; content stacks vertically; modals use full-screen or near-full-screen patterns; navigation collapses into a hamburger/menu; no horizontal scrolling; interactions sized for touch.
- **Large phone (`sm`, 640–767px)**: still single-column by default; a two-column layout is allowed only where content stays readable at that width (small card pairs, compact metrics, simple comparisons) — don't force two columns onto content that needs the full width.
- **Tablet (`md`, 768–1023px)**: two-column layouts allowed; sidebar patterns may start to appear; navigation can expand from condensed toward its full form; dashboards may pick up an extra column.
- **Small desktop (`lg`, 1024–1279px)**: three-column layouts allowed; persistent (non-collapsing) horizontal navigation is expected; desktop information density is acceptable.
- **Desktop / wide (`xl`+, 1280px and up)**: content sits in a centered max-width container rather than stretching edge-to-edge; four columns is the ceiling; navigation shows full labels, not icons-only.

### Grid system

All page-level layouts use Tailwind grid utilities, built mobile-first: define the single-column mobile base first, then add `sm:`/`md:`/`lg:`/`xl:` overrides — never start from a desktop grid and collapse it down for smaller viewports. Never exceed four columns at any breakpoint; content that needs more than four needs restructuring (pagination, a different pattern), not a fifth column. Gaps scale with viewport using the existing spacing scale rather than a fixed gap at every size:

| Viewport | Columns | Gap | Tailwind pattern |
|---|---|---|---|
| Mobile (<640px) | 1 | `gap-4` (16px) | `grid-cols-1` |
| Large phone (`sm`+) | 2 max | `gap-4` | `sm:grid-cols-2` |
| Tablet (`md`+) | 2–3 | `gap-5` (20px) | `md:grid-cols-2` / `md:grid-cols-3` |
| Small desktop (`lg`+) | 3–4 | `gap-6` (24px) | `lg:grid-cols-3` / `lg:grid-cols-4` |
| Wide (`xl`+) | 4 max | `gap-6` | `xl:grid-cols-4` |

Dashboard stats / metric cards — one column on mobile, two from `sm`, four from `lg`:

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
```

Reach for this pattern (or the 2–3 column variant from the table above) before inventing a new grid shape — check `/design-system` and existing routes for an equivalent layout first, per "Reuse before creating" in `CLAUDE.md`.

## Motion rules

- Enter/exit transitions use `tw-animate-css` utility classes (`animate-in`/`animate-out`, `fade-in-0`/`fade-out-0`, `zoom-in-95`/`zoom-out-95`) at the call site (e.g. `Dialog`'s content/overlay) — see `src/tokens/motion.css` for where future duration/easing tokens would live once a Figma reference introduces one. There is no custom easing/duration token yet; don't invent one speculatively.
- Motion communicates state change (open/close, enter/exit) — it is not decoration. Don't add an animation that isn't justified by the interaction it represents.
- **Respect motion preferences**: any custom scroll/animation behavior (e.g. the DPOsystem story carousel's `scroll-smooth`) must have a `motion-reduce:` fallback (`motion-reduce:scroll-auto`) so `prefers-reduced-motion` users get an instant, non-animated equivalent.

## Accessibility standards

- **Interactive elements are real elements**: use `<button>` for actions, `<a>`/Next's `Link` for navigation. Don't attach `onClick` to a `<div>` or `<span>` to fake interactivity.
- **Focus states are not optional**: every focusable primitive must keep a visible focus ring — `outline-none` paired with an explicit `focus-visible:` treatment, so focus is only suppressed visually when it's replaced by an equivalent custom indicator, never removed outright.
- **Disabled state**: use the native `disabled` attribute (not just a style). Prefer an explicit flat-token disabled treatment when a Figma disabled state exists to match; fall back to the generic `disabled:opacity-50` pattern otherwise. See `COMPONENTS.md` for per-component specifics.
- **Invalid/error state**: surface `aria-invalid` on form controls and style off of it rather than a separate visual-only "error" prop that can drift out of sync with actual validity.
- **Color is never the only signal**: pair destructive/error styling with an icon or text label, since `destructive` is a single hue and won't be distinguishable to all users.
- **Contrast (WCAG AA)**: text/background pairings must use a token's matching `*-foreground` (e.g. `bg-primary` + `text-primary-foreground`), which are chosen to meet WCAG AA contrast in both themes. Don't override foreground color independently of the background token.
- **Semantic structure**: one `h1` per page, heading levels in order, labels associated to inputs (`<label htmlFor>` or wrapping), and landmark elements (`main`, `nav`, `header`) used where they describe the actual layout region — don't reach for a `div` where a semantic element already fits.
- **Keyboard navigation**: anything that behaves like a custom widget (carousel, dialog, menu) must be fully operable by keyboard, following the matching ARIA pattern (e.g. the DPOsystem story carousel uses `role="region"`/`aria-roledescription="carousel"` wrapping `role="group"`/`aria-roledescription="slide"` panels, with arrow key / Home / End support).

## Interaction principles

- **Predictable feedback**: every interactive control has a visible hover, focus, and (where applicable) active/pressed treatment — a control that looks identical across states reads as broken, not calm.
- **State reflects reality**: `loading`/`disabled` must be backed by real state (a pending request, a real validation failure), never a cosmetic-only prop that can drift out of sync with what's actually happening.
- **Progressive disclosure over new screens**: prefer an in-context pattern (modal, expandable section) over navigating away when the task is a short digression from the current flow — see `Dialog` and the DPOsystem "Learn More" pattern in `COMPONENTS.md`.
- **Touch and pointer parity**: interactive hit targets must be comfortably usable with touch (no target smaller than the platform's minimum tap size) as well as mouse — don't design a control that only works well with a precise pointer.

## Known gaps

- **`status-success`/`status-warning` (and their paired `-strong`/`-subtle` shades) are root-only** — the `HeartChartSummary` Figma component (node `1993:36348`) has no dark-mode variant, so there's no dark-theme reference value to add yet. `HeartChartSummary` otherwise participates in the themed app shell (unlike `AuthCard`'s deliberate fixed-light surface), so this is a real gap, not a design decision — add `.dark` values once a dark-mode Figma reference exists, per `COMPONENTS.md#heartchartsummary`.
- **`HeartChartSummary`'s donut-chart track color is approximated**, not sourced from a token — Figma renders the pie chart as pre-rendered raster PNGs (baked-in colors, not exposed as CSS/variables in the design-to-code export), so the neutral track ring uses `stroke-muted` and the value arc reuses `status-success`/`status-warning` by inference from the rendered screenshot rather than an extracted hex value. Revisit if Figma ever exposes the chart as vector/variable-driven.
- **`HeartChartSummary` has no visual design for 0% ("Early"/no-engagement) participation** — the Figma component only defines "Low", "Growing", and "Exceptional" variants (1–44%, 45–74%, 75–100%), despite its own dev annotations naming a fourth "No Engagement — Starting" tier at 0%. Implemented conservatively by falling back to the "Low" visual treatment at 0%, per `IMPLEMENTATION.md`'s Figma-integration guidance — flag for a real design once/if a 0% state is designed.
- The `/login` background photograph (previously blocked on the Figma asset host being unreachable) has since been resolved: the photo was supplied directly and committed to `public/login-background.jpg`. It now renders via `PhotoBackdrop` (see `COMPONENTS.md`). The "Log in with Google" icon remains a hand-authored SVG rather than a fetched raster — reasonably close to the Google "G" mark, not pixel-identical to the Figma source.
- The HeartChart wordmark logo (previously in this same boat) has since been resolved: the exported asset was supplied directly and committed to `public/heartchart-logo.svg` (see `COMPONENTS.md`).
