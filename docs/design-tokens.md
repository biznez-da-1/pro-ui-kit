# Semantic design tokens

Pro UI Kit uses CSS custom properties for design decisions that should stay consistent across components. The default theme is dark to match the current showcase. A light palette is available by setting `data-theme="light"` on the root `html` element; no theme toggle or persistence mechanism is included yet.

## Available tokens

| Meaning | Tailwind class | CSS variable |
| --- | --- | --- |
| Page background | `bg-background` | `--background` |
| Main text | `text-foreground` | `--foreground` |
| Muted surface | `bg-muted` | `--muted` |
| Muted text | `text-muted-foreground` | `--muted-foreground` |
| Card/surface | `bg-surface` | `--surface` |
| Text on surface | `text-surface-foreground` | `--surface-foreground` |
| Border | `border-border` | `--border` |
| Primary action | `bg-primary` | `--primary` |
| Text on primary | `text-primary-foreground` | `--primary-foreground` |
| Success / warning / danger | `text-success`, `text-warning`, `text-danger` | `--success`, `--warning`, `--danger` |
| Focus ring | `ring-ring` | `--ring` |
| Standard radius | `rounded-ui` | `--radius` |

## Example

```tsx
export function SurfaceExample() {
  return (
    <section className="rounded-ui border border-border bg-surface p-6 text-surface-foreground">
      <p className="text-sm text-muted-foreground">Project status</p>
      <h2 className="mt-2 text-xl font-semibold">Ready for review</h2>
      <button className="mt-4 rounded-ui bg-primary px-4 py-2 text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        Review project
      </button>
    </section>
  );
}
```

## Theme selection

To render the optional light palette, set the root attribute:

```html
<html lang="en" data-theme="light">
```

The app does not currently ship a theme switcher, local-storage persistence, or system-preference toggle. Add those deliberately if needed, and avoid reading browser-only state during server rendering in a way that causes hydration mismatches.

## Rules of use

- For keyboard-operable controls, use `focus-visible` styles with the semantic `ring-ring` color and a visible offset where appropriate.
- Prefer semantic tokens over hard-coded palette values in new reusable components.
- Keep text, icons, borders, disabled states, and focus indicators distinguishable in both themes.
- Do not rely on color alone to communicate success, warning, or failure.
- Check contrast with a contrast tool and test both themes in a browser before claiming full theme accessibility.
- Existing components still contain palette-specific utility classes; this token layer is a migration foundation, not a claim that every component has been converted.
