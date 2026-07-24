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
**Figma**: AMFM Portal file, node `3273:19658` ("Primary" button set) and siblings; `default` variant also confirmed on the sign-up screen's primary CTA (`Onboarding/sign up`, node `1909:25231`), on the "Start using HeartChart" CTA on `Onboarding/Create Profile` (node `1909:25769`), and on the "Get Started" CTA on `Onboarding/First run church admin` (node `1894:16263`, within `1909:25772`) — the latter confirms the `default` variant's exact border/shadow-inset spec (`border-white/12`, `shadow-button-inset`) also holds unmodified on a dark, photo-background surface, not only the light auth-card surface previously verified, and confirms the icon-leading composition (`arrow-right` + label) already covered by this component's anatomy; also confirmed on `4188:25971` ("Invite Marriage Champions" CTA) and `4188:25952`/`4188:25956` ("Upgrade to Premium" CTA) — **correction**: a prior pass on this section (and on `3724:23184`, the same "Invite Marriage Champions" CTA under its former node ID) mis-read the icon as inheriting the button's `text-white`/`text-primary-foreground` label color via `currentColor`; Figma's own variable inspection (`get_variable_defs`) on all four nodes above resolves the icon fill to a distinct `Component colors/Components/Buttons/button-primary-icon` variable (`#d89f88`), never `text-white` — see `button-primary-icon` in `DESIGN.md` Color tokens and the Implementation rules below — see `figma/figma-links.md`

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

`bg-primary`, `text-primary-foreground`, `text-button-primary-icon` (`default`-only leading/trailing icon color — distinct from `text-primary-foreground`), `bg-text-brand` (hover/loading fill), `border-border-brand` (focus ring), `bg-muted`, `border-border-secondary`, `text-fg-disabled` (disabled, label and icon), `shadow-button-inset`, `shadow-xs`. See `DESIGN.md` Color tokens / Shadows.

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
- **Leading/trailing icons never take their own `text-*` class at the call site — icon color is owned entirely by `Button`'s own variant styling, not the caller.** On every variant *except* `default`, an icon with no independent color class resolves via `currentColor` to the same color as the label, since `lucide-react` icons render with `stroke="currentColor"` and each variant already sets a text color for its label. **`default` is the one exception**: Figma's own variable inspection (`get_variable_defs`) on every sampled `default`-variant icon instance (`4188:25971` "Invite Marriage Champions", `4188:25952`/`4188:25956` "Upgrade to Premium", `1894:16263` "Get Started") resolves the icon fill to a dedicated `Component colors/Components/Buttons/button-primary-icon` variable (`#d89f88`), consistently distinct from the label's `text-white`/`text-primary-foreground` (`#ffffff`) — i.e. `default`'s icon does **not** inherit the label's color on this variant, contradicting an earlier, uncorrected assumption in this section (see the Figma reference note above). Implemented via `buttonVariants`' `default` entry applying `[&_svg]:text-button-primary-icon` to every descendant `svg` (so it also covers the `loading` state's `Loader2Icon` spinner), with a higher-specificity `[&:disabled:not([data-loading])_svg]:text-fg-disabled` override so the icon still fades to the disabled label color rather than staying tan on a grayed-out button. Callers still never hardcode a color — `size="icon"`'s bare glyph and every icon-leading composition (`ArrowRight` on `/welcome`, `Award` on `/marriage-champions-empty`, `Sparkles` on `/heartchart-resources`) rely on `Button` itself for the correct color per variant, they just no longer all resolve to the same value on `default`.
- **`outline` uses `shadow-xs`, not `shadow-button-inset`.** `shadow-button-inset`'s inset 18%-opacity ring is designed to read as a bevel highlight sitting *inside* a saturated brand fill (the `default` variant) — stacked on top of `outline`'s own real 1px `border` on a plain white background, the two edges compound into a doubled, noticeably heavier-looking border/shadow than Figma's reference. `shadow-xs` (Tailwind's built-in `0 1px 2px black/5%`, the same token `Input`/`InputGroup`/`Select` already use) keeps the single real border as the only visible edge, matching the Figma outline button 1:1.

### Visual examples

All variants, sizes, and the disabled/loading states render at `/design-system/components#button`, including an icon-leading `default` example ("Invite Marriage Champions") demonstrating the `button-primary-icon` token. `default`/`outline` also render live on `/signup` (primary CTA, Google button), `/create-profile` (primary CTA), `/welcome` (icon-leading "Get Started"), `/marriage-champions-empty` (icon-leading "Invite Marriage Champions"), `/heartchart-resources` (icon-leading "Upgrade to Premium", `size="sm"`), and at `/design-system/patterns#auth-card-signup` / `#create-profile-card`.

---

## Input

**Status**: Production Ready
**Source**: `src/components/ui/input.tsx`
**Figma**: AMFM Portal file, node `3272:19436` ("Input" field set) and siblings; also confirmed for the Name/Email/Password fields on the sign-up screen (`Onboarding/sign up`, nodes `1909:25220`–`1909:25222`) and the Church/Organization name, Location, and Average Weekly Attendance fields on `Onboarding/Create Profile` (node `1909:25769`, nodes `1909:25255`, `1909:25257`, `1909:25258`), same treatment, no new variant

### Purpose

Single-line text entry control for forms — the base control every text/email/password field composes.

### Anatomy

Bare `<input>` (matches upstream shadcn/ui shape — no wrapper, no built-in label/help-text/error-message chrome). Compose `Label` and a `HelperText` (see below) around it at the call site for validation messaging.

### Variants

None — a single visual treatment, differentiated only by `type` (`text`, `email`, `password`, etc.) and state.

### States

| State | Behavior |
|---|---|
| Default / Filled | `bg-background`, `text-foreground`, `px-3.5 py-2.5`, intrinsic height (no fixed `h-*`). Figma's "Default" and "Filled" are visually identical — filled is just this styling with a value present. |
| Focused | `focus-visible:border-2 focus-visible:border-border-brand` — a thicker, brand-colored border. No separate ring layer (unlike `Button`). |
| Invalid (`aria-invalid`) | `aria-invalid:border-border-destructive-subtle`, flat border only — no ring glow. Pair with a `HelperText error` below the input (`aria-describedby` pointing at its `id`) so the error is never conveyed by border color alone — see `DESIGN.md`'s "Color is never the only signal". |
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
- Stays a bare `<input>` — no business logic (validation wiring, error message rendering) inside the primitive itself (see "No business logic in `src/components/ui`" in `CLAUDE.md`). Build field-level validation UI (including the paired `HelperText`) in the composing component.
- Figma's reference also shows a trailing help-circle icon — treated as component-browser demo chrome only, not implemented, since no app-level validation wiring exists yet to attach one to. Revisit when real field-level validation lands. The inline error message itself, however, is implemented via `HelperText` (see below) — color alone is never a sufficient invalid signal per `DESIGN.md`.

### Visual examples

Default, filled, disabled, and invalid (with paired `HelperText`) states render at `/design-system/components#input`. Also rendered live on `/signup`'s Name/Email/Password fields, `/create-profile`'s Church/Organization name, Location, and Average Weekly Attendance fields, and at `/design-system/patterns#auth-card-signup` / `#create-profile-card`.

---

## HelperText

**Status**: Production Ready
**Source**: `src/components/ui/helper-text.tsx`
**Figma**: AMFM Portal file, node `3272:19436` ("Input" field set) — the field's hidden "Hint text" slot (a `text-sm` line directly beneath the input, same `gap-1.5`/6px offset as the label-to-input gap)

### Purpose

Supporting or error text rendered directly beneath a form control — the accessible, always-visible companion to a control's `aria-invalid` state, so validity is never conveyed by border color alone (see `DESIGN.md`'s "Color is never the only signal").

### Usage guidelines

Place immediately after the control it describes, inside the same `flex flex-col gap-1.5` field wrapper `Input`/`InputGroup`/`Select` already use, and wire `aria-describedby` on the control to this element's `id`. Not a standalone component — always paired with exactly one control's error or supporting-copy state, never used as generic body text.

### Variants

None — a single visual treatment, differentiated only by the `error` prop.

### States

| State | Behavior |
|---|---|
| Default (helper) | `text-text-tertiary` — neutral supporting copy. |
| Error | `error` prop → `text-destructive` + `role="alert"` so assistive tech announces the message when it appears. |

### Properties / API

```ts
React.ComponentProps<"p"> & {
  error?: boolean; // renders in the destructive color and as role="alert"
}
```

### Design tokens used

`text-text-tertiary` (default), `text-destructive` (error). See `DESIGN.md` Color tokens.

### Accessibility requirements

- The paired control must reference this element via `aria-describedby` so screen readers announce it as part of the field, not just sighted users via color.
- `error` sets `role="alert"` — reserve it for messages that appear/change in response to validation, not static helper copy (which would announce on every mount/re-render if `alert` were used unconditionally).

### Responsive behavior

None — inline text, wraps naturally with its container, same as `Label`.

### Implementation rules

- Never hardcode the error color — always use `text-destructive` via the `error` prop, not a literal class at the call site.
- Stays a bare `<p>` — no built-in icon or dismiss affordance; Figma's reference trailing help-circle icon on the input itself is separate demo chrome, not part of this component (see `Input`'s Implementation rules).

### Visual examples

Rendered paired with `Input`'s Invalid state at `/design-system/components#input`.

---

## InputGroup

**Status**: Production Ready
**Source**: `src/components/ui/input-group.tsx`
**Figma**: AMFM Portal file, `Onboarding/Create Profile` (node `1909:25769`), node `1909:25259` ("Website" field — leading `http://` add-on)

### Purpose

Pairs an `Input` with a fixed, non-editable leading (or trailing) add-on — e.g. a URL scheme prefix — rendered as one visually continuous control instead of two separate fields.

### Anatomy

Wrapper `div` carrying the shared border/shadow/radius (focus/invalid/disabled state driven off the real `<input>` via `has-*` selectors) → add-on `span` (`rounded-l-md` corner only, non-interactive, `text-text-tertiary`, `aria-hidden`) → bare `<input>` (`rounded-r-md` corner only, transparent background, `border-l border-input` on the shared edge — a 1px vertical divider separating the add-on from the editable text, matching Figma's "Website" field exactly — otherwise no border of its own so the two segments still read as one control).

### Variants

Leading add-on only — the only variant with a real Figma reference (see above). A `"trailing"` position was considered but deliberately **not implemented**: no Figma reference evidences it, per `CLAUDE.md`'s anti-premature-abstraction guidance. Add it (as a real `addonPosition` prop) only once a second real use case appears — don't speculatively restore it.

### States

Inherits `Input`'s default/focus/invalid/disabled states in full (see `Input` above), reproduced on the wrapper via `has-[:focus-visible]`/`has-[[aria-invalid=true]]`/`has-[:disabled]` selectors targeting the inner `<input>` (the border lives on the wrapper, not the input, so the input's own pseudo-classes can't drive it directly) — the add-on segment itself has no interactive state of its own.

### Properties / API

```ts
interface InputGroupProps extends React.ComponentProps<"input"> {
  addon: React.ReactNode; // fixed, non-editable leading add-on (e.g. "http://")
}
```

### Design tokens used

`border-input`, `bg-background`, `text-text-tertiary` (add-on text), `shadow-xs`, `radius-md` — all existing tokens; no new tokens required.

### Accessibility requirements

- The add-on text (e.g. `http://`) must be `aria-hidden="true"` — it's a formatting affordance, not a second field; the accessible name must come entirely from the paired `Label`/`htmlFor` on the real `<input>`.
- Do not wrap the control in a `<button>` — Figma's auto-generated design-to-code export wraps this field in a `<button>` element, which is an export artifact, not a real interaction; a `<button>` cannot legally contain a text `<input>` and would break native typing/focus behavior.

### Responsive behavior

Full width (`w-full`) like `Input`; the add-on segment's width is intrinsic to its content and does not scale with breakpoint.

### Implementation rules

- Compose around the existing `Input` primitive — reuse its exact token set rather than re-declaring border/shadow/radius values, so a future `Input` token change propagates automatically.
- Do not implement a `"trailing"` variant speculatively; add it only once a second real Figma reference exists.
- **Fixed: the add-on/input boundary had no visible divider.** Figma's "Website" field draws the add-on and text-input segments as two adjacent bordered boxes whose shared inner edge is the only new line visible (the outer edges coincide with the wrapper's own border). Reproduced here as `border-l border-input` on the `<input>` — the same border color the wrapper already uses, so no new token — rather than a second full border on either segment, which the wrapper's own border already provides on the outer edges.

### Visual examples

Rendered live on `/create-profile`'s "Website" field; referenced at `/design-system/components#inputgroup` and `/design-system/patterns#create-profile-card`.

---

## Select

**Status**: Production Ready
**Source**: `src/components/ui/select.tsx`
**Figma**: AMFM Portal file, `Onboarding/Create Profile` (node `1909:25769`), nodes `1909:25261` ("Your role") and `1909:25262` ("Your primary goal"); also `"Our Marriage Champions / Populated"` (node `3724:23444`), the "Profile type" column's `Table cell` instances (fixed-width trigger, e.g. `w-44` on `/marriage-champions`); trailing icon references the `chevron-down` Figma component (node `10:338`) at 16px in both references

### Purpose

Single-choice selection from an enumerated option list, styled to match `Input` so the two read as one form-control family — used on the referenced frame for "Your role" (~40 options) and "Your primary goal" (23 options), and, in a narrow fixed-width variant, for the inline "Profile type" editor in `Table`'s Profile type column.

### Anatomy

