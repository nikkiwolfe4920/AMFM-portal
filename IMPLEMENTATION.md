# AMFM Portal — IMPLEMENTATION.md

AI coding rules for turning a Figma design or product requirement into shipped code in this repository. This file is the operational loop; it doesn't restate design foundations (`DESIGN.md`) or component contracts (`COMPONENTS.md`) — it tells an AI agent in what order to consult them and what's non-negotiable while implementing.

```
Figma Design Standards → DESIGN.md → COMPONENTS.md → React Components → /design-system Visual Validation
```

## The implementation loop

The loop is module-based so implementation requirements can be added, removed, or reordered without rewriting the whole process. Run every applicable module in the order below. A module belongs here only when it is required for current work and has a complete contract. Keep future ideas, draft spikes, and unapproved requirements out of this file until they are ready to govern implementation.

### Module Contract Template

Every implementation module must define:

- **Trigger**: when the module applies.
- **Inputs**: files, Figma nodes, commands, or user-provided context it consumes.
- **Decision rule**: how to choose reuse, extension, new implementation, exception, or no-op.
- **Required outputs**: code, docs, mappings, tests, visual evidence, or audit notes it must produce.
- **Automation**: command, script, or manual verification path. If no automation exists, state that honestly.
- **Failure behavior**: what blocks completion and what can proceed as a documented follow-up.
- **Source of truth**: docs or files that define the rule.

Do not add a new mandatory implementation requirement as prose only. If it matters enough to govern work, it needs a module contract and a place in the ordered registry.

Do not add stub modules. A module with no real trigger, no source of truth, no failure behavior, or no honest verification path is not an implementation rule yet.

Every module must have a build path and a check path. The build path tells an agent how to implement the requirement. The check path tells the repo how to prove the requirement was followed now and how to detect drift later.

### Ordered Module Registry

1. **Project Grounding**
   - **Trigger**: every UI implementation, Figma-to-code task, component change, or design-system cleanup.
   - **Inputs**: `CLAUDE.md`, `IMPLEMENTATION.md`, `DESIGN.md`, `COMPONENTS.md`, `figma/component-map.json`, `design-system/audits/README.md`, current Git branch/status.
   - **Decision rule**: preserve the existing architecture, token model, component contracts, and branch/PR discipline unless the task explicitly requires changing them.
   - **Required outputs**: a grounded understanding of relevant tokens/components/patterns before editing.
   - **Automation**: no single command proves this; agents must inspect the real files before implementation.
   - **Failure behavior**: if these files conflict, stop and resolve the conflict before coding.
   - **Source of truth**: this file, `CLAUDE.md`, `DESIGN.md`, `COMPONENTS.md`.

2. **Figma Source Extraction**
   - **Trigger**: any task with a Figma URL, node ID, or "implement this design from Figma" instruction.
   - **Inputs**: Figma `fileKey`, node ID, Figma MCP `get_design_context`, screenshot, metadata, and any existing `figma/component-map.json` entry.
   - **Decision rule**: treat Figma MCP output as reference material, not final repo code. Adapt it through this project's tokens, components, and accessibility rules.
   - **Required outputs**: recorded Figma file/node reference, screenshot or visual reference when available, and a list of apparent existing components/tokens/patterns in the design.
   - **Automation**: Figma MCP provides extraction; it does not enforce repo compliance by itself.
   - **Failure behavior**: if the node cannot be read, do not invent visuals; request a valid node or use explicitly provided screenshots with the limitation documented.
   - **Source of truth**: Figma MCP output, `figma/component-map.json`, `figma/figma-links.md`.

3. **Reuse / Extend / Create Decision**
   - **Trigger**: before adding or modifying any reusable UI.
   - **Inputs**: `COMPONENTS.md`, `figma/component-map.json`, `src/components/ui/**`, `src/components/**`, relevant route `_components`, and code search results.
   - **Decision rule**: reuse existing components first; extend a variant/prop when the existing component owns the invariant; create a new component only for a repeatable pattern with a clear contract.
   - **Required outputs**: an explicit decision of `reuse`, `extend`, `create`, `route-local orchestration`, or `documented exception`.
   - **Automation**: `npm run check:design-system` verifies component-map/docs wiring for changed component files, but architecture judgment is still manual.
   - **Failure behavior**: duplicate components, local forks of shared primitives, or undocumented reusable patterns block completion.
   - **Source of truth**: `CLAUDE.md` Component Creation Process, `COMPONENTS.md`, `figma/component-map.json`.

