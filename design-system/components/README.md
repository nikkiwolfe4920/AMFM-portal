# Components

Index into `COMPONENTS.md`'s component entries. Full contracts (anatomy, variants, states, props, tokens, accessibility, responsive behavior, Figma reference, status) live in `COMPONENTS.md` — this is a navigation aid, not a copy. Rendered/validated live at **`/design-system/components`**.

| Component | `COMPONENTS.md` entry | Source | Status |
|---|---|---|---|
| Button | [Button](../../COMPONENTS.md#button) | `src/components/ui/button.tsx` | Production Ready (branch Button-token/size changes under active visual audit) |
| Input | [Input](../../COMPONENTS.md#input) | `src/components/ui/input.tsx` | Production Ready |
| HelperText | [HelperText](../../COMPONENTS.md#helpertext) | `src/components/ui/helper-text.tsx` | Production Ready |
| InputGroup | [InputGroup](../../COMPONENTS.md#inputgroup) | `src/components/ui/input-group.tsx` | Production Ready |
| Select | [Select](../../COMPONENTS.md#select) | `src/components/ui/select.tsx` | Production Ready |
| Label | [Label](../../COMPONENTS.md#label) | `src/components/ui/label.tsx` | Production Ready |
| Checkbox | [Checkbox](../../COMPONENTS.md#checkbox) | `src/components/ui/checkbox.tsx` | Production Ready |
| PasswordRequirementItem | [PasswordRequirementItem](../../COMPONENTS.md#passwordrequirementitem) | `src/app/signup/_components/password-requirement-item.tsx` | Production Ready |
| SignupSuccess | [SignupSuccess](../../COMPONENTS.md#signupsuccess) | `src/app/signup/_components/signup-success.tsx` | Draft |
| BenefitListItem | [BenefitListItem](../../COMPONENTS.md#benefitlistitem) | `src/app/create-profile/_components/benefit-list-item.tsx` | Production Ready |
| ResourceListItem | [ResourceListItem](../../COMPONENTS.md#resourcelistitem) | `src/components/resource-list-item.tsx` | Production Ready |
| ElevatedCard | [ElevatedCard](../../COMPONENTS.md#elevatedcard) | `src/components/elevated-card.tsx` | Production Ready |
| TopHero | [TopHero](../../COMPONENTS.md#tophero) | `src/components/top-hero.tsx` | Draft |
| CourseCard | [CourseCard](../../COMPONENTS.md#coursecard) | `src/components/course-card.tsx` | Draft |
| FooterCta | [FooterCta](../../COMPONENTS.md#footercta) | `src/components/footer-cta.tsx` | Draft |
| Card | [Card](../../COMPONENTS.md#card) | `src/components/ui/card.tsx` | Production Ready |
| Dialog | [Dialog](../../COMPONENTS.md#dialog) | `src/components/ui/dialog.tsx` | Production Ready |
| HeartChartModalShell | [HeartChartModalShell](../../COMPONENTS.md#heartchartmodalshell) | `src/components/heartchart-modal-shell.tsx` | Draft |
| HeartChartLinkCard | [HeartChartLinkCard](../../COMPONENTS.md#heartchartlinkcard) | `src/components/heartchart-link-card.tsx` | Draft |
| HeartChartLinkModal | [HeartChartLinkModal](../../COMPONENTS.md#heartchartlinkmodal) | `src/components/heartchart-link-modal.tsx` | Draft |
| PhotoBackdrop | [PhotoBackdrop](../../COMPONENTS.md#photobackdrop) | `src/components/photo-backdrop.tsx` | Production Ready |
| AuthCard | [AuthCard](../../COMPONENTS.md#authcard) | `src/app/login/_components/auth-card.tsx` | Production Ready |
| HeartChartLogo | [HeartChartLogo](../../COMPONENTS.md#heartchartlogo) | `src/app/login/_components/heartchart-logo.tsx` | Production Ready |
| GoogleIcon | [GoogleIcon](../../COMPONENTS.md#googleicon) | `src/app/login/_components/google-icon.tsx` | Production Ready |
| AmfmLogo | [AmfmLogo](../../COMPONENTS.md#amfmlogo) | `src/app/create-profile/_components/amfm-logo.tsx` | Draft |
| DposystemLearnMore | [DposystemLearnMore](../../COMPONENTS.md#dposystemlearnmore) | `src/app/_components/dposystem-learn-more.tsx` | Production Ready |
| DposystemStory | [DposystemStory](../../COMPONENTS.md#dposystemstory) | `src/app/_components/dposystem-story.tsx` | Production Ready |
| HeartChartSummary | [HeartChartSummary](../../COMPONENTS.md#heartchartsummary) | `src/components/heartchart-summary.tsx` | Draft |
| PricingCard | [PricingCard](../../COMPONENTS.md#pricingcard) | `src/app/create-profile/_components/pricing-card.tsx` | Production Ready |
| DropdownMenu | [DropdownMenu](../../COMPONENTS.md#dropdownmenu) | `src/components/ui/dropdown-menu.tsx` | Production Ready |
| GlobalNav | [GlobalNav](../../COMPONENTS.md#globalnav) | `src/components/global-nav.tsx` | Draft (some routes and avatar photo are placeholders) |
| VideoPlayer | [VideoPlayer](../../COMPONENTS.md#videoplayer) | `src/components/video-player.tsx` | Draft |
| Table | [Table](../../COMPONENTS.md#table) | `src/components/ui/table.tsx` | Draft |
| StatusTag | [StatusTag](../../COMPONENTS.md#statustag) | `src/components/ui/status-tag.tsx` | Draft |
| MarriageChampionsPageShell | [MarriageChampionsPageShell](../../COMPONENTS.md#marriagechampionspageshell) | `src/components/marriage-champions-page-shell.tsx` | Draft |
| FellowshipOfTheParksLogo | [FellowshipOfTheParksLogo](../../COMPONENTS.md#fellowshipoftheparkslogo) | `src/components/fellowship-of-the-parks-logo.tsx` | Draft |
| BlurOverlay | [BlurOverlay](../../COMPONENTS.md#bluroverlay) | `src/components/blur-overlay.tsx` | Draft |

See `figma/component-map.json` for each component's Figma reference and `figma/figma-links.md` for the human-readable version.

**Adding a new component**: add its full contract to `COMPONENTS.md`, a row to this table, and an entry to `figma/component-map.json` in the same change that adds the code — see `IMPLEMENTATION.md`.
