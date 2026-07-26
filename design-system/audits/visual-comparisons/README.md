# Visual Comparisons

This directory defines repo-owned visual audit targets. Generated screenshots and review boards are written to `design-system/audits/.generated/` and are ignored by git by default.

Use this flow when a design-system change needs proof against three sources:

1. Figma reference screenshot.
2. Baseline code screenshot from the pre-change commit.
3. Current code screenshot from the branch under review.

The shared contract lives here; the generated pixels do not. Promote only durable summaries back into `design-system/audits/**` when they are useful for future contributors.

## Run

Start the baseline and current app servers on separate ports, then run:

```bash
npm run audit:visual -- \
  --before-url http://127.0.0.1:3101 \
  --after-url http://127.0.0.1:3102 \
  --run-id 20260725-phase-4
```

The script creates:

- `design-system/audits/.generated/visual-comparisons/<run-id>/review-board.html`
- `design-system/audits/.generated/visual-comparisons/<run-id>/manifest.resolved.json`
- `design-system/audits/.generated/visual-comparisons/<run-id>/before/*.png`
- `design-system/audits/.generated/visual-comparisons/<run-id>/after/*.png`

Figma screenshots are supplied explicitly, not fetched automatically by the runner. Capture them through the Figma MCP or another approved Figma export path, then either save them at the target's `figma.localPath` or place them in the generated run folder at `figma/<target-id>-figma.png` before reviewing the board. If a target does not have a Figma image yet, the board shows the Figma URL and marks that source as missing instead of pretending it was verified.

The review board is also the implementation dossier for Figma-to-code work. Each target renders:

- Figma file/node/name/URL.
- The route, viewport, and captured UI state used for the code result.
- Related files from the target manifest.
- Component-map matches resolved from the current `figma/component-map.json`.
- Observed token/utility candidates extracted from current implementation files.
- Expandable current-code previews read from the actual worktree when the board is generated.

This dossier is generated evidence, not a hand-written component page. It should make a pasted Figma node inspectable by a designer without requiring them to read the repository directly, while still avoiding stale hard-coded code excerpts.

`figma/component-map.json` can point back to these targets through a component entry's `visualTargets` array. Use that link when a component needs repeatable visual evidence across future design updates. The target id remains owned by `targets.json`; the component map only references it.

Targets can define `actions` when the route needs a specific state before capture, such as opening a modal. Modal targets should open with `clickText`, wait for `[role='dialog']`, then wait for unique dialog text with `waitForText` before capture. Modal targets should also define `clipSelector` and `clipMargin` so the comparison captures the dialog frame instead of the full browser viewport.

Targets for newly introduced UI that had no baseline implementation can define `baselineUnavailableReason`. The runner skips only that target's baseline capture and renders the reason in the baseline column; do not use this for regressions or broken baseline routes.

Targets can define `codePreviewFiles` to control which current files appear in the dossier. If omitted, the runner previews the first previewable `src/**` implementation files from `relatedFiles` and excludes test files.

The runner freezes CSS animations, transitions, and caret rendering before capture. If a target still produces a before/current pixel delta, treat it as either a real visual delta or an unhandled source of nondeterminism and fix that before using the board as evidence.

The review board is for human visual assessment. It is not a pixel-parity assertion: Figma references may be full-frame screenshots, while live modal targets are usually clipped to the dialog frame. When the board exposes a difference, confirm whether it is a true design delta or a capture/cropping artifact before changing code.

## Governance

- Do not use `.engine` for shared visual audit structure.
- Do not call a token cleanup complete from checker output alone.
- Use the same route, viewport, and UI state for baseline and current screenshots.
- When a difference appears, trace it to the owning token, primitive, component, or page file before fixing it.
- Fix root ownership first. Do not patch visual differences at each page unless the page truly owns the variation.
