import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ExportBar } from '../../components/spec/ExportBar';
import { generateMockSpec } from '../../services/ai/mockGenerator';

describe('ExportBar Component', () => {
  const dummySpec = generateMockSpec({
    featureName: 'Test Feature',
    targetAudience: 'Engineers',
    coreProblem: 'Testing PRDs',
    techStack: 'React',
    complexity: 'standard'
  });

  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined)
      }
    });
  });

  it('renders copy, download, and print buttons', () => {
    const handleNotification = vi.fn();
    render(<ExportBar spec={dummySpec} onNotification={handleNotification} />);

    expect(screen.getByRole('button', { name: /copy specification as markdown/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /download specification as json/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /print or save as pdf/i })).toBeInTheDocument();
  });

  it('copies markdown to clipboard on click', async () => {
    const handleNotification = vi.fn();
    render(<ExportBar spec={dummySpec} onNotification={handleNotification} />);

    const copyBtn = screen.getByRole('button', { name: /copy specification as markdown/i });
    fireEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});