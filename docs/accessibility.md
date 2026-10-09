# Accessibility checklist

Use this checklist before treating a component or screen as ready for production.

## Semantics and names

- Prefer native HTML elements over custom roles and keyboard emulation.
- Give every interactive control a visible label or accessible name.
- Use headings in a meaningful hierarchy and landmarks for major page regions.
- Connect form labels, descriptions, errors, tabs, dialogs, and tooltips with stable unique IDs.
- Avoid nested interactive controls, such as a button inside another button or an interactive element inside an element with `role="button"`.
- For avatars, provide a useful `alt` value when the person or entity is meaningful; use an empty value only when the avatar is decorative.

## Keyboard and focus

- Test every control with Tab, Shift+Tab, Enter, Space, and arrow keys where appropriate.
- Make keyboard focus clearly visible against both the control and page background.
- Restore focus to the trigger when dismissing a dialog-like surface with Escape.
- Confirm that Escape and outside-click behavior do not leave focus in hidden content.
- Respect reduced-motion preferences for nonessential animation and transitions.

## State and feedback

- Ensure disabled controls cannot activate and communicate their disabled state.
- Announce important status changes politely; reserve assertive alerts for urgent errors.
- Show loading, error, and empty states without relying on color alone.
- Ensure controlled components update only through their documented callbacks and that clear/reset actions are observable.

## Theme and contrast

- The current showcase and component primitives use a dark-first palette. Native form controls should follow the same color scheme.
- Verify text, icons, focus rings, disabled states, borders, and status colors against their backgrounds.
- Do not communicate success, warning, or failure by color alone.

## Manual verification still required

- Test keyboard interaction and focus restoration in a real browser.
- Check representative screens at narrow mobile widths and desktop widths.
- Verify with a screen reader and browser zoom.
- Check color contrast with an automated tool and visual review; this checklist is guidance, not a substitute for testing.
