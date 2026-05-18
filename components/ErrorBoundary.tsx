"use client";

import * as React from "react";

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

type Props = {
  children: React.ReactNode;
  /** Fallback label shown in the error UI (e.g. "Terminal") */
  label?: string;
  className?: string;
};

type State = { hasError: boolean; error: Error | null };

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log to console in dev — could be sent to a service in prod
    console.error(`[DevOS ErrorBoundary${this.props.label ? ` — ${this.props.label}` : ""}]`, error, info);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  override render() {
    if (this.state.hasError) {
      return (
        <div
          className={cn(
            "devos-glass flex flex-col items-center justify-center gap-4 rounded-3xl p-8 text-center",
            this.props.className,
          )}
          role="alert"
        >
          <div className="text-3xl" aria-hidden>
            ⚠️
          </div>
          <div>
            <h3 className="text-sm font-semibold text-devos-text">
              {this.props.label ? `${this.props.label} crashed` : "Something went wrong"}
            </h3>
            <p className="mt-1 text-xs text-devos-muted">
              {this.state.error?.message ?? "An unexpected error occurred."}
            </p>
          </div>
          <Button variant="secondary" size="sm" onClick={this.handleRetry}>
            Retry
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
