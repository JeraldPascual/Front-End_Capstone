import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EdgeCasesSection } from '../../components/spec/EdgeCasesSection';
import { generateMockSpec } from '../../services/ai/mockGenerator';

describe('EdgeCasesSection Component', () => {
  const dummySpec = generateMockSpec({
    featureName: 'Test',
    targetAudience: 'Everyone',
    coreProblem: 'Edge Cases',
    techStack: 'React',
    complexity: 'standard'
  });

  it('renders table headers and edge case rows', () => {
    render(<EdgeCasesSection edgeCases={dummySpec.edgeCases} />);

    expect(screen.getByText(/id & category/i)).toBeInTheDocument();
    expect(screen.getByText(/trigger scenario/i)).toBeInTheDocument();
    expect(screen.getByText(/expected behavior/i)).toBeInTheDocument();
    expect(screen.getByText(/fallback \/ mitigation/i)).toBeInTheDocument();
    expect(screen.getByText('EC-01')).toBeInTheDocument();
  });
});