import React from 'react';
import { Target, TrendingUp, Sparkles, FileText } from 'lucide-react';
import type { FeatureSpec, StoryStatus } from '../../types/spec';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { UserStoriesSection } from './UserStoriesSection';
import { AccessibilitySection } from './AccessibilitySection';
import { EdgeCasesSection } from './EdgeCasesSection';
import { ArchitectureSection } from './ArchitectureSection';
import { ExportBar } from './ExportBar';

export interface SpecViewerProps {
  spec: FeatureSpec;
  onToggleCriterion: (storyId: string, criterionId: string) => void;
  onUpdateStoryStatus: (storyId: string, status: StoryStatus) => void;
  onNotification: (message: string, type: 'info' | 'success' | 'warning') => void;
}

export const SpecViewer: React.FC<SpecViewerProps> = ({
  spec,
  onToggleCriterion,
  onUpdateStoryStatus,
  onNotification
}) => {
  return (
    <article aria-labelledby="spec-main-title" className="space-y-6">
      {/* Spec Header & Tagline */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/40">
                PRD SPECIFICATION
              </span>
              <span className="text-xs text-slate-400">
                Created {new Date(spec.createdAt).toLocaleDateString()}
              </span>
            </div>

            <Badge variant="wcag">
              Source: {spec.sourceProvider.toUpperCase()}
            </Badge>
          </div>

          <div>
            <h2 id="spec-main-title" className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight">
              {spec.title}
            </h2>
            <p className="text-base text-indigo-300/90 mt-1 font-medium">{spec.tagline}</p>
          </div>

          {/* Quick-Anchor Navigation Bar */}
          <nav aria-label="Specification section navigation" className="pt-2 border-t border-slate-800/80">
            <ul className="flex flex-wrap gap-2 text-xs">
              <li>
                <a
                  href="#executive-summary"
                  className="px-3 py-1.5 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  Executive Summary
                </a>
              </li>
              <li>
                <a
                  href="#user-stories"
                  className="px-3 py-1.5 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  User Stories ({spec.userStories.length})
                </a>
              </li>
              <li>
                <a
                  href="#accessibility-blueprint"
                  className="px-3 py-1.5 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  Accessibility ({spec.accessibility.wcagLevel})
                </a>
              </li>
              <li>
                <a
                  href="#edge-cases"
                  className="px-3 py-1.5 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  Edge Cases ({spec.edgeCases.length})
                </a>
              </li>
              <li>
                <a
                  href="#architecture"
                  className="px-3 py-1.5 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  Architecture & Estimates
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Export Bar */}
      <ExportBar spec={spec} onNotification={onNotification} />

      {/* Executive Summary */}
      <Card
        id="executive-summary"
        title="1. Executive Summary"
        subtitle="Problem framing, target persona, value proposition, and measurable success criteria."
        className="mb-8"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider">
                <Target className="w-4 h-4" aria-hidden="true" />
                <h3>Problem Statement</h3>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {spec.executiveSummary.problemStatement}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <h3>Target Persona</h3>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {spec.executiveSummary.targetPersona}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
              <FileText className="w-4 h-4" aria-hidden="true" />
              <h3>Core Value Proposition</h3>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
              {spec.executiveSummary.valueProposition}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" aria-hidden="true" />
              <h3>Measurable Success Metrics</h3>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {spec.executiveSummary.successMetrics.map((metric, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">�</span>
                  <span>{metric}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* User Stories */}
      <UserStoriesSection
        stories={spec.userStories}
        onToggleCriterion={onToggleCriterion}
        onUpdateStatus={onUpdateStoryStatus}
      />

      {/* Accessibility Blueprint */}
      <AccessibilitySection accessibility={spec.accessibility} />

      {/* Edge Cases Matrix */}
      <EdgeCasesSection edgeCases={spec.edgeCases} />

      {/* Architecture & Sizing */}
      <ArchitectureSection architecture={spec.architecture} effort={spec.effortEstimation} />
    </article>
  );
};
