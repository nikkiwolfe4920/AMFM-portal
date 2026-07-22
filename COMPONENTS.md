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
**Figma**: AMFM Portal file, node `3273:19658` ("Primary" button set) and siblings; `default` variant also confirmed on the sign-up screen's primary CTA (`Onboarding/sign up`, node `1909:25231`) and on the "Start using HeartChart" CTA on `Onboarding/Create Profile` (node `1909:25769`) — see `figma/figma-links.md`

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

All variants, sizes, and the disabled/loading states render at `/design-system/components#button`. `default`/`outline` also render live on `/signup` (primary CTA, Google button), `/create-profile` (primary CTA), and at `/design-system/patterns#auth-card-signup` / `#create-profile-card`.

---

## Input

**Status**: Production Ready
**Source**: `src/components/ui/input.tsx`
**Figma**: AMFM Portal file, node `3272:19436` ("Input" field set) and siblings; also confirmed for the Name/Email/Password fields on the sign-up screen (`Onboarding/sign up`, nodes `1909:25220`–`1909:25222`) and the Church/Organization name, Location, and Average Weekly Attendance fields on `Onboarding/Create Profile` (node `1909:25769`, nodes `1909:25255`, `1909:25257`, `1909:25258`), same treatment, no new variant

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

Default, filled, disabled, and invalid states render at `/design-system/components#input`. Also rendered live on `/signup`'s Name/Email/Password fields, `/create-profile`'s Church/Organization name, Location, and Average Weekly Attendance fields, and at `/design-system/patterns#auth-card-signup` / `#create-profile-card`.

---

## InputGroup

**Status**: Production Ready
**Source**: `src/components/ui/input-group.tsx`
**Figma**: AMFM Portal file, `Onboarding/Create Profile` (node `1909:25769`), node `1909:25259` ("Website" field — leading `http://` add-on)

### Purpose

Pairs an `Input` with a fixed, non-editable leading (or trailing) add-on — e.g. a URL scheme prefix — rendered as one visually continuous control instead of two separate fields.

### Anatomy

Wrapper `div` carrying the shared border/shadow/radius (focus/invalid/disabled state driven off the real `<input>` via `has-*` selectors) → add-on `span` (`rounded-l-md` corner only, non-interactive, `text-text-tertiary`, `aria-hidden`) → bare `<input>` (`rounded-r-md` corner only, transparent background/border on the shared edge so the two segments read as one control).

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

### Visual examples

Rendered live on `/create-profile`'s "Website" field; referenced at `/design-system/components#inputgroup` and `/design-system/patterns#create-profile-card`.

---

## Select

**Status**: Production Ready
**Source**: `src/components/ui/select.tsx`
**Figma**: AMFM Portal file, `Onboarding/Create Profile` (node `1909:25769`), nodes `1909:25261` ("Your role") and `1909:25262` ("Your primary goal"); trailing icon references the `chevron-down` Figma component (node `10:338`)

### Purpose

Single-choice selection from an enumerated option list, styled to match `Input` so the two read as one form-control family — used on the referenced frame for "Your role" (~40 options) and "Your primary goal" (23 options).

### Anatomy

Trigger styled identically to `Input` (border, radius, `shadow-xs`, matching padding) → placeholder or selected-value text → trailing chevron-down icon → on open, a listbox popover of options.

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

`border-input`, `bg-background`, `placeholder:text-muted-foreground`, `border-border-brand` (focus), `border-border-destructive-subtle` (invalid), `bg-muted/50` + `text-muted-foreground` (disabled), `shadow-xs`, `radius-md` — the identical token set `Input` uses, plus `lucide-react`'s `ChevronDown` icon (matching `iconLibrary` in `components.json`; closest stable equivalent to Figma's `chevron-down` component).

### Accessibility requirements

- Must be built on Radix's `Select` primitive (full listbox ARIA pattern: keyboard arrow/Home/End navigation, typeahead, `aria-expanded`/`aria-activedescendant`) — do not hand-roll a `div`-based dropdown, per `DESIGN.md`'s Accessibility standards on custom widgets.
- Popover content must cap height and scroll internally for long option lists (confirmed up to ~40 items on this frame) rather than overflow the viewport.
- Do not wrap the trigger in an extraneous `<button>` beyond what Radix's `Select.Trigger` itself renders — see the same Figma design-to-code export caveat noted under `InputGroup`.

### Responsive behavior

Full width (`w-full`) like `Input`; no breakpoint-specific behavior of its own.

### Implementation rules

