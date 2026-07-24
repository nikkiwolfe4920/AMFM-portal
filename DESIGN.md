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
| `button-primary-icon` | `text-button-primary-icon` | Icon color inside primary/brand buttons — Figma `button-primary-icon`, `#d89f88`, distinct from the white text foreground. |
| `secondary` / `secondary-foreground` | `bg-secondary`, `text-secondary-foreground` | Secondary actions. Also `Table`'s header-row background (`#fafafa` in Figma's "Our Marriage Champions" frame, node `3724:23444`) — numerically identical to `muted` in this theme, reused rather than adding a new `bg-table-header` token. |
| `muted` / `muted-foreground` | `bg-muted`, `text-muted-foreground` | De-emphasized backgrounds/text. `muted-foreground` = brand "text-placeholder" `#717680` — this is what `Input`'s `placeholder:` color resolves to. |
| `accent` / `accent-foreground` | `bg-accent`, `text-accent-foreground` | Hover/highlight states |
| `destructive` | `bg-destructive`, `text-destructive` | Destructive actions, error states |
| `border` | `border-border` | Default border color. = brand "border-primary" `#d5d7da` (form control borders). |
| `border-secondary` | `border-border-secondary`, `bg-border-secondary` | Lighter divider-only border, e.g. the "or" divider rule on `/login`. `#e9eaeb` — distinct from `border`, don't collapse the two. |
| `input` | `border-input` | Form control borders (kept equal to `border`) |
| `ring` | `ring-ring` | Focus ring color |
| `text-secondary` | `text-text-secondary` | Field labels / semibold button text on light surfaces — `#414651` |
| `text-tertiary` | `text-text-tertiary` | Supporting/de-emphasized copy (e.g. divider "or" text, "Don't have an account?") — `#535862` |
| `text-brand` | `text-text-brand` | Brand-colored inline links/text (e.g. "Forgot password", "Sign up") — `#894e34`. Distinct from `primary`: this is a muted, text-legible shade, not the saturated button fill. Also reused as `Button`'s `default`-variant hover fill and as `CourseCard`'s shared step-header background (`bg-text-brand`, all 3 steps, exact hex match to Figma's `utility-brand-700` variable, node `3926:27038`) — see `COMPONENTS.md`. |
| `border-brand` | `border-border-brand`, `ring-border-brand` | Brand-tinted focus color — `#c07858`. Root-only, same as the other auth-derived tokens above — no dark-mode value has a Figma reference yet. |
| `border-destructive-subtle` | `border-border-destructive-subtle` | Lighter error border tier — `#fda29b` — distinct from `destructive` (which is the saturated fill/ring shade). Not reproducible as an opacity of `destructive` (chroma/hue don't line up cleanly), so it's a real second token, analogous to `border`/`border-secondary`. |
| `fg-disabled` | `text-fg-disabled` | Disabled-state label text — `#a4a7ae`. Distinct from `muted-foreground` (a different, warmer gray per Figma). |
| `fg-quaternary` | `text-fg-quaternary` | Active low-emphasis utility icon color — Figma `fg-quaternary (400)`, `#a4a7ae`. Same current hex as `fg-disabled`, but separate semantics: do not use the disabled token for active icons. |
| `button-outline-bg` / `button-outline-border` / `button-outline-fg` / `button-outline-icon` | `bg-button-outline-bg`, `border-button-outline-border`, `text-button-outline-fg`, `text-button-outline-icon` | Semantic neutral button tokens used by `Button variant="outline"` and `variant="utilitySegment"`. In `:root`, they map to the Figma light-surface neutral button colors (`background`, `input`, `text-secondary`, `fg-quaternary`). In `.dark`, they map to contrast-safe theme values because no Figma dark neutral-button reference exists yet. |
| `button-outline-reversed-*` | `bg-button-outline-reversed-bg`, `border-button-outline-reversed-border`, `text-button-outline-reversed-fg`, `text-button-outline-reversed-icon`, `hover:bg-button-outline-reversed-hover-bg` | Fixed reversed-outline button tokens for dark photo surfaces and brand-filled bands, used by `Button variant="outlineReversed"`. These do not swap in `.dark`; they intentionally stay white/transparent because the surrounding surface is already fixed-dark or brand-filled. |
| `overlay` | `bg-overlay` | Dark scrim tint used over background photography — `#0a0d12` |
| `status-success` | `text-status-success`, `from-status-success`, `to-status-success` | Positive participation-level indicator (HeartChartSummary's "Growing"/"Exceptional" states) — `#76936b` |
| `status-success-strong` | `from-status-success-strong` | Darker anchor for the success-state gradient bar — `#647c5a` |
| `status-warning` | `text-status-warning`, `to-status-warning` | Low-participation-level indicator (HeartChartSummary's "Low" state) — `#c88c23`. Deliberately the *darker* of the two warning shades (unlike `status-success`, which is the lighter of its pair) — Figma uses the darker tone for text/emphasis here since the lighter tone alone doesn't meet contrast on white. |
| `status-warning-subtle` | `from-status-warning-subtle` | Lighter anchor for the warning-state gradient bar — `#e3b35e` |
| `badge-success-bg` / `badge-success-border` / `badge-success-text` | `bg-badge-success-bg`, `border-badge-success-border`, `text-badge-success-text` | `StatusTag`'s `success` variant (e.g. "Our Marriage Champions" table's "Yes" pill) — `#ecfdf3` / `#abefc6` / `#067647`. A 3-tier bg/border/text pill system, distinct from `status-success` above (built for text/gradient fills, not bordered pill backgrounds) — do not substitute one for the other. |
| `badge-error-bg` / `badge-error-border` / `badge-error-text` | `bg-badge-error-bg`, `border-badge-error-border`, `text-badge-error-text` | `StatusTag`'s `error` variant ("No" pill) — `#fef3f2` / `#fecdca` / `#b42318`. Distinct from `destructive` (a single saturated shade meant for solid fills/rings), same rationale as `badge-success-*` above. |
| `badge-warning-bg` / `badge-warning-border` / `badge-warning-text` | `bg-badge-warning-bg`, `border-badge-warning-border`, `text-badge-warning-text` | `StatusTag`'s `warning` variant ("Invited" pill) — `#fffaeb` / `#fedf89` / `#b54708`. Distinct from `status-warning`/`status-warning-subtle` above, same rationale. |
| `chart-1` … `chart-5` | `bg-chart-1`, `text-chart-2`, etc. | Generic shadcn/ui scaffold data-visualization palette — not yet consumed by any real chart in this codebase; see the HeartChart Dashboard palette below for the tokens real chart components actually use. |
| `chart-pie-purple-700` / `-500` / `-300` / `-100` | `bg-chart-pie-purple-700`, etc. | `PieChartCard`'s "new to following Jesus" instance — a 4-tier sequential purple palette (HeartChart Dashboard, node `3727:29573`). |
| `chart-pie-green-400` / `-300` / `-100` | `bg-chart-pie-green-400`, etc. | `PieChartCard`'s "connected to God" instance — a 4-tier sequential green palette; the darkest tier reuses `status-success` directly (Figma's `utility-green-500`, `#76936b`, is an exact hex match — verified by converting it through the same sRGB→oklch pipeline as every other value in this table and getting an identical result to the existing token), so only the 3 lighter tiers are new tokens. |
| `chart-scale-blue-400` / `-100` / `-50` / `-25` | `bg-chart-scale-blue-400`, etc. | `ScaleChartCard`'s horizontal scale/track — a 4-tier blue/teal palette, distinct from every other chart color family on the dashboard. |
| `chart-participation-fill` | `bg-chart-participation-fill` | `ParticipationVerticalBarCard`/`ParticipationHorizontalBarCard`'s bar fill — a slightly deeper tier of the same Figma yellow scale as `background-gradient-from`, kept as its own token since it serves a different purpose (chart fill vs. page background) despite the visual proximity. |
| `sidebar*` | `bg-sidebar`, `text-sidebar-foreground`, etc. | Sidebar-specific surface/text/border/ring, kept separate from the main surface so a sidebar can theme independently. Not used by `GlobalNav` — see `nav-*` below; this pre-existing `sidebar*` family is shadcn/ui's generic scaffold and has no Figma reference of its own yet. |
| `nav-bg` | `bg-nav-bg`, `border-nav-bg` | `GlobalNav`'s account-card avatar ring / online-indicator border punch-through — `#0c0e12` |
| `nav-surface-from` / `nav-surface-to` | `from-nav-surface-from`, `to-nav-surface-to` | `GlobalNav`'s top-to-bottom chrome gradient (used at `/90` opacity) — `#181d27` → `#0d121c` |
| `nav-border` | `border-nav-border` | `GlobalNav`'s account-card border — `#22262f` |
| `nav-active-from` / `nav-active-to` | `from-nav-active-from`, `to-nav-active-to` | `GlobalNav`'s active-item gradient pill (e.g. "Home") — `#535862` → `#717680` |
| `nav-foreground` | `text-nav-foreground` | `GlobalNav`'s primary text (active item label, account name, wordmark) — `#f7f7f7` |
| `nav-foreground-muted` | `text-nav-foreground-muted` | `GlobalNav`'s default (non-active) item label color — `#cecfd2` |
| `nav-foreground-subtle` | `text-nav-foreground-subtle` | `GlobalNav`'s section subheadings, supporting text (email, tagline) — `#94979c` |
| `nav-success` | `bg-nav-success` | `GlobalNav`'s account-card online indicator — `#47cd89`, distinct from `status-success` (different hue/value, no shared source) |
| `highlight-gold` | `text-highlight-gold` | Personalized-emphasis text color — e.g. the church name on the `/welcome` first-run screen's heading (`"Let's get **Fellowship of the Parks** ready..."`). `#e9c481`, a warm gold distinct from `primary`/`text-brand`/`status-warning*`. Root-only, same rationale as the `nav-*` tokens above — `/welcome` is a fixed-dark surface (it reuses `nav-foreground`/`nav-foreground-muted` directly for its body text; this is the one genuinely new color the screen needs), not swapped by `.dark`. Reused unmodified for `TopHero`'s "HeartChart Weekend" emphasis line — same token, same rationale, no new color needed. |
| `background-gradient-from` / `background-gradient-to` | `from-background-gradient-from`, `to-background-gradient-to` | The `/heartchart-resources` page shell's warm-cream background gradient (Figma "HeartChart Resources", node `2361:19280`, `main` frame) — `#f5eee0` → `#fdf9f1`, a near-horizontal (`-90deg`) linear gradient distinct from the plain white `background` token. `.dark` collapses both stops to the flat dark `background` value (see Known gaps) rather than shipping an unverified dark gradient. |

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

- **Fonts**: `Geist` (sans), `Geist Mono` (mono), and `Financier Display` (display/serif), exposed as `--font-geist-sans` / `--font-geist-mono` / `--font-financier-display`, mapped to Tailwind's `--font-sans` / `--font-mono` / `--font-display` in `src/tokens/typography.css`. Use the `font-sans` / `font-mono` / `font-display` utilities — don't import another font or hardcode a `font-family`.
  - The Figma source specifies `Inter` for body text; this was a deliberate call to keep Geist as the established codebase convention rather than add a second body font — visually very close, not pixel-identical.
  - The Figma source specifies `Financier Display` (a licensed Klim Type Foundry face) for display headings (e.g. `/create-profile`'s "Create profile" title and the "Free Membership" pricing card title). The real licensed OTF files were supplied directly and committed to `public/fonts/` (`FinancierDisplayLight.otf`/`Regular`/`Medium`/`Bold`/`Black.otf` — weights 300/400/500/700/900), self-hosted via `next/font/local` in `src/app/layout.tsx` (`next/font/google` can't serve a non-Google-Fonts licensed face). This replaces the earlier `Fraunces`-substitute approximation (a Google Fonts serif previously stood in for the unavailable licensed face) — the display scale now renders the actual Figma-specified typeface at its real weights, not a visual approximation.
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

  **Page-level `<h1>` headings use `text-display-md`**: confirmed on `/heartchart-resources`'s "Page header" node (`2309:20675`) — `font-display text-display-md font-light`, the same size/weight already established for `CardTitle` on `/create-profile`. Use this pairing for any future page-level `<h1>`, not a generic `text-3xl font-semibold` — the display scale is the correct token family for page titles, not just modal titles.

  **`CourseCard`'s video-cover heading uses a one-off 36px/38px pairing** (Figma: `font-size: display-md` (36px) explicitly paired with `line-height: display-sm` (38px), not either token's own matching line-height) — approximated as `text-display-md` with a local `leading-[2.375rem]` (38px) override, the same technique `CardTitle` already uses to force a specific line-height independent of the token's built-in one (see `Card`'s Implementation rules in `COMPONENTS.md`). Not promoted to a fifth display-scale token for a 2px line-height nuance with a single use site.
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
| `shadow-card` | The elevated white auth card on `/login` — a 3-layer shadow, tinted with the `overlay` color rather than pure black. Figma's own "shadow-lg" effect style (used on `TopHero`, and the `/heartchart-resources` resource cards) resolves to the exact same 3 offset/blur/spread values, confirmed via the Figma MCP's variable inspection — reused as-is, no second token needed. |
| `shadow-button-inset` | The skeuomorphic finish for solid primary/default buttons where Figma's inset treatment sits inside a saturated brand fill. Figma also exports some neutral button instances (for example HeartChart Download QR) as `shadow-xs-skeuomorphic`; the current branch maps neutral outline buttons to semantic neutral outline tokens plus `shadow-xs` because reusing this primary inset token overdraws the neutral edge in browser review. Treat that neutral-outline calibration as an active visual-audit decision until it is accepted or replaced with a dedicated neutral shadow token. Inputs and embedded input segments keep their flatter treatment (`shadow-xs` on the input group, `shadow-none` on the segment). |

