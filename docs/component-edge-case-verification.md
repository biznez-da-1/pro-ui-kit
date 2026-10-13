# Component edge-case verification matrix

Use this matrix during browser and assistive-technology review. Automated typecheck, lint, and build checks do not replace these checks.

## Accessible names and labels

- [ ] Pass an empty string and a whitespace-only string to the label props of Progress, Slider, FileUpload, FilterBar, Stepper, Spinner, and Switch. Confirm each control still has a useful visible or accessible name.
- [ ] Render Checkbox with no visible label, with an empty label, and with a custom `aria-label`. Confirm the accessible name is meaningful and custom names are preserved.
- [ ] Render Tabs with an empty tablist label and a tab with an empty label. Confirm the tablist and each tab remain named.
- [ ] Render a Sidebar in expanded and collapsed modes with an empty item label. Confirm its visible text, tooltip, and accessible name remain useful.
- [ ] Render DropdownMenu and CommandMenu items with empty labels, including a submenu item. Confirm every option remains understandable to screen-reader users.
- [ ] Render Breadcrumb with empty labels and Stepper with empty step labels. Confirm current-page and step announcements remain meaningful.

## Dialogs, tooltips, and focus

- [ ] Open Dialog and Sheet with no title, an empty title, a whitespace-only title, and a description-only configuration. Confirm there are no empty heading or ID-reference announcements.
- [ ] Dismiss Dialog, Sheet, DropdownMenu, Popover, and Tooltip with Escape. Confirm only the intended overlay closes and focus returns to the appropriate trigger.
- [ ] Open a DropdownMenu or Popover inside a Dialog or Sheet. Confirm Escape closes the innermost surface first and leaves the parent open.
- [ ] Open a CommandMenu or another modal surface inside a Dialog/Sheet. Confirm Tab and Shift+Tab remain trapped in the innermost modal and do not trigger the parent focus trap.
- [ ] Open two modal surfaces, then close them in both orders. Confirm body scrolling stays locked until the final modal closes and the original overflow style is restored.
- [ ] Confirm focus stays out of hidden menus and panels after closing them.
- [ ] Move the pointer from a tooltip trigger onto the tooltip content. Confirm the tooltip remains visible until the pointer leaves the combined trigger/content area.
- [ ] Check tooltip descriptions with keyboard focus and pointer hover using at least one browser and screen reader.

## Empty, loading, and trend states

- [ ] Render ActivityFeed and Timeline with zero items and with populated items. Confirm the empty message is visible and announced once.
- [ ] Render Toast with an empty title and whitespace-only message. Confirm the announcement is still meaningful and does not contain blank message content.
- [ ] Render StatCard with positive, negative, and zero trends. Confirm zero is neutral and trend direction is conveyed without relying only on color or icons.
- [ ] Pass an `aria-hidden` override to Skeleton and a `role` or `aria-orientation` override to Separator. Confirm their documented semantics remain intact.

## Responsive and input checks

- [ ] Test all interactive components with keyboard-only navigation at desktop and narrow mobile widths.
- [ ] Verify visible focus indicators, disabled states, browser zoom, and reduced-motion settings.
- [ ] Check color contrast and validate important status announcements with a screen reader.

Record browser, operating system, assistive technology, and any failures in the PR or release notes. Do not mark a case as manually verified until it has actually been tested.
