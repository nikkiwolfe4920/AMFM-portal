# Full-Source Design-System Sweep Plan

Status: in progress
Last revised: 2026-07-25
Requested by: Evan C. Navarro  
Scope: follow-up work after the V1 changed-file governance checker PR  

This plan is the shared, repo-owned path for hardening the design-system checker by adversarial A/B dogfooding, then using those findings to fix components, patterns, and pages without drifting from Figma.

The goal is not to make code "more compliant" by changing the design. The goal is to make code reproduce the Figma design through documented tokens, reusable components, documented component contracts, and repeatable validation.

## STOKE Audit

### Situation

- The repo has written governance in `DESIGN.md`, `COMPONENTS.md`, `IMPLEMENTATION.md`, `CLAUDE.md`, and `figma/component-map.json`.
- The V1 checker enforces changed-file rules for Tailwind arbitrary visual utilities, raw hex values, exception metadata, and component-map/docs wiring.
- The V1 checker intentionally does not claim full-source historical compliance.
- Existing source includes components, patterns, and pages that predate the checker and may not fully satisfy the written rules.

### Traps

- Treating checker green as "the design is correct." The checker only proves specific mechanical rules.
- Replacing Figma-specific values with nearby tokens that look cleaner but change the design.
- Promoting one-off Figma exports into arbitrary local code instead of extending the token/component system.
- Fixing the same issue at every component call site instead of locating the root primitive, token, or component contract that owns the invariant.
- Merging modal implementation, checker hardening, and full-source cleanup into one oversized PR.
- Depending on `.engine` for any shared audit artifact.

### Objectives

1. Harden the checker by trying to break it with adversarial red-first cases.
2. Run the checker and visual audit against existing source.
3. Fix true component-system drift at the lowest reusable layer.
4. Preserve Figma visual fidelity while moving code toward tokens and documented primitives.
5. Produce a clean foundation for the five July 2026 MVP modals:
   - Modal / HeartChart link
   - Modal / invite user
   - Modal / quick tip
   - Modal / last 4 weeks
   - HeartChart Resources Modals

### Knowledge Gaps To Verify

- Whether every current component has a complete `figma/component-map.json` implementation entry.
- Whether every component listed in `COMPONENTS.md` has matching code and a `/design-system` rendering.
- Whether existing arbitrary values are true debt, false positives, documented design-system exceptions, or missing tokens.
- Whether existing page/pattern demos visually match their Figma references before any refactor.
- Whether accessibility tooling exists in the repo today beyond documented manual standards and component tests.

### Execution Rule

Every phase has a pitstop. If a nit, flake, bad claim, false positive, or visual regression is found, it is fixed before moving forward unless it is explicitly classified as out-of-scope with a follow-up owner and reason.

### Current Pitstop Notes

