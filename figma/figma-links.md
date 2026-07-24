# Figma links

Human-readable index of the Figma file(s) and node references cited throughout `DESIGN.md` and `COMPONENTS.md`. See `figma/component-map.json` for the machine-readable component → Figma → docs → code mapping used by AI tooling and the Figma MCP integration.

## Files

| File | Role |
|---|---|
| **AMFM Portal** (`tg3U3gNcIYMn9aY9JYrIZc`) | Primary product design file. Source of the brand tokens (color, type, spacing, shadow) documented in `DESIGN.md`, and of every component reference below. The current July MVP working container is `Design System / Execution` (`3722:19910`): <https://www.figma.com/design/tg3U3gNcIYMn9aY9JYrIZc/AMFM-Portal?node-id=3722-19910&m=dev>. |

## Node references

| Node | Screen / component | Used for |
|---|---|---|
| `Design System / Execution` (`3722:19910`) | July MVP working container | Top-level Figma source set for audit/reconciliation. Contains the current July MVP manifestations for onboarding screens (`3722:19915`, `3722:19911`, `3722:19912`), HeartChart Resources (`3722:19475`), the assigned modal family (`3724:20579`, `3727:32459`, `3727:32514`, `3727:32687`), settings modals (`3724:20992`, `3727:32947`), Marriage Champions states (`3724:23167`, `3724:23444`), and HeartChart dashboard states (`3899:27502`, `3727:29573`). Use this node first when comparing page/pattern/component manifestations against the current designer source. |
| `Onboarding/login` (`1909:25767`) | `/login` screen | Origin of the brand tokens in `DESIGN.md` (color scale, type line-heights, card/button shadows); reference for `AuthCard`, `PhotoBackdrop`, `HeartChartLogo`, `Checkbox` |
| `3273:19658` and siblings; icon-leading primary refs `1894:16263`, `3724:23184`, `1903:19737`; Google social auth button `1909:25767`; HeartChart neutral/text controls in `1903:19737` / `3724:20579`; CourseCard video CTA `2320:27278`; HeartChartSummary action row `1670:36217`; dashboard empty-state CTA `3727:29364`; resource-table actions in `2361:19280`; reversed dark/brand surface uses on `/` and `FooterCta` (`1909:25789`) | "Primary" button set, neutral outline buttons, segmented utility actions, chrome-free text-button links, row/card icon actions, and reversed outline actions | `Button` — default/hover/focused/disabled/loading states, size mapping (`compact` 38px for compact actions, `sm` 42px small CTA, `default` 46px, `lg` 50px, `control` 44px QR/link neutral outline control, `controlSegment` input-embedded trailing segment, `inline` chrome-free text-button link, `iconLg` 48px row/card action), 20px default icon slot, effective 6px icon/text gap, primary icon token `button-primary-icon`, semantic neutral outline tokens for standalone neutral bordered controls and row/card icon actions, `outlineReversed` tokens for fixed dark/brand surfaces, `utilitySegment` for input-attached Copy, and `link inline` composition for upload-logo CTA. Figma exports the HeartChart standalone neutral action as `shadow-xs-skeuomorphic`; the current branch uses `shadow-xs` for neutral outline rendering pending visual acceptance or a dedicated neutral shadow token (`COMPONENTS.md#button`) |
| `3272:19436` and siblings | "Input" field set | `Input` — default/filled/focused/disabled/invalid states (`COMPONENTS.md#input`) |
| `1829:19828` | Modal chrome reference | `Dialog` — surface shape, close control (`COMPONENTS.md#dialog`) |
| `1903:19737`, `3724:20579`, `3727:32459`, `3727:32514`, `3727:32687` | HeartChart modal family | `HeartChartModalShell` — shared modal overlay/header/body/footer shell for Modal / HeartChart link, Modal / quick tip, Modal / last 4 weeks, and HeartChart Resources / Quick Start (`COMPONENTS.md#heartchartmodalshell`) |
| `1903:19737` (current verified instance), earlier component reference `3724:20579` | Modal / HeartChart link | `HeartChartLinkModal` — full first modal pattern composed from `HeartChartModalShell` + `HeartChartLinkCard` (`COMPONENTS.md#heartchartlinkmodal`) |
| `1903:19737` nested `_HeartChart - Church - URL` row, earlier component reference `3724:20579` | `_HeartChart - Church - URL` row | `HeartChartLinkCard` — reusable QR/URL/copy/share/download card inside the HeartChart link modal; Figma `share-04` maps to lucide `ExternalLink` for this row (`COMPONENTS.md#heartchartlinkcard`) |
| `1993:36348` and variants (`1640:23457`/`1670:36217` Growing, `1670:36549` Low, `1670:36610` Exceptional) | "HeartChart Summary" dashboard card | `HeartChartSummary` — donut/scale states, action row (`COMPONENTS.md#heartchartsummary`) |
| `Onboarding/Create Profile` (`1909:25769`) | `/create-profile` screen (full field set + pricing card) | `Card`, `Select` (`1909:25261` "Your role", `1909:25262` "Your primary goal"), `InputGroup` (`1909:25259` "Website"), `Label` required marker (e.g. `I1909:25255;7487:535320`), `BenefitListItem` (`10:6386` check-circle + instances `1909:25272`–`1909:25275`, `2852:117176`, `2852:117164`), `PricingCard` (`1909:25264`), `AmfmLogo` (`1909:25281` logo + `1909:25280` caption) — see `COMPONENTS.md` |
| `10:338` | `chevron-down` icon component | `Select`'s trailing icon (`COMPONENTS.md#select`) |
| `2065:13660` ("Sidebar navigation") | Collapsed/default `GlobalNav` rail (80px icon rail) | `GlobalNav` collapsed state (`COMPONENTS.md#globalnav`) |
| `3727:25276` ("Content") | Expanded/exposed `GlobalNav` panel (296px labeled panel) | `GlobalNav` expanded state (`COMPONENTS.md#globalnav`) |
| `3727:25279` ("Logo") | Expanded-state logo lockup | Exported directly to `public/AMFM_Expanded.svg` (paired with `public/AMFM_Collaped.svg` for the collapsed logomark) — `GlobalNav` header (`COMPONENTS.md#globalnav`) |
| `Onboarding/First run church admin` (`1909:25772`) | `/welcome` screen | `PhotoBackdrop`'s `"radial"` scrim variant, the `text-display-lg`/`text-display-2xl` typography tokens and `highlight-gold` color (`DESIGN.md`), `VideoPlayer` (node `1894:16438`, "Video player 16:9" — new, Draft), `Button` (node `1894:16263`, "Get Started" CTA — confirms the `default` variant on a dark surface with `size="lg"`, see `COMPONENTS.md#button`) |
| `HeartChart Resources` (`2361:19280`, rendered on-canvas as `3722:19475`) | `/heartchart-resources` screen | Page `<h1>` (`text-display-md`, "Page header" node `2309:20675`), `TopHero`/"Featured Training" (node `2318:26997`), `CourseCard`/"Course Card" 3-step pattern (node `2074:45130`; steps at `2316:26815`/`2316:26886`/`2318:26954`; shared step-header fill confirmed at `3926:27038`, reusing the existing `text-brand` token), `ResourceListItem` + `ElevatedCard` resource cards ("Optional Resources" `2309:20702`, "Premium Resources" — the `CardAction` CTA variant — `2309:20730`), `FooterCta` (node `1909:25789`), the page shell's `background-gradient-from`/`background-gradient-to` tokens (`DESIGN.md`) — see `COMPONENTS.md` |
| `Our Marriage Champions / Populated` (`3724:23444`) | `/marriage-champions` screen | `MarriageChampionsPageShell` (page header), `Table`, `Select`, `StatusTag`, `FellowshipOfTheParksLogo` — see `COMPONENTS.md` |
| `Our Marriage Champions / Empty` (`3724:23167`) | `/marriage-champions-empty` screen | `MarriageChampionsPageShell` (shared shell, page header), `BlurOverlay` (backdrop layer "image 54", node `3724:23178`, wrapping a decorative `Table`/`StatusTag` preview), `VideoPlayer` (node `3724:23180`, second confirmed use site), `Button size="sm"` (node `3724:23184`, "Invite Marriage Champions" — icon-leading composition, lucide's `FileBadge` matching Figma's `certificate-02`) — the "Modal / invite user" node (`3724:23382`) the button opens is not implemented in this pass — see `COMPONENTS.md` |
| `HeartChart Dashboard / premium` (`3727:29573`), `_Summary Data` region, right-hand instance | `/dashboard` hero row, WeDo card | `WeDoCard` — couple illustration exported directly to `public/We-do.png` (rendered at a fixed 186×186px); `PointerCallout`'s `"bottom-left-diagonal"` tail exported to `public/speechbubblepointer.svg`; the pull-quote's decorative quotation mark has no Figma vector reference and is implemented as lucide-react's `Quote` icon (mirrored, `text-wedo-brand`) — see `COMPONENTS.md#wedocard` and `COMPONENTS.md#pointercallout` |

