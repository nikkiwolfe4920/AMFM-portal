# Design System Audits

This directory is the shared, repo-owned home for design-system governance plans, audit rules, exception policy, and durable audit summaries. It is intentionally separate from `.engine`: `.engine` is local workspace state and must not be required for another person or agent to understand, run, or contribute to the design-system audit process.

`DESIGN.md`, `COMPONENTS.md`, `IMPLEMENTATION.md`, `figma/component-map.json`, and `src/tokens/*.css` remain the source files being audited. This directory records how the repo checks those sources and how audit work is sequenced.

## Current Status

- Status: baseline checker implemented, full-source sweep validated, July MVP modal family implemented, and Settings / Church Profile Figma paste dogfooded.
- Last revised: 2026-07-25.
- Requested by: Evan C. Navarro.
- Scope: governance checker, full-source cleanup evidence, visual-audit harness, and five July 2026 MVP modal implementations are bundled in the current branch so the checker can be dogfooded against real Figma-to-code work.
- Non-goal: do not migrate the token source format in this work.
- Non-goal: do not make `.engine` part of shared project structure.

## Why This PR Exists

The repository already had strong written rules: Figma references flow into `DESIGN.md`, component contracts live in `COMPONENTS.md`, implementations should reuse documented primitives, and `/design-system` should visually validate the result. The HeartChart modal and Button foundation PR showed that prose alone is not enough: even context-rich implementation notes still required manual follow-up to separate mechanically proven requirements from requirements that remained manual review.

Examples of the failure mode this checker is meant to prevent:

- A PR can state "no arbitrary values" while changed component code still contains one-off Figma-exported Tailwind utilities such as fixed pixel gaps, widths, tracking, blur, or shadows.
- A PR can document an exception in prose while no machine-readable registry exists for another agent to find, review, remove, or promote later.
- A new component can exist in `src/components/` without a durable `figma/component-map.json` implementation mapping and `COMPONENTS.md` anchor.
- A component can appear visually close while relying on local overrides instead of the shared primitive or token that should own the invariant.

This baseline gives those rules teeth for future AI-assisted component creation. It does not replace human visual review or Figma MCP extraction. It gives agents a repeatable gate so Figma-to-code work can keep scaling without drifting into undocumented local patches.

## Operating Rule

The target state is zero arbitrary design values in component code. This V1 runner enforces a mechanical subset of that target: Tailwind arbitrary visual utilities, raw hex values, exception metadata, and component-map/documentation wiring for changed component files.

Arbitrary visual values are prohibited by default. A one-off value is allowed only when all of these are true:

1. Existing tokens, Tailwind defaults, component variants, and composition patterns have been checked first.
2. Adding or extending a token/component would create more design-system bloat than the one-off value.
3. The value is sourced from Figma or an explicit product/design decision.
4. The exception is registered with enough context for a later reviewer to remove, promote, or keep it.
5. The checker reports it as an exception, not as invisible normal code.

This is an exception clause, not a shortcut. Agents must argue against adding arbitrary values before accepting one.

## Implemented Runner Contract

Run:

```bash
npm run check:design-system
```

The default gate is intentionally changed-file scoped. It checks changed production source files under `src/` and validates global component-map integrity. This prevents new drift immediately without claiming the current full repository has already been cleaned of every historical arbitrary value.

For inventory and cleanup planning, run:

```bash
npm run check:design-system:full
```

The full-source command scans current production source under `src/` and runs in report-only mode. It should be used to classify historical debt, checker false positives, missing tokens, and component-map coverage gaps before changing component visuals.

For machine-readable JSON without npm lifecycle text, run the same commands through npm's silent mode:

```bash
npm run --silent check:design-system -- --json
npm run --silent check:design-system:full -- --json
```

The runner currently enforces:

