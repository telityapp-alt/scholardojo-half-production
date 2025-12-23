
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

export class ErrorBoundary extends Component<Props, State> {
  // Fix: Explicitly defining the constructor to initialize state and handle props correctly for TypeScript compatibility.
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Fix: Accessing props via this.props to resolve the error in a class component context.
    console.error(`[Dojo ${this.props.featureName || 'Feature'} Error]`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // Fix: Accessing props via this.props to resolve the error in a class component context.
      return this.props.fallback || (
        <div className="p-12 text-center bg-white rounded-[40px] border-4 border-dashed border-red-100 flex flex-col items-center">
            <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-6 border-b-4 border-red-100">
                <AlertTriangle size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-700 uppercase italic tracking-tighter">Feature Strike Failed</h3>
            <p className="text-slate-400 font-bold mt-2 max-w-sm mb-8">
                {/* Fix: Accessing props via this.props to resolve the error in a class component context. */}
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

    // Fix: Accessing props via this.props to resolve the error in a class component context.
    return this.props.children;
  }
}