4. **Token And Styling Compliance**
   - **Trigger**: every visual code change.
   - **Inputs**: `DESIGN.md`, `src/tokens/*.css`, Tailwind default scale, changed source files, `design-system/audits/exceptions.json`.
   - **Decision rule**: use existing semantic tokens/utilities first; add or extend tokens intentionally when the value is reusable; accept an arbitrary value only through the documented exception clause.
   - **Required outputs**: tokenized code, token docs when token foundations change, or a complete machine-readable exception.
   - **Automation**: `npm run check:design-system` and `npm run check:design-system:full`.
   - **Failure behavior**: undocumented arbitrary visual values or raw design values block completion.
   - **Source of truth**: `DESIGN.md`, `src/tokens/*.css`, `design-system/audits/README.md`, `design-system/audits/exceptions.json`.

5. **Implementation And Red-First Tests**
   - **Trigger**: every behavior, component API, state, or regression-risk change.
   - **Inputs**: target component contract, existing tests, Figma state references, expected accessibility behavior.
   - **Decision rule**: add focused failing coverage before implementation when the next behavior can be tested without excessive harness cost; otherwise document why visual/manual verification is the primary gate.
   - **Required outputs**: implementation, component tests, route/pattern tests where appropriate, and no skipped required states.
   - **Automation**: `npm test`; focused test commands while iterating.
   - **Failure behavior**: failing tests or missing coverage for new behavior block completion.
   - **Source of truth**: `CLAUDE.md` Testing Standards, relevant `COMPONENTS.md` entry.

6. **Documentation And Design-System Sync**
   - **Trigger**: any new/changed component, token, pattern, state, prop, Figma mapping, or implementation rule.
   - **Inputs**: changed code, `COMPONENTS.md`, `DESIGN.md`, `figma/component-map.json`, `design-system/components/README.md`, `/design-system` routes.
   - **Decision rule**: docs, code, mappings, and rendered demos must evolve in the same change. Do not leave a component as "implemented but undocumented."
   - **Required outputs**: updated component contract, token/foundation docs if applicable, component-map entry, structured Figma source metadata when a Figma source exists, design-system rendering, and index/readme entry when the component is part of the library.
   - **Automation**: `npm run check:design-system` validates part of this; rendered `/design-system` review remains visual/manual.
   - **Failure behavior**: missing docs/mapping/showcase for reusable components blocks completion.
   - **Source of truth**: `COMPONENTS.md`, `DESIGN.md`, `figma/component-map.json`, `design-system/components/README.md`.

7. **Visual Validation**
   - **Trigger**: every UI implementation or visual refactor.
   - **Inputs**: Figma reference screenshots, baseline code when available, current implementation, `design-system/audits/visual-comparisons/targets.json`.
   - **Decision rule**: compare Figma, baseline code, and current code where possible. A clean checker result is not visual proof.
   - **Required outputs**: `/design-system` rendering and, for meaningful visual changes, a visual-audit review board or explicitly documented reason it was not possible.
   - **Automation**: `npm run audit:visual` produces review boards; human review remains required for visual parity.
   - **Failure behavior**: visible regressions, overlay artifacts, clipped content, or responsive overlap must be fixed before completion.
   - **Source of truth**: `design-system/audits/README.md`, visual comparison targets, Figma references.

8. **Final Gates And Handoff**
   - **Trigger**: before calling implementation complete or preparing a PR.
   - **Inputs**: full diff, tests, checker output, build output, visual audit evidence, reviewer findings.
   - **Decision rule**: completion requires both mechanical gates and honest disclosure of remaining manual/visual risks.
   - **Required outputs**: passing gates, concise implementation summary, files changed, reused/extended/created component list, documented exceptions, remaining risks.
   - **Automation**: `npm run lint`, `npm test`, `npm run check:design-system`, `npm run build`, `git diff --check`; use `npm run check:design-system:full` for audit/sweep work.
   - **Failure behavior**: failing gates block completion unless the user explicitly pauses before completion and the failure is reported as active.
   - **Source of truth**: this file, `CLAUDE.md`, `design-system/audits/README.md`.

### Build / Check Matrix

Implementation is not complete because code was written. Each module must be paired with the strongest available check:

