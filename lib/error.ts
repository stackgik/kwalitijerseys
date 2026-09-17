import * as Sentry from "@sentry/nextjs";

// The single chokepoint for domain-level errors
export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string; code: string };

export type ErrorCode =
  | "NOT_FOUND"
  | "UNAUTHENTICATED"
  | "PAYMENT_FAILED"
  | "INTERNAL_ERROR"
  | "VALIDATION_ERROR";

//   Create a designated Error that carries my signature
export class AppError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

// prettier-ignore
export const handleActionError = (error: unknown, context: string): Result<never> => {
    if(error instanceof AppError){
        return {success: false, error: error.message, code: error.code}
    }

    Sentry.captureException(error, {tags: {context}})

    return {success: false, error: "Something went wrong", code: "INTERNAL_ERROR"}
};
