# Figma-To-Code Dogfood: Settings / Church Profile Modal

Status: implemented and validated locally
Run date: 2026-07-25
Branch: `evan-design-system-full-source-sweep-20260725`
Requested by: Evan C. Navarro

## Figma Source

- File key: `tg3U3gNcIYMn9aY9JYrIZc`
- Node ID: `3724:20992`
- URL: `https://www.figma.com/design/tg3U3gNcIYMn9aY9JYrIZc/AMFM-Portal?node-id=3724-20992&m=dev`
- Extracted node name: `Modal/Settings/Church Profile`
- Extracted frame: 1024 x 768 settings modal with left settings navigation, header/close button, logo upload block, basic information form fields, campus list, and add-campus input/action.
- Figma screenshot source: `https://www.figma.com/api/mcp/asset/ca254487-4a9e-4853-989e-4eabc57411f0`

## Goal

Use a fresh pasted Figma node to dogfood the repo's implementation loop:

1. Extract the Figma node through MCP.
2. Reuse existing primitives instead of raw generated markup.
3. Add only reusable components that have clear contracts.
4. Tokenize layout and styling through the existing token system.
5. Update `DESIGN.md`, `COMPONENTS.md`, `figma/component-map.json`, `/design-system`, and visual-audit targets.
6. Run mechanical gates and produce a designer-reviewable visual dossier.

## Reuse / Extend / Create Decision

Reused:

- `Dialog`
- `Button`
- `Input`
- `InputGroup`
- `Select`
- `Label`
- `HelperText`
- `FellowshipOfTheParksLogo`
- existing `/design-system/components` showcase structure

Extended:

- `src/tokens/spacing.css` with settings-modal layout utilities:
  - `--container-modal-settings`
  - `--container-settings-content`
  - `grid-cols-settings-modal`
  - `grid-cols-settings-field-pair`
  - `grid-cols-settings-address`
  - `grid-cols-settings-campus-row`
  - `max-w-settings-content`
- `FellowshipOfTheParksLogo` now uses the exact Figma asset dimensions/source image.
- The visual-audit target set now includes desktop and narrow settings modal captures.

Created:

- `InputActionGroup`: attached input plus trailing action button.
- `SettingsModalShell`: reusable settings modal shell with sidebar navigation, mobile fallback navigation, title/description, close behavior, and caller-owned active content.
- `SettingsSection`: labeled section wrapper with secondary panel surface.
- `SettingsAssetUpload`: avatar/logo upload row with upload/remove actions and helper copy.
- `SettingsCampusList`: campus rows with edit/remove icon actions.
- `ChurchProfileSettingsModal`: Figma-specific composition for the Church Profile settings screen.
- `src/app/design-system/components/_components/settings-demos.tsx`: client demo wrapper so the Server Component page does not pass event handlers or icon components directly into client components.

## Build Path

Implementation files:

- `src/components/ui/input-action-group.tsx`
- `src/components/settings-modal-shell.tsx`
- `src/components/settings-section.tsx`
- `src/components/settings-asset-upload.tsx`
- `src/components/settings-campus-list.tsx`
- `src/components/settings-church-profile-modal.tsx`
- `src/app/design-system/components/_components/settings-demos.tsx`
- `src/components/fellowship-of-the-parks-logo.tsx`
- `src/tokens/spacing.css`
- `public/fellowship-of-the-parks-logo.png`

Documentation and mapping files:

- `COMPONENTS.md`
- `DESIGN.md`
- `design-system/components/README.md`
- `figma/component-map.json`
- `figma/figma-links.md`
- `design-system/audits/visual-comparisons/targets.json`

## Component-Map Sync

Structured Figma source metadata was added to `figma/component-map.json` for the Settings components created in this run:

- `ChurchProfileSettingsModal`
- `SettingsModalShell`
- `SettingsSection`
- `SettingsAssetUpload`
- `SettingsCampusList`
- `InputActionGroup`

Each entry points to file key `tg3U3gNcIYMn9aY9JYrIZc`, node `3724:20992`, the Figma URL, a source role, and `lastVerified: 2026-07-25`. Each entry also references the visual targets `settings-church-profile-modal` and `settings-church-profile-modal-mobile` so future contributors can regenerate the designer review board from repo-owned metadata.

