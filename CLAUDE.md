@AGENTS.md

# AMFM Portal — CLAUDE.md

Guidance for Claude Code (and any other AI agent) working in this repository.

# Claude Code Project Configuration

You are the primary AI engineering assistant for this repository.

Before making any changes, read and follow:

1. `DESIGN.md` — the source of truth for design foundations: brand principles, visual language, tokens, layout/grid, breakpoints, motion, and accessibility standards.
2. `COMPONENTS.md` — the source of truth for component contracts: anatomy, variants, states, props, tokens used, accessibility, responsive behavior, Figma reference, and status for every component.
3. `IMPLEMENTATION.md` — the AI-facing implementation loop and non-negotiables for turning the above into code.
4. `CLAUDE.md` — the source of truth for engineering standards, architecture rules, coding practices, and implementation guidelines.

These documents define the project standards, in the pipeline `Figma Design Standards → DESIGN.md → COMPONENTS.md → React Components → /design-system Visual Validation`. Do not override them without explicit instruction.

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

# AI Collaboration Rules

Claude Code is an AI engineering collaborator responsible for helping build production-quality software. All implementation decisions must prioritize system consistency, maintainability, and long-term product quality, per the Decision Making Hierarchy above.

---

## Before Implementing Changes

Before writing code:

1. Understand the existing architecture and identify impacted systems and dependencies.
2. Review relevant documentation — `CLAUDE.md`, `DESIGN.md`, `PRODUCT.md`, `PRD.md`, and `RESEARCH.md` when applicable.
3. Determine whether existing patterns can support the requirement.
4. Explain the proposed implementation approach when significant architectural decisions are required.
5. Confirm assumptions when requirements are unclear.

Do not implement without first understanding the existing system.

---

## Implementation Behavior

Claude should:

- Prefer existing patterns over new approaches.
- Reuse existing components and utilities.
- Maintain consistency with established architecture.
- Preserve existing functionality.
- Make the smallest maintainable change necessary.
- Consider downstream impact before modifying shared systems.

---

## Avoid

Do not:

- Rewrite large sections of the application unnecessarily.
- Introduce dependencies without justification.
- Remove existing functionality without approval.
- Create duplicate components or patterns.
- Replace established architecture without evaluating alternatives.
- Make assumptions about product requirements without documenting the evidence (see `RESEARCH.md`).

---

## AI Decision Principle

Optimize for:

- Long-term maintainability
- System consistency
- Production quality
- Developer experience
- User experience

The goal is not simply to complete tasks.

The goal is to improve the product system responsibly.

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
- **Tailwind CSS v4** (CSS-first config — no `tailwind.config.js`; theme tokens live in `src/tokens/*.css`, imported into `src/app/globals.css`)
- **shadcn/ui** (`new-york` style, `neutral` base color) — components are vendored into `src/components/ui`, not installed as a package
- **ESLint 9** flat config (`eslint-config-next`)

Next.js 16 has real breaking changes vs. older training data. If something in `next/*` behaves unexpectedly, check `node_modules/next/dist/docs/` before assuming the API is wrong.

## Design system

This repo implements an AI-ready design system pipeline: `Figma Design Standards → DESIGN.md → COMPONENTS.md → React Components → /design-system Visual Validation`.

- **`DESIGN.md`** — design foundations only (brand principles, visual language, color/type/spacing/radius/shadow tokens, layout/grid, breakpoints, motion, accessibility standards, interaction principles). Read it before styling anything.
- **`COMPONENTS.md`** — the component behavior contract (anatomy, variants, states, props, tokens used, accessibility, responsive behavior, Figma reference, status) for every component in `src/components`. Read it before creating or modifying a component.
- **`IMPLEMENTATION.md`** — the AI implementation loop and non-negotiables tying the above together.
- **`/design-system`** (`src/app/design-system/{foundations,components,patterns,pages}`) is the living, rendered visual validation layer for `DESIGN.md` and `COMPONENTS.md` — it renders the actual tokens and primitives, not a description of them. If it disagrees with either file, one is stale and both need fixing in the same change.
- **`design-system/`** (repo root) is a documentation-content index mirroring the same four categories — it links into `DESIGN.md`/`COMPONENTS.md` rather than duplicating them; see `design-system/README.md`.
- **`figma/component-map.json`** and **`figma/figma-links.md`** hold the Figma file/node references cited throughout `DESIGN.md`/`COMPONENTS.md`.

All of the above are derived from the Figma designs as screens are implemented — check them before adding a new color, spacing value, or primitive, since it likely already exists.

## Project structure

