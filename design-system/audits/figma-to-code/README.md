# Figma-To-Code Dogfood Audits

This directory stores durable, repo-owned summaries for pasted Figma implementation runs. Generated screenshots and review boards stay under `design-system/audits/.generated/` and are ignored by git; records here preserve the decisions, failures, fixes, validation, and residual risks that future agents and reviewers need.

Use this directory when a Figma node is implemented or used to harden the local implementation loop.

## Record Contract

Each dogfood record must include:

- Figma source: file key, node ID, Figma URL, and node name as extracted or verified.
- Goal: what the pasted Figma node was meant to prove or implement.
- Reuse decision: existing primitives/components reused, existing components extended, and new components created.
- Build path: files changed and how the implementation maps to `IMPLEMENTATION.md`.
- Component-map sync: affected `figma/component-map.json` entries, including structured `figmaSources` and `visualTargets` when applicable.
- Check path: tests, checker commands, build/lint, visual audit board, and browser route evidence.
- Findings fixed: nits, flakes, false claims, checker gaps, accessibility issues, visual issues, or system-contract gaps found and fixed during the run.
- Residual risks: what the run does not prove, including missing Figma states, manual visual review, dark-mode limits, or product behavior outside design-system scope.
- Follow-up candidates: only concrete next improvements, not placeholder requirements.

Do not use these records as bypasses. If a run exposes a reusable rule, promote it into `IMPLEMENTATION.md`, `DESIGN.md`, `COMPONENTS.md`, checker tests, visual targets, or component-map wiring as appropriate.

## Current Records

- [20260725 Settings / Church Profile Modal](./20260725-settings-church-profile.md)
