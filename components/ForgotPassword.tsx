"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  Loader2,
  AlertCircle,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "@/zod/auth.schema";

export function ForgotPasswordForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setServerError(null);

    try {
      // Better-Auth password reset trigger
      const { error } = await authClient.requestPasswordReset({
        email: data.email,
        redirectTo: "/reset-password",
      });

      if (error) {
        if (error.status === 429) {
          setServerError(
            "Too many attempts. Please wait a few minutes and try again.",
          );
          return;
        }
        setServerError(
          error.message ?? "Failed to send reset link. Please try again.",
        );
        return;
      }

      setSubmittedEmail(data.email);
      setIsSubmitted(true);
    } catch (err: unknown) {
      setServerError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-5 sm:p-7 rounded-2xl border border-neutral-100 shadow-lg">
      {!isSubmitted ? (
        <>
          {/* Header Copy */}
          <div className="mb-5 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-extrabold uppercase tracking-widest mb-2">
              <KeyRound className="w-3 h-3 text-neutral-900" />
              <span>Account Recovery</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-neutral-950">
              Forgot Password?
            </h2>
            <p className="text-xs text-neutral-500 font-medium mt-0.5">
              No stress. Enter your registered email and we&apos;ll send you a
              password reset link.
            </p>
          </div>

          {/* Global Server Error Banner */}
          {serverError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2.5 text-red-600 text-xs font-semibold animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
            noValidate
          >
            {/* Email Field */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-[11px] font-bold uppercase tracking-wider text-neutral-700"
              >
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="email"
                  {...register("email")}
                  className={`w-full h-11 pl-10 pr-4 text-xs sm:text-sm font-medium rounded-xl border bg-neutral-50/50 transition-all outline-none focus:bg-white ${
                    errors.email
                      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-neutral-200 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
                  }`}
                />
              </div>
              {errors.email && (
                <span className="text-[10px] font-semibold text-red-500 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full h-11 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-black uppercase tracking-widest transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2 shadow-xs"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Sending Link...</span>
                </>
              ) : (
                <span>Send Reset Link</span>
              )}
            </button>
          </form>
        </>
      ) : (
        /* Success Confirmation State */
        <div className="flex flex-col items-center text-center py-2 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <h2 className="text-lg font-black uppercase tracking-tight text-neutral-950 mb-1">
            Check Your Email
          </h2>

          <p className="text-xs text-neutral-600 font-medium leading-relaxed max-w-xs mb-4">
            We sent a password reset link to: <br />
            <span className="font-bold text-neutral-950">{submittedEmail}</span>
          </p>

          <p className="text-[11px] text-neutral-400 font-medium mb-6">
            Didn&apos;t receive the email? Check your spam folder or try
            requesting again below.
          </p>

          <button
            onClick={() => setIsSubmitted(false)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-700 hover:text-neutral-950 transition-colors mb-2 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Resend password link</span>
          </button>
        </div>
      )}

      {/* Back to Login Action */}
      <div className="mt-6 pt-5 border-t border-neutral-100 text-center">
        <Link
          href="/login"
          className="inline-flex items-center justify-center gap-2 text-xs font-black text-neutral-950 uppercase tracking-wider hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign In</span>
        </Link>
      </div>
    </div>
  );
}
