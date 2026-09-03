import React from 'react';
import { Layers, Gauge, Code2, AlertOctagon, Clock } from 'lucide-react';
import type { ArchitectureSpec, EffortEstimation } from '../../types/spec';
import { Card } from '../common/Card';

export interface ArchitectureSectionProps {
  architecture: ArchitectureSpec;
  effort: EffortEstimation;
}

export const ArchitectureSection: React.FC<ArchitectureSectionProps> = ({ architecture, effort }) => {
  return (
    <Card
      title="Technical Architecture & Engineering Estimates"
      subtitle="Component hierarchy, state strategy, API contracts, and implementation risk analysis."
      className="mb-8"
      id="architecture"
    >
      <div className="space-y-6">
        {/* Core Architecture Meta */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider">
              <Layers className="w-4 h-4" aria-hidden="true" />
              <span>Frontend Architecture Pattern</span>
            </div>
            <p className="text-sm text-slate-100 font-medium">{architecture.frontendPattern}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-violet-400 font-semibold text-xs uppercase tracking-wider">
              <Code2 className="w-4 h-4" aria-hidden="true" />
              <span>State Management Strategy</span>
            </div>
            <p className="text-sm text-slate-100 font-medium">{architecture.stateManagement}</p>
          </div>
        </div>

        {/* API Contracts & Performance Budget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              API Contracts & Interface Boundaries
            </h3>
            <div className="space-y-2">
              {architecture.apiContract.map((contract, i) => (
                <div
                  key={i}
                  className="font-mono text-xs p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300"
                >
                  {contract}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Performance & Latency Budgets
            </h3>
            <div className="space-y-2">
              {architecture.performanceBudget.map((budget, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-emerald-300"
                >
                  <Gauge className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                  <span>{budget}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Effort & Risk Analysis */}
        <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-indigo-500/20 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-400" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-semibold text-slate-100">Effort Sizing</h3>
                <p className="text-xs text-slate-400">T-Shirt Estimate: ~{effort.estimatedHours} hrs development</p>
              </div>
            </div>
            <span className="text-xl font-extrabold px-3 py-1 rounded-lg bg-indigo-600 text-white shadow-sm">
              Size {effort.tShirtSize}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
              <AlertOctagon className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Key Technical Risks & Mitigations</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {effort.risks.map((risk, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">�</span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};
