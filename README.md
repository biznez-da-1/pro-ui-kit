# Pro UI Kit

A dark-themed UI component showcase built with Next.js, React, TypeScript, Tailwind CSS, and Lucide icons. The home page presents interactive examples of reusable interface components, including form controls, navigation, overlays, feedback, and data-display primitives.

## Requirements

- Node.js 24
- npm

## Run locally

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run typecheck
npm run test --if-present
npm run lint
npm run build
npm audit --audit-level=moderate
```

The CI workflow runs these checks on pull requests and pushes to the configured development branches. Dependency-audit failures are blocking.

## Component library

Reusable components are exported from `src/components/ui/index.ts`. The showcase and live examples are in `src/app/page.tsx`; global styles and root metadata are in `src/app/globals.css` and `src/app/layout.tsx`.

## Project scope

This repository currently contains a component showcase and reusable UI primitives. It does not currently expose application API routes or a backend service.
