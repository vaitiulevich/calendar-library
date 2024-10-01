import { Component, ErrorInfo, ReactNode } from 'react';
import React from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by Error Boundary:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p>Something went wrong</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
