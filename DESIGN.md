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
- **`GlobalNav` is a theme-fixed *dark* surface** — the inverse case of the bullet above. Its Figma reference (both the collapsed rail and the expanded panel) only ever shows one dark-chrome treatment, regardless of the app's light/dark toggle, so its `nav-*` tokens (see Color tokens below) are defined once, independent of `:root`/`.dark`, the same way the auth tokens are root-only. Some `nav-*` values are numerically coincidental with theme-swappable tokens elsewhere (e.g. `nav-active-to` == `muted-foreground`, `nav-active-from` == `text-tertiary`, `nav-surface-from` == `foreground`) — kept as independent tokens anyway so `GlobalNav` doesn't invert when `.dark` is toggled on an ancestor.

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
| `sidebar*` | `bg-sidebar`, `text-sidebar-foreground`, etc. | Sidebar-specific surface/text/border/ring, kept separate from the main surface so a sidebar can theme independently. Not used by `GlobalNav` — see `nav-*` below; this pre-existing `sidebar*` family is shadcn/ui's generic scaffold and has no Figma reference of its own yet. |
| `nav-bg` | `bg-nav-bg`, `border-nav-bg` | `GlobalNav`'s account-card avatar ring / online-indicator border punch-through — `#0c0e12` |
| `nav-surface-from` / `nav-surface-to` | `from-nav-surface-from`, `to-nav-surface-to` | `GlobalNav`'s top-to-bottom chrome gradient (used at `/90` opacity) — `#181d27` → `#0d121c` |
| `nav-border` | `border-nav-border` | `GlobalNav`'s account-card border — `#22262f` |
| `nav-active-from` / `nav-active-to` | `from-nav-active-from`, `to-nav-active-to` | `GlobalNav`'s active-item gradient pill (e.g. "Home") — `#535862` → `#717680` |
| `nav-foreground` | `text-nav-foreground` | `GlobalNav`'s primary text (active item label, account name, wordmark) — `#f7f7f7` |
| `nav-foreground-muted` | `text-nav-foreground-muted` | `GlobalNav`'s default (non-active) item label color — `#cecfd2` |
| `nav-foreground-subtle` | `text-nav-foreground-subtle` | `GlobalNav`'s section subheadings, supporting text (email, tagline) — `#94979c` |
| `nav-success` | `bg-nav-success` | `GlobalNav`'s account-card online indicator — `#47cd89`, distinct from `status-success` (different hue/value, no shared source) |
| `highlight-gold` | `text-highlight-gold` | Personalized-emphasis text color — e.g. the church name on the `/welcome` first-run screen's heading (`"Let's get **Fellowship of the Parks** ready..."`). `#e9c481`, a warm gold distinct from `primary`/`text-brand`/`status-warning*`. Root-only, same rationale as the `nav-*` tokens above — `/welcome` is a fixed-dark surface (it reuses `nav-foreground`/`nav-foreground-muted` directly for its body text; this is the one genuinely new color the screen needs), not swapped by `.dark`. |

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
| `rounded-3xl` | Tailwind's built-in default (24px) — matches Figma's "radius-4xl" naming exactly by value despite the differing name (same class of naming mismatch as `rounded-2xl` above); used for the `/welcome` first-run screen's outer chrome corner. No token change needed. |

Use these scale utilities, not arbitrary `rounded-[Npx]` values, so a future change to `--radius` propagates everywhere.

### Typography system

