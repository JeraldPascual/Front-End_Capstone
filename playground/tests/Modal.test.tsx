import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useRef } from 'react';
import { ScratchModal } from '../components/scratch/Modal';

// Helper wrapper that provides the triggerRef
const ModalHarness: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button ref={triggerRef} data-testid="trigger">
        Open
      </button>
      <ScratchModal
        isOpen={isOpen}
        onClose={onClose}
        title="Test Modal"
        description="A test dialog description"
        triggerRef={triggerRef}
      >
        <button data-testid="first-btn">First</button>
        <button data-testid="second-btn">Second</button>
      </ScratchModal>
    </>
  );
};

describe('ScratchModal (W3C APG Dialog Pattern)', () => {
  it('renders with role="dialog", aria-modal, aria-labelledby, and aria-describedby', () => {
    render(<ModalHarness isOpen={true} onClose={vi.fn()} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeTruthy();
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(dialog.getAttribute('aria-labelledby')).toBeTruthy();
    expect(dialog.getAttribute('aria-describedby')).toBeTruthy();
  });

  it('does not render when isOpen is false', () => {
    render(<ModalHarness isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn();
    render(<ModalHarness isOpen={true} onClose={onClose} />);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('traps focus: Shift+Tab from first element wraps to last', async () => {
    render(<ModalHarness isOpen={true} onClose={vi.fn()} />);
    const firstBtn = screen.getByTestId('first-btn');
    const secondBtn = screen.getByTestId('second-btn');

    // Focus first element
    firstBtn.focus();
    expect(document.activeElement).toBe(firstBtn);

    // Shift+Tab from the close button (first focusable) should wrap to last
    const closeButton = screen.getByLabelText('Close dialog');
    closeButton.focus();
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });

    // Focus should wrap to last interactive element
    expect(
      document.activeElement === secondBtn ||
        document.activeElement === screen.getByTestId('second-btn')
    ).toBe(true);
  });

  it('traps focus: Tab from last element wraps to first', () => {
    render(<ModalHarness isOpen={true} onClose={vi.fn()} />);
    const secondBtn = screen.getByTestId('second-btn');

    secondBtn.focus();
    fireEvent.keyDown(window, { key: 'Tab' });

    // Focus should wrap to close button (first focusable in the dialog)
    const closeButton = screen.getByLabelText('Close dialog');
    expect(document.activeElement).toBe(closeButton);
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn();
    render(<ModalHarness isOpen={true} onClose={onClose} />);
    // The backdrop is the role="presentation" wrapper
    const backdrop = screen.getByRole('presentation');
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders the title and description text', () => {
    render(<ModalHarness isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText('Test Modal')).toBeTruthy();
    expect(screen.getByText('A test dialog description')).toBeTruthy();
  });
});
