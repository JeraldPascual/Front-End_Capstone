import React, { useRef, useState } from 'react';
import { ScratchModal } from './components/scratch/Modal';
import { ScratchTabs } from './components/scratch/Tabs';
import type { TabItem } from './components/scratch/Tabs';
import { ScratchDisclosure } from './components/scratch/Disclosure';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './components/shadcn/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/shadcn/tabs';

const PlaygroundApp: React.FC = () => {
  // --- Scratch Modal State ---
  const [scratchModalOpen, setScratchModalOpen] = useState(false);
  const scratchTriggerRef = useRef<HTMLButtonElement>(null);

  // --- Scratch Tabs Data ---
  const scratchTabItems: TabItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <p>
          This tab demonstrates a scratch-built tabs component following the{' '}
          <strong>W3C ARIA APG Tabs Pattern</strong>. Use <kbd>ArrowLeft</kbd> /{' '}
          <kbd>ArrowRight</kbd> to navigate, <kbd>Home</kbd> / <kbd>End</kbd> to
          jump to first/last tab.
        </p>
      ),
    },
    {
      id: 'keyboard',
      label: 'Keyboard',
      content: (
        <ul className="list-disc list-inside space-y-1">
          <li>
            <kbd>ArrowRight</kbd> — Move to next tab (wraps)
          </li>
          <li>
            <kbd>ArrowLeft</kbd> — Move to previous tab (wraps)
          </li>
          <li>
            <kbd>Home</kbd> — Move to first tab
          </li>
          <li>
            <kbd>End</kbd> — Move to last tab
          </li>
          <li>
            <kbd>Tab</kbd> — Move focus into the active panel
          </li>
        </ul>
      ),
    },
    {
      id: 'a11y',
      label: 'Accessibility',
      content: (
        <p>
          Each tab uses <code>role="tab"</code> with <code>aria-selected</code>{' '}
          and <code>aria-controls</code>. The panel has{' '}
          <code>role="tabpanel"</code> with <code>aria-labelledby</code> and{' '}
          <code>tabIndex=0</code> so keyboard users can reach its content.
          Roving <code>tabIndex</code> ensures only the active tab is in the tab
          order.
        </p>
      ),
    },
    {
      id: 'disabled',
      label: 'Disabled',
      disabled: true,
      content: <p>You should never see this.</p>,
    },
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 p-6 md:p-10 space-y-12">
      <header className="max-w-3xl mx-auto text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          🎮 ARIA Components Playground
        </h1>
        <p className="text-slate-400 text-sm">
          FlyRank Foundations Assignment — Three W3C APG-compliant components
          built from scratch, then compared against shadcn/ui + Radix
          primitives.
        </p>
      </header>

      <main id="main-content" className="max-w-3xl mx-auto space-y-16">
        {/* ─────────────────── SECTION 1: MODAL ─────────────────── */}
        <section aria-labelledby="modal-heading" className="space-y-6">
          <h2 id="modal-heading" className="text-xl font-bold border-b border-slate-800 pb-2">
            1 · Modal Dialog
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Scratch Modal */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">
                Scratch Implementation
              </h3>
              <button
                ref={scratchTriggerRef}
                onClick={() => setScratchModalOpen(true)}
                className="px-5 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d16] cursor-pointer min-h-[44px]"
              >
                Open Scratch Modal
              </button>
              <ScratchModal
                isOpen={scratchModalOpen}
                onClose={() => setScratchModalOpen(false)}
                title="Scratch Modal Dialog"
                description="This modal was built from scratch following the W3C APG Dialog pattern."
                triggerRef={scratchTriggerRef}
              >
                <div className="space-y-4">
                  <p>
                    Focus is trapped inside this dialog. Try pressing{' '}
                    <kbd className="px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded text-xs">
                      Tab
                    </kbd>{' '}
                    and{' '}
                    <kbd className="px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded text-xs">
                      Shift+Tab
                    </kbd>{' '}
                    — focus wraps between the interactive elements.
                  </p>
                  <p>
                    Press{' '}
                    <kbd className="px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded text-xs">
                      Escape
                    </kbd>{' '}
                    or click the backdrop to close. Focus will return to the
                    trigger button.
                  </p>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setScratchModalOpen(false)}
                      className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer min-h-[44px]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setScratchModalOpen(false)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer min-h-[44px]"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </ScratchModal>
            </div>

            {/* shadcn Dialog */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
                shadcn/ui + Radix
              </h3>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="px-5 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d16] cursor-pointer min-h-[44px]">
                    Open shadcn Dialog
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>shadcn/ui Dialog</DialogTitle>
                    <DialogDescription>
                      This dialog uses Radix Dialog primitives under the hood.
                      It handles focus trap, scroll lock, portal mounting, and
                      inert background trees automatically.
                    </DialogDescription>
                  </DialogHeader>
                  <p className="text-sm text-slate-300">
                    Radix portals the dialog outside its parent DOM tree, sets{' '}
                    <code>aria-hidden</code> on sibling branches, and
                    compensates for scrollbar width to prevent layout shift.
                  </p>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>

        {/* ─────────────────── SECTION 2: TABS ─────────────────── */}
        <section aria-labelledby="tabs-heading" className="space-y-6">
          <h2 id="tabs-heading" className="text-xl font-bold border-b border-slate-800 pb-2">
            2 · Tabs
          </h2>

          <div className="space-y-8">
            {/* Scratch Tabs */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">
                Scratch Implementation
              </h3>
              <ScratchTabs tabs={scratchTabItems} ariaLabel="Scratch demo tabs" />
            </div>

            {/* shadcn Tabs */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
                shadcn/ui + Radix
              </h3>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="keyboard">Keyboard</TabsTrigger>
                  <TabsTrigger value="a11y">Accessibility</TabsTrigger>
                  <TabsTrigger value="disabled" disabled>
                    Disabled
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <p>
                    Radix Tabs handles roving tabindex, arrow key navigation,
                    Home/End, and automatic or manual activation modes.
                  </p>
                </TabsContent>
                <TabsContent value="keyboard">
                  <p>
                    Keyboard navigation works identically to the scratch version
                    but additionally supports RTL text direction and vertical
                    orientation via <code>orientation="vertical"</code>.
                  </p>
                </TabsContent>
                <TabsContent value="a11y">
                  <p>
                    Radix generates matching <code>id</code> /{' '}
                    <code>aria-controls</code> / <code>aria-labelledby</code>{' '}
                    pairs automatically — no manual ID wiring needed.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* ─────────────────── SECTION 3: DISCLOSURE ─────────────────── */}
        <section aria-labelledby="disclosure-heading" className="space-y-6">
          <h2 id="disclosure-heading" className="text-xl font-bold border-b border-slate-800 pb-2">
            3 · Disclosure (Accordion)
          </h2>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">
              Scratch Implementation
            </h3>
            <div className="space-y-3">
              <ScratchDisclosure id="what" summary="What is a Disclosure widget?">
                A disclosure widget is a button that controls the visibility of a
                section of content. The W3C APG pattern requires{' '}
                <code>aria-expanded</code> on the trigger button and{' '}
                <code>aria-controls</code> pointing to the content region&apos;s{' '}
                <code>id</code>.
              </ScratchDisclosure>

              <ScratchDisclosure
                id="keyboard"
                summary="Keyboard interaction"
                defaultOpen
              >
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <kbd>Enter</kbd> or <kbd>Space</kbd> — Toggle the disclosure
                    open/closed
                  </li>
                  <li>
                    <kbd>Tab</kbd> — Move focus to the next focusable element
                  </li>
                </ul>
              </ScratchDisclosure>

              <ScratchDisclosure id="aria" summary="ARIA attributes used">
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <code>aria-expanded</code> — Communicates current state to
                    assistive technology
                  </li>
                  <li>
                    <code>aria-controls</code> — Associates the button with the
                    content panel
                  </li>
                  <li>
                    <code>role="region"</code> with{' '}
                    <code>aria-labelledby</code> — Makes the content a labelled
                    landmark
                  </li>
                </ul>
              </ScratchDisclosure>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-3xl mx-auto text-center text-xs text-slate-500 pt-8 border-t border-slate-800">
        FlyRank Foundations · ARIA Components Playground · Jerald A. Pascual
      </footer>
    </div>
  );
};

export default PlaygroundApp;
