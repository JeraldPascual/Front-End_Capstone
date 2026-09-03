import React, { useEffect, useRef } from 'react';

export interface ScratchModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export const ScratchModal: React.FC<ScratchModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  triggerRef
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  const titleId = `scratch-dialog-title-${title.toLowerCase().replace(/\s+/g, '-')}`;
  const descId = description ? `scratch-dialog-desc-${title.toLowerCase().replace(/\s+/g, '-')}` : undefined;

  // Track the element that was focused before the modal opened
  useEffect(() => {
    if (isOpen) {
      if (triggerRef?.current) {
        triggerElementRef.current = triggerRef.current;
      } else {
        triggerElementRef.current = document.activeElement as HTMLElement;
      }

      // Initial focus management per W3C APG:
      // Focus first focusable element, or the dialog itself
      requestAnimationFrame(() => {
        if (!dialogRef.current) return;
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length > 0) {
          focusables[0].focus();
        } else {
          dialogRef.current.focus();
        }
      });

      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Focus return on close
      triggerElementRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, triggerRef]);

  // Keyboard navigation: Escape key to close, Tab & Shift+Tab to trap focus
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key closes modal
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
        return;
      }

      // Tab trap
      if (e.key === 'Tab') {
        if (!dialogRef.current) return;
        const focusableElements = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );

        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement || document.activeElement === dialogRef.current) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-6 text-slate-100 focus:outline-none"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 id={titleId} className="text-lg font-bold text-slate-100">
              {title}
            </h2>
            {description && (
              <p id={descId} className="text-sm text-slate-400 mt-1">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 text-slate-400 hover:text-slate-200 rounded-md hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <div className="text-sm text-slate-300">{children}</div>
      </div>
    </div>
  );
};