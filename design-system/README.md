# design-system/

This directory is the **documentation-content index** for the AMFM Portal design system — organized the same way the live `/design-system` route and `DESIGN.md`/`COMPONENTS.md` are, so a reader (human or AI) can navigate foundations → components → patterns → pages without re-deriving the structure each time.

It does **not** duplicate `DESIGN.md` / `COMPONENTS.md` content — those two files remain the single source of truth. Each file here is a short index that points at the authoritative section, plus the corresponding live route and Figma reference. If you find yourself copying prose from `DESIGN.md`/`COMPONENTS.md` into this directory, stop — link instead.

```
Figma Design Standards → DESIGN.md → COMPONENTS.md → React Components → /design-system Visual Validation
                              ↑              ↑
                     design-system/foundations   design-system/components
                              (indexes into the docs above)
```

**Why this directory is separate from the live route**: `/design-system` (the rendered, interactive validation page) must live under `src/app/design-system/` — that's a Next.js App Router requirement, routes can only be served from `src/app`. This top-level `design-system/` directory is the content/reference layer that mirrors the same four categories, not a second implementation of the route.

| Folder | Mirrors | Live route |
|---|---|---|
| `foundations/` | `DESIGN.md` | `/design-system/foundations` |
| `components/` | `COMPONENTS.md` | `/design-system/components` |
| `patterns/` | Cross-component compositions documented in `COMPONENTS.md` | `/design-system/patterns` |
| `pages/` | Full screens (`/`, `/login`) | `/design-system/pages` |

See `IMPLEMENTATION.md` for the rules an AI agent follows when using this structure to implement new UI.