- PR #59 is merged; this sweep branch is based on merge commit `12ff0e440ab990747af17169166a70b09c16fce7`.
- Full-source report mode and raw-value scanning are implemented and dogfooded.
- Docs-backed component-map entries were added for existing documented components that were missing implementation mappings.
- Route-local form/page assemblies were inspected file by file and moved into exact component-contract exclusions instead of broad path allowlisting or blind component-map entries.
- Current changed-mode checker is green after dogfooding source cleanup in touched files.
- Current full-source report is green in report-only mode: 0 unresolved errors, 22 allowed exceptions.
- Resolved source cleanup so far: focus ring arbitrary class, `Button` height classes, `Dialog` mobile gutter/centering, `Checkbox` 4px radius, selected `GlobalNav` spacing/motion classes, `HeartChartModalShell` width/height/grid/8px overlay-blur values, existing `HeartChartLinkCard` / `HeartChartLinkModal` sizing and layout values, form/menu primitive transition/min-width values (`Input`, `InputGroup`, `Select`, `DropdownMenu`), `CardHeader` layout grids, `PhotoBackdrop`, `BlurOverlay`, `VideoPlayer`, `HeartChartSummary`, `WeDoCard`, `CourseCard`, `TopHero`, dashboard chart labels, and shared page-width/shell layout values.
- Code-reviewer pitstop found checker hardening gaps and they were fixed before PR handoff: component-map docs anchors now must match component identity, visual-value exceptions are single-use per scan, arbitrary class extraction skips obvious prose strings without skipping class constants, common bare Tailwind utilities still allow class-list extraction, and duplicate arbitrary class occurrences are no longer hidden before exception matching.
- Phase 4 visual baseline harness is now repo-owned under `design-system/audits/visual-comparisons`; generated screenshots/review boards live under ignored `design-system/audits/.generated`.
- The visual harness compares three sources: Figma reference, baseline code from merge commit `12ff0e440ab990747af17169166a70b09c16fce7`, and current branch code.
- Pilot targets were expanded to the full July MVP modal set: `heartchart-link-modal`, `invite-user-modal`, `heartchart-quick-tip-modal`, `heartchart-last-four-weeks-modal`, and `heartchart-resources-quick-start-modal`, plus the existing `button-component` control target.
- Phase 4 pitstop finding: an initial button before/current pixel delta came from animated loading-spinner nondeterminism, not a component styling change. The harness now freezes animations, transitions, and caret rendering before capture.
- Phase 4 pitstop finding: modal captures for hash-scrolled `/design-system/components#...` targets initially produced blank crops. Root cause was CDP clip-coordinate handling: `getBoundingClientRect()` returned viewport coordinates while `Page.captureScreenshot` clipping required page coordinates for the scrolled page. The harness now adds the scroll offset and clamps against the visible page window; modal targets also wait for unique text before capture.
- Phase 4 limitation: the `button-component` Figma node currently points to a single primary button reference, not the full button state set.
- Phase 4 validation: `npm test -- scripts/visual-audit/capture.test.mjs` passes, and `npm run audit:visual -- --before-url http://127.0.0.1:3101 --after-url http://127.0.0.1:3102 --run-id 20260725-july-mvp-modals` completes with generated evidence under ignored `design-system/audits/.generated/visual-comparisons/20260725-july-mvp-modals/`.
- Five July MVP modal components are now implemented and dogfooded through the checker and visual harness. The Last 4 Weeks chart mismatch found during visual review was fixed before moving forward.
- Code-reviewer pitstop on the modal/visual bundle found three finish-quality defects and they were fixed before moving forward: Last 4 Weeks carousel controls now change visible tips instead of being no-op buttons, the shared `Select` primitive left-aligns selected values, and the chart x-axis labels no longer contradict the March 23 through April 19 range.
- Visual-audit evidence remains a human review board, not pixel-parity proof. Figma references are full-frame screenshots, while current modal captures are intentionally clipped to the dialog frame.
- Full-source score snapshot uses the current checker against both trees: baseline is merge commit `12ff0e440ab990747af17169166a70b09c16fce7`; current is this working tree. "Gate compliance" means scanned files with no unresolved checker errors. "Strict clean" also subtracts files with documented exceptions/variance.
- Baseline score: 84 scanned files, 164 unresolved errors, 0 documented exceptions; gate compliance 30/84 files (35.7%); strict clean 30/84 files (35.7%).
- Current score: 100 scanned files, 0 unresolved errors, 22 documented exceptions; gate compliance 100/100 files (100%); strict clean 91/100 files (91.0%).
- Current documented variance: 2 arbitrary visual exceptions, 15 raw-value provenance/brand exceptions, and 5 route-local component-contract exclusions. The new July MVP modal and Settings modal files add no new documented exceptions.
- Settings / Church Profile Figma-to-code dogfood record was added under `design-system/audits/figma-to-code/20260725-settings-church-profile.md`. The run fixed real gaps before moving forward: server/client demo boundary, missing mobile settings nav fallback, mobile nav overlap/clipping, ambiguous action accessible names, title autofocus, missing exception-rule enforcement, and loose component-contract exclusion categories.

## Phase 0: Branch And PR Gate

1. Verify the governance checker PR state from GitHub.
2. If the checker PR is unmerged, do not start source cleanup on the same branch unless the only change is documentation requested for that PR.
3. After merge, checkout fresh `main`, pull, and create a new branch for the full-source sweep.
4. Confirm `.engine` is ignored/local and not used by shared audit outputs.
5. Record the source baseline commit in the audit summary.

Pitstop:

- Look back: inspect `git status`, `git branch --show-current`, `git rev-list --left-right --count HEAD...origin/main`, and PR state.
- Verify: work is on the intended branch and not mixed with modal implementation.
- Fix: rebase or recreate the branch before any source edits if the branch base is wrong.
- Look forward: proceed only when the sweep branch is isolated.

## Phase 1: Source Inventory Before Rules Expansion

1. Run current gates: `npm run check:design-system`, `npm test`, `npm run lint`, `npm run build`.
2. Inventory components under `src/components/**`.
3. Inventory colocated app components under `src/app/**/_components/**`.
4. Inventory pages and design-system demo renderings under `src/app/design-system/**`.
5. Inventory component-map entries and `COMPONENTS.md` anchors.
6. Produce an audit table: component, code path, docs anchor, Figma node, design-system rendering, tests, known arbitrary values, known visual risks.

Red-first checks:

1. Add and run a report-only full-source command, `npm run check:design-system:full`, that proves the current changed-file checker does not equal full-source compliance.
2. Add failing fixtures for any file shapes in the inventory that the checker does not currently scan but should.

Pitstop:

