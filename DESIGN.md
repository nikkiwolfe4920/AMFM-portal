# AMFM Portal — DESIGN.md

Design system reference for this repository. This documents the tokens and conventions that already exist in the codebase (`src/app/globals.css`, `components.json`, `src/components/ui/*`) — it doesn't introduce a parallel system. If code and this file disagree, treat it as a bug and reconcile them in the same change.

A living, rendered reference of everything below lives at **`/design-system`** (`src/app/design-system/page.tsx`) — it renders the actual Tailwind utilities and primitives, not a description of them. If that page and this file disagree, one of them is stale; fix both in the same change.

**Origin**: the brand tokens (primary color, extended text/border scale, type line-heights, card/button shadows) were introduced to implement the `/login` screen from Figma ("AMFM Portal" file, node `Onboarding/login`, `1909:25767`) and are now the standard for the rest of the app, not a one-off for that page.

## Foundations

- **Style**: shadcn/ui `new-york`, `neutral` base color (`components.json`).
- **Color model**: all color tokens are defined in `oklch()`, not hex/rgb. Add new colors in `oklch()` too, so lightness/chroma stay comparable across the palette. (Figma tokens are specified in hex — convert to `oklch()` before adding, don't inline the hex.)
- **Theming**: light theme in `:root`, dark theme in `.dark` (`src/app/globals.css`). Dark mode is class-based (`@custom-variant dark (&:is(.dark *))`), not `prefers-color-scheme` — toggling dark mode means adding/removing the `.dark` class on an ancestor (typically `<html>`), not relying on the OS setting alone.
- **Tailwind v4 CSS-first config**: there is no `tailwind.config.js`. All theme tokens are registered via `@theme inline` in `globals.css`, which maps CSS custom properties to Tailwind utilities (e.g. `--color-primary` → `bg-primary`, `text-primary`, `border-primary`, etc.). New tokens must go through this same `@theme inline` block, not a separate config file.
- **Auth/onboarding surfaces are theme-fixed**: the `/login` card (and any sibling onboarding screens built the same way) render as a fixed light surface regardless of the app's light/dark toggle — it sits on a photo background, not the app shell. The tokens unique to it (`text-secondary`, `text-tertiary`, `text-brand`, `border-secondary`, `overlay`) are therefore only defined in `:root`, not `.dark`. Tokens shared with the rest of the app (`primary`, `foreground`, `border`, `muted-foreground`, …) are defined in both, as before.

## Design tokens

### Color tokens

Defined once per theme (`:root` / `.dark`) as raw values, then exposed to Tailwind via `@theme inline` as `--color-*`. Always consume the Tailwind utility (`bg-card`, `text-muted-foreground`), never the raw CSS variable or a hardcoded color.

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
| `text-brand` | `text-text-brand` | Brand-colored inline links/text (e.g. "Forgot password", "Sign up") — `#894e34`. Distinct from `primary`: this is a muted, text-legible shade, not the saturated button fill. |
| `overlay` | `bg-overlay` | Dark scrim tint used over background photography — `#0a0d12` |
| `chart-1` … `chart-5` | `bg-chart-1`, `text-chart-2`, etc. | Data visualization palette |
| `sidebar*` | `bg-sidebar`, `text-sidebar-foreground`, etc. | Sidebar-specific surface/text/border/ring, kept separate from the main surface so a sidebar can theme independently |

Every `*-foreground` token exists to be paired with its base token for text-on-surface contrast — don't mix a token's foreground with a different surface (e.g. don't use `primary-foreground` text on a `card` background).

**Adding a new color token**: add the raw value to both `:root` and `.dark` (unless it's an auth/onboarding-only token — see Foundations above), then add the corresponding `--color-*` line in `@theme inline`. Don't invent a second token for a color that's a Tailwind opacity modifier away from an existing one (e.g. use `bg-primary/90` instead of a new `primary-hover` token — see Button's `hover:bg-primary/90`), and don't invent one for a color already covered by a Tailwind static color at the right opacity (e.g. the login card's inner hairline border is just `border-black/10`, not a new token).

### Radius

One base token, `--radius: 0.625rem` (`:root` only — not overridden in `.dark`), expanded into a scale via `@theme inline`:

| Utility | Value |
|---|---|
| `rounded-sm` | `--radius` − 4px (6px) |
| `rounded-md` | `--radius` − 2px (8px) |
| `rounded-lg` | `--radius` (base, 10px) |
| `rounded-xl` | `--radius` + 4px (14px) |
| `rounded-2xl` | Tailwind's built-in default (16px) — not overridden locally, and already matches the brand's `radius-2xl`, so no token change was needed for it. |

Use these scale utilities, not arbitrary `rounded-[Npx]` values, so a future change to `--radius` propagates everywhere.

### Typography

- **Fonts**: `Geist` (sans) and `Geist Mono` (mono), loaded via `next/font/google` in `src/app/layout.tsx` and exposed as `--font-geist-sans` / `--font-geist-mono`, mapped to Tailwind's `--font-sans` / `--font-mono` in `@theme inline`. Use the `font-sans` / `font-mono` utilities — don't import another font or hardcode a `font-family`. (The Figma source specifies Inter; this was a deliberate call to keep Geist as the established codebase convention rather than add a second font — visually very close, not pixel-identical.)
- **Scale**: use Tailwind's default type scale (`text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, …) rather than one-off `text-[Npx]` values. Pair size with an explicit weight (`font-medium`, `font-semibold`) and, for headings, `tracking-tight`.
- **Line-heights are overridden for `xs`/`sm`/`base`** in `@theme inline` to fixed pixel values (not the default font-size ratios), to match the brand type scale used throughout `/login`:

  | Utility | Size | Line-height |
  |---|---|---|
  | `text-xs` | 12px | 20px (was ~16px) |
  | `text-sm` | 14px | 22px (was 20px) |
  | `text-base` | 16px | 26px (was 24px) |

  This is a global change (not scoped to `/login`) — every existing `text-sm`/`text-xs`/`text-base` usage picks up the new line-height automatically. Don't add a one-off `leading-[Npx]` where one of these three sizes already applies.
- **Button labels are `font-semibold`**, not `font-medium` — this is baked into `Button`'s base class, not a per-instance override.
- **Body text color** is `text-foreground` (set globally on `body` in `globals.css`); use `text-muted-foreground` for placeholder/lowest-emphasis text, `text-text-tertiary` for supporting copy, and `text-text-secondary` for form labels — don't reach for a lower-opacity `text-foreground` as a substitute for any of these.

### Spacing

- No custom spacing scale — use Tailwind's default spacing scale (`p-4`, `gap-6`, `py-8`, etc.) in multiples of `0.25rem`. This was verified against every spacing value in the Figma login screen (2, 4, 6, 8, 12, 16, 20, 24, 32, 64, 160px) — all map exactly onto Tailwind's default scale, so no custom spacing tokens were added.
- Prefer `gap-*` on flex/grid containers over margin utilities on children for spacing between siblings; reserve margin for spacing a single element from unrelated neighbors.
- Common layout rhythm already in use: `p-8` for page-level padding, `gap-6` between major stacked sections, `gap-3` between related inline controls (e.g. a button group) — match these rather than picking arbitrary values per component.

### Shadows

Two custom tokens were added in `@theme inline` (Tailwind v4 auto-generates `shadow-*` utilities from `--shadow-*` theme keys) alongside Tailwind's built-in `shadow-xs`…`shadow-2xl`:

| Utility | Use |
|---|---|
| `shadow-card` | The elevated white auth card on `/login` — a 3-layer shadow, tinted with the `overlay` color rather than pure black. |
| `shadow-button-inset` | The skeuomorphic finish on solid/outline buttons: an outer `shadow-xs`-equivalent drop shadow plus a two-layer inset ring (a 1px full-perimeter highlight + a 2px bottom shade) that gives buttons a subtle "pressed glass" edge. Applied in `Button`'s `default` and `outline` variants — see Component standards. |

Don't hand-roll either of these as an arbitrary `shadow-[...]` value at a call site; use the token.

## Component standards

- **All UI primitives live in `src/components/ui`** and must stay visually/structurally aligned with upstream shadcn/ui source (Radix primitive + `cva` variants + `cn()`), so future hand-added or CLI-generated components stay diffable against upstream. See CLAUDE.md's "Working with shadcn/ui in this repo" for how to add a new primitive given the CLI's registry host is unreachable here.
- **Variant components use `cva`**, following `button.tsx`: a `variants` object keyed by prop name (e.g. `variant`, `size`), explicit `defaultVariants`, and a `VariantProps<typeof xVariants>` intersection on the component's props type. Don't branch variant styling with inline ternaries/`if` chains once there are more than two variants.
- **Every primitive sets `data-slot="<name>"`** on its root element (see `Button`'s `data-slot="button"`). This is what lets composed components and tests target a specific part without relying on class names.
- **Polymorphism via `asChild`**: primitives that need to render as a different element (e.g. a `Button` styled `<a>`) accept `asChild` and swap in Radix's `Slot`, rather than duplicating the style function for an anchor variant.
- **Class merging**: always run final `className` through `cn(...)` (from `@/lib/utils`) so caller-supplied classes can override defaults via `tailwind-merge`'s conflict resolution. Never string-concatenate classes.
- **No business logic in `src/components/ui`** (enforced in CLAUDE.md) — a primitive shouldn't fetch data, hold app state, or know about a specific route. Compose primitives into app-specific components under `src/components` or colocated `_components` folders for that.
- **Icons**: `lucide-react` only, sized via the `[&_svg:not([class*='size-'])]:size-4` pattern already in `Button` (icons default to `size-4` unless the caller overrides with an explicit `size-*` class) — don't hardcode icon pixel dimensions.
- **`Button`**: `default` and `outline` variants carry `shadow-button-inset` (see Shadows); `default` additionally has a `border-2 border-white/12` translucent edge. Base size (`size="default"`) is intrinsic height (`h-auto py-2.5`), not a fixed `h-9` — buttons size to their padding + line-height, matching the brand button. `sm`/`lg`/`icon` sizes are unchanged from upstream (not exercised by the login screen; don't guess new values for them without a design reference).
- **`Input`**: sized `px-3.5 py-2.5` with no fixed height (matches `Button`'s intrinsic-height approach), `bg-background` (not `bg-transparent`) in the default state.
- **`Label`**: colored `text-text-secondary` by default (not inherited body color) — form labels are a distinct tier from body text in the brand scale.
- **`Checkbox`** (`src/components/ui/checkbox.tsx`): new primitive, added because the login screen's "trusted device" control needed one and none existed. Standard shadcn/ui pattern — `@radix-ui/react-checkbox` + `lucide-react`'s `CheckIcon`, `data-slot="checkbox"`. `size-4 rounded-[4px]` (4px doesn't land on the current radius scale exactly — an arbitrary value was used deliberately rather than stretching `rounded-sm`/`rounded-xs` to fit).
- **Auth card shape** (`src/app/login/_components/auth-card.tsx`): the login card is a *nested* shape — an outer shadow/padding shell (`rounded-2xl`, `shadow-card`, `p-2`) wrapping an inner bordered panel (`rounded-md`, `border-black/10`, `px-6 pt-5 pb-4`). This doesn't map onto the flat single-`<div>` `Card` primitive, so it's colocated under `login/_components` rather than bent into `src/components/ui/card.tsx` — keep `Card` matching upstream shadcn/ui; build auth-specific shapes next to the route that needs them.

## Accessibility rules

- **Interactive elements are real elements**: use `<button>` for actions, `<a>`/Next's `Link` for navigation. Don't attach `onClick` to a `<div>` or `<span>` to fake interactivity.
- **Focus states are not optional**: every focusable primitive must keep a visible focus ring. Follow `Button`'s pattern — `outline-none` paired with `focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]` — so focus is only suppressed visually when it's replaced by an equivalent custom indicator, never removed outright.
- **Disabled state**: use the native `disabled` attribute (not just a style) and pair it with `disabled:pointer-events-none disabled:opacity-50`, matching `Button`.
- **Invalid/error state**: surface `aria-invalid` on form controls and style off of it (`aria-invalid:ring-destructive/20 aria-invalid:border-destructive` as in `Button`/inputs) rather than a separate visual-only "error" prop that can drift out of sync with actual validity.
- **Color is never the only signal**: pair destructive/error styling with an icon or text label, since `destructive` is a single hue and won't be distinguishable to all users.
- **Contrast**: text/background pairings must use a token's matching `*-foreground` (e.g. `bg-primary` + `text-primary-foreground`), which are chosen to meet WCAG AA contrast in both themes. Don't override foreground color independently of the background token.
- **Respect motion preferences**: animations from `tw-animate-css` should be used for meaningful state transitions (open/close, enter/exit), not decoration; don't add motion that can't be justified by the interaction it communicates.
- **Semantic structure**: one `h1` per page, heading levels in order, labels associated to inputs (`<label htmlFor>` or wrapping), and landmark elements (`main`, `nav`, `header`) used where they describe the actual layout region — don't reach for a `div` where a semantic element already fits.

## UI implementation guidelines

- Build UI as Server Components by default (see CLAUDE.md's Architecture rules); only the interactive leaf needs `"use client"`. On `/login`, only `login-form.tsx` (the actual form with state) is a Client Component — the page, the logo, and the auth card shell are Server Components.
- Compose from existing `src/components/ui` primitives before writing new markup — check for an existing primitive/variant that already expresses the design before adding a one-off class combination.
- Keep Tailwind class lists readable: layout/box-model classes first, then typography, then color/state classes, roughly matching the ordering already used in `button.tsx` and `page.tsx`. Use `cn()` as soon as a class list has any conditional logic — don't template-string classes together.
- Dark mode must be verified, not assumed: since tokens are theme-aware, correct usage of semantic tokens (`bg-card`, not `bg-white`) should make components work in both themes automatically. Actually toggle the `.dark` class (e.g. via dev tools) and look at new UI before considering it done — don't rely solely on reading the classes. (Exception: auth/onboarding-only tokens, which are theme-fixed by design — see Foundations.)
- Don't hardcode a color, spacing value, radius, or font that already has a token/utility — that's the fast path to visual drift between components. If a value is genuinely new (not expressible with an existing token), add the token (see "Adding a new color token" above) rather than inlining a raw value.
- When a task needs a primitive shadcn/ui doesn't ship (or the CLI can't fetch here), prefer composing it from existing primitives first; only hand-write a new one under `src/components/ui` when composition genuinely can't express it (see CLAUDE.md).
- When implementing a new Figma screen, check `/design-system` and this file first — most of the tokens/primitives you need likely already exist from `/login`. Only add new tokens for values that are genuinely new, following the same conversion/naming approach documented above.

## Known gaps

- The `/login` background photograph (Figma's `imgOnboardingLogin` asset) could not be downloaded — this environment's egress policy blocks `figma.com`, and there was no reachable alternative source for the raster file. `src/app/login/page.tsx` currently renders a CSS gradient placeholder in its place, with a comment marking exactly what to swap in (drop the exported photo at `public/login-background.jpg`, swap one class). The HeartChart wordmark logo and "Log in with Google" icon were similarly unfetchable as raster assets and were rebuilt as code instead (`heartchart-logo.tsx` as styled text + a lucide `Heart` icon, `google-icon.tsx` as a hand-authored SVG of the standard Google "G" mark) — reasonably close, not pixel-identical to the Figma source.