- Hand-authored `src/components/ui/select.tsx` from `@radix-ui/react-select` (installed — `ui.shadcn.com` itself remains unreachable from this environment per `CLAUDE.md`'s shadcn-CLI-unreachable workflow, but the underlying Radix package installs fine from `registry.npmjs.org`), matching upstream shadcn/ui's `select` shape and this project's `Input` token set exactly (`border-input`, `bg-background`, `px-3.5 py-2.5`, `text-base`, `shadow-xs`, focus/invalid/disabled treatment).
- `SelectContent` caps height via `max-h-(--radix-select-content-available-height)` with an internal scrolling `Viewport`, plus `SelectScrollUpButton`/`SelectScrollDownButton` — verified against the 39-item "Your role" list on `/create-profile` (see Visual examples).
- Given the option counts on the referenced frame (39 and 23 items), a searchable combobox variant remains a flagged UX consideration for product/design to weigh in on — not implemented here, since the plain Radix listbox already satisfies the documented contract and no combobox pattern exists elsewhere in the codebase to extend.

### Visual examples

Rendered live on `/create-profile`'s "Your role" (39 options) and "Your primary goal" (23 options) fields; referenced at `/design-system/components#select` and `/design-system/patterns#create-profile-card`.

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

## Card

**Status**: Production Ready
**Source**: `src/components/ui/card.tsx`
**Figma**: AMFM Portal file, `Onboarding/Create Profile` (node `1909:25769`) — the modal shell (header with title/description + top-right `HeartChartLogo` accessory, content, footer) maps onto `Card`'s existing `CardHeader`/`CardContent`/`CardFooter` anatomy with no changes to the primitive itself; used for `/create-profile`

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
- **`/create-profile`'s modal restyled to a flush, zero-gap flex layout matching the Figma frame exactly**, rather than relying on `Card`'s default `gap-6`/`py-6`: the Figma `Modal` node has *no* implicit spacing between its header/content/actions sections — every gap is an explicit padding value or spacer, so leaving `Card`'s default `gap-6` (24px) in place double-counted spacing on top of each section's own padding. The call site overrides `Card` to `gap-0 py-0` and expresses every gap as the section's own padding/margin, verified against the Figma node metadata (`Onboarding/Create Profile`, node `1909:25769`): `CardHeader` `pt-6`(24px)+`px-6`(24px), `gap-4`(16px) between the title block and `HeartChartLogo`, `gap-0.5`(2px) between `CardTitle`/`CardDescription`, then a divider `div` with `mt-5`(20px) before it; `CardContent` keeps its existing `pt-5`(20px); `CardFooter` uses `pt-8`(32px) before its divider `div`, then a `flex justify-end px-6 pb-6`(24px) row for the button, with **no** gap between the divider and the button row (matches the Figma frame's `Divider-wrap` sitting flush against the actions row). The Figma `Divider-wrap` under the footer is itself a ~25px gradient/shadow graphic (not a plain hairline) — approximated here as a plain 1px `border-t`, the same class of simplification as `AmfmLogo`'s text approximation below, since the exact gradient asset isn't available (see that entry's Implementation rules for why).
- ~~The `Onboarding/Create Profile` Figma frame specifies a title/description in a serif "Financier Display" font not yet defined in `DESIGN.md`~~ **Resolved**: `DESIGN.md`'s Typography system now defines `font-display`/`text-display-md` (Fraunces substituting for the licensed Financier Display face). `/create-profile`'s `CardTitle` renders `font-display text-display-md leading-[2.5rem] font-light text-foreground` (was `text-3xl font-semibold tracking-tight`); `CardDescription` renders `text-text-tertiary` (was the generic `text-muted-foreground`, a different gray — Figma's description color resolves to the `text-tertiary` token, `#535862`, exactly).
- **`/create-profile`'s content column widened**: the Figma frame places a `368px`-wide `PricingCard` beside the form fields (`gap-[40px]`/`gap-10`), so the page's `Card` call site now uses `max-w-4xl` (was `max-w-2xl`) to fit both columns without cramping the fields column; below `lg`, the two columns stack (fields, then `PricingCard`) per `DESIGN.md`'s mobile-first layout rules — no Figma mobile reference exists for this frame, so the stacking behavior is a deliberate application of the general grid rules, not a pixel-sourced breakpoint.

### Visual examples

Rendered at `/design-system/components#card` and at `/design-system/patterns#create-profile-card`; live on `/create-profile`.

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
**Figma**: AMFM Portal file, node `1909:25767` ("Onboarding/login"), node `1909:25768` ("Onboarding/sign up"), and node `1909:25769` ("Onboarding/Create Profile") — all three use the same two arbitrary blur values (`backdrop-blur-[20px]` content layer, `backdrop-blur-[8px]` overlay) and `bg-overlay`/85% scrim. **Not yet confirmed**: whether the sign-up/Create Profile screens' background photos are the same asset as `public/login-background.jpg` or distinct exports — verify before assuming this component needs no changes for those routes.

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

Rendered live on `/login`, `/signup`, and `/`; referenced (not re-rendered full-bleed) at `/design-system/patterns`.

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

`border-border-brand` (2px card border, existing token), `shadow-xs`, `rounded-xl` (closest scale value to Figma's `12px` corner radius — see Implementation rules), `border-border-secondary` (footer divider). Title typography uses the display scale resolved in `DESIGN.md`: `font-display text-display-sm text-foreground` (Fraunces substituting for Figma's licensed "Financier Display", `30px`/`38px`).

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
