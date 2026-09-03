import React, { useState } from 'react';
import { Sparkles, Wand2, Lightbulb, AlertCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import type { GenerationStatus, SpecPromptInput } from '../../types/spec';

export interface SpecInputFormProps {
  onGenerate: (input: SpecPromptInput) => void;
  status: GenerationStatus;
}

const PRESETS: Array<{ label: string; data: SpecPromptInput }> = [
  {
    label: 'AI Meeting & Doc Synthesizer',
    data: {
      featureName: 'AI Meeting & Doc Synthesizer',
      targetAudience: 'Distributed engineering and product teams',
      coreProblem: 'Long unformatted transcripts and meeting notes bury critical action items and architectural decisions.',
      techStack: 'React 19, TypeScript, Tailwind CSS, Claude API',
      complexity: 'standard'
    }
  },
  {
    label: 'Real-Time Accessible Collaboration Canvas',
    data: {
      featureName: 'Accessible Real-Time Canvas',
      targetAudience: 'Designers, blind/low-vision collaborators, and product leads',
      coreProblem: 'Traditional whiteboard tools are entirely inaccessible to screen reader and keyboard-only users.',
      techStack: 'Next.js, WebSockets, HTML5 Canvas, ARIA Live Regions',
      complexity: 'complex'
    }
  },
  {
    label: 'One-Click Frictionless Checkout',
    data: {
      featureName: 'Frictionless Accessible Checkout',
      targetAudience: 'E-commerce mobile and desktop shoppers',
      coreProblem: 'High mobile cart abandonment due to complex multi-step forms and inadequate error validation feedback.',
      techStack: 'React, Vite, Stripe Elements, Tailwind CSS',
      complexity: 'simple'
    }
  }
];

export const SpecInputForm: React.FC<SpecInputFormProps> = ({ onGenerate, status }) => {
  const [featureName, setFeatureName] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [coreProblem, setCoreProblem] = useState('');
  const [techStack, setTechStack] = useState('React, TypeScript, Tailwind CSS');
  const [complexity, setComplexity] = useState<'simple' | 'standard' | 'complex'>('standard');
  const [formError, setFormError] = useState<string | null>(null);

  const handleApplyPreset = (preset: SpecPromptInput) => {
    setFeatureName(preset.featureName);
    setTargetAudience(preset.targetAudience);
    setCoreProblem(preset.coreProblem);
    setTechStack(preset.techStack);
    setComplexity(preset.complexity);
    setFormError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!featureName.trim()) {
      setFormError('Feature Name is required.');
      return;
    }
    if (featureName.trim().length < 3) {
      setFormError('Feature Name must be at least 3 characters.');
      return;
    }
    setFormError(null);
    onGenerate({
      featureName: featureName.trim(),
      targetAudience: targetAudience.trim() || 'Software Developers and Product Teams',
      coreProblem: coreProblem.trim() || 'Unclear requirements and undocumented edge cases slowing team velocity.',
      techStack: techStack.trim() || 'React, TypeScript, Vite',
      complexity
    });
  };

  const stageLabels = {
    idle: '',
    analyzing: 'Synthesizing problem statement & personas...',
    drafting_stories: 'Drafting Gherkin user stories & acceptance criteria...',
    evaluating_edge_cases: 'Formulating edge cases & WCAG 2.1 AA accessibility...',
    finalizing: 'Finalizing technical architecture & contracts...',
    error: 'Generation failed.'
  };

  return (
    <Card
      title="Create New Feature Specification"
      subtitle="Transform rough concepts into production-grade PRDs with Gherkin acceptance criteria, edge case matrices, and WCAG blueprints."
      className="mb-8"
    >
      {/* Preset Inspiration Pills */}
      <div className="mb-6">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
          <span>Quick Inspiration Presets:</span>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Feature presets">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => handleApplyPreset(p.data)}
              className="text-xs px-3 py-1.5 rounded-full bg-slate-800/90 text-slate-300 hover:bg-indigo-950 hover:text-indigo-200 hover:border-indigo-500/50 border border-slate-700/80 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              + {p.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {formError && (
          <div
            role="alert"
            className="flex items-center gap-2 p-3 rounded-lg bg-rose-950/80 border border-rose-600/50 text-rose-200 text-sm"
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" aria-hidden="true" />
            <span>{formError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="feature-name" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Feature or Initiative Name <span className="text-rose-400" aria-hidden="true">*</span>
            </label>
            <input
              id="feature-name"
              type="text"
              required
              value={featureName}
              onChange={(e) => {
                setFeatureName(e.target.value);
                if (formError) setFormError(null);
              }}
              placeholder="e.g. AI-Powered Smart Film Discovery"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus-visible:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/30"
            />
          </div>

          <div>
            <label htmlFor="target-audience" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Target Audience / Persona
            </label>
            <input
              id="target-audience"
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Cinephiles, Product Managers, Frontend Engineers"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus-visible:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/30"
            />
          </div>
        </div>

        <div>
          <label htmlFor="core-problem" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Core Problem & Context to Solve
          </label>
          <textarea
            id="core-problem"
            rows={3}
            value={coreProblem}
            onChange={(e) => setCoreProblem(e.target.value)}
            placeholder="Describe what pain point users experience, why existing solutions fail, and what outcome is desired..."
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus-visible:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/30"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="tech-stack" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Target Tech Stack
            </label>
            <input
              id="tech-stack"
              type="text"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              placeholder="e.g. React 19, TypeScript, Vite, Tailwind CSS"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus-visible:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/30"
            />
          </div>

          <div>
            <label htmlFor="complexity-level" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Scope & Complexity
            </label>
            <select
              id="complexity-level"
              value={complexity}
              onChange={(e) => setComplexity(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm focus-visible:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/30 cursor-pointer"
            >
              <option value="simple">Simple (1-2 Sprints, minimal dependencies)</option>
              <option value="standard">Standard (Full feature, state, error resilience)</option>
              <option value="complex">Complex (Multi-agent/service, real-time, extensive a11y)</option>
            </select>
          </div>
        </div>

        {/* Live Stage Announcement */}
        {status.isLoading && (
          <div
            role="status"
            aria-live="polite"
            className="p-3 rounded-lg bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 text-xs flex items-center gap-2 animate-pulse motion-reduce:animate-none"
          >
            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" aria-hidden="true" />
            <span>{stageLabels[status.stage] || 'Generating specification...'}</span>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <Button
            type="submit"
            isLoading={status.isLoading}
            leftIcon={<Wand2 className="w-4 h-4" />}
            size="lg"
            className="w-full sm:w-auto"
          >
            Generate Specification
          </Button>
        </div>
      </form>
    </Card>
  );
};