Trigger styled identically to `Input` (border, radius, `shadow-xs`, matching padding) → placeholder or selected-value text → trailing chevron-down icon → on open, a listbox popover of options. The value slot (`SelectValue`, `data-slot="select-value"`) is targeted by the trigger via `*:data-[slot=select-value]:min-w-0 flex-1 truncate`, so a trigger narrower than its content (e.g. the "Profile type" column's `w-44` trigger showing "Marriage Champion") truncates the value with an ellipsis instead of overflowing past the trigger's border — confirmed at `/marriage-champions`.

### Variants

None beyond placeholder vs. filled text color — content (the option list) is caller-supplied per field, not a component variant.

### States

| State | Behavior |
|---|---|
| Placeholder | `text-muted-foreground`, matching `Input`'s placeholder color |
| Filled | `text-foreground` |
| Open | Radix `Select`'s native open state; chevron rotates |
| Focused | `focus-visible:border-2 focus-visible:border-border-brand`, matching `Input`'s focus treatment exactly |
| Disabled | Matches `Input`'s disabled treatment (`disabled:bg-muted/50`, `disabled:text-muted-foreground`) |
| Invalid | `aria-invalid:border-border-destructive-subtle`, matching `Input` |

### Properties / API

Standard Radix `Select.Root` / `Select.Trigger` / `Select.Content` / `Select.Item` props (`value`, `onValueChange`, `disabled`, etc.) — no custom props needed beyond styling; options are supplied as children, not a fixed internal list.

### Design tokens used

`border-input`, `bg-background`, `placeholder:text-muted-foreground`, `border-border-brand` (focus), `border-border-destructive-subtle` (invalid), `bg-muted/50` + `text-muted-foreground` (disabled), `shadow-xs`, `radius-md` — the identical token set `Input` uses, plus `lucide-react`'s `ChevronDown` icon at `size-4` (16px, matching Figma's `chevron-down` component and `SelectItem`'s own check-icon size — see Implementation rules for the earlier oversized-icon bug this replaced).

### Accessibility requirements

- Must be built on Radix's `Select` primitive (full listbox ARIA pattern: keyboard arrow/Home/End navigation, typeahead, `aria-expanded`/`aria-activedescendant`) — do not hand-roll a `div`-based dropdown, per `DESIGN.md`'s Accessibility standards on custom widgets.
- Popover content must cap height and scroll internally for long option lists (confirmed up to ~40 items on this frame) rather than overflow the viewport.
- Do not wrap the trigger in an extraneous `<button>` beyond what Radix's `Select.Trigger` itself renders — see the same Figma design-to-code export caveat noted under `InputGroup`.

### Responsive behavior

Full width (`w-full`) like `Input` on `/create-profile`; also supports a fixed narrow width (`Table`'s "Profile type" column uses `w-44`) since the value slot truncates instead of overflowing — no breakpoint-specific behavior of its own.

### Implementation rules

- Hand-authored `src/components/ui/select.tsx` from `@radix-ui/react-select` (installed — `ui.shadcn.com` itself remains unreachable from this environment per `CLAUDE.md`'s shadcn-CLI-unreachable workflow, but the underlying Radix package installs fine from `registry.npmjs.org`), matching upstream shadcn/ui's `select` shape and this project's `Input` token set exactly (`border-input`, `bg-background`, `px-3.5 py-2.5`, `text-base`, `shadow-xs`, focus/invalid/disabled treatment).
- `SelectContent` caps height via `max-h-(--radix-select-content-available-height)` with an internal scrolling `Viewport`, plus `SelectScrollUpButton`/`SelectScrollDownButton` — verified against the 39-item "Your role" list on `/create-profile` (see Visual examples).
- Given the option counts on the referenced frame (39 and 23 items), a searchable combobox variant remains a flagged UX consideration for product/design to weigh in on — not implemented here, since the plain Radix listbox already satisfies the documented contract and no combobox pattern exists elsewhere in the codebase to extend.
- **Fixed: the trailing chevron floated outside a narrow trigger's border.** `/marriage-champions`'s "Profile type" column renders `SelectTrigger` at a fixed `w-44` (176px) with a long value ("Marriage Champion"); `SelectValue` carried no width-constraining classes, so its intrinsic content width — combined with an oversized `size-6` (24px) chevron eating into the available space — pushed the flex row past the trigger's own box, visually detaching the chevron from the drawn border instead of clipping the text. Fixed in the shared trigger (not the call site) two ways: (1) the chevron is now `size-4` (16px), matching Figma's actual `chevron-down` component size and `SelectItem`'s check icon; (2) the trigger scopes `min-w-0 flex-1 truncate` onto its `[data-slot=select-value]` child via Tailwind's `*:data-[...]:` child-attribute variant, so the value shrinks and truncates with an ellipsis inside any trigger width instead of overflowing. Deliberately *not* `line-clamp-1 flex items-center gap-2` (a pattern seen in some shadcn/ui forks) — `line-clamp-*` sets `display:-webkit-box`, which collides with a same-element `flex` utility's `display:flex` (last one in the generated stylesheet wins, and per CSS's flex-item blockification rules, `flex-1`/`min-w-0` already work on `SelectValue` as a block-level flex-item child of the trigger without needing `display:flex` set on `SelectValue` itself) — the collision silently drops `line-clamp`'s truncation behavior, hard-clipping text mid-character with no visible ellipsis, which is what this fix replaced. Verified in a real browser (computed `text-overflow: ellipsis` rendering correctly) at `/marriage-champions`, and confirmed the full-width `/create-profile` triggers still render unaffected.

### Visual examples

Rendered live on `/create-profile`'s "Your role" (39 options) and "Your primary goal" (23 options) fields, and on `/marriage-champions`'s "Profile type" column (narrow fixed-width trigger); referenced at `/design-system/components#select` and `/design-system/patterns#create-profile-card`.

---

## Label

**Status**: Production Ready
**Source**: `src/components/ui/label.tsx`

### Purpose

Accessible text label for a form control, visually distinct from body copy.

### Anatomy

Radix `Label.Root` wrapping text (and optionally an inline control, e.g. paired with `Checkbox`).

### Variants

**Required-field marker**: a `*` glyph appended after the label text, seen on every field of `Onboarding/Create Profile` (node `1909:25769`, e.g. nodes `I1909:25255;7487:535320` etc.). Figma's variable for this glyph (`text-brand-tertiary (600)`, `#aa6140`) resolves to the exact same hex as the existing `primary` token, so **no new color token was needed** — implemented as a `required?: boolean` prop rendering `<span aria-hidden="true" className="text-primary">*</span>` after `children`, with the label's internal flex gap tightened to `gap-0.5` (Figma's `spacing-xxs`, 2px) to match the asterisk's tight kerning against the label text. Real required-ness is still carried by the paired control's native `required` attribute (already the established pattern in `SignupForm`, and now `CreateProfileForm`), not by the visual glyph alone.

### States

Inherits `peer-disabled`/`group-data-[disabled=true]` styling (fades + `cursor-not-allowed`) when its paired control is disabled.

### Properties / API

`React.ComponentProps<typeof LabelPrimitive.Root> & { required?: boolean }` — forwards every Radix `Label` prop, most commonly `htmlFor`, plus the `required` marker prop above.

### Design tokens used

`text-text-secondary` (distinct tier from body `text-foreground`). Required marker: `text-primary` (see Variants above — reuses the existing token, not a new one).

### Accessibility requirements

- Always set `htmlFor` pointing at the control's `id`, or wrap the control, so screen readers announce the association.
- The required marker's `*` glyph is `aria-hidden="true"`; required-ness is conveyed to assistive tech via the paired control's native `required` attribute, not the glyph.

### Responsive behavior

None — inline text, wraps naturally with its container.

### Implementation rules

- Never hardcode the text color — `text-text-secondary` is the token for form labels specifically, distinct from body/placeholder/tertiary text (see `DESIGN.md` Typography system).

### Visual examples

Rendered paired with `Input` and `Checkbox` at `/design-system/components#input` and `#checkbox`; the required-marker variant renders on every field of `/create-profile` and at `/design-system/components#label` and `/design-system/patterns#create-profile-card`.

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

## PasswordRequirementItem

**Status**: Production Ready
**Source**: `src/app/signup/_components/password-requirement-item.tsx`
**Figma**: AMFM Portal file, `Onboarding/sign up` (node `1909:25768`), nodes `1909:25225`–`1909:25229` ("Check icon" + requirement text, two instances). Figma's own default-state screenshot only shows the two requirements unmet (empty password field) — the met-state color below is a deliberate product decision, not a pixel-sourced Figma value; see Implementation rules.

### Purpose

Live-validation indicator for a single password rule (minimum length, required special character), giving real-time feedback on whether a requirement is currently satisfied while the user types a new password.

### Anatomy

Circular status icon (`size-5`, `rounded-full`, containing a centered checkmark glyph) + adjacent requirement text. Rendered in a stack of 2 (`gap-3`) directly beneath the password `Input`, wired to `SignupForm`'s live `password` state.

### Variants

None — visual state is derived from a `met: boolean` prop, not a caller-chosen variant (same precedent as `HeartChartSummary` deriving state from data rather than a manual variant).

### States

| State | Behavior |
|---|---|
| Unmet (confirmed) | Icon background `border`/`input` token (`#d5d7da` — this is Figma's `Colors/Foreground/fg-disabled_subtle` variable, which is a *different name but the same value* as the existing `border`/`input` token; do **not** add a separate `fg-disabled_subtle` token, and do not confuse it with the existing `fg-disabled` token, `#a4a7ae`, which is a different value entirely). Text uses `text-text-tertiary`. |
| Met | Icon background switches to `status-success` (`#76936b`) — the same token `HeartChartSummary` uses for its positive/"Growing"/"Exceptional" states, applied here by product decision rather than a Figma reference on this specific component (see Implementation rules). Text switches to `text-foreground` so the "you're good" state reads with more contrast/emphasis than the muted unmet text, not just a color swap. |
| Both states | Checkmark glyph itself never changes (`lucide-react`'s `Check`, `size-3`, `text-white`) — only the circle fill and text color change, so the glyph shape isn't the only differentiator (see Accessibility requirements). |

### Properties / API

```ts
interface PasswordRequirementItemProps {
  met: boolean;
  children: React.ReactNode; // the requirement text
}
```

### Design tokens used

`bg-border` (unmet-state icon background — same token as `Input`'s default border), `bg-status-success` (met-state icon background), `text-text-tertiary` (unmet-state text), `text-foreground` (met-state text), built-in Tailwind `rounded-full`/`text-white`.

### Accessibility requirements

- Icon is `aria-hidden="true"` — state is conveyed by the paired text + color change together, never color alone (per `DESIGN.md` Accessibility standards).
- The password `Input` sets `aria-describedby` referencing the checklist's wrapping `id` (see `SignupForm`), so assistive tech users get the same live pass/fail feedback sighted users get from the color/icon change. The `Input`'s native `minLength`/`pattern` constraints mirror the same two rules, so a screen reader user who submits early also gets the browser's native constraint-validation message, not just the visual checklist.

### Responsive behavior

Inline text wraps naturally in its flex row; no breakpoint-specific behavior.

### Implementation rules

- Don't reuse `Checkbox` for this — it's a read-only, derived-state indicator, not a togglable input.
- **Met-state color is a product decision, not a Figma-verified value**: Figma's `Onboarding/sign up` frame only shows the checklist in its default (empty-password, both-unmet) state — there is no Figma screenshot of the met/confirmed state on this component. `status-success` was chosen by deliberate analogy with `HeartChartSummary`'s existing positive-state token (the same reasoning this entry previously flagged as "likely, but not confirmed") rather than left unbuilt, per explicit product direction to ship live validation feedback. Revisit if a real Figma reference for the met state is ever supplied and it specifies a different color.
- Colocated under `src/app/signup/_components` (single use site, `SignupForm`) rather than `src/components`, matching `BenefitListItem`'s precedent below — promote to `src/components` only if a second real use site appears (e.g. a password-reset flow), per `CLAUDE.md`'s Component Creation Process.
- See `BenefitListItem` (below) for a visually similar icon+text row pattern — the two remain intentionally separate (different icon size, different semantics: derived validation state vs. static always-confirmed benefit) rather than merged into one generalized component; revisit only if a real shared need emerges.

### Visual examples

Rendered at `/design-system/components#passwordrequirementitem` (both states shown explicitly) and live on `/signup`'s password field; referenced at `/design-system/patterns#auth-card-signup`.

---

## SignupSuccess

**Status**: Draft (functionally complete and rendered, but has no Figma source — see Implementation rules)
**Source**: `src/app/signup/_components/signup-success.tsx`
**Figma**: No reference. `Onboarding/sign up` (node `1909:25768`) only defines the form's default state; the Figma file's Signup section (`Onboarding/sign up` → `Onboarding/Create Profile` → `Onboarding/Select Membership` → `Onboarding/payment info`) has no dedicated "sign-up succeeded" confirmation frame. Built by composing already-verified tokens/primitives to close the gap called out in `CLAUDE.md`'s Required Component Documentation Standard (every interactive component needs a documented Success state) — see Implementation rules before treating this as pixel-sourced.

### Purpose

Confirms that account creation succeeded and hands the user off to the next real step in the onboarding funnel (`/create-profile`) — the `SignupForm`'s previously-missing "Success" state (see `DESIGN.md`'s Interaction principles).

### Anatomy

Centered column: circular icon badge (`size-12`, `bg-status-success/10`, containing a `size-6` `CircleCheck`) → heading (personalized with the submitted name when present) → supporting copy → full-width primary `Button` (`asChild` `Link`) continuing to `/create-profile`.

### Variants

None — a single confirmation layout; `name` only changes the heading's personalization, not the structure.

### States

Static once rendered — this *is* `SignupForm`'s Success state, replacing the form/Google button/divider/login-link content inside `AuthCard` (see `SignupCardContent`). No further internal states of its own.

### Properties / API

```ts
interface SignupSuccessProps {
  name: string; // the submitted "Name" field value; first token is used in the heading
}
```

### Design tokens used

`bg-status-success/10` + `text-status-success` (icon badge — same token family as `PasswordRequirementItem`'s met state and `HeartChartSummary`'s positive states), `text-foreground` (heading), `text-text-tertiary` (supporting copy). `Button`'s existing `default` variant for the continue CTA — no new button styling.

### Accessibility requirements

- Root has `role="status"` so assistive tech announces the confirmation when it replaces the form in place (an in-page content swap, not a route navigation, so it needs an explicit live-region role to be noticed).
- Icon is `aria-hidden="true"` — the heading and body text alone carry the meaning.
- Heading is a real `<h1>` — this becomes the page's primary heading once the form is replaced (the form itself has no competing `<h1>`), keeping one-`h1`-per-view per `DESIGN.md` Accessibility standards.

### Responsive behavior

`w-full`, centered text and content — inherits `AuthCard`'s fixed intrinsic width; no breakpoint-specific behavior of its own.

### Implementation rules

- **No Figma source — flagged, not hidden.** Unlike every other component in this file, this one wasn't derived from a Figma frame; it was built to satisfy an explicit product requirement (a real Success state for the sign-up flow) in the absence of one. Status stays **Draft** for this reason, matching the precedent set by `AmfmLogo` (approximated pending a real asset) — replace/adjust once a real "sign-up success" Figma frame exists, rather than treating this layout as final.
- Lives in `src/app/signup/_components` (single use site, `SignupCardContent`), matching `BenefitListItem`/`PasswordRequirementItem`'s colocation precedent.
- The current submit flow (`SignupForm`) has no real backend — `onSuccess` fires immediately once the native form constraints (required fields, password `minLength`/`pattern`) pass. Wire this to a real API result before shipping to production; don't mistake the current behavior for a verified account-creation success.
- Continue CTA targets `/create-profile`, the actual next screen in the Figma onboarding funnel (`Onboarding/sign up` → `Onboarding/Create Profile`) — not a generic "go to dashboard" link, since no dashboard route exists yet.

### Visual examples

Rendered at `/design-system/components#signupsuccess` and live on `/signup` after a successful submission; referenced at `/design-system/patterns#auth-card-signup-success`.

---

## BenefitListItem

**Status**: Production Ready
**Source**: `src/app/create-profile/_components/benefit-list-item.tsx`
**Figma**: AMFM Portal file, `Onboarding/Create Profile` (node `1909:25769`), `check-circle` icon component (node `10:6386`); six instances at nodes `1909:25272`–`1909:25275`, `2852:117176`, `2852:117164`

### Purpose

Confirms an included benefit/feature in a list (e.g. the "Free Membership" pricing card, see `PricingCard` below) — a static, always-affirmative icon+text row, distinct from `PasswordRequirementItem`'s derived-state validation row.

### Anatomy

`size-6` (24px) circular check icon + adjacent flex-1 text, stacked in a `gap-3` list.

### Variants

None evidenced — every instance on the referenced frame renders the same "confirmed" visual treatment; no unmet/negative variant exists in this context.

### States

Single static state only (always-confirmed) — this component has no interactive or derived state, unlike `PasswordRequirementItem`.

### Properties / API

```ts
interface BenefitListItemProps {
  children: React.ReactNode; // the benefit text
}
```

### Design tokens used

Icon fill color **confirmed**: the Figma MCP's variable inspection on the pricing card node resolved the check-circle's fill to `Colors/Foreground/fg-brand-primary (600)`, `#aa6140` — the exact same hex as the existing `primary` token, so no new token was needed. Icon renders as `lucide-react`'s `CircleCheck` (closest stable equivalent to Figma's `check-circle` component, matching `iconLibrary` in `components.json`), `size-6`/24px, `text-primary`. Text uses `text-text-tertiary` (existing token).

### Accessibility requirements

Icon is decorative (`aria-hidden="true"`) — the adjacent text alone conveys the benefit; do not double-announce via an icon `aria-label`, consistent with `HeartChartSummary`'s existing icon/text precedent (see below).

### Responsive behavior

Inline text wraps naturally in its flex row; no breakpoint-specific behavior expected.

### Implementation rules

- **Considered, and declined, as a merge candidate with `PasswordRequirementItem`** (above) — both are a circular icon + adjacent text row, but they differ semantically (derived two-state validation vs. static always-confirmed benefit) and visually (24px icon here vs. 20px on `PasswordRequirementItem`, plus a different icon glyph — `CircleCheck` vs. a plain `Check` in a colored circle). Kept as two separate implementations; revisit only if a real third use case makes a shared generalization worthwhile.
- Colocated under `src/app/create-profile/_components` (single use site, `PricingCard`) rather than `src/components` — same precedent as `AuthCard`/`PricingCard` in this file; promote only if a second real use site appears, per `CLAUDE.md`'s Component Creation Process.

### Visual examples

Rendered live in `PricingCard`'s benefit list on `/create-profile`; referenced at `/design-system/components#benefitlistitem` and `/design-system/patterns#create-profile-card`.

---

## ResourceListItem

**Status**: Production Ready
**Source**: `src/components/resource-list-item.tsx`
**Figma**: AMFM Portal file, "HeartChart Resources" component (node `2361:19280`), `Table cell` instances — six confirmed instances across two resource cards ("Optional Resources" nodes `2318:27034`/`2318:27041`/`2318:27048`, "Premium Resources" nodes `2309:20747`/`2309:20754`/`2309:20738`)

### Purpose

Presents one downloadable resource (a kit, guide, or training) inside a card-based list — leading icon, title, and supporting description, with a single trailing download action — so a set of related resources can be scanned and downloaded from a dashboard-style page.

### Anatomy

Leading `size-8` (32px) icon → title/supporting-text stack (a `text-base font-semibold` title line plus a `text-sm text-muted-foreground` supporting line) → trailing `size-12` (48px) bordered icon-only download button. Rows stack full-width inside a card, `gap-6` (24px) apart.

### Variants

None evidenced — a single visual treatment repeated across both resource cards with different icon/copy per instance; no variant prop needed beyond content.

### States

| State | Behavior |
|---|---|
| Default | Only state confirmed via Figma. |
| Hover / Focus / Active | Inherited from `Button`'s `outline` variant (the trailing action) — no Figma reference shows a distinct hover/focus treatment for the row itself, only the button. |

### Properties / API

```ts
interface ResourceListItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  /** Accessible name for the trailing download action, e.g. "Download {title}". */
  actionLabel: string;
}
```

`onAction` (originally proposed as an optional callback alongside `href`) was dropped — no Figma or app evidence showed a non-navigation use case, and `CLAUDE.md`'s anti-premature-abstraction guidance says not to carry unused API surface. `href` and `actionLabel` are both required since every real instance needs a destination and every icon-only action needs a label.

### Design tokens used

`text-muted-foreground` (leading icon, description, and trailing button icon), `text-foreground` (title) — all existing, theme-aware tokens; `Button`'s `outline` variant tokens for the trailing action. No new tokens required.

**Icon color is `text-muted-foreground`, not a pixel-exact new token**: the Figma MCP's variable inspection resolved both the leading icon and the download button's icon to `#a4a7ae` (Figma's "Utility/Gray/utility-gray-400" and "Foreground/fg-quaternary (400)" — two different Figma variable names, same hex). Neither matches an existing token exactly, and no `.dark` reference exists for it. Rather than add a third root-only gray (on top of `fg-disabled`, which happens to share this exact hex but carries disabled-state *semantics* that don't apply here), this reuses the existing theme-aware `muted-foreground` token — the same trade-off `HeartChartSummary` and this component's own title color already made elsewhere in this file, prioritizing verified dark-mode behavior over a few-percent-lightness pixel match.

### Accessibility requirements

- The trailing download button must carry a caller-supplied `aria-label` describing its action (e.g. "Download {title}") — the same requirement `Button`'s `size="icon"` already documents.
- Icon is decorative and must be `aria-hidden="true"`, consistent with `BenefitListItem`'s existing precedent — title/description text alone should carry the meaning.
- Whichever element is the primary click target (the row itself vs. only the trailing button) must be a single real interactive element — don't wire duplicate/nested click handlers onto both the row and the button.

### Responsive behavior

The component itself doesn't reflow internally at any width (icon/title/description/button stay in one row) — still not evidenced against a Figma mobile/tablet frame, so very narrow viewports haven't been verified. Its call site (`/heartchart-resources`) handles column-level responsiveness by stacking its two host cards from `grid-cols-1` to `lg:grid-cols-2`, per `DESIGN.md`'s Layout/grid rules — that's a call-site decision, not a change to this component's own layout.

### Implementation rules

- Icon set confirmed on the reference frame: `share-07`, `message-text-square-01`, `clipboard-check`, `book-open-01`, `heart`, `intersect-three`. The first five map to `lucide-react`'s `Share2`, `MessageSquareText`, `ClipboardCheck`, `BookOpen`, `Heart` respectively (closest stable equivalents, matching the project's established substitute precedent — see `GlobalNav`/`VideoPlayer`). **`intersect-three` has no clear `lucide-react` equivalent** — `Blend` (already used elsewhere in `GlobalNav` for an unrelated item) is used as the closest available overlapping-shapes glyph; this remains an unconfirmed substitution, not a verified match — flag for design/eng alignment.
- **The trailing action is a download button, not a navigation chevron** — confirmed by the Figma node's own interaction annotation ("download buttons download resource" / "downloads the resource"). Uses `lucide-react`'s `Download` icon, `Button` `variant="outline"` (bordered, white fill — matches Figma's `border-primary`/`shadow-xs` bordered square exactly) at a local `size-12` (48px) override — larger than `Button`'s existing `icon` size (`size-9`/36px) — with a `[&_svg]:size-5` override for the 20px glyph, the same override technique `HeartChartSummary` established for its own action buttons.
- A hidden "Table cell lead action" sub-layer (20px) exists in the underlying Figma library component but is unused on every instance — an artifact of the shared kit, not part of this component's real contract; not implemented.
- `href` always renders via `next/link`'s `Link`, per `CLAUDE.md`'s "use Link for navigation" rule. Its call site (`/heartchart-resources`) has no real destination/file routes yet, so every instance points at `"#"` — the same "placeholder path pending real routes" situation already documented for `GlobalNav`.

### Visual examples

Rendered at `/design-system/components#resourcelistitem` and live in both resource cards on `/heartchart-resources`.

---

## ElevatedCard

**Status**: Production Ready
**Source**: `src/components/elevated-card.tsx`
**Figma**: AMFM Portal file — the shared "outer shadow-card shell wrapping an inner bordered panel" shape, confirmed identical on `TopHero`'s "Featured Training" component (node `2318:26997`) and the `/heartchart-resources` "Optional Resources"/"Premium Resources" cards (node `2361:19280`, e.g. nodes `2309:20702`/`2309:20730`)

### Purpose

Shared nested-shell surface — an outer `shadow-card`/`rounded-2xl`/`p-2` shell wrapping an inner bordered `rounded-md` panel — extracted once a third real instance of the shape appeared, per `HeartChartSummary`'s own documented precedent ("if a third appears, extract it into a shared primitive"). `AuthCard` and `HeartChartSummary` built this shape locally before this component existed; see Implementation rules for why they weren't retrofitted onto it in the same change.

### Anatomy

Outer `div` (`rounded-2xl`, `shadow-card`, `p-2`) → inner bordered panel (`rounded-md`, `border-border` by default, `size-full`) → `children`.

### Variants

None — a single shape; the inner panel's border/overflow/layout classes are caller-overridable via `innerClassName` (e.g. `TopHero` overrides it to `border-white/30` for its dark photo surface).

### States

None of its own — purely a layout/surface primitive, same category as `Card`.

### Properties / API

```ts
interface ElevatedCardProps extends React.ComponentProps<"div"> {
  /** Classes for the inner bordered panel (e.g. to override the default border). */
  innerClassName?: string;
}
```

### Design tokens used

`bg-background`, `shadow-card`, `rounded-2xl`, `rounded-md`, `border-border` — all existing tokens; no new tokens required.

### Accessibility requirements

Purely structural — accessibility depends on the semantic content placed inside, same as `Card`.

### Responsive behavior

Fluid width by default (`size-full`/fills its container per caller's `className`); no built-in breakpoint behavior of its own.

### Implementation rules

- **Not retrofitted onto `AuthCard`/`HeartChartSummary` in this change** — `AuthCard` is route-colocated and deliberately fixed-light (`border-black/10`, no `.dark` value), and `HeartChartSummary` is an already-shipped, separately-verified component; refactoring either was out of scope for the task that introduced this primitive (per `CLAUDE.md`'s "smallest maintainable change" guidance). A reasonable follow-up is migrating both onto `ElevatedCard` the next time either is meaningfully touched — see `DESIGN.md` Known gaps.
- Keep this primitive matching its one real shape exactly — a nested shell, not a flat single-surface card (that's `Card`, above). Don't bend it to fit a flat shape.

### Visual examples

Rendered at `/design-system/components#elevatedcard`; composed inside `TopHero` and the two resource cards live on `/heartchart-resources`.

---

## TopHero

**Status**: Draft (background photo unavailable — see Implementation rules)
**Source**: `src/components/top-hero.tsx`
**Figma**: AMFM Portal file, "Featured Training" component (node `2318:26997`), rendered on the `/heartchart-resources` page as the "Let's prepare for your HeartChart Weekend" banner

### Purpose

Full-bleed photo hero for a dashboard page's featured training/promo banner — a two-tone heading (a neutral line plus a brand-emphasized line), supporting copy, and a single video CTA, over a photo backdrop.

### Anatomy

`ElevatedCard` (dark photo surface, `border-white/30` inner panel) → background layer (photo in Figma; see Implementation rules) → content column: two-tone `font-display` heading (`text-display-lg` neutral line + `text-display-2xl` `highlight-gold` emphasis line) → `text-nav-foreground-muted` description → outline `Button` with a `PlayCircle` icon.

### Variants

None — a single layout; all content is caller-supplied.

### States

None of its own — a static banner. The CTA `Button` inherits `Button`'s own hover/focus states.

### Properties / API

```ts
interface TopHeroProps {
  eyebrowHeading: ReactNode;
  highlightHeading: ReactNode;
  description: ReactNode;
  ctaLabel: string;
  onCtaClick?: () => void;
  className?: string;
}
```

### Design tokens used

`text-nav-foreground` (first heading line — Figma's `text-primary-(900)` variable resolves to `#f7f7f7` on this fixed-dark surface, an exact match), `text-highlight-gold` (second heading line, `#e9c481` exact match), `text-nav-foreground-muted` (description, `#cecfd2` exact match), `text-display-lg`/`text-display-2xl` + `font-display`, `nav-surface-from`/`nav-surface-to` (placeholder background gradient — see Implementation rules). `Button`'s `outline` variant for the CTA — no new button styling.

### Accessibility requirements

- Heading text uses real text nodes (not an image with alt text) so it's readable/selectable regardless of the background photo.
- The CTA is a real `Button`, inheriting its keyboard focus and focus-visible ring.

### Responsive behavior

Not yet evidenced against a Figma mobile/tablet frame (the reference is a fixed desktop-width composition, same category of gap as `HeartChartSummary`/`PricingCard`). The heading column caps at `max-w-[544px]` per Figma; the outer `ElevatedCard` is fluid-width.

### Implementation rules

- **Background photo unavailable in this environment** — Figma's export/raw-image URLs all resolve to `www.figma.com`, blocked by this environment's egress policy (confirmed via the agent proxy status endpoint), the same class of gap as `AmfmLogo`'s blocked asset. Renders a `nav-surface-from`→`nav-surface-to` dark gradient in place of the real congregation-stage photo. Status stays **Draft** for this reason — replace with the real photo (via `next/image`, matching `HeartChartLogo`'s pattern) the moment it's supplied and committed to `public/`, and drop the gradient placeholder in the same change.
- Composed on `ElevatedCard` rather than a local nested-shell implementation — see that component's Implementation rules for why `AuthCard`/`HeartChartSummary` weren't also migrated onto it.
- `eyebrowHeading`/`highlightHeading` are two separate props (not one heading string) because they carry different colors/sizes per Figma (`text-display-lg` neutral vs. `text-display-2xl` `highlight-gold`) — don't collapse them into a single templated string.

### Visual examples

Rendered at `/design-system/components#tophero` and live on `/heartchart-resources`.

---

## CourseCard

**Status**: Draft (per-step video thumbnails unavailable — see Implementation rules)
**Source**: `src/components/course-card.tsx`
**Figma**: AMFM Portal file, "Course Card" component (node `2074:45130`); the 3-step pattern on `/heartchart-resources` at nodes `2316:26815` (Step 1), `2316:26886` (Step 2), `2318:26954` (Step 3)

### Purpose

One step in a fixed 3-step "get ready" course pattern — a colored numbered header, a video-cover CTA over a photo, and a checklist of supporting actions — used together as the "Three simple steps" section beneath `TopHero` on `/heartchart-resources`.

### Anatomy

Numbered header (`STEP {n}`, white text, trailing `ArrowRight`, colored background) → video-cover section (photo backdrop in Figma; see Implementation rules — uppercase eyebrow, `font-display` heading, outline `Button` with `PlayCircle`) → checklist (`Check`-in-circle icon + text row, repeated per item).

### Variants (`step` prop)

| `step` | Header color | Figma token |
|---|---|---|
| `1` | `bg-border-brand` | `#c07858`, exact match to the existing `border-brand` token |
| `2` | `bg-text-brand` | `#894e34`, exact match to the existing `text-brand` token |
| `3` | `bg-brand-900` | `#47261a`, the one genuinely new token this pattern needed — see `DESIGN.md` Color tokens |

A closed `1 | 2 | 3` union, not an open `number`, since the pattern is a fixed 3-step course, not an arbitrarily-long list — don't generalize past what's evidenced.

### States

None of its own beyond the static `hideArrow` prop (Figma hides the header's trailing arrow on the last step). The video CTA and checklist links inherit their own elements' hover/focus states.

### Properties / API

```ts
interface CourseCardProps {
  step: 1 | 2 | 3;
  eyebrow: string;
  title: ReactNode;
  videoCtaLabel: string;
  onWatchVideo?: () => void;
  /** Each item renders with a leading check icon — compose inline links directly. */
  checklist: ReactNode[];
  hideArrow?: boolean;
  className?: string;
}
```

`checklist` accepts pre-composed `ReactNode`s (rather than a stricter `{text, href}` shape) because Figma's real copy mixes plain text with inline brand-colored links inside the same sentence (e.g. "**Share your QR code and link** with your team to start your dashboard") — the caller composes the inline `<a className="text-primary underline">` segment directly, matching `BenefitListItem`/`ResourceListItem`'s existing "caller supplies rich content" precedent rather than this component parsing rich text itself.

### Design tokens used

`bg-border-brand`/`bg-text-brand`/`bg-brand-900` (step header, see Variants), `bg-muted` (checklist icon circle — Figma's `#f5f5f5` "bg-tertiary" is a near-exact match to the existing `muted` token), `text-muted-foreground` (checklist text + icon), `text-primary` (inline links within checklist text, exact match to Figma's `#aa6140`), `font-display`/`text-display-md` with a local `leading-[2.375rem]` override (video-cover heading — see `DESIGN.md`'s note on this one-off 36px/38px pairing), `nav-surface-from`/`nav-surface-to` (placeholder video-cover background — see Implementation rules). `Button`'s `outline` variant for the video CTA.

### Accessibility requirements

- Checklist icons are `aria-hidden="true"` — the adjacent text alone conveys the meaning, consistent with `BenefitListItem`/`PasswordRequirementItem`'s existing precedent.
- The header's `ArrowRight` is `aria-hidden="true"` — purely decorative, the "STEP {n}" text already conveys sequence.
- Inline links within checklist items are real `<a>` elements (composed by the caller) — never a styled `<span>` with a click handler.

### Responsive behavior

Not yet evidenced against a Figma mobile/tablet frame (fixed desktop 3-column composition). Its call site (`/heartchart-resources`) stacks the 3 cards from `grid-cols-1` to `lg:grid-cols-3`, per `DESIGN.md`'s Layout/grid rules — a call-site decision, not a change to this component's own layout.

### Implementation rules

- **Per-step video thumbnails unavailable in this environment** — same blocked-asset class as `TopHero`'s background photo (`www.figma.com` denied by egress policy). Renders a `nav-surface-from`→`nav-surface-to` dark gradient behind each video-cover section in place of the three distinct reference photos. Status stays **Draft** for this reason — wire to real `imageSrc`/thumbnails once available, matching `VideoPlayer`'s "wire to a real source later" precedent.
- `step`'s header color is a fixed lookup (`STEP_HEADER_CLASSNAME`), not computed — keeps the 3-tier brand scale's exact Figma-sourced colors as a single source of truth rather than an interpolated gradient function.
- The checklist icon (`Check`, `size-3.5`, inside a `bg-muted rounded-full size-6`) is a static, always-confirmed indicator — same semantic category as `BenefitListItem`, not a derived validation state like `PasswordRequirementItem`; don't reuse either of those components here, this is a third, purpose-built row shape (a numbered course step's action list, not a benefit or a password rule).

### Visual examples

Rendered at `/design-system/components#coursecard` and live (all 3 steps) on `/heartchart-resources`.

---

## FooterCta

**Status**: Draft (background texture unavailable — see Implementation rules)
**Source**: `src/components/footer-cta.tsx`
**Figma**: AMFM Portal file, "Footer CTA" component (node `1909:25789`) — per its own Figma dev annotation, "This component only shows if they have a free account."

### Purpose

Full-bleed banner prompting a free-tier account to upgrade to Premium — a heading plus a single CTA, used at the bottom of `/heartchart-resources` and (per the component library's `instanceCount`) the HeartChart Dashboard "No data" state.

### Anatomy

Full-width `bg-primary` band → centered `font-display text-display-md` heading + outline-style `Button` (`Sparkles` icon) sized to sit legibly on the brand-filled background.

### Variants

None — a single layout; heading/CTA copy are caller-supplied.

### States

None of its own — a static banner. The CTA `Button` inherits its own hover/focus states.

### Properties / API

```ts
interface FooterCtaProps {
  heading: string;
  ctaLabel: string;
  onCtaClick?: () => void;
  className?: string;
}
```

### Design tokens used

`bg-primary` (band background — a flat approximation of Figma's gradient/noise texture, see Implementation rules), `font-display`/`text-display-md`, `text-primary-foreground` (heading + CTA text/border, theme-safe white). `Button`'s `outline` variant, locally overridden (`bg-transparent`, `border-primary-foreground/30`, `hover:bg-white/10`) since none of `Button`'s existing variants are calibrated for a brand-filled (rather than neutral) backdrop — the same "local `className` override for a new surface context" technique `HeartChartSummary` already established, not a new shared variant (no second use case yet to justify one).

### Accessibility requirements

- Heading is real text (not an image), legible against `bg-primary` via `text-primary-foreground` (an already-verified WCAG AA pairing, see `DESIGN.md` Color tokens).
- The CTA is a real `Button`, inheriting its keyboard focus and focus-visible ring.

### Responsive behavior

Not yet evidenced against a Figma mobile/tablet frame. Content wraps (`flex-wrap`) and centers at any width; no breakpoint-specific layout changes yet.

### Implementation rules

- **Background texture unavailable in this environment** — same blocked-asset class as `TopHero`/`CourseCard`. Figma's reference shows a warm gradient/noise-texture image layered under a `mix-blend-luminosity` grain overlay at 5% opacity; renders as a flat `bg-primary` fill instead. Status stays **Draft** for this reason.
- The CTA button's exact Figma treatment (`bg-primary_alt` `#13161b` fill, `border-white/12`) doesn't translate directly — that combination assumes the button sits on `bg-primary_alt`'s own dark-navy context elsewhere in the design system, not on this component's brand-terracotta background (which would make a same-color fill invisible). Approximated instead as a transparent/bordered treatment that reads correctly against `bg-primary` — revisit if a real dark-surface reference for this exact button ever surfaces.

### Visual examples

Rendered at `/design-system/components#footercta` and live at the bottom of `/heartchart-resources`.

---

## Card

**Status**: Production Ready
**Source**: `src/components/ui/card.tsx`
**Figma**: AMFM Portal file, `Onboarding/Create Profile` (node `1909:25769`) — the modal shell (header with title/description + top-right `HeartChartLogo` accessory, content, footer) maps onto `Card`'s existing `CardHeader`/`CardContent`/`CardFooter` anatomy with no changes to the primitive itself; used for `/create-profile`

### Purpose

Generic raised content surface for grouping related content — the base shadcn/ui `Card`, unmodified from upstream shape.

### Anatomy

`Card` (root) → `CardHeader` (grid, supports an optional `CardAction` in its top-right) → `CardTitle` / `CardDescription` → `CardContent` → `CardFooter`.

### Variants

None — compose sub-parts as needed; omit any part that isn't needed (e.g. no `CardFooter` if there's no footer content). **`CardAction` may contain more than one control composed in a row** (e.g. an icon-leading link/button alongside a search-style input, `flex items-center gap-*`) rather than a single accessory — confirmed against the "Our Marriage Champions" reference frame (Figma node `3724:23444`, Card header row: "Invite Team Member" action + "Search" input side by side), which needs two independent top-right controls rather than the single `HeartChartLogo` accessory `/create-profile` uses. This is a usage clarification, not an anatomy or prop change to `CardAction` itself.

### States

None of its own — purely a layout/surface primitive. Interactive content inside it carries its own states.

### Properties / API

Each sub-component is `React.ComponentProps<"div">` — no custom props beyond `className`/children.

### Design tokens used

`bg-card`, `text-card-foreground`, default `border`, `shadow-sm`. On `/create-profile`, the call site overrides the default border/shadow via `className` (`border-none shadow-xl rounded-2xl gap-0 py-0`), and renders section dividers as plain `border-border-secondary border-t` `div`s nested *inside* `CardHeader`/`CardFooter` rather than as a `border-b`/`border-t` class on the sub-components themselves (see Implementation rules for why) — all existing tokens/Tailwind built-ins, no new ones added.

### Accessibility requirements

Purely structural — accessibility depends on the semantic content placed inside (use real headings in `CardTitle` slot content where appropriate for the page's heading hierarchy).

### Responsive behavior

Fluid width by default (fills its container); no built-in breakpoint behavior — control max-width/columns at the call site (see `DESIGN.md` Grid system). On `/create-profile`, the call site sets `w-full max-w-2xl` and collapses its 2-field row to one column below `sm` — both call-site concerns, not changes to `Card` itself.

### Implementation rules

- Keep this primitive matching upstream shadcn/ui shape exactly — a flat single-surface card. Don't bend it to fit a non-flat shape (see `AuthCard` below for why that pattern lives elsewhere).
- **`/create-profile` deliberately uses this theme-aware `Card` rather than the fixed-light `AuthCard` pattern** used by `/login`/`/signup` — `AuthCard`'s nested outer-shell/inner-bordered-panel anatomy doesn't match this frame's flat, section-divided shape (header/content/footer separated by full-width rules, no inner sub-panel), while `Card`'s existing `CardHeader`/`CardContent`/`CardFooter` composition is an exact structural fit with zero modification to the primitive. This is a call-site decision, not a `Card` contract change.
- **Fixed: `cn()` was silently dropping `text-display-md`/`text-display-sm` whenever paired with a text-color utility, rendering `CardTitle` at the browser default size instead of 36px.** `tailwind-merge`'s built-in `font-size` class group only recognizes Tailwind's default `text-*` scale (`xs`/`sm`/`base`/`lg`/...); it doesn't know about this project's custom `--text-display-sm`/`--text-display-md` theme keys (`src/tokens/typography.css`), so it fell through to the generic `text-color` group — the same group `text-foreground` belongs to. Any `cn(..., "text-display-md text-foreground", ...)` call (exactly `CardTitle`'s usage on `/create-profile`) therefore had `text-display-md` silently removed, keeping only `text-foreground` and leaving the title at its inherited font-size. **Fixed at the root** in `src/lib/utils.ts` by extending `tailwind-merge`'s `font-size` group (`extendTailwindMerge({ extend: { classGroups: { "font-size": [{ text: ["display-sm", "display-md"] }] } } })`) rather than patching every call site — this protects every future use of the display scale, not just `CardTitle`'s. Verify with `node -e "console.log(require('tailwind-merge').twMerge('text-display-md', 'text-foreground'))"` — before the fix this printed only `text-foreground`.
- **`CardTitle`'s base `leading-none` still fights the display scale's paired line-height** (`text-display-md` carries its own 40px line-height, but `leading-none` sets `line-height: 1` on a separate, non-conflicting `tailwind-merge` group, so which one wins depends on Tailwind's internal utility-emission order, not class order in the JSX). Rather than rely on that, `/create-profile`'s `CardTitle` explicitly adds `leading-[2.5rem]` (40px, `DESIGN.md`'s documented `display-md` line-height) — an unambiguous `leading-*` vs `leading-*` conflict that `tailwind-merge` resolves correctly. Do this for any other `CardTitle` using the display scale; don't assume the token's own line-height wins by default.
- **Don't put `border-t`/`border-b` directly on `CardHeader`/`CardFooter` when also overriding their padding** — `card.tsx`'s base classes include self-referential arbitrary-variant rules (`[.border-b]:pb-6` / `[.border-t]:pt-6`) that add padding *only when the element also carries that literal border class*. Because Tailwind compiles `[.border-b]:pb-6` to a two-class compound selector (higher CSS specificity than a plain single-class `pb-5`), a plain padding override loses to it even when it appears later via `cn()` — `tailwind-merge` doesn't recognize the bracket-variant form as conflicting with a plain `pb-*`/`pt-*` class, so both end up in the class list and CSS specificity (not source order) decides. `/create-profile`'s header/footer instead render the divider as a plain child `div` (`border-border-secondary border-t`, no bracket-variant involved) and set `CardHeader`/`CardFooter`'s own padding as ordinary non-conflicting utilities.
- **`/create-profile`'s modal restyled to a flush, zero-gap flex layout matching the Figma frame exactly**, rather than relying on `Card`'s default `gap-6`/`py-6`: the Figma `Modal` node has *no* implicit spacing between its header/content/actions sections — every gap is an explicit padding value or spacer, so leaving `Card`'s default `gap-6` (24px) in place double-counted spacing on top of each section's own padding. The call site overrides `Card` to `gap-0 py-0` and expresses every gap as the section's own padding/margin, verified against the Figma node metadata (`Onboarding/Create Profile`, node `1909:25769`): `CardHeader` `pt-6`(24px)+`px-6`(24px), `gap-4`(16px) between the title block and `HeartChartLogo`, `gap-0.5`(2px) between `CardTitle`/`CardDescription`, then a divider `div` with `mt-5`(20px) before it; `CardContent` keeps its existing `pt-5`(20px); `CardFooter` uses `pt-8`(32px) before its divider `div`, then a `flex justify-end px-6 py-6`(24px top and bottom) row for the button. **Fixed: the button row previously used `pb-6` only (no top padding)**, which read as the divider running directly into the button — the Figma `Divider-wrap` graphic under the footer is a ~25px gradient/shadow asset (not a plain hairline) with its visible line inset within that height, so it never actually sits flush against the actions row the way a bare 1px line does. Since this divider is approximated here as a plain 1px `border-t` (the same class of simplification as `AmfmLogo`'s text approximation below, since the exact gradient asset isn't available — see that entry's Implementation rules for why), that graphic's baked-in breathing room has to be restored explicitly: `py-6` gives the button even padding above (between it and the divider) and below (between it and the card edge), matching `pt-8`'s gap above the divider on the other side.
- ~~The `Onboarding/Create Profile` Figma frame specifies a title/description in a serif "Financier Display" font not yet defined in `DESIGN.md`~~ **Resolved**: `DESIGN.md`'s Typography system now defines `font-display`/`text-display-md`, rendering the real, licensed `Financier Display` face (self-hosted via `next/font/local`, replacing the earlier `Fraunces` Google Fonts substitute). `/create-profile`'s `CardTitle` renders `font-display text-display-md leading-[2.5rem] font-light text-foreground` (was `text-3xl font-semibold tracking-tight`); `CardDescription` renders `text-text-tertiary` (was the generic `text-muted-foreground`, a different gray — Figma's description color resolves to the `text-tertiary` token, `#535862`, exactly).
- **`/create-profile`'s content column widened**: the Figma frame places a `368px`-wide `PricingCard` beside the form fields (`gap-[40px]`/`gap-10`), so the page's `Card` call site now uses `max-w-4xl` (was `max-w-2xl`) to fit both columns without cramping the fields column; below `lg`, the two columns stack (fields, then `PricingCard`) per `DESIGN.md`'s mobile-first layout rules — no Figma mobile reference exists for this frame, so the stacking behavior is a deliberate application of the general grid rules, not a pixel-sourced breakpoint.
- **Multi-action `CardAction` composition (see Variants)**: when `CardAction` holds more than one control, lay them out with `flex items-center gap-*` (stacking `flex-col` below `sm`) at the call site. Implemented on `/marriage-champions`: because this composition also needs to stack vertically below `sm` (unlike every prior single-accessory `CardAction` use, which never needed responsive behavior), that page's `CardHeader` overrides the primitive's default `grid` layout with `flex flex-col gap-4 ... sm:flex-row sm:items-start sm:justify-between` at the call site, wrapping `CardTitle`/`CardDescription` in a plain `div` — `CardAction`'s own base classes (`col-start-2 row-span-2 ...`) are grid-only positioning utilities that become harmless no-ops once the parent is a flex container, so no change to `CardHeader`/`CardAction` themselves was needed. Verified in a real browser at 390px/834px/1512px widths — see `Table`'s Responsive behavior above for the same page's other breakpoint verification.

### Visual examples

Rendered at `/design-system/components#card` and at `/design-system/patterns#create-profile-card`; live on `/create-profile` and (multi-action `CardAction` composition) `/marriage-champions`.

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
**Figma**: AMFM Portal file, node `1909:25767` ("Onboarding/login"), node `1909:25768` ("Onboarding/sign up"), node `1909:25769` ("Onboarding/Create Profile") — all three use the same two arbitrary blur values (`backdrop-blur-[20px]` content layer, `backdrop-blur-[8px]` overlay) and `bg-overlay`/85% scrim (the `"flat"` variant, default). **Not yet confirmed**: whether the sign-up/Create Profile screens' background photos are the same asset as `public/login-background.jpg` or distinct exports — verify before assuming this component needs no changes for those routes. Also node `1909:25772` ("Onboarding/First run church admin") — the `"radial"` variant, used on `/welcome`; this screen's background photo is a distinct church-congregation photo in Figma but currently reuses `public/login-background.jpg` as a stand-in (product decision — see `DESIGN.md` Known gaps).

### Purpose

Full-bleed background photo + dark scrim shared by any onboarding-style surface built on the same Figma photo background (currently `/login`, `/signup`, `/create-profile`, `/`, and `/welcome`).

### Anatomy

Outer full-viewport container → absolutely-positioned background image (`bg-[url('/login-background.jpg')] bg-cover bg-center`) → a scrim-tinted content layer (`children`) — the scrim itself is one of two treatments, see Variants.

### Variants (`scrim` prop)

| Variant | Treatment | Use for |
|---|---|---|
| `"flat"` (default) | `bg-overlay` at `opacity-85`, layered on a two-stage blur (`backdrop-blur-[20px]` content / `backdrop-blur-[8px]` overlay) | `/login`, `/signup`, `/create-profile`, `/` — the original treatment, unchanged |
| `"radial"` | An unblurred radial-gradient vignette (`rgba(10,13,18,.7)` center → `rgba(10,13,18,.9)` edge — the `overlay` token's rgb equivalent; Tailwind arbitrary gradients can't reference the CSS custom property directly) | `/welcome` (first-run church admin) |

Adding `scrim="radial"` (or omitting `scrim` for the existing default) is fully backward-compatible — no visual change to any existing consumer.

### States

None — static decorative backdrop, for either variant.

### Properties / API

```ts
{
  className?: string;
  scrim?: "flat" | "radial"; // defaults to "flat"
} & React.PropsWithChildren
```

### Design tokens used

`bg-overlay` (`"flat"` scrim, `opacity-85`), `backdrop-blur-[20px]` / `backdrop-blur-[8px]` (arbitrary blur values, `"flat"` only — no blur token exists yet; don't invent one without a second real use case per `CLAUDE.md`'s anti-premature-abstraction guidance). `"radial"` uses a hardcoded `rgba(10,13,18,*)` gradient rather than a token reference — see Implementation rules.

### Accessibility requirements

Decorative background image — no `alt` text needed (it's a CSS background, not an `<img>`). Ensure content rendered inside still meets contrast requirements against the scrim (see `DESIGN.md` Accessibility standards) — verified for both variants' text content (`nav-foreground`/`nav-foreground-muted`/`highlight-gold` on `/welcome`).

### Responsive behavior

`min-h-screen w-full` fills the viewport at every breakpoint; content layer centers its children (`items-center justify-center`) regardless of viewport size — same for both scrim variants.

### Implementation rules

- Shared across routes — changes here affect every consuming page; verify `/login`, `/signup`, `/create-profile`, `/`, and `/welcome` all still look correct after any edit.
- Don't duplicate this pattern per-route; extend `className` (and now `scrim`) instead — this is exactly why the radial vignette became a variant of this component rather than a second, parallel backdrop implementation.
- The `"radial"` gradient's `rgba(10,13,18,*)` values are the `overlay` token's rgb equivalent, hardcoded because Tailwind's arbitrary `bg-[radial-gradient(...)]` syntax can't cleanly reference a CSS custom property inline. If a second radial/gradient scrim use case appears, revisit converting this to a real token-driven gradient instead of a second hardcoded value.
- **Every consumer's direct `children` element must carry `relative z-10` (or equivalent).** The scrim layer (either variant) is `absolute inset-0` and is rendered as a sibling of `children` inside the same positioned parent; CSS stacks positioned elements above non-positioned ones regardless of DOM order, so an unpositioned `children` root paints — and receives pointer events — *underneath* the scrim even though the scrim appears first in JSX. `/login`, `/signup`, `/`, and `/create-profile` all apply `relative z-10` to their child (`AuthCard`, the hero `div`, `Card`); `/welcome` was missing it (its content silently sat under the scrim) and has been fixed to match — see `DESIGN.md`'s "Stacking order on full-bleed backdrops" for the general rule. Don't rely on incidental positioning (e.g. a child that happens to be `relative` for other reasons) — set it explicitly so the requirement survives refactors.

### Visual examples

Rendered live on `/login`, `/signup`, `/create-profile`, `/`, and `/welcome`; both scrim variants shown side-by-side at `/design-system/components#photobackdrop` (as reduced-height illustrative previews, not the real full-bleed component — see that page's implementation note) and the full `/welcome` composition at `/design-system/patterns#welcome-hero`.

---

## AuthCard

**Status**: Production Ready
**Source**: `src/app/login/_components/auth-card.tsx`
**Figma**: AMFM Portal file, node `1909:25767` ("Onboarding/login", card shell) and node `1909:25768` ("Onboarding/sign up", node `1909:25205` "WeDo Activity") — outer shell (`p-2`/`shadow-card`/`rounded-2xl`), inner panel (`px-6 pt-5 pb-4`/`rounded-md`/`border-black/10`), and content width (`w-90 max-w-90`) are pixel-exact matches on both screens

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
- **Known follow-up**: `/signup` imports this component directly from `src/app/login/_components/auth-card.tsx` (a cross-route import) rather than duplicating it, since it's confirmed pixel-identical on both screens. Now that two real routes depend on it, it's a reasonable candidate to relocate to `src/components` per `CLAUDE.md`'s reuse-over-duplication guidance — deferred here to keep the sign-up implementation scoped to additive changes only. The same applies to `HeartChartLogo` and `GoogleIcon` below.

### Visual examples

Rendered live on `/login` and `/signup` (imported from its current `login/_components` location — not yet relocated to a shared path; see Implementation rules); referenced at `/design-system/patterns#auth-card` and `#auth-card-signup`.

---

## HeartChartLogo

**Status**: Production Ready
**Source**: `src/app/login/_components/heartchart-logo.tsx`
**Figma**: AMFM Portal file, node `1909:25767` ("Onboarding/login") and node `1909:25768` ("Onboarding/sign up", node `1909:25210`) — same logo + "Powered by AMFM.org" caption pairing confirmed on both screens; also used standalone (no caption) in the `CardAction` slot on `Onboarding/Create Profile` (node `1909:25769`, node `1909:25247`) — confirms the caption pairing is composed by the caller, not built into the component

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

Rendered at `/design-system/foundations#brand-mark` and on `/login`, `/signup`, and `/create-profile` (imported from its current `login/_components` location — see `AuthCard`'s Implementation rules).

---

## GoogleIcon

**Status**: Production Ready
**Source**: `src/app/login/_components/google-icon.tsx`
**Figma**: AMFM Portal file, node `1909:25767` ("Onboarding/login") and node `1909:25768` ("Onboarding/sign up", node `1909:25211`) — same `Button variant="outline"` + icon composition confirmed on both screens; only the label text differs ("Log in with Google" vs. "Sign up with Google")

### Purpose

Google "G" mark for the "Log in with Google" and "Sign up with Google" buttons.

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

Rendered on `/login`'s "Log in with Google" button and `/signup`'s "Sign up with Google" button (imported from its current `login/_components` location on `/signup` — see `AuthCard`'s Implementation rules).

---

## AmfmLogo

**Status**: Draft (implemented as a hand-authored text approximation — source raster/vector asset remains unavailable; see Implementation rules)
**Source**: `src/app/create-profile/_components/amfm-logo.tsx`
**Figma**: AMFM Portal file, `Onboarding/Create Profile` (node `1909:25769`), node `1909:25281` ("Logo") + node `1909:25280` ("Powered by" caption text)

### Purpose

Renders the AMFM ministry wordmark with a "Powered by" caption — the inverse pairing of `HeartChartLogo`'s existing "Powered by AMFM.org" caption (this is AMFM's own mark, not HeartChart's, used as a footer credit inside the "Free Membership" pricing card — see `PricingCard` below).

### Anatomy

"Powered by" caption text (`text-xs`, `font-medium`, `tracking-[0.24px]`, `text-text-tertiary`) + adjacent logo mark, itself two stacked pieces read off the Figma screenshot: the `font-display font-semibold text-foreground` wordmark ("amfm") and, to its right, a 3-line, tiny (`text-[5.5px]`/`leading-[7px]`) tracked-uppercase caption ("Association" / "of Marriage" / "& Family Ministries", `text-text-tertiary`) — the real mark's flattened Figma vector renders both pieces as one image, which the previous version of this component omitted entirely.

**Note on `font-semibold` (600)**: `Financier Display` (see `DESIGN.md` Typography system) only ships static 300/400/500/700/900 weight files, no 600 — the browser's standard font-weight matching falls back to the nearest heavier available weight (700, Bold) for this wordmark rather than a true semibold cut. Pre-existing behavior (the prior `Fraunces` substitute only loaded 300/400 and hit the same fallback), not a regression introduced by the Financier Display migration.

### Variants / States

None — a static mark + caption pairing, matching `HeartChartLogo`'s precedent.

### Properties / API

No props — fixed layout (`flex h-6 items-center gap-2`), matching `HeartChartLogo`'s no-props pattern.

### Design tokens used

`text-text-tertiary`, `text-xs` (caption); `font-display`, `text-foreground` (wordmark approximation); `text-text-tertiary` again for the tiny tagline lines. The tagline's `text-[5.5px]`/`leading-[7px]`/`tracking-[0.4px]` are one-off arbitrary values, not tokens — sized by eye against the Figma screenshot's ~24px-tall mark, the same tier of hand-tuning as `GoogleIcon`'s path coordinates. The real mark, once available, would be a raster/vector asset and not token-driven.

### Accessibility requirements

The wordmark + tagline pair is wrapped in a single element carrying `role="img"` + `aria-label="AMFM — Association of Marriage & Family Ministries"`; the two inner `<span>`s are `aria-hidden="true"` so assistive tech reads one composite name instead of two fragments ("amfm" then the tagline) — matching `HeartChartLogo`'s `alt="HeartChart"` precedent of naming the whole brand mark once, not each visual piece.

### Responsive behavior

Fixed `h-6` row, inline content — no breakpoint-specific sizing evidenced.

### Implementation rules

- **Asset still blocked, approximated instead of left unimplemented**: Figma only serves this asset via a temporary MCP asset URL, and this environment's outbound network policy blocks direct downloads from `www.figma.com` (confirmed via the agent proxy status endpoint — a `403`/policy denial, not a transient failure) — the same class of gap `DESIGN.md`'s "Known gaps" previously resolved for the HeartChart wordmark and `/login` photo by having the real export supplied directly, which hasn't happened yet here. Unlike those two (a detailed photo and a distinctive wordmark glyph), this mark is a short logotype + caption low-fidelity-risk enough to approximate with styled text — same tier of approximation as `GoogleIcon` (see that entry) — rather than leave the "Free Membership" card's footer credit missing (or, as previously, missing its tagline half entirely). Status stays **Draft**, not Production Ready, specifically to flag this as not yet pixel-verified against the real mark.
- **Do not** attempt to redraw the real logo as SVG paths from the screenshot (that would misrepresent a hand-guess as a faithful reproduction) — the text approximation is deliberately plain, not a traced facsimile. The tagline's exact 3-line wrap ("Association" / "of Marriage" / "& Family Ministries") was read off a 126×24px Figma screenshot crop (the node's native render size — Figma won't upscale a raster crop past a vector layer's own bounds) and is a best-effort transcription, not a verified source of truth.
- Replace with the real exported asset (via `next/image`, matching `HeartChartLogo`'s pattern) the moment it's supplied and committed to `public/` — remove the text approximation in the same change, don't leave both.

### Visual examples

Rendered live in `PricingCard`'s footer on `/create-profile`; referenced at `/design-system/components#amfmlogo` and `/design-system/patterns#create-profile-card`.

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

---

## PricingCard

**Status**: Production Ready (single confirmed use site so far — does not yet meet `CLAUDE.md`'s reusability bar for a `src/components` primitive, see Implementation rules)
**Source**: `src/app/create-profile/_components/pricing-card.tsx`
**Figma**: AMFM Portal file, `Onboarding/Create Profile` (node `1909:25769`), node `1909:25264` ("Pricing card")

### Purpose

Highlights a plan tier's included features alongside a form, ending in a "Powered by" credit — seen on the referenced frame as the "Free Membership" panel next to the profile-setup form.

### Anatomy

2px brand-bordered card → header (title, serif display type — see Implementation rules) → content (`BenefitListItem` list, see above) → divider → centered `AmfmLogo`/"Powered by" footer (see above).

### Variants

None evidenced — single tier ("Free Membership") on the referenced frame; a multi-tier variant surface is speculative and not yet warranted.

### States

None of its own — a static content panel; no interactive states.

### Properties / API

```ts
interface PricingCardProps {
  title: string;
  benefits: string[]; // rendered via BenefitListItem
}
```

### Design tokens used

`border-border-brand` (2px card border, existing token), `shadow-xs`, `rounded-xl` (closest scale value to Figma's `12px` corner radius — see Implementation rules), `border-border-secondary` (footer divider). Title typography uses the display scale resolved in `DESIGN.md`: `font-display text-display-sm text-foreground` (the real, licensed "Financier Display" face, self-hosted via `next/font/local`, `30px`/`38px`).

### Accessibility requirements

Card title renders as a real `<h3>` (correct for its position nested inside the page's `h1`→`CardTitle` hierarchy on `/create-profile` — see `DESIGN.md` Accessibility standards — semantic structure); inherits `BenefitListItem`'s and `AmfmLogo`'s accessibility requirements for its content.

### Responsive behavior

The referenced frame provides only a fixed desktop composition (`368px` fixed-width column alongside the form) with no mobile/tablet Figma reference, the same category of gap already tracked for `HeartChartSummary`. `PricingCard` itself is fluid-width (`w-full`) — the call site (`CreateProfileForm`) controls the column width (`lg:w-92`, `368px` at Tailwind v4's dynamic spacing scale) and collapses to a single stacked column below `lg`, per `DESIGN.md`'s mobile-first grid rules — this stacking behavior is a deliberate application of the general layout rules, not sourced from a Figma mobile frame.

### Implementation rules

- **Single use site today** — per `CLAUDE.md`'s Component Creation Process ("will this pattern appear more than once?"), this does not yet meet the bar for promotion to `src/components`. Kept route-colocated under `src/app/create-profile/_components`, following the same precedent as `AuthCard`/`DposystemLearnMore`; promote to a shared primitive only if a second real pricing/plan screen appears.
- **Radius is an intentional near-match, not exact**: Figma specifies a `12px` corner radius (reusing its `spacing-lg` token opportunistically for radius) which doesn't land on any value in `DESIGN.md`'s radius scale (`rounded-lg`=10px, `rounded-xl`=14px, both 2px off) — `rounded-xl` was chosen as equidistant-but-visually-closer to the modal's own `rounded-2xl` (16px) outer radius, keeping a clear nested-corner hierarchy. Don't invent an arbitrary `rounded-[12px]` value per `DESIGN.md`'s "use scale utilities" rule.
- Depends on `BenefitListItem` and `AmfmLogo` above — both implemented (see their entries); `AmfmLogo` specifically remains a text approximation pending its blocked asset.

### Visual examples

Rendered live as the "Free Membership" card on `/create-profile`; referenced at `/design-system/patterns#create-profile-card`.

---

## DropdownMenu

**Status**: Production Ready
**Source**: `src/components/ui/dropdown-menu.tsx`
**Figma**: No dedicated Figma node of its own — introduced to implement `GlobalNav`'s account-card flyout menu (see `GlobalNav` below), sourced from a screenshot supplied directly in conversation rather than a `get_design_context`-fetched node.

### Purpose

Generic floating menu primitive for a small set of actions/destinations triggered from a control (button, avatar, etc.) — e.g. `GlobalNav`'s account-card flyout (Personal Profile, Church Profile, Account Settings, Subscription & Billing, Terms & Privacy).

### Anatomy

`DropdownMenuTrigger` (wraps the triggering control via `asChild`) → `DropdownMenuContent` (portal-rendered popover containing `DropdownMenuItem`/`DropdownMenuCheckboxItem`/`DropdownMenuRadioItem`/`DropdownMenuLabel`/`DropdownMenuSeparator`/nested `DropdownMenuSub`).

### Variants

None — a single primitive; menu items are caller-supplied.

### States

| State | Behavior |
|---|---|
| Closed | Trigger only; content unmounted |
| Open | `data-[state=open]:animate-in`/`zoom-in-95`/`fade-in-0` on open, reverse on close, paired with `motion-reduce:animate-none` |
| Item focus/hover | `focus:bg-accent focus:text-accent-foreground` (keyboard and pointer share Radix's single `focus` state) |
| Item disabled | `data-[disabled]:opacity-50 data-[disabled]:pointer-events-none` |
| Destructive item | `variant="destructive"` → `text-destructive`, tinted focus background |

### Properties / API

Standard Radix `DropdownMenu.Root`/`Trigger`/`Content`/`Item` props (`open`, `onOpenChange`, `modal`, etc.) — no custom props beyond styling; `DropdownMenuContent` defaults `sideOffset` to `4`.

### Design tokens used

`bg-popover`, `text-popover-foreground`, `bg-accent`/`text-accent-foreground` (focus), `text-destructive` (destructive variant), default `border`/`shadow-md` — the same token pattern as `Select`'s listbox. Callers may override via `className` for a fixed-theme surface — see `GlobalNav`'s account menu below, which overrides to its `nav-*` tokens instead of the swappable `popover` tokens, since it's an extension of `GlobalNav`'s theme-fixed dark chrome, not a themed app-surface popover.

### Accessibility requirements

- Built on Radix's `DropdownMenu` primitive (full menu ARIA pattern — `role="menu"`/`menuitem`, arrow-key/Home/End/typeahead navigation, `Escape` to close and return focus to the trigger) — do not hand-roll a `div`-based menu, per `DESIGN.md`'s Accessibility standards on custom widgets, the same rule already applied to `Select`.
- `DropdownMenuTrigger` uses `asChild` to merge Radix's trigger behavior (`aria-haspopup`, `aria-expanded`, keyboard open) onto the caller's own interactive element rather than wrapping it in an extra nested button.

### Responsive behavior

Content width is caller-controlled (`className`); Radix's own collision detection repositions/flips the popover to stay inside the viewport — no custom breakpoint behavior.

### Implementation rules

- Hand-authored `src/components/ui/dropdown-menu.tsx` from `@radix-ui/react-dropdown-menu` (added to `package.json`; installs fine from `registry.npmjs.org` despite `ui.shadcn.com` itself being unreachable — same `CLAUDE.md` shadcn-CLI-unreachable workflow already used for `Select`/`Dialog`), matching upstream shadcn/ui's `dropdown-menu` shape (`data-slot` attributes, the same destructive/inset `data-*` styling hooks).
- Includes the full upstream primitive surface (checkbox/radio items, labels, separators, submenus) even though `GlobalNav`'s account menu today only uses `DropdownMenuItem` — kept as a single generic primitive rather than a stripped-down one-off, consistent with `Select`/`Dialog` both shipping their full Radix-mapped surface.

### Visual examples

Rendered live as `GlobalNav`'s account-card flyout menu; see `GlobalNav` below and `/design-system/components#globalnav`.

---

## GlobalNav

**Status**: Draft (functionally complete and pixel-matched to both referenced Figma states, but its destination routes are placeholders and it isn't wired into a real app-shell layout yet — see Implementation rules)
**Source**: `src/components/global-nav.tsx`
**Figma**: AMFM Portal file — collapsed/default state, node `2065:13660` ("Sidebar navigation", 80px icon rail); expanded/exposed state, node `3727:25276` ("Content", 296px labeled panel); expanded-state logo lockup, node `3727:25279` ("Logo"). Both rail states are the *same* nav, collapsed vs. open — no separate mobile reference exists for either (see Responsive behavior). The account-card flyout menu has no Figma node of its own — see its Implementation rules entry below.

### Purpose

The app's primary left-hand navigation rail — persistent access to the church's core sections ("Your Church": Home, dashboard, champions, resources, training) and ministry tools (Loveology, assessments, small groups, etc.), plus account access, collapsed to an icon-only 80px rail by default and expanding to a labeled 296px panel on hover.

### Anatomy

`<nav>` (root chrome: `rounded-2xl`, gradient background, `backdrop-blur-2xl`, hairline border) →
- **Header**: a static, non-interactive brand mark (`role="img"`) cross-fading between the collapsed logomark and the expanded lockup — no longer a toggle (see States).
- **Navigation** (scrollable): two `NavSection`s ("Your Church"/"Church" and "Ministry Tools"/"Tools" — see Implementation rules for why the heading text itself changes between states), each a subheading + a list of `NavItem`s (icon + label).
- **Footer**: two more `NavItem`s ("Refer a Leader", "Support") + an account card (avatar with online indicator, name/email, and a chevron affordance) that opens a third-tier `DropdownMenu` flyout (Personal Profile, Church Profile, Account Settings, Subscription & Billing, Terms & Privacy) on click.

### Variants

None — a single component with two rail states (see below) plus an independent account-menu open/closed state, not caller-chosen variants.

### States

| State | Behavior |
|---|---|
| Collapsed (default) | `w-20` (80px). Every item shows its icon only — labels stay mounted in the DOM (so screen readers always announce the full label) but are visually collapsed via `max-width:0` + `opacity:0`, not removed or `aria-hidden`. Section headings show their short form ("Church"/"Tools"), centered. The header shows the compact logomark only. The account card shows only the avatar, centered. |
| Expanded (hover / focus) | `w-74` (296px), triggered by hovering the rail with a pointer, or focusing anything inside it via keyboard (see Implementation rules — neither Figma reference shows a dedicated toggle chrome, and the task that introduced this behavior explicitly calls for hover instead of the earlier click-to-toggle). Every item's label grows in (`max-width`/`opacity` transition). Section headings switch to their long form ("Your Church"/"Ministry Tools"), left-aligned. The header cross-fades to the full logo lockup. The account card grows to show name, email, and a `ChevronsUpDown` affordance. |
| Active item (e.g. "Home", "Our Marriage Champions") | `bg-gradient-to-r from-nav-active-from to-nav-active-to` pill, `text-nav-foreground` label, icon at `opacity-70` — present in **both** collapsed and expanded states, matching both Figma references exactly. Also sets `aria-current="page"`. `active` is derived from the current route via `usePathname()` (exact match against `item.href`), not stored per nav-data item — see Implementation rules. |
| Hover / Focus (items) | Not pixel-sourced (Figma shows only default/active) — added by product decision per `DESIGN.md`'s Interaction principles ("every interactive control has a visible hover/focus treatment"): `hover:bg-white/5` on inactive items, `focus-visible:ring-ring/50 focus-visible:ring-[3px]` on every interactive element (items, account card). |
| Account menu open | Clicking the account card (avatar + name, works in either rail state) opens a `DropdownMenu` flyout to its side — see `DropdownMenu` above. The rail stays expanded for as long as the menu is open, even if the pointer leaves the rail, so the flyout never appears anchored to a collapsed/hidden trigger. |
| External link (Marriage Ministry Profile, WeDo) | `target="_blank" rel="noopener noreferrer"` plus a `sr-only` "(opens in a new tab)" suffix on the label — not a Figma-visible affordance, added for accessibility. |

### Properties / API

```ts
interface GlobalNavProps {
  className?: string;
  defaultOpen?: boolean; // uncontrolled initial state; defaults to collapsed, matching Figma's default
  activeHref?: string; // overrides the route-derived active item — demo-only, see Implementation rules
}
```

Uncontrolled by design (internal `useState`, now driven by hover/focus/account-menu-open rather than a click handler) — no controlled `open`/`onOpenChange` pair exists yet since there's only one real call site (the `/design-system` demo); add one if/when a second consumer needs to control it externally (e.g. an app shell that also needs to know nav state for its own layout), per `CLAUDE.md`'s anti-premature-abstraction guidance.

### Design tokens used

`nav-bg`, `nav-surface-from`/`nav-surface-to` (chrome gradient, `/90` opacity), `nav-border`, `nav-active-from`/`nav-active-to` (active-item gradient), `nav-foreground`, `nav-foreground-muted`, `nav-foreground-subtle`, `nav-success` (online indicator) — see `DESIGN.md` Color tokens for the full table and why these are independent, theme-fixed tokens rather than reusing coincidentally-equal swappable ones (`muted-foreground`, `text-tertiary`, `foreground`). Also `border-white/8` (outer chrome border, a Tailwind opacity modifier — no new token needed), `backdrop-blur-2xl` (Tailwind's built-in 40px blur, exactly matching Figma's "Backdrop blurs/backdrop-blur-xl" effect radius — Figma's own name for this effect doesn't line up with Tailwind's `blur-xl`/24px, but the *value* does match `blur-2xl`/40px, so no arbitrary blur value was needed, unlike `PhotoBackdrop`'s `backdrop-blur-[20px]`/`[8px]`), `w-20`/`w-74`/`max-w-40`/`max-w-60` (Tailwind v4's dynamic spacing-scale utilities — real scale values, not arbitrary/bracketed ones, since Tailwind v4 generates any `w-<n>`/`max-w-<n>` from the shared `--spacing` variable). The account menu overrides `DropdownMenu`'s default `bg-popover`/`text-popover-foreground` with `bg-nav-surface-from`/`border-nav-border`/`text-nav-foreground` instead, since it's a fixed-dark extension of the rail, not a themed app-surface popover.

### Accessibility requirements

- Root is a real `<nav aria-label="Main">` landmark.
- **Labels stay in the accessibility tree at every width** — collapsing a label to `max-width:0`/`opacity:0` (rather than `display:none`/`aria-hidden`) means screen reader users get full item labels regardless of the sighted/visual collapsed state; this is a deliberate accessibility improvement over needing a duplicate `aria-label` per icon.
- The two section-heading variants ("Church" vs "Your Church", etc.) use `aria-hidden` on whichever one is visually hidden at a given time, so assistive tech isn't announced both simultaneously.
- The header is `role="img"` with a single `aria-label` ("amfm — Association of Marriage & Family Ministries") wrapping two `aria-hidden` cross-fading images, matching `AmfmLogo`'s pattern — it's no longer a `<button>` since expand/collapse is no longer a discrete click action (see Implementation rules).
- **Known tradeoff of hover-driven expand**: since there's no single toggle control left, there's no one element to carry `aria-expanded` describing the rail's own open/closed state (unlike the previous click-to-toggle version). This is mitigated, not fully resolved, by two things: labels stay in the accessibility tree at every width (above), so screen reader users always get full item text regardless of visual state; and keyboard users get the same expand behavior sighted mouse users get, since focusing any element inside the rail (via Tab) expands it too (see Implementation rules) — a keyboard-only user is never limited to icon-only labels.
- Every focusable element keeps a visible `focus-visible` ring — see States above.
- Active item sets `aria-current="page"`.
- **Dismissible, hoverable, persistent** (WCAG 1.4.13): pressing `Escape` collapses the rail from anywhere; moving the pointer from a nav item onto the expanded panel itself doesn't collapse it (the whole `<nav>` is the hover boundary, not each item); and the expanded state persists until the pointer leaves the rail or focus moves outside it, not on a timer.
- The account menu is a real Radix `DropdownMenu` (see above) — full menu ARIA pattern, `Escape` closes it and returns focus to the account-card trigger.
- External links get `rel="noopener noreferrer"` and an `sr-only` "(opens in a new tab)" cue.

### Responsive behavior

Both Figma references are desktop-only (80px/296px fixed rail widths); no mobile/tablet reference exists for either state. The component itself doesn't assume a viewport-based collapse — it's `h-full` and lets its container decide breakpoint behavior (see Implementation rules on positioning). The scrollable nav-items region (`overflow-y-auto`) prevents the rail from ever exceeding its container's height on short viewports, but a dedicated mobile pattern (e.g. a bottom bar or hamburger-triggered drawer) is not implemented — flag for design once a mobile reference exists, same category of gap as `Card`/`PricingCard`'s `/create-profile` layout. Hover-to-expand has no direct touch equivalent either; touch users can still reach every destination via the collapsed icon-only rail (icons are always tappable links), just without the label text visible until a real mobile pattern exists.

### Implementation rules

- **Expand trigger is hover (or keyboard focus), not click**: `open` is computed from three independent signals — `hoveredRef` (pointer inside the `<nav>`, via `onMouseEnter`/`onMouseLeave`), `focusedRef` (focus inside the `<nav>`, via `onFocus`/`onBlur` — React's synthetic focus/blur events bubble, so these fire for any descendant), and `accountMenuOpenRef` (the account `DropdownMenu`'s own open state, reported via its `onOpenChange`) — `open = hovered || focused || accountMenuOpen`. The third signal exists because the account menu's content is portal-rendered outside the `<nav>` DOM subtree: without it, opening the menu and moving the pointer off the (now-hidden-behind-the-menu) rail would blur/un-hover the rail and collapse it out from under its own open flyout. `Escape` force-closes regardless of hover/focus. Neither Figma reference shows a dedicated chevron/hamburger control, so there's still no added toggle chrome beyond what's pixel-referenced — only the *trigger gesture* changed (hover/focus instead of click), per the task that introduced this behavior.
- **Same markup, animated, not two swapped renders**: every collapsed/expanded difference (labels, section headings, header logo, account-card text) is implemented as one continuously-mounted DOM tree with `transition-[width]` (root) and `transition-[max-width,opacity,padding,gap]` (content) — never a conditional swap between two different JSX trees — so the collapse/expand reads as one smooth morph. See `DESIGN.md` Motion rules.
- **Icons are `lucide-react` "closest stable equivalent" substitutes**, not traced Untitled-UI SVGs, matching the precedent set by `Select`'s `ChevronDown` and `BenefitListItem`'s `CircleCheck`. Two are worth flagging specifically since Figma's own component-description tags didn't match their rendered glyph (verified by screenshotting each node directly rather than trusting the tags): "Loveology" renders as a `»` double-chevron in Figma, not an atom/molecule as its Figma description tags suggested — mapped to `ChevronsRight`. "Small Groups" ("intersect-three") renders as three overlapping circles, not a lightning bolt as its tags suggested — mapped to `Blend`. "WeDo"'s heart-with-swirl glyph has no close `lucide-react` equivalent; `HeartHandshake` was chosen for semantic fit (partnership/community), not pixel similarity. The account menu's icons (`User`, `Building2`, `Settings`, `CreditCard`, `FileText`) are likewise semantic-fit `lucide-react` substitutes read off the supplied screenshot, not traced from a Figma node.
- **Header logo is now the real exported asset, not hand-authored text**: `public/AMFM_Collaped.svg` (48×17, collapsed logomark) and `public/AMFM_Expanded.svg` (169×33, expanded lockup) were supplied directly and are rendered via `next/image` (`unoptimized`, matching `HeartChartLogo`'s precedent for pre-rasterized static SVG exports) inside two absolutely-positioned, opacity-cross-faded layers — the same cross-fade structure the old text version used, just with real images instead of a `font-display` approximation. This resolved the collapsed-state clipping/off-center bug: the collapsed asset's 48px intrinsic width exactly fills the 80px rail's 48px content area (80 − 2×16px `px-4`), so it renders flush within the existing padding with no separate centering math needed. See `DESIGN.md` Known gaps for the resolution note.
- **Expanded-state logo indent is set directly on the logo layer (`left-5`), not via padding on the header wrapper**: the header `<div>` used to carry `px-5`/`px-4`, but both logo layers are `absolute inset-0`/`inset-y-0`, and an absolutely positioned child resolves its inset against its containing block's *padding box* — so that padding had no effect on either layer. It happened to look correct in the collapsed state only because the collapsed asset is centered (`justify-center`) inside the full-width box, and centering a box is unaffected by equal left/right padding being ignored. The expanded lockup is left-aligned instead, so it rendered flush against the rail's true left edge (`x=0`) rather than the intended 20px indent that lines up with "Your Church" below it. Fixed by dropping the wrapper's now-inert padding and setting `left-5` directly on the expanded layer, mirroring the identical rule for section headings immediately below.
- **Account-card avatar still renders initials ("OR"), not a real photo** — only the wordmark assets were supplied, not an avatar photo; replace once one exists, per `HeartChartLogo`'s "don't re-derive this from code" precedent.
- **Account menu is a `DropdownMenu` (see above), not a hand-rolled popover**: `NavAccountCard`'s existing button becomes the `DropdownMenuTrigger` (via `asChild`, so no extra nested button is introduced), and `DropdownMenuContent` is positioned `side="right" align="end"` with the nav's fixed-dark tokens instead of the swappable `popover` tokens (see Design tokens used) to read as an extension of the rail's own chrome, matching the supplied screenshot. Its five links (`/profile`, `/church-profile`, `/account-settings`, `/billing`, `/terms-privacy`) are placeholders, same caveat as the rest of `GlobalNav`'s routes below — no Figma node backs this menu (see Figma reference above).
- **Section headings use `inset-x-{4,5}` on the `<p>` elements themselves, not padding on their wrapper**: an absolutely positioned child resolves `inset-x-0` against its containing block's *padding box*, so padding declared on the `relative` wrapper has no effect on it. A prior version put the indent on the wrapper (`px-4`/`px-5`) and left the headings at `inset-x-0`, which silently rendered "Church"/"Tools" and "Your Church"/"Ministry Tools" flush against the rail's left edge instead of matching the header's own indent. Any future change to this indent must move with the `<p>` elements, not a parent's padding.
- **`NavAccountCard` renders two distinct Figma layouts, not one layout with a collapsed label**: the expanded reference is left-aligned (`items-start`, `p-3`, avatar-label group ungrown-but-left-packed) so the chevron affordance has room in the corner; the collapsed reference is a separate, centered layout (`items-center justify-center`, `p-0`, no gap) since only the avatar renders. Applying the expanded layout's padding/alignment to the collapsed state (rather than switching to the dedicated centered one) left the avatar packed against the left padding instead of centered in the 80px rail.
- **Destination routes are placeholders** — only `/` (Home), `/marriage-champions` (Our Marriage Champions), and the two external URLs (`https://amfm.org/mmp`, `https://wedowedo.com`, taken directly from the Figma reference's own `href`/`target` attributes) are real. Every other internal `href` (`/dashboard`, the account menu's five links, etc.) is a placeholder path pending real routes — don't mistake these for a verified IA.
- **Active state is route-derived, not data-driven**: `NavItem` calls `usePathname()` and computes `active = pathname === href` itself, rather than reading a hardcoded `active` flag off `NavLinkItem` (the field was removed from the type once a second real route existed to compare against). This means any nav instance always reflects the actual current page — e.g. rendering `GlobalNav` on `/marriage-champions` highlights "Our Marriage Champions", not "Home". Placeholder routes simply never match `pathname` and so are never active, which is correct until they become real pages.
- **`activeHref` is a demo-only escape hatch**: `/design-system/components` renders `GlobalNav` at its own route (`/design-system/components`), which matches none of the nav's real `href`s, so pathname-derived active would never demo the "Active item" state documented above. `GlobalNav` accepts an optional `activeHref` prop that, when set, is compared against each item's `href` instead of `usePathname()`'s result; the showcase passes `activeHref="/marriage-champions"` so the third "Your Church" item still renders active there. Real call sites (e.g. `/marriage-champions`) should omit this prop and let the actual route decide.
- **Doesn't assume its own screen position**: unlike `PhotoBackdrop`, `GlobalNav` doesn't hardcode `fixed`/`absolute` positioning — it fills its container (`h-full`) and lets the caller decide (e.g. wrap it in `fixed inset-y-4 left-4 z-40` in a real app shell, so the expand transition overlays content rather than reflowing it). Not yet wired into `src/app/layout.tsx` or any route, since no authenticated dashboard shell exists yet — see `DESIGN.md` Known gaps.
- Colocated at `src/components/global-nav.tsx` (not `src/components/ui`) since it carries real business logic (hover/focus/account-menu open-state coordination, `Escape` handling) beyond a visual primitive, per `CLAUDE.md`'s "No business logic in `src/components/ui`."

### Visual examples

Rendered live as a single instance (collapsed by default) at `/design-system/components#globalnav` — hover it (or Tab into it) to see the expanded state, and click the avatar/name to see the account menu. Previously `/design-system` rendered two side-by-side instances (one forced open via `defaultOpen`) to show both rail states at once; consolidated to one instance per the task that introduced hover-to-expand, since hovering the single instance now demonstrates both states directly.

---

## VideoPlayer

**Status**: Draft — implemented and functional (real `<video>` element, working play/pause/seek/mute/fullscreen), but shipped without a real video asset/captions file and with several states built from generic interaction principles rather than a Figma reference (see States and Implementation rules)
**Source**: `src/components/video-player.tsx` (promoted from `src/app/welcome/_components/`, see Implementation rules)
**Figma**: AMFM Portal file, node `1894:16438` ("Video player 16:9"), within `Onboarding/First run church admin` (node `1909:25772`); second confirmed instance on "Our Marriage Champions / Empty" (node `3724:23167`), "Video player 16:9" node `3724:23180` — first appearance of any video-playback UI in the file (distinct from `DposystemStory`, which has no audio/video playback of its own)

### Purpose

Plays an embedded video with a branded poster/paused state and a persistent scrubber control bar — used on `/welcome` to play a church-admin introduction video ahead of the "Get Started" CTA, and on `/marriage-champions-empty` to play a recruiting introduction video ahead of the "Invite Marriage Champions" CTA.

### Anatomy

- Outer container: 16:9 aspect box (`aspect-video`), `rounded-2xl`, hairline border, elevated drop shadow (see Design tokens)
- Real `<video>` element, `poster`/`src`, `object-cover`, fills the container; an optional `<track kind="captions">` child when `captionsSrc` is supplied
- Centered play-button overlay (shown only while paused): `size-16` circle, `backdrop-blur-[8px]`, translucent dark fill, centered play glyph (20px) — the whole circle is a real `<button>`
- Bottom gradient action bar (`bg-gradient-to-b from-transparent to-overlay/30`, `pt-10 pb-4 px-5`):
  - Play/pause icon button (16px icon, 8px padding, `rounded-sm`) — icon swaps with playback state
  - Mute/unmute icon button (same treatment) — icon swaps with mute state
  - Elapsed-time label (`text-xs font-semibold text-white`), live from `video.currentTime`
  - Scrubber: a real `<input type="range">` (accessible seek control) layered over two `aria-hidden` fill `div`s (buffered progress, played progress) on a `backdrop-blur-[4px]` translucent track
  - Remaining-time label, live (`duration − currentTime`)
  - Fullscreen icon button (`video.requestFullscreen()`)

### Variants

None — one visual treatment; content is driven entirely by props (`src`/`poster`/`title`/`captionsSrc`) and live playback state, not a caller-chosen variant.

### States

| State | Behavior | Figma-sourced? |
|---|---|---|
| Paused (poster) | Poster visible, play-button overlay shown, elapsed time `00:00` | Yes — the only state with a direct Figma reference |
| Playing | Play-button overlay hides, transport play icon swaps to pause, progress fill advances live off real `<video>` events | No — implemented via native `<video>` playback + generic icon-swap convention, not a Figma reference |
| Muted / unmuted | Volume icon swaps (`Volume2`/`VolumeX`) | No — generic convention |
| Seeking | Real `<input type="range">`, keyboard- and pointer-operable, updates `video.currentTime` | No — added specifically to satisfy the accessibility requirement below; no Figma equivalent to diverge from |
| Buffering | Buffered-progress fill computed live from `video.buffered` | Figma shows an empty "Buffering progress" layer (0-width in the static frame) — the live computation is real, but its exact visual (color/opacity) is not pixel-verified against a real buffering Figma state |
| Hover / focus (transport buttons) | Not yet given an explicit visual treatment beyond the browser default — **gap**, see Implementation rules | No |
| Fullscreen | Wired to the native Fullscreen API | No — undesigned, uses the browser's native fullscreen presentation |

### Properties / API

```ts
interface VideoPlayerProps {
  src?: string;     // no real video asset supplied yet — see Implementation rules
  poster: string;
  title: string;    // accessible name for the player region
  captionsSrc?: string; // optional <track> captions file — no real file supplied yet
  className?: string;
}
```

### Design tokens used

- `backdrop-blur-[8px]` — reuse, exact match to `PhotoBackdrop`'s existing overlay blur value.
- `backdrop-blur-[4px]` — arbitrary blur value (no third-blur token exists yet); this is now the third distinct arbitrary blur radius in the app alongside `PhotoBackdrop`'s `[20px]`/`[8px]`. Not yet a forced token per `CLAUDE.md`'s anti-premature-abstraction guidance, but worth tracking if a fourth appears.
- Translucent dark fills (play-button overlay, gradient action bar, scrubber track) use `bg-overlay`/`to-overlay` at partial opacity (`/30`) rather than a new alpha token — Figma's own variable for this fill is misleadingly named `alpha-white-30` but resolves numerically to the same near-black as the existing `overlay` token (`#0a0d12`).
- The outer shadow (`shadow-[0px_16px_32px_-4px_rgba(0,0,0,0.7)]`) does not match any existing shadow token (Tailwind's built-in `shadow-2xl` has a different offset/blur/spread/opacity) — kept as a one-off arbitrary value since this is the only use site so far; revisit as a candidate `shadow-*` token (e.g. `shadow-media-card`) if a second floating-card-over-photo use case appears, per `DESIGN.md`'s Shadows section.
- `border-black/10` — reuse, same hairline treatment as `AuthCard`'s inner panel.

### Accessibility requirements

- Built on a real `<video>` element with real keyboard-operable transport controls (native `<button>`s, a native `<input type="range">` for seeking) — not a decorative image with click handlers.
- The scrubber is a native `<input type="range">` (`aria-label="Seek"`, `aria-valuetext` announcing "current of total" time) rather than a hand-rolled `div` — satisfies the requirement flagged when this component was first documented.
- Every icon-only transport control (play/pause, mute/unmute, fullscreen) has an `aria-label` that updates with state (e.g. `"Play"`/`"Pause"`), the same requirement `Button`'s `size="icon"` already carries.
- The whole player is a `role="region"` with `aria-label={title}`, matching the ARIA-region precedent already used by `DposystemStory`'s carousel.
- **Still open**: no captions/transcript file has been supplied — the `<track>` element is wired (`captionsSrc` prop) but unused until a real file exists. Do not consider this component's accessibility contract complete until captions are real.

### Responsive behavior

Fluid width (`w-full aspect-video`), unlike the Figma frame's fixed `560×315` — extended to be fluid since no mobile/tablet Figma reference exists (the same category of gap already tracked for `HeartChartSummary`/`PricingCard`), and a fixed-pixel player would overflow on mobile viewports. The call site (`/welcome`) constrains it with `max-w-[560px]` to match Figma's exact size at wider viewports.

### Implementation rules

- **Promoted to `src/components/video-player.tsx`** (was `src/app/welcome/_components/video-player.tsx`) once `/marriage-champions-empty` confirmed a second real use site, per `CLAUDE.md`'s Component Creation Process and this entry's own previously-documented promotion condition — not assumed preemptively when only `/welcome` used it.
- Icons map to `lucide-react`'s `Play`, `Pause`, `Volume2`, `VolumeX`, `Maximize2` as the closest stable equivalents — matching the project's established "closest stable substitute" precedent (`GoogleIcon`, `Select`'s `ChevronDown`, `GlobalNav`'s icon set).
- **No real video source or captions file exists yet** — `/welcome` renders this component without a `src`/`captionsSrc` (poster-only; clicking play has no video to actually play). Wire both to real assets before this leaves Draft, per the same "flag, don't hide" precedent as `AmfmLogo`/`SignupSuccess`.
- Hover/focus treatments on the transport buttons were not given an explicit visual per `DESIGN.md`'s Interaction principles ("every interactive control has a visible hover/focus treatment") — currently rely on the browser default only. This is a real gap, not a deliberate decision; add explicit `hover:`/`focus-visible:` treatments before promoting out of Draft.
- Playing/buffering-visual/fullscreen behavior was implemented against real native `<video>`/Fullscreen-API semantics rather than a Figma reference, since none exists — this is a deliberate "resolve with sensible engineering defaults, flag clearly" decision (matching `GlobalNav`'s precedent for its undesigned hover states), not a guess dressed up as verified.

### Visual examples

Rendered at `/design-system/components#videoplayer` (poster-only, no source) and live on `/welcome` and `/marriage-champions-empty`; referenced at `/design-system/patterns#welcome-hero`.

---

## Table

**Status**: Draft (implemented and live on `/marriage-champions`; row hover/focus and empty state remain undesigned since no Figma reference exists for either — see Implementation rules)
**Source**: `src/components/ui/table.tsx`
**Figma**: AMFM Portal file, "Our Marriage Champions / Populated" (node `3724:23444`), `Table` frame — `Table header cell` and `Table cell` instances across 9 columns (Name, Email, Profile type, Campus, Champion Training, Completed MMP, Joined, Status, row action) × 10 sample rows

### Purpose

Presents tabular, multi-column record data — one row per entity (e.g. a church team member) — with mixed cell content (plain text, an embedded form control, a status indicator, a row-level action) so an admin can scan, edit, and act on many records at once. Distinct from `ResourceListItem`'s single-column card-list pattern (above): `Table` is a true grid with independently-typed columns, not a repeated icon+text+action row, so the two are not consolidation candidates.

### Anatomy

Outer rounded card wrapper (`border`, `rounded-xl`, `shadow-xs`, `bg-background`, `overflow-hidden` — matching Figma's own "Table" frame, distinct from the surrounding `Card`/`ElevatedCard` shell the table sits inside) → inner horizontal-scroll wrapper (`overflow-x-auto`, the responsive fallback — see Responsive behavior) → `Table` (`<table>`) → `TableHeader` → `TableRow` (header) → `TableHeaderCell` (per-column label, `bg-secondary` background; the "Completed MMP" column pairs its label with a trailing info affordance — see Known gaps below) → `TableBody` → `TableRow` (per record) → `TableCell` (content type varies per column — see Variants).

### Variants

`TableCell` content types confirmed on the reference frame:

| Cell type | Use for | Composition |
|---|---|---|
| Text | Name, Campus, Joined date | Plain value text |
| Muted text | Email | De-emphasized supporting value |
| Embedded control | Profile type | An existing `Select` instance rendered inline (see `Select` above) |
| Embedded status indicator | Champion Training, Completed MMP, Status | An existing `StatusTag` instance (see `StatusTag` below) |
| Row action | Trailing column | An icon-only affordance (delete/remove), composed from `Button`'s existing `size="icon"` pattern (see `Button` above), not a new control |

`Table`/`TableHeader`/`TableRow` themselves have no variants — only cell content varies.

### States

| State | Behavior |
|---|---|
| Default | Only state confirmed via Figma — static row rendering. |
| Row hover / focus | **Not evidenced in the Figma reference.** Per `DESIGN.md`'s Interaction principles ("every interactive control has a visible hover, focus... treatment"), a row-level hover/focus treatment must be designed before rows or cells become independently interactive — flagged, not designed, in this pass. |
| Empty | **Not evidenced.** No zero-records reference exists. Flag for design before shipping against real data that can be empty. |

### Properties / API

```ts
interface TableProps extends React.ComponentProps<"table"> {}
interface TableHeaderCellProps extends React.ComponentProps<"th"> {}
interface TableCellProps extends React.ComponentProps<"td"> {}
```

Purely compositional per call site (no `variant` prop) — matches `Card`'s sub-component precedent. `Table`, `TableHeader`, `TableBody`, `TableRow` forward `React.ComponentProps` for `"table"`/`"thead"`/`"tbody"`/`"tr"` respectively.

### Design tokens used

`border-border-secondary` (row dividers, matching `/login`'s "or" rule; also the outer card wrapper's own border), `bg-secondary` (header cell background — see `DESIGN.md`'s Color tokens), `bg-background` + `shadow-xs` (the outer card wrapper's fill/elevation, matching `Select`/`Input`'s existing `shadow-xs` tier), `rounded-xl` (the outer card wrapper's corner radius, from `DESIGN.md`'s Radius scale), `text-text-secondary` (header cell labels), `text-foreground`/`text-muted-foreground` (cell text tiers, matching `ResourceListItem`'s existing title/description token split). No new tokens required — all reused from the existing scale.

### Accessibility requirements

- Must use real semantic table markup (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th scope="col">`, `<td>`) — a `div`-based grid built for visual convenience would violate `DESIGN.md`'s "interactive elements are real elements" / custom-widget ARIA standard.
- Each row's action control (e.g. delete) needs a unique accessible name derived from that row's data (e.g. `aria-label="Remove Olivia Rhye"`), matching `Button`'s existing `size="icon"` requirement.
- Any control embedded in a cell (e.g. the `Select` in the Profile type column) needs an accessible name scoped to its row (e.g. `aria-label="Profile type for Olivia Rhye"`), since no per-row visible `<Label>` exists in the reference — distinct from `Select`'s documented default usage, which always pairs with a visible `Label`.

### Responsive behavior

The Figma reference is a fixed desktop composition (1272px table within a 1512px frame) with no mobile/tablet reference — the same category of gap already tracked for `HeartChartSummary`/`PricingCard`/`GlobalNav`. Rather than guess a card-per-row collapse pattern with no Figma reference to verify against, `Table`'s root nests an `overflow-x-auto` wrapper inside the outer rounded card wrapper, so the `<table>` scrolls horizontally within its container on narrow viewports (while the outer wrapper keeps clipping to its rounded corners) instead of breaking page layout — verified in a real browser at 390px/834px/1512px widths on `/marriage-champions`. This is a deliberate, documented fallback, not the final mobile design; revisit with a real card-per-row (or similar) pattern once a Figma mobile reference or explicit product direction exists.

### Implementation rules

- Reuse `Select`, `StatusTag`, and `Button` for their respective cell types rather than re-implementing their visuals inline — a `Table` cell is a layout slot, not a second copy of another component's styling.
- Column widths in the Figma reference are fixed pixel values per column (202px, 216px, 138px, 111px, 132px, 115px, 96px, 60px) — treat these as a starting proportion, not literal pixel tokens, since no responsive reference exists to validate them at other viewport widths.
- **Fixed: the header row had no background color and the table had no rounded corners.** Figma's "Table" frame (node `3724:23444`) wraps the whole grid in its own bordered, `rounded-xl`, `shadow-xs`, white card — distinct from the `Card`/`ElevatedCard` shell the table sits inside — with each `Table header cell` carrying a `bg-secondary` fill. The first implementation only wrapped `<table>` in a bare `overflow-x-auto` div with no border, background, or radius at all, so the header rendered as a flat, colorless, square-cornered strip. Fixed in `Table`'s root by adding an outer `border border-border-secondary rounded-xl bg-background shadow-xs overflow-hidden` wrapper (clipping the header's top corners to match the card) around the existing `overflow-x-auto` scroll wrapper, and adding `bg-secondary` to `TableHeaderCell`. As a direct consequence, `TableHeaderCell`/`TableCell`'s previous `first:pl-0 last:pr-0` (zeroing the edge columns' outer padding so they sat flush with the *surrounding* `Card`'s own edge) was removed — it predates the table having its own border, and left edge-column content touching the new border with no inset. All cells now get the same symmetric `px-4` used before, just no longer zeroed at the first/last column. Verified in a real browser (rounded top corners visible behind the header background, no clipping artifacts) at `/marriage-champions` and in the `/design-system/components#table` demo, which picked up the fix automatically since it shares the same primitive.
- **Known gap**: the "Completed MMP" header cell's trailing info affordance implies a tooltip/definition interaction with no corresponding component documented in this file yet. Not built as a `Tooltip` speculatively from this single icon — `/marriage-champions` renders it as a decorative, `aria-hidden` `CircleHelp` icon only, with no interactive behavior. Confirm the real interaction model (hover-only vs. keyboard-operable per `DESIGN.md`'s custom-widget accessibility standard) with design before adding one.
- A visual-only primitive with no embedded business logic, matching `Input`/`Select`'s convention — row data (`src/lib/team-members.ts`, shared with `/marriage-champions-empty`'s decorative `BlurOverlay` preview), cell content, and per-row control wiring (the `Select`/`StatusTag`/delete-button instances) live at the call site (`src/app/marriage-champions/page.tsx`), not inside this primitive.
- Column widths are not fixed by the primitive — cells size to their content/container; the call site's `overflow-x-auto` wrapper (built into `Table`'s root, nested inside the rounded card wrapper) is the responsive fallback on narrow viewports (see Responsive behavior).

### Visual examples

Rendered at `/design-system/components#table` (a 3-column sample) and live on `/marriage-champions` (the full 9-column roster).

---

## StatusTag

**Status**: Draft (implemented and live on `/marriage-champions`; root-only tokens — no dark-mode Figma reference exists yet, see `DESIGN.md` Known gaps)
**Source**: `src/components/ui/status-tag.tsx`
**Figma**: AMFM Portal file, "Our Marriage Champions / Populated" (node `3724:23444`), `Table cell` instances in the Champion Training, Completed MMP, and Status columns

### Purpose

Small pill indicating a discrete, color-coded state (e.g. "Yes"/"No"/"Invited") inside a table cell or similar compact context — gives a state a scannable color + label without full sentence-level explanation.

### Anatomy

Single element: rounded-full pill, bordered, containing a short text label. No icon in the confirmed instances — state is conveyed by background/border/text color together with the label text (see Accessibility requirements).

### Variants

Three confirmed via Figma variable inspection on the reference frame:

| Variant | Sample label | Background | Border | Text |
|---|---|---|---|---|
| `success` | "Yes" | `#ecfdf3` | `#abefc6` | `#067647` |
| `error` | "No" | `#fef3f2` | `#fecdca` | `#b42318` |
| `warning` | "Invited" | `#fffaeb` | `#fedf89` | `#b54708` |

**Not a variant**: "Active" (the Status column's default row state) renders as **plain text**, not a pill — confirmed on this reference frame as the only non-pill state shown. Do not add a 4th (`neutral`/`default`) pill variant speculatively; the Figma reference only shows plain text for this case.

### States

None beyond the three color variants above — a static, non-interactive indicator (no hover/focus/disabled state applies).

### Properties / API

```ts
interface StatusTagProps {
  variant: "success" | "error" | "warning";
  children: React.ReactNode; // the label text, e.g. "Yes" / "No" / "Invited"
}
```

### Design tokens used

`bg-badge-success-bg`/`border-badge-success-border`/`text-badge-success-text`, `bg-badge-error-bg`/`border-badge-error-border`/`text-badge-error-text`, `bg-badge-warning-bg`/`border-badge-warning-border`/`text-badge-warning-text` — a new 3-tier badge token family added to `DESIGN.md`'s Color tokens table and `src/tokens/colors.css` for this component (root-only, `:root` only — no dark-mode Figma reference exists yet, same rationale as `status-success`/`nav-*`). Distinct from `status-success`/`status-warning`/`destructive`, which are single-shade tokens built for a different job (donut/bar fills, solid button backgrounds — see `HeartChartSummary`/`Button` above), not this bg/border/text pill system.

### Accessibility requirements

- State is conveyed by the text label ("Yes"/"No"/"Invited") together with color — satisfies `DESIGN.md`'s "color is never the only signal," no icon required.
- Each variant's text-on-background contrast (`#067647` on `#ecfdf3`, `#b42318` on `#fef3f2`, `#b54708` on `#fffaeb`) is a dark, saturated text color on a very light tint — the same contrast profile as Tailwind/Figma's standard "utility" badge palette this was sourced from; not independently re-measured in this pass.

### Responsive behavior

None — a static inline pill, wraps naturally with its container; no breakpoint-specific behavior expected.

### Implementation rules

- **Not yet consolidated with `HeartChartSummary`'s existing "Live Data" badge** (dot + label, still a one-off inline implementation local to that component). Both are the same underlying concept (a small color-coded status pill); extracting `HeartChartSummary`'s badge onto this shared `StatusTag` primitive is a reasonable follow-up, but was not done in this change to keep the diff scoped to the Marriage Champions page — see `HeartChartSummary`'s Anatomy above.
- Built with `cva`, matching `Button`'s variant-driven convention (see `Button` above) rather than manual ternaries.

### Visual examples

Rendered at `/design-system/components#statustag` (all three variants) and live on `/marriage-champions`.

---

## MarriageChampionsPageShell

**Status**: Draft
**Source**: `src/components/marriage-champions-page-shell.tsx`
**Figma**: AMFM Portal file, "Our Marriage Champions" screen's shared shell — "Page header" instance confirmed identical across both `Populated` (node `3724:23444`) and `Empty` (node `3724:23167`) frames

### Purpose

The page-level chrome shared by both Figma states of the "Our Marriage Champions" screen: `GlobalNav` rail, the page's warm-cream `background-gradient-from`/`background-gradient-to` shell, and the page's `<h1>` + church-logo header row. Extracted so the Populated (`/marriage-champions`) and Empty (`/marriage-champions-empty`) routes render byte-identical chrome instead of two hand-copied trees.

### Anatomy

Outer gradient flex row (sticky `GlobalNav` in a `p-3` rail + a `flex-1` main column) → `<main>` (`p-8`) → header row (`<h1 className="font-display text-display-md font-light">` + `FellowshipOfTheParksLogo`, wrapping on narrow viewports via `flex-wrap`) → `children` (the page's own content, e.g. an `ElevatedCard`).

### Variants

None — a single fixed composition; only `children` varies per route.

### States

Not applicable — a layout/composition component, not an interactive control.

### Properties / API

```ts
React.PropsWithChildren
```

### Design tokens used

`from-background-gradient-from`/`to-background-gradient-to` (page shell gradient), `font-display`/`text-display-md` (page `<h1>`, matching the page-level-heading precedent already established for `/heartchart-resources`), `text-foreground`. See `DESIGN.md`'s Color tokens / Typography system.

### Accessibility requirements

One `<h1>` per page (satisfied by the header row), `<main>` landmark wraps the page's actual content — matching `DESIGN.md`'s semantic-structure standard.

### Responsive behavior

Header row wraps (`flex-wrap`) below the point where the `<h1>`'s `min-w-[320px]` and the logo can no longer sit on one line, matching the pre-extraction behavior on `/marriage-champions`. `GlobalNav`'s own rail-to-panel responsive behavior is unchanged (see `COMPONENTS.md#globalnav`).

### Implementation rules

- Extracted from `/marriage-champions` once `/marriage-champions-empty` confirmed a second real use site of the exact same shell — same promotion rule already documented for `VideoPlayer`/`FellowshipOfTheParksLogo`, not assumed preemptively for a single route.
- Purely a layout composition — no business logic, no data fetching. Route-specific content (the table, the empty-state overlay) stays at the call site as `children`.
- Scoped to this one screen's two states, not a generic "app page shell" — don't reach for this on an unrelated route; extract a broader shell only once a third, genuinely different screen needs the same GlobalNav+gradient+header composition.

### Visual examples

Live on `/marriage-champions` and `/marriage-champions-empty`. Not separately rendered at `/design-system/components` — it's pure layout chrome, not a visual primitive with states/variants to demo; see both routes' entries at `/design-system/pages`.

---

## FellowshipOfTheParksLogo

**Status**: Draft
**Source**: `src/components/fellowship-of-the-parks-logo.tsx`
**Figma**: AMFM Portal file, "Our Marriage Champions" screen's header lockup (present on both `Populated`, node `3724:23444`, and `Empty`, node `3724:23167`) — asset export host unreachable from this environment (same constraint as `AmfmLogo`/`GoogleIcon`), so the PNG is cropped from a rendered screenshot of the reference node rather than the original vector source

### Purpose

Renders the hosting church's brand mark in the "Our Marriage Champions" page header, next to the page `<h1>` — placeholder for a real per-church logo once church-level branding/theming exists (see `DESIGN.md`'s Known gaps for the same caveat on `AmfmLogo`).

### Anatomy

Single `next/image`, fixed intrinsic size (`136×38`), rendered `unoptimized` (pre-rasterized static asset, matching `HeartChartLogo`'s precedent).

### Variants

None.

### States

Not applicable — static image, no interactive states.

### Properties / API

No props — a fixed, single-church placeholder (see Implementation rules).

### Design tokens used

None — a raster image asset, not a token-driven primitive.

### Accessibility requirements

`alt="Fellowship of the Parks"` — a real accessible name, not decorative/empty alt text, since the logo conveys real information (which church's data this is).

### Responsive behavior

Fixed pixel size (`h-9 w-auto`); the header row's `flex-wrap` (see `MarriageChampionsPageShell`) is what keeps it from crowding the `<h1>` on narrow viewports, not any responsive behavior of its own.

### Implementation rules

- **Promoted to `src/components/fellowship-of-the-parks-logo.tsx`** (was `src/app/marriage-champions/_components/`) alongside `MarriageChampionsPageShell`'s extraction, once `/marriage-champions-empty` confirmed a second real use site — same promotion rule as `VideoPlayer`.
- Hardcodes "Fellowship of the Parks" — there is no multi-church data model yet. Replace with a real per-church logo lookup once one exists, per the same "flag, don't hide" precedent as `AmfmLogo`.
- The asset is a screenshot crop, not the original exported vector — replace if a real export becomes available (same class of gap as `AmfmLogo`/`GoogleIcon`).

### Visual examples

Live on `/marriage-champions` and `/marriage-champions-empty` (via `MarriageChampionsPageShell`).

---

## BlurOverlay

**Status**: Draft
**Source**: `src/components/blur-overlay.tsx`
**Figma**: AMFM Portal file, "Our Marriage Champions / Empty" (node `3724:23167`), "image 54" backdrop layer (node `3724:23178`)

### Purpose

Renders its `children` as an inert, faded backdrop — blurred, dimmed, and fading into the surrounding surface color — so real content reads as "there, but not yet actionable" behind a centered empty-state call-to-action, instead of being hidden outright. Used on `/marriage-champions-empty` to preview the Team Members table's shape without making it interactive. See `DESIGN.md`'s "Blur overlay" foundation for the token-level treatment.

### Anatomy

Single wrapping `<div>` (`aria-hidden`, `relative`, `overflow-hidden`) containing: the blurred/dimmed `children` (`blur-[2px] opacity-30 pointer-events-none select-none`) plus an absolutely-positioned fade mask (`bg-gradient-to-b from-background/0 to-background`) covering the full area.

### Variants

None — a single fixed treatment; only `children` varies per call site.

### States

None — a static, non-interactive decorative wrapper (no hover/focus/disabled state applies, since nothing inside it is meant to be reachable).

### Properties / API

```ts
interface BlurOverlayProps extends React.PropsWithChildren {
  className?: string;
}
```

### Design tokens used

`bg-background` (fade-mask end color — see Implementation rules for why this diverges from Figma's hardcoded white). No new tokens required; `blur-[2px]`/`opacity-30` are arbitrary values matching Figma's own layer effect exactly, not promoted to tokens for a single use site (same precedent as `VideoPlayer`'s one-off `backdrop-blur-[4px]`).

### Accessibility requirements

- Always `aria-hidden="true"` on the outer wrapper — the wrapped content is never meant to be reachable by assistive tech.
- Always `pointer-events-none` on the blurred content — a sighted mouse/touch user must not be able to click into it either.
- **Never wrap a real, currently-reachable interactive control** (e.g. a focusable `<button>`/`<Select>`) — an element that's still in the tab order while its container is `aria-hidden` is an accessibility violation (a hidden-but-focusable trap). `/marriage-champions-empty`'s decorative table preview intentionally renders `Table`/`StatusTag` (static markup) but omits the Populated page's `Select`/delete-`Button` cells for this reason.

### Responsive behavior

None of its own — sizing/layout is entirely driven by `children` and the call site's container; no breakpoint-specific behavior.

### Implementation rules

- A visual-only wrapper with no embedded business logic, matching `Table`'s convention — the call site owns what content gets blurred.
- Fades to `bg-background`, not Figma's literal hardcoded white — keeps the effect theme-aware (correct in `.dark`) since the wrapping `ElevatedCard` itself uses the same token; see `DESIGN.md`'s "Blur overlay" foundation for the full rationale.
- Don't reach for this to build a real disabled/loading state on an interactive component (e.g. a form mid-submit) — that's a job for the native `disabled` attribute / a real loading state per `DESIGN.md`'s Interaction principles, not this decorative wrapper.

### Visual examples

Rendered at `/design-system/foundations#blur-overlay` and `/design-system/components#bluroverlay`, and live on `/marriage-champions-empty`.
