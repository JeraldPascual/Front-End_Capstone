import { describe, it, expect } from 'vitest';
import { generateMockSpec } from '../../services/ai/mockGenerator';

describe('mockGenerator Service', () => {
  it('generates a complete specification with all required schema fields', () => {
    const spec = generateMockSpec({
      featureName: 'AI Voice Command Center',
      targetAudience: 'Motorists',
      coreProblem: 'Hands-free navigation',
      techStack: 'React',
      complexity: 'standard'
    });

    expect(spec.title).toBe('AI Voice Command Center');
    expect(spec.executiveSummary.problemStatement).toContain('Hands-free navigation');
    expect(spec.userStories.length).toBeGreaterThanOrEqual(3);
    expect(spec.accessibility.wcagLevel).toBe('WCAG 2.1 AA');
    expect(spec.edgeCases.length).toBeGreaterThanOrEqual(4);
    expect(spec.effortEstimation.tShirtSize).toBe('M');
  });

  it('adjusts t-shirt size based on complexity parameter', () => {
    const simpleSpec = generateMockSpec({
      featureName: 'Simple Form',
      targetAudience: 'Users',
      coreProblem: 'Form entry',
      techStack: 'HTML',
      complexity: 'simple'
    });
    expect(simpleSpec.effortEstimation.tShirtSize).toBe('S');

    const complexSpec = generateMockSpec({
      featureName: 'Distributed Canvas',
      targetAudience: 'Users',
      coreProblem: 'Canvas sync',
      techStack: 'WebSockets',
      complexity: 'complex'
    });
    expect(complexSpec.effortEstimation.tShirtSize).toBe('XL');
  });
});