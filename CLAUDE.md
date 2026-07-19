# CLAUDE.md

Guidelines for any AI assistant (Claude Code, Cursor, etc.) working in this repository.

## Context

This repo is the workspace for the FlyRank AI Internship, Front-end AI Engineering track.
The track's evaluation criteria center on three things: a working responsive interface,
a clean and honest process for how AI was used to build it, and a reviewable Git history.
Treat all three as first-class deliverables, not just the final UI.

## Tech Stack

Default stack, in order of preference:

- Vanilla JS / HTML / CSS: baseline for small pages, isolated components, or anywhere framework
  overhead isn't justified.
- React: for componentized UI, state-driven views, or anything beyond a few static pages.
- Tailwind CSS: utility-first styling; prefer Tailwind classes over hand-written CSS unless a
  specific effect requires custom CSS that Tailwind can't express cleanly.

### Optional additions

Bring these in only when the task actually needs them, and note why in the commit message:

- Three.js: 3D/WebGL visuals, hero animations, product viewers.
- Framer Motion: polished micro-interactions and page transitions.
- shadcn/ui or Radix primitives: accessible component scaffolding on top of Tailwind.
- Any other library: justify the addition before adding it; don't accumulate dependencies by default.

## Working Conventions

- Commits: Conventional Commits format only (feat, fix, docs, chore, refactor, style, test).
  One logical change per commit; write the message as if a reviewer who wasn't in the room
  needs to understand what changed and why.
- AI-assisted work: use AI for scaffolding, variants, and critique, but review, test, and
  understand every change before committing it. Be able to explain what AI generated versus
  what was rewritten by hand.
- Responsiveness: mobile-first. Verify layouts at common breakpoints (375px, 768px, 1024px+)
  before considering a view finished.
- Accessibility: semantic HTML, sufficient color contrast, and keyboard navigability are not
  optional polish; they are part of "done."
- No unexplained scope creep: if the assistant proposes a new dependency, pattern, or file
  structure, it should state the tradeoff in one line before applying it.

## Lessons from AI-Prompting Drills

### FE Foundations — vague vs. precise prompt (round1-vague vs round2-precise)

A single-sentence prompt produced code that ran and looked done, but silently failed
accessibility and validation completeness — the gaps only surfaced on manual review, not
at a glance. Concrete rules from that diff:

- Forms never rely on `alert()` or native `required` popups for validation feedback;
  errors render inline, tied to the input via `aria-describedby`, inside an
  `aria-live="polite"` region that persists in the DOM.
- Every `<input>` has a `<label>` linked by `htmlFor`/`id`. Placeholder text is never
  the sole field identifier.
- Validation logic is written as pure functions separate from the component that
  renders them, so it can be exercised by a test panel or test suite without touching
  the DOM.

See `WORKFLOW.md` for the full comparison.

## What "done" looks like

- Code runs with no console errors.
- Layout is responsive and matches the intended design at mobile and desktop widths.
- README reflects the current state of the project, not just the initial scaffold.
- Commit history tells a clean, reviewable story of how the project was built.
