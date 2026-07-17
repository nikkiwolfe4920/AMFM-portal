# AMFM Portal — DESIGN.md

Design system reference for this repository. This documents the tokens and conventions that already exist in the codebase (`src/app/globals.css`, `components.json`, `src/components/ui/*`) — it doesn't introduce a parallel system. If code and this file disagree, treat it as a bug and reconcile them in the same change.

## Foundations

- **Style**: shadcn/ui `new-york`, `neutral` base color (`components.json`).
- **Color model**: all color tokens are defined in `oklch()`, not hex/rgb. Add new colors in `oklch()` too, so lightness/chroma stay comparable across the palette.
- **Theming**: light theme in `:root`, dark theme in `.dark` (`src/app/globals.css`). Dark mode is class-based (`@custom-variant dark (&:is(.dark *))`), not `prefers-color-scheme` — toggling dark mode means adding/removing the `.dark` class on an ancestor (typically `<html>`), not relying on the OS setting alone.
- **Tailwind v4 CSS-first config**: there is no `tailwind.config.js`. All theme tokens are registered via `@theme inline` in `globals.css`, which maps CSS custom properties to Tailwind utilities (e.g. `--color-primary` → `bg-primary`, `text-primary`, `border-primary`, etc.). New tokens must go through this same `@theme inline` block, not a separate config file.

## Design tokens

### Color tokens

Defined once per theme (`:root` / `.dark`) as raw values, then exposed to Tailwind via `@theme inline` as `--color-*`. Always consume the Tailwind utility (`bg-card`, `text-muted-foreground`), never the raw CSS variable or a hardcoded color.

| Token | Utility examples | Purpose |
|---|---|---|
| `background` / `foreground` | `bg-background`, `text-foreground` | Page-level base surface and text |
| `card` / `card-foreground` | `bg-card`, `text-card-foreground` | Raised content surfaces |
| `popover` / `popover-foreground` | `bg-popover`, `text-popover-foreground` | Floating surfaces (dropdowns, popovers) |
| `primary` / `primary-foreground` | `bg-primary`, `text-primary-foreground` | Primary actions, brand emphasis |
| `secondary` / `secondary-foreground` | `bg-secondary`, `text-secondary-foreground` | Secondary actions |
| `muted` / `muted-foreground` | `bg-muted`, `text-muted-foreground` | De-emphasized backgrounds/text |
| `accent` / `accent-foreground` | `bg-accent`, `text-accent-foreground` | Hover/highlight states |
| `destructive` | `bg-destructive`, `text-destructive` | Destructive actions, error states |
| `border` | `border-border` | Default border color |
| `input` | `border-input` | Form control borders |
| `ring` | `ring-ring` | Focus ring color |
| `chart-1` … `chart-5` | `bg-chart-1`, `text-chart-2`, etc. | Data visualization palette |
| `sidebar*` | `bg-sidebar`, `text-sidebar-foreground`, etc. | Sidebar-specific surface/text/border/ring, kept separate from the main surface so a sidebar can theme independently |

