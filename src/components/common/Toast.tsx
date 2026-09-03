import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  message: string;
  type?: 'info' | 'success' | 'warning';
  onClose: () => void;
  autoHideDuration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  onClose,
  autoHideDuration = 5000
}) => {
  useEffect(() => {
    if (autoHideDuration <= 0) return;
    const timer = setTimeout(onClose, autoHideDuration);
    return () => clearTimeout(timer);
  }, [autoHideDuration, onClose]);

  const typeStyles = {
    info: 'bg-indigo-950/95 border-indigo-500/50 text-indigo-200',
    success: 'bg-emerald-950/95 border-emerald-500/50 text-emerald-200',
    warning: 'bg-amber-950/95 border-amber-500/50 text-amber-200'
  }[type];

  const icons = {
    info: <Info className="w-5 h-5 text-indigo-400 shrink-0" aria-hidden="true" />,
    success: <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
  }[type];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-xl backdrop-blur-sm max-w-md ${typeStyles}`}
    >
      {icons}
      <p className="text-sm font-medium flex-1">{message}</p>
      <button
        onClick={onClose}
        aria-label="Dismiss notification"
        className="p-1 text-slate-400 hover:text-slate-100 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
};
