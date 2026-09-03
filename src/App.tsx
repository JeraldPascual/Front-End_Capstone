import { useState } from 'react';
import { Sparkles, ShieldCheck, Zap, Layers } from 'lucide-react';
import { useSpecGenerator } from './hooks/useSpecGenerator';
import { SkipLink } from './components/layout/SkipLink';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SpecInputForm } from './components/spec/SpecInputForm';
import { SpecViewer } from './components/spec/SpecViewer';
import { ApiKeyModal } from './components/settings/ApiKeyModal';
import { Toast } from './components/common/Toast';
import { ErrorBoundary } from './components/error/ErrorBoundary';
import { Card } from './components/common/Card';

export function App() {
  const {
    currentSpec,
    specHistory,
    providerConfig,
    setProviderConfig,
    status,
    notification,
    clearNotification,
    generate,
    toggleCriterion,
    updateStoryStatus,
    loadSpec
  } = useSpecGenerator();

  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
        <SkipLink />

        <Header
          providerConfig={providerConfig}
          onOpenSettings={() => setSettingsOpen(true)}
          specHistory={specHistory}
          onSelectHistorySpec={loadSpec}
        />

        <main id="main-content" tabIndex={-1} className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 focus:outline-none">
          {/* Hero Pitch Banner */}
          {!currentSpec && (
            <div className="text-center py-10 md:py-16 space-y-4 max-w-3xl mx-auto animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
                <span>FlyRank Capstone Portfolio � Production AI Architecture</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
                Turn Rough Ideas into{' '}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Engineering-Ready PRDs
                </span>
              </h2>

              <p className="text-base text-slate-400 leading-relaxed">
                Generate production-ready feature specifications complete with Gherkin acceptance criteria, defensive edge case matrices, and WCAG 2.1 AA accessibility blueprints in seconds.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                  <span>WCAG 2.1 AA Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" aria-hidden="true" />
                  <span>Resilient LLM & Fallback Engine</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-indigo-400" aria-hidden="true" />
                  <span>Gherkin Acceptance Criteria</span>
                </div>
              </div>
            </div>
          )}

          {/* Prompt Form */}
          <SpecInputForm onGenerate={generate} status={status} />

          {/* Generated Specification or Empty State Guidance */}
          {currentSpec ? (
            <SpecViewer
              spec={currentSpec}
              onToggleCriterion={toggleCriterion}
              onUpdateStoryStatus={updateStoryStatus}
              onNotification={() => {
                // Toast notification handled by useSpecGenerator or custom trigger
              }}
            />
          ) : (
            <Card
              title="What your PRD will contain"
              subtitle="SpecForge AI structures complex software development requirements into 5 foundational engineering artifacts."
              className="mt-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold text-xs">
                    01
                  </div>
                  <h3 className="text-sm font-semibold text-slate-200">Executive Framing</h3>
                  <p className="text-xs text-slate-400">
                    Crisp problem statement, target persona definition, value proposition, and 3+ quantifiable metrics.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold text-xs">
                    02
                  </div>
                  <h3 className="text-sm font-semibold text-slate-200">Gherkin User Stories</h3>
                  <p className="text-xs text-slate-400">
                    Prioritized user stories with Given / When / Then acceptance criteria that you can check off as you build.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-xs">
                    03
                  </div>
                  <h3 className="text-sm font-semibold text-slate-200">Accessibility Blueprint</h3>
                  <p className="text-xs text-slate-400">
                    WCAG 2.1 AA keyboard navigation, ARIA live region blueprints, 4.5:1 contrast ratios, and focus traps.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 font-bold text-xs">
                    04
                  </div>
                  <h3 className="text-sm font-semibold text-slate-200">Edge Case Matrix</h3>
                  <p className="text-xs text-slate-400">
                    Explicit coverage for offline network states, validation limits, rate limits, and mitigation strategies.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold text-xs">
                    05
                  </div>
                  <h3 className="text-sm font-semibold text-slate-200">Architecture & Sizing</h3>
                  <p className="text-xs text-slate-400">
                    Frontend component hierarchy, state management recommendations, API contracts, and T-shirt sizing.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 font-bold text-xs">
                    06
                  </div>
                  <h3 className="text-sm font-semibold text-slate-200">One-Click Export</h3>
                  <p className="text-xs text-slate-400">
                    Instant GitHub-flavored markdown export ready to paste directly into Linear, GitHub Issues, or Notion.
                  </p>
                </div>
              </div>
            </Card>
          )}
        </main>

        <Footer />

        {/* Global Notifications */}
        {notification && (
          <Toast
            message={notification.message}
            type={notification.type}
            onClose={clearNotification}
          />
        )}

        {/* API Settings Modal */}
        <ApiKeyModal
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          config={providerConfig}
          onSave={(newConfig) => {
            setProviderConfig(newConfig);
          }}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
