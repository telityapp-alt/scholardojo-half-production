
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
 * Fixed: Explicitly extends Component and uses class fields for robust property resolution.
 */
export class ErrorBoundary extends Component<Props, State> {
  // Fixed: Explicit state declaration as a class field to resolve 'state' property errors
  public state: State = {
    hasError: false
  };

  // Fixed: Constructor using super(props) to ensure 'this.props' is available
  constructor(props: Props) {
    super(props);
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Fixed: 'this.props' is correctly resolved via inheritance from Component
    console.error(`[Dojo ${this.props.featureName || 'Feature'} Error]`, error, errorInfo);
  }

  public render() {
    // Fixed: 'this.state' is correctly resolved via inheritance from Component
    if (this.state.hasError) {
      // Fixed: 'this.props' is correctly resolved via inheritance from Component
      return this.props.fallback || (
        <div className="p-12 text-center bg-white rounded-[40px] border-4 border-dashed border-red-100 flex flex-col items-center">
            <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-6 border-b-4 border-red-100">
                <AlertTriangle size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-700 uppercase italic tracking-tighter">Feature Strike Failed</h3>
            <p className="text-slate-400 font-bold mt-2 max-w-sm mb-8">
                {/* Fixed: Accessing props correctly from the class instance */}
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

    // Fixed: Accessing children correctly from the class instance
    return this.props.children;
  }
}
