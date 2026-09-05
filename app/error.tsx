"use client";

import * as Sentry from "@sentry/nextjs";
import { RotateCcw, AlertTriangle } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalErrorBoundary({ error, reset }: ErrorProps) {
  // captureException is synchronous — no useEffect or useState needed
  const eventId = Sentry.captureException(error);

  //   if (process.env.NODE_ENV !== "production") {
  //     console.error("Caught by Global Error Boundary:", error);
  //   }

  return (
    <main className="h-screen w-full bg-white text-neutral-900 px-4 py-8 flex items-center justify-center overflow-hidden">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Error Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 stroke-[2.5]" />
        </div>

        {/* Main Content */}
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">
            Unexpected Error
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
            Something went wrong
          </h1>
          <p className="text-sm text-neutral-500">
            We ran into an issue loading this page. Please try refreshing or
            reloading the page.
          </p>

          {/* Reference Tag */}
          {eventId && (
            <div className="inline-block pt-2">
              <div className="bg-neutral-100 border border-neutral-200 rounded-lg px-4 py-2 font-mono text-xs text-neutral-700">
                Error Reference:{" "}
                <span className="font-bold text-neutral-950 select-all">
                  {eventId}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 text-white h-11 px-6 rounded-lg font-medium text-sm transition-colors w-full gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    </main>
  );
}