| Module | Build evidence | Check evidence |
| --- | --- | --- |
| Project Grounding | Relevant governance files inspected before editing. | Final notes identify source docs used; conflicts are resolved before coding. |
| Figma Source Extraction | Figma file/node reference, screenshot, and extracted component/token observations. | Visual validation compares Figma reference to current implementation where possible. |
| Reuse / Extend / Create Decision | Existing components searched before new code; decision recorded as reuse, extend, create, route-local orchestration, or documented exception. | `npm run check:design-system` checks component-map/docs wiring; code review verifies architectural judgment. |
| Token And Styling Compliance | Code uses tokens, Tailwind defaults, or registered exceptions. | `npm run check:design-system` and `npm run check:design-system:full` catch unresolved arbitrary/raw visual values and report allowed exceptions. |
| Implementation And Red-First Tests | Focused tests or explicit manual-verification reason added before/with behavior. | `npm test` plus focused test runs prove behavior and regression cases. |
| Documentation And Design-System Sync | `DESIGN.md`, `COMPONENTS.md`, `figma/component-map.json`, and `/design-system` demos updated with the implementation. | `npm run check:design-system` validates component-map wiring and structured Figma source metadata; browser review verifies the demos render. |
| Visual Validation | `/design-system` renders the implemented component/pattern/page. | `npm run audit:visual` produces Figma/baseline/current review evidence for meaningful visual changes. |
| Final Gates And Handoff | Summary, files changed, reused/extended/created components, exceptions, and risks are documented. | `npm run lint`, `npm test`, `npm run check:design-system`, `npm run build`, `git diff --check`, visual evidence, and reviewer pass. |

If a module's check path is manual, say so. Do not imply machine enforcement exists until a command, test, or script actually proves it.

For Figma-to-code UI work, the visual validation artifact is also the implementation dossier. The generated review board must show the Figma source, node, route, current result, related files, component-map matches, observed tokens/utilities, and current code previews read from the worktree. This is the designer-facing "what did the AI build from my Figma link?" page. Do not replace it with a hand-written summary that can go stale.

### Adding Or Changing Modules

When a new implementation requirement is needed, edit the Ordered Module Registry directly. The change must include the full module contract, the reason the module is now required, and any affected final gates. If supporting research is needed, add it under `docs/research/` first and cite it from the module's Source of truth.

Do not keep placeholder modules in this file. Git history and PR discussion are the archive for old drafts; `IMPLEMENTATION.md` is the current operating contract.

Changing `IMPLEMENTATION.md` can invalidate older accepted code. Any change to the Ordered Module Registry must include a conformance-impact check:

1. Identify which source files, component contracts, tokens, docs, tests, and audit commands the module affects.
2. Run the strongest available current check against changed files.
3. Run `npm run check:design-system:full` when the rule could affect historical source, not only the current diff.
4. If no checker exists for the new rule, add red-first checker tests or explicitly mark the module's check path as manual.
5. Classify findings as current-task blockers, historical drift, checker false positives, or documented exceptions.
6. Fix current-task blockers before completion. Historical drift needs a tracked cleanup plan unless the user explicitly expands scope.
7. Generate or update the visual review dossier for meaningful UI changes so the final result can be inspected against Figma and the current code.
8. Update the PR/handoff with what the new rule proves, what it does not prove, and whether old components were rechecked.

Do not say the repo is compliant with a new implementation rule until the affected scope has been checked with the new rule.

### Supporting Research

Supporting research can live in `docs/research/` when the repo needs durable context for implementation decisions, external standards, accessibility rules, token formats, Figma-to-code workflow guidance, or tool evaluations. Research docs support the module contracts; they do not become mandatory implementation steps by existing.

Use research docs to reduce reliance on memory or ephemeral web lookups, but keep them scoped and maintainable. Prefer canonical links, version/date notes, project-specific summaries, and decision records over copying entire external standards into the repo unless the license, maintenance burden, and update process are explicit.

## Non-negotiables