- Undocumented arbitrary visual Tailwind values fail, such as `gap-[7px]`, `text-[13px]`, `shadow-[...]`, and `bg-[#ffffff]`.
- Raw hex values in production source fail, unless they are inside comments or have a complete, exact, value-scoped exception. Token source comments may keep Figma hex provenance, but code must consume semantic tokens.
- Raw inline-style and CSS declaration values fail when they encode visual design values outside token source files, such as `style={{ gap: "7px" }}` or `margin-top: 7px`.
- Bracketed state/selector syntax does not fail when it is not a design value, such as `data-[state=open]:animate-in` or `has-[>svg]:px-3`.
- Changed component files under `src/components/**` and colocated `src/app/**/_components/**` must have a matching `implementation` entry in `figma/component-map.json`.
- Design-system internal scaffolding under `src/app/design-system/**/_components/**` is excluded from component-map contract enforcement because it documents/demos the system rather than representing Figma-delivered product UI. It is still scanned for arbitrary visual values.
- Route-local orchestration files may bypass the component-map requirement only through an exact, complete `design-system/audits/component-contract-exclusions.json` entry. This is for files that own page/form state and compose documented primitives/components; it is not a general `_components` bypass, and visual-value rules still apply.
- Component-map implementation paths and `COMPONENTS.md` anchors must resolve, and the documentation anchor must belong to the same component identity. Pointing `NewCard` at `COMPONENTS.md#button` is a failure even though that anchor exists.
- Registered exceptions must include complete metadata and still show in the report as allowed exceptions when encountered in scanned changed files. Visual-value exceptions can target either an exact arbitrary class name or an exact raw value under a specific checker rule. Each visual-value exception entry is single-use per scan; a second identical value in the same file needs its own documented exception or, preferably, a token/component fix. Component-contract exclusions target exact file paths only.
- Arbitrary class extraction skips obvious prose strings while still scanning likely Tailwind class lists and one-token arbitrary class constants. This reduces false positives without allowing class constants to bypass the checker.

The runner deliberately does not scan `scripts/`, tests, fixtures, or generated/local artifacts as production design code.

## Implementation Linkage

The checker and visual-audit harness exist to prove parts of `IMPLEMENTATION.md`; they are not independent policy sources. When `IMPLEMENTATION.md` changes, audit work must answer two questions:

1. **Build question**: what does an agent need to do differently when creating or changing UI?
2. **Check question**: what command, test, visual review, or manual checklist proves the new requirement was followed and catches drift later?

If a new implementation rule has no checker coverage, it can still be valid, but it must be labeled as manually verified. Do not claim automated enforcement until there is a real test, script, or command wired into the gate.

When a new rule can affect existing source, run the relevant full-source check before claiming compliance. Previously accepted code that fails a new rule is historical drift, not a silent allowlist. Classify it, fix it when it is in the current task scope, or record a cleanup plan with a reason it is not being fixed now.

For Figma-to-code work, the visual-audit review board is the designer-facing implementation dossier. It must expose the Figma source, current code result, component-map matches, related files, observed token/utility candidates, and live code previews from the current worktree. This keeps the final review tied to real files instead of a hand-written summary that can drift.

## Dogfood And A/B Validation

The checker has two validation layers:

1. Unit-level rule tests cover the scanner, file discovery, exception registry, component-map/docs wiring validation, and report formatting.
2. CLI-level dogfood tests run the real `scripts/design-system-check/index.mjs` command from a temporary Git repository against changed `src/components` files.

The A/B cases intentionally prove both blocked and accepted paths:

- A/fail: an agent-style `gap-[7px]` in changed component code fails even when `COMPONENTS.md` mentions the value in prose.
- A/fail: a raw `#ffffff` design value in changed component code fails.
- A/fail: an incomplete exception registry entry fails.
- A/fail: a changed component without a `figma/component-map.json` implementation entry fails.
- A/fail: an incomplete component-contract exclusion fails.
- A/fail: a component-contract exclusion for one file does not suppress another file.
- A/fail: a component-map entry cannot point at another component's docs anchor.
- A/fail: one visual-value exception cannot suppress multiple identical values in the same file.
- B/pass: tokenized component code using system utilities passes.
- B/pass: a complete exception passes but remains visible in JSON output as an allowed exception.
- B/pass: a complete raw-value exception passes but remains visible in JSON output as an allowed exception.
- B/pass: a complete route-orchestration component-contract exclusion passes but remains visible in JSON output as an allowed exception.

## Required Exception Metadata

Every visual-value exception must record:

- Exact checker rule.
- Exact arbitrary class name or raw value currently matched by the checker.
- File path and component or pattern.
- Figma file/node or product decision source.
- Why existing tokens/components do not work.
- Alternatives considered.
- Blast radius.
- Owner or reviewer.
- Date added.
- Temporary or permanent status.
- Promotion trigger, such as "appears in two more components" or "confirmed as a token in Figma."

Incomplete exceptions must fail the audit runner.

Every component-contract exclusion must record:

