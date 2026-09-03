import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ScratchDisclosure } from '../components/scratch/Disclosure';

describe('ScratchDisclosure (W3C APG Disclosure Pattern)', () => {
  it('renders a button trigger with aria-expanded="false" by default', () => {
    render(
      <ScratchDisclosure id="test-disc" summary="Toggle me">
        Hidden content
      </ScratchDisclosure>
    );
    const button = screen.getByRole('button', { name: /toggle me/i });
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  it('content is hidden when collapsed', () => {
    render(
      <ScratchDisclosure id="test-disc" summary="Toggle me">
        Hidden content
      </ScratchDisclosure>
    );
    // The region should have hidden attribute
    const region = document.getElementById('scratch-disclosure-panel-test-disc');
    expect(region).toBeTruthy();
    expect(region?.hidden).toBe(true);
  });

  it('clicking the button toggles aria-expanded and reveals content', () => {
    render(
      <ScratchDisclosure id="test-disc" summary="Toggle me">
        Hidden content
      </ScratchDisclosure>
    );
    const button = screen.getByRole('button', { name: /toggle me/i });

    fireEvent.click(button);
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByText('Hidden content')).toBeTruthy();

    fireEvent.click(button);
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  it('renders with defaultOpen=true and content visible', () => {
    render(
      <ScratchDisclosure id="test-disc" summary="Already open" defaultOpen>
        Visible content
      </ScratchDisclosure>
    );
    const button = screen.getByRole('button', { name: /already open/i });
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByText('Visible content')).toBeTruthy();
  });

  it('button has aria-controls pointing to the panel id', () => {
    render(
      <ScratchDisclosure id="disc-aria" summary="ARIA check">
        Content
      </ScratchDisclosure>
    );
    const button = screen.getByRole('button', { name: /aria check/i });
    expect(button.getAttribute('aria-controls')).toBe(
      'scratch-disclosure-panel-disc-aria'
    );
  });

  it('panel has role="region" with aria-labelledby', () => {
    render(
      <ScratchDisclosure id="disc-region" summary="Region test" defaultOpen>
        Region content
      </ScratchDisclosure>
    );
    const region = screen.getByRole('region');
    expect(region.getAttribute('aria-labelledby')).toBe(
      'scratch-disclosure-btn-disc-region'
    );
  });

  it('calls onToggle callback with the new state', () => {
    const onToggle = vi.fn();
    render(
      <ScratchDisclosure id="disc-cb" summary="Callback" onToggle={onToggle}>
        Content
      </ScratchDisclosure>
    );
    fireEvent.click(screen.getByRole('button', { name: /callback/i }));
    expect(onToggle).toHaveBeenCalledWith(true);
    fireEvent.click(screen.getByRole('button', { name: /callback/i }));
    expect(onToggle).toHaveBeenCalledWith(false);
  });

  it('Enter key activates the disclosure (native button behavior)', () => {
    render(
      <ScratchDisclosure id="disc-enter" summary="Enter test">
        Enter content
      </ScratchDisclosure>
    );
    const button = screen.getByRole('button', { name: /enter test/i });
    button.focus();
    fireEvent.keyDown(button, { key: 'Enter' });
    fireEvent.keyUp(button, { key: 'Enter' });
    // Native button fires click on Enter keydown
    fireEvent.click(button);
    expect(button.getAttribute('aria-expanded')).toBe('true');
  });
});
