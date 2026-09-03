import React, { useState } from 'react';
import { Cpu, Settings, Sparkles, History } from 'lucide-react';
import { Button } from '../common/Button';
import type { ProviderConfig, FeatureSpec } from '../../types/spec';

export interface HeaderProps {
  providerConfig: ProviderConfig;
  onOpenSettings: () => void;
  specHistory: FeatureSpec[];
  onSelectHistorySpec: (spec: FeatureSpec) => void;
}

export const Header: React.FC<HeaderProps> = ({
  providerConfig,
  onOpenSettings,
  specHistory,
  onSelectHistorySpec
}) => {
  const [historyOpen, setHistoryOpen] = useState(false);

  const providerLabel = {
    mock: 'Deterministic Demo Engine',
    claude: 'Claude 3.5 Sonnet',
    gemini: 'Gemini 2.0 Flash',
    openai: 'OpenAI GPT-4o'
  }[providerConfig.provider];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-100 tracking-tight leading-none">
                SpecForge AI
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Studio
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">
              Production-Ready Feature & PRD Architect
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Provider Indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
            <span className="text-slate-400">Model:</span>
            <span className="font-medium text-slate-200">{providerLabel}</span>
          </div>

          {/* History Dropdown */}
          {specHistory.length > 0 && (
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setHistoryOpen(!historyOpen)}
                aria-expanded={historyOpen}
                aria-haspopup="true"
                aria-label="View recent specifications"
                leftIcon={<History className="w-4 h-4" />}
                className="text-xs"
              >
                Recent ({specHistory.length})
              </Button>

              {historyOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setHistoryOpen(false)}
                    aria-hidden="true"
                  />
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-40 max-h-80 overflow-y-auto"
                  >
                    <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                      Saved Specifications
                    </div>
                    {specHistory.map((s) => (
                      <button
                        key={s.id}
                        role="menuitem"
                        onClick={() => {
                          onSelectHistorySpec(s);
                          setHistoryOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 transition-colors flex flex-col cursor-pointer"
                      >
                        <span className="font-medium truncate">{s.title}</span>
                        <span className="text-xs text-slate-400 mt-0.5">
                          {new Date(s.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} � {s.userStories.length} stories
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Settings Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenSettings}
            aria-label="Configure AI Model and API keys"
            leftIcon={<Settings className="w-4 h-4 text-slate-300" />}
            className="text-xs"
          >
            AI Settings
          </Button>
        </div>
      </div>
    </header>
  );
};
