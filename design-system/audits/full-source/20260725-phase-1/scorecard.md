# Full-Source Design-System Scorecard

Status: in progress
Run date: 2026-07-25
Baseline commit: `12ff0e440ab990747af17169166a70b09c16fce7` (`main`, after PR #59 merge)
Current branch: `evan-design-system-full-source-sweep-20260725`

This scorecard uses the current hardened checker against both the baseline tree and the current working tree. That makes the before/after numbers comparable even though the baseline commit did not yet include the hardened full-source checker.

Generated JSON reports are local-only under `design-system/audits/.generated/full-source-score/20260725/` and are ignored by git.

## Score Definitions

| Score | Definition |
| --- | --- |
| Gate compliance | Scanned files with no unresolved checker errors. Documented exceptions are allowed but reported. |
| Strict clean | Scanned files with no unresolved checker errors and no documented exceptions. |
| Documented variance | Exceptions that are exact, rule-scoped, rationale-backed, and visible in checker output. These reduce strict-clean score but do not fail the gate. |

Important caveat: these scores measure checker-enforced design-system governance. They do not prove every Figma screen is visually complete. The five July 2026 MVP modals are implemented in this branch and are tracked through separate modal tests plus the three-source visual board described below.

## Independent Review Notes

Reviewer agent: Hume
Review date: 2026-07-25
Scope: read-only audit of the generated JSON reports, scorecard framing, exception list, and a fresh full-source checker run.

Reviewer-confirmed:

- Baseline/current numbers match the generated JSON reports.
- Current full-source checker output is green: 0 unresolved errors and 22 allowed exceptions.
- The 100-vs-84 file count difference is explained by current-only July MVP modal files, Settings modal files, `InputActionGroup`, the settings demo wrapper, and `src/tokens/effects.css`.
- The scorecard correctly avoids claiming that checker compliance proves MVP modal completion.

Reviewer caveats to preserve in PR and future planning:

- "All scanned" means all current production source files in the checker scope under `src/`, not every repo file, test, script, doc, generated artifact, or visual Figma state.
- The checker proves mechanical governance rules: arbitrary visual values, raw design values, exact exceptions, component-map/doc wiring, and route-local exclusions.
- The checker does not prove full Figma visual parity, full accessibility coverage, or complete delivery of the five July 2026 MVP modals.
- Visual validation must stay separate from checker scoring: Figma reference, baseline code where a baseline implementation exists, and current code.

## July MVP Modal Addendum

Status: implemented and under visual review.

The five assigned July 2026 MVP modal targets now have component implementations, tests, docs/map wiring, and `/design-system` demos:

- Modal / HeartChart link: `HeartChartLinkModal`
- Modal / invite user: `InviteUserModal`
- Modal / quick tip: `HeartChartQuickTipModal`
- Modal / last 4 weeks: `HeartChartLastFourWeeksModal`
- HeartChart Resources Modals / Quick Start Guide: `HeartChartResourcesQuickStartModal`

Latest validation after the modal pass:

- `npm run check:design-system -- --json`: passed, 0 unresolved errors; changed-mode exceptions are documented.
- `npm run check:design-system:full -- --json`: passed in report-only mode, 0 unresolved errors and 22 documented exceptions.
- `npm test`: passed, 41 files / 150 tests.
- `npm run lint`: passed.
- `npm run build`: passed.
- `npm run audit:visual -- --before-url http://127.0.0.1:3101 --after-url http://127.0.0.1:3102 --run-id 20260725-july-mvp-modals`: passed.

Generated visual evidence is local/ignored at `design-system/audits/.generated/visual-comparisons/20260725-july-mvp-modals/review-board.html`. New modal targets that did not exist at baseline use `baselineUnavailableReason`; they compare Figma reference against current code and explicitly state that no baseline implementation existed at `12ff0e440ab990747af17169166a70b09c16fce7`.

Dogfood fixes made during visual validation:

- The visual runner now resolves clipped screenshots in page coordinates for hash-scrolled routes, preventing blank crops for fixed-position dialogs.
- Modal visual targets now wait for unique dialog text before capture, not just for `[role='dialog']`.
- `HeartChartLastFourWeeksModal` now uses the denser Figma-aligned trend path and the accessible chart label correctly names the March 23 through April 19 range.
- `HeartChartLastFourWeeksModal` keeps the trend chart as a data-driven inline SVG and aligns the first/last x-axis labels to the graph edges (`start`/`end`) while leaving interior labels centered.
- `VideoPlayer` now has a documented `surface` prop: `raised` remains the default for standalone/page videos, while July MVP modal videos use `surface="flat"` so the modal shell owns the elevation.
- Code-reviewer findings were fixed before continuing: the Last 4 Weeks carousel controls now update visible tips, the chart x-axis labels no longer contradict the date range, and the shared `Select` primitive left-aligns selected values instead of requiring modal-local overrides.

Visual-audit caveat: the review board is evidence for human comparison, not strict pixel-parity proof. Figma references are full-frame captures; live modal screenshots are clipped to the dialog frame.

## Settings / Church Profile Dogfood Addendum

Status: implemented and validated locally as a pasted-Figma dogfood run.

Figma target:

- `Modal/Settings/Church Profile`
- Node: `3724:20992`
- URL: `https://www.figma.com/design/tg3U3gNcIYMn9aY9JYrIZc/AMFM-Portal?node-id=3724-20992&m=dev`

The run proved the current implementation loop against a fresh Figma node after the modal-family work:

- Figma MCP extraction produced the settings modal frame and screenshot reference.
- Existing primitives were reused: `Dialog`, `Button`, `Input`, `InputGroup`, `Select`, `Label`, `HelperText`, and `FellowshipOfTheParksLogo`.
- New reusable settings components were added with contracts, map entries, tests, and demos: `InputActionGroup`, `SettingsModalShell`, `SettingsSection`, `SettingsAssetUpload`, `SettingsCampusList`, and `ChurchProfileSettingsModal`.
- Settings layout values were moved into named spacing utilities instead of Figma-exported arbitrary classes.
- The dogfood run found and fixed real process gaps before moving on: server/client demo boundary, missing mobile settings navigation, mobile nav overlap/clipping, ambiguous action accessible names, autofocus text-selection risk, exception entries without explicit rules, and too-loose component-contract exclusion categories.

Durable record:

- `design-system/audits/figma-to-code/20260725-settings-church-profile.md`

Visual evidence:

- `design-system/audits/.generated/visual-comparisons/20260725-settings-church-profile-figma-paste/review-board.html`

Residual caveat: this run does not prove full pixel parity for lower clipped settings content, a Figma-authored mobile variant, or dark mode.

## Before / After Summary

| Metric | Baseline | Current |
| --- | ---: | ---: |
| Scanned files | 84 | 100 |
| Unresolved checker errors | 164 | 0 |
| Documented exceptions | 0 | 22 |
| Gate compliance | 30/84 files (35.7%) | 100/100 files (100%) |
| Strict clean | 30/84 files (35.7%) | 91/100 files (91.0%) |

The 16-file scan-count difference is expected. These files exist only in current because they were introduced by the modal/settings implementation and token cleanup:

- `src/app/design-system/components/_components/settings-demos.tsx`
- `src/components/heartchart-last-four-weeks-modal.tsx`
- `src/components/heartchart-quick-tip-modal.tsx`
- `src/components/heartchart-resources-quick-start-modal.tsx`
- `src/components/info-note.tsx`
- `src/components/invite-user-modal.tsx`
- `src/components/modal-text-section.tsx`
- `src/components/participation-trend-card.tsx`
- `src/components/settings-asset-upload.tsx`
- `src/components/settings-campus-list.tsx`
- `src/components/settings-church-profile-modal.tsx`
- `src/components/settings-modal-shell.tsx`
- `src/components/settings-section.tsx`
- `src/components/tip-carousel.tsx`
- `src/components/ui/input-action-group.tsx`
- `src/tokens/effects.css`

## Surface Breakdown

| Surface | Baseline files | Baseline error files | Baseline errors | Current files | Current error files | Current exceptions |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| UI primitives | 13 | 12 | 27 | 14 | 0 | 0 |
| Shared components | 24 | 19 | 76 | 37 | 0 | 1 |
| Design-system app/docs views | 11 | 7 | 34 | 12 | 0 | 11 |
| Route-local components | 14 | 10 | 18 | 14 | 0 | 9 |
| App pages | 9 | 4 | 6 | 9 | 0 | 0 |
| Other source/token files | 13 | 2 | 3 | 14 | 0 | 1 |

## Current Documented Exceptions

Not all documented exceptions live on reusable components. Some are route orchestration files, some are design-system documentation/provenance strings, and one is third-party brand artwork.

| Surface / component | File | Rule | Value / name | Exception id | Classification |
| --- | --- | --- | --- | --- | --- |
| `DposystemStory` | `src/app/_components/dposystem-story.tsx` | `no-undocumented-arbitrary-visual-values` | `h-[min(70vh,560px)]` | `dposystem-story-viewport-clamped-height` | Temporary component-specific viewport clamp; not a reusable spacing token. |
| `GlobalNav` | `src/components/global-nav.tsx` | `no-undocumented-arbitrary-visual-values` | `border-[1.5px]` | `global-nav-online-indicator-border-width` | Temporary online-indicator stroke exception; rounding to 1px/2px changes the small indicator. |
| `Foundations` provenance | `src/app/design-system/foundations/page.tsx` | `no-raw-hex-design-values` | `#aa6140` | `foundations-primary-token-provenance` | Human-readable token provenance string; rendered swatch uses semantic utility. |
| `Foundations` provenance | `src/app/design-system/foundations/page.tsx` | `no-raw-hex-design-values` | `#717680` | `foundations-muted-foreground-token-provenance` | Human-readable token provenance string; rendered swatch uses semantic utility. |
| `Foundations` provenance | `src/app/design-system/foundations/page.tsx` | `no-raw-hex-design-values` | `#d5d7da` | `foundations-border-token-provenance` | Human-readable token provenance string; rendered swatch uses semantic utility. |
| `Foundations` provenance | `src/app/design-system/foundations/page.tsx` | `no-raw-hex-design-values` | `#e9eaeb` | `foundations-border-secondary-token-provenance` | Human-readable token provenance string; rendered swatch uses semantic utility. |
| `Foundations` provenance | `src/app/design-system/foundations/page.tsx` | `no-raw-hex-design-values` | `#414651` | `foundations-text-secondary-token-provenance` | Human-readable token provenance string; rendered swatch uses semantic utility. |
| `Foundations` provenance | `src/app/design-system/foundations/page.tsx` | `no-raw-hex-design-values` | `#535862` | `foundations-text-tertiary-token-provenance` | Human-readable token provenance string; rendered swatch uses semantic utility. |
| `Foundations` provenance | `src/app/design-system/foundations/page.tsx` | `no-raw-hex-design-values` | `#894e34` | `foundations-text-brand-token-provenance` | Human-readable token provenance string; rendered swatch uses semantic utility. |
| `Foundations` provenance | `src/app/design-system/foundations/page.tsx` | `no-raw-hex-design-values` | `#0a0d12` | `foundations-overlay-token-provenance` | Human-readable token provenance string; rendered swatch uses semantic utility. |
| `Foundations` provenance | `src/app/design-system/foundations/page.tsx` | `no-raw-hex-design-values` | `#e9c481` | `foundations-highlight-gold-token-provenance` | Human-readable token provenance string; rendered swatch uses semantic utility. |
| `Foundations` provenance | `src/app/design-system/foundations/page.tsx` | `no-raw-hex-design-values` | `#f5eee0` | `foundations-gradient-from-token-provenance` | Human-readable token provenance string; rendered swatch uses semantic utility. |
| `Foundations` provenance | `src/app/design-system/foundations/page.tsx` | `no-raw-hex-design-values` | `#fdf9f1` | `foundations-gradient-to-token-provenance` | Human-readable token provenance string; rendered swatch uses semantic utility. |
| `GoogleIcon` | `src/app/login/_components/google-icon.tsx` | `no-raw-hex-design-values` | `#4285F4` | `google-icon-blue-brand-fill` | Permanent third-party brand artwork color. |
| `GoogleIcon` | `src/app/login/_components/google-icon.tsx` | `no-raw-hex-design-values` | `#34A853` | `google-icon-green-brand-fill` | Permanent third-party brand artwork color. |
| `GoogleIcon` | `src/app/login/_components/google-icon.tsx` | `no-raw-hex-design-values` | `#FBBC05` | `google-icon-yellow-brand-fill` | Permanent third-party brand artwork color. |
| `GoogleIcon` | `src/app/login/_components/google-icon.tsx` | `no-raw-hex-design-values` | `#EA4335` | `google-icon-red-brand-fill` | Permanent third-party brand artwork color. |
| `CreateProfileForm` | `src/app/create-profile/_components/create-profile-form.tsx` | `component-files-require-component-map-entry` | `CreateProfileForm` | `create-profile-form-route-orchestration` | Route-local form orchestration over documented primitives and `PricingCard`; not a reusable Figma component contract. |
| `DashboardContent` | `src/app/dashboard/_components/dashboard-content.tsx` | `component-files-require-component-map-entry` | `DashboardContent` | `dashboard-content-route-orchestration` | Route-local dashboard state/composition over documented dashboard components; not a reusable Figma component contract. |
| `LoginForm` | `src/app/login/_components/login-form.tsx` | `component-files-require-component-map-entry` | `LoginForm` | `login-form-route-orchestration` | Route-local login form behavior over documented primitives; not a reusable Figma component contract. |
| `SignupCardContent` | `src/app/signup/_components/signup-card-content.tsx` | `component-files-require-component-map-entry` | `SignupCardContent` | `signup-card-content-route-orchestration` | Route-local signup content switch; not a reusable Figma component contract. |
| `SignupForm` | `src/app/signup/_components/signup-form.tsx` | `component-files-require-component-map-entry` | `SignupForm` | `signup-form-route-orchestration` | Route-local signup validation/submission over documented primitives and `PasswordRequirementItem`; not a reusable Figma component contract. |

## Top-To-Bottom Plan From Here

1. Scorecard and plan stabilization.
   - Keep this scorecard, `full-source-sweep-plan.md`, and the Figma-to-code dogfood record aligned with the actual checker reports.
   - Re-run the generated baseline/current reports when source count or checker behavior changes.
   - Do not claim visual parity, accessibility completeness, or product workflow completion from checker compliance alone.

2. Visual audit refresh.
   - Run the visual audit for the July MVP modal family and Settings / Church Profile target after any UI-affecting edit.
   - Keep generated screenshots under ignored `design-system/audits/.generated`.
   - Promote only durable findings, limitations, and review-board paths into repo-owned audit docs.

3. Component/pattern/page coverage review.
   - For every newly added reusable component, verify the four required links: implementation file, `COMPONENTS.md`, `figma/component-map.json`, and `/design-system` rendering.
   - Verify `DESIGN.md` is updated only when token/foundation contracts change.
   - For patterns/pages touched by the modal work, verify they compose documented components instead of re-creating local visuals.

4. Figma-to-code hardening loop.
   - Treat each pasted Figma node as a dogfood run through `IMPLEMENTATION.md`.
   - Record reuse/extend/create decisions, checker findings, visual evidence, and residual risks in `design-system/audits/figma-to-code/` when the run hardens the process.
   - Promote repeated run findings into checker tests, component variants, token utilities, or docs instead of leaving them as one-off notes.

5. Final PR readiness.
   - Run `npm run check:design-system`, `npm run check:design-system:full`, `npm test`, `npm run lint`, `npm run build`, visual audit, and a code-reviewer pass.
   - The PR body must include the scorecard numbers, documented exceptions, Figma-to-code dogfood evidence, visual-audit caveats, files touched, and remaining risks.
   - If a reviewer dislikes this governance direction, the branch must remain easy to revert because generated artifacts are ignored and shared changes are concentrated in source/docs/scripts.
