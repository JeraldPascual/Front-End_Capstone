import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article';
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  id?: string;
  'aria-labelledby'?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  as: Component = 'section',
  title,
  subtitle,
  headerAction,
  id,
  'aria-labelledby': ariaLabelledBy
}) => {
  const headerId = title && !ariaLabelledBy ? `card-title-${title.toLowerCase().replace(/\s+/g, '-')}` : ariaLabelledBy;

  return (
    <Component
      id={id}
      aria-labelledby={headerId}
      className={`bg-slate-900/90 border border-slate-800 rounded-xl shadow-lg backdrop-blur-sm transition-all ${className}`}
    >
      {(title || subtitle || headerAction) && (
        <header className="px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            {title && (
              <h2 id={headerId} className="text-lg font-semibold text-slate-100 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          {headerAction && <div className="flex items-center gap-2">{headerAction}</div>}
        </header>
      )}
      <div className="p-6">{children}</div>
    </Component>
  );
};
