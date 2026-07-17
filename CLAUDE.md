@AGENTS.md

# AMFM Portal — CLAUDE.md

Guidance for Claude Code (and any other AI agent) working in this repository.

# Claude Code Project Configuration

You are the primary AI engineering assistant for this repository.

Before making any changes, read and follow:

1. `DESIGN.md` — the source of truth for all design systems, UI patterns, tokens, components, interaction rules, responsive behavior, and visual standards.
2. `CLAUDE.md` — the source of truth for engineering standards, architecture rules, coding practices, and implementation guidelines.

These documents define the project standards. Do not override them without explicit instruction.

---

# Decision Making Hierarchy

When making implementation decisions, follow this priority order:

## 1. Existing Production Patterns

Prefer existing project patterns over introducing new solutions.

Before creating new:
- components
- utilities
- architecture patterns
- state management approaches
- styling approaches
- folder structures
- API patterns
- data models

First evaluate whether the existing codebase already has a pattern that solves the requirement.

Consistency is preferred over novelty.

Never introduce a new pattern unless existing patterns cannot reasonably support the requirement.

---

## 2. DESIGN.md Requirements

`DESIGN.md` is the authoritative source for product design implementation.

All UI decisions must align with:

- Design tokens
- Component specifications
- Layout rules
- Typography standards
- Spacing systems
- Responsive behavior
- Accessibility requirements
- Interaction patterns
- Brand guidelines

If implementation conflicts with DESIGN.md, update the implementation to match DESIGN.md unless explicitly instructed otherwise.

---

## 3. CLAUDE.md Engineering Standards

All code must follow the engineering standards defined in this file.

Prioritize:

- Maintainable architecture
- Reusable components
- Clear separation of concerns
- Strong TypeScript practices
- Scalable solutions
- Clean code principles
- Secure implementation patterns
- Production readiness

Avoid shortcuts that create technical debt.

---

## 4. Accessibility Requirements

Accessibility is a core implementation requirement, not an optional enhancement.

All features must consider:

- WCAG compliance
- Semantic HTML
- Keyboard navigation
- Screen reader support
- Focus management
- Color contrast
- Form accessibility
- Reduced motion preferences
- Responsive usability

Do not sacrifice accessibility for speed or convenience.

---

## 5. Performance Considerations

Optimize when appropriate while maintaining maintainability.

Consider:

- Rendering performance
- Bundle size
- Network requests
- Image optimization
- Component re-rendering
- Data fetching patterns
- Loading states
- Code splitting opportunities

Avoid premature optimization that creates unnecessary complexity.

---

## 6. Developer Convenience

Developer convenience is the lowest priority.

Do not choose an implementation simply because it is faster to write if it:

- creates technical debt
- violates design standards
- reduces accessibility
- harms scalability
- introduces inconsistency

Optimize for long-term maintainability over short-term speed.

---

# Conflict Resolution Rules

When requirements conflict:

1. Follow the highest priority rule.
2. Document significant tradeoffs.
3. Ask for clarification when requirements cannot be reconciled.
4. Never silently create exceptions.
5. Prefer the smallest maintainable solution.

Example:

If a developer preference conflicts with DESIGN.md:
→ Follow DESIGN.md.

If a new library would simplify development but conflicts with existing architecture:
→ Follow existing architecture.

If an existing component cannot support a required accessibility improvement:
→ Improve the component rather than creating a duplicate.

---

# Implementation Philosophy

Build software as if it will be maintained by another engineering team years from now.

Every implementation should be:

- Production-ready
- Scalable
- Accessible
- Consistent
- Maintainable
- Secure
- Well-documented

Avoid:

- Quick hacks
- Duplicate components
- Temporary solutions
- Unnecessary dependencies
- One-off implementations
- Over-engineering

The goal is not simply to make the feature work.

The goal is to build the correct system.

## Production Engineering Standards

This project targets production-ready software: scalable, maintainable, accessible, secure, and performant, built to be evolved and maintained by future engineering teams — not prototype-quality code. Every section below exists in service of that goal; when a task is ambiguous, prefer the option that survives contact with a larger team and a longer timeline over the fastest thing that merely works today.

## Stack

