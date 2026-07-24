# AMFM Portal — COMPONENTS.md

**The AI implementation contract.** This file is the source of truth for component behavior: anatomy, variants, states, props, tokens, accessibility, responsive behavior, and Figma reference. Design foundations (color/type/spacing/shadow tokens, breakpoints, motion, a11y principles) live in **[`DESIGN.md`](./DESIGN.md)** — this file only documents how those foundations compose into components. AI-facing implementation rules live in **[`IMPLEMENTATION.md`](./IMPLEMENTATION.md)**.

```
Figma Design Standards → DESIGN.md → COMPONENTS.md → React Components → /design-system Visual Validation
```

Every component below is rendered live at **`/design-system`** (`src/app/design-system/components`). If a component's rendered behavior and its entry here disagree, one of them is stale — fix both in the same change.

**Before creating a new component**: search this file first. Reuse or extend an existing entry before writing new markup — see the Component Creation Process in `CLAUDE.md`. When you do add a new component, add its entry here (with a `Draft` status) in the same change that adds the code.

---

## Button

**Status**: Branch Audit (existing primitive was production-ready before this branch; branch Button-token/size changes are under active visual audit)
**Source**: `src/components/ui/button.tsx`
**Figma**: AMFM Portal file, node `3273:19658` ("Primary" button set) and siblings; primary/default-variant styling also confirmed on the sign-up screen's primary CTA (`Onboarding/sign up`, node `1909:25231`), on the "Start using HeartChart" CTA on `Onboarding/Create Profile` (node `1909:25769`), and on the "Get Started" CTA on `Onboarding/First run church admin` (node `1894:16263`, within `1909:25772`) — the latter confirms the `default` variant's exact border/shadow-inset spec (`border-white/12`, `shadow-button-inset`) also holds unmodified on a dark, photo-background surface, not only the light auth-card surface previously verified. Neutral `outline` styling is checked against the Google social auth button (`Onboarding/login`, node `1909:25767`) and HeartChart/CourseCard neutral button instances (`1903:19737`, `2316:26815`): Figma exports the HeartChart standalone Download QR control with `shadow-xs-skeuomorphic`, while the current branch maps neutral outline buttons to semantic neutral outline tokens plus `shadow-xs` because the existing `shadow-button-inset` token is calibrated for saturated primary buttons and overdraws the neutral edge in-browser. This is a branch audit calibration pending visual acceptance, not a claim that the Figma node lacks inner effects. Size references are split by Figma dimensions: `compact` 38px (`1903:19737` Add a campus; `1670:36217` HeartChartSummary actions; `2320:27278` CourseCard video CTA; `3727:29364` dashboard empty-state share CTA), `sm` 42px (`3724:23184` Invite Marriage Champions; `1909:25789` Footer CTA), `default` 46px (`3273:19658`), and `lg` 50px (`1894:16263`). Icon-leading primary CTAs (`1894:16263`, `3724:23184`, and `1903:19737`) resolve the icon fill to Figma's `button-primary-icon` (`#d89f88`) while the label remains `text-white`, so the primary icon color is a shared `default`-variant rule, not a per-modal override — see `figma/figma-links.md`

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
| `outline` | Neutral/secondary Figma button rendered through semantic neutral outline tokens plus `shadow-xs`, e.g. Google social auth, HeartChart Download QR, CourseCard video CTAs, and ResourceListItem's 48px download action |
| `outlineReversed` | Reversed outline action for dark photo surfaces or brand-filled bands, e.g. `/`'s hero links and `FooterCta`'s upgrade CTA |
| `utilitySegment` | Input-embedded trailing utility segment, e.g. the Copy action attached to a labelled URL field |
| `secondary` | Lower-emphasis action, neutral fill |
| `destructive` | Irreversible/destructive action (delete, remove) |
| `ghost` | Lowest-emphasis inline action, no fill until hover |
| `link` | Renders as inline text, no button chrome; defaults to `size="inline"` when rendered through `Button` so callers do not patch link geometry locally |

### Sizes (`size` prop)

| Size | Use for |
|---|---|
| `compact` | 38px compact action buttons (`text-sm`) such as HeartChartSummary actions, CourseCard video CTAs, dashboard empty-state share CTA, and the HeartChart modal footer Add Campus CTA. |
| `control` | 44px neutral outline controls (`px-3.5 py-2.5 text-sm`) matching the HeartChart URL row's standalone Download QR control (`1903:19737`). |
| `controlSegment` | Full-height trailing segment for an input group; pair with `variant="utilitySegment"` only. |
| `inline` | Chrome-free icon/text actions (`px-0 py-0 text-sm gap-1.5`) matching Figma `Buttons/Button` text-button instances such as "Upload your logo in settings" (`1903:19737` / `3724:20579`). This is the implicit size for `variant="link"` unless a caller explicitly passes another size. |
| `sm` | 42px small CTAs (`text-sm`) such as Invite Marriage Champions and Footer CTA. |
| `default` | 46px standard form/page action. Maps to the primary button set (`3273:19658`) with `text-base`, `px-4`, and `py-2`. |
| `lg` | 50px hero or first-run CTAs. Maps to the icon-leading "Get Started" CTA (`1894:16263`). |
| `icon` | Square icon-only button — always pair with `aria-label`. |
| `iconLg` | 48px square icon-only action for larger table/card row controls such as `ResourceListItem`'s trailing download action. Always pair with `aria-label`. |

### States