- Look back: inspect real inventory output and gate results.
- Verify: every listed component is grounded in files, not memory.
- Fix: remove hallucinated components and add missed components before continuing.
- Look forward: split findings into checker gaps versus existing source debt.

## Phase 2: Adversarial Checker Hardening

1. Try to bypass arbitrary-value detection with Tailwind variants:
   - `hover:gap-[7px]`
   - `data-[state=open]:gap-[7px]`
   - `group-data-[state=open]:w-[13px]`
   - `has-[>svg]:grid-cols-[1fr_auto]`
2. Try to bypass detection through common class composition:
   - `cn(...)`
   - `clsx(...)`
   - `cva(...)`
   - template literals
   - arrays and conditional expressions
3. Try to bypass raw-value detection:
   - inline `style={{ gap: "7px" }}`
   - CSS declarations such as `gap: 7px`
   - `rgb(...)`, `hsl(...)`, `oklch(...)`, and `color-mix(...)`
   - SVG `fill`, `stroke`, `filter`, and `drop-shadow`
   - exact rule/value exceptions that should pass only when fully documented and visible in reports
4. Try to bypass component-contract checks:
   - missing component-map entry
   - wrong `COMPONENTS.md` anchor
   - wrong docs file
   - stale implementation path
   - colocated `_components` path

Implementation:

1. Add red tests first for each confirmed loophole.
2. Implement the smallest checker expansion that closes the loophole.
3. Keep checker modules DRY: detection/classification belongs in shared scanner utilities, not repeated rule logic.
4. Keep report output actionable: file, value, rule, and remediation.

Pitstop:

- Look back: run focused checker tests and inspect each new failure/passing reason.
- Verify: no rule fails valid tokenized code.
- Fix: false positives and report ambiguity before scanning real source.
- Look forward: decide which rules are ready for full-source report-only mode.

## Phase 3: Full-Source Report Mode

1. Add a report-only full-source mode if V1 changed-file mode is not enough for inventory.
2. Run full-source report against `src/`, token files, docs references, and component map.
3. Do not silently allowlist findings.
4. Classify each finding:
   - root token gap
   - primitive/component contract gap
   - pattern/page composition gap
   - Figma/source mismatch
   - legitimate documented exception
   - checker false positive
5. Store durable summaries in repo-owned audit docs only when the result is useful to future contributors.

Pitstop:

- Look back: inspect full-source report and classification table.
- Verify: every finding has an owner category and concrete next action.
- Fix: checker false positives before using the report to change components.
- Look forward: order fixes from foundation to component to pattern to page.

## Phase 4: Visual Baseline Before Component Fixes

1. Start the app on a single known port.
2. Capture current `/design-system/components`, `/design-system/patterns`, and `/design-system/pages` views.
3. For Figma-linked components, capture or retrieve the referenced Figma frame through MCP where available.
4. Build before/after review pages or screenshots for human visual review.
5. Record viewport sizes for desktop and narrow widths.

Red-first checks:

1. Add visual or DOM assertions for any known drift before fixing it.
2. For design-system demos, add tests that prove required states/variants render.

Pitstop:

- Look back: compare code screenshots to Figma references and current screenshots.
- Verify: visual differences are real and not screenshot scale/cropping artifacts.
- Fix: broken audit pages, bad screenshots, or missing demo states before editing components.
- Look forward: select the first root-level fix with the highest reuse impact.

## Phase 5: Foundation And Primitive Fixes

Current progress: checker-exposed primitive and foundation drift has been cleaned in source. `Button`, `Dialog`, `Checkbox`, selected `GlobalNav` primitives, `HeartChartModalShell`, `Input`, `InputGroup`, `Select`, `DropdownMenu`, `Card`, blur/photo utilities, and shared layout utilities no longer have unresolved full-source arbitrary-value findings. Visual/Figma fidelity review remains separate from checker compliance.

1. Fix tokens before call sites when the same value appears in multiple places.
2. Fix `Button`, `Dialog`, `Input`, `Select`, `Card`, and shared layout primitives before composite components.
3. Preserve Figma sizing and optical alignment; tokenization must not flatten valid design nuance.
4. Update `DESIGN.md` when token definitions change.
5. Update `COMPONENTS.md` when component anatomy, variants, states, or accessibility contracts change.
6. Update `/design-system` demos with every supported state.

Red-first checks:

1. Add or update primitive tests before changing primitive behavior.
2. Add tests for icon color, icon spacing, height, padding, focus, disabled, and loading states where relevant.

Pitstop:

- Look back: run targeted primitive tests, checker, and visual screenshots.
- Verify: primitive changes did not regress unrelated consumers.
- Fix: any spacing, color, accessibility, or visual mismatch before composite work.
- Look forward: re-rank composite fixes based on actual primitive results.

