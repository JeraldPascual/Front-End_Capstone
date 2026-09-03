import type { FeatureSpec, SpecPromptInput } from '../../types/spec';

export function generateMockSpec(input: SpecPromptInput): FeatureSpec {
  const title = input.featureName || 'AI-Powered Workflow Intelligence';
  const hours = input.complexity === 'simple' ? 24 : input.complexity === 'complex' ? 96 : 48;
  const tShirt = input.complexity === 'simple' ? 'S' : input.complexity === 'complex' ? 'XL' : 'M';

  return {
    id: `spec-${Date.now()}`,
    title: title,
    tagline: `An accessible, resilient feature specification for ${input.targetAudience || 'end users'} solving ${input.coreProblem || 'core productivity workflows'}`,
    createdAt: new Date().toISOString(),
    sourceProvider: 'mock',
    executiveSummary: {
      problemStatement: input.coreProblem || 'Users spend disproportionate time manually parsing fragmented information without actionable synthesis.',
      targetPersona: input.targetAudience || 'Professional knowledge workers and frontend engineers seeking rapid workflow turnaround.',
      valueProposition: `Deliver instant, structured, and accessible insights directly in-browser using ${input.techStack || 'React and modern web technologies'}, reducing cognitive friction by over 60%.`,
      successMetrics: [
        'Average task completion latency decreased from 12 minutes to under 45 seconds',
        'System accessibility compliance achieves 100% WCAG 2.1 AA automated audit pass rate',
        'User task completion satisfaction rating >= 4.8 / 5.0 across beta cohort'
      ]
    },
    userStories: [
      {
        id: 'US-01',
        title: 'Instant Structured Feature Synthesis',
        asA: input.targetAudience || 'Product Engineer',
        iWant: 'to input raw problem statements and receive a verified, structured specification',
        soThat: 'I can initiate development sprints with zero ambiguity and pre-planned edge cases',
        priority: 'Must Have',
        status: 'planned',
        acceptanceCriteria: [
          {
            id: 'AC-01-1',
            given: 'the user enters a valid feature prompt and submits the form',
            when: 'the generation pipeline executes',
            then: 'a comprehensive specification appears with executive summary, user stories, and accessibility blueprint within 3 seconds',
            completed: false
          },
          {
            id: 'AC-01-2',
            given: 'an external network failure or rate limit occurs during processing',
            when: 'the API request fails',
            then: 'the interface gracefully notifies the user via an accessible alert and falls back to cached deterministic schema outputs without crashing',
            completed: false
          }
        ]
      },
      {
        id: 'US-02',
        title: 'Keyboard-Navigable Acceptance Criteria Tracking',
        asA: 'Frontend Developer or QA Engineer',
        iWant: 'to check off acceptance criteria and track implementation progress directly on the PRD',
        soThat: 'our cross-functional team maintains live synchronization on sprint readiness',
        priority: 'Must Have',
        status: 'in_progress',
        acceptanceCriteria: [
          {
            id: 'AC-02-1',
            given: 'the user is viewing the user stories section',
            when: 'they press the Tab key to navigate to an acceptance criterion checkbox and press Space',
            then: 'the criterion toggles completion state and updates the story progress bar with visual and screen-reader announcements',
            completed: false
          },
          {
            id: 'AC-02-2',
            given: 'the page is reloaded after modifying criteria states',
            when: 'the user returns to the document',
            then: 'all checked states persist seamlessly in local storage',
            completed: true
          }
        ]
      },
      {
        id: 'US-03',
        title: 'Multi-Format Specification Export',
        asA: 'Engineering Lead',
        iWant: 'to export the completed specification as clean Markdown or structured JSON',
        soThat: 'I can paste it immediately into GitHub Issues, Linear, or team documentation',
        priority: 'Should Have',
        status: 'planned',
        acceptanceCriteria: [
          {
            id: 'AC-03-1',
            given: 'the user has reviewed the generated PRD',
            when: 'they click the "Copy as Markdown" button',
            then: 'properly formatted GitHub-flavored markdown with task lists is copied to the system clipboard and a confirmation toast appears',
            completed: false
          },
          {
            id: 'AC-03-2',
            given: 'the user activates the browser Print command (Ctrl+P / Cmd+P)',
            when: 'the print stylesheet triggers',
            then: 'interactive controls are hidden and a clean, paginated documentation format is rendered',
            completed: false
          }
        ]
      }
    ],
    accessibility: {
      wcagLevel: 'WCAG 2.1 AA',
      keyboardNavigation: [
        'Logical tab order traversing navigation, prompt input form, story accordions, and export actions.',
        'Accessible focus trap inside modal dialogs with Escape key listener for dismissal.',
        'Space/Enter keyboard support on custom checkboxes, tabs, and collapsible panels.'
      ],
      screenReaderNotes: [
        'aria-live="polite" region announces generation milestones and status transitions.',
        'All icon-only buttons include explicit aria-label attributes.',
        'Story status tags utilize semantic role="status" and badge metadata.'
      ],
      colorContrastNotes: [
        'All primary body text maintains >= 5.2:1 contrast against dark background (#090d16 / #f1f5f9).',
        'All badge tokens and secondary labels maintain >= 4.6:1 contrast ratio.',
        'Form input borders maintain >= 3.0:1 contrast against adjacent background.'
      ],
      focusManagement: [
        'High-visibility 2px solid indigo focus ring (ring-2 ring-indigo-500 ring-offset-2) on all interactive controls.',
        'Focus automatically restored to trigger element upon modal dialog closure.'
      ]
    },
    edgeCases: [
      {
        id: 'EC-01',
        category: 'Network / Offline',
        scenario: 'User submits a prompt while offline or experiencing transient Wi-Fi drops',
        expectedBehavior: 'System catches fetch timeout, displays an accessible warning banner with retry CTA, and preserves the user draft text',
        fallbackMitigation: 'Activate local deterministic heuristic fallback generator so workflow is never blocked.'
      },
      {
        id: 'EC-02',
        category: 'Validation / Input',
        scenario: 'User submits an empty, whitespace-only, or 50,000+ character prompt string',
        expectedBehavior: 'Input validation rejects invalid inputs client-side before dispatching network requests, displaying contextual field error messages',
        fallbackMitigation: 'Enforce 10-char minimum and 5,000-char maximum bounds with live character counter.'
      },
      {
        id: 'EC-03',
        category: 'Auth & Permissions',
        scenario: 'User supplies an invalid, expired, or rate-limited API key for Claude/Gemini',
        expectedBehavior: 'Display explicit HTTP 401/429 explanation without crashing, prompting user to switch to Demo Mode or re-enter key',
        fallbackMitigation: 'Offer one-click "Switch to Instant Demo Mode" with zero downtime.'
      },
      {
        id: 'EC-04',
        category: 'Performance & Scale',
        scenario: 'Generated specification contains 25+ extensive user stories on a low-end mobile device',
        expectedBehavior: 'Virtualize or accordion-collapse sections to prevent DOM bloat and maintain 60fps scrolling',
        fallbackMitigation: 'Default user stories to compact collapsible cards with lazy rendering.'
      }
    ],
    architecture: {
      frontendPattern: 'Component-Driven Architecture with Custom Hooks & Domain Service Layer',
      stateManagement: 'React State + Custom Hook (useSpecGenerator) with LocalStorage persistence',
      apiContract: [
        'POST /api/generate-spec -> accepts { prompt, persona, stack, complexity } -> returns FeatureSpec JSON',
        'Resilient client adapter supporting Claude Messages API, Gemini generateContent, and Local Heuristic'
      ],
      performanceBudget: [
        'Initial bundle transfer < 180 kB gzipped',
        'First Contentful Paint (FCP) < 0.8s on 4G mobile emulation',
        'Interaction to Next Paint (INP) < 50ms across all interactive elements'
      ]
    },
    effortEstimation: {
      tShirtSize: tShirt,
      estimatedHours: hours,
      risks: [
        'Upstream LLM output variance requiring schema enforcement and fallback recovery',
        'Complex Gherkin syntax parsing edge cases handled via defensive parsing logic',
        'Cross-browser clipboard permissions across non-HTTPS localhost test environments'
      ]
    }
  };
}
