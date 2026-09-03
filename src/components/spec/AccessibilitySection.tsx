import React from 'react';
import { Accessibility, Keyboard, Eye, CheckCircle, Radio } from 'lucide-react';
import type { AccessibilitySpec } from '../../types/spec';
import { Badge } from '../common/Badge';
import { Card } from '../common/Card';

export interface AccessibilitySectionProps {
  accessibility: AccessibilitySpec;
}

export const AccessibilitySection: React.FC<AccessibilitySectionProps> = ({ accessibility }) => {
  return (
    <Card
      title="Accessibility (a11y) Blueprint"
      subtitle="Engineered to meet and exceed WCAG 2.1 AA requirements (FE-05, FE-10 principles)."
      headerAction={<Badge variant="wcag">{accessibility.wcagLevel}</Badge>}
      className="mb-8"
      id="accessibility-blueprint"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Keyboard Navigation */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
            <Keyboard className="w-4 h-4" aria-hidden="true" />
            <h3>Keyboard Navigation Requirements</h3>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            {accessibility.keyboardNavigation.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Screen Reader & ARIA */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
            <Radio className="w-4 h-4" aria-hidden="true" />
            <h3>Screen Reader & ARIA Blueprint</h3>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            {accessibility.screenReaderNotes.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Color Contrast */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <Eye className="w-4 h-4" aria-hidden="true" />
            <h3>Color Contrast & Visual Accessibility</h3>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            {accessibility.colorContrastNotes.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Focus Management */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
            <Accessibility className="w-4 h-4" aria-hidden="true" />
            <h3>Focus Management & Targets</h3>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            {accessibility.focusManagement.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};