## Phase 6: Composite Component Fixes

Current progress: checker-exposed composite drift has been cleaned in source. Existing `HeartChartLinkCard`, `HeartChartLinkModal`, `HeartChartSummary`, media/resource components, and dashboard/data-viz label components no longer have unresolved full-source arbitrary-value findings. Visual/Figma fidelity review remains separate from checker compliance.

1. Fix composites one at a time, ordered by dependency and blast radius.
2. For each component, verify:
   - docs entry exists
   - map entry exists
   - Figma reference is current
   - tokens are consumed by semantic utilities
   - accessibility requirements are explicit
   - design-system demo renders all states
   - tests cover core behavior and contract
3. Prefer component props/variants over class-name overrides when the variation is repeatable.
4. Treat `className` as composition layout only unless the existing component contract explicitly permits styling overrides.

Red-first checks:

1. Add a failing test for the specific component drift before fixing it.
2. Add checker fixture coverage if the drift exposed a checker blind spot.

Pitstop:

- Look back: compare component before/after visually and inspect tests.
- Verify: the code now matches docs and Figma more closely, not just the checker.
- Fix: nits and polish before moving to the next component.
- Look forward: decide whether the same root issue exists in patterns/pages.

## Phase 7: Pattern And Page Fixes

1. Inspect patterns after their component dependencies are clean.
2. Inspect pages after their patterns/components are clean.
3. For each page, verify the component composition matches `/design-system/pages` notes and Figma references.
4. Do not hand-adjust page-specific visuals when a shared component owns the invariant.
5. Keep page content KISS and DRY.

Red-first checks:

1. Add page/pattern smoke tests for expected composition and labels.
2. Add accessibility checks only if tooling exists or is added as a scoped governance enhancement.

Pitstop:

- Look back: run checker, tests, and visual review on affected pages.
- Verify: no page was visually brutalized by token cleanup.
- Fix: real regressions before moving to modal work.
- Look forward: identify which modal foundations are now safe to reuse.

## Phase 8: Modal Family Readiness

1. Re-audit the five July 2026 MVP modal targets:
   - Modal / HeartChart link
   - Modal / invite user
   - Modal / quick tip
   - Modal / last 4 weeks
   - HeartChart Resources Modals
2. Use broader modal examples only to ensure the shell can support future shapes:
   - settings side-nav modal
   - single video modal
   - premium/upgrade modal
   - referral modal
   - WeDo share modal
   - long editorial modal
   - training/course modal
   - book/resource modal
   - speaker/profile modal
3. Define modal shell slots by stable anatomy, not by Figma slash-name:
   - overlay/scrim
   - outer shell
   - optional inner border/ring
   - header/title/eyebrow/subtitle/close
   - body content slot
   - media slot
   - info/callout slot
   - carousel/stepper slot
   - footer/action area
4. Keep code names role-based and scalable. Figma slash names stay in docs and references; React component names describe reusable anatomy and behavior.

Red-first checks:

1. Add modal-shell tests for title semantics, close behavior, focus management, footer action alignment, and responsive widths.
2. Add variant tests for two-button and three-button footers before implementing those variants.

Pitstop:

- Look back: inspect modal shell code, tests, docs, and Figma screenshots.
- Verify: shell supports the five MVP modals without page-specific hacks.
- Fix: shell or primitive gaps before implementing additional modal bodies.
- Look forward: sequence the five MVP modals by shared dependency reuse.

## Phase 9: Final Sweep PR Readiness

1. Run:
   - `npm run check:design-system`
   - full-source report mode, if added
   - `npm test`
   - `npm run lint`
   - `npm run build`
   - visual review through `/design-system`
2. Use a code-reviewer pass before finalizing.
3. Confirm no claims exceed what tests and screenshots prove.
4. Confirm all docs touched are consistent with actual code.
5. Confirm remaining modal work is explicitly separate if not included in this PR.

Pitstop:

- Look back: inspect git diff line by line, test output, checker output, and screenshots.
- Verify: every finding either fixed or explicitly classified.
- Fix: nits, flakes, wording drift, and false claims before commit.
- Look forward: prepare one tactical PR with full context, validation evidence, and remaining work.

## Do Now Versus Depends On Future State

Do now after the governance checker PR is merged:

- Create a separate full-source sweep branch.
- Add red-first checker loophole tests.
- Add report-only full-source inventory if needed.
- Classify findings before changing visuals.
- Fix checker false positives before component cleanup.

Depends on future state:

- Full DTCG token migration.
- Persistent committed screenshot archives.
- CI enforcement beyond local script usage.
- Broad accessibility automation if no current accessibility runner exists.
- Modal implementation PRs that depend on the audit-proven shell and primitives.