- **Fonts**: `Geist` (sans), `Geist Mono` (mono), and `Fraunces` (display/serif), loaded via `next/font/google` in `src/app/layout.tsx` and exposed as `--font-geist-sans` / `--font-geist-mono` / `--font-fraunces`, mapped to Tailwind's `--font-sans` / `--font-mono` / `--font-display` in `src/tokens/typography.css`. Use the `font-sans` / `font-mono` / `font-display` utilities — don't import another font or hardcode a `font-family`.
  - The Figma source specifies `Inter` for body text; this was a deliberate call to keep Geist as the established codebase convention rather than add a second body font — visually very close, not pixel-identical.
  - The Figma source specifies `Financier Display` (a licensed Klim Type Foundry face) for display headings (e.g. `/create-profile`'s "Create profile" title and the "Free Membership" pricing card title) — unavailable via `next/font/google` or any other package source in this environment. `Fraunces` is the substitute: a warm, editorial, high-contrast serif available at the `light` (300)/`regular` (400) weights the Figma source uses, matching the "warm, editorial, trustworthy" brand principle above. This is the same category of approximation as Geist/Inter — visually close, not pixel-identical — and resolves the "Financier Display foundation gap" previously flagged as blocking in `COMPONENTS.md` (`Card`, `PricingCard`).
- **Scale**: use Tailwind's default type scale (`text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, …) rather than one-off `text-[Npx]` values. Pair size with an explicit weight (`font-medium`, `font-semibold`) and, for headings, `tracking-tight`.
- **Display scale** (`font-display` only, never paired with `font-sans`): two sizes, both defined in `src/tokens/typography.css` with fixed pixel line-heights, matching the two display headings on the `Onboarding/Create Profile` Figma frame:

  | Utility | Size | Line-height | Weight (Figma) | Used for |
  |---|---|---|---|---|
  | `text-display-sm` | 30px | 38px | `font-normal` (400) | `PricingCard`'s "Free Membership" title |
  | `text-display-md` | 36px | 40px | `font-light` (300) | `Card`'s `CardTitle` on `/create-profile` ("Create profile") |
  | `text-display-lg` | 48px | 50px | `font-light` (300) | The `/welcome` first-run screen's subheading ("Let's get {church} ready to strengthen relationships.") |
  | `text-display-2xl` | 72px | 90px | `font-light` (300) | The `/welcome` first-run screen's main heading ("Welcome, {name}.") |

  Always pair `text-display-sm`/`text-display-md`/`text-display-lg`/`text-display-2xl` with `font-display` and the Figma-specified weight (`font-light` or `font-normal`) — these sizes don't apply to `font-sans` content. `text-display-2xl` additionally carries a Figma-specified `-1.44px` letter-spacing (`tracking-[-1.44px]` at the call site — an arbitrary one-off value, same precedent as `AmfmLogo`'s tagline tracking, not promoted to a token since no second use case exists yet).

  **Provenance note**: `text-display-2xl`'s values come directly from Figma's own named `display-2xl` size/line-height variables on the `/welcome` heading node — the strongest-sourced of the four sizes. `text-display-lg`'s 48px/50px is read off the same node's inline export values; the file's style catalogue lists a named "Display lg/Light" style but the export didn't expose its exact number directly, so treat this one as a close reproduction, not a variable-sourced exact confirmation, until spot-checked directly against Figma.
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
| `shadow-button-inset` | The skeuomorphic finish on the solid `default` button: an outer `shadow-xs`-equivalent drop shadow plus a two-layer inset ring (a 1px full-perimeter highlight + a 2px bottom shade) that gives the brand-filled button a subtle "pressed glass" edge. `outline` (and other bordered/flat variants) use plain `shadow-xs` instead — stacking the inset ring on top of a real border on a light background doubles the edge into a heavier line than Figma's reference, since the ring is designed to read as a highlight *inside* a saturated fill, not alongside a neutral border. |

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
- **Width-collapsing panels** (e.g. `GlobalNav`'s rail-to-panel expansion) use plain Tailwind transition utilities directly at the call site rather than `tw-animate-css`'s enter/exit classes, since this isn't a mount/unmount animation — it's a continuous property change on an element that stays mounted throughout: `transition-[width]` (or `transition-[max-width,opacity,padding,gap]` on inner content) with Tailwind's built-in `duration-300 ease-in-out`. No new duration/easing token was needed since these are Tailwind's default scale values, not invented ones. Keep the underlying content (icon, label) mounted across both states and animate `max-width`/`opacity` on the label rather than swapping markup, so the transition is a smooth morph, not a swap/jump — see `GlobalNav` in `COMPONENTS.md` for the full technique.
- Motion communicates state change (open/close, enter/exit) — it is not decoration. Don't add an animation that isn't justified by the interaction it represents.
- **Respect motion preferences**: any custom scroll/animation behavior (e.g. the DPOsystem story carousel's `scroll-smooth`) must have a `motion-reduce:` fallback (`motion-reduce:scroll-auto`) so `prefers-reduced-motion` users get an instant, non-animated equivalent. Same rule for `GlobalNav`'s expand/collapse transitions — every `transition-*` utility it uses is paired with `motion-reduce:transition-none`.

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
- **Live validation over submit-time-only feedback**: where a field has checkable rules a user can satisfy while typing (e.g. password requirements), surface each rule's current pass/fail state continuously (see `PasswordRequirementItem` in `COMPONENTS.md`) rather than waiting for submit to reveal what's wrong — pair it with the equivalent native HTML constraint (`minLength`, `pattern`) so the same rule is enforced for keyboard/assistive-tech users who submit before the visual state is read.
- **Every interactive flow needs a real Success state, not just a happy-path submit handler** — a control that only implements loading/error and silently does nothing on success reads as broken. See `SignupSuccess` in `COMPONENTS.md` for the sign-up flow's confirmation state.

## Known gaps

- **`status-success`/`status-warning` (and their paired `-strong`/`-subtle` shades) are root-only** — the `HeartChartSummary` Figma component (node `1993:36348`) has no dark-mode variant, so there's no dark-theme reference value to add yet. `HeartChartSummary` otherwise participates in the themed app shell (unlike `AuthCard`'s deliberate fixed-light surface), so this is a real gap, not a design decision — add `.dark` values once a dark-mode Figma reference exists, per `COMPONENTS.md#heartchartsummary`.
- ~~`HeartChartSummary`'s donut-chart track color is approximated~~ **Resolved**: Figma still renders the pie chart as pre-rendered raster PNGs (baked-in colors, not exposed as CSS in the design-to-code export), but the Figma MCP's variable inspection on the pie-chart node resolved its fill to `Component colors/Utility/Gray/utility-gray-200` (`#e9eaeb`) — the exact same value already backing `border-secondary`. The donut track now uses `stroke-border-secondary` (was `stroke-muted`, a near-white approximation that read as washed-out against Figma's clearly-visible ring). The value arc's `status-success`/`status-warning` mapping was already an exact token match, confirmed the same way.
- **`HeartChartSummary` has no visual design for 0% ("Early"/no-engagement) participation** — the Figma component only defines "Low", "Growing", and "Exceptional" variants (1–44%, 45–74%, 75–100%), despite its own dev annotations naming a fourth "No Engagement — Starting" tier at 0%. Implemented conservatively by falling back to the "Low" visual treatment at 0%, per `IMPLEMENTATION.md`'s Figma-integration guidance — flag for a real design once/if a 0% state is designed.
- The `/login` background photograph (previously blocked on the Figma asset host being unreachable) has since been resolved: the photo was supplied directly and committed to `public/login-background.jpg`. It now renders via `PhotoBackdrop` (see `COMPONENTS.md`). The "Log in with Google" icon remains a hand-authored SVG rather than a fetched raster — reasonably close to the Google "G" mark, not pixel-identical to the Figma source.
- The HeartChart wordmark logo (previously in this same boat) has since been resolved: the exported asset was supplied directly and committed to `public/heartchart-logo.svg` (see `COMPONENTS.md`).
- ~~The "Financier Display" foundation gap (no display type scale defined)~~ **Resolved**: see Typography system above — `Fraunces` substitutes for the licensed `Financier Display` face, and `text-display-sm`/`text-display-md` are now real tokens. This unblocks `Card`'s `CardTitle` on `/create-profile` and `PricingCard`'s title, both previously withheld pending this.
- **`/create-profile`'s dark-mode support is partial** — `Card` itself correctly themes with `.dark` (verified), but the screen's labels, description, borders, and `PricingCard` content use the auth/onboarding-derived root-only tokens (see "Auth/onboarding surfaces are theme-fixed" above), so they keep their light-theme values against the dark card surface. Legible, not a contrast failure, but not true dark-mode color adaptation — no dark-mode Figma reference exists for this frame yet. See `COMPONENTS.md#card`.
- ~~`PasswordRequirementItem`'s "met" state had no Figma reference~~ **Resolved by product decision**: Figma's `Onboarding/sign up` frame only ever shows the password checklist in its default (unmet) state, so there was no pixel source for what "met" should look like. Implemented using the `status-success` token (the same one `HeartChartSummary` uses for its positive states) by deliberate analogy rather than left unbuilt — see `COMPONENTS.md#passwordrequirementitem` Implementation rules for the full rationale. Revisit if a real Figma reference ever specifies a different "met" treatment.
- **`SignupSuccess` has no Figma reference at all** — the Figma file's Signup section (`Onboarding/sign up` → `Onboarding/Create Profile` → `Onboarding/Select Membership` → `Onboarding/payment info`) never defines a "sign-up succeeded" confirmation frame. Built from already-verified tokens/primitives (`status-success`, `Button`) to satisfy the "every interactive flow needs a Success state" principle above rather than leave the sign-up form's success path unimplemented. Kept at `Draft` status in `COMPONENTS.md` for this reason — revisit its layout/copy once a real Figma frame exists.
- **`AmfmLogo`'s source asset remains unavailable**: the Figma asset host (`www.figma.com`) is blocked by this environment's outbound network policy for direct download (distinct from the Figma MCP integration itself, which can still read design data) — the same class of gap previously resolved for the login photo and HeartChart wordmark by having the real export supplied directly, which hasn't happened yet here. Implemented as a hand-authored text wordmark approximation instead (same tier of approximation as `GoogleIcon` — see `COMPONENTS.md#amfmlogo`), rather than left unimplemented, since it's a small, low-fidelity-risk mark (short wordmark + caption) unlike a photo or detailed logotype. The approximation now includes the mark's tagline ("Association of Marriage & Family Ministries"), read off a Figma screenshot crop, which the first version of this component omitted entirely — still not pixel-verified against the real mark. Replace with the real exported asset once available, per `HeartChartLogo`'s "don't re-derive this from code" precedent. Note this is a *separate* asset/component from `GlobalNav`'s wordmark below, which has since been resolved.
- ~~`cn()`/`tailwind-merge` silently dropped custom `text-display-sm`/`text-display-md` font-size classes whenever combined with a text-color utility~~ **Resolved**: `tailwind-merge`'s built-in `font-size` class group only recognizes Tailwind's default `text-*` scale, so it classified this project's custom display-scale tokens as generic `text-color` utilities instead — meaning `cn("text-display-md", "text-foreground")` (exactly `/create-profile`'s `CardTitle`) kept only `text-foreground` and silently dropped the font-size class, rendering the title at the browser's default size instead of 36px. Fixed once, at the root, in `src/lib/utils.ts` via `extendTailwindMerge`'s `classGroups` option, rather than per call site — see `COMPONENTS.md#card` Implementation rules for the full mechanism and how to verify it.
- **`GlobalNav` has no real destination routes yet** — the app has no authenticated dashboard/IA built beyond `/`, `/login`, `/signup`, `/create-profile`, and `/design-system`. Only "Home" (`/`) and the two external links (Marriage Ministry Profile, WeDo) are real, verified destinations; every other `href` is a placeholder path pending real routes. See `COMPONENTS.md#globalnav`.
- ~~`GlobalNav`'s wordmark is an approximation~~ **Resolved**: the real exported assets were supplied directly and committed to `public/AMFM_Collaped.svg` (collapsed rail logomark, 48×17) and `public/AMFM_Expanded.svg` (expanded panel lockup, 169×33) — same resolution path as the login photo and HeartChart wordmark. `NavHeader` now renders these via `next/image` (`unoptimized`, matching `HeartChartLogo`'s precedent) instead of hand-authored text; see `COMPONENTS.md#globalnav`.
- ~~`GlobalNav`'s expanded-state logo rendered flush against the rail's left edge instead of aligned with "Your Church" below it~~ **Resolved**: the logo lockup was absolutely positioned (`inset-0`), whose containing block is the header's padding box, so the header's `px-5` indent never actually applied to it. Fixed by setting the indent directly on the logo layer (`left-5`) instead of relying on the wrapper's padding — the same fix already applied to the section headings' `inset-x-5`. See `COMPONENTS.md#globalnav` Implementation rules.
- **`GlobalNav`'s account-card avatar photo remains an approximation** — same tier as `AmfmLogo`/`GoogleIcon`: it renders initials ("OR") instead of the real "Olivia Rhye" photo, since only the wordmark assets (not an avatar photo) have been supplied so far. Replace once a real exported photo is available.
- **`GlobalNav` isn't wired into a real app-shell layout yet** — no authenticated route currently composes it (see the routes gap above). It's demonstrated standalone at `/design-system`; integrate it into `src/app/layout.tsx` (or a dashboard-specific layout) once a real authenticated shell exists, rather than forcing it onto today's public/onboarding routes, which are built on the fixed-light `PhotoBackdrop`/`AuthCard` pattern instead.
- **`GlobalNav`'s account-card flyout menu (Personal Profile, Church Profile, Account Settings, Subscription & Billing, Terms & Privacy) has no Figma node reference** — built from a screenshot supplied directly in conversation rather than a `get_design_context`-fetched node, so its exact spacing/typography is a close visual match, not a pixel-verified one. Its five destination routes are placeholders, same caveat as the rest of `GlobalNav`'s links — see `COMPONENTS.md#globalnav`.
- **`/welcome`'s background photo reuses `public/login-background.jpg`, not a confirmed distinct asset** — the Figma reference shows a different (church-congregation) photo; product decided to ship with the existing login photo as a stand-in rather than block on a new export, per the same "approximate now, swap later" precedent as `AmfmLogo`/`GoogleIcon`. Replace once the real photo is supplied and committed to `public/`.
- **`VideoPlayer`'s video source and captions are placeholders** — no real produced video file or caption track has been supplied yet, so `/welcome` renders the player wired to a real `<video>` element (native play/pause/seek/mute/fullscreen all functional) but without a working `src`/`captionsSrc`. Wire both to real assets before shipping — see `COMPONENTS.md#videoplayer`.
- **`text-display-2xl` was added without an explicit product sign-off round**, unlike `text-display-lg` (both added in the same change) — its 72px/90px/-1.44px values come directly from Figma's own named `display-2xl` variable on the `/welcome` heading node (stronger provenance than `display-lg`'s inline-only values), and building the screen's main heading was impossible without it. Flagged here for visibility rather than silently treated as pre-approved — revisit if design wants a different value.