- **Next.js 16** (App Router, Turbopack, `src/` layout)
- **TypeScript** (strict mode)
- **Tailwind CSS v4** (CSS-first config — no `tailwind.config.js`; theme lives in `src/app/globals.css`)
- **shadcn/ui** (`new-york` style, `neutral` base color) — components are vendored into `src/components/ui`, not installed as a package
- **ESLint 9** flat config (`eslint-config-next`)

Next.js 16 has real breaking changes vs. older training data. If something in `next/*` behaves unexpectedly, check `node_modules/next/dist/docs/` before assuming the API is wrong.

## Design system

**`DESIGN.md`** is the design token/convention reference (colors, type, spacing, radius, shadows, component standards) — read it before styling anything. **`/design-system`** (`src/app/design-system/page.tsx`) is a living, rendered view of the same tokens/primitives; if it and `DESIGN.md` disagree, one is stale and both need fixing in the same change. Both are derived from the Figma designs as screens are implemented — check them before adding a new color, spacing value, or primitive, since it likely already exists.

## Project structure

```
src/
  app/            # App Router routes, layouts, globals.css
  components/
    ui/           # shadcn/ui primitives (generated/vendored — see below)
  lib/
    utils.ts      # cn() and other framework-agnostic helpers
```

- New routes/pages go under `src/app`, following App Router conventions (`page.tsx`, `layout.tsx`, `loading.tsx`, `route.ts`, etc.).
- Non-UI-primitive, app-specific components go in `src/components` (not `src/components/ui`).
- Shared, non-React utilities go in `src/lib`.
- Import via the `@/*` path alias (maps to `src/*`) — never use deep relative paths like `../../../lib/utils`.

## Architecture rules

- **Server Components by default.** Only add `"use client"` when a component needs interactivity, browser APIs, or React hooks like `useState`/`useEffect`. Push client boundaries as far down the tree as possible — don't mark a whole page client just because one child needs it.
- **Data fetching happens in Server Components / route handlers**, not in `useEffect`. Don't introduce a client-side data-fetching library unless the task specifically needs it.
- **No business logic in `src/components/ui`.** Those files exist to be visual primitives matching upstream shadcn/ui source — keep them close to the original so future `shadcn` CLI-generated diffs stay easy to reconcile. Compose them into app-specific components elsewhere.
- **Colocate route-specific code** (e.g., a form only used on one page) next to the route inside `src/app/**`, using private folders (`_components`, `_lib`) rather than leaking one-off code into shared `src/components` or `src/lib`.
- Keep `next.config.ts` minimal; don't add config for a hypothetical future need.
- **Reuse before creating.** Before adding a new component, check whether an existing one in `src/components` or `src/components/ui` already covers it, and whether the pattern belongs in the design system (see Design system section above) rather than a one-off. Keep each component focused on a single responsibility, and separate data/business logic (fetching, mutations, derived state) from presentation markup rather than interleaving them in one file.

# Component Governance

The component system is a shared product foundation. Every component decision must prioritize consistency, scalability, maintainability, and reuse.

Do not create new UI components casually.

Before creating any new component, follow this governance process.

---

## Component Creation Process

Before creating a new UI component:

### 1. Search Existing Components

First inspect the existing component library and codebase.

Check:

- Existing components
- Shared UI primitives
- Design system components
- Utility components
- Existing patterns
- Similar implementations

Reuse or extend existing components whenever possible.

Do not create duplicate components that solve the same problem.

---

### 2. Check DESIGN.md Component Library

`DESIGN.md` is the source of truth for approved design system components.

Before implementation:

- Verify whether the component already exists in the design system.
- Follow documented component specifications.
- Use existing tokens, patterns, and variants.
- Maintain consistency with the approved UI language.

If a component exists in DESIGN.md but not in code:

→ Implement the documented component.

If the design requirement cannot be supported:

→ Update the system intentionally rather than creating an undocumented exception.

---

### 3. Determine If the Pattern Is Reusable

A new component should only be created when it represents a repeatable UI pattern.

Evaluate:

- Will this pattern appear more than once?
- Does it solve a common user interaction?
- Does it have consistent behavior?
- Will future features likely need this pattern?
- Does extracting it improve maintainability?

Avoid creating components for:

