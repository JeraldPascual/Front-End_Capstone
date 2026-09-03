import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../../components/error/ErrorBoundary';

describe('ErrorBoundary Component', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Normal Content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Normal Content')).toBeInTheDocument();
  });

  it('catches render errors and renders accessible alert UI', () => {
    const ProblemChild = () => {
      throw new Error('Simulated UI crash');
    };

    // Suppress console.error in test output for intentional throw
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary fallbackTitle="Application Crash Intercepted">
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Application Crash Intercepted')).toBeInTheDocument();
    expect(screen.getByText('Simulated UI crash')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reload application/i })).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});