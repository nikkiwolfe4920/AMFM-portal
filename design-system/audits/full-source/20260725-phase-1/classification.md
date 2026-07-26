# Phase 1 Finding Classification

Status: draft
Run date: 2026-07-25
Baseline commit: `12ff0e440ab990747af17169166a70b09c16fce7`

This classification is grounded in the full-source checker report, `COMPONENTS.md`, `DESIGN.md`, `figma/component-map.json`, and source inspection. It is not a component cleanup plan yet; it orders the work so later fixes happen at the right ownership layer.

## Checker Findings Fixed Before Cleanup

- Full-source report mode did not exist.
  - Fixed by adding `scope: "full-source"` and `npm run check:design-system:full`.
- Full-source component-map coverage messages used changed-file wording.
  - Fixed by changing the message to source-neutral wording.
- Arbitrary class extraction included punctuation around class candidates.
  - Fixed by normalizing token-boundary punctuation.
- Raw declaration scanning initially overreached into documentation data and nonvisual class strings.
  - Fixed by scanning CSS declarations in CSS files and inline `style={{ ... }}` blocks in TS/TSX files.
- Unsupported checker scopes silently fell through into changed-file logic.
  - Fixed by validating scopes and printing concise CLI errors.
- Raw-value exceptions could not be represented in the original arbitrary-class-only exception registry.
  - Fixed by allowing exceptions to target an exact checker `rule` plus either an exact `className` or exact raw `value`.
  - Fixed report output so allowed exceptions show their registered rationale instead of "No remediation message provided."
- Design-system route helper components were over-classified as product components requiring Figma/component-map contracts.
  - Fixed by excluding `src/app/design-system/**/_components/**` from component-map contract enforcement while keeping those files in arbitrary-value scanning.
- Route-local form/page assembly files were over-classified as reusable component contracts.
  - Fixed by adding an exact `design-system/audits/component-contract-exclusions.json` registry. The five inspected route orchestration files now remain visible as allowed exceptions and still participate in visual-value scanning.

## Classification Buckets

### 1. Component-Map And Docs Wiring Gaps

These should be addressed before source cleanup for the affected components, because touching them later would otherwise fail the changed-file gate.

- Resolved in this phase: dashboard/data-viz components documented in `COMPONENTS.md` now have `figma/component-map.json` entries:
  - `ParticipationVerticalBarCard`
  - `ParticipationHorizontalBarCard`
  - `HorizontalTabs`
  - `CommitmentConnectionChart`
  - `SnapshotVideoCard`
  - `DashboardFilterMenu`
  - `FullWidthBarChart`
  - `PieChartCard`
  - `ScaleChartCard`
- Resolved in this phase: existing primitives/composites documented in `COMPONENTS.md` now have `figma/component-map.json` entries:
  - `HelperText`
  - `Table`
  - `StatusTag`
  - `PasswordRequirementItem`
  - `SignupSuccess`
- Resolved classification: inspected route-local containers/forms are route orchestration and have exact component-contract exclusions:
  - `create-profile-form`
  - `dashboard-content`
  - `login-form`
  - `signup-card-content`
  - `signup-form`
  - These compose documented primitives/components and own local route state, option lists, validation, or page section assembly. They should not be blindly added to `figma/component-map.json`. Remove an exclusion and add normal `COMPONENTS.md` / component-map wiring if a file becomes reusable visual anatomy or receives a named Figma component/pattern.

Resolved classification: design-system demo helpers do not need component-map entries because they are audit/storybook scaffolding rather than Figma-delivered product components. They are still scanned for arbitrary visual values.

### 2. Root Primitive / Token Candidates

These repeat across unrelated consumers and should not be fixed at call sites.

- `focus-visible:ring-[3px]`
  - Resolved in source and docs as `focus-visible:ring-3` after confirming Tailwind 4.3.3 emits the same 3px ring utility.
- `Button` heights: `h-[38px]`, `h-[42px]`, `h-[46px]`, `h-[50px]`
  - Resolved in source and docs as spacing-scale utilities: `h-9.5`, `h-10.5`, `h-11.5`, `h-12.5`.
  - The `Button` size variant contract still owns these values; consumers should use `size`, not repeat heights.
- `Dialog` centering values: `left-[50%]`, `top-[50%]`, `translate-x-[-50%]`, `translate-y-[-50%]`, `max-w-[calc(100%-2rem)]`
  - Resolved in the primitive with standard half-position utilities and the shared `max-w-dialog-mobile` container token.
  - Modal-specific code should keep relying on the Dialog primitive instead of repeating shell centering.
- `Input`, `InputGroup`, and `Select` control transitions: `transition-[color,box-shadow]`
  - Resolved as `transition-control` in `src/tokens/motion.css`.
  - CSS probe confirmed parity with Tailwind's arbitrary transition output: the named utility preserves `transition-property: color, box-shadow` plus Tailwind's default timing and duration.
- `Select` and `DropdownMenu` popover minimum widths: `min-w-[8rem]`
  - Resolved as Tailwind's spacing-scale utility `min-w-32`, which compiles to the same 8rem value.
- `Select` viewport trigger-width handoff: `min-w-[var(--radix-select-trigger-width)]`
  - Resolved as Tailwind's custom-property shorthand `min-w-(--radix-select-trigger-width)` on `data-slot="select-viewport"`.
  - This keeps the Radix runtime CSS variable handoff without a bracketed arbitrary utility.
