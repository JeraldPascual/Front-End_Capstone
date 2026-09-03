import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserStoriesSection } from '../../components/spec/UserStoriesSection';
import { generateMockSpec } from '../../services/ai/mockGenerator';

describe('UserStoriesSection Component', () => {
  const dummySpec = generateMockSpec({
    featureName: 'Test Feature',
    targetAudience: 'Product Team',
    coreProblem: 'Tracking stories',
    techStack: 'React',
    complexity: 'standard'
  });

  it('renders all stories and progress bar', () => {
    const handleToggle = vi.fn();
    const handleUpdateStatus = vi.fn();

    render(
      <UserStoriesSection
        stories={dummySpec.userStories}
        onToggleCriterion={handleToggle}
        onUpdateStatus={handleUpdateStatus}
      />
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText('US-01')).toBeInTheDocument();
    expect(screen.getByText('US-02')).toBeInTheDocument();
    expect(screen.getByText('US-03')).toBeInTheDocument();
  });

  it('triggers onToggleCriterion when an acceptance criteria checkbox is clicked', () => {
    const handleToggle = vi.fn();
    const handleUpdateStatus = vi.fn();

    render(
      <UserStoriesSection
        stories={dummySpec.userStories}
        onToggleCriterion={handleToggle}
        onUpdateStatus={handleUpdateStatus}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);

    fireEvent.click(checkboxes[0]);
    expect(handleToggle).toHaveBeenCalled();
  });

  it('allows changing story status via select dropdown', () => {
    const handleToggle = vi.fn();
    const handleUpdateStatus = vi.fn();

    render(
      <UserStoriesSection
        stories={dummySpec.userStories}
        onToggleCriterion={handleToggle}
        onUpdateStatus={handleUpdateStatus}
      />
    );

    const statusSelects = screen.getAllByRole('combobox');
    fireEvent.change(statusSelects[0], { target: { value: 'completed' } });

    expect(handleUpdateStatus).toHaveBeenCalledWith('US-01', 'completed');
  });
});