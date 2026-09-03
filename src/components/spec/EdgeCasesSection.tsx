import React from 'react';
import { ShieldAlert, AlertTriangle, RefreshCw, Zap } from 'lucide-react';
import type { EdgeCase } from '../../types/spec';
import { Card } from '../common/Card';

export interface EdgeCasesSectionProps {
  edgeCases: EdgeCase[];
}

export const EdgeCasesSection: React.FC<EdgeCasesSectionProps> = ({ edgeCases }) => {
  const categoryBadges: Record<string, { color: string; icon: React.ReactNode }> = {
    'Network / Offline': {
      color: 'bg-rose-950/80 text-rose-300 border-rose-600/40',
      icon: <AlertTriangle className="w-3 h-3 text-rose-400" />
    },
    'Validation / Input': {
      color: 'bg-amber-950/80 text-amber-300 border-amber-600/40',
      icon: <ShieldAlert className="w-3 h-3 text-amber-400" />
    },
    'Auth & Permissions': {
      color: 'bg-violet-950/80 text-violet-300 border-violet-600/40',
      icon: <Zap className="w-3 h-3 text-violet-400" />
    },
    'Performance & Scale': {
      color: 'bg-sky-950/80 text-sky-300 border-sky-600/40',
      icon: <RefreshCw className="w-3 h-3 text-sky-400" />
    }
  };

  return (
    <Card
      title="Edge Cases & Failure Modes Matrix"
      subtitle="Defensive engineering specifications and graceful fallback strategies (FE-07 resilience standards)."
      className="mb-8"
      id="edge-cases"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-semibold uppercase tracking-wider">
              <th scope="col" className="py-3 px-4 w-28">ID & Category</th>
              <th scope="col" className="py-3 px-4">Trigger Scenario</th>
              <th scope="col" className="py-3 px-4">Expected Behavior</th>
              <th scope="col" className="py-3 px-4">Fallback / Mitigation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {edgeCases.map((ec) => {
              const meta = categoryBadges[ec.category] || {
                color: 'bg-slate-800 text-slate-300 border-slate-700',
                icon: null
              };

              return (
                <tr key={ec.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4 align-top">
                    <div className="space-y-1">
                      <span className="font-mono font-bold text-slate-200">{ec.id}</span>
                      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium border ${meta.color}`}>
                        {meta.icon}
                        <span>{ec.category}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 align-top text-slate-200 leading-relaxed font-medium">
                    {ec.scenario}
                  </td>
                  <td className="py-3.5 px-4 align-top text-slate-300 leading-relaxed">
                    {ec.expectedBehavior}
                  </td>
                  <td className="py-3.5 px-4 align-top text-emerald-300/90 leading-relaxed bg-emerald-950/10 rounded">
                    <strong className="text-emerald-400 font-semibold">Mitigation: </strong>
                    {ec.fallbackMitigation}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
