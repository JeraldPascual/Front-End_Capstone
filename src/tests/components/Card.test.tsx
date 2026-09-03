import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '../../components/common/Card';

describe('Card Component', () => {
  it('renders title, subtitle and children', () => {
    render(
      <Card title="Architecture Blueprint" subtitle="System components">
        <p>Core architecture details</p>
      </Card>
    );

    expect(screen.getByText('Architecture Blueprint')).toBeInTheDocument();
    expect(screen.getByText('System components')).toBeInTheDocument();
    expect(screen.getByText('Core architecture details')).toBeInTheDocument();
  });

  it('renders headerAction when provided', () => {
    render(
      <Card title="Status" headerAction={<button>Action</button>}>
        <div>Content</div>
      </Card>
    );

    expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument();
  });
});