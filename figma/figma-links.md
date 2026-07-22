# Figma links

Human-readable index of the Figma file(s) and node references cited throughout `DESIGN.md` and `COMPONENTS.md`. See `figma/component-map.json` for the machine-readable component → Figma → docs → code mapping used by AI tooling and the Figma MCP integration.

## Files

| File | Role |
|---|---|
| **AMFM Portal** | Primary product design file. Source of the brand tokens (color, type, spacing, shadow) documented in `DESIGN.md`, and of every component reference below. |

## Node references

| Node | Screen / component | Used for |
|---|---|---|
| `Onboarding/login` (`1909:25767`) | `/login` screen | Origin of the brand tokens in `DESIGN.md` (color scale, type line-heights, card/button shadows); reference for `AuthCard`, `PhotoBackdrop`, `HeartChartLogo`, `Checkbox` |
| `3273:19658` and siblings | "Primary" button set | `Button` — default/hover/focused/disabled/loading states (`COMPONENTS.md#button`) |
| `3272:19436` and siblings | "Input" field set | `Input` — default/filled/focused/disabled/invalid states (`COMPONENTS.md#input`) |
| `1829:19828` | Modal chrome reference | `Dialog` — surface shape, close control (`COMPONENTS.md#dialog`) |
| `1993:36348` and variants (`1640:23457`/`1670:36217` Growing, `1670:36549` Low, `1670:36610` Exceptional) | "HeartChart Summary" dashboard card | `HeartChartSummary` — donut/scale states, action row (`COMPONENTS.md#heartchartsummary`) |
| `Onboarding/Create Profile` (`1909:25769`) | `/create-profile` screen (full field set + pricing card) | `Card`, `Select` (`1909:25261` "Your role", `1909:25262` "Your primary goal"), `InputGroup` (`1909:25259` "Website"), `Label` required marker (e.g. `I1909:25255;7487:535320`), `BenefitListItem` (`10:6386` check-circle + instances `1909:25272`–`1909:25275`, `2852:117176`, `2852:117164`), `PricingCard` (`1909:25264`), `AmfmLogo` (`1909:25281` logo + `1909:25280` caption) — see `COMPONENTS.md` |
| `10:338` | `chevron-down` icon component | `Select`'s trailing icon (`COMPONENTS.md#select`) |

## Components without a Figma reference yet

These were implemented from product requirements or generic shadcn/ui patterns rather than a specific Figma node. If a Figma reference is added later, update `figma/component-map.json`'s `figmaComponent` field and this table in the same change:

- `Card` — generic shadcn/ui primitive, no brand-specific reference yet.
- `Label` — generic shadcn/ui primitive; color token (`text-text-secondary`) sourced from the `Onboarding/login` node above.
- `GoogleIcon` — hand-authored approximation of Google's public brand mark, not sourced from the Figma file.
- `DposystemLearnMore` / `DposystemStory` — content-driven pattern authored directly from product copy, no Figma design reference.

## Maintenance

- When implementing a new screen from Figma, add its file/node reference here and to `figma/component-map.json` in the same change that adds the component — see `IMPLEMENTATION.md`'s Figma integration section.
- Don't leave a `figmaComponent` value stale after a design update — if the cited node no longer matches what's implemented, treat it as a signal to re-sync `DESIGN.md` / `COMPONENTS.md`, not just this file.
