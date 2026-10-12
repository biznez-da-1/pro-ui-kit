# Release-readiness checklist

Use this checklist before describing Pro UI Kit as production-ready or publishing a paid release.

## Repository and build

- [ ] Latest change set is isolated in a reviewable pull request.
- [ ] `npm ci` completes from the committed lockfile.
- [ ] `npm run typecheck`, `npm run lint`, and `npm run build` pass on the final commit.
- [ ] No unresolved build or runtime errors remain.
- [ ] Dependency audit findings are reviewed and documented; breaking upgrades are tested rather than forced.

## Component quality

- [ ] Public exports and prop contracts match the documentation.
- [ ] Every interactive control has an accessible name and visible keyboard focus.
- [ ] Keyboard operation, Escape behavior, focus management, and focus restoration are checked for overlays.
- [ ] Labels, descriptions, errors, and status updates are announced appropriately.
- [ ] Disabled states and reduced-motion preferences are respected.
- [ ] Empty, loading, error, success, and disabled states are covered where relevant.
- [ ] IDs remain unique when multiple instances render on the same page.

## Human verification

- [ ] Test the showcase in a real browser at mobile, tablet, and desktop widths.
- [ ] Test 200% zoom and keyboard-only navigation.
- [ ] Run a screen-reader pass on forms, navigation, menus, dialogs, and status feedback.
- [ ] Check text and control contrast with an actual contrast checker.
- [ ] Check console errors and hydration warnings.
- [ ] Verify links, copy actions, and all interactive demos work as described.

## Commercial release

- [ ] The sales page states exactly what is included and what is not.
- [ ] Pricing, licensing terms, refund policy, support expectations, and contact information are reviewed.
- [ ] Checkout and download delivery are implemented and tested end to end before being advertised as available.
- [ ] Secrets stay server-side; no secret values are committed to source control.
- [ ] Any customer data collection has a documented purpose, privacy notice, access controls, and retention plan.
- [ ] Deployment settings are reviewed separately and changed only with explicit approval.

A checked CI run is evidence for automated checks only. It is not proof of browser, accessibility, security, payment, or download-delivery readiness.
