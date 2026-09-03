# Engineering Reflection — Capstone Portfolio

**Project:** SpecForge AI — Production-Ready AI Product Feature & Spec Studio  
**Author:** Jerald A. Pascual  
**Track:** FlyRank Frontend & AI Engineering Internship  
**Date:** September 3, 2026  

---

### 1. What Was Hardest? Why?

The hardest challenge in building SpecForge AI was **bridging the gap between nondeterministic LLM outputs and strict, accessible frontend UI requirements**. 

In conventional web development, API responses follow predictable, fixed schemas. When integrating LLMs (Claude 3.5 Sonnet and Gemini 2.0 Flash) to output complex, multi-tiered JSON (executive summaries, nested Gherkin user stories with acceptance criteria, WCAG blueprints, and edge cases), LLMs occasionally introduce unexpected markdown fences, truncated tokens, or slight schema hallucinations under load or rate limits.

Resolving this required implementing defensive resilience at multiple levels (FE-07):
1. **Defensive Schema Parsing:** Creating robust regex sanitization to strip unexpected markdown wrapping and fallback JSON extractors.
2. **Deterministic Heuristic Fallback Engine:** Designing an offline fallback generator that guarantees reviewers and users receive a fully functional, deep specification even when API keys are omitted, expired, or network connections drop.
3. **Dynamic Accessible State Synchronization:** When user stories contain checkable criteria that recalculate progress bars and story statuses live, managing keyboard navigation (`Tab`, `Space`, `Enter`) without breaking screen reader announcements (`aria-live`, `aria-labelledby`) required meticulous component architecture.

---

### 2. What Would You Do Differently Next Time?

If starting this project fresh, I would **implement streaming partial JSON parsing with optimistic UI scaffolding from day one**.

Currently, SpecForge AI waits for the upstream LLM to generate the entire PRD before rendering the completed view. While simulated stage milestones (`analyzing`, `drafting_stories`, `evaluating_edge_cases`, `finalizing`) provide clear visual feedback, streaming partial tokens—parsing each user story as it finishes generating—would reduce perceived latency to under 300 milliseconds. 

Additionally, I would decouple the export engine to integrate directly with the GitHub and Linear GraphQL APIs using Web Cryptography and OAuth tokens, allowing engineering teams to create epic issue trees with a single click rather than copying markdown to the clipboard.

---

### 3. One Thing Learned That Surprised Me

What surprised me most was **how significantly accessibility-first design improves overall code architecture and developer ergonomics**.

Earlier in the internship, accessibility (FE-05, FE-10) often felt like a checklist to verify at the very end of development. While implementing SpecForge AI, treating accessibility as a primary architectural constraint—ensuring visible focus rings, minimum 44px touch targets, explicit `aria-labelledby` linkages, and full keyboard-operability—actually forced cleaner component boundaries, simpler state models, and better testability.

Writing automated component tests with Vitest and `@testing-library/react` became remarkably intuitive because querying by accessible roles (`getByRole('button')`, `getByLabelText()`, `getByRole('alert')`) mirrors exactly how real users interact with the software. Accessibility isn't an extra burden; it is the ultimate forcing function for high-quality software engineering.