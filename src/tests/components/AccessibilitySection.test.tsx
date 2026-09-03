import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AccessibilitySection } from '../../components/spec/AccessibilitySection';
import { generateMockSpec } from '../../services/ai/mockGenerator';

describe('AccessibilitySection Component', () => {
  const dummySpec = generateMockSpec({
    featureName: 'Test',
    targetAudience: 'Everyone',
    coreProblem: 'Accessibility',
    techStack: 'React',
    complexity: 'standard'
  });

  it('renders WCAG badge and blueprint subsections', () => {
    render(<AccessibilitySection accessibility={dummySpec.accessibility} />);

    expect(screen.getByText('WCAG 2.1 AA')).toBeInTheDocument();
    expect(screen.getByText(/keyboard navigation requirements/i)).toBeInTheDocument();
    expect(screen.getByText(/screen reader & aria blueprint/i)).toBeInTheDocument();
    expect(screen.getByText(/color contrast & visual accessibility/i)).toBeInTheDocument();
    expect(screen.getByText(/focus management & targets/i)).toBeInTheDocument();
  });
});