- One-off layouts
- Single-use decorative elements
- Temporary prototypes
- Components without reusable behavior

Prefer composition over unnecessary abstraction.

---

### 4. Document New Components in DESIGN.md

Every new reusable component must be documented in `DESIGN.md` before being considered complete.

Documentation should include:

- Component name
- Purpose
- When to use
- When not to use
- Usage guidelines
- Variants
- Properties/API expectations
- Accessibility requirements
- Responsive behavior
- Supported states
- Interaction behavior
- Content guidelines
- Examples when necessary

The design system documentation and implementation must remain synchronized.

---

# Required Component Documentation Standard

Every reusable component must define:

## Purpose

Explain:

- What problem the component solves
- Why it exists
- The intended user experience

Example:

"Provides a consistent way for users to select a single option from a predefined list."

---

## Usage Guidelines

Document:

- Appropriate use cases
- Incorrect use cases
- Content requirements
- Composition rules
- Relationship to other components

Example:

"Use this component for selecting one option. Do not use it for navigation between pages."

---

## Variants

Document all supported variations.

Examples:

- Size variations
- Visual styles
- Layout options
- Content configurations
- Behavioral differences

Avoid creating unnecessary variants.

Every variant must have a clear purpose.

---

## Accessibility Requirements

Every component must define accessibility expectations.

Consider:

- Semantic HTML requirements
- Keyboard interaction
- Screen reader behavior
- Focus management
- ARIA requirements
- Error handling
- Color contrast
- Motion preferences

Accessibility must be built into the component architecture.

---

## Responsive Behavior

Every component must define behavior across supported breakpoints.

Document:

- Mobile behavior
- Tablet behavior
- Desktop behavior
- Content wrapping rules
- Layout changes
- Interaction changes

Components must work across all supported device sizes.

---

## States

Every interactive component must define all states.

Required states include when applicable:

- Default
- Hover
- Focus
- Active
- Selected
- Disabled
- Loading
- Empty
- Error
- Success

States must be implemented consistently across the design system.

---

# Component Architecture Rules

Follow these principles:

## Prefer Extension Over Duplication

When a similar component exists:

Prefer:

- Adding a variant
- Improving the existing component
- Extending functionality

Avoid:

- Creating a second similar component
- Forking components without reason
- Copying styles between components

---

## Single Source of Truth

Reusable components must have:

- One implementation source
- Shared design tokens
- Consistent behavior
- Centralized documentation

Do not create isolated versions of shared UI patterns.

---

## Component Naming Standards

Component names must:

- Clearly communicate purpose
- Match existing naming conventions
- Avoid implementation details
- Represent user-facing concepts

Avoid vague names:

❌ Box
❌ Container2
❌ NewCard
❌ CustomThing

Prefer meaningful names:

✅ UserProfileCard
✅ AssessmentSummary
✅ NavigationMenu
✅ StatusBadge

---

# Component Quality Checklist

Before completing a new component, verify:

## Design System Alignment

☐ Exists in DESIGN.md or has been added
☐ Uses approved tokens
☐ Follows spacing and typography rules
☐ Matches established patterns

## Engineering Quality

☐ Reusable architecture
☐ Strong TypeScript typing
☐ No unnecessary duplication
☐ Clean component API
☐ Maintainable implementation

## Accessibility

☐ Keyboard accessible
☐ Screen reader compatible
☐ Proper semantic structure
☐ Focus states implemented

## Responsive Design

☐ Mobile behavior defined
☐ Tablet behavior defined
☐ Desktop behavior defined

## Documentation

☐ Purpose documented
☐ Usage documented
☐ Variants documented
☐ States documented
☐ Accessibility documented
☐ Responsive behavior documented

---

## Design System Synchronization

The implementation and DESIGN.md must remain synchronized.

When creating or modifying:

- Components
- Tokens
- Patterns
- Layout systems
- Interaction behaviors

Update DESIGN.md documentation accordingly.

No production component should exist without documented design system intent.

DESIGN.md defines what the system should be. The codebase defines how the system is implemented. Both must evolve together.

---

# Component Governance Principle

The goal is not to maximize the number of components.

The goal is to create a durable, scalable design system where every component has a clear purpose, consistent behavior, and long-term value.

When uncertain:

1. Reuse existing components.
2. Extend before creating.
3. Document before standardizing.
4. Prefer system consistency over individual implementation speed.

## Coding conventions

- **TypeScript strict mode is on — keep it that way.** No `any` unless justified with a comment explaining why a real type isn't available. Prefer precise prop types over `React.ComponentProps<'div'>`-and-spread unless building a primitive that genuinely forwards all native props (as `Button` does).
- Give explicit types/interfaces to component props, API responses, data models, app state, and config objects — don't let them fall back to inferred or loosely-typed shapes:

  ```ts
  interface UserCardProps {
    name: string
    email: string
  }
  ```
- **Styling is Tailwind utility classes**, composed with the `cn()` helper from `@/lib/utils` when merging conditional/variant classes. Don't hand-write CSS files or CSS-in-JS for things Tailwind already expresses well.
- **Variant-driven components** (things with a `variant`/`size` prop) use `class-variance-authority` (`cva`), following the pattern in `src/components/ui/button.tsx`.
- **Icons**: use `lucide-react`, matching the `iconLibrary` set in `components.json`.
- Name component files in kebab-case (`user-menu.tsx`), matching shadcn/ui convention; export the component in PascalCase.
- No default exports for components — use named exports (again, matches shadcn/ui convention and keeps refactors/renames traceable).
- Don't add comments that restate what the code does. Only comment on non-obvious constraints (e.g., a workaround, a subtle ordering requirement).

## Working with shadcn/ui in this repo

`ui.shadcn.com` is not reachable from this environment's network policy, so the `shadcn` CLI (`npx shadcn add ...`) cannot fetch new components here. When a new shadcn/ui primitive is needed:

1. Check whether it can be composed from primitives already in `src/components/ui` first.
2. If a genuinely new primitive is needed, write it by hand in `src/components/ui/<name>.tsx`, matching upstream shadcn/ui's source and conventions (Radix primitive + `cva` variants + `cn()`, `data-slot` attributes, named exports) as closely as possible, so it stays a drop-in match if the CLI is ever runnable again.
3. Register it in `components.json`'s implied structure — i.e., keep it under `src/components/ui`, not elsewhere.
4. Update `src/app/globals.css` theme tokens only if the new component needs CSS variables that don't already exist; don't invent parallel/duplicate tokens.

## Development standards

- `npm run dev` for local development, `npm run build` to verify a production build, `npm run lint` before considering a change done.
- Run `npx tsc --noEmit` for a fast typecheck when iterating on types without a full build.
- A change isn't done until `npm run lint` and `npm run build` (or `tsc --noEmit` for quick iteration) pass — don't hand back code that doesn't typecheck.
- For UI changes, actually run the dev server and look at the result (or describe explicitly that you couldn't) rather than asserting it works from reading the code.
- Don't add dependencies for something a few lines of code or an existing dependency already covers.
- Don't create new abstractions (contexts, hooks, wrapper components) for a single use site — inline it until a second real use case shows up.
- A feature isn't complete just because the happy path works. Before calling it done, confirm: responsive behavior across supported breakpoints; error, loading, and empty states are all handled (not just success); edge cases are considered; performance impact is evaluated (unnecessary re-renders, large payloads, N+1 fetches); security is reviewed (input validated at trust boundaries, no secrets/PII leaked to the client); and accessibility follows DESIGN.md's Accessibility rules (WCAG AA).

## AI collaboration instructions

- Prefer editing existing files over creating new ones; don't scatter related logic across new files when it fits naturally in an existing one.
- Don't restructure, rename, or "clean up" unrelated code while doing a focused task — keep diffs scoped to what was asked.
- When a task touches network-dependent tooling (package installs, the `shadcn` CLI, external APIs), check reachability first rather than assuming failure — but don't retry a confirmed policy-blocked host; work around it manually (as with shadcn/ui above) and say so.
- If a requested change conflicts with something in this file (e.g., asks for a Pages Router pattern, a default export, or a new config file), flag the conflict and confirm before proceeding rather than silently picking one.
- Keep this file up to date: if you introduce a new architectural pattern, a new top-level directory, or a new convention, add it here in the same change.
