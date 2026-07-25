# Design System Audits

This directory is the shared, repo-owned home for design-system governance plans, audit rules, exception policy, and durable audit summaries. It is intentionally separate from `.engine`: `.engine` is local workspace state and must not be required for another person or agent to understand, run, or contribute to the design-system audit process.

`DESIGN.md`, `COMPONENTS.md`, `IMPLEMENTATION.md`, `figma/component-map.json`, and `src/tokens/*.css` remain the source files being audited. This directory records how the repo checks those sources and how audit work is sequenced.

## Current Status

- Status: baseline checker implemented and validated.
- Last revised: 2026-07-24.
- Requested by: Evan C. Navarro.
- Scope: governance/checking PR separate from the July MVP modal implementation PR.
- Non-goal: do not migrate tokens to DTCG JSON in this work.
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

The runner currently enforces:

- Undocumented arbitrary visual Tailwind values fail, such as `gap-[7px]`, `text-[13px]`, `shadow-[...]`, and `bg-[#ffffff]`.
- Raw hex values in production source fail, unless they are inside comments. Token source comments may keep Figma hex provenance, but code must consume semantic tokens.
- Bracketed state/selector syntax does not fail when it is not a design value, such as `data-[state=open]:animate-in` or `has-[>svg]:px-3`.
- Changed component files under `src/components/**` and colocated `src/app/**/_components/**` must have a matching `implementation` entry in `figma/component-map.json`.
- Component-map implementation paths and `COMPONENTS.md` anchors must resolve.
- Registered arbitrary-value exceptions must include complete metadata and still show in the report as allowed exceptions when encountered in scanned changed files.

The runner deliberately does not scan `scripts/`, tests, fixtures, or generated/local artifacts as production design code.

## Dogfood And A/B Validation

The checker has two validation layers:

1. Unit-level rule tests cover the scanner, file discovery, exception registry, component-map/docs wiring validation, and report formatting.
2. CLI-level dogfood tests run the real `scripts/design-system-check/index.mjs` command from a temporary Git repository against changed `src/components` files.

The A/B cases intentionally prove both blocked and accepted paths:

- A/fail: an agent-style `gap-[7px]` in changed component code fails even when `COMPONENTS.md` mentions the value in prose.
- A/fail: a raw `#ffffff` design value in changed component code fails.
- A/fail: an incomplete exception registry entry fails.
- A/fail: a changed component without a `figma/component-map.json` implementation entry fails.
- B/pass: tokenized component code using system utilities passes.
- B/pass: a complete exception passes but remains visible in JSON output as an allowed exception.

## Required Exception Metadata

Every arbitrary visual-value exception must record:

- Exact arbitrary class name currently matched by the checker.
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

## Shared Files

These are shared repo-owned artifacts:

- `scripts/design-system-check/`: modular checker implementation.
- `design-system/audits/exceptions.json`: registered arbitrary-value exceptions.
- `design-system/audits/index.json`: future durable index of completed audit runs, if persistent run indexing is confirmed as useful.
- `design-system/audits/<area>/<component-or-pattern>/<run-id>/audit.md`: future durable human audit summary when the result is important enough to commit.

Generated screenshots, raw reports, and temporary browser evidence should not be committed by default. They should be emitted to a configurable local or CI artifact directory unless intentionally promoted into this directory as durable review evidence.

## Current Limitations

- This PR does not perform the full historical cleanup sweep. A preliminary repo inventory found existing arbitrary values in current source and docs, including button heights, modal widths, blur values, custom tracking, and design-system demo values. Those need a separate full-sweep PR because silently allowlisting them here would weaken the rule this checker exists to enforce.
- This V1 runner does not yet parse every possible hardcoded visual literal, such as `style={{ gap: "7px" }}` or raw CSS declarations like `gap: 7px`. Those remain target-state violations, but they are future scanner coverage rather than a claim this baseline already enforces.
- The default runner does not yet emit persisted JSON files; `--json` prints machine-readable output to stdout.
- DTCG token migration remains future work, not part of this checker baseline.

## Phase Plan

The follow-up full-source sweep and adversarial checker-hardening plan lives in [`full-source-sweep-plan.md`](./full-source-sweep-plan.md). The phases below describe the baseline governance-checker PR; the follow-up plan describes how to dogfood it against the whole component/pattern/page system without relying on `.engine`.

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
3. Define future-plan metadata for items like DTCG.
4. Confirm future token portability work will not change current component consumption of CSS/Tailwind semantic tokens unless that later work is an explicit positive refactor.

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
4. Add DTCG as future work with trigger conditions, expected benefit, migration risk, and non-goals.

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
3. Confirm DTCG is documented only as future work.
4. Confirm existing CSS/Tailwind token consumption still works unchanged.
5. Confirm checker is modular and expandable for future accessibility and visual rules.
6. Run `npm run check:design-system`, `npm test`, `npm run lint`, and `npm run build`.

Pitstop:

- Look back: inspect `git diff` line by line.
- Verify: no hallucinated claims in docs.
- Fix: wording, tests, noisy output, or brittle rules.
- Look forward: prepare tactical commit only after approval.

## Future Work Registry

### DTCG Token Source Spike

- Added: 2026-07-24.
- Added by: Evan C. Navarro request, recorded by AI agent.
- Reason: preserve the option to move toward a portable design-token source if this design system is packaged into a real app or shared across tools/platforms.
- Current decision: do not implement now.
- Trigger conditions: repeated CSS token drift, real multi-platform token consumption, Figma token sync requirement, or extraction into a reusable package where CSS-only tokens become limiting.
- Non-goal: do not rename or rewrite component token usage just to adopt DTCG.
- Compatibility requirement: if implemented later, DTCG must generate or validate the current CSS/Tailwind token layer so existing components keep consuming stable semantic utilities.

## Revision Log

| Date | Author | Change | Reason |
|---|---|---|---|
| 2026-07-24 | AI agent, requested by Evan C. Navarro | Added initial governance audit plan, exception policy, pitstop cadence, A/B validation requirements, and DTCG future-work note. | Preserve the plan in shared repo context so future agents can audit progress without relying on `.engine` or memory. |