## Components without a Figma reference yet

These were implemented from product requirements or generic shadcn/ui patterns rather than a specific Figma node. If a Figma reference is added later, update `figma/component-map.json`'s `figmaComponent` field and this table in the same change:

- `Card` — generic shadcn/ui primitive, no brand-specific reference yet.
- `Label` — generic shadcn/ui primitive; color token (`text-text-secondary`) sourced from the `Onboarding/login` node above.
- `GoogleIcon` — hand-authored approximation of Google's public brand mark, not sourced from the Figma file.
- `DposystemLearnMore` / `DposystemStory` — content-driven pattern authored directly from product copy, no Figma design reference.
- `DropdownMenu` — generic Radix-based primitive introduced to implement `GlobalNav`'s account menu, no Figma design reference of its own.
- `GlobalNav`'s account-card flyout menu (Personal Profile, Church Profile, Account Settings, Subscription & Billing, Terms & Privacy) — built from a screenshot supplied directly in conversation, not a Figma node.
- `WeDoCard`'s pull-quote quotation mark — the Figma frame's pull-quote box lacked its own vector/icon layer for this mark, so it's implemented as lucide-react's `Quote` icon rather than an exported asset.

## Maintenance

- When implementing a new screen from Figma, add its file/node reference here and to `figma/component-map.json` in the same change that adds the component — see `IMPLEMENTATION.md`'s Figma integration section.
- Don't leave a `figmaComponent` value stale after a design update — if the cited node no longer matches what's implemented, treat it as a signal to re-sync `DESIGN.md` / `COMPONENTS.md`, not just this file.
