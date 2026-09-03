import { describe, it, expect } from 'vitest';
import { specToMarkdown } from '../../services/export/markdownExport';
import { generateMockSpec } from '../../services/ai/mockGenerator';

describe('markdownExport Service', () => {
  it('converts FeatureSpec into standard GitHub-flavored Markdown', () => {
    const spec = generateMockSpec({
      featureName: 'Exportable Spec',
      targetAudience: 'Developers',
      coreProblem: 'Markdown formatting',
      techStack: 'TypeScript',
      complexity: 'standard'
    });

    const markdown = specToMarkdown(spec);

    expect(markdown).toContain('# Exportable Spec');
    expect(markdown).toContain('## 1. Executive Summary');
    expect(markdown).toContain('## 2. User Stories & Acceptance Criteria');
    expect(markdown).toContain('**Given**');
    expect(markdown).toContain('**When**');
    expect(markdown).toContain('**Then**');
    expect(markdown).toContain('## 3. Accessibility (a11y) Blueprint (WCAG 2.1 AA)');
    expect(markdown).toContain('## 4. Edge Cases & Resilience Matrix');
  });
});