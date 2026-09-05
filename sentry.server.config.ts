import * as Sentry from "@sentry/nextjs";

// sentry.server.config.ts
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_APP_ENV,
  enabled: ["staging", "production"].includes(
    process.env.NEXT_PUBLIC_APP_ENV ?? "",
  ),
  tracesSampleRate: 0.1,
  enableLogs: true,
});
