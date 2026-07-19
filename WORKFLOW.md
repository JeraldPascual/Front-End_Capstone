# WORKFLOW.md — Vague vs. Precise Prompting Drill

## Setup

- **Round 1** (`round1-vague`): single sentence, no context, fresh session — *"build me a settings form with validation."* Output accepted without iteration.
- **Round 2** (`round2-precise`): fresh session, CLAUDE.md pasted in, explicit field list, validation rules, accessibility requirements, an example interaction, and an explicit verification step ("write it, then write a self-check test panel and show it passing").

## Correctness

Round 1 validates presence only (`required`), plus a same-page `alert()` for password mismatch. It never checks email format beyond the browser's native `type="email"` pattern, and never checks password strength — `a@b` and `password` both pass. Round 2's validators are pure functions (`validateName`, `validateEmail`, `validatePassword`, `validateConfirmPassword`) with explicit rules (2–50 char name, RFC-lite email regex, 8-char + 1-digit password, optional-but-must-match confirm field), and are exercised directly by a self-check panel — 15 known valid/invalid cases, all passing.

**Mistake caught in round 1:** it re-validates nothing after the first submit — if you fix the password mismatch and resubmit, there's no re-check until you hit submit again, and the only feedback channel is a blocking `alert()` that vanishes with no persisted error state. There's no re-validation on blur at all; a user could tab through every field wrong and get zero feedback until submit.

## Accessibility

Round 1 fails basic requirements: no `<label>` elements (placeholder-only, which disappears on focus and isn't announced reliably by all screen readers), no `aria-invalid`, no `aria-describedby`, no live region — the only error path is a blocking native `alert()`. Round 2 pairs every input with `htmlFor`/`id`, sets `aria-invalid` per field, links errors via `aria-describedby`, and announces changes through `aria-live="polite"` regions that persist in the DOM (not a dismissible dialog).

## Edge Cases

Round 1 doesn't handle: empty password on a "settings" form (should be optional — a user isn't always changing their password), whitespace-only names, or malformed-but-technically-valid-looking emails. Round 2 explicitly treats password as optional (empty confirm+password pair validates clean, only enforces rules once the user starts typing one), trims name input before length checks, and validates confirm-password reactively when password changes after confirm was already touched.

## Review Effort

Round 1 took ~2 minutes to generate and looked done at a glance — that's the trap. Actually reviewing it for the gaps above (no labels, no live errors, weak validation) took longer than round 2's full read-through, because round 1's problems are omissions you have to go looking for, not things staring at you in the diff. Round 2 took longer to prompt and generate, but the review was faster and more mechanical: read the validator functions, cross-check them against the spec, confirm the test panel's 15 cases actually pass. **Net: round 2 was slower to produce, faster to trust.**

## Takeaway

A vague prompt doesn't fail loudly — it produces something that runs, looks plausible, and quietly fails accessibility and edge-case handling in ways that only show up under review or in production. The cost of vagueness shows up in review time, not generation time.
