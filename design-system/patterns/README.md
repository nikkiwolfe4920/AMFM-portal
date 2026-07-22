# Patterns

Cross-component compositions — where multiple primitives from `components/` combine into a recurring, named interaction. Rendered/validated live at **`/design-system/patterns`**.

| Pattern | Composed from | `COMPONENTS.md` entries | Used on |
|---|---|---|---|
| Auth card | `PhotoBackdrop` + `AuthCard` + `HeartChartLogo` + `Button`/`Input`/`Label`/`Checkbox` | [PhotoBackdrop](../../COMPONENTS.md#photobackdrop), [AuthCard](../../COMPONENTS.md#authcard) | `/login` |
| Learn-more dialog | `Dialog` + `DposystemLearnMore` + `DposystemStory` | [Dialog](../../COMPONENTS.md#dialog), [DposystemLearnMore](../../COMPONENTS.md#dposystemlearnmore), [DposystemStory](../../COMPONENTS.md#dposystemstory) | `/` |
| Story carousel | `DposystemStory`'s ARIA carousel region + snap-scroll + keyboard nav | [DposystemStory](../../COMPONENTS.md#dposystemstory) | `/` (inside the Learn-more dialog) |
| Responsive grid | Tailwind grid utilities per `DESIGN.md`'s Grid system table | [Layout/grid rules](../../DESIGN.md#layoutgrid-rules) | Not yet used on a live page — reference pattern for future dashboard/list screens |

**A pattern belongs here, not just in code**, when it recurs or is likely to recur across more than one screen (see the Component Creation Process in `CLAUDE.md` — "will this pattern appear more than once?"). A one-off layout stays colocated with its route and doesn't need an entry here.
