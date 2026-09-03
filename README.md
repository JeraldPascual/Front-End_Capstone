# SpecForge AI — Production-Ready AI Product Feature & Spec Studio

[![Vitest Tests](https://img.shields.io/badge/tests-33%20passed-brightgreen.svg)](https://github.com/JeraldPascual/Front-End_Capstone)
[![Coverage](https://img.shields.io/badge/coverage-81%25%20lines-success.svg)](https://github.com/JeraldPascual/Front-End_Capstone)
[![WCAG 2.1 AA](https://img.shields.io/badge/accessibility-WCAG%202.1%20AA-blue.svg)](https://github.com/JeraldPascual/Front-End_Capstone)
[![Deployment](https://img.shields.io/badge/deployment-Vercel%20Production-black.svg)](https://specforge-ai.vercel.app)

> **FlyRank Capstone Portfolio Project**
> *Author:* **Jerald A. Pascual**
> *Live Application:* [specforge-ai.vercel.app](https://specforge-ai.vercel.app)
> *Repository:* [github.com/JeraldPascual/Front-End_Capstone](https://github.com/JeraldPascual/Front-End_Capstone)

---

## 1. Project Brief

**SpecForge AI** is an accessible, production-grade frontend application designed for solo founders, product managers, and agile frontend engineers who suffer from "blank page syndrome" and fragmented requirements during sprint planning. By taking a high-level product concept or problem statement, SpecForge AI employs structured LLM orchestration (Anthropic Claude 3.5 Sonnet and Google Gemini 2.0 Flash) coupled with a deterministic heuristic fallback engine to synthesize an engineering-ready Product Requirement Document (PRD). The resulting specification includes Gherkin-formatted acceptance criteria (`Given-When-Then`) that can be tracked interactively, comprehensive WCAG 2.1 AA accessibility blueprints, defensive edge-case failure matrices (FE-07), and one-click markdown exports for Jira, Linear, or GitHub Issues. This project was chosen because while AI text generators create generic prose, frontend engineers require actionable, accessible, and structured technical artifacts they can immediately code against.

---

## 2. Live Deployed Application

- **Production URL:** [https://specforge-ai.vercel.app](https://specforge-ai.vercel.app) *(Deployable to Vercel in 1 click)*
- **Status:** Functional, live production build (not a mockup or wireframe).
- **Accessibility Status:** Fully verified against WCAG 2.1 AA standards (zero violations on automated axe-core & manual keyboard audits).

---

## 3. Quickstart & Run Instructions (< 3 minutes)

The application includes an **Instant Deterministic Demo Mode**, meaning anyone cloning the repository can build, test, and run the complete AI experience immediately without needing to supply paid API keys.

```bash
# 1. Clone repository
git clone https://github.com/JeraldPascual/Front-End_Capstone.git
cd Front-End_Capstone

# 2. Install dependencies (Node 18+ required)
npm install

# 3. Start local development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Optional: Running with Live Claude or Gemini API Keys
You can configure live LLM generation either by:
1. Clicking **"AI Settings"** in the top navigation bar and pasting your Anthropic Claude or Google Gemini key (persisted safely in browser `localStorage`).
2. Creating a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   # Add VITE_ANTHROPIC_API_KEY or VITE_GEMINI_API_KEY
   ```

---

## 4. Architecture Overview

SpecForge AI is built with React 19, TypeScript, and Tailwind CSS v4, adhering to component-driven design and single-responsibility principles.

```
src/
├── types/
│   └── spec.ts                 # Domain types (FeatureSpec, UserStory, AccessibilitySpec, EdgeCase)
├── services/
│   ├── ai/
│   │   ├── prompts.ts          # System prompt enforcing strict JSON schema & Gherkin rules
│   │   ├── mockGenerator.ts    # Deterministic heuristic generator for instant demo / offline mode
│   │   ├── claudeClient.ts     # Direct Anthropic Messages API client with schema extraction
│   │   ├── geminiClient.ts     # Google AI Studio Gemini 2.0 Flash API client
│   │   └── aiService.ts        # Orchestration layer with validation & graceful FE-07 fallback
│   └── export/
│       └── markdownExport.ts   # Converts structured JSON into clean GitHub/Linear Markdown
├── hooks/
│   ├── useLocalStorage.ts      # Type-safe persistent browser storage
│   └── useSpecGenerator.ts     # Central business logic hook (generation, criteria toggling, history)
├── components/
│   ├── common/                 # Accessible primitives (Button, Card, Badge, Modal, Toast)
│   ├── layout/                 # Structural shell (Header, Footer, SkipLink)
│   ├── spec/                   # Feature views (SpecInputForm, UserStories, EdgeCases, a11y, Architecture)
│   ├── settings/               # ApiKeyModal for multi-model configuration
│   └── error/                  # ErrorBoundary for fail-safe runtime crash interception
└── tests/                      # 15 Vitest test suites with 33 passing tests
```

### Data Flow Diagram

```
[ User Input / Preset ] ──> [ SpecInputForm ]
                                    │
                                    ▼
                         [ aiService.ts Orchestrator ]
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          ▼                         ▼                         ▼
   [ Claude API ]             [ Gemini API ]         [ Mock Engine ]
   (claude-3-5-sonnet)      (gemini-2.0-flash)     (deterministic offline)
          │                         │                         │
          └─────────────────────────┴─────────────────────────┘
                                    │ (JSON Schema Validation & Fallback Catch)
                                    ▼
                        [ useSpecGenerator Hook ]
                                    │
                                    ▼
                         [ SpecViewer Component ]
               ┌────────────────────┼────────────────────┐
               ▼                    ▼                    ▼
       [ User Stories ]     [ a11y Blueprint ]   [ Edge Case Matrix ]
       (Gherkin checkboxes) (WCAG 2.1 AA specs)  (defensive mitigations)
```

---

## 5. AI Integration Explained

### Why an LLM?
Traditional code generators produce boilerplate without business context, while generic chatbots provide unformatted conversational essays that cannot be imported into issue trackers. SpecForge AI uses the LLM as a **Technical Product Architect**: it maps high-level human problem statements into a strictly structured JSON schema containing:
1. **Measurable Success Metrics** (3+ quantifiable KPIs).
2. **Gherkin User Stories** (`Given [precondition] When [action] Then [outcome]`).
3. **Accessibility Architecture** (ARIA live regions, focus trap guidelines, contrast tokens).
4. **Defensive Failure Modes** (offline, invalid inputs, auth drops, rate limits).

### System Prompt Engineering
The system prompt in `src/services/ai/prompts.ts` strictly forbids conversational conversational filler and markdown wrapping, mandating 100% adherence to a recursive TypeScript-aligned JSON schema:

```text
You are a Principal Product Architect and Staff Frontend Engineer specializing in accessible, resilient web applications.
Your role is to transform unstructured feature ideas into comprehensive, engineering-ready Product Requirement Documents (PRDs).
You MUST output strictly valid JSON conforming exactly to the schema...
- Each user story MUST contain at least 2 Given-When-Then acceptance criteria in strict Gherkin format.
- Edge cases MUST include concrete fallback mitigations, never vague advice.
- Accessibility MUST specify concrete WCAG 2.1 AA rules (4.5:1 text contrast, 3:1 graphical contrast, aria-expanded/aria-controls, 44x44px touch targets).
```

### Resilience & Safe Failure (FE-07)
If an upstream LLM times out, rate-limits (HTTP 429), or returns corrupted JSON, `aiService.ts` catches the exception, dispatches an accessible warning banner, and seamlessly activates the **Deterministic Heuristic Generator**. The user's prompt is preserved and an actionable PRD is delivered with zero runtime application crash.

---

## 6. Accessibility & Performance (FE-05, FE-10)

SpecForge AI was designed mobile-first and accessibility-first:
- **Skip Link:** Accessible `SkipLink` component at the top of the DOM allowing keyboard users to jump straight to `#main-content`.
- **Keyboard Navigation:** 100% operable via keyboard alone (`Tab`, `Shift+Tab`, `Space`, `Enter`, and `Escape` for modal dialogs).
- **Focus Management:** Visible high-contrast focus rings (`outline: 2px solid #6366f1; outline-offset: 2px`).
- **Touch Targets:** All buttons and interactive elements maintain `>= 44x44px` touch targets per WCAG 2.1 Success Criterion 2.5.5.
- **Color Contrast:** All body text meets or exceeds a **4.5:1** contrast ratio against `#090d16` background; all interactive borders exceed **3.0:1**.
- **Screen Reader Support:** Dynamic stage transitions use `aria-live="polite"`, all icon-only buttons include explicit `aria-label`, and dialogs employ `role="dialog"` and `aria-modal="true"`.

---

## 7. Testing Evidence (FE-09)

The project includes unit and component tests written in **Vitest** and **@testing-library/react**, measuring code coverage via `@vitest/coverage-v8`.

### Test Execution Command
```bash
npm run test
npm run test:coverage
```

### Coverage Report Summary
```
 % Coverage report from v8
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------|---------|----------|---------|---------|-------------------
All files          |   79.42 |    69.56 |   80.64 |   81.05 |
 components/common |     100 |    86.66 |     100 |     100 |
  Button.tsx       |     100 |    91.66 |     100 |     100 | 61
  Card.tsx         |     100 |    81.25 |     100 |     100 | 24-27
 components/error  |   66.66 |    83.33 |      75 |   66.66 |
  ...rBoundary.tsx |   66.66 |    83.33 |      75 |   66.66 | 30-32
 components/spec   |   73.11 |    63.63 |   68.57 |   74.71 |
  ...esSection.tsx |     100 |       50 |     100 |     100 | 49
  ExportBar.tsx    |      48 |       50 |      40 |      50 | 23,28-38,43
  ...InputForm.tsx |      75 |       50 |      50 |   77.14 | 69-70,139-198
  ...esSection.tsx |   85.71 |       80 |   76.92 |   88.23 | 21,102
 services/ai       |   78.87 |     62.5 |     100 |   83.33 |
  aiService.ts     |    67.5 |    53.84 |     100 |   74.28 | 50-64
  claudeClient.ts  |   91.66 |       75 |     100 |   91.66 | 36
  geminiClient.ts  |    92.3 |       75 |     100 |    92.3 | 37
  mockGenerator.ts |     100 |    68.18 |     100 |     100 | 4,11-28
-------------------|---------|----------|---------|---------|-------------------

=============================== Coverage summary ===============================
Statements   : 79.42% ( 166/209 )
Branches     : 69.56% ( 96/138 )
Functions    : 80.64% ( 50/62 )
Lines        : 81.05% ( 154/190 )
================================================================================
Test Files  15 passed (15)
Tests       33 passed (33)
```

---

## 8. Known Limitations & Future Improvements

1. **Streaming Token Generation:** Currently, specifications are generated as atomic structured JSON payloads to guarantee schema validation before rendering. Streaming partial JSON objects with a progressive parser is planned for v2.
2. **Issue Tracker Direct Integration:** While one-click copy to GitHub/Linear markdown is fully functional, direct OAuth-based creation of Linear tickets via their GraphQL API would eliminate manual pasting.
3. **Multi-Persona Collaboration:** PRDs are saved to browser `localStorage`. Real-time multi-user syncing via Supabase Realtime or WebSockets will allow teams to collaborate simultaneously.

---

## 9. Deliverable Documents

- [Deployment Checklist (FE-11)](./DEPLOYMENT_CHECKLIST.md)
- [Performance & Accessibility Audit Report](./AUDIT_REPORT.md)
- [Engineering Reflection](./REFLECTION.md)
