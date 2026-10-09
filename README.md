# Pro UI Kit

Pro UI Kit is a reusable React + TypeScript component library and interactive showcase built with Next.js and Tailwind CSS. The project currently contains 41 UI components and is being prepared for production-quality reuse.

## Project goals

- Consistent component APIs and design tokens
- Accessible, keyboard-friendly interactions
- Responsive examples and practical application templates
- Clear component documentation and copy-ready usage patterns
- Automated checks before release

## Requirements

- Node.js 20 or newer (the current project has been built with Node.js 24)
- npm

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Quality checks

```bash
npx tsc --noEmit
npm run lint
npm run build
```

If the local environment uses an Android ARM64 device where Turbopack native bindings are unavailable, use the Webpack fallback:

```bash
npm run dev -- --webpack
npm run build -- --webpack
```

## Project structure

- `src/app`: Next.js App Router pages, layout, and global styles
- `src/components/ui`: reusable UI components and public exports
- `src/lib`: shared utilities such as Tailwind class merging
- `docs`: accessibility guidance, audit notes, and template recipes

## Usage

Import components from the shared entry point when an export is available:

```tsx
import { Button, Card } from "@/components/ui";

export function Example() {
  return (
    <Card>
      <h2 className="text-lg font-semibold">Welcome</h2>
      <Button>Continue</Button>
    </Card>
  );
}
```

Check each component's props before use. Components may have different interaction requirements, and not every component has been fully audited yet.

## Accessibility

Use semantic HTML, visible focus indicators, explicit form labels, keyboard-operable controls, and descriptive error messages. Review [the accessibility checklist](./docs/accessibility.md) before treating a component as release-ready.

## Current release status

This repository is under active development. The showcase and component set are a foundation, not a claim that every component has completed accessibility, browser, or assistive-technology testing. Payment, licensing, and secure download delivery are not enabled.
