# Pro UI Kit contribution rules

## Scope and safety
- Work only in this repository. Do not modify the separate Biznez-D-1 project.
- Never merge pull requests. Open a draft PR for each completed batch and wait for the owner's approval.
- Do not change Vercel settings or add payment, licensing, or customer-data integrations without explicit approval.
- Prefer small, reviewable changes. Preserve existing public component APIs unless a bug or accessibility issue requires a documented change.

## Quality requirements
- Use TypeScript and keep props typed.
- Prefer semantic HTML and native controls.
- Every interactive control must be keyboard operable, have a visible focus state, and expose an accessible name.
- Connect labels, descriptions, errors, tabs, dialogs, and tooltips to their controls using stable unique IDs.
- Respect disabled states and reduced-motion preferences where animation is introduced.
- Keep responsive layouts usable at narrow widths and do not rely on color alone to convey meaning.
- Add usage examples and document important limitations when changing component behavior.

## Verification
- Inspect affected files before editing.
- Run the available type-check, lint, and production-build commands when an execution environment is available.
- Never claim tests passed unless they were actually run.
- Summarize changed files, checks run, known limitations, and manual testing still needed in every draft PR.