Every `*-foreground` token exists to be paired with its base token for text-on-surface contrast — don't mix a token's foreground with a different surface (e.g. don't use `primary-foreground` text on a `card` background).

**Adding a new color token**: add the raw value to both `:root` and `.dark`, then add the corresponding `--color-*` line in `@theme inline`. Don't invent a second token for a color that's a Tailwind opacity modifier away from an existing one (e.g. use `bg-primary/90` instead of a new `primary-hover` token — see Button's `hover:bg-primary/90`).

### Radius

One base token, `--radius: 0.625rem` (`:root` only — not overridden in `.dark`), expanded into a scale via `@theme inline`:

| Utility | Value |
|---|---|
| `rounded-sm` | `--radius` − 4px |
| `rounded-md` | `--radius` − 2px |
| `rounded-lg` | `--radius` (base) |
| `rounded-xl` | `--radius` + 4px |

Use these scale utilities, not arbitrary `rounded-[Npx]` values, so a future change to `--radius` propagates everywhere.

### Typography

- **Fonts**: `Geist` (sans) and `Geist Mono` (mono), loaded via `next/font/google` in `src/app/layout.tsx` and exposed as `--font-geist-sans` / `--font-geist-mono`, mapped to Tailwind's `--font-sans` / `--font-mono` in `@theme inline`. Use the `font-sans` / `font-mono` utilities — don't import another font or hardcode a `font-family`.
- **Scale**: use Tailwind's default type scale (`text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, …) rather than one-off `text-[Npx]` values. Pair size with an explicit weight (`font-medium`, `font-semibold`) and, for headings, `tracking-tight` — see `page.tsx`'s `text-3xl font-semibold tracking-tight`.
- **Body text color** is `text-foreground` (set globally on `body` in `globals.css`); use `text-muted-foreground` for secondary/supporting text, not a lower-opacity `text-foreground`.

### Spacing

- No custom spacing scale — use Tailwind's default spacing scale (`p-4`, `gap-6`, `py-8`, etc.) in multiples of `0.25rem`.
- Prefer `gap-*` on flex/grid containers over margin utilities on children for spacing between siblings; reserve margin for spacing a single element from unrelated neighbors.
- Common layout rhythm already in use: `p-8` for page-level padding, `gap-6` between major stacked sections, `gap-3` between related inline controls (e.g. a button group) — match these rather than picking arbitrary values per component.

## Component standards

- **All UI primitives live in `src/components/ui`** and must stay visually/structurally aligned with upstream shadcn/ui source (Radix primitive + `cva` variants + `cn()`), so future hand-added or CLI-generated components stay diffable against upstream. See CLAUDE.md's "Working with shadcn/ui in this repo" for how to add a new primitive given the CLI's registry host is unreachable here.
- **Variant components use `cva`**, following `button.tsx`: a `variants` object keyed by prop name (e.g. `variant`, `size`), explicit `defaultVariants`, and a `VariantProps<typeof xVariants>` intersection on the component's props type. Don't branch variant styling with inline ternaries/`if` chains once there are more than two variants.
- **Every primitive sets `data-slot="<name>"`** on its root element (see `Button`'s `data-slot="button"`). This is what lets composed components and tests target a specific part without relying on class names.
- **Polymorphism via `asChild`**: primitives that need to render as a different element (e.g. a `Button` styled `<a>`) accept `asChild` and swap in Radix's `Slot`, rather than duplicating the style function for an anchor variant.
- **Class merging**: always run final `className` through `cn(...)` (from `@/lib/utils`) so caller-supplied classes can override defaults via `tailwind-merge`'s conflict resolution. Never string-concatenate classes.
- **No business logic in `src/components/ui`** (enforced in CLAUDE.md) — a primitive shouldn't fetch data, hold app state, or know about a specific route. Compose primitives into app-specific components under `src/components` or colocated `_components` folders for that.
- **Icons**: `lucide-react` only, sized via the `[&_svg:not([class*='size-'])]:size-4` pattern already in `Button` (icons default to `size-4` unless the caller overrides with an explicit `size-*` class) — don't hardcode icon pixel dimensions.

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

- Build UI as Server Components by default (see CLAUDE.md's Architecture rules); only the interactive leaf needs `"use client"`.
- Compose from existing `src/components/ui` primitives before writing new markup — check for an existing primitive/variant that already expresses the design before adding a one-off class combination.
- Keep Tailwind class lists readable: layout/box-model classes first, then typography, then color/state classes, roughly matching the ordering already used in `button.tsx` and `page.tsx`. Use `cn()` as soon as a class list has any conditional logic — don't template-string classes together.
- Dark mode must be verified, not assumed: since tokens are theme-aware, correct usage of semantic tokens (`bg-card`, not `bg-white`) should make components work in both themes automatically. Actually toggle the `.dark` class (e.g. via dev tools) and look at new UI before considering it done — don't rely solely on reading the classes.
- Don't hardcode a color, spacing value, radius, or font that already has a token/utility — that's the fast path to visual drift between components. If a value is genuinely new (not expressible with an existing token), add the token (see "Adding a new color token" above) rather than inlining a raw value.
- When a task needs a primitive shadcn/ui doesn't ship (or the CLI can't fetch here), prefer composing it from existing primitives first; only hand-write a new one under `src/components/ui` when composition genuinely can't express it (see CLAUDE.md).