- **No hardcoded design values.** Colors, spacing, radii, shadows, fonts, and breakpoints come from `DESIGN.md`'s tokens (`src/tokens/*.css`) or Tailwind's default scale — never a hex/px/arbitrary value invented at a call site.
- **No stub governance.** `IMPLEMENTATION.md`, `DESIGN.md`, `COMPONENTS.md`, `figma/component-map.json`, and `docs/research/` must describe current rules, current contracts, or durable supporting evidence. Do not add placeholders that imply a requirement exists before it is defined, enforceable, or explicitly manual.
- **No prose-only exceptions.** If an arbitrary visual value or raw design value is truly unavoidable, it must be registered in `design-system/audits/exceptions.json` with the exact checker rule, exact class/value, and required metadata. Mentioning the value in `DESIGN.md`, `COMPONENTS.md`, a PR, or a comment is not enough for the checker to accept it.
- **No duplicate components.** Before writing a new file under `src/components`, grep `COMPONENTS.md` and the directory itself for something that already does this. Extending > forking > duplicating.
- **No component without a contract.** A reusable visual component that exists in code but not in `COMPONENTS.md` is incomplete, not done. Its `figma/component-map.json` entry must point to its own `COMPONENTS.md` contract, not another component's anchor. A route-local assembly that only composes documented primitives/components can avoid a component-map entry only with an exact audited route-orchestration exclusion in `design-system/audits/component-contract-exclusions.json`; do not use that registry to hide a reusable component.
- **No silent architecture changes.** Don't introduce a new top-level directory, a new styling approach, or a new state-management pattern to solve a single task — see the Decision Making Hierarchy in `CLAUDE.md`. If existing patterns genuinely can't support the requirement, say so and confirm before proceeding rather than picking a new pattern unilaterally.
- **No skipped states.** A component isn't complete with only its default/happy-path state implemented — default, hover, focus, disabled, loading (where applicable), and error/invalid (for form controls) all need to exist and render correctly, per `COMPONENTS.md`'s States section for that component.
- **No unverified dark mode.** Since tokens are theme-aware, correct token usage should make new UI work in both themes automatically — but verify by actually toggling `.dark`, don't assume it from reading class names (exception: auth/onboarding-fixed-light surfaces, see `DESIGN.md` Visual language).
- **No accessibility shortcuts.** Every requirement in `DESIGN.md`'s Accessibility standards section applies to every new component — keyboard operability, focus visibility, semantic structure, and WCAG AA contrast are implementation requirements, not nice-to-haves.

## Figma integration

- `figma/component-map.json` is the canonical repo-owned component → Figma → docs → code map. Each documented reusable component must map to its `COMPONENTS.md` entry and implementation path. When a Figma source exists, add `figmaSources` entries with `fileKey`, colon-form `nodeId`, `name`, `url`, `role`, and `lastVerified`; add `visualTargets` when the component is represented by one or more visual-audit targets.
- `figma/figma-links.md` is the human-readable index of Figma file/node references cited throughout `DESIGN.md` and `COMPONENTS.md`.
- When a Figma reference for a component doesn't exist yet (`figmaComponent: ""` in `component-map.json`), implement conservatively from the closest existing pattern and flag the gap — don't invent visual details that aren't backed by a design reference or an explicit product decision.
- If a Figma file/node referenced in these docs no longer matches what's rendered there (the design moved on), treat it as a signal to re-sync `DESIGN.md`/`COMPONENTS.md`, not to silently drift.
- Generated screenshots and review boards are not the source of truth. Keep durable source references in `figma/component-map.json`; regenerate visual evidence from `design-system/audits/visual-comparisons/targets.json` when needed.

## When something doesn't fit

If a requirement can't be satisfied by an existing token, component, or pattern:

1. Re-read `DESIGN.md` / `COMPONENTS.md` once more — confirm it's genuinely missing, not just named differently than expected.
2. Prefer extending an existing token/component (a new variant, a new token in an existing category) over inventing a parallel one.
3. If a truly new primitive or pattern is required, follow `CLAUDE.md`'s Component Creation Process and "Working with shadcn/ui in this repo" guidance, and document it in `COMPONENTS.md` in the same change.
4. If a truly unavoidable arbitrary visual value or raw design value remains after those checks, register it in `design-system/audits/exceptions.json` with the exact checker rule, exact class/value, and full exception metadata. It must remain visible in `npm run check:design-system` output. Treat this as a temporary or explicitly permanent exception, not a casual local override.
5. If the requirement conflicts with something documented (a different architecture, a different styling approach), flag the conflict and confirm with the user before proceeding — per `CLAUDE.md`'s Conflict Resolution Rules.
