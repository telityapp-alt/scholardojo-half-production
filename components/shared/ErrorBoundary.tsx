import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  featureName?: string;
}

interface State {
  hasError: boolean;
}

/**
 * ErrorBoundary
 * Standard React Error Boundary component to prevent whole-app crashes.
 */
// Fix: Explicitly using Component from named imports to ensure props and state are correctly inherited and typed.
export class ErrorBoundary extends Component<Props, State> {
  // Fix: Initializing state as a class field with explicit type.
  public state: State = {
    hasError: false
  };

  constructor(props: Props) {
    super(props);
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Fix: Inherited this.props is now correctly recognized via Component import.
    console.error(`[Dojo ${this.props.featureName || 'Feature'} Error]`, error, errorInfo);
  }

  public render() {
    // Fix: Accessing state via this.state.
    if (this.state.hasError) {
      // Fix: Accessing fallback from this.props.
      return this.props.fallback || (
        <div className="p-12 text-center bg-white rounded-[40px] border-4 border-dashed border-red-100 flex flex-col items-center">
            <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-6 border-b-4 border-red-100">
                <AlertTriangle size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-700 uppercase italic tracking-tighter">Feature Strike Failed</h3>
            <p className="text-slate-400 font-bold mt-2 max-w-sm mb-8">
                {/* Fix: Inherited this.props is now correctly recognized. */}
                The {this.props.featureName || 'module'} encountered a neural misalignment.
            </p>
            <button 
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest border-b-4 border-black active:translate-y-1 transition-all"
            >
                <RefreshCcw size={16} /> Re-initialize App
            </button>
        </div>
      );
    }

    // Fix: Inherited this.props.children is now correctly recognized.
    return this.props.children;
  }
}
