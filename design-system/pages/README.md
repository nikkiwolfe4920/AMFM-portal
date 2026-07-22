# Pages

Full screens implemented from Figma, indexed with what they're built from. Rendered/validated live at **`/design-system/pages`** (linking out to the real routes — a full page isn't re-rendered inside the design system shell, since that would duplicate routing/layout concerns).

| Page | Route | Figma reference | Built from |
|---|---|---|---|
| Home | `/` | — (product copy, no dedicated Figma screen) | `PhotoBackdrop`, `Button`, `DposystemLearnMore` pattern |
| Login | `/login` | AMFM Portal file, `Onboarding/login` (`1909:25767`) | Auth card pattern (`PhotoBackdrop` + `AuthCard` + `HeartChartLogo` + `GoogleIcon` + `Button`/`Input`/`Label`/`Checkbox`) |
| Design system | `/design-system` | — (internal tooling, not a product screen) | Renders this documentation structure live |

**Adding a new page**: implement it per `IMPLEMENTATION.md`'s loop (read `DESIGN.md` → read `COMPONENTS.md` → reuse before creating → validate at `/design-system`), then add a row here with its Figma reference and the patterns/components it's built from.
