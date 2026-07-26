# Full-Source Sweep Phase 1 Audit

Status: in progress
Run date: 2026-07-25
Requested by: Evan C. Navarro
Branch: `evan-design-system-full-source-sweep-20260725`
Baseline commit: `12ff0e440ab990747af17169166a70b09c16fce7` (`main`, after PR #59 merge)

## Scope

This run starts the full-source design-system sweep after the V1 changed-file governance checker was merged in PR #59. The goal is to harden the checker and classify historical design-system drift before changing components, patterns, pages, or the July 2026 MVP modal family.

This audit is repo-owned and intentionally does not rely on `.engine`.

Detailed inventory: [`inventory.md`](./inventory.md).
Finding classification: [`classification.md`](./classification.md).
Before/current scorecard: [`scorecard.md`](./scorecard.md).

## Phase 0 Verification

- PR #59 state: merged.
- Merge commit: `12ff0e440ab990747af17169166a70b09c16fce7`.
- Local `main` fast-forwarded to `origin/main`.
- Sweep branch created from merged `main`: `evan-design-system-full-source-sweep-20260725`.
- Initial branch state had no modal implementation work mixed in. This was later explicitly re-scoped by Evan to bundle the governance dogfood work with the five July 2026 MVP modal implementations so the checker could be tested against real Figma-to-code component work before PR handoff.

## Baseline Gates

- `npm run check:design-system`: passed.
  - Mode: changed.
  - Files checked: 0.
  - Source files scanned: 0.
  - Errors: 0.
- `npm test`: passed.
  - Test files: 32 passed.
  - Tests: 106 passed.
- `npm run lint`: passed.
- `npm run build`: passed.
  - Next.js build completed.
  - Static routes generated: 19.

## Red-First Work Completed

Added failing tests before implementation for:

- full-source runner mode that scans current production source without relying on changed files.
- report-only CLI mode that reports full-source findings without failing the process.
- punctuation normalization for extracted arbitrary class candidates.
- source-neutral component-map coverage wording.
- raw inline-style pixel values, raw CSS declarations, and raw color functions outside token files.
- false-positive protection for token CSS values, documentation data objects, arbitrary nonvisual class strings, and data-driven inline measurements.
- raw-value exceptions that remain exact, rule-scoped, and visible in checker reports.
- component-contract exclusions that remain exact, metadata-backed, and visible in checker reports.

After implementation, focused checker tests pass:

- `npm test -- scripts/design-system-check/lib/runner.test.mjs scripts/design-system-check/cli.integration.test.mjs`: passed, 11 tests.
- `npm test -- scripts/design-system-check/lib/classify.test.mjs scripts/design-system-check/lib/component-contracts.test.mjs scripts/design-system-check/lib/runner.test.mjs scripts/design-system-check/cli.integration.test.mjs`: passed, 25 tests.

Post-change gates:

- `npm run check:design-system`: passed.
  - Mode: changed.
  - Files checked: 23.
  - Source files scanned: 0.
  - Errors: 0.
- `npm run check:design-system:full`: completed in report-only mode.
  - Mode: full-source.
  - Files checked: 84.
  - Source files scanned: 84.
  - Errors reported: 120.
  - Allowed exceptions reported: 15.
- `npm test`: passed.
  - Test files: 32 passed.
  - Tests: 123 passed.
- `npm run lint`: passed.
- `npm run build`: passed.
- `git diff --check`: passed.

Phase 2 checker-focused pitstop:

- `npm test -- scripts/design-system-check`: passed.
  - Test files: 8 passed.
  - Tests: 51 passed.
- `npm test -- src/components/heartchart-modal-shell.test.tsx src/components/ui/button.test.tsx src/components/heartchart-summary.test.tsx src/components/course-card.test.tsx src/components/top-hero.test.tsx src/components/footer-cta.test.tsx`: passed.
  - Test files: 6 passed.
  - Tests: 28 passed.
- `npm run check:design-system`: passed after touched-source cleanup.
  - Mode: changed.
  - Files checked: 50.
  - Source files scanned: 17.
  - Errors: 0.
  - Allowed exceptions reported: 2.
- `npm test`: passed.
  - Test files: 32 passed.
  - Tests: 127 passed.
- `npm run lint`: passed.
- `git diff --check`: passed.
- Full-source summary after false-positive fixes, raw-value exception classification, route-orchestration contract exclusions, docs-backed component-map wiring, and touched-source token cleanup:
  - Files checked: 84.
  - Source files scanned: 84.
  - Errors reported: 57.
  - Allowed exceptions reported: 22.
  - Findings by rule: `no-undocumented-arbitrary-visual-values` 57.
  - Allowed exceptions by rule: `no-undocumented-arbitrary-visual-values` 2, `no-raw-hex-design-values` 15, `component-files-require-component-map-entry` 5.
- Touched-source token cleanup completed in this pitstop:
  - `focus-visible:ring-[3px]` → `focus-visible:ring-3`.
  - `Button` fixed Figma heights → `h-9.5`, `h-10.5`, `h-11.5`, `h-12.5`.
  - `Dialog` centering/mobile gutter → standard half-position utilities plus `max-w-dialog-mobile`.
  - `Checkbox` `rounded-[4px]` → `rounded-xs`.
  - `GlobalNav` repeated tracking/motion/spacing values → `tracking-label`, `transition-nav-*`, and spacing-scale utilities.
  - `HeartChartModalShell` modal widths, max-height clamps, grid rows, and 8px overlay blur → named modal tokens/utilities and `backdrop-blur-sm`.
  - `HeartChartLinkCard` QR/action layout values → `size-16.5`, shared `xs` breakpoint, and `grid-cols-balanced-actions`.
  - `HeartChartLinkModal` header/media split values → `h-55`, `w-69`, and `grid-cols-heartchart-link-header`.
  - `Input`, `InputGroup`, and `Select` control transitions → `transition-control`, verified to preserve Tailwind's default timing and duration.
  - `Select` and `DropdownMenu` default popover widths → `min-w-32`, and `Select`'s Radix viewport handoff → `min-w-(--radix-select-trigger-width)`.
  - `CardHeader` inherited shadcn grid layout → `grid-rows-card-header` and `has-data-[slot=card-action]:grid-cols-card-header-action`, verified to compile to the same `auto auto` rows and `1fr auto` optional action column.
- Unsupported checker scopes now fail with a concise CLI error instead of silently falling back or printing a stack trace.
- Raw-hex token provenance hints and Google brand SVG fills now use the same exception registry as arbitrary Tailwind values; each allowed exception reports its rationale instead of silently passing.
- Five inspected route-local orchestration files now use explicit component-contract exclusions instead of silent path-based bypasses. These files still remain in visual-value scanning.

Phase 5 primitive-cleanup pitstop:

- `npm test -- src/components/ui/card.test.tsx src/components/ui/input.test.tsx src/components/ui/input-group.test.tsx src/components/ui/select.test.tsx src/components/ui/dropdown-menu.test.tsx`: passed.
- Tailwind CSS probes confirmed:
  - `transition-control` compiles with the same transition property, timing, and duration as the previous `transition-[color,box-shadow]`.
  - `min-w-32` compiles to 8rem and `min-w-(--radix-select-trigger-width)` compiles to the Radix trigger-width variable.
  - `grid-rows-card-header` compiles to `auto auto`, and `has-data-[slot=card-action]:grid-cols-card-header-action` compiles to the optional `1fr auto` action column.
- `npm run check:design-system`: passed.
  - Mode: changed.
  - Files checked: 63.
  - Source files scanned: 24.
  - Errors: 0.
  - Allowed exceptions reported: 2.
- `npm run check:design-system:full`: completed in report-only mode.
  - Mode: full-source.
  - Files checked: 84.
  - Source files scanned: 84.
  - Errors reported: 57.
  - Allowed exceptions reported: 22.
- `npm test`: passed.
  - Test files: 37 passed.
  - Tests: 132 passed.
- `npm run lint`: passed.
- `npm run build`: passed.
- `git diff --check`: passed.

Phase 6 full-source cleanup pitstop:

- Red-first validation:
  - `npm run check:design-system:full` reported 6 remaining unresolved arbitrary-value errors: dashboard heading min-width, design-system layout max-width, shared Marriage Champions shell min-width, and three repeated 10px chart-label sites.
  - Focused tests were updated before implementation for `CommitmentConnectionChart`, `ParticipationVerticalBarCard`, `ScaleChartCard`, and `MarriageChampionsPageShell`; they failed on the expected missing token/scale-backed classes.
- Resolved source ownership:
  - 240px and 320px min-width values mapped to Tailwind scale utilities (`min-w-60`, `min-w-80`) instead of new tokens.
  - The repeated 90rem wide-page cap became `max-w-page-wide`, a shared page-width utility in `src/tokens/spacing.css` used by `/welcome` and `/design-system`.
  - Repeated 10px chart axis/category/range labels became `text-chart-label` in `src/tokens/typography.css`.
  - Existing source/docs that still referenced older bracketed values were updated to the named contracts.
- Validation:
  - `npm test -- src/components/commitment-connection-chart.test.tsx src/components/participation-vertical-bar-card.test.tsx src/components/scale-chart-card.test.tsx src/components/marriage-champions-page-shell.test.tsx`: passed, 4 files / 8 tests.
  - `npm run check:design-system`: passed.
    - Files checked: 93.
    - Source files scanned: 47.
    - Errors: 0.
    - Allowed exceptions reported: 13.
  - `npm run check:design-system:full`: passed.
    - Files checked: 85.
    - Source files scanned: 85.
    - Errors: 0.
    - Allowed exceptions reported: 22.

Code-reviewer pitstop after Phase 6:

- Findings fixed before moving forward:
  - Component-map coverage could previously pass by pointing a new component at an unrelated existing `COMPONENTS.md` anchor. Added a red test and enforced component-name-to-heading ownership.
  - A visual-value exception could previously suppress a second identical value in the same file. Added a red test and made exception entries single-use per scan.
  - Arbitrary-class scanning could previously treat obvious prose strings as Tailwind class lists. Added a red test and constrained extraction to likely class lists while preserving one-token arbitrary class constants.
  - Scoped re-review found the prose filter had become too strict for common bare Tailwind utilities and that arbitrary classes were still de-duped before exception matching. Added red tests and fixed both before moving forward.
- Focused reviewer-fix validation:
  - `npm test -- scripts/design-system-check/lib/classify.test.mjs scripts/design-system-check/lib/component-contracts.test.mjs scripts/design-system-check/lib/raw-values.test.mjs scripts/design-system-check/lib/arbitrary-values.test.mjs`: passed, 4 files / 37 tests.
  - `npm run check:design-system`: passed.
    - Files checked: 93.
    - Source files scanned: 47.
    - Errors: 0.
    - Allowed exceptions reported: 13.
  - `npm run check:design-system:full`: passed.
    - Files checked: 85.
    - Source files scanned: 85.
    - Errors: 0.
    - Allowed exceptions reported: 22.
- Final local gates after reviewer fixes:
  - `npm test -- scripts/design-system-check`: passed, 8 files / 56 tests.
  - `npm test`: passed, 39 files / 140 tests.
  - `npm run lint`: passed.
  - `npm run build`: passed, 19 static routes generated.
  - `git diff --check`: passed.
- Final scoped code-reviewer pass:
  - No blockers or actionable findings.
  - Verified bare Tailwind utility class lists still expose arbitrary values, duplicate arbitrary class occurrences are preserved before exception matching, and docs describe the single-use exception behavior accurately.
  - Residual risk: class extraction remains heuristic-based and may need future hardening for unusual custom-class strings next to arbitrary Tailwind classes.

July MVP modal visual pitstop:

- User visual review identified two finish-quality nits before PR handoff:
  - The Last 4 Weeks chart is a real inline SVG generated from data, not an image export or charting-library embed. Its first x-axis label now uses `text-anchor="start"` and its last label uses `text-anchor="end"` so edge labels align to the plot bounds.
  - Modal-embedded videos should not carry the standalone raised-video shadow because the modal shell already owns elevation. `VideoPlayer` now exposes `surface?: "raised" | "flat"` with `raised` as the default and `flat` used by `HeartChartQuickTipModal` and `HeartChartResourcesQuickStartModal`.
- Red-first/focused validation added:
  - July MVP modal test assertions for x-axis edge anchors and flat Quick Start video surface.
  - `VideoPlayer` unit assertion for the flat surface contract.
- Follow-up validation after the visual pitstop:
  - `npm test -- src/components/july-mvp-modal-family.test.tsx src/components/video-player.test.tsx`: passed, 2 files / 6 tests.
  - `npm run check:design-system -- --json`: passed, 0 unresolved errors.
  - `npm test`: passed, 41 files / 150 tests.
  - `npm run lint`: passed.
  - `npm run check:design-system:full -- --json`: passed in report-only mode, 0 unresolved errors and 22 documented exceptions.
  - `npm run build`: passed.
  - `npm run audit:visual -- --before-url http://127.0.0.1:3101 --after-url http://127.0.0.1:3102 --run-id 20260725-july-mvp-modals`: passed and regenerated the local review board.

## Full-Source Report Snapshot

Command:

```bash
npm run check:design-system:full
```

Current report-only snapshot:

- Files checked: 100.
- Source files scanned: 100.
- Errors reported: 0.
- Allowed exceptions reported: 22.

Findings by rule:

- None.

Allowed exceptions by rule:

- `no-undocumented-arbitrary-visual-values`: 2.
- `no-raw-hex-design-values`: 15.
- `component-files-require-component-map-entry`: 5.

Highest-count files from the current report:

- None — full-source report has 0 unresolved errors.

## July MVP Modal Implementation Snapshot

Implemented modal targets:

- `HeartChartLinkModal` for Modal / HeartChart link.
- `InviteUserModal` for Modal / invite user.
- `HeartChartQuickTipModal` for Modal / quick tip.
- `HeartChartLastFourWeeksModal` for Modal / last 4 weeks.
- `HeartChartResourcesQuickStartModal` for HeartChart Resources / Quick Start Guide modal.

Repo wiring completed:

- Component implementations live under `src/components/**`.
- Shared shell remains `HeartChartModalShell`.
- Demos are rendered from `src/app/design-system/_components/heartchart-modal-demos.tsx`.
- `/design-system/components` includes showcase entries for the modal family.
- `COMPONENTS.md`, `DESIGN.md`, and `figma/component-map.json` include the new component contracts and Figma references.
- Figma-derived visual assets are committed only where required for reusable UI (`public/heartchart-modal-video-poster.jpeg`, `public/relationship-health-scattergram.png`, and `public/relationship-health-snapshot-video.png`); generated audit screenshots remain ignored.

Dogfood validation completed after modal implementation:

- Red-first modal test failed on the Last 4 Weeks chart granularity, then passed after the chart data was aligned to the Figma path.
- Code-reviewer pitstop found enabled no-op carousel controls, shared `Select` value centering, and contradictory Last 4 Weeks x-axis labels. Added focused failing assertions, then fixed the carousel behavior, primitive alignment, and axis labels before continuing.
- `npm test -- src/components/july-mvp-modal-family.test.tsx`: passed.
- `npm test -- src/components/july-mvp-modal-family.test.tsx src/components/heartchart-modal-shell.test.tsx src/components/heartchart-link-modal.test.tsx src/components/heartchart-link-card.test.tsx src/components/video-player.test.tsx scripts/visual-audit/capture.test.mjs`: passed, 6 files / 26 tests.
- `npm run check:design-system -- --json`: passed with 0 unresolved errors.
- `npm run check:design-system:full -- --json`: passed in report-only mode with 0 unresolved errors and 22 documented exceptions.
- `npm test`: passed, 41 files / 149 tests.
- `npm run lint`: passed.
- `npm run build`: passed.
- `npm run audit:visual -- --before-url http://127.0.0.1:3101 --after-url http://127.0.0.1:3102 --run-id 20260725-july-mvp-modals`: passed.

Visual pitstop finding fixed before moving forward:

- The visual-audit runner originally produced blank modal crops for hash-scrolled `/design-system/components#...` targets. Root cause: the runner used viewport rect coordinates while CDP clipping needed page-coordinate rects for the scrolled page, and the clamp still assumed a zero-based viewport. Fixed in `scripts/visual-audit/capture.mjs` with tests and README guidance.

Settings / Church Profile Figma-to-code dogfood pitstop:

- Fresh Figma target implemented: `Modal/Settings/Church Profile`, node `3724:20992`.
- Durable dogfood record added: `design-system/audits/figma-to-code/20260725-settings-church-profile.md`.
- Reused existing primitives instead of generated markup: `Dialog`, `Button`, `Input`, `InputGroup`, `Select`, `Label`, `HelperText`, and `FellowshipOfTheParksLogo`.
- Created reusable settings contracts instead of route-local patches: `InputActionGroup`, `SettingsModalShell`, `SettingsSection`, `SettingsAssetUpload`, `SettingsCampusList`, and `ChurchProfileSettingsModal`.
- Fixed dogfood findings before moving on:
  - `/design-system/components` server/client boundary failure from passing client-only props through a Server Component.
  - missing narrow-screen settings navigation.
  - mobile navigation overlap/clipping.
  - ambiguous action accessible names.
  - first-input autofocus/text-selection risk.
  - visual-value exceptions that could pass without explicit `rule` metadata.
  - component-contract exclusions that accepted any non-empty category instead of the supported `route-orchestration` category.
- Latest focused validation after the Settings dogfood run:
  - `npm test -- src/components/july-mvp-modal-family.test.tsx src/components/settings-church-profile-modal.test.tsx src/components/ui/input-action-group.test.tsx src/components/heartchart-link-modal.test.tsx src/components/heartchart-modal-shell.test.tsx src/components/heartchart-link-card.test.tsx src/components/participation-trend-card.test.tsx src/components/tip-carousel.test.tsx src/components/info-note.test.tsx src/components/modal-text-section.test.tsx src/components/video-player.test.tsx scripts/design-system-check/lib/arbitrary-values.test.mjs scripts/design-system-check/lib/component-contracts.test.mjs scripts/design-system-check/lib/runner.test.mjs scripts/visual-audit/capture.test.mjs`: passed, 15 files / 69 tests.
  - `npm test`: passed, 47 files / 177 tests after structured Figma source metadata validation was added.
  - `npm run --silent check:design-system -- --json`: passed, 128 files checked, 64 source files scanned, 0 errors, 13 allowed exceptions.
  - `npm run --silent check:design-system:full -- --json`: passed, 100 source files scanned, 0 errors, 22 allowed exceptions.
  - `npm run lint -- src/components src/app/design-system/components/page.tsx src/app/design-system/components/_components/settings-demos.tsx src/app/design-system/_components/heartchart-modal-demos.tsx scripts/design-system-check scripts/visual-audit`: passed.
  - `npm run build`: passed.
  - `npm run audit:visual -- --manifest /tmp/amfm-settings-church-profile-visual-targets.json --before-url http://127.0.0.1:3102 --after-url http://127.0.0.1:3102 --run-id 20260725-settings-church-profile-figma-paste`: passed.

## Pitstop: Look Back

- Verified against real post-merge code, not memory.
- The changed-file checker passing on a clean branch does not prove full-source compliance.
- The first full-source run exposed a checker-quality issue: punctuation around class candidates produced a fake finding. That was fixed before continuing.
- The first full-source run exposed a reporting-quality issue: component-map coverage wording said "changed" even in full-source mode. That was fixed before continuing.
- Phase 2 raw-value hardening briefly produced false positives against documentation data and nonvisual arbitrary class strings; those false positives were fixed before continuing.
- The remaining five component-map findings were inspected file by file. They were route-level form/page assemblies, not reusable visual component contracts, so they were moved into explicit audited component-contract exclusions rather than added blindly to `figma/component-map.json`.
- Touching primitive/source files correctly pulled their historical arbitrary values into changed-mode enforcement. Those findings were resolved at the owning primitive/token boundary before moving on.
- The modal shell and existing HeartChart link card/modal body no longer have unresolved arbitrary values, which reduces risk for the five July 2026 MVP modals that will compose the same shell/card patterns later.
- The Settings / Church Profile dogfood run added reusable settings shell/body/action components without introducing new full-source exceptions.
- Full-source arbitrary-value enforcement now reports 0 unresolved errors across scanned source. The remaining reported items are allowed, exact, rationale-backed exceptions.

## Pitstop: Look Forward

- Next work must review the 22 allowed exceptions for freshness and decide whether any temporary exceptions should be converted to tokens/generated metadata.
- Checker false positives must still be fixed before using the report as cleanup authority; do not add broad exclusions.
- Component fixes should continue to be ordered by reusable ownership: token/root primitive first, then composites, then patterns/pages.
- The five July 2026 MVP modals and the Settings / Church Profile dogfood target are now implemented in this branch because Evan explicitly re-scoped the branch to bundle governance hardening with real Figma-to-code dogfooding. Further modal-family expansion should be treated as future scope unless explicitly added.