```
src/
  app/            # App Router routes, layouts, globals.css
    design-system/  # /design-system: foundations, components, patterns, pages subroutes
  components/
    ui/           # shadcn/ui primitives (generated/vendored — see below)
  tokens/         # colors.css, typography.css, spacing.css, radius.css, shadows.css, motion.css
                  # — imported into globals.css, maps 1:1 to DESIGN.md's Design tokens section
  lib/
    utils.ts      # cn() and other framework-agnostic helpers
```

- New routes/pages go under `src/app`, following App Router conventions (`page.tsx`, `layout.tsx`, `loading.tsx`, `route.ts`, etc.).
- Non-UI-primitive, app-specific components go in `src/components` (not `src/components/ui`).
- Shared, non-React utilities go in `src/lib` — this is the established location; don't introduce a parallel `src/utils`.
- Design tokens go in `src/tokens/*.css`, imported into `src/app/globals.css` — this is Tailwind v4's CSS-first config split across files, not a parallel token system; see `DESIGN.md`.
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

### 2. Check COMPONENTS.md Component Library

`COMPONENTS.md` is the source of truth for approved design system components; `DESIGN.md` holds the underlying tokens those components consume.

Before implementation:

- Verify whether the component already exists in `COMPONENTS.md`.
- Follow the documented component contract (anatomy, variants, states, props).
- Use existing tokens (from `DESIGN.md`/`src/tokens`), patterns, and variants.
- Maintain consistency with the approved UI language.

If a component exists in COMPONENTS.md but not in code:

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

### 4. Document New Components in COMPONENTS.md

Every new reusable component must be documented in `COMPONENTS.md` before being considered complete.

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

☐ Exists in COMPONENTS.md or has been added
☐ Uses approved tokens (DESIGN.md / src/tokens)
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

The implementation, `DESIGN.md`, and `COMPONENTS.md` must remain synchronized.

When creating or modifying:

- Components → update `COMPONENTS.md`
- Tokens, layout systems, motion, accessibility principles → update `DESIGN.md`
- Patterns → update `COMPONENTS.md` and `design-system/patterns/README.md`
- Interaction behaviors → update `DESIGN.md`'s Interaction principles and the relevant `COMPONENTS.md` entry's States

No production component should exist without documented design system intent, validated live at `/design-system`.

`DESIGN.md` defines the foundations the system is built from. `COMPONENTS.md` defines what each component should be. The codebase defines how the system is implemented. All three must evolve together — see `IMPLEMENTATION.md`.

---

# Component Governance Principle

The goal is not to maximize the number of components.

The goal is to create a durable, scalable design system where every component has a clear purpose, consistent behavior, and long-term value.

When uncertain:

1. Reuse existing components.
2. Extend before creating.
3. Document before standardizing.
4. Prefer system consistency over individual implementation speed.

---

# Testing Standards

Production software requires appropriate testing coverage to ensure reliability, maintainability, and confidence during development.

Testing is a required part of feature completion.

---

# Testing Requirements

All production features should include appropriate testing based on complexity and user impact.

Testing considerations include:

- Unit tests for business logic
- Component tests for reusable UI components
- Integration tests for critical workflows
- End-to-end tests for important user journeys

---

# Feature Completion Requirements

Before considering a feature complete, verify:

- Expected behavior works correctly
- Error states are handled
- Loading states are handled
- Empty states are handled
- Accessibility behavior is tested
- Responsive behavior is tested
- Edge cases are considered

---

# Testing Principles

Prioritize:

- Confidence over speed
- Automated verification over manual assumptions
- Critical user journeys over superficial coverage
- Maintainable tests over excessive testing

Tests should protect the system from regressions while remaining easy to understand and maintain.

---

# Security Standards

Security is a core requirement of production software.

All implementation decisions must consider data protection, application security, and safe engineering practices.

---

# Security Requirements

Never:

- Expose secrets or credentials
- Hardcode API keys
- Store sensitive information insecurely
- Store sensitive user data unnecessarily on the client
- Bypass authentication or authorization controls
- Disable security protections for convenience

---

# Always

- Use environment variables for secrets
- Validate all user inputs
- Sanitize user-generated content
- Follow secure coding practices
- Review third-party dependencies
- Follow OWASP security principles

---

# Security Review

Before production release, consider:

- Authentication security
- Authorization rules
- Data exposure risks
- Input validation
- Dependency vulnerabilities
- API security
- Client-side security concerns

Security must be considered throughout development, not added afterward.

---

# Git Standards

Git workflow standards ensure maintainable collaboration, traceability, and safe deployment practices.

---

# Branch Strategy

Use:

- main = production branch
- Feature branches = active development

All changes should be developed through appropriate branches before reaching production.

