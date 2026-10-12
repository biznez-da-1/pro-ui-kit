# Pro UI Kit

Pro UI Kit is a reusable React + TypeScript component library and interactive showcase built with Next.js and Tailwind CSS. The current showcase includes 40 UI components. The project is being prepared for production-quality reuse, with automated checks and human verification tracked separately.

## Project goals

- Consistent component APIs and design tokens
- Accessible, keyboard-friendly interactions
- Responsive examples and practical application templates
- Clear component documentation and copy-ready usage patterns
- Automated checks before release

## Requirements

- Node.js 20 or newer (CI currently uses Node.js 24)
- npm

## Local development

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

If your environment cannot use Turbopack's native bindings, start the development server with the Webpack fallback:

```bash
npm run dev -- --webpack
```

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

The CI workflow runs dependency installation, typecheck, lint, and a production build. A green CI run does not replace browser, keyboard, screen-reader, contrast, or responsive testing.

## Project structure

- `src/app`: Next.js App Router pages, layout, and global styles
- `src/components/ui`: reusable UI components and public exports
- `src/lib`: shared utilities such as Tailwind class merging
- `docs`: accessibility guidance and reusable template recipes

## Routes

- `/`: interactive component showcase
- `/product`: no-index product preview; checkout is intentionally disabled until the commercial flow is ready

## Design tokens

- [Semantic color, surface, focus, and radius tokens](./docs/design-tokens.md)

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

Check each component's props before use. Follow the documented contract instead of assuming that props from another UI library are supported.

## Templates and recipes

- [Dashboard](./docs/templates/dashboard.md)
- [Accessible form workflow](./docs/templates/form-workflow.md)
- [Loading, error, and empty states](./docs/templates/loading-error-empty-states.md)
- [Settings page](./docs/templates/settings-page.md)
- [Marketing landing page](./docs/templates/marketing-landing-page.md)
- [Accessible data table](./docs/templates/data-table.md)

## Accessibility and release readiness

- [Accessibility checklist](./docs/accessibility.md)
- [Release-readiness checklist](./docs/release-readiness.md)

Use semantic HTML, visible focus indicators, explicit form labels, keyboard-operable controls, and descriptive error messages. The component audit and CI improve the baseline, but human browser and assistive-technology validation remains necessary.

## Current release status

This repository is under active development. The showcase and component set are a foundation, not a claim that every component has completed accessibility, browser, or assistive-technology testing. Payment, licensing, and secure download delivery are not enabled. Do not advertise checkout or delivery as functional until those flows have been implemented and tested end to end.
