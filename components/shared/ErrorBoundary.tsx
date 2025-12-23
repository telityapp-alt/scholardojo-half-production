
import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback?: ReactNode;
  featureName?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * ErrorBoundary
 * Standard React Error Boundary component to prevent whole-app crashes.
 */
// Fix: Extending React.Component explicitly to ensure props and state are correctly inherited and recognized by the compiler.
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // Fix: Using an explicit constructor to initialize state and ensure this.props is properly typed across all lifecycle methods.
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Fix: Accessing this.props featureName which is now correctly recognized by inheriting from React.Component.
    console.error(`[Dojo ${this.props.featureName || 'Feature'} Error]`, error, errorInfo);
  }

  public render() {
    // Fix: Accessing this.state and this.props properties within the render method to determine which UI to display.
    if (this.state.hasError) {
      return (this.props.fallback as ReactNode) || (
        <div className="p-12 text-center bg-white rounded-[40px] border-4 border-dashed border-red-100 flex flex-col items-center">
            <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-6 border-b-4 border-red-100">
                <AlertTriangle size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-700 uppercase italic tracking-tighter">Feature Strike Failed</h3>
            <p className="text-slate-400 font-bold mt-2 max-sm mb-8">
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

    // Fix: Correctly returning children from this.props when no error has been caught.
    return this.props.children;
  }
}
