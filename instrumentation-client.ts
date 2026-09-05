import * as Sentry from "@sentry/nextjs";

// instrumentation-client.ts
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_APP_ENV,
  enabled: ["staging", "production"].includes(
    process.env.NEXT_PUBLIC_APP_ENV ?? "",
  ),
  integrations: [Sentry.replayIntegration()],
  tracesSampleRate: 0.1,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