| State | Behavior |
|---|---|
| Default | Base variant styling |
| Hover | `default`: fills `bg-text-brand` (not `bg-primary/90` — verified against Figma's "Primary Hover", not an opacity of `primary`). `outline`/`utilitySegment`: neutral `hover:bg-accent` while retaining the correct standalone/segmented chrome. `outlineReversed`: `hover:bg-button-outline-reversed-hover-bg` while keeping white text/icon color on fixed dark/brand surfaces. Other variants: standard `hover:bg-*` per variant. |
| Focus | `default`: keeps the `border-white/12` edge, adds a `border-brand`-colored ring (`focus-visible:ring-border-brand focus-visible:ring-4 focus-visible:ring-offset-2`) reproducing Figma's "Primary Focused" (2px white gap + 4px brand ring). Other variants: generic `focus-visible:ring-ring/50 focus-visible:ring-[3px]`. |
| Icons | Icon-leading buttons default to 20px child SVGs, matching Figma's common `Buttons/Button` icon slot. `default`: child SVG icons use `text-button-primary-icon` while labels remain `text-primary-foreground`. `outline`/`utilitySegment`: child SVG icons use `text-button-outline-icon` while labels use `text-button-outline-fg`; those semantic tokens map to Figma's neutral light-surface colors in `:root` and to contrast-safe theme values in `.dark` because Figma has no dark neutral-button reference yet. `outlineReversed`: child SVG icons use `text-button-outline-reversed-icon`. Other variants inherit their own text color unless a verified Figma reference justifies an override. |
| Disabled | `default`, `outline`, and `utilitySegment`: flat tokens (`bg-muted`, `text-fg-disabled`, child SVGs `text-fg-disabled`, `shadow-xs`, `disabled:opacity-100` to cancel the base fade; `default` also switches to `border-border-secondary`). Other variants: generic `disabled:opacity-50`. |
| Loading | `loading` prop sets native `disabled`, `aria-busy`, `data-loading`, renders a spinning `Loader2Icon` before children. On `default`, forces the same fill as hover (`bg-text-brand`) rather than the disabled flat gray. |

### Properties / API

```ts
React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {
  asChild?: boolean;   // render as a different element via Radix Slot
  loading?: boolean;   // native <button> only, not compatible with asChild
}
```

### Design tokens used

`bg-primary`, `text-primary-foreground`, `text-button-primary-icon` (default-variant child SVGs), `bg-text-brand` (hover/loading fill), `text-text-brand` (`link`), `border-border-brand` (focus ring), `bg-button-outline-bg`, `border-button-outline-border`, `text-button-outline-fg`, `text-button-outline-icon`, `bg-button-outline-reversed-bg`, `border-button-outline-reversed-border`, `text-button-outline-reversed-fg`, `text-button-outline-reversed-icon`, `hover:bg-button-outline-reversed-hover-bg`, `bg-muted`, `border-border-secondary`, `text-fg-disabled` (disabled), `shadow-button-inset`, `shadow-xs`. See `DESIGN.md` Color tokens / Shadows.

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
- **Button owns the common direct icon slot geometry.** Do not add local `gap-*` or `size-5` classes just to make ordinary icon-leading buttons match Figma. The primitive's direct child SVG slot is 20px (`[&>svg:not([class*='size-'])]:size-5`), and its effective icon/text spacing is 6px (`gap-1.5`) because Figma's button instances use a 4px icon/text gap plus a 2px text-padding wrapper around the label. Add a local icon size or gap only when a verified Figma node shows a different anatomy for that specific control.
- **Primary/default icons use the shared `button-primary-icon` token.** Do not fix icon-leading primary CTAs with local classes: the `Button` `default` variant applies `text-button-primary-icon` to direct child SVG icons because Figma resolves icon-leading primary buttons (`1894:16263`, `3724:23184`, and `1903:19737`) to `#d89f88` while labels remain white. Disabled default buttons override direct child SVG icons back to `text-fg-disabled`. `outline`/`utilitySegment` apply `text-button-outline-icon`; other non-default variants continue to rely on `currentColor` from their own text color unless a verified Figma reference introduces a specific icon token for that variant. Nested SVG assets inside non-icon children are not part of this slot and should keep their own asset colors.
- **Use the shared size variants before local padding overrides.** `compact` is the fixed 38px action (`text-sm px-3 py-1.5`), `control` is the fixed 44px neutral outline control (`text-sm px-3.5 py-2.5`), `controlSegment` is the full-height input-embedded utility segment, `inline` is the chrome-free text-button/link action (`text-sm gap-1.5 px-0 py-0`), `sm` is the fixed 42px CTA (`text-sm px-3 py-2`), `default` is the fixed 46px form/page action (`text-base px-4 py-2`), `lg` is the fixed 50px hero/first-run CTA (`text-base px-6 py-2.5`), `icon` is the 36px square icon action, and `iconLg` is the 48px square row/card icon action. If a future Figma button lands between these sizes, add a named size variant with tests rather than one-off height/padding on a caller.
- **`outline` is the shared neutral Figma button.** Do not add a second standalone neutral CTA variant for HeartChart, CourseCard, social-auth buttons, or resource-row icon buttons: the verified neutral references all use the same neutral fill, border, text color, active low-emphasis icon color, and 1px border/drop-shadow behavior. The HeartChart Figma export names the standalone Download QR effect `shadow-xs-skeuomorphic`; do not reuse the primary `shadow-button-inset` token for that neutral button because it creates the doubled/heavy ring visible in browser review. Keep the calibrated implementation on `shadow-xs` until a separate neutral-specific inset token is deliberately introduced and validated across every neutral call site.
- **`outlineReversed` is the shared reversed outline button.** Use it when a button sits on a fixed dark photo surface or brand-filled band and needs transparent fill, white label/icon, white translucent border, and no neutral drop shadow. Do not repeat `border-white/* bg-transparent text-white shadow-none hover:bg-white/*` bundles at call sites; add or adjust reversed-outline tokens in `src/tokens/colors.css` if this surface treatment changes.
- **Use `utilitySegment` for input-attached trailing actions.** The HeartChart URL Copy action is not a standalone outline button: the input group owns the outer border/shadow while Copy owns the trailing segment's left divider. Use `variant="utilitySegment" size="controlSegment"` for that shape instead of passing local `rounded-l-none border-y-0 border-r-0 shadow-none` overrides to a standalone `outline` button.
- **Figma text-button links still compose `Button`.** Use `Button asChild variant="link"` for navigation CTAs such as "Forgot password"; add `size="inline"` explicitly when documenting an icon-leading Figma text-button instance such as "Upload your logo in settings". Do not hand-style a raw anchor or add local `h-auto p-0 text-sm` patches just because the Figma instance has no visible button chrome.

### Visual examples

Base variants, standard sizes, and disabled/loading states render at `/design-system/components#button`, including an icon-leading `sm` example ("Invite Marriage Champions") confirming shared primary icon coloring and an `inline link` example matching the upload-logo CTA. HeartChart's `control`-sized `outline` button is intentionally demonstrated in the `HeartChartLinkCard` and `HeartChartLinkModal` examples rather than as a standalone generic control sample, so the Button showcase does not imply a separate product action. `iconLg` `outline` renders through `ResourceListItem`. `default`/`outline` also render live on `/signup` (primary CTA, Google button), `/create-profile` (primary CTA), `/welcome` (`lg` icon-leading "Get Started"), `/marriage-champions-empty` (`sm` icon-leading "Invite Marriage Champions"), and at `/design-system/patterns#auth-card-signup` / `#create-profile-card`. `outlineReversed` is documented here but intentionally demonstrated only in real dark/brand-surface contexts: `/`'s dark hero links and `FooterCta`.

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

`text-fg-quaternary` (leading icon), `text-button-outline-icon` (trailing download icon through `Button variant="outline"`), `text-muted-foreground` (description), `text-foreground` (title); `Button`'s `outline` variant tokens for the trailing action.

**Icon color is the active utility-icon token, not the disabled token**: the Figma MCP's variable inspection resolved both the leading icon and the download button's icon to `#a4a7ae` (Figma's "Utility/Gray/utility-gray-400" and "Foreground/fg-quaternary (400)" — two different Figma variable names, same hex). The standalone leading icon uses `text-fg-quaternary`; the trailing action receives the same light-surface value through `text-button-outline-icon`, separate from `text-fg-disabled` even though the current hex is the same, because active icons and disabled labels have different semantics.

### Accessibility requirements

- The trailing download button must carry a caller-supplied `aria-label` describing its action (e.g. "Download {title}") — the same requirement `Button`'s `size="icon"` already documents.
- Icon is decorative and must be `aria-hidden="true"`, consistent with `BenefitListItem`'s existing precedent — title/description text alone should carry the meaning.
- Whichever element is the primary click target (the row itself vs. only the trailing button) must be a single real interactive element — don't wire duplicate/nested click handlers onto both the row and the button.

### Responsive behavior

The component itself doesn't reflow internally at any width (icon/title/description/button stay in one row) — still not evidenced against a Figma mobile/tablet frame, so very narrow viewports haven't been verified. Its call site (`/heartchart-resources`) handles column-level responsiveness by stacking its two host cards from `grid-cols-1` to `lg:grid-cols-2`, per `DESIGN.md`'s Layout/grid rules — that's a call-site decision, not a change to this component's own layout.

### Implementation rules

- Icon set confirmed on the reference frame: `share-07`, `message-text-square-01`, `clipboard-check`, `book-open-01`, `heart`, `intersect-three`. The first five map to `lucide-react`'s `Share2`, `MessageSquareText`, `ClipboardCheck`, `BookOpen`, `Heart` respectively (closest stable equivalents, matching the project's established substitute precedent — see `GlobalNav`/`VideoPlayer`). **`intersect-three` has no clear `lucide-react` equivalent** — `Blend` (already used elsewhere in `GlobalNav` for an unrelated item) is used as the closest available overlapping-shapes glyph; this remains an unconfirmed substitution, not a verified match — flag for design/eng alignment.
- **The trailing action is a download button, not a navigation chevron** — confirmed by the Figma node's own interaction annotation ("download buttons download resource" / "downloads the resource"). Uses `lucide-react`'s `Download` icon and `Button variant="outline" size="iconLg"` so it shares the neutral bordered button treatment while using the 48px square row/card size. The 20px glyph size comes from `Button`'s shared direct icon slot, not a local `[&>svg]` override.
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

Outer `div` (`relative`, `rounded-2xl`, `shadow-card`, `p-2`) → optional absolutely-positioned `background` layer (bleeds under the outer `p-2` gap to the true outer edge — see Implementation rules) → inner bordered panel (`rounded-md`, `border-border` by default, `relative z-10`, `size-full`) → `children`.

### Variants

None — a single shape; the inner panel's border/overflow/layout classes are caller-overridable via `innerClassName` (e.g. `TopHero` overrides it to `border-white/30` for its dark photo surface), and an optional `background` layer can bleed a full-bleed photo/gradient under the outer shell's padding (see `TopHero`).

### States

None of its own — purely a layout/surface primitive, same category as `Card`.

### Properties / API

```ts
interface ElevatedCardProps extends React.ComponentProps<"div"> {
  /** Classes for the inner bordered panel (e.g. to override the default border). */
  innerClassName?: string;
  /**
   * Optional layer rendered behind the inner panel, bleeding under the outer
   * shell's padding to the component's true outer edge (e.g. a full-bleed
   * photo). Omit for the default shape (a solid `bg-background` gap between
   * the outer edge and the inner panel).
   */
  background?: React.ReactNode;
}
```

### Design tokens used

`bg-background`, `shadow-card`, `rounded-2xl`, `rounded-md`, `border-border` — all existing tokens; no new tokens required.

### Accessibility requirements

Purely structural — accessibility depends on the semantic content placed inside, same as `Card`. The `background` layer is always `aria-hidden="true"` — it's decorative by construction, same as `PhotoBackdrop`'s scrim.

### Responsive behavior

Fluid width by default (`size-full`/fills its container per caller's `className`); no built-in breakpoint behavior of its own.

### Implementation rules

- **Not retrofitted onto `AuthCard`/`HeartChartSummary` in this change** — `AuthCard` is route-colocated and deliberately fixed-light (`border-black/10`, no `.dark` value), and `HeartChartSummary` is an already-shipped, separately-verified component; refactoring either was out of scope for the task that introduced this primitive (per `CLAUDE.md`'s "smallest maintainable change" guidance). A reasonable follow-up is migrating both onto `ElevatedCard` the next time either is meaningfully touched — see `DESIGN.md` Known gaps.
- Keep this primitive matching its one real shape exactly — a nested shell, not a flat single-surface card (that's `Card`, above). Don't bend it to fit a flat shape.
- **`background` bleeds under the padding because the outer shell has no border, only padding**: an absolutely positioned child's containing block is the nearest positioned ancestor's *padding box*, whose outer boundary sits at the inside edge of that ancestor's border — with `border-width: 0` (true here; the outer `div` only has `p-2`), the padding box's outer edge coincides with the element's true outer edge. So `background`'s `absolute inset-0` renders flush with the card's actual corners, underneath the `p-2` gap, rather than stopping at the inner panel — added for `TopHero`'s full-bleed photo requirement (see `TopHero` Implementation rules), where the previous behavior (photo confined to the inner panel) left a visible solid-color gap Figma doesn't show.
- **Inner panel needs its own stacking context (`relative z-10`) to paint above `background`**: per `DESIGN.md`'s "Stacking order on full-bleed backdrops" rule (originally documented for `PhotoBackdrop`), an absolutely positioned sibling paints above non-positioned content regardless of DOM order — without `relative z-10` on the inner panel, `background`'s photo/gradient would render on top of it and swallow the content. This is unconditional (not gated on whether a caller passes `background`) since it's a harmless no-op for consumers that don't use the prop.

### Visual examples

Rendered at `/design-system/components#elevatedcard`; composed inside `TopHero` and the two resource cards live on `/heartchart-resources`.

---

## TopHero

**Status**: Draft (background photo unavailable — see Implementation rules)
**Source**: `src/components/top-hero.tsx`
**Figma**: AMFM Portal file, "Featured Training" component (node `4194:25820`, superseding the previously-referenced node `2318:26997`), rendered on the `/heartchart-resources` page as the "Let's prepare for your HeartChart Weekend" banner

### Purpose

Full-bleed photo hero for a dashboard page's featured training/promo banner — a two-tone heading (a neutral line plus a brand-emphasized line), supporting copy, and a single video CTA, over a photo backdrop that fills the whole card, edge to edge.

### Anatomy

`ElevatedCard` (dark photo surface, `background` prop bleeding under the outer shell's padding to the true outer edge, `border-white/30` pinstripe inner panel) → background layer (photo + a left-to-right legibility scrim in Figma; see Implementation rules) → content column: two-tone `font-display` heading (`text-display-lg` neutral line + `text-display-2xl` `highlight-gold` emphasis line) → `text-nav-foreground-muted` description → outline `Button` with a `PlayCircle` icon.

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

`text-nav-foreground` (first heading line — Figma's `text-primary-(900)` variable resolves to `#f7f7f7` on this fixed-dark surface, an exact match), `text-highlight-gold` (second heading line, `#e9c481` exact match), `text-nav-foreground-muted` (description, `#cecfd2` exact match), `text-display-lg`/`text-display-2xl` + `font-display`, `nav-surface-from`/`nav-surface-to` (placeholder background gradient — see Implementation rules), `h-128` (Tailwind v4's dynamic spacing-scale utility for the card's fixed 512px height — a real scale value, `128 × 4px`, not an arbitrary bracketed one, same precedent as `GlobalNav`'s `w-20`/`w-74`). `Button variant="outline" size="default"` for the CTA — no new button styling, and the size is pinned so it does not drift if `Button`'s default changes later.

### Accessibility requirements

- Heading text uses real text nodes (not an image with alt text) so it's readable/selectable regardless of the background photo.
- The CTA is a real `Button`, inheriting its keyboard focus and focus-visible ring.

### Responsive behavior

Not yet evidenced against a Figma mobile/tablet frame (the reference is a fixed desktop-width composition, same category of gap as `HeartChartSummary`/`PricingCard`). The heading column caps at `max-w-[544px]` per Figma; the outer `ElevatedCard` is fluid-width but fixed at `h-128` (512px), matching the Figma frame's exact height (confirmed via `get_metadata` on node `4194:25820`: `width=1352 height=512`) at every viewport — this card does not get shorter on narrower screens.

### Implementation rules

- **Fixed 512px height, no white gap, image bleeds to the true outer edge**: previously `TopHero` filled only `ElevatedCard`'s inner bordered panel, leaving the outer shell's `bg-background` (white) padding gap visible as a solid border around the photo — Figma shows no such gap: the photo fills the *entire* outer rounded-2xl shape, and only a thin `border-white/30` "pinstripe" line (not a solid-color gap) marks the 8px inset where the inner panel sits. Fixed by passing the photo/scrim layer to `ElevatedCard`'s new `background` prop (see `ElevatedCard` above) instead of rendering it inside the inner panel — `background` is absolutely positioned against the *outer* shell's own box, which has no border (only padding), so its containing block is flush with the true outer edge and it bleeds under the padding gap; the inner panel's `border-white/30` then reads as a pinstripe drawn over continuous photo, not a margin. Height is pinned to `h-128` (512px) rather than left fluid, since the Figma frame is a fixed-height composition, not one that grows/shrinks with its content.
- **Background photo unavailable in this environment** — Figma's export/raw-image URLs all resolve to `www.figma.com`, blocked by this environment's egress policy (confirmed via the agent proxy status endpoint and the Figma MCP's own `download_assets` tool, whose returned asset URLs are equally unreachable from this sandbox), the same class of gap as `AmfmLogo`'s blocked asset. Renders a `nav-surface-from`→`nav-surface-to` dark gradient plus Figma's own left-to-right legibility scrim (`bg-gradient-to-l from-black/0 from-20% to-black/70 to-70%`) in place of the real congregation-stage photo. Status stays **Draft** for this reason — replace the placeholder gradient div with a `next/image` painted at the same layer (via `ElevatedCard`'s `background` prop) the moment the photo is supplied and committed to `public/`, and drop the placeholder in the same change.
- Composed on `ElevatedCard` rather than a local nested-shell implementation — see that component's Implementation rules for why `AuthCard`/`HeartChartSummary` weren't also migrated onto it.
- The CTA is explicitly `Button variant="outline" size="default"`: Figma's node `4194:25820` exports the nested button with `Text md/Semibold` plus `spacing-sm`/`spacing-xl` button spacing, matching the standard text-md outline CTA rather than the 14px compact course-card action.
- `eyebrowHeading`/`highlightHeading` are two separate props (not one heading string) because they carry different colors/sizes per Figma (`text-display-lg` neutral vs. `text-display-2xl` `highlight-gold`) — don't collapse them into a single templated string.

### Visual examples

Rendered at `/design-system/components#tophero` and live on `/heartchart-resources`.

---

## CourseCard

**Status**: Draft (per-step video thumbnails unavailable — see Implementation rules)
**Source**: `src/components/course-card.tsx`
**Figma**: AMFM Portal file, "Course Card" component (node `2074:45130`); the 3-step pattern on `/heartchart-resources` at nodes `2316:26815` (Step 1), `2316:26886` (Step 2), `2318:26954` (Step 3); the shared step-header fill is confirmed at node `3926:27038`

### Purpose

One step in a fixed 3-step "get ready" course pattern — a colored numbered header, a video-cover CTA over a photo, and a checklist of supporting actions — used together as the "Three simple steps" section beneath `TopHero` on `/heartchart-resources`.

### Anatomy

Numbered header (`STEP {n}`, trailing `ArrowRight`, shared brand-colored background, white text/icon) → video-cover section (photo backdrop in Figma; see Implementation rules — uppercase eyebrow, `font-display` heading, outline `Button` with `PlayCircle`) → checklist (`Check`-in-circle icon + text row, repeated per item).

### Variants (`step` prop)

All 3 steps share one header treatment — `bg-text-brand text-white` (`#894e34`, exact match to Figma's `utility-brand-700` variable, node `3926:27038`). `step` only drives the `STEP {n}` label text, not the styling; header color no longer varies per step (Figma previously showed a 3-tier darkening scale across steps, since superseded by this shared-fill design).

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

`bg-text-brand` (all 3 steps' shared header background, see Variants), `text-white` (header text/icons, plus video-cover text), `bg-muted` (checklist icon circle — Figma's `#f5f5f5` "bg-tertiary" is a near-exact match to the existing `muted` token), `text-muted-foreground` (checklist text + icon), `text-primary` (inline links within checklist text, exact match to Figma's `#aa6140`), `font-display`/`text-display-md` with a local `leading-[2.375rem]` override (video-cover heading — see `DESIGN.md`'s note on this one-off 36px/38px pairing), `nav-surface-from`/`nav-surface-to` (placeholder video-cover background — see Implementation rules). `Button variant="outline" size="compact"` for the 38px video CTA, matching the neutral bordered Figma button treatment.

### Accessibility requirements

- Checklist icons are `aria-hidden="true"` — the adjacent text alone conveys the meaning, consistent with `BenefitListItem`/`PasswordRequirementItem`'s existing precedent.
- The header's `ArrowRight` is `aria-hidden="true"` — purely decorative, the "STEP {n}" text already conveys sequence.
- Inline links within checklist items are real `<a>` elements (composed by the caller) — never a styled `<span>` with a click handler.

### Responsive behavior

Not yet evidenced against a Figma mobile/tablet frame (fixed desktop 3-column composition). Its call site (`/heartchart-resources`) stacks the 3 cards from `grid-cols-1` to `lg:grid-cols-3`, per `DESIGN.md`'s Layout/grid rules — a call-site decision, not a change to this component's own layout.

### Implementation rules

- **Per-step video thumbnails unavailable in this environment** — same blocked-asset class as `TopHero`'s background photo (`www.figma.com` denied by egress policy). Renders a `nav-surface-from`→`nav-surface-to` dark gradient behind each video-cover section in place of the three distinct reference photos. Status stays **Draft** for this reason — wire to real `imageSrc`/thumbnails once available, matching `VideoPlayer`'s "wire to a real source later" precedent.
- The header treatment is a single shared constant (`STEP_HEADER_CLASSNAME`), not a per-step lookup — Figma's current design (node `3926:27038`) uses one `utility-brand-700` fill across all 3 steps rather than the earlier 3-tier darkening scale, and `bg-text-brand` is an exact hex match (`#894e34`) so no new token was needed. This also resolves a prior contrast issue: an earlier per-step scale had Step 1 reuse `border-brand` (`#c07858`) directly, which only cleared 3.46:1 with white text — below WCAG AA's 4.5:1 for this non-"large text" label. `text-brand` clears 6.56:1 with white, so all 3 steps are both on-brand and accessible with no per-step exception.
- The video-cover CTA composes `Button variant="outline" size="compact"` with only `w-fit` local to the CourseCard layout. The verified nested Video Cover instance (`2320:27278`) maps to a 38px shared neutral outline action: one visible neutral border, `shadow-xs`, 20px icon slot, and the shared icon/text gap.
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

Full-width `bg-primary` band → centered `font-display text-display-md` heading + `Button variant="outlineReversed" size="sm"` (`Sparkles` icon) sized to the Figma 42px CTA on the brand-filled background.

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

`bg-primary` (band background — a flat approximation of Figma's gradient/noise texture, see Implementation rules), `font-display`/`text-display-md`, `text-primary-foreground` (heading), and `Button variant="outlineReversed" size="sm"` tokens (`bg-button-outline-reversed-bg`, `border-button-outline-reversed-border`, `text-button-outline-reversed-fg`, `text-button-outline-reversed-icon`, `hover:bg-button-outline-reversed-hover-bg`) for the 42px CTA.

### Accessibility requirements

- Heading is real text (not an image), legible against `bg-primary` via `text-primary-foreground` (an already-verified WCAG AA pairing, see `DESIGN.md` Color tokens).
- The CTA is a real `Button`, inheriting its keyboard focus and focus-visible ring.

### Responsive behavior

Not yet evidenced against a Figma mobile/tablet frame. Content wraps (`flex-wrap`) and centers at any width; no breakpoint-specific layout changes yet.

### Implementation rules

- **Background texture unavailable in this environment** — same blocked-asset class as `TopHero`/`CourseCard`. Figma's reference shows a warm gradient/noise-texture image layered under a `mix-blend-luminosity` grain overlay at 5% opacity; renders as a flat `bg-primary` fill instead. Status stays **Draft** for this reason.
- The CTA button's exact Figma treatment (`bg-primary_alt` `#13161b` fill, `border-white/12`) doesn't translate directly — that combination assumes the button sits on `bg-primary_alt`'s own dark-navy context elsewhere in the design system, not on this component's brand-terracotta background (which would make a same-color fill invisible). Approximated instead via `Button variant="outlineReversed" size="sm"` as a transparent/bordered 42px treatment that reads correctly against `bg-primary` and is shared with `/`'s dark hero links; adjust the reversed-outline tokens rather than this call site if the treatment changes.

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

`DialogContent`'s `showCloseButton` prop (default `true`) — set `false` only when the caller renders its own close affordance. `DialogContent` also accepts `overlayClassName` for composed modal patterns that need a stronger scrim while preserving the same Radix overlay primitive.

### States

Open / closed, animated via `tw-animate-css` (`animate-in`/`animate-out`, `fade-in-0`/`fade-out-0`, `zoom-in-95`/`zoom-out-95`) driven by Radix's `data-state`. Close button: default / hover (`hover:bg-accent hover:text-foreground`) / focus (`focus-visible:ring-[3px]`).

### Properties / API

`Dialog`/`DialogTrigger`/`DialogClose` forward Radix's root props (`open`, `onOpenChange`, etc.). `DialogContent` adds `showCloseButton?: boolean` and `overlayClassName?: string` on top of Radix `Content` props.

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
- Use `overlayClassName` when a composed modal pattern needs a stronger or blurred scrim; do not render a second overlay beside `DialogOverlay`.
- Don't fight Radix's animation/focus-management primitives with custom JS — compose on top of `data-state`/`data-slot` instead.

### Visual examples

Rendered at `/design-system/components#dialog` and via the homepage "Learn More" trigger.

---

## HeartChartModalShell

**Status**: Draft (shared modal foundation verified against the four HeartChart modal frames; URL content is implemented via `HeartChartLinkCard`/`HeartChartLinkModal`; video/chart/tip modal content remains future work)
**Source**: `src/components/heartchart-modal-shell.tsx`
**Figma**: AMFM Portal file — HeartChart link Modal (current verified node `1903:19737`; earlier component reference `3724:20579`), Modal / quick tip (`3727:32459`), Modal / last 4 weeks (`3727:32514`), HeartChart Resources / Quick Start (`3727:32687`)

### Purpose

Reusable shell for the HeartChart modal family: shared overlay, centered rounded surface, title/close header, optional divider, body slot, optional footer/action area, and Figma-sized width variants. Content atoms such as the HeartChart URL row, video player, chart, and tips carousel compose inside this shell rather than each modal re-declaring its own chrome.

### Anatomy

`Dialog` root → `DialogTrigger asChild` → `DialogContent` with `bg-overlay/85 backdrop-blur-[8px]` overlay override and capped-height grid rows → optional inner framed panel (`data-slot="heartchart-modal-frame"`) → padded `DialogHeader` (`DialogTitle` + `sr-only` `DialogDescription` + optional `headerContent`) → optional divider (`data-slot="heartchart-modal-divider"`) → scrollable body slot (`data-slot="heartchart-modal-body"`) → optional shell footer wrapper (`data-slot="heartchart-modal-footer"`) containing the primitive `DialogFooter` (`data-slot="dialog-footer"`).

### Variants

| Prop | Values | Use for |
|---|---|---|
| `size` | `"sm"` / `"md"` / `"lg"` / `"xl"` | Maps the four Figma modal widths: 544px, 640px, 768px, 800px. |
| `framed` | `true` / `false` | `true` renders the inner bordered panel used by the HeartChart link, quick tip, and last-four-weeks modals; `false` supports the plainer Quick Start video modal. |
| `showDivider` | `true` / `false` | `true` renders the title/body separator and uses a four-row shell grid; `false` removes the separator and switches to a three-row shell grid so the body remains the scroll row. |

### States

Closed / open, inherited from `Dialog`. Close button hover/focus behavior is inherited from `DialogContent`'s built-in close affordance.

### Properties / API

```ts
type HeartChartModalShellSize = "sm" | "md" | "lg" | "xl";

type HeartChartModalShellProps = Omit<ComponentProps<typeof Dialog>, "children"> & {
  title: string;
  trigger: ReactElement;
  children: ReactNode;
  description?: string;
  headerContent?: ReactNode;
  footer?: ReactNode;
  size?: HeartChartModalShellSize;
  framed?: boolean;
  showDivider?: boolean;
  className?: string;
  bodyClassName?: string;
  footerClassName?: string;
  headerClassName?: string;
};
```

### Design tokens used

`bg-background`, `bg-overlay/85`, `backdrop-blur-[8px]`, `border-border-secondary`, `bg-secondary`, `text-foreground`, `rounded-2xl`, `rounded-md`, `shadow-2xl` — all existing tokens/utilities. No new design token was introduced for the modal shell.

### Accessibility requirements

- Built on the existing Radix-backed `Dialog`, preserving focus trap, `Escape` close, return-focus-to-trigger, and `data-slot` metadata.
- `DialogTitle` is always rendered from the required `title` prop and receives initial programmatic focus on open so content-heavy modals do not auto-focus/select the first body control.
- `DialogDescription` is always rendered as `sr-only`; callers can provide specific assistive copy via `description`, otherwise the shell falls back to "{title} modal."
- `headerContent`, when provided, renders inside `DialogHeader` after the hidden description and before the divider. Use it for modal-specific intro copy/previews; do not put body rows or footer actions there.
- The close control remains the `DialogContent` built-in `size-11` button with visible focus treatment.
- `footer` content must use real buttons/links and supply accessible labels for icon-only actions.

### Responsive behavior

Mobile remains `w-full max-w-[calc(100%-2rem)]` via `DialogContent`; from `sm` up, `size` maps to the Figma desktop widths (`sm:max-w-[544px]`, `sm:max-w-[640px]`, `sm:max-w-[768px]`, `sm:max-w-[800px]`). Content inside the body slot owns its own responsive behavior.

The shell caps the dialog at `max-h-[calc(100vh-2rem)]`; framed shells cap the inner panel at `max-h-[calc(100vh-3rem)]`, and the body slot carries `min-h-0 overflow-y-auto` so tall chart/resource/video content scrolls inside the modal without clipping the header or footer. Divider-present shells use `grid-rows-[auto_auto_minmax(0,1fr)_auto]`; divider-free shells use `grid-rows-[auto_minmax(0,1fr)_auto]` so the body row remains the constrained scroll region.

### Implementation rules

- Compose this shell for HeartChart modal-family screens before adding modal-specific content; do not copy modal header/body/footer chrome per modal.
- Keep content-specific logic out of the shell. QR/link copying, video controls, charts, and carousel behavior belong in dedicated child components with their own tests.
- Preserve primitive metadata inside composed shell slots: the shell footer wrapper uses `data-slot="heartchart-modal-footer"`, while the nested `DialogFooter` keeps `data-slot="dialog-footer"`.
- Use existing tokens and `DialogContent.overlayClassName`; do not introduce a parallel overlay, dialog primitive, or raw-color modal style.
- The shell is a foundation component, not a complete page pattern. It becomes production-ready only after at least one full HeartChart modal pattern is implemented and browser-validated through `/design-system`.

### Visual examples

Rendered at `/design-system/components#heartchartmodalshell`.

---

## HeartChartLinkCard

**Status**: Draft (validated as a reusable content atom for Modal / HeartChart link; real QR generation/download side effects are caller-owned)
**Source**: `src/components/heartchart-link-card.tsx`
**Figma**: AMFM Portal file — HeartChart link Modal (current verified node `1903:19737`; earlier component reference `3724:20579`), nested `_HeartChart - Church - URL` row

### Purpose

Reusable card for sharing a campus-specific HeartChart assessment URL: QR preview, labelled read-only URL field, copy button, share icon action, and download-QR action. This is the reusable URL row the full HeartChart link modal composes, and it should be reused by any future info box or resource panel that exposes the same QR/link actions.

### Anatomy

Outer card (`data-slot="heartchart-link-card"`) → QR preview (`data-slot="heartchart-link-qr"`) → label + read-only URL control (`data-slot="heartchart-link-url-control"` / `heartchart-link-url-input`) → copy button (`heartchart-link-copy-button`) → actions group (`heartchart-link-actions`) with icon-only share button and labelled download-QR button. On desktop the share affordance is positioned at the URL card's top-right edge, matching Figma; on compact layouts it returns to the action row to sit left of the centered download button.

### Variants

| Prop | Values | Use for |
|---|---|---|
| `qrImageSrc` | `string` / omitted | When present, render the real QR image; when omitted, render a tokenized QR placeholder icon so the card never displays a stale demo QR for an arbitrary URL. Design-system demos pass the Figma-derived QR asset explicitly. |
| `label` | `string` | Defaults to "Your unique HeartChart URL"; override only when the product label changes. |

### States

Default, hover/focus on all actions, with QR image, without QR image. Copy/share/download buttons render disabled when their matching callback is omitted so design-system or incomplete consumers do not expose dead enabled controls. Loading states are not owned by this card yet because the real async copy/share/download flows are not implemented in this slice.

### Properties / API

```ts
interface HeartChartLinkCardProps {
  url: string;
  label?: string;
  qrImageSrc?: string;
  qrImageAlt?: string;
  onCopy?: () => void;
  onShare?: () => void;
  onDownloadQr?: () => void;
  className?: string;
}
```

### Design tokens used

`bg-secondary`, `bg-background`, `border-border-secondary`, `border-input`, `text-text-secondary`, `text-muted-foreground`, `text-fg-quaternary`, `bg-button-outline-bg`, `border-button-outline-border`, `text-button-outline-fg`, `text-button-outline-icon`, `shadow-xs`, `shadow-sm`, `rounded-md`, `rounded-sm`.

### Accessibility requirements

- URL is rendered in a real read-only text input with a visible `<label>`; it truncates visually in constrained widths while retaining the full value in the native textbox and `title` attribute so users can select/copy the URL without relying on the QR image.
- Copy button uses visible text plus `aria-label="Copy HeartChart URL"`.
- Share is icon-only and must keep `aria-label="Share HeartChart URL"`.
- Download action uses visible text plus `aria-label="Download QR code"`.
- QR image defaults to `alt="QR code for HeartChart URL"`; if the real QR becomes decorative because the URL is already exposed nearby, revisit this with product/design rather than silently removing the accessible name.
- Side effects stay outside the component. Callers pass `onCopy`, `onShare`, and `onDownloadQr`; this component does not introduce a clipboard/share/download primitive. If a callback is omitted, the matching button is disabled.

### Responsive behavior

Stacks vertically on narrow screens so the URL input and actions do not overflow; the QR preview is centered, the labelled URL control stays full-width and truncates inside the native input, and the compact actions center as a share/download group below `360px` because the full spacer grid is wider than the available content. From `360px` up, the action grid centers the "Download QR" button with the share icon positioned to its left. From `sm` up, QR, field, and download action sit in a single row while the share affordance is absolutely positioned at the card's top-right edge, matching the Figma modal card.

### Implementation rules

- Reuse this card anywhere the HeartChart QR/link row appears. Do not duplicate the copy/share/download markup inside individual modals.
- Download QR composes `Button variant="outline" size="control"` so it keeps the shared 44px neutral bordered button chrome without local padding, icon, color, or shadow overrides. Copy composes `Button variant="utilitySegment" size="controlSegment"` because it is embedded as the right segment of the URL input group: the group owns the outer border/shadow while the segment owns the left divider and trailing rounded corners.
- Share composes `Button variant="ghost" size="icon"` with `text-fg-quaternary`, matching Figma's icon-only share affordance rather than inventing a second raw icon button.
- Use lucide `Copy`, `ExternalLink`, and `QrCode` as the project-approved icon equivalents for Figma `copy-01`, `share-04`, and `qr-code-01`; `share-04` is documented in Figma as share/export/open/link/external/hyperlink/website, and the rendered glyph is the external-link square-arrow form, not lucide's node-style `Share2`. Active utility icons use `text-fg-quaternary`, not the disabled-state token.
- Real QR generation, clipboard feedback, native share fallbacks, and file download behavior belong in a future side-effect wrapper or caller, not in this presentational atom.

### Visual examples

Rendered at `/design-system/components#heartchartlinkcard`.

---

## HeartChartLinkModal

**Status**: Draft (first full HeartChart modal pattern; decorative phone preview is a local Figma-derived asset; design-system demos pass the demo QR asset explicitly; real QR/download side effects remain caller-owned)
**Source**: `src/components/heartchart-link-modal.tsx`
**Figma**: AMFM Portal file — HeartChart link Modal (current verified node `1903:19737`; earlier component reference `3724:20579`)

### Purpose

Full "Share your HeartChart link" modal pattern composed from `HeartChartModalShell` and `HeartChartLinkCard`. It owns the modal-specific intro copy, quick tip, optional settings link, brand preview area, URL/QR card, and "Add a campus" footer action while leaving dialog chrome to the shared shell.

### Anatomy

`HeartChartModalShell size="xl"` → `headerContent` grid with intro copy / quick tip / optional settings CTA (`Button asChild variant="link" size="inline"` with leading upload icon, explicit here to document the Figma text-button instance) / preview → body containing `HeartChartLinkCard` → footer `Button` with leading plus icon.

### Variants

No formal variant prop yet. The component accepts `preview` to replace the default decorative phone-preview asset with a real app preview or richer composition once dynamic church/logo rendering exists. `qrImageSrc` is caller-supplied; when omitted, the card renders its generic QR placeholder rather than a demo QR that could mismatch a real URL.

### States

Closed/open via `HeartChartModalShell`; footer action; copy/share/download QR callbacks delegated to `HeartChartLinkCard`. Callback-owned controls disable themselves when their callback is omitted.

### Properties / API

```ts
interface HeartChartLinkModalProps {
  trigger: ReactElement;
  url: string;
  settingsHref?: string;
  qrImageSrc?: string;
  preview?: ReactNode;
  onCopyUrl?: () => void;
  onShareUrl?: () => void;
  onDownloadQr?: () => void;
  onAddCampus?: () => void;
}
```

### Design tokens used

Shell tokens from `HeartChartModalShell`, plus `text-text-tertiary`, `text-text-brand`, `bg-secondary`, `bg-background`, `border-input`, `text-fg-quaternary`, `shadow-button-inset`, `Button variant="link" size="inline"` for the upload settings CTA, and existing `Button` default-variant styling with `size="compact"` for "Add a campus" (`text-button-primary-icon` on its leading icon).

### Accessibility requirements

- Modal title is the visible `DialogTitle`: "Share your HeartChart link", and receives initial focus through `HeartChartModalShell` when the dialog opens.
- Hidden modal description summarizes the share/QR purpose.
- Settings CTA renders only when `settingsHref` is supplied, and then it composes `Button asChild variant="link" size="inline"` around a real `<a>` with visible text and a leading decorative `Upload` icon. Do not default this to a placeholder route.
- Footer CTA is a real `Button` with a decorative leading `Plus` icon. It is disabled when `onAddCampus` is omitted so the modal never exposes a dead enabled action.
- The header phone preview is `aria-hidden` because it is decorative visual context. Do not expose it as content until it carries meaningful dynamic product information.

### Responsive behavior

Uses the 800px shell width on desktop. Header content collapses to one column on narrow screens and hides the decorative preview so text and URL controls remain usable. The composed `HeartChartLinkCard` stacks in compressed layouts, centering the QR preview and share/download actions while keeping the URL control full-width.

### Implementation rules

- Do not inline modal chrome here. Changes to overlay, close button, shell dimensions, header/body/footer slots, or scroll behavior belong in `HeartChartModalShell`.
- Keep `HeartChartLinkCard` reusable and side-effect-free. If copy/share/download behavior is implemented later, add a caller-level behavior wrapper and tests rather than wiring browser APIs directly into the presentational card.
- `settingsHref` has no default because no real settings route exists in the app yet. Supply it only after a verified destination exists; do not use `"#"` or `/settings` as a fake route.
- Do not default `qrImageSrc` to the demo QR asset inside the reusable modal. Demos may pass `/heartchart-link-qr.svg` explicitly, but real app callers must supply a QR source that matches `url` or let the generic placeholder render until QR generation exists.
- `HeartChartBrandPreview` uses `public/heartchart-link-phone-preview.png`, a local asset derived from the verified Figma node screenshot (`1903:19737`). The nested Figma screen asset exported empty through MCP, so do not rebuild this as hand-authored placeholder markup; replace it only with a stable exported asset or real app preview.

### Visual examples

Rendered at `/design-system/components#heartchartlinkmodal`, with a dedicated detail page at `/design-system/components/heart-chart-link-modal`.

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

ARIA carousel region (`role="region"`, `aria-roledescription="carousel"`) → scroll container (`data-slot="dposystem-story-track"`, `snap-x snap-mandatory`, keyboard-navigable, horizontal scrollbar visually hidden) → per-slide panels (`role="group"`, `aria-roledescription="slide"`, `SlideHeading` + prose/list content, some slides using `ValueList`) → prev/next buttons → dot indicators.

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
- The horizontal track intentionally keeps `overflow-x-auto` for carousel mechanics but hides native scrollbars (`scrollbar-width: none` / hidden WebKit scrollbar) because visible horizontal browser chrome inside the modal reads as broken UI. Do not replace this with `overflow-x-hidden`; that would risk breaking touch/trackpad scrolling and snap behavior.
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
    - Action row — three `Button` (`variant="outline" size="compact"`) instances: "Quick Tip" (lightbulb), "Last 4 Weeks" (trending line), "Share Your Link" (QR code)

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

`shadow-card`, `rounded-2xl`/`rounded-md`, `bg-background`, `border` (outer/inner card hairlines, participation-level sub-panel border) + `bg-muted/50` (participation-level sub-panel, badge — `bg-muted/50` reused per `Input`'s established `#fafafa`-over-white precedent, not a new gray token), `text-foreground` (badge text), `text-text-tertiary` (participation-level eyebrow label — the 12px uppercase label needs the darker supporting-copy token for contrast on the muted sub-panel), `text-muted-foreground`/`bg-muted-foreground` (supporting sentence, "Individuals" caption, donut percentage label, inactive bar-segment text, marker triangle+stem), `border-secondary` (donut track ring — exact match, see Implementation rules), `bg-muted` (inactive bar segments), `status-success`/`status-success-strong`, `status-warning`/`status-warning-subtle` (new — see `DESIGN.md` Color tokens and Known gaps). The three action buttons use `Button variant="outline"` and inherit `bg-button-outline-bg`, `border-button-outline-border`, `text-button-outline-fg`, and `text-button-outline-icon` from the shared Button contract.

**Deliberately not using `text-text-secondary`/`fg-disabled`/`border-black/10` for most of the summary card's own non-button chrome**, even though several are closer pixel matches to Figma's exact grays — `DESIGN.md`'s "Auth/onboarding surfaces are theme-fixed" section scopes those specifically to the fixed-light auth surface family (root-only, no `.dark` value by design). This card is a themed dashboard surface, not a fixed-light one, so reusing those tokens broadly left inactive scale segments, borders, and marker/tint colors stuck in their light-mode value under `.dark` — confirmed by actually toggling `.dark` during implementation and seeing bright, undarkened elements against an otherwise-dark card. Swapped to the equivalent theme-aware generic tokens (`foreground`/`muted-foreground`/`muted`/`border`) for the bulk of the component; the lone exception is the tiny participation-level eyebrow label, which uses existing `text-text-tertiary` because `text-muted-foreground` failed browser accessibility contrast on the muted sub-panel. The action buttons now rely on `Button`'s semantic outline tokens instead of local color overrides — an exception is `border-secondary`, which Figma's own variable export confirmed as the donut track's literal fill and which already carries a verified `.dark` value, so no trade-off was needed there.

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
- Reuse `Button` (`variant="outline" size="compact"`) for the three 38px action buttons rather than hand-rolling button markup or applying local color overrides — shared `Button` owns the compact geometry, 20px icon slot, icon/text gap, semantic outline colors, border/shadow/focus/hover treatment, and dark-mode fallback.
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

**Status**: Draft (functionally complete and pixel-matched to both referenced Figma states, but its destination routes are placeholders — see Implementation rules)
**Source**: `src/components/global-nav.tsx`
**Figma**: AMFM Portal file — collapsed/default state, node `2065:13660` ("Sidebar navigation", 80px icon rail); expanded/exposed state, node `3727:25276` ("Content", 296px labeled panel); expanded-state logo lockup, node `3727:25279` ("Logo"). Both rail states are the *same* nav, collapsed vs. open — no separate mobile reference exists for either (see Responsive behavior). The account-card flyout menu has no Figma node of its own — see its Implementation rules entry below.

### Purpose

The app's primary left-hand navigation rail — persistent access to the church's core sections ("Your Church": Home, dashboard, champions, resources, training) and ministry tools (Loveology, assessments, small groups, etc.), plus account access, collapsed to an icon-only 80px rail by default and expanding to a labeled 296px panel on hover. In app-shell contexts (see the `overlay` prop below) the expanded panel **overlays** page content — it never pushes/reflows the layout — and the rail stays permanently pinned open on very wide viewports (≥1600px).

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
| Expanded (hover / focus) | `w-74` (296px), triggered by hovering the rail with a pointer, or focusing anything inside it via keyboard (see Implementation rules — neither Figma reference shows a dedicated toggle chrome, and the task that introduced this behavior explicitly calls for hover instead of the earlier click-to-toggle). Every item's label grows in (`max-width`/`opacity` transition). Section headings switch to their long form ("Your Church"/"Ministry Tools"), left-aligned. The header cross-fades to the full logo lockup. The account card grows to show name, email, and a `ChevronsUpDown` affordance. When `overlay` is set, this expansion **overlays** page content instead of pushing it — see Implementation rules. |
| Pinned open (≥1600px viewport) | Same visual as "Expanded" above, but forced regardless of hover/focus/`defaultOpen`, and it stays that way for as long as the viewport is ≥1600px — see `PINNED_OPEN_QUERY` in Implementation rules. When `overlay` is set, the reserved layout space (the spacer) widens to match, so the permanently-open rail no longer overlays content at this width — it becomes a real part of the layout, matching a persistent-sidebar pattern instead of a transient hover flyout. |
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
  overlay?: boolean; // renders the rail as a fixed, viewport-pinned overlay with an in-flow spacer — see Implementation rules; defaults to false
}
```

Uncontrolled by design (internal `useState`, now driven by hover/focus/account-menu-open/pinned-open rather than a click handler) — no controlled `open`/`onOpenChange` pair exists because every current consumer (`MarriageChampionsPageShell`, `/heartchart-resources`, and the `/design-system` demo) lets the rail manage its own visual state. Add a controlled API only if a future app shell needs to coordinate layout with nav state, per `CLAUDE.md`'s anti-premature-abstraction guidance.

`overlay` defaults to `false` so the `/design-system` gallery (and any other bounded, non-app-shell demo context) keeps rendering the rail as a plain in-flow element, exactly as before this prop existed. Real app-shell consumers set it explicitly (`<GlobalNav overlay />`) to get the fixed-position/spacer behavior described in Implementation rules below.

### Design tokens used

`nav-bg`, `nav-surface-from`/`nav-surface-to` (chrome gradient, `/90` opacity), `nav-border`, `nav-active-from`/`nav-active-to` (active-item gradient), `nav-foreground`, `nav-foreground-muted`, `nav-foreground-subtle`, `nav-success` (online indicator) — see `DESIGN.md` Color tokens for the full table and why these are independent, theme-fixed tokens rather than reusing coincidentally-equal swappable ones (`muted-foreground`, `text-tertiary`, `foreground`). Also `border-white/8` (outer chrome border, a Tailwind opacity modifier — no new token needed), `backdrop-blur-2xl` (Tailwind's built-in 40px blur, exactly matching Figma's "Backdrop blurs/backdrop-blur-xl" effect radius — Figma's own name for this effect doesn't line up with Tailwind's `blur-xl`/24px, but the *value* does match `blur-2xl`/40px, so no arbitrary blur value was needed, unlike `PhotoBackdrop`'s `backdrop-blur-[20px]`/`[8px]`), `w-20`/`w-74`/`w-26`/`w-80`/`max-w-40`/`max-w-60` (Tailwind v4's dynamic spacing-scale utilities — real scale values, not arbitrary/bracketed ones, since Tailwind v4 generates any `w-<n>`/`max-w-<n>` from the shared `--spacing` variable; `w-26`/`w-80` are the `overlay` spacer's collapsed/pinned-open reserved widths — see Implementation rules). The account menu overrides `DropdownMenu`'s default `bg-popover`/`text-popover-foreground` with `bg-nav-surface-from`/`border-nav-border`/`text-nav-foreground` instead, since it's a fixed-dark extension of the rail, not a themed app-surface popover. `z-40` (the `overlay` rail's stacking level — above ordinary page content, below `Dialog`/`DropdownMenu`'s `z-50`; see DESIGN.md's Stacking order note).

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

Both Figma references are desktop-only (80px/296px fixed rail widths); no mobile/tablet reference exists for either state. The scrollable nav-items region (`overflow-y-auto`) prevents the rail from ever exceeding its container's height on short viewports, but a dedicated mobile pattern (e.g. a bottom bar or hamburger-triggered drawer) is not implemented — flag for design once a mobile reference exists, same category of gap as `Card`/`PricingCard`'s `/create-profile` layout. Hover-to-expand has no direct touch equivalent either; touch users can still reach every destination via the collapsed icon-only rail (icons are always tappable links), just without the label text visible until a real mobile pattern exists.

Above **1600px** (`PINNED_OPEN_QUERY`, tracked via `window.matchMedia`), the rail stays pinned expanded regardless of hover/focus — a documented exception to `DESIGN.md`'s "don't add a custom breakpoint without a design reference that needs one" rule, added directly per this task's explicit requirement (no Figma frame references 1600px specifically; it's a product/engineering decision for very wide monitors, not a pixel-sourced breakpoint). See `DESIGN.md` Breakpoints.

### Implementation rules

- **Expand trigger is hover (or keyboard focus), not click**: `open` is computed from four independent signals — `hoveredRef` (pointer inside the `<nav>`, via `onMouseEnter`/`onMouseLeave`), `focusedRef` (focus inside the `<nav>`, via `onFocus`/`onBlur` — React's synthetic focus/blur events bubble, so these fire for any descendant), `accountMenuOpenRef` (the account `DropdownMenu`'s own open state, reported via its `onOpenChange`), and `pinnedOpen` (see below) — `open = hovered || focused || accountMenuOpen || pinnedOpen`. The third signal exists because the account menu's content is portal-rendered outside the `<nav>` DOM subtree: without it, opening the menu and moving the pointer off the (now-hidden-behind-the-menu) rail would blur/un-hover the rail and collapse it out from under its own open flyout. `Escape` force-closes regardless of hover/focus (but not `pinnedOpen` — see below). Neither Figma reference shows a dedicated chevron/hamburger control, so there's still no added toggle chrome beyond what's pixel-referenced — only the *trigger gesture* changed (hover/focus instead of click), per the task that introduced this behavior.
- **Pinned open ≥1600px, tracked via `matchMedia`, not a Tailwind breakpoint class**: `pinnedOpen` is real `useState`, synced from `window.matchMedia(PINNED_OPEN_QUERY).matches` in an effect (`change` listener, cleaned up on unmount) rather than expressed as `min-[1600px]:` utility overrides sprinkled across every conditional class in the component. This was chosen because `open`'s visual states (labels, headings, header logo, account card) are already driven by a single JS boolean throughout the file — folding a second, viewport-driven "force open" signal into that same boolean via `syncOpen()` keeps one code path for "what does open/closed look like," rather than duplicating every ternary with a parallel breakpoint-scoped override. `Escape` does not un-pin the rail while the viewport is ≥1600px — `syncOpen()` recomputes `open` from all four signals including `pinnedOpen` immediately after `Escape` clears `hoveredRef`/`focusedRef`, so the rail snaps back open, matching "stays pinned open" rather than being dismissible at this width.
- **`overlay` prop: fixed rail + in-flow spacer, so expansion overlays content instead of pushing it**: when `overlay` is `true`, the rail itself renders `fixed inset-y-3 left-3 z-40` (escaping normal layout flow entirely, pinned to the viewport) instead of `h-full` inside its caller's flex/grid box, and a second, plain in-flow `aria-hidden` spacer element (width `w-26` collapsed / `w-80` pinned-open — see Design tokens used) is rendered as a sibling *before* it. The spacer is what surrounding layout (e.g. `MarriageChampionsPageShell`'s outer flex row) actually sees and reserves space for; the rail floats above it and above whatever content sits to its right. Because the rail no longer participates in the layout's box model, expanding it via hover/focus grows its `fixed` box past the spacer's reserved width and paints over the adjacent content (at `z-40`, above ordinary page content but below `Dialog`/`DropdownMenu`'s `z-50`) instead of shoving that content sideways — this is the fix for the reported "nav slides content over" bug. `overlay` defaults to `false` (a plain in-flow `h-full` element, exactly the pre-existing behavior) so the `/design-system` gallery's bounded demo box isn't affected — see Properties/API.
- **Why this couldn't stay purely "the caller decides positioning"**: the rail previously documented itself as not assuming its own screen position (letting a caller-provided `sticky`/`h-screen`/`p-3` wrapper handle placement). That approach can't produce overlay-not-push behavior on its own: a flex sibling's box always reserves space for its rendered width, so *any* width-animating flex item pushes adjacent siblings, regardless of how the caller wraps it. Overlay behavior requires removing the rail from flow (`fixed`) plus a matching in-flow placeholder — both are now owned by the rail itself (gated behind `overlay`) rather than re-implemented per call site, so the two real app-shell consumers (`MarriageChampionsPageShell`, `/heartchart-resources`) don't each hand-roll the same spacer math. The trade-off: those two call sites must pass `overlay` explicitly and must not also wrap `GlobalNav` in their own `sticky`/`p-3` box (both have had that wrapper removed in the same change) — see Known gaps in `DESIGN.md` if a third consumer needs a different arrangement.
- **Same markup, animated, not two swapped renders**: every collapsed/expanded difference (labels, section headings, header logo, account-card text) is implemented as one continuously-mounted DOM tree with `transition-[width]` (root) and `transition-[max-width,opacity,padding,gap]` (content) — never a conditional swap between two different JSX trees — so the collapse/expand reads as one smooth morph. See `DESIGN.md` Motion rules.
- **Icons are `lucide-react` "closest stable equivalent" substitutes**, not traced Untitled-UI SVGs, matching the precedent set by `Select`'s `ChevronDown` and `BenefitListItem`'s `CircleCheck`. Two are worth flagging specifically since Figma's own component-description tags didn't match their rendered glyph (verified by screenshotting each node directly rather than trusting the tags): "Loveology" renders as a `»` double-chevron in Figma, not an atom/molecule as its Figma description tags suggested — mapped to `ChevronsRight`. "Small Groups" ("intersect-three") renders as three overlapping circles, not a lightning bolt as its tags suggested — mapped to `Blend`. "WeDo"'s heart-with-swirl glyph has no close `lucide-react` equivalent; `HeartHandshake` was chosen for semantic fit (partnership/community), not pixel similarity. The account menu's icons (`User`, `Building2`, `Settings`, `CreditCard`, `FileText`) are likewise semantic-fit `lucide-react` substitutes read off the supplied screenshot, not traced from a Figma node.
- **Header logo is now the real exported asset, not hand-authored text**: `public/AMFM_Collaped.svg` (48×17, collapsed logomark) and `public/AMFM_Expanded.svg` (169×33, expanded lockup) were supplied directly and are rendered via `next/image` (`unoptimized`, matching `HeartChartLogo`'s precedent for pre-rasterized static SVG exports) inside two absolutely-positioned, opacity-cross-faded layers — the same cross-fade structure the old text version used, just with real images instead of a `font-display` approximation. This resolved the collapsed-state clipping/off-center bug: the collapsed asset's 48px intrinsic width exactly fills the 80px rail's 48px content area (80 − 2×16px `px-4`), so it renders flush within the existing padding with no separate centering math needed. See `DESIGN.md` Known gaps for the resolution note.
- **Expanded-state logo indent is set directly on the logo layer (`left-5`), not via padding on the header wrapper**: the header `<div>` used to carry `px-5`/`px-4`, but both logo layers are `absolute inset-0`/`inset-y-0`, and an absolutely positioned child resolves its inset against its containing block's *padding box* — so that padding had no effect on either layer. It happened to look correct in the collapsed state only because the collapsed asset is centered (`justify-center`) inside the full-width box, and centering a box is unaffected by equal left/right padding being ignored. The expanded lockup is left-aligned instead, so it rendered flush against the rail's true left edge (`x=0`) rather than the intended 20px indent that lines up with "Your Church" below it. Fixed by dropping the wrapper's now-inert padding and setting `left-5` directly on the expanded layer, mirroring the identical rule for section headings immediately below.
- **Account-card avatar still renders initials ("OR"), not a real photo** — only the wordmark assets were supplied, not an avatar photo; replace once one exists, per `HeartChartLogo`'s "don't re-derive this from code" precedent.
- **Account menu is a `DropdownMenu` (see above), not a hand-rolled popover**: `NavAccountCard`'s existing button becomes the `DropdownMenuTrigger` (via `asChild`, so no extra nested button is introduced), and `DropdownMenuContent` is positioned `side="right" align="end"` with the nav's fixed-dark tokens instead of the swappable `popover` tokens (see Design tokens used) to read as an extension of the rail's own chrome, matching the supplied screenshot. Its five links (`/profile`, `/church-profile`, `/account-settings`, `/billing`, `/terms-privacy`) are placeholders, same caveat as the rest of `GlobalNav`'s routes below — no Figma node backs this menu (see Figma reference above).
- **Section headings use `inset-x-{4,5}` on the `<p>` elements themselves, not padding on their wrapper**: an absolutely positioned child resolves `inset-x-0` against its containing block's *padding box*, so padding declared on the `relative` wrapper has no effect on it. A prior version put the indent on the wrapper (`px-4`/`px-5`) and left the headings at `inset-x-0`, which silently rendered "Church"/"Tools" and "Your Church"/"Ministry Tools" flush against the rail's left edge instead of matching the header's own indent. Any future change to this indent must move with the `<p>` elements, not a parent's padding.
- **`NavAccountCard` renders two distinct Figma layouts, not one layout with a collapsed label**: the expanded reference is left-aligned (`items-start`, `p-3`, avatar-label group ungrown-but-left-packed) so the chevron affordance has room in the corner; the collapsed reference is a separate, centered layout (`items-center justify-center`, `p-0`, no gap) since only the avatar renders. Applying the expanded layout's padding/alignment to the collapsed state (rather than switching to the dedicated centered one) left the avatar packed against the left padding instead of centered in the 80px rail.
- **Destination route status lives on the nav item data** — only `/` (Home), `/marriage-champions` (Our Marriage Champions), `/heartchart-resources` (HeartChart Resources), and the two external URLs (`https://amfm.org/mmp`, `https://wedowedo.com`, taken directly from the Figma reference's own `href`/`target` attributes) are real. Every other internal `href` (`/dashboard`, `/training`, `/loveology`, the account menu's five links, etc.) is a placeholder path pending real routes — don't mistake these for a verified IA. Placeholder links render `data-route-status="placeholder"` and `data-prefetch="disabled"` and pass `prefetch={false}` to `next/link`, so design-system browser validation does not generate noisy 404s for documented placeholder IA.
- **Active state is route-derived, not data-driven**: `NavItem` calls `usePathname()` and computes `active = pathname === href` itself, rather than reading a hardcoded `active` flag off `NavLinkItem` (the field was removed from the type once a second real route existed to compare against). This means any nav instance always reflects the actual current page — e.g. rendering `GlobalNav` on `/marriage-champions` highlights "Our Marriage Champions", not "Home". Placeholder routes simply never match `pathname` and so are never active, which is correct until they become real pages.
- **`activeHref` is a demo-only escape hatch**: `/design-system/components` renders `GlobalNav` at its own route (`/design-system/components`), which matches none of the nav's real `href`s, so pathname-derived active would never demo the "Active item" state documented above. `GlobalNav` accepts an optional `activeHref` prop that, when set, is compared against each item's `href` instead of `usePathname()`'s result; the showcase passes `activeHref="/marriage-champions"` so the third "Your Church" item still renders active there. Real call sites (e.g. `/marriage-champions`) should omit this prop and let the actual route decide.
- **No longer fully position-agnostic — this was a deliberate, documented change**: previously `GlobalNav` didn't hardcode `fixed`/`absolute` positioning at all, filling its container (`h-full`) and leaving *all* placement to the caller (a caller-provided `sticky`/`h-screen`/`p-3` wrapper). That contract couldn't support overlay-not-push behavior (see the `overlay` prop's Implementation rules above for why), so this task changed it: `GlobalNav` now owns its own `fixed` positioning and spacer *when the caller opts in via `overlay`*, and remains the old fully-agnostic, plain in-flow element when it doesn't. `MarriageChampionsPageShell` and `/heartchart-resources` both now render `<GlobalNav overlay />` directly (no wrapping `sticky`/`h-screen`/`p-3` div — that wrapper is redundant with, and would conflict with, the rail's own `fixed inset-y-3 left-3`), while `/design-system/components` still renders a bare `<GlobalNav activeHref="..." />` for component inspection, relying on the `overlay=false` default. It is still not wired into `src/app/layout.tsx` as a global authenticated app shell, since the broader dashboard IA does not exist yet — see `DESIGN.md` Known gaps.
- Colocated at `src/components/global-nav.tsx` (not `src/components/ui`) since it carries real business logic (hover/focus/account-menu-open/pinned-open-state coordination, `Escape` handling) beyond a visual primitive, per `CLAUDE.md`'s "No business logic in `src/components/ui`."

### Visual examples

Rendered live in the Marriage Champions shell (`/marriage-champions`, `/marriage-champions-empty`), on `/heartchart-resources`, and as a single inspectable instance (collapsed by default, non-`overlay`) at `/design-system/components#globalnav` — hover it (or Tab into it) to see the expanded state, and click the avatar/name to see the account menu. Previously `/design-system` rendered two side-by-side instances (one forced open via `defaultOpen`) to show both rail states at once; consolidated to one instance per the task that introduced hover-to-expand, since hovering the single instance now demonstrates both states directly. To see the overlay-not-push and pinned-open (≥1600px) behaviors live, view `/marriage-champions` or `/heartchart-resources` directly rather than the gallery instance, which intentionally stays non-`overlay`.

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
- The scrubber carries a generated `id` and stable `name="video-seek"` so browser autofill/form-field heuristics do not flag the design-system page while preserving its accessible `aria-label`.
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

Renders its `children` as an inert, faded backdrop — blurred and fading into the surrounding surface color — so real content reads as "there, but not yet actionable" behind a centered empty-state call-to-action, instead of being hidden outright. Used on `/marriage-champions-empty` to preview the Team Members table's shape without making it interactive. See `DESIGN.md`'s "Blur overlay" foundation for the token-level treatment.

### Anatomy

Single wrapping `<div>` (`aria-hidden`, `relative`, `overflow-hidden`) containing: the blurred inert `children` (`blur-[2px] pointer-events-none select-none`) plus an absolutely-positioned fade mask (`bg-gradient-to-b from-background/0 to-background`) covering the full area.

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

`bg-background` (fade-mask end color — see Implementation rules for why this diverges from Figma's hardcoded white). No new tokens required; `blur-[2px]` is an arbitrary value matching Figma's own layer effect exactly, not promoted to a token for a single use site (same precedent as `VideoPlayer`'s one-off `backdrop-blur-[4px]`). Child opacity is intentionally not lowered: a browser accessibility audit flagged the previous `opacity-30` treatment because visible text inside the decorative preview no longer met contrast, while the blur + fade mask already communicates the inactive state.

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

---

## Dashboard components (HeartChart Dashboard)

The 11 entries below were added from the design system audit of the Figma "HeartChart Dashboard / premium" frame (node `3727:29573`), then implemented on `/dashboard` (`src/app/dashboard/page.tsx`, composed via `src/app/dashboard/_components/dashboard-content.tsx`). Status/Source lines below now point at real code; sample data lives in `src/app/dashboard/_lib/dashboard-data.ts` (representative, not wired to a real backend — same caveat as `src/lib/team-members.ts`). **Node-ID caveat**: several nested instance IDs inside this frame did not resolve reliably when queried in isolation during the audit (a scoping quirk of this file's deeply-nested instances, not a tooling failure on the top-level frame) — the visual implementation was verified against full-resolution screenshots and the confirmed top-level frame metadata instead; re-select each sub-component directly in Figma to pixel-verify exact per-node values if that becomes necessary later.

---

## WeDoCard

**Status**: Draft (implemented and rendered on `/dashboard`; wordmark is a hand-authored approximation — see Implementation rules)
**Source**: `src/components/we-do-card.tsx`
**Figma**: AMFM Portal file, node `3727:29573` ("HeartChart Dashboard / premium"), `_Summary Data` region, right-hand instance (paired with `HeartChartSummary` on the left)

### Purpose

Church-wide "WeDo" (couples relationship app) engagement snapshot — the counterpart card to `HeartChartSummary`, giving an admin an at-a-glance read on daily couple activity plus a qualitative pull-quote and entry points into results/sharing.

### Anatomy

Outer elevated shell (same nested outer-shadow-shell/inner-bordered-panel shape as `HeartChartSummary` — see Implementation rules) → WeDo heart-hands logo (top-left) → attribution text (top-right) → stat row: big stat number ("363 Couples") + supporting sentence ("Active in the app today") → `PointerCallout` (see below) containing a couple illustration + pull-quote → action row: two `Button` instances ("See Results", "Share Your Code").

### Variants

None — visual treatment is entirely data-driven (`coupleCount`, `quote`), not a caller-chosen variant, matching `HeartChartSummary`'s precedent of deriving display from props rather than a manual variant.

### States

| State | Behavior |
|---|---|
| Default | Static presentational read of caller-supplied numbers/quote — no loading/empty/error state of its own; caller owns that while fetching, same contract as `HeartChartSummary`. |
| Action buttons | `onSeeResults`/`onShareCode` are optional callbacks; each button renders regardless of whether a handler is passed, matching `HeartChartSummary`'s three-action-row precedent. |

### Properties / API

```ts
interface WeDoCardProps {
  coupleCount: number;
  quote: string;
  onSeeResults?: () => void;
  onShareCode?: () => void;
  className?: string;
}
```

### Design tokens used

Reuse `HeartChartSummary`'s existing token set rather than a parallel one — same surface family: `shadow-card`, `rounded-2xl`, `border`, `bg-muted/50`, `text-foreground`, `text-muted-foreground`. No new tokens confirmed as required.

### Accessibility requirements

- The couple illustration inside `PointerCallout` is decorative (`aria-hidden`); the quote itself must be real DOM text, not baked into an image, so it reaches assistive tech.
- Both action buttons render through `Button`, inheriting its focus-visible ring and keyboard behavior; each has a visible text label (no icon-only affordance observed), so no additional `aria-label` is required.

### Responsive behavior

Sits side-by-side with `HeartChartSummary` at desktop width (each roughly half the row). No mobile/tablet Figma reference was found for this frame — needs a documented single-column stacking behavior before shipping, same category of gap already tracked for `HeartChartSummary`.

### Implementation rules

- Compose on `ElevatedCard` rather than a third local copy of the nested-shell shape — `HeartChartSummary` predates `ElevatedCard` and was deliberately not retrofitted (see `ElevatedCard`'s Implementation rules), but `WeDoCard` is new code with no such precedent excusing a duplicate.
- Reuse `Button variant="outline" size="compact"` for both actions, matching `HeartChartSummary`'s action-row treatment exactly rather than inventing new button styling.
- **Implemented**: the WeDo wordmark renders as a hand-authored `lucide-react` `HeartHandshake` icon + "WeDo" text (`role="img"`, `aria-label="WeDo"`), not the real brand mark — same tier of approximation as `AmfmLogo`/`GoogleIcon`, since the real WeDo logo/couple illustration is unavailable in this environment (blocked Figma asset host). Replace with the real exported asset once available, per `AmfmLogo`'s established precedent.
- A connecting caption row ("HeartChart shows you where your people are" / "WeDo helps them get where they want to go") sits below both hero cards on the page — this is page-level connective copy, not part of `WeDoCard`'s or `HeartChartSummary`'s own anatomy; do not fold it into either component.

### Visual examples

Rendered live on `/dashboard` (hero row, alongside `HeartChartSummary`); tested at `src/components/we-do-card.test.tsx`. No dedicated `/design-system/components` entry yet — see this file's header note on scope.

---

## PointerCallout

**Status**: Draft (implemented; only the static variant — see Variants)
**Source**: `src/components/pointer-callout.tsx`
**Figma**: AMFM Portal file, node `3727:29573`, nested inside the `WeDoCard` instance (`_Summary Data` region)

### Purpose

A speech-bubble-style container with a visible directional pointer (tail), used to present a short quote or contextual note anchored to a specific piece of content. Confirmed use: the WeDo pull-quote inside `WeDoCard`.

### Anatomy

Rounded bordered container (subtle shadow) → directional pointer/tail graphic on one edge → content slot (optional leading illustration/icon + required text).

### Variants

None validated — only the static, always-visible variant (as used inside `WeDoCard`) was confirmed in this pass. Other elements on the dashboard ("Why does this matter?" on `ScaleChartCard`, "Understanding your data" on the Relationship Health card header) visually resemble a possible trigger for an interactive/on-demand version of this shape, but their interaction model was not confirmed — do not build a second interactive variant until that's verified directly against Figma; those two links are left undocumented pending that confirmation (see `ScaleChartCard`'s Implementation rules).

### States

None — the confirmed static variant has no interactive state.

### Properties / API

```ts
interface PointerCalloutProps {
  children: React.ReactNode;
  pointerPosition: "top" | "right" | "bottom" | "left";
  className?: string;
}
```

### Design tokens used

Not yet confirmed against a direct node pull — likely candidates are `border`, `shadow-sm`/`shadow-md`, `bg-background`/`bg-card`. Confirm exact values before implementation rather than assuming.

### Accessibility requirements

The pointer/tail graphic is decorative (`aria-hidden`); the contained text/illustration follow the same rule as everywhere else in this file — illustration `aria-hidden`, text real and readable.

### Responsive behavior

Not yet evidenced against a mobile Figma reference — flag for verification before shipping a fixed pixel-width bubble.

### Implementation rules

- Extract as its own primitive from the start rather than inlining it inside `WeDoCard` — its visual language (rounded box + pointer tail) is distinct enough from `WeDoCard`'s own anatomy to warrant separation even at a single confirmed use site, unlike e.g. `HeartChartSummary`'s donut chart (which stayed unextracted until a second use case appeared) — this is a judgment call flagged here for visibility, not a hard reuse-count justification.
- Do not add the speculative interactive/popover variant described under Variants above without first confirming the interaction model directly in Figma. If confirmed, it must follow the Radix `Popover`/`Tooltip` ARIA pattern per `DESIGN.md`'s standing rule against hand-rolled custom widgets (already enforced for `Select`/`DropdownMenu`/`Dialog`) — never a plain absolutely-positioned `div`.

### Visual examples

Rendered live on `/dashboard`, inside `WeDoCard`'s pull-quote; tested at `src/components/pointer-callout.test.tsx`.

---

## ParticipationVerticalBarCard

**Status**: Draft (implemented; rendered on `/dashboard`)
**Source**: `src/components/participation-vertical-bar-card.tsx`
**Figma**: AMFM Portal file, node `3727:29573`, "Bedford Campus Participation Profile" card, first column ("Age Groups")

### Purpose

Presents a single categorical distribution as a labeled vertical bar chart inside a bordered sub-panel — one of three peer widgets inside the "Participation Profile" card (confirmed instance: "Age Groups").

### Anatomy

Icon + label header (e.g. leading icon + "Age Groups") → vertical bar chart, one bar per category, with a percentage label above each bar and a category label below each bar.

### Variants

None evidenced — a single dataset shape (N categories, one percentage each); content varies, not visual treatment.

### States

| State | Behavior |
|---|---|
| Default | Data-driven read of caller-supplied `data`. |
| Empty/loading | Not evidenced in Figma — must be added per `CLAUDE.md`'s Feature Completion Requirements before this component is considered production-ready; do not ship without one. |

### Properties / API

```ts
interface ParticipationVerticalBarCardProps {
  title: string;
  icon: React.ReactNode;
  data: { label: string; value: number }[];
  className?: string;
}
```

### Design tokens used

Bar fill reads as a light brand/neutral tone in the reference screenshot — exact token not yet confirmed against a direct node pull. **Do not default to the generic `chart-1`…`chart-5` tokens** in `src/tokens/colors.css` — those are the unmodified shadcn/ui scaffold palette, not sourced from this Figma file's actual data-visualization colors (see the audit's DESIGN.md-inconsistencies finding). Confirm real values, or raise a `DESIGN.md` foundations update for a real data-viz palette, before implementing.

### Accessibility requirements

Chart is a visual read of numeric data already rendered as real on-bar percentage/category text labels (not baked into an image or canvas) — same "SVG is `aria-hidden`, text carries the meaning" pattern already established by `HeartChartSummary`'s donut chart.

### Responsive behavior

Renders as one of three siblings in a row at desktop width (with `ParticipationHorizontalBarCard` ×2). No mobile Figma reference confirmed — needs mobile-first stacking per `DESIGN.md`'s grid rules before shipping.

### Implementation rules

- Share a single underlying chart-rendering approach (SVG, not a raster image) with `FullWidthBarChart` if their visual language is confirmed to match — do not build two independent bar-chart implementations without checking first.
- Build the donut/bar-rendering logic as hand-built SVG (not a fetched/rasterized asset) so it can respond to arbitrary data, matching `HeartChartSummary`'s existing precedent.

### Visual examples

Rendered live on `/dashboard`'s "Bedford Campus Participation Profile" card (Age Groups column); tested at `src/components/participation-vertical-bar-card.test.tsx`.

---

## ParticipationHorizontalBarCard

**Status**: Draft (implemented; rendered on `/dashboard`)
**Source**: `src/components/participation-horizontal-bar-card.tsx`
**Figma**: AMFM Portal file, node `3727:29573`, "Bedford Campus Participation Profile" card, second and third columns ("Relationship Status", "Kids")

### Purpose

Presents a categorical distribution as a horizontal bar/list — confirmed reused twice unmodified on this single frame ("Relationship Status", 6 rows; "Kids", 4 rows), the second and third widgets in the "Participation Profile" card.

### Anatomy

Icon + label header → list of rows, each: category label (left) + horizontal bar proportional to value + percentage label (right).

### Variants

None evidenced beyond dataset content — confirmed reused twice with different data and row counts, same visual treatment both times.

### States

| State | Behavior |
|---|---|
| Default | Data-driven read of caller-supplied `data`. |
| Empty/loading | Not evidenced in Figma — must be added before shipping, same gap as `ParticipationVerticalBarCard`. |

### Properties / API

```ts
interface ParticipationHorizontalBarCardProps {
  title: string;
  icon: React.ReactNode;
  data: { label: string; value: number }[];
  className?: string;
}
```

### Design tokens used

Not yet confirmed against a direct node pull — same caveat as `ParticipationVerticalBarCard`: verify against a real data-viz palette rather than defaulting to the generic `chart-*` scaffold tokens.

### Accessibility requirements

Same pattern as `ParticipationVerticalBarCard` — bar is a visual read of already-rendered real text values, not the only signal.

### Responsive behavior

Same 3-column sibling constraint as `ParticipationVerticalBarCard` — needs mobile-first stacking, not yet evidenced against a mobile frame.

### Implementation rules

- Confirmed reused twice on a single frame already clears `CLAUDE.md`'s reusability bar for a shared `src/components` primitive immediately — do not colocate this route-specific (unlike e.g. `PricingCard`'s single-use-site precedent).

### Visual examples

Rendered live on `/dashboard`'s "Bedford Campus Participation Profile" card (Relationship Status and Kids columns); tested at `src/components/participation-horizontal-bar-card.test.tsx`.

---

## HorizontalTabs

**Status**: Draft (implemented; a real ARIA-controls/tabpanel linkage is not wired — see Implementation rules)
**Source**: `src/components/ui/tabs.tsx`
**Figma**: AMFM Portal file, node `3727:29573` — 4 confirmed instances: "Relationship Health for Bedford Campus" card header (2-tab: Couples/Singles), "Spiritual Snapshot for Bedford Campus" card header (3-tab: All/Couples/Singles), "Top 3 Caution Flags for Bedford Campus" card header (2-tab: Couples/Singles), "Top 3 Expressed Needs for Bedford Campus" card header (2-tab: Couples/Singles)

### Purpose

Segments a card's content by audience — confirmed used 4 times on this single frame, always inside a `Card`'s `CardHeader`/`CardAction` slot, matching `Card`'s already-documented "`CardAction` may contain more than one control" guidance.

### Anatomy

Pill-shaped segmented control — a track of tab buttons (2 or 3, confirmed both counts on this frame), one marked active (filled pill) at a time.

### Variants

None (`variant` prop) — tab count and labels are driven by the `tabs` prop, not a caller-chosen variant, matching `HeartChartSummary`'s precedent of deriving visual state from data rather than a manual variant. Confirmed configurations: 2-tab (Couples/Singles) and 3-tab (All/Couples/Singles).

### States

| State | Behavior |
|---|---|
| Inactive tab | Default unselected treatment. |
| Active tab | Filled pill, distinguished from inactive tabs. |
| Focus | Visible focus-visible ring, per `DESIGN.md`'s "focus states are not optional" rule. |
| Hover | Visible hover treatment, per `DESIGN.md`'s Interaction principles ("every interactive control has a visible hover/focus treatment"). |

### Properties / API

```ts
interface HorizontalTabsProps {
  tabs: { label: string; value: string }[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}
```

### Design tokens used

Not yet confirmed against a direct node pull — likely `bg-muted`/`bg-primary` (active) and `text-muted-foreground`/`text-primary-foreground`, by visual analogy with `HeartChartSummary`'s segmented scale bar (a different, non-interactive component — see Implementation rules). Confirm real values before implementation.

### Accessibility requirements

- **Must be built on Radix `Tabs`** (`Tabs.Root`/`Tabs.List`/`Tabs.Trigger`/`Tabs.Content`) — full ARIA tablist pattern (`role="tablist"`/`tab`/`tabpanel`, `aria-selected`, arrow-key navigation between tabs) — per `DESIGN.md`'s explicit rule against hand-rolling custom widgets, already enforced for `Select`/`DropdownMenu`/`Dialog`. Do not implement as a plain button group with manual `useState`.

### Responsive behavior

Not yet evidenced against a mobile Figma frame — a pill track this narrow may need to wrap or shrink at small viewports; flag for verification before shipping.

### Implementation rules

- Confirmed reused 4 times on a single frame clears the reusability bar for a shared primitive immediately (`src/components/ui`, alongside `Select`) — do not colocate route-specific.
- Visually similar to `HeartChartSummary`'s segmented participation-level bar, but semantically different (interactive tab switch vs. decorative data marker) — keep the two separate components; do not merge them, per `CLAUDE.md`'s "different semantics → don't force a shared generalization" precedent (same reasoning already applied to `PasswordRequirementItem` vs. `BenefitListItem`).
- Do not share an interactive primitive with `DashboardFilterMenu` even though both render as pill segmented controls — `DashboardFilterMenu`'s pills are single-select filters (`radiogroup` semantics), not tabs (`tablist` semantics); conflating the two ARIA patterns is a real accessibility defect, not just a styling nuance. Sharing visual tokens/CSS between the two is fine; sharing the interactive primitive itself is not.
- **Known accessibility tradeoff**: the flat `{tabs, value, onValueChange}` API has no content/panel slot, since each use on `/dashboard` switches data displayed elsewhere in the same card rather than swapping a distinct panel. Radix's `Tabs.Trigger` still provides full `tablist`/`tab` roles, `aria-selected`, and keyboard arrow/Home/End navigation without a mounted `Tabs.Content` — the one gap is that each trigger's `aria-controls` points at a `Tabs.Content` id that doesn't exist in the DOM, so the tab/panel relationship isn't fully wired for assistive tech. This is a deliberate, flagged tradeoff (matching `GlobalNav`'s own "known tradeoff" precedent for hover-driven expand), not an oversight — revisit if a real per-tab panel becomes necessary.

### Visual examples

Rendered live on `/dashboard` (4 instances: Relationship Health, Spiritual Snapshot, Caution Flags, Expressed Needs card headers); tested at `src/components/ui/tabs.test.tsx`.

---

## CommitmentConnectionChart

**Status**: Draft (implemented; zone label positions are evenly distributed, not pixel-verified per-zone — see Implementation rules)
**Source**: `src/components/commitment-connection-chart.tsx`
**Figma**: AMFM Portal file, node `3727:29573`, "Scattergram" instance inside the "Relationship Health for Bedford Campus" card (metadata tree ID `0:4918` — unreliable for direct re-query, re-confirm on canvas before implementation per the node-ID caveat above)

### Purpose

The centerpiece relationship-health chart — a quadrant scatter/bubble plot mapping individuals along two axes (Commitment × Connection), surfacing named relationship-health zones with a highlighted "center of mass" zone (confirmed sample: "Steady").

### Anatomy

Circular quadrant background with zone labels positioned around its boundary → scattered dot cloud (one dot per data point — confirmed via a hidden repeated `_Dot` child node in the Figma source, i.e. the cloud is built from a repeated component, not a rasterized background image) → a highlighted center circle labeling the dominant zone → two axis labels ("Commitment" vertical, "Connection" horizontal) with low/high directional indicators.

### Variants

None evidenced — one chart shape, entirely data-driven.

### States

| State | Behavior |
|---|---|
| Default | Renders the current filtered dataset (see `DashboardFilterMenu`, `HorizontalTabs`). |
| Empty | Not evidenced in Figma — needed once filters can produce a zero-result set; must be added before shipping. |

### Properties / API

```ts
interface CommitmentConnectionChartProps {
  dataPoints: { commitment: number; connection: number }[];
  highlightedZone: string;
  zoneLabels: Record<string, string>;
  className?: string;
}
```

### Design tokens used

Not yet confirmed against a direct node pull. Dot color reads consistent with a brand/terracotta tone (`primary`/`text-brand` family) and zone label text reads consistent with a muted gray (`text-muted-foreground`/`text-text-tertiary`) in the reference screenshot — confirm exact values before implementation.

### Accessibility requirements

- The chart SVG itself is `aria-hidden` — same pattern as `HeartChartSummary`'s donut.
- A scatter plot of many individual data points has no meaningful per-point text equivalent. The adjacent text panel (confirmed present in Figma: e.g. "Steady — 292 people (46%) are Comfortable but coasting") must fully carry the chart's headline finding in real text, matching `HeartChartSummary`'s "text carries the meaning" precedent. Whether a full data-table fallback is warranted for a chart this data-dense was not resolved in this pass — raise with product/design before shipping rather than deciding unilaterally.

### Responsive behavior

Fixed circular geometry — not yet evidenced to scale below its Figma-authored desktop width. Needs a real mobile Figma reference before a responsive behavior can be documented, same category of gap as `HeartChartSummary`.

### Implementation rules

- Hand-build as SVG (or equivalent), not a fetched/rasterized asset — Figma's own per-sample export is static, but this component must respond to arbitrary data, matching `HeartChartSummary`'s donut-chart precedent for the same reason.
- Exact zone label copy/spelling should be re-verified directly against the Figma text nodes before implementation — this entry's labels are read off a screenshot, not a direct text-node pull, per the node-ID caveat above.

### Visual examples

Rendered live on `/dashboard`'s "Relationship Health for Bedford Campus" card; tested at `src/components/commitment-connection-chart.test.tsx`.

---

## SnapshotVideoCard

**Status**: Draft (implemented as a static preview, per the `CourseCard`-style composition — see Implementation rules; product/design should still confirm this over a full `VideoPlayer`)
**Source**: `src/components/snapshot-video-card.tsx`
**Figma**: AMFM Portal file, node `3727:29573`, "Relationship Health for Bedford Campus" card, right column (paired with `CommitmentConnectionChart`)

### Purpose

Presents a short contextual video ("Quick Snapshot") explaining the currently-highlighted relationship-health zone, alongside a "Next Ministry Steps" call to action.

### Anatomy

Video thumbnail/player area (photo, play affordance) → "Quick Snapshot" caption/label → supporting description paragraph → `Button` ("Next Ministry Steps").

### Variants

None evidenced.

### States

| State | Behavior |
|---|---|
| Default | Static thumbnail, as observed in Figma. |
| Play/playing | Not evidenced in the current Figma reference (a static frame) — must be defined once wired to a real video source, per the composition choice below. |

### Properties / API

```ts
interface SnapshotVideoCardProps {
  title: string;
  description: string;
  onNextSteps?: () => void;
  className?: string;
}
```
Exact video/thumbnail props depend on the composition decision below — not finalized.

### Design tokens used

Not yet confirmed against a direct node pull.

### Accessibility requirements

Depends on the composition decision below: if built on `VideoPlayer`, inherits its existing native `<video>` control accessibility; if built on `CourseCard`'s static video-cover pattern, needs its own play-button `aria-label` and keyboard operability, since that pattern has no in-place scrubber.

### Responsive behavior

Sits beside `CommitmentConnectionChart` at desktop width — not yet evidenced against a mobile Figma reference; needs a documented stacking behavior before shipping.

### Implementation rules

- **No `VideoCard` component exists in this codebase** — despite this pattern's working name, there is no component by that name to reuse. The two existing candidates were `VideoPlayer` (`src/components/video-player.tsx`, a full native `<video>` element with working play/pause/seek/mute/fullscreen, currently wired with a placeholder `src`) and `CourseCard`'s internal video-cover treatment (a static thumbnail + play glyph + heading, no scrubber). **Implemented using the `CourseCard`-style static-preview pattern** (a self-contained `<button>` with a play-affordance overlay, not `VideoPlayer`'s `<video>` element), since the Figma reference shows a static photo + play affordance with no visible scrubber/controls. This is a reasonable default, not a final product decision — confirm with product/design before treating the interaction model as settled. The thumbnail photo itself renders a `nav-surface-from`→`nav-surface-to` gradient placeholder (same blocked-asset class as `TopHero`/`CourseCard`).

### Visual examples

Rendered live on `/dashboard`'s "Relationship Health for Bedford Campus" card, alongside `CommitmentConnectionChart`; tested at `src/components/snapshot-video-card.test.tsx`.

---

## DashboardFilterMenu

**Status**: Draft (implemented; rendered on `/dashboard`)
**Source**: `src/app/dashboard/_components/dashboard-filter-menu.tsx` (route-colocated per `CLAUDE.md`'s colocation rule, since no second dashboard-style route exists yet to justify promoting it to `src/components`; revisit once a second real use site appears, matching `PricingCard`'s precedent)
**Figma**: AMFM Portal file, node `3727:29573`, below the "Relationship Health for Bedford Campus" card's chart, above `FullWidthBarChart`

### Purpose

Lets an admin narrow `CommitmentConnectionChart` and `FullWidthBarChart` by demographic dimensions — confirmed 5 filter groups: Gender, Relationship Status, Years in Relationship, Kids, Age.

### Anatomy

"Showing N of N people" summary line → 5 filter groups, each: group label + a row of pill options (e.g. Gender: All / Male / Female), one pill active per group.

### Variants

None evidenced — 5 groups with varying option counts (confirmed range: 2–8 options), same shape.

### States

| State | Behavior |
|---|---|
| Inactive pill | Default unselected treatment. |
| Active/selected pill | One per group, filled/highlighted. |
| Hover | Visible hover treatment per `DESIGN.md`'s Interaction principles. |
| Focus | Visible focus-visible ring. |
| Disabled | Not evidenced in Figma — flag if a future "zero matching results" option needs one. |

### Properties / API

```ts
interface DashboardFilterMenuProps {
  groups: {
    label: string;
    options: { label: string; value: string }[];
    value: string;
  }[];
  onChange: (group: string, value: string) => void;
  resultCount: number;
  totalCount: number;
  className?: string;
}
```

### Design tokens used

Not yet confirmed against a direct node pull. Verify whether the active-pill fill is meant to share a token with `HorizontalTabs`' active-pill fill or is a deliberately distinct emphasis tier before implementation.

### Accessibility requirements

- **Each group is a single-select filter, not a tab** — implement as `role="radiogroup"` (or a native `<fieldset>`/grouped toggle buttons with `aria-pressed`), distinct from `HorizontalTabs`' `tablist`/`tab` pattern, even though the two look visually similar (pill segmented control). Filtering data is not the same interaction as switching a displayed panel — conflating the two ARIA patterns is a real accessibility defect.
- Each group's label must be programmatically associated with its option row (not just visually adjacent text).

### Responsive behavior

5 groups in a row will not fit a mobile viewport — not yet evidenced against a mobile Figma reference; needs a documented wrap/collapse behavior (e.g. horizontal scroll, or a disclosure pattern) before shipping.

### Implementation rules

- Do not build on top of `Select` (this is not a dropdown) or reuse `HorizontalTabs`' interactive primitive directly (different ARIA semantics — see that entry's Implementation rules) even though the pill visual language may be shareable at the styling/token layer.
- The "Bedford" campus selector in the page header (top of `/dashboard`) reuses the existing `Select` primitive directly (`SelectTrigger` with a call-site `w-36 py-2` className override, the same "override at the call site, no new variant" pattern already established by `Table`'s Profile-type column) — not a new component. It renders a single hardcoded `Bedford` item, matching `FellowshipOfTheParksLogo`'s "no multi-church data model yet" precedent; wire to real campus data once that model exists.

### Visual examples

Rendered live on `/dashboard`'s "Relationship Health for Bedford Campus" card, below the chart row; tested at `src/app/dashboard/_components/dashboard-filter-menu.test.tsx`.

---

## FullWidthBarChart

**Status**: Draft (implemented; rendered on `/dashboard`)
**Source**: `src/components/full-width-bar-chart.tsx`
**Figma**: AMFM Portal file, node `3727:29573`, bottom of the "Relationship Health for Bedford Campus" card, below `DashboardFilterMenu`

### Purpose

The detailed, full-width companion to `CommitmentConnectionChart` — breaks the same relationship-health zones into a ranked horizontal bar chart with percentage labels, filtered by the same `HorizontalTabs`/`DashboardFilterMenu` controls above it.

### Anatomy

Y-axis category labels (ranked zone list, confirmed order in the reference screenshot: Thriving, Strong, Steady, Hopeful, Reliable, Fickle, Tentative, Stuck, Detached, Shallow, Estranged, Frayed, Broken) → horizontal bars (one per zone) → inline percentage label at each bar's end.

### Variants

None evidenced.

### States

| State | Behavior |
|---|---|
| Default | Data-driven read of caller-supplied `data`. |
| Empty | Not evidenced in Figma — needed once the filter menu can produce a zero-result set; must be added before shipping. |

### Properties / API

```ts
interface FullWidthBarChartProps {
  data: { label: string; value: number }[];
  className?: string;
}
```

### Design tokens used

Bars read as a warmer/darker brand tone than `ParticipationVerticalBarCard`'s bars in the reference screenshot — not yet confirmed against a direct node pull. Same caveat as the other new chart components: verify against a real data-viz palette rather than the generic `chart-*` scaffold tokens (see the audit's DESIGN.md-inconsistencies finding).

### Accessibility requirements

Same "text label carries the meaning, chart is decorative" pattern as every other chart component in this section.

### Responsive behavior

Full-bleed width at desktop in the reference frame — not yet evidenced against a mobile Figma reference; labels may need to wrap or bars may need to shrink proportionally. Needs verification before shipping.

### Implementation rules

- Share an underlying horizontal-bar rendering primitive with `ParticipationHorizontalBarCard` if their visual treatment is confirmed close enough (same bar/label/track anatomy at different scale) — evaluate at implementation time rather than assuming two independent components are needed.
- The zone list here (13 entries) is more granular than `CommitmentConnectionChart`'s quadrant labels (fewer, coarser zone names) — confirm directly against Figma whether these represent the same taxonomy at two granularities or two genuinely different label sets before implementation; do not assume without checking.

### Visual examples

Rendered live on `/dashboard`'s "Relationship Health for Bedford Campus" card, below `DashboardFilterMenu`; tested at `src/components/full-width-bar-chart.test.tsx`.

---

## PieChartCard

**Status**: Draft (implemented; the surrounding tabs live on the parent `Card`, not this tile — see Anatomy)
**Source**: `src/components/pie-chart-card.tsx`
**Figma**: AMFM Portal file, node `3727:29573`, "Spiritual Snapshot for Bedford Campus" card — 2 confirmed instances ("9% of people are new to following Jesus", "31% of people occasionally feel connected to God")

### Purpose

Presents a proportional breakdown as a donut/pie chart with a bold headline finding in the center and a text legend below — confirmed reused twice in the "Spiritual Snapshot" card with different data and color families.

### Anatomy

Visually-hidden `title` heading (`sr-only`, no visible per-chart title in Figma — the visible "Spiritual Snapshot for Bedford Campus" title and its `HorizontalTabs` (confirmed 3-tab "All/Couples/Singles") belong to the *parent* `Card`'s header, per `Card`'s existing multi-control `CardAction` pattern — not to this tile) → donut chart (center: bold headline text) → legend list (color swatch + label + percentage per segment, confirmed 4 segments per instance).

### Variants

None evidenced — same shape, two confirmed instances differing only in data/color family (one uses a purple scale, the other a green scale, per the Figma variable export).

### States

| State | Behavior |
|---|---|
| Default | Data-driven read of caller-supplied `segments`. |
| Empty | Not evidenced in Figma — must be added before shipping. |

### Properties / API

```ts
interface PieChartCardProps {
  title: string;
  centerStat: string;
  segments: { label: string; value: number; color: string }[];
  className?: string;
}
```

### Design tokens used

**Confirmed gap, not yet resolved**: the two instances use distinct color families (Figma variable export confirms a purple scale — `utility-purple-700/500/300/100` — and a green scale — `utility-green-500/400/300/100`) that do not map to this project's existing generic `chart-1`…`chart-5` scaffold tokens in `src/tokens/colors.css`. Raise a `DESIGN.md` foundations update (convert these Figma hex values to `oklch()`, name real tokens) before implementing this component — do not invent inline colors ad hoc at the call site.

### Accessibility requirements

Same pattern as `HeartChartSummary`'s donut: chart SVG `aria-hidden`, center stat + legend rows are real text. The legend already pairs a color swatch with a text label + percentage in the Figma reference, so color is confirmed not to be the only signal — preserve this pairing in implementation.

### Responsive behavior

Two pie charts render side-by-side at desktop width in the reference frame — not yet evidenced against a mobile reference; needs a documented stacking behavior before shipping.

### Implementation rules

- Build the donut-rendering logic as a shared primitive with `HeartChartSummary`'s existing hand-built SVG donut if the ring/arc geometry is confirmed to match (the main difference is multi-segment vs. single-value-arc) — do not hand-roll a second, unrelated donut-drawing implementation without checking first.
- **Resolved**: segment colors are supplied as full CSS custom-property references (e.g. `"--color-chart-pie-purple-700"`, added to `src/tokens/colors.css`/`DESIGN.md` in this change), consumed via inline `style={{ stroke: \`var(${color})\` }}` rather than a dynamically-built Tailwind class string — Tailwind's static class scanner can't see a runtime-constructed utility class, but a direct `var()` reference to a real named token is not a hardcoded color and needs no scanner support.

### Visual examples

Rendered live on `/dashboard`'s "Spiritual Snapshot for Bedford Campus" card (2 instances: faith journey, connection to God); tested at `src/components/pie-chart-card.test.tsx`.

---

## ScaleChartCard

**Status**: Draft (implemented; "Why does this matter?" always renders — see Implementation rules)
**Source**: `src/components/scale-chart-card.tsx`
**Figma**: AMFM Portal file, node `3727:29573`, "Top 3 Caution Flags for Bedford Campus" and "Top 3 Expressed Needs for Bedford Campus" cards — 6 confirmed instances total (3 per card), Figma layer name "Scale chart/Default"

### Purpose

Presents a single metric as a headline percentage plus a short question/description and a horizontal 0–100% scale plotting the church's value against a "National Average" marker — confirmed reused 6 times across two `Card`s, each headed by a `HorizontalTabs` (Couples/Singles).

### Anatomy

Big percentage stat → description line (e.g. "Lack a strong support system?") → horizontal scale/slider track (0%–100%, a "National Average" tick, and the church's own value marker) → "Why does this matter?" link.

### Variants

Only one variant was confirmed in this pass: the Figma layer name is "Scale chart/**Default**", which suggests a component set with additional variants may exist in the source file, but no sibling variant was observed or confirmed on this frame. **Do not implement any variant beyond `Default`** until one is directly confirmed against the Figma component set — flagged here as an open question for a follow-up audit, not documented as a speculative second variant.

### States

| State | Behavior |
|---|---|
| Default | Data-driven read of caller-supplied `percentage`/`nationalAverage`/`question`. |
| Empty/loading | Not evidenced in Figma — must be added before shipping. |

### Properties / API

```ts
interface ScaleChartCardProps {
  percentage: number;
  question: string;
  nationalAverage: number;
  /** Optional — the "Why does this matter?" link always renders (matching Figma and HeartChartSummary's "action renders regardless of handler" precedent); this only wires its click behavior. */
  onWhyDoesThisMatter?: () => void;
  className?: string;
}
```

### Design tokens used

Scale track reads as a blue/teal tone in the reference screenshot, distinct from every other chart's color family confirmed on this page — not yet resolved against a real token; part of the same data-viz-palette gap flagged under `PieChartCard`. Raise the `DESIGN.md` foundations update before implementing rather than inventing an inline color.

### Accessibility requirements

The scale is a labeled range/gauge with two data points (this value, national average). The percentage is already confirmed rendered as real text in Figma; confirm the "national average" value is also real DOM text near the visual (not implied by tick position alone) before implementation.

### Responsive behavior

Renders 3-up in a grid at desktop width in the reference frame (matching `ParticipationVerticalBarCard`/`ParticipationHorizontalBarCard`'s 3-column pattern) — not yet evidenced against a mobile reference; needs documented stacking behavior before shipping.

### Implementation rules

- The "Why does this matter?" link may trigger `PointerCallout` as an interactive/on-demand variant — this was not confirmed in this pass (see `PointerCallout`'s Variants section). Confirm the actual interaction model directly against Figma before deciding whether this link opens a popover, navigates, or does something else; do not assume.
- Re-pull the "Scale chart" Figma component set directly (select the node on canvas, not via a page-level frame pull) before finalizing this component's variant list — this audit's tooling could not resolve that sub-component in isolation (see the node-ID caveat above), so the `Default`-only variant list here should be treated as the current confirmed floor, not a claim that no other variants exist.
- **"Why does this matter?" always renders**, regardless of whether `onWhyDoesThisMatter` is supplied — matching `HeartChartSummary`'s established precedent that a documented action renders even without a wired handler, rather than disappearing from the layout. `/dashboard`'s 6 instances currently pass no handler (no real destination content exists yet for this link).

### Visual examples

Rendered live on `/dashboard`'s "Top 3 Caution Flags" and "Top 3 Expressed Needs" cards (6 instances total); tested at `src/components/scale-chart-card.test.tsx`.
