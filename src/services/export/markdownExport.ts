import type { FeatureSpec } from '../../types/spec';

export function specToMarkdown(spec: FeatureSpec): string {
  const storiesMd = spec.userStories
    .map((story) => {
      const criteriaMd = story.acceptanceCriteria
        .map((ac) => `  - [${ac.completed ? 'x' : ' '}] **Given** ${ac.given}\n    **When** ${ac.when}\n    **Then** ${ac.then}`)
        .join('\n');

      return `### ${story.id}: ${story.title}
- **Priority:** ${story.priority}
- **Status:** ${story.status}
- **As a** ${story.asA}
- **I want** ${story.iWant}
- **So that** ${story.soThat}

#### Acceptance Criteria
${criteriaMd}
`;
    })
    .join('\n');

  const edgeCasesMd = spec.edgeCases
    .map(
      (ec) =>
        `| **${ec.id}** (${ec.category}) | ${ec.scenario} | ${ec.expectedBehavior} | ${ec.fallbackMitigation} |`
    )
    .join('\n');

  const kbNav = spec.accessibility.keyboardNavigation.map((k) => `- ${k}`).join('\n');
  const srNotes = spec.accessibility.screenReaderNotes.map((s) => `- ${s}`).join('\n');
  const contrast = spec.accessibility.colorContrastNotes.map((c) => `- ${c}`).join('\n');
  const focus = spec.accessibility.focusManagement.map((f) => `- ${f}`).join('\n');

  const metrics = spec.executiveSummary.successMetrics.map((m) => `- ${m}`).join('\n');
  const apiContracts = spec.architecture.apiContract.map((a) => `- \`${a}\``).join('\n');
  const perfBudgets = spec.architecture.performanceBudget.map((p) => `- ${p}`).join('\n');
  const risks = spec.effortEstimation.risks.map((r) => `- ${r}`).join('\n');

  return `# ${spec.title}
> *${spec.tagline}*
*Generated: ${new Date(spec.createdAt).toLocaleDateString()} | Provider: ${spec.sourceProvider}*

---

## 1. Executive Summary

### Problem Statement
${spec.executiveSummary.problemStatement}

### Target Persona
${spec.executiveSummary.targetPersona}

### Value Proposition
${spec.executiveSummary.valueProposition}

### Success Metrics
${metrics}

---

## 2. User Stories & Acceptance Criteria

${storiesMd}

---

## 3. Accessibility (a11y) Blueprint (${spec.accessibility.wcagLevel})

### Keyboard Navigation
${kbNav}

### Screen Reader & ARIA
${srNotes}

### Color Contrast
${contrast}

### Focus Management
${focus}

---

## 4. Edge Cases & Resilience Matrix

| Category & ID | Scenario | Expected Behavior | Fallback Mitigation |
| :--- | :--- | :--- | :--- |
${edgeCasesMd}

---

## 5. Technical Architecture

- **Frontend Pattern:** ${spec.architecture.frontendPattern}
- **State Management:** ${spec.architecture.stateManagement}

### API Contracts
${apiContracts}

### Performance Budgets
${perfBudgets}

---

## 6. Effort Estimation & Risks

- **T-Shirt Sizing:** ${spec.effortEstimation.tShirtSize}
- **Estimated Hours:** ~${spec.effortEstimation.estimatedHours} hrs

### Identified Risks
${risks}
`;
}