## Findings Fixed During The Run

- Server/client boundary: `/design-system/components` initially failed because the Server Component page passed event handlers and Lucide icon components into client components. Fixed by moving settings demos into a client wrapper module.
- Mobile settings navigation: the first shell version hid section navigation on narrow screens. Fixed by adding a wrapped mobile nav fallback while keeping the desktop sidebar.
- Mobile overlap/clipping: the first mobile fallback overlapped the close button and then clipped labels with horizontal overflow. Fixed by using wrapped navigation under the title area.
- Accessible action names: `InputActionGroup` initially exposed only the visible action label. Fixed with `actionAriaLabel`.
- Visible versus accessible remove copy: `SettingsAssetUpload` can keep Figma's visible `Remove` label while exposing a clearer `removeAriaLabel`, such as `Remove logo`.
- Autofocus/text selection: the settings shell focuses the dialog title on open instead of allowing a form input to become the first focused element and visually select text.
- Checker gap: visual-value exceptions could previously pass without an explicit `rule`. Fixed by requiring rule-scoped exceptions and adding a test.
- Checker gap: component-contract exclusions only checked that `category` was non-empty. Fixed by enforcing the current `route-orchestration` category enum and adding a test.

## Check Path

Focused tests passed:

```bash
npm test -- src/components/settings-church-profile-modal.test.tsx src/components/ui/input-action-group.test.tsx
```

Full focused regression set passed:

```bash
npm test -- src/components/july-mvp-modal-family.test.tsx src/components/settings-church-profile-modal.test.tsx src/components/ui/input-action-group.test.tsx src/components/heartchart-link-modal.test.tsx src/components/heartchart-modal-shell.test.tsx src/components/heartchart-link-card.test.tsx src/components/participation-trend-card.test.tsx src/components/tip-carousel.test.tsx src/components/info-note.test.tsx src/components/modal-text-section.test.tsx src/components/video-player.test.tsx scripts/design-system-check/lib/arbitrary-values.test.mjs scripts/design-system-check/lib/component-contracts.test.mjs scripts/design-system-check/lib/runner.test.mjs scripts/visual-audit/capture.test.mjs
```

Result: 15 files / 69 tests passed.

Mechanical gates passed:

```bash
npm test
npm run --silent check:design-system -- --json
npm run --silent check:design-system:full -- --json
npm run lint -- src/components src/app/design-system/components/page.tsx src/app/design-system/components/_components/settings-demos.tsx src/app/design-system/_components/heartchart-modal-demos.tsx scripts/design-system-check scripts/visual-audit
npm run build
```

Checker snapshot after this run, including the follow-on structured Figma source metadata hardening:

- Full test suite: 47 files / 177 tests passed.
- Changed mode: 128 files checked, 64 source files scanned, 0 errors, 13 allowed exceptions.
- Full-source mode: 100 source files scanned, 0 errors, 22 allowed exceptions.

Visual audit passed:

```bash
npm run audit:visual -- --manifest /tmp/amfm-settings-church-profile-visual-targets.json --before-url http://127.0.0.1:3102 --after-url http://127.0.0.1:3102 --run-id 20260725-settings-church-profile-figma-paste
```

Generated review board:

```text
design-system/audits/.generated/visual-comparisons/20260725-settings-church-profile-figma-paste/review-board.html
```

Route check:

- `http://127.0.0.1:3102/design-system/components` returned HTTP 200.

## Residual Risks

- The visual board is human review evidence, not automated pixel-parity proof.
- The Figma screenshot clips lower content below the first visible settings viewport, so lower form/campus content is structurally implemented but not pixel-proven against a full Figma capture in this run.
- No mobile Figma reference was provided for this node. Mobile behavior is a conservative accessibility fallback, not a Figma-proven variant.
- Dark mode was not separately verified for this modal. The target screenshot is the light settings modal.
- Product routing, persisted settings state, upload handling, and campus CRUD are outside this design-system implementation.

## Follow-Up Candidates

- Add a persisted visual target that uses the shared `targets.json` entry instead of the temporary single-run manifest.
- Add future dark-mode visual coverage when settings modals are intended to support theme-aware surfaces.
- If additional settings screens are implemented, verify whether `SettingsModalShell` needs a controlled navigation API demo rather than the current single-screen shell demo.
