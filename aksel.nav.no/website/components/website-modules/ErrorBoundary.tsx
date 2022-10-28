import React, { ErrorInfo } from "react";

interface Props {
  boundaryName?: string;
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true, error, errorInfo });
    console.error(error);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <div className="vk-errorboundary" />;
    }
    return this.props.children;
  }
}

export function withErrorBoundary<Props>(
  Component: React.ComponentType<Props>,
  boundaryName: string
) {
  return (props: Props): any => {
    return (
      <ErrorBoundary boundaryName={boundaryName}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
