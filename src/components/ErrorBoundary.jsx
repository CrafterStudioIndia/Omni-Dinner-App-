import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#080c14] text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="p-4 rounded-3xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
            <AlertTriangle className="h-10 w-10 animate-bounce" />
          </div>
          <h2 className="text-xl font-extrabold text-white">System Recovered View</h2>
          <p className="text-xs text-rose-300 max-w-md font-mono bg-rose-950/40 p-3 rounded-xl border border-rose-500/30 text-left overflow-x-auto">
            {this.state.error?.toString() || 'Unknown rendering exception'}
          </p>
          <button
            onClick={this.handleReset}
            className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs transition flex items-center space-x-2 shadow-lg shadow-rose-950/50"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Recover & Refresh Workspace</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
