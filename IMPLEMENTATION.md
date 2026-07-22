# AMFM Portal — IMPLEMENTATION.md

AI coding rules for turning a Figma design or product requirement into shipped code in this repository. This file is the operational loop; it doesn't restate design foundations (`DESIGN.md`) or component contracts (`COMPONENTS.md`) — it tells an AI agent in what order to consult them and what's non-negotiable while implementing.

```
Figma Design Standards → DESIGN.md → COMPONENTS.md → React Components → /design-system Visual Validation
```

## The implementation loop

1. **Always read `DESIGN.md` before implementing UI.** Confirm the color, type, spacing, radius, shadow, breakpoint, motion, and accessibility foundations you need already exist. If a Figma value doesn't map to an existing token, follow `DESIGN.md`'s "Adding a new color token" (or the equivalent section for the token category) before writing component code — never inline a raw value as a shortcut.
2. **Always read `COMPONENTS.md` before creating a component.** Search it for an existing component or variant that already covers the requirement. Most new UI needs are a variant, prop, or composition of something already documented there, not a new component.
3. **Reuse existing components before creating new ones.** Check `src/components/ui` (primitives) and `src/components` / colocated `_components` (app-specific composites) in that order. Extending a variant or composing existing primitives beats writing new markup.
4. **Never create arbitrary colors, spacing, typography, or styles.** Every visual value must trace back to a token in `DESIGN.md` / `src/tokens/*.css`. If you catch yourself writing `text-[13px]`, `#somehex`, or a one-off `mt-[7px]`, stop and either find the matching token/utility or add one properly (see `DESIGN.md`).
5. **Never create undocumented UI patterns.** A new interaction pattern (a new carousel shape, a new modal flow, a new card composition) needs a `COMPONENTS.md` entry, not just code. If you're not sure whether something is a "pattern" worth documenting, check the Component Creation Process in `CLAUDE.md` (is it repeatable? will it recur?).
6. **Update `COMPONENTS.md` when introducing new components.** Add the full contract (purpose, anatomy, variants, states, props, tokens, accessibility, responsive behavior, Figma reference, implementation rules, status) in the same change that adds the code — not as follow-up work. Start new components at `Draft` status; promote to `Production Ready` once it has real usage and has been visually validated.
7. **Validate implementation visually in `/design-system`.** Every component and pattern must be rendered there — all variants, default/hover/focus/disabled/loading states, token references, and (when available) a Figma reference link — before the change is considered done. If you can't run the dev server in your environment, say so explicitly rather than asserting the UI looks correct from reading the code (see CLAUDE.md's Development standards).

## Non-negotiables

- **No hardcoded design values.** Colors, spacing, radii, shadows, fonts, and breakpoints come from `DESIGN.md`'s tokens (`src/tokens/*.css`) or Tailwind's default scale — never a hex/px/arbitrary value invented at a call site.
- **No duplicate components.** Before writing a new file under `src/components`, grep `COMPONENTS.md` and the directory itself for something that already does this. Extending > forking > duplicating.
- **No component without a contract.** A component that exists in code but not in `COMPONENTS.md` is incomplete, not done.
- **No silent architecture changes.** Don't introduce a new top-level directory, a new styling approach, or a new state-management pattern to solve a single task — see the Decision Making Hierarchy in `CLAUDE.md`. If existing patterns genuinely can't support the requirement, say so and confirm before proceeding rather than picking a new pattern unilaterally.
- **No skipped states.** A component isn't complete with only its default/happy-path state implemented — default, hover, focus, disabled, loading (where applicable), and error/invalid (for form controls) all need to exist and render correctly, per `COMPONENTS.md`'s States section for that component.
- **No unverified dark mode.** Since tokens are theme-aware, correct token usage should make new UI work in both themes automatically — but verify by actually toggling `.dark`, don't assume it from reading class names (exception: auth/onboarding-fixed-light surfaces, see `DESIGN.md` Visual language).
- **No accessibility shortcuts.** Every requirement in `DESIGN.md`'s Accessibility standards section applies to every new component — keyboard operability, focus visibility, semantic structure, and WCAG AA contrast are implementation requirements, not nice-to-haves.

## Figma integration

- `figma/component-map.json` maps each documented component to its Figma component, its `COMPONENTS.md` entry, and its implementation path — consult it (and the Figma MCP server, when connected) to pull the current design spec for a component before implementing or updating it.
- `figma/figma-links.md` is the human-readable index of Figma file/node references cited throughout `DESIGN.md` and `COMPONENTS.md`.
- When a Figma reference for a component doesn't exist yet (`figmaComponent: ""` in `component-map.json`), implement conservatively from the closest existing pattern and flag the gap — don't invent visual details that aren't backed by a design reference or an explicit product decision.
- If a Figma file/node referenced in these docs no longer matches what's rendered there (the design moved on), treat it as a signal to re-sync `DESIGN.md`/`COMPONENTS.md`, not to silently drift.

## When something doesn't fit

If a requirement can't be satisfied by an existing token, component, or pattern:

1. Re-read `DESIGN.md` / `COMPONENTS.md` once more — confirm it's genuinely missing, not just named differently than expected.
2. Prefer extending an existing token/component (a new variant, a new token in an existing category) over inventing a parallel one.
3. If a truly new primitive or pattern is required, follow `CLAUDE.md`'s Component Creation Process and "Working with shadcn/ui in this repo" guidance, and document it in `COMPONENTS.md` in the same change.
4. If the requirement conflicts with something documented (a different architecture, a different styling approach), flag the conflict and confirm with the user before proceeding — per `CLAUDE.md`'s Conflict Resolution Rules.
