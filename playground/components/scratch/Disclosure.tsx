import React, { useState } from 'react';

export interface ScratchDisclosureProps {
  id: string;
  summary: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  className?: string;
}

export const ScratchDisclosure: React.FC<ScratchDisclosureProps> = ({
  id,
  summary,
  children,
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onToggle,
  className = ''
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const isControlled = controlledIsOpen !== undefined;
  const isExpanded = isControlled ? controlledIsOpen : internalOpen;

  const buttonId = `scratch-disclosure-btn-${id}`;
  const panelId = `scratch-disclosure-panel-${id}`;

  const handleToggle = () => {
    const nextState = !isExpanded;
    if (!isControlled) {
      setInternalOpen(nextState);
    }
    onToggle?.(nextState);
  };

  return (
    <div className={`border border-slate-800 rounded-xl overflow-hidden bg-slate-900/60 ${className}`}>
      {/* Disclosure Trigger Button per W3C APG */}
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isExpanded}
          aria-controls={panelId}
          onClick={handleToggle}
          className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left font-semibold text-slate-100 hover:bg-slate-800/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer min-h-[44px]"
        >
          <span>{summary}</span>
          <span
            aria-hidden="true"
            className={`transform transition-transform duration-200 text-slate-400 text-xs ${
              isExpanded ? 'rotate-180' : ''
            }`}
          >
            ▼
          </span>
        </button>
      </h3>

      {/* Disclosure Content Panel */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isExpanded}
        className={`px-5 py-4 border-t border-slate-800/60 text-sm text-slate-300 leading-relaxed bg-slate-950/40 ${
          !isExpanded ? 'hidden' : 'block'
        }`}
      >
        {children}
      </div>
    </div>
  );
};