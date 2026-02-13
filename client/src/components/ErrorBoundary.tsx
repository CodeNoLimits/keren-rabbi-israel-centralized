import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          dir="rtl"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fff",
            fontFamily: "Assistant, system-ui, sans-serif",
            padding: "2rem",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: 480 }}>
            <h1 style={{ fontSize: "2rem", color: "#0B61B3", marginBottom: "1rem" }}>
              אופס! משהו השתבש
            </h1>
            <p style={{ color: "#64748b", marginBottom: "1.5rem", lineHeight: 1.6 }}>
              אירעה שגיאה בלתי צפויה. אנא רענן את הדף ונסה שוב.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: "#FF6B00",
                color: "#fff",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.75rem 2rem",
                fontSize: "1.1rem",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              רענן את הדף
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
