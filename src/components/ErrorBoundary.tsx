import { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  // Step 1: Catch the error and update state
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error: error,
    };
  }

  // step 2: Log the error detail
  componentDdCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("🚨 Error Boundary caught an error:", error);
    console.error("📋 Error Info:", errorInfo);
  }

  render() {
    // If there's an error, show fallback UI
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen bg-red-50 dark:bg-red-900/20 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
              ⚠️ Oops! Something went wrong
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We encountered an error. Don't worry, your data is safe.
            </p>
            <details className="mb-4">
              <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                Show error details
              </summary>
              <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-900 p-2 rounded overflow-auto">
                {this.state.error?.toString()}
              </pre>
            </details>
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    // No error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
