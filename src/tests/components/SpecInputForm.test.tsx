import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SpecInputForm } from '../../components/spec/SpecInputForm';

describe('SpecInputForm Component', () => {
  const defaultStatus = {
    isLoading: false,
    stage: 'idle' as const,
    error: null,
    usedFallback: false
  };

  it('renders all form input fields and preset pills', () => {
    const handleGenerate = vi.fn();
    render(<SpecInputForm onGenerate={handleGenerate} status={defaultStatus} />);

    expect(screen.getByLabelText(/feature or initiative name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/target audience/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/core problem/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/target tech stack/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generate specification/i })).toBeInTheDocument();
  });

  it('validates minimum length and displays alert when feature name is empty', () => {
    const handleGenerate = vi.fn();
    render(<SpecInputForm onGenerate={handleGenerate} status={defaultStatus} />);

    const submitBtn = screen.getByRole('button', { name: /generate specification/i });
    fireEvent.click(submitBtn);

    expect(screen.getByRole('alert')).toHaveTextContent(/feature name is required/i);
    expect(handleGenerate).not.toHaveBeenCalled();
  });

  it('populates fields when a preset pill is clicked and submits valid data', () => {
    const handleGenerate = vi.fn();
    render(<SpecInputForm onGenerate={handleGenerate} status={defaultStatus} />);

    const presetBtn = screen.getByRole('button', { name: /\+ ai meeting & doc synthesizer/i });
    fireEvent.click(presetBtn);

    expect(screen.getByLabelText(/feature or initiative name/i)).toHaveValue('AI Meeting & Doc Synthesizer');

    const submitBtn = screen.getByRole('button', { name: /generate specification/i });
    fireEvent.click(submitBtn);

    expect(handleGenerate).toHaveBeenCalledWith(
      expect.objectContaining({
        featureName: 'AI Meeting & Doc Synthesizer',
        complexity: 'standard'
      })
    );
  });
});