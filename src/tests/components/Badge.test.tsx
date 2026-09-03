import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '../../components/common/Badge';

describe('Badge Component', () => {
  it('renders variant text and role="status"', () => {
    render(<Badge variant="Must Have">Must Have</Badge>);
    const badge = screen.getByRole('status');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('Must Have');
  });

  it('renders completed status variant', () => {
    render(<Badge variant="completed">Completed</Badge>);
    const badge = screen.getByRole('status');
    expect(badge.className).toContain('text-emerald-300');
  });

  it('renders wcag variant', () => {
    render(<Badge variant="wcag">WCAG 2.1 AA</Badge>);
    const badge = screen.getByRole('status');
    expect(badge.className).toContain('text-indigo-300');
  });
});