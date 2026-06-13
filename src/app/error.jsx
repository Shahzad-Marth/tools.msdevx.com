"use client";

export default function RootError({ reset }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-5xl mb-4">⚠️</div>
      <h1 className="text-2xl font-bold text-text mb-2">Something went wrong</h1>
      <p className="text-text-muted mb-6 max-w-md">
        An unexpected error occurred. Please try again or contact support if the problem persists.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-2.5 bg-brand text-white rounded-lg font-medium hover:bg-brand-hover transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
