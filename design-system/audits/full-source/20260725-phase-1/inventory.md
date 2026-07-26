# Phase 1 Inventory

Status: in progress
Run date: 2026-07-25
Baseline commit: `12ff0e440ab990747af17169166a70b09c16fce7`

## Inventory Counts

- `COMPONENTS.md` `##` headings: 64.
- `figma/component-map.json` entries: 63.
- Full-source checker production files scanned: 100.
- Full-source checker unresolved errors: 0.
- Full-source checker allowed exceptions: 22.

## Documentation Headings Without Component-Map Entries

These are grounded in `COMPONENTS.md` headings and `figma/component-map.json` entries. Only grouped docs headings should remain here.

- `Dashboard components (HeartChart Dashboard)`

Classification: `Dashboard components (HeartChart Dashboard)` is a grouping heading for the dashboard component section, not a standalone implementation contract.

## Component-Map Entries Without Figma Source

These entries have implementation and docs wiring but no `figmaComponent` value yet.

- `Label`
- `Card`
- `SignupSuccess`
- `GoogleIcon`
- `DposystemLearnMore`
- `DposystemStory`
- `DropdownMenu`

## Component-Contract Exclusions

These files were inspected and classified as route orchestration rather than reusable visual component contracts. They are registered in `design-system/audits/component-contract-exclusions.json`, remain visible as allowed exceptions, and are still scanned for visual-value drift.

- `src/app/create-profile/_components/create-profile-form.tsx`
- `src/app/dashboard/_components/dashboard-content.tsx`
- `src/app/login/_components/login-form.tsx`
- `src/app/signup/_components/signup-card-content.tsx`
- `src/app/signup/_components/signup-form.tsx`

## Design-System Internal Helpers Excluded From Component-Map Contracts

These files are repo documentation/demo scaffolding, not product components or Figma-delivered UI contracts. They remain in full-source arbitrary-value scanning, but no longer require `figma/component-map.json` entries.

- `src/app/design-system/_components/design-system-nav.tsx`
- `src/app/design-system/_components/showcase.tsx`
- `src/app/design-system/_components/heartchart-modal-demos.tsx`
- `src/app/design-system/components/_components/settings-demos.tsx`

## Highest Arbitrary-Value Finding Counts

Current full-source report has no unresolved arbitrary-value findings. Earlier high-count files were resolved by moving values to the correct owner: root primitives, shared tokens/utilities, then composites/pages.

## Allowed Arbitrary-Value Exception Files

- `src/app/_components/dposystem-story.tsx`: `h-[min(70vh,560px)]` is registered as a temporary viewport-clamp exception.
- `src/components/global-nav.tsx`: `border-[1.5px]` is registered as a temporary online-indicator border exception.

## Allowed Raw Hex Exception Files

- `src/app/design-system/foundations/page.tsx`: token provenance/demo hints include 11 raw hex values in source strings. These are registered as temporary `no-raw-hex-design-values` exceptions until token provenance is generated from token metadata or a future DTCG source.
- `src/app/login/_components/google-icon.tsx`: brand SVG paths include 4 raw Google brand values. These are registered as permanent `no-raw-hex-design-values` exceptions because they are third-party logo artwork, not AMFM product styling.

## Allowed Component-Contract Exclusion Files

- `src/app/create-profile/_components/create-profile-form.tsx`: route-local form state/options/submission over documented primitives and `PricingCard`.
- `src/app/dashboard/_components/dashboard-content.tsx`: page-level dashboard state and composition over documented dashboard cards, charts, filters, tabs, and primitives.
- `src/app/login/_components/login-form.tsx`: route-local login form state/submission over documented primitives.
- `src/app/signup/_components/signup-card-content.tsx`: route-local signup content switch over documented logo, button, form, and success pieces.
- `src/app/signup/_components/signup-form.tsx`: route-local signup form state/password validation over documented primitives and `PasswordRequirementItem`.

## Immediate Classification Notes

- Button, Dialog, Checkbox, selected GlobalNav values, HeartChartModalShell, HeartChartLinkCard, HeartChartLinkModal, Input, InputGroup, InputActionGroup, Select, DropdownMenu, Card, PhotoBackdrop, BlurOverlay, VideoPlayer, HeartChartSummary, WeDoCard, CourseCard, TopHero, dashboard chart labels, settings modal layout utilities, and shared page-width/shell layout values have been cleaned in source and now pass full-source enforcement.
- No `src/components/ui/*` primitive remains in the unresolved full-source report.
- `npm run check:design-system:full` currently reports 0 unresolved errors; the 22 reported items are allowed, rationale-backed exceptions.
- `HeartChartLinkModal` and `HeartChartLinkCard` remain relevant to the five July 2026 MVP modals, but their current arbitrary layout findings have been resolved after shared shell/body ownership was confirmed.
- The previous component-map findings are now explicit route-orchestration exclusions. If any of those files gain reuse, a Figma component/pattern, or standalone visual anatomy, remove the exclusion and add proper `COMPONENTS.md` / `figma/component-map.json` wiring.
- Design-system route helper components are now explicitly excluded from component-map contract enforcement while still being scanned for arbitrary values.
- Settings / Church Profile dogfood work added new reusable settings components, docs/map entries, design-system demos, and visual-audit targets without adding new full-source exceptions.
