# AMFM Portal

A [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), built around an AI-ready design system pipeline:

```
Figma Design Standards → DESIGN.md → COMPONENTS.md → React Components → /design-system Visual Validation
```

## Design system docs

| File / folder | Purpose |
|---|---|
| [`DESIGN.md`](./DESIGN.md) | Design foundations — brand principles, visual language, tokens, layout/grid, breakpoints, motion, accessibility standards |
| [`COMPONENTS.md`](./COMPONENTS.md) | Component contracts — anatomy, variants, states, props, tokens, accessibility, responsive behavior, Figma reference, status |
| [`IMPLEMENTATION.md`](./IMPLEMENTATION.md) | AI implementation loop and non-negotiables |
| [`design-system/`](./design-system) | Documentation-content index mirroring foundations/components/patterns/pages |
| [`figma/`](./figma) | Figma file/node references (`figma-links.md`) and the machine-readable component map (`component-map.json`) |
| `/design-system` (running app) | Live, rendered visual validation of `DESIGN.md`/`COMPONENTS.md` — see `src/app/design-system/` |
| [`CLAUDE.md`](./CLAUDE.md) / [`AGENTS.md`](./AGENTS.md) | Engineering standards and AI agent guidance for this repo |

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
