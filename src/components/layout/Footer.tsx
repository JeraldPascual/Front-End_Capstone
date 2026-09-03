import React from 'react';
import { ShieldCheck, GitBranch, ExternalLink, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/60 text-slate-400 text-xs py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
          <span>
            Accessibility Verified: <strong className="text-slate-300">WCAG 2.1 AA Compliant</strong> (axe-core tested)
          </span>
        </div>

        <div className="flex items-center gap-1 text-center">
          <span>FlyRank Capstone Portfolio Project � Built with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline mx-0.5" aria-label="love" />
          <span>by <strong className="text-slate-200">Jerald A. Pascual</strong></span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/JeraldPascual/Front-End_Capstone"
            target="_blank"
            rel="noreferrer"
            className="hover:text-indigo-400 transition-colors inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 rounded p-1"
          >
            <GitBranch className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Repository</span>
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
};
