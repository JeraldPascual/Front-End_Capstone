import React from 'react';

export type BadgeVariant =
  | 'Must Have'
  | 'Should Have'
  | 'Could Have'
  | 'planned'
  | 'in_progress'
  | 'completed'
  | 'wcag'
  | 'neutral';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'neutral', children, className = '' }) => {
  const variantStyles: Record<BadgeVariant, string> = {
    'Must Have': 'bg-rose-950/80 text-rose-300 border-rose-600/50',
    'Should Have': 'bg-amber-950/80 text-amber-300 border-amber-600/50',
    'Could Have': 'bg-sky-950/80 text-sky-300 border-sky-600/50',
    planned: 'bg-slate-800 text-slate-300 border-slate-700',
    in_progress: 'bg-violet-950/80 text-violet-300 border-violet-600/50',
    completed: 'bg-emerald-950/80 text-emerald-300 border-emerald-600/50',
    wcag: 'bg-indigo-950/80 text-indigo-300 border-indigo-600/50',
    neutral: 'bg-slate-800 text-slate-200 border-slate-700'
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variantStyles[variant]} ${className}`}
      role="status"
    >
      {children}
    </span>
  );
};