- Exact file path.
- Component or route assembly name.
- Category, currently only `route-orchestration`; unsupported categories fail the checker instead of becoming informal bypasses.
- Source inspection basis.
- Why the file is route orchestration instead of a reusable Figma component contract.
- Alternatives considered.
- Blast radius.
- Owner or reviewer.
- Date added.
- Temporary or permanent status.
- Review trigger, such as "reused outside this route" or "promoted to a Figma component/pattern."

Incomplete component-contract exclusions must fail the audit runner. An exclusion for one file must never allowlist another file.

## Shared Files

These are shared repo-owned artifacts:

- `scripts/design-system-check/`: modular checker implementation.
- `design-system/audits/exceptions.json`: registered visual-value exceptions, including arbitrary class values and scoped raw-value exceptions.
- `design-system/audits/component-contract-exclusions.json`: exact, metadata-backed route-orchestration files that intentionally do not get component-map entries while still being scanned for visual-value drift.
- `design-system/audits/figma-to-code/`: durable records for pasted Figma implementation dogfood runs.
Generated screenshots, raw reports, and temporary browser evidence should not be committed by default. They should be emitted to a configurable local or CI artifact directory unless intentionally promoted into this directory as durable review evidence.

## Current Limitations

- This branch performs the first full-source cleanup pass required to get checker-scanned production source to zero unresolved governance errors. It still does not claim that every current component/page has pixel-perfect Figma parity or complete accessibility coverage; those remain separate visual and interaction review gates.
- The visual-audit runner produces a human review board, not strict pixel-parity proof. Figma screenshots are full-frame references, while live modal captures intentionally clip to dialog bounds for code before/current comparisons.
- This runner does not yet parse every possible hardcoded visual literal, such as non-hex raw SVG color function attributes (`fill="rgb(...)"`) or visual values hidden behind computed variables/functions the static scanner cannot evaluate. Those remain target-state violations, but they are future scanner coverage rather than a claim this baseline already enforces.
- The default runner does not yet emit persisted JSON files; use `npm run --silent ... -- --json` when another tool needs pure JSON from stdout.

## Phase Plan

The full-source sweep and adversarial checker-hardening plan lives in [`full-source-sweep-plan.md`](./full-source-sweep-plan.md). The phases below record the governance path that this branch follows and extends with the July MVP modal dogfood work. The plan describes how to keep dogfooding against the component/pattern/page system without relying on `.engine`.

### Phase 0: Grounding And Branch Safety

1. Verify branch, upstream, dirty files, staged files, and ignored `.engine` behavior from real Git state.
2. Verify whether governance work is on a separate branch from modal implementation.
3. Verify no shared audit/check runner already exists beyond `test`, `lint`, and `build`.

Pitstop:

- Look back: inspect `git status`, `git diff --stat`, `package.json`, `.gitignore`, `.git/info/exclude`, and current tests.
- Verify: no shared repo logic relies on `.engine`.
- Fix: resolve branch or ignore confusion before editing.
- Look forward: decide whether to branch for the governance PR before touching implementation files.

### Phase 1: Audit Existing Governance Text

1. Read `IMPLEMENTATION.md`, `DESIGN.md`, `COMPONENTS.md`, `CLAUDE.md`, `AGENTS.md`, `src/tokens/*.css`, `figma/component-map.json`, and `figma/figma-links.md`.
2. Extract current rules for tokens, arbitrary values, component reuse, documentation updates, Figma source mapping, visual validation, and accessibility.
3. Identify contradictions between "no arbitrary values" and existing documented exceptions.
4. Identify whether exceptions are centralized, scattered, or undocumented.

Pitstop:

- Look back: list exact rule conflicts from real files.
- Verify: distinguish current policy from current practice.
- Fix: do not write new policy until contradiction list is concrete.
- Look forward: define the smallest policy update needed to preserve zero arbitrary values by default.

### Phase 2: Define The Governance Contract

1. Define rule hierarchy: tokens/components first, extend existing systems second, exceptions last.
2. Define required exception metadata.
3. Define how supporting research may be cited without turning unapproved future ideas into active implementation rules.
4. Confirm any source-format migration remains out of scope unless it is promoted through a complete `IMPLEMENTATION.md` module contract.

Pitstop:

- Look back: compare proposed contract against existing files.
- Verify: wording cannot be read as "document it and move on."
- Fix: tighten language that grants casual discretion.
- Look forward: translate the contract into testable runner behavior.

### Phase 3: Red-First Checker Tests

Write tests before implementing the checker:

1. Tokenized component passes.
2. `gap-[7px]` fails without exception.
3. Raw hex color fails without exception.
4. Arbitrary shadow fails without exception.
5. Incomplete exception entry fails.
6. Complete registered exception passes but reports as an exception.
7. Non-design arbitrary selectors do not fail when they introduce no raw design value.
8. Component code without a `COMPONENTS.md` entry fails.
9. Component-map entry pointing to a missing implementation path fails.

Pitstop:

- Look back: run tests and confirm failures are expected red failures.
- Verify: failures are meaningful, not brittle.
- Fix: refine fixtures before checker implementation.
- Look forward: implement only enough runner logic to satisfy the first group of tests.

### Phase 4: Implement Minimal Checker Core

1. Implement a Node-based checker consistent with the repo's current Next/TypeScript tooling.
2. Split implementation into scanner, rule registry, exception loader, report formatter, and CLI entry.
3. Add `package.json` script, likely `check:design-system`.
4. Implement token/arbitrary-value scanning, exception validation, component-doc presence checks, and component-map path checks.

Pitstop:

- Look back: run targeted checker tests.
- Verify: each test passes for the intended reason.
- Fix: remove duplicated logic and brittle parsing.
- Look forward: add reporting only after rule correctness is stable.

### Phase 5: Add Human And Machine Reports

1. Emit JSON for agents and CI.
2. Emit concise terminal output for humans.
3. Include exact file, value, rule, and remediation references.
4. Include counts for errors, warnings, allowed exceptions, files scanned, and docs checked.
5. Make output location configurable.

Pitstop:

- Look back: run checker against fixtures and current repo.
- Verify: output is readable and actionable.
- Fix: reduce noisy findings before applying to real code.
- Look forward: update governance docs only after runner behavior is proven.

### Phase 6: Update Governance Documentation

1. Update `IMPLEMENTATION.md` with stricter arbitrary-value policy.
2. Update `DESIGN.md` only if token governance language belongs there after inspection.
3. Update `COMPONENTS.md` only if component contract requirements need checker references.
4. Keep unapproved future requirements out of active governance docs unless they are recorded as scoped research under `docs/research/`.

Pitstop:

- Look back: compare documentation against runner behavior.
- Verify: docs and checker do not contradict each other.
- Fix: remove wording that grants casual discretion.
- Look forward: test docs by simulating agent decisions.

### Phase 7: A/B Agent-Behavior Validation

1. A case: agent-style arbitrary gap fails.
2. A case: agent-style raw Figma hex fails.
3. A case: "just document it in prose" fails if registry metadata is missing.
4. B case: proper token use passes.
5. B case: proper token extension path is documented and passes.
6. B case: rare complete exception passes and remains visible in the report.

Pitstop:

- Look back: run all checker tests.
- Verify: the runner blocks the failure modes this governance work exists to prevent.
- Fix: add missing tests for loopholes discovered.
- Look forward: run against current branch changes.

### Phase 8: Run Against Current Repo

1. Run `npm run check:design-system`.
2. Run `npm test`.
3. Run `npm run lint`.
4. Run `npm run build`.
5. Triage findings into governance PR fixes, existing repo debt, modal branch findings, and false positives.
6. Do not silently allowlist findings.

Pitstop:

- Look back: inspect real checker output and test results.
- Verify: no rule breaks the repo for bad reasons.
- Fix: true nits, false positives, and bad wording before continuing.
- Look forward: decide what belongs in governance PR versus later full sweep.

### Phase 9: Governance PR Readiness

1. Confirm changed files are limited to governance/checking/docs unless intentionally expanded.
2. Confirm `.engine` is untouched by shared architecture.
3. Confirm existing CSS/Tailwind token consumption still works unchanged.
4. Confirm checker is modular and expandable for additional implementation modules without relying on placeholder rules.
5. Run `npm run check:design-system`, `npm test`, `npm run lint`, and `npm run build`.

Pitstop:

- Look back: inspect `git diff` line by line.
- Verify: no hallucinated claims in docs.
- Fix: wording, tests, noisy output, or brittle rules.
- Look forward: prepare tactical commit only after approval.

## Revision Log

| Date | Author | Change | Reason |
|---|---|---|---|
| 2026-07-24 | AI agent, requested by Evan C. Navarro | Added initial governance audit plan, exception policy, pitstop cadence, and A/B validation requirements. | Preserve the plan in shared repo context so future agents can audit progress without relying on `.engine` or memory. |
