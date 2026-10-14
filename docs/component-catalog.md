# Component catalog

Pro UI Kit exports these reusable components from `@/components/ui`. This catalog is a quick map, not a substitute for each component's TypeScript props or the accessibility and release-readiness checklists.

## Foundations

| Component | Purpose | Source |
|---|---|---|
| Badge | Compact status or category label with semantic visual variants. | [Badge.tsx](../src/components/ui/Badge.tsx) |
| Button | Native button with consistent variants, sizes, and focus styling. | [Button.tsx](../src/components/ui/Button.tsx) |
| Card | Surface container with optional header, title, description, content, and footer helpers. | [Card.tsx](../src/components/ui/Card.tsx) |
| Separator | Horizontal or vertical visual divider with orientation semantics. | [Separator.tsx](../src/components/ui/Separator.tsx) |
| Skeleton | Decorative loading placeholder. | [Skeleton.tsx](../src/components/ui/Skeleton.tsx) |
| Spinner | Loading indicator with a status label. | [Spinner.tsx](../src/components/ui/Spinner.tsx) |

## Forms and input

| Component | Purpose | Source |
|---|---|---|
| Checkbox | Checkbox input with a custom visual treatment and label support. | [Checkbox.tsx](../src/components/ui/Checkbox.tsx) |
| Input | Styled native text input with error styling. | [Input.tsx](../src/components/ui/Input.tsx) |
| RadioGroup | Single-choice radio group with descriptions and orientation support. | [RadioGroup.tsx](../src/components/ui/RadioGroup.tsx) |
| SearchInput | Search field with optional clear action and controlled/uncontrolled behavior. | [SearchInput.tsx](../src/components/ui/SearchInput.tsx) |
| Select | Styled native select input. | [Select.tsx](../src/components/ui/Select.tsx) |
| Slider | Native range input with value display and controlled/uncontrolled support. | [Slider.tsx](../src/components/ui/Slider.tsx) |
| Switch | Switch-style checkbox with label support. | [Switch.tsx](../src/components/ui/Switch.tsx) |
| Textarea | Styled native multiline text input with error styling. | [Textarea.tsx](../src/components/ui/Textarea.tsx) |
| FileUpload | File picker and drag-and-drop target with type/size feedback. | [FileUpload.tsx](../src/components/ui/FileUpload.tsx) |
| FilterBar | Select-based filtering controls with an optional clear action. | [FilterBar.tsx](../src/components/ui/FilterBar.tsx) |

## Navigation and disclosure

| Component | Purpose | Source |
|---|---|---|
| Accordion | Single- or multi-expand disclosure panels. | [Accordion.tsx](../src/components/ui/Accordion.tsx) |
| Breadcrumb | Breadcrumb trail with current-page semantics and custom separators. | [Breadcrumb.tsx](../src/components/ui/Breadcrumb.tsx) |
| Navbar | Responsive top navigation with a collapsible mobile menu. | [Navbar.tsx](../src/components/ui/Navbar.tsx) |
| Sidebar | Collapsible side navigation with active-item support. | [Sidebar.tsx](../src/components/ui/Sidebar.tsx) |
| Stepper | Multi-step progress/navigation indicator. | [Stepper.tsx](../src/components/ui/Stepper.tsx) |
| Tabs | Keyboard-navigable tab list and associated panels. | [Tabs.tsx](../src/components/ui/Tabs.tsx) |

## Overlays and commands

| Component | Purpose | Source |
|---|---|---|
| Dialog | Modal dialog with focus management, Escape handling, and focus restoration. | [Dialog.tsx](../src/components/ui/Dialog.tsx) |
| DropdownMenu | Menu actions with keyboard navigation and nested submenus. | [DropdownMenu.tsx](../src/components/ui/DropdownMenu.tsx) |
| Popover | Anchored content surface with outside-click and Escape dismissal. | [Popover.tsx](../src/components/ui/Popover.tsx) |
| Sheet | Side- or edge-aligned dialog surface with focus management. | [Sheet.tsx](../src/components/ui/Sheet.tsx) |
| Tooltip | Supplemental text shown on trigger focus or pointer hover. | [Tooltip.tsx](../src/components/ui/Tooltip.tsx) |
| CommandMenu | Searchable command list with keyboard navigation. | [CommandMenu.tsx](../src/components/ui/CommandMenu.tsx) |

## Data, feedback, and status

| Component | Purpose | Source |
|---|---|---|
| ActivityFeed | Timestamped activity entries with list semantics and an empty state. | [ActivityFeed.tsx](../src/components/ui/ActivityFeed.tsx) |
| Alert | Persistent status message with info, success, warning, and error variants. | [Alert.tsx](../src/components/ui/Alert.tsx) |
| EmptyState | Empty-content message with optional icon and action. | [EmptyState.tsx](../src/components/ui/EmptyState.tsx) |
| Progress | Progress bar with clamped values and accessible text. | [Progress.tsx](../src/components/ui/Progress.tsx) |
| StatCard | Metric card with description and positive, negative, or neutral trend. | [StatCard.tsx](../src/components/ui/StatCard.tsx) |
| Timeline | Ordered timeline events with optional date, icon, description, and status. | [Timeline.tsx](../src/components/ui/Timeline.tsx) |
| Toast | Dismissible status notification with urgency based on variant. | [Toast.tsx](../src/components/ui/Toast.tsx) |

## Content and utilities

| Component | Purpose | Source |
|---|---|---|
| Avatar | Circular image with accessible-name and fallback handling. | [Avatar.tsx](../src/components/ui/Avatar.tsx) |
| CodeBlock | Code display with language/filename metadata and a copy action. | [CodeBlock.tsx](../src/components/ui/CodeBlock.tsx) |
| CopyButton | Clipboard action with success and failure feedback. | [CopyButton.tsx](../src/components/ui/CopyButton.tsx) |
| Kbd | Inline keyboard-key label. | [Kbd.tsx](../src/components/ui/Kbd.tsx) |
| PricingCard | Plan/price card with feature list and optional call to action. | [PricingCard.tsx](../src/components/ui/PricingCard.tsx) |

## Related guidance

- [Design tokens](./design-tokens.md)
- [Accessibility checklist](./accessibility.md)
- [Component edge-case verification matrix](./component-edge-case-verification.md)
- [Release-readiness checklist](./release-readiness.md)

For exact prop types, required fields, defaults, and behavior, use the source file linked in each row. Automated checks do not replace browser, keyboard, screen-reader, contrast, and responsive verification.