- `Card` layout arbitrary grids:
  - `grid-rows-[auto_auto]`
  - `has-data-[slot=card-action]:grid-cols-[1fr_auto]`
  - Resolved as `grid-rows-card-header` and `has-data-[slot=card-action]:grid-cols-card-header-action` after verifying the same grid shape is the official shadcn Card header anatomy.
  - CSS probe confirmed the named utilities compile to the same `grid-template-rows: auto auto` and optional `grid-template-columns: 1fr auto`.
- `backdrop-blur-[8px]`
  - Resolved wherever it represented an 8px backdrop blur by replacing it with Tailwind's built-in `backdrop-blur-sm`, which compiles to the same value.

### 3. Modal-Family Foundation Candidates

These directly affect the five July 2026 MVP modals and must be resolved before modal implementation continues.

- `HeartChartModalShell`
  - width variants: `sm:max-w-[544px]`, `sm:max-w-[640px]`, `sm:max-w-[768px]`, `sm:max-w-[800px]`
  - constrained-height values: `max-h-[calc(100vh-2rem)]`, `max-h-[calc(100vh-3rem)]`
  - shell row templates: `grid-rows-[auto_auto_minmax(0,1fr)_auto]`, `grid-rows-[auto_minmax(0,1fr)_auto]`
  - overlay blur: `backdrop-blur-[8px]`
  - Resolved in source and docs as `sm:max-w-modal-*`, `max-h-modal-shell`, `max-h-modal-frame`, `grid-rows-modal-with-divider`, `grid-rows-modal-no-divider`, and `backdrop-blur-sm`.
  - Do not hard-code these variants in individual modal bodies.
- `HeartChartLinkModal`
  - Figma media dimensions and grid layout: `h-[220px]`, `w-[276px]`, `md:grid-cols-[minmax(0,420px)_276px]`
  - Resolved in source and docs as spacing-scale utilities `h-55`, `w-69`, and `grid-cols-heartchart-link-header`.
  - Classification: the modal shell owns dialog chrome; this modal body owns its verified Figma header/media split.
- `HeartChartLinkCard`
  - responsive grid: `min-[360px]:grid-cols-[1fr_auto_1fr]`
  - QR image size: `size-[66px]`
  - Resolved in source and docs as the shared `xs` breakpoint, `grid-cols-balanced-actions`, and `size-16.5`.
  - Classification: reusable link-card anatomy belongs in `HeartChartLinkCard`, not the modal shell or page call sites.

### 4. Prose-Only Exceptions Resolved Into Tokens Or Utilities

These values were explained in prose before governance could enforce them. This phase moved them into named tokens/utilities or exact scale-backed utilities so the checker can enforce them.

- Photo/scrim values:
  - `backdrop-blur-[20px]`
  - `backdrop-blur-[8px]`
  - `bg-[radial-gradient(...)]`
  - `bg-[url('/login-background.jpg')]`
  - Resolved as `backdrop-blur-photo`, `backdrop-blur-sm`, `bg-photo-backdrop-radial-scrim`, and `bg-login-photo`.
- Blurred preview value:
  - `blur-[2px]`
  - Resolved as `blur-inert-preview`.
- Typography one-offs:
  - `tracking-[-1.44px]`
  - `leading-[2.5rem]`
  - `leading-[2.375rem]`
  - `tracking-[0.24px]`
  - `text-[5.5px]`
  - `leading-[7px]`
  - `tracking-[0.4px]`
  - Resolved as display-scale letter-spacing/leading ownership, `tracking-label`, `tracking-stat-value`, `text-amfm-logo-caption`, and `text-chart-label`.
- Asset/display one-offs:
  - `size-[186px]`
  - `size-[90px]`
  - `max-w-[564px]`
  - Resolved as `size-wedo-illustration`, `size-heartchart-donut`, and `max-w-heartchart-card`.

Classification outcome: each item landed in one of the allowed outcomes:

- promote to a documented token or reusable utility,
- register a full exception in `design-system/audits/exceptions.json`,
- replace with an existing token/utility only if visual parity is preserved.

### 5. Allowed Raw Hex Exceptions

- `src/app/design-system/foundations/page.tsx`
  - These are token provenance/demo hint strings, not product styling.
  - Classification: registered as temporary, exact, value-scoped `no-raw-hex-design-values` exceptions. Future cleanup should move token provenance to generated token metadata or DTCG rather than hand-authored component strings.
- `src/app/login/_components/google-icon.tsx`
  - These are Google brand SVG path colors.
  - Classification: registered as permanent, exact, value-scoped `no-raw-hex-design-values` exceptions. These should not be remapped to AMFM semantic tokens because they are third-party brand artwork.

## Recommended Cleanup Order

1. Review the 22 allowed exceptions for freshness and whether temporary exceptions should become tokens, generated metadata, or explicit follow-up work.
2. Keep checker false-positive handling exact and audited; do not add broad path-level bypasses.
3. Continue source work by reusable ownership if new findings appear: token/root primitive first, then composites, then patterns/pages.
4. Continue Figma-to-code dogfooding with the already implemented July MVP modal family and Settings / Church Profile target; treat additional modal-family expansion as future scope unless explicitly added.

## Do Now Versus Future State

Do now in this sweep branch:

- Checker hardening and false-positive cleanup.
- Repo-owned audit docs.
- Component-map/docs wiring classification and low-risk wiring fixes.
- Root primitive cleanup where it is mechanically and visually safe.

Depends on future state or separate PR:

- Broad visual refactors of dashboard/data-viz components.
- Figma MCP visual parity captures for every dashboard chart.
- Additional modal-family variants beyond the five July 2026 MVP targets and Settings / Church Profile dogfood target.
- DTCG token migration.