Don't hand-roll either of these as an arbitrary `shadow-[...]` value at a call site; use the token.

### Blur overlay

A visual treatment for showing real content as an inert, blurred backdrop behind a centered empty-state call-to-action — rather than hiding it outright — so the eventual populated experience still reads as "there." Introduced for `/marriage-champions-empty` (Figma "Our Marriage Champions / Empty", node `3724:23167`; backdrop layer "image 54", node `3724:23178`); implemented as the `BlurOverlay` component — see `COMPONENTS.md#bluroverlay`.

| Layer | Treatment |
|---|---|
| Blurred content | `blur-[2px]` (matches Figma's own `2px` blur value on the reference layer) |
| Fade mask | `bg-gradient-to-b from-background/0 to-background` — fades the blurred content into the surrounding card surface toward the bottom |

**Deliberate token deviation**: Figma's reference layer fades to a hardcoded white (`to-white`), since the file doesn't model dark mode for this frame. The implementation fades to `bg-background` instead — the same surface token the surrounding `ElevatedCard` already sits on — so the effect stays correct in both themes rather than punching a hardcoded white rectangle into a dark surface. Same category of deliberate token substitution as `Table`/`StatusTag`'s root-only badge tokens elsewhere in this file.

**Deliberate accessibility calibration**: Figma's backdrop layer also lowers the rendered content opacity, but browser accessibility auditing flagged visible table text inside the decorative preview as low contrast. The implementation keeps the blur and fade mask but does not lower child opacity; this preserves the inactive read without making visible text fail contrast.

Always pair the blurred content with `aria-hidden` and `pointer-events-none` — it is decorative only, never a substitute for a real disabled/loading state on content a user is still expected to reach.

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

**Documented exception — `GlobalNav`'s 1600px pinned-open threshold**: `GlobalNav` forces its rail permanently expanded above a 1600px viewport width (see `COMPONENTS.md#globalnav` States/Implementation rules), a value explicitly requested for very wide monitors rather than pixel-sourced from a Figma frame. It's implemented as a component-local `window.matchMedia("(min-width: 1600px)")` check (`PINNED_OPEN_QUERY` in `src/components/global-nav.tsx`), not a new Tailwind `min-[1600px]:` breakpoint utility sprinkled across the codebase — so it doesn't extend the shared breakpoint scale above, and no other component should reach for `1600px` without its own equally explicit design/product requirement.

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

### Stacking order on full-bleed backdrops

`PhotoBackdrop` (see `COMPONENTS.md#photobackdrop`) composes an absolutely-positioned scrim/gradient layer as a sibling of its `children`. Because CSS paints positioned elements above non-positioned ones regardless of DOM order, the scrim renders *on top of* unpositioned content even though it appears first in markup — the content silently loses both visibility and pointer events to the scrim. Every consumer's direct child must therefore be given its own stacking context above the scrim: `relative z-10` (or equivalent). This is not optional per-route styling — it's a structural requirement of composing on `PhotoBackdrop`, and every current consumer (`/login`, `/signup`, `/`, `/create-profile`, `/welcome`) follows it. Match this rule for any future `PhotoBackdrop`-based screen rather than rediscovering it.

`ElevatedCard`'s optional `background` prop (see `COMPONENTS.md#elevatedcard`, added for `TopHero`'s full-bleed photo) is the same pattern in miniature: it's an absolutely-positioned layer bleeding under the outer shell's own padding, so the inner bordered panel that sits beside it in the markup must carry `relative z-10` — which `ElevatedCard` now applies unconditionally on the inner panel, rather than relying on each consumer to remember it.

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
- ~~The "Financier Display" foundation gap (no display type scale defined)~~ **Resolved**: see Typography system above — `text-display-sm`/`text-display-md` are now real tokens. This unblocks `Card`'s `CardTitle` on `/create-profile` and `PricingCard`'s title, both previously withheld pending this.
- ~~`font-display` rendered via `Fraunces`, a Google Fonts substitute for the licensed `Financier Display` face~~ **Resolved**: the real `Financier Display` OTF files (Klim Type Foundry, weights 300/400/500/700/900) were supplied directly and committed to `public/fonts/`, self-hosted via `next/font/local` (see Typography system above). `font-display` now renders the actual Figma-specified typeface, not an approximation — no visual/weight gap remains for the display scale.
- **`/create-profile`'s dark-mode support is partial** — `Card` itself correctly themes with `.dark` (verified), but the screen's labels, description, borders, and `PricingCard` content use the auth/onboarding-derived root-only tokens (see "Auth/onboarding surfaces are theme-fixed" above), so they keep their light-theme values against the dark card surface. Legible, not a contrast failure, but not true dark-mode color adaptation — no dark-mode Figma reference exists for this frame yet. See `COMPONENTS.md#card`.
- ~~`PasswordRequirementItem`'s "met" state had no Figma reference~~ **Resolved by product decision**: Figma's `Onboarding/sign up` frame only ever shows the password checklist in its default (unmet) state, so there was no pixel source for what "met" should look like. Implemented using the `status-success` token (the same one `HeartChartSummary` uses for its positive states) by deliberate analogy rather than left unbuilt — see `COMPONENTS.md#passwordrequirementitem` Implementation rules for the full rationale. Revisit if a real Figma reference ever specifies a different "met" treatment.
- **`SignupSuccess` has no Figma reference at all** — the Figma file's Signup section (`Onboarding/sign up` → `Onboarding/Create Profile` → `Onboarding/Select Membership` → `Onboarding/payment info`) never defines a "sign-up succeeded" confirmation frame. Built from already-verified tokens/primitives (`status-success`, `Button`) to satisfy the "every interactive flow needs a Success state" principle above rather than leave the sign-up form's success path unimplemented. Kept at `Draft` status in `COMPONENTS.md` for this reason — revisit its layout/copy once a real Figma frame exists.
- **`AmfmLogo`'s source asset remains unavailable**: the Figma asset host (`www.figma.com`) is blocked by this environment's outbound network policy for direct download (distinct from the Figma MCP integration itself, which can still read design data) — the same class of gap previously resolved for the login photo and HeartChart wordmark by having the real export supplied directly, which hasn't happened yet here. Implemented as a hand-authored text wordmark approximation instead (same tier of approximation as `GoogleIcon` — see `COMPONENTS.md#amfmlogo`), rather than left unimplemented, since it's a small, low-fidelity-risk mark (short wordmark + caption) unlike a photo or detailed logotype. The approximation now includes the mark's tagline ("Association of Marriage & Family Ministries"), read off a Figma screenshot crop, which the first version of this component omitted entirely — still not pixel-verified against the real mark. Replace with the real exported asset once available, per `HeartChartLogo`'s "don't re-derive this from code" precedent. Note this is a *separate* asset/component from `GlobalNav`'s wordmark below, which has since been resolved.
- **`HeartChartLinkModal`'s phone preview is a static Figma-derived asset, not a live app preview**: the current modal uses `public/heartchart-link-phone-preview.png`, derived from the verified Figma node screenshot (`1903:19737`) because the nested `Screen Insert Designs here` MCP asset exported as an empty transparent PNG while the full node screenshot contained the correct HeartChart phone content. This is acceptable because the preview is decorative (`aria-hidden`), but replace it with a real branded app preview if product later needs dynamic church/logo rendering. The demo QR uses `public/heartchart-link-qr.svg`; real QR generation/download behavior remains an application concern outside the presentational design-system atom. The Figma "Upload your logo in settings" CTA is caller-supplied (`settingsHref`), composes the shared `Button asChild variant="link" size="inline"` text-button pattern, and does not render by default because no real settings route exists yet. `variant="link"` resolves to the inline size by default in `Button`; the modal keeps `size="inline"` explicit only because this documentation names the Figma text-button instance directly.
- ~~`cn()`/`tailwind-merge` silently dropped custom `text-display-sm`/`text-display-md` font-size classes whenever combined with a text-color utility~~ **Resolved**: `tailwind-merge`'s built-in `font-size` class group only recognizes Tailwind's default `text-*` scale, so it classified this project's custom display-scale tokens as generic `text-color` utilities instead — meaning `cn("text-display-md", "text-foreground")` (exactly `/create-profile`'s `CardTitle`) kept only `text-foreground` and silently dropped the font-size class, rendering the title at the browser's default size instead of 36px. Fixed once, at the root, in `src/lib/utils.ts` via `extendTailwindMerge`'s `classGroups` option, rather than per call site — see `COMPONENTS.md#card` Implementation rules for the full mechanism and how to verify it.
- **`GlobalNav` has only a small verified route set** — the app has no authenticated dashboard/IA built beyond the current static routes. Within `GlobalNav`, only "Home" (`/`), "Our Marriage Champions" (`/marriage-champions`), "HeartChart Resources" (`/heartchart-resources`), and the two external links (Marriage Ministry Profile, WeDo) are real, verified destinations; every other `href` is a placeholder path pending real routes and disables Next prefetch. See `COMPONENTS.md#globalnav`.
- ~~`GlobalNav`'s wordmark is an approximation~~ **Resolved**: the real exported assets were supplied directly and committed to `public/AMFM_Collaped.svg` (collapsed rail logomark, 48×17) and `public/AMFM_Expanded.svg` (expanded panel lockup, 169×33) — same resolution path as the login photo and HeartChart wordmark. `NavHeader` now renders these via `next/image` (`unoptimized`, matching `HeartChartLogo`'s precedent) instead of hand-authored text; see `COMPONENTS.md#globalnav`.
- ~~`GlobalNav`'s expanded-state logo rendered flush against the rail's left edge instead of aligned with "Your Church" below it~~ **Resolved**: the logo lockup was absolutely positioned (`inset-0`), whose containing block is the header's padding box, so the header's `px-5` indent never actually applied to it. Fixed by setting the indent directly on the logo layer (`left-5`) instead of relying on the wrapper's padding — the same fix already applied to the section headings' `inset-x-5`. See `COMPONENTS.md#globalnav` Implementation rules.
- **`GlobalNav`'s account-card avatar photo remains an approximation** — same tier as `AmfmLogo`/`GoogleIcon`: it renders initials ("OR") instead of the real "Olivia Rhye" photo, since only the wordmark assets (not an avatar photo) have been supplied so far. Replace once a real exported photo is available.
- **`GlobalNav` isn't wired into the global app layout yet** — it is used by `MarriageChampionsPageShell` for `/marriage-champions` and `/marriage-champions-empty`, directly by `/heartchart-resources`, and demonstrated standalone at `/design-system/components#globalnav`, but it is not mounted in `src/app/layout.tsx` as a universal authenticated shell. Integrate it globally only once the broader dashboard IA exists, rather than forcing it onto today's public/onboarding routes, which are built on the fixed-light `PhotoBackdrop`/`AuthCard` pattern instead. Both real render call sites (`MarriageChampionsPageShell`, shared by `/marriage-champions` and `/marriage-champions-empty`; and `/heartchart-resources` directly) now render `<GlobalNav overlay />` (fixed, viewport-pinned, overlaying content on hover/pinned-open — see `COMPONENTS.md#globalnav`); only the gallery demo omits `overlay`.
- **`GlobalNav`'s account-card flyout menu (Personal Profile, Church Profile, Account Settings, Subscription & Billing, Terms & Privacy) has no Figma node reference** — built from a screenshot supplied directly in conversation rather than a `get_design_context`-fetched node, so its exact spacing/typography is a close visual match, not a pixel-verified one. Its five destination routes are placeholders, same caveat as the rest of `GlobalNav`'s links — see `COMPONENTS.md#globalnav`.
- **`/welcome`'s background photo reuses `public/login-background.jpg`, not a confirmed distinct asset** — the Figma reference shows a different (church-congregation) photo; product decided to ship with the existing login photo as a stand-in rather than block on a new export, per the same "approximate now, swap later" precedent as `AmfmLogo`/`GoogleIcon`. Replace once the real photo is supplied and committed to `public/`.
- ~~`/welcome`'s heading, video card, and "Get Started" button rendered underneath `PhotoBackdrop`'s radial scrim~~ **Resolved**: `/welcome`'s content wrapper (`src/app/welcome/page.tsx`) was missing the `relative z-10` every other `PhotoBackdrop` consumer applies to its direct child, so the scrim's absolute positioning painted it above the unpositioned content per normal CSS stacking rules — visually covering the text/button and swallowing their clicks, despite appearing first in markup. Fixed by adding `relative z-10` to match the other four routes; see the new "Stacking order on full-bleed backdrops" rule above and `COMPONENTS.md#photobackdrop`.
- **`VideoPlayer`'s video source and captions are placeholders** — no real produced video file or caption track has been supplied yet, so `/welcome` renders the player wired to a real `<video>` element (native play/pause/seek/mute/fullscreen all functional) but without a working `src`/`captionsSrc`. Wire both to real assets before shipping — see `COMPONENTS.md#videoplayer`.
- **`text-display-2xl` was added without an explicit product sign-off round**, unlike `text-display-lg` (both added in the same change) — its 72px/90px/-1.44px values come directly from Figma's own named `display-2xl` variable on the `/welcome` heading node (stronger provenance than `display-lg`'s inline-only values), and building the screen's main heading was impossible without it. Flagged here for visibility rather than silently treated as pre-approved — revisit if design wants a different value.
- **`TopHero`'s background photo, `CourseCard`'s three per-step video thumbnails, and `FooterCta`'s background texture are all unavailable in this environment** — same root cause as `AmfmLogo`'s blocked asset: the Figma MCP's `download_assets`/raw-image URLs all resolve to `www.figma.com`, which this environment's egress policy denies (confirmed via the agent proxy status endpoint — a `403` policy denial, not a transient failure), so the real exports can't be fetched even though the Figma MCP's *design data* (structure, tokens, copy) is reachable. This was re-confirmed against the current Figma reference (node `4194:25820`): `download_assets` still returns only `www.figma.com` asset URLs, and a direct `curl` to one from this sandbox still gets rejected by the agent proxy (`CONNECT tunnel failed, response 403`). `TopHero` and `CourseCard` render a `nav-surface-from`→`nav-surface-to` dark gradient in place of the real photos (plus, for `TopHero`, Figma's own left-to-right legibility scrim, now positioned to bleed to the card's true outer edge — see `COMPONENTS.md#tophero`); `FooterCta` renders a flat `bg-primary` instead of Figma's warm gradient/noise texture. Replace all four with the real exported assets the moment they're supplied and committed to `public/`, per `AmfmLogo`'s established precedent — don't leave the placeholder gradients as a permanent design decision. The card's structure/height/border are otherwise pixel-matched to Figma (512px fixed height, full-bleed background layer, `border-white/30` pinstripe inset) independent of this gap — only the photo itself is a placeholder.
- **`background-gradient-from`/`background-gradient-to` are root-only** — no Figma dark-mode reference exists for the `/heartchart-resources` page shell. Unlike `status-success`/`status-warning` (which stay root-only and rely on their *consuming component* already being on a theme-aware surface), the background gradient is the outermost page background every unthemed element sits on directly — leaving it light-only broke the page `<h1>`'s contrast when `.dark` was toggled (theme-aware `text-foreground` turned near-white against a backdrop that stayed light). Fixed by giving `.dark` a real fallback (both stops collapse to the flat dark `background` value) rather than leaving the page shell effectively non-theme-aware — see `src/tokens/colors.css`. Revisit with a real gradient once a Figma dark-mode reference exists.
- **`badge-success-*`/`badge-error-*`/`badge-warning-*` are root-only** — the "Our Marriage Champions" Figma frame (node `3724:23444`) that introduced `StatusTag` has no dark-mode reference, same class of gap as `status-success`/`status-warning`/`nav-*`/`highlight-gold` above. Add `.dark` values once a dark-mode Figma reference exists.
- **`ElevatedCard` (the shared "outer shadow-card shell + inner bordered panel" primitive) does not retrofit `AuthCard` or `HeartChartSummary`** — per `HeartChartSummary`'s own documented precedent ("this is now the second real instance of the nested-shell shape; if a third appears, extract it into a shared primitive"), `TopHero` and the `/heartchart-resources` resource cards are the third and fourth instances, so the shape was extracted to `src/components/elevated-card.tsx` for their use. `AuthCard` (route-colocated, fixed-light, `border-black/10`) and `HeartChartSummary` (already-shipped, separately verified) were deliberately left as-is in the same change to keep the diff scoped — a reasonable follow-up is migrating both onto `ElevatedCard` once a next real touch to either component justifies the refactor.
- **`/marriage-champions-empty`'s "Invite Marriage Champions" button has no wired invite modal** — the Figma file defines one (`3724:23382`, "Modal / invite user"), but only the button's own visual/token contract was in scope for this pass. Wire it to a real `Dialog` (see `COMPONENTS.md#dialog`) once the invite flow is built, rather than leaving the button a dead click target indefinitely.
- **The HeartChart Dashboard data-viz palette (`chart-pie-*`/`chart-scale-blue-*`/`chart-participation-fill`) is root-only** — no dark-mode Figma reference exists for the "HeartChart Dashboard / premium" frame (node `3727:29573`), same class of gap as `status-success`/`badge-*`/`nav-*` above. Add `.dark` values once a dark-mode Figma reference exists.
- **`FullWidthBarChart`'s bars reuse the existing `primary`/`border-brand` tokens rather than a new chart token** — the Figma frame's bar color reads as a member of the same brand/terracotta family already tokenized (`utility-brand-600`/`#aa6140` is an exact match to `primary`; `utility-brand-500`/`#c07858` matches `border-brand`), so no new token was added per `DESIGN.md`'s "don't invent a second token for a color already covered" rule. This is a closer visual approximation than a pixel-exact per-bar gradient read directly off the node (Figma sub-node color inspection for this specific instance was not reliably resolvable in this environment — see `COMPONENTS.md#fullwidthbarchart` Implementation rules); revisit if a direct node pull later shows a different exact shade.
- **`GlobalNav`'s "Our Marriage Champions" nav item only routes to `/marriage-champions`** — `/marriage-champions-empty` exists purely to demonstrate Figma's "Empty" frame as a `/design-system`-indexed screen (matching the "one Figma frame → one route" precedent already established for `/welcome`, `/heartchart-resources`, etc.), not as a second navigable app state, so it won't show as the active nav item. Revisit once/if the product direction is to render the empty state conditionally on `/marriage-champions` itself (zero real team members) rather than as a separate route.
