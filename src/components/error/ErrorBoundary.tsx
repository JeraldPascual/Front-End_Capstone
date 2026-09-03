import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';
import { Button } from '../common/Button';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center"
        >
          <div className="max-w-md w-full bg-slate-900 border border-rose-600/50 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-950/80 border border-rose-600/40 flex items-center justify-center text-rose-400 mx-auto">
              <AlertOctagon className="w-6 h-6" aria-hidden="true" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-100">
                {this.props.fallbackTitle || 'Something went wrong'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                The application encountered an unexpected runtime boundary error. Your data in local storage remains safe.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-slate-950 rounded-lg text-left text-xs font-mono text-rose-300 overflow-x-auto max-h-32 border border-slate-800">
                {this.state.error.message}
              </div>
            )}

            <div className="pt-2">
              <Button
                variant="primary"
                onClick={this.handleReset}
                leftIcon={<RotateCcw className="w-4 h-4" />}
                className="w-full"
              >
                Reload Application
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