---

# Commit Requirements

Commits should:

- Have clear descriptive messages
- Represent logical units of work
- Avoid unrelated changes
- Keep history understandable

Avoid:

- Large unclear commits
- Temporary experiments
- Debug code
- Unfinished implementations

---

# Pull Request Requirements

Pull requests should include:

- Summary of changes
- Reason for implementation
- Screenshots for UI changes
- Testing performed
- Known limitations or considerations

Changes should be reviewed for quality, consistency, and production readiness before merging.

---

# Deployment Standards

Production deployment requires verification that the application is stable, secure, accessible, and ready for users.

---

# Production Deployment Checklist

Before deployment verify:

## Build

- Production build succeeds
- No build errors exist
- Dependencies are valid
- Environment configuration is correct

## Application Quality

Verify:

- Core user flows work
- Error handling exists
- Loading states work
- Empty states work
- Responsive behavior works
- Accessibility requirements are met

## Performance

Review:

- Page performance
- Bundle size impact
- Image optimization
- Network requests
- Rendering behavior

## Production Configuration

Confirm:

- Environment variables are configured
- Monitoring is enabled
- Error tracking is configured
- Analytics are configured when required

---

# Deployment Principle

A successful deployment is not simply code reaching production.

A successful deployment means the product is reliable, maintainable, secure, and ready for users.

---

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
4. Update the relevant `src/tokens/*.css` file only if the new component needs CSS variables that don't already exist; don't invent parallel/duplicate tokens. Add the component's contract to `COMPONENTS.md` in the same change.

## Development standards

- `npm run dev` for local development, `npm run build` to verify a production build, `npm run lint` before considering a change done.
- Run `npx tsc --noEmit` for a fast typecheck when iterating on types without a full build.
- A change isn't done until `npm run lint` and `npm run build` (or `tsc --noEmit` for quick iteration) pass — don't hand back code that doesn't typecheck.
- For UI changes, actually run the dev server and look at the result (or describe explicitly that you couldn't) rather than asserting it works from reading the code.
- Don't add dependencies for something a few lines of code or an existing dependency already covers.
- Don't create new abstractions (contexts, hooks, wrapper components) for a single use site — inline it until a second real use case shows up.
- A feature isn't complete just because the happy path works. Before calling it done, confirm: responsive behavior across supported breakpoints; error, loading, and empty states are all handled (not just success); edge cases are considered; performance impact is evaluated (unnecessary re-renders, large payloads, N+1 fetches); security is reviewed (input validated at trust boundaries, no secrets/PII leaked to the client); and accessibility follows DESIGN.md's Accessibility standards (WCAG AA).

## AI collaboration instructions

- Prefer editing existing files over creating new ones; don't scatter related logic across new files when it fits naturally in an existing one.
- Don't restructure, rename, or "clean up" unrelated code while doing a focused task — keep diffs scoped to what was asked.
- When a task touches network-dependent tooling (package installs, the `shadcn` CLI, external APIs), check reachability first rather than assuming failure — but don't retry a confirmed policy-blocked host; work around it manually (as with shadcn/ui above) and say so.
- If a requested change conflicts with something in this file (e.g., asks for a Pages Router pattern, a default export, or a new config file), flag the conflict and confirm before proceeding rather than silently picking one.
- Keep this file up to date: if you introduce a new architectural pattern, a new top-level directory, or a new convention, add it here in the same change.

# Product Development Governance

## Product Documentation System

This project uses dedicated product documentation files to maintain alignment between research, strategy, requirements, design, and engineering.

The following files are considered the source of truth:

- RESEARCH.md → User research and evidence
- PRODUCT.md → Product strategy and direction
- PRD.md → Feature requirements and execution details

If these files do not exist, create the required file structure before major product work begins.

Do not invent product decisions, user needs, or requirements without documenting the assumptions and evidence.

---

# RESEARCH.md

## Purpose

RESEARCH.md is the source of truth for:

- User research
- Customer insights
- Behavioral evidence
- User pain points
- Validated assumptions
- Research findings
- Experiment results
- Product discovery insights

All user-centered product decisions should reference evidence documented in RESEARCH.md.

---

## Research Documentation Rules

Before adding research insights:

Document:

- Research objective
- Research method
- Target users
- Date conducted
- Key findings
- Behavioral observations
- User quotes (when available)
- Confidence level
- Product implications

Example structure:

```md
# Research Study Name

## Objective

What are we trying to understand?

## Method

How was research conducted?

## Participants

Who was involved?

## Findings

Key observations.

## Evidence

Supporting data, quotes, analytics, or observations.

## Product Impact

How this influences decisions.
```
