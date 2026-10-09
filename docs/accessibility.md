# Accessibility checklist

Use this checklist when auditing components and before calling a component release-ready. Passing a code review does not replace keyboard, screen-reader, and browser testing.

## Interactive controls
- [ ] Every control has a meaningful accessible name.
- [ ] Native HTML controls are preferred when they provide the required behavior.
- [ ] All actions work using the keyboard alone.
- [ ] Focus is visible and not obscured by sticky content or overlays.
- [ ] Disabled controls expose a real disabled state and cannot trigger actions.
- [ ] Hover-only information is also available on focus.
- [ ] Touch targets and spacing are usable on narrow screens.

## Forms
- [ ] Each field has a programmatic label.
- [ ] Help text and errors are associated with the field using `aria-describedby`.
- [ ] Invalid state is exposed with `aria-invalid`, not only a red border.
- [ ] Required fields are identified in text and programmatically.
- [ ] Validation messages explain how to correct the problem.

## Overlays and navigation
- [ ] Dialogs have unique title/description IDs, contain keyboard focus, close predictably, and restore focus.
- [ ] Menus and tabs implement expected keyboard behavior and correct ARIA relationships.
- [ ] Tooltips are connected to their trigger and can be reached without a mouse.
- [ ] Navigation landmarks and link text communicate their purpose.

## Visual and motion checks
- [ ] Meaning is not conveyed by color alone.
- [ ] Text and control contrast are checked against WCAG 2.2 AA targets.
- [ ] Layout works at 320 CSS pixels and at 200% zoom.
- [ ] Animations respect `prefers-reduced-motion`.
- [ ] Focus rings remain visible in all supported themes.

## Verification record
For each audited component, record: date, reviewer, browser/device, keyboard checks, assistive technology if available, automated test results, known limitations, and follow-up issues.
