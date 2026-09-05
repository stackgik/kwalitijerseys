"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  Lock,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import {
  ResetPasswordFormValues,
  resetPasswordSchema,
} from "@/zod/auth.schema";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token") || "";

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  const hasMinLength = passwordValue.length >= 8;
  const hasUppercase = /[A-Z]/.test(passwordValue);
  const hasNumber = /[0-9]/.test(passwordValue);

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setServerError(null);

    if (!token) {
      setServerError(
        "Invalid or missing reset token. Please request a new reset link.",
      );
      return;
    }

    try {
      const { error } = await authClient.resetPassword({
        newPassword: data.password,
        token: token,
      });

      if (error) {
        setServerError(
          error.message ?? "Failed to reset password. Token may have expired.",
        );
        return;
      }

      setIsSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2500);
    } catch (err: unknown) {
      setServerError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-5 sm:p-7 rounded-2xl border border-neutral-100 shadow-lg">
      {!isSuccess ? (
        <>
          {/* Header Copy */}
          <div className="mb-5 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-extrabold uppercase tracking-widest mb-2">
              <ShieldCheck className="w-3 h-3 text-neutral-900" />
              <span>Set New Password</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-neutral-950">
              Reset Password
            </h2>
            <p className="text-xs text-neutral-500 font-medium mt-0.5">
              Enter a strong new password for your Kwalitijerseys account.
            </p>
          </div>

          {/* Missing Token Warning Banner */}
          {!token && (
            <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-2.5 text-amber-800 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
              <span>
                Reset token missing from URL. Please ensure you clicked the full
                link sent to your email.
              </span>
            </div>
          )}

          {/* Global Server Error Banner */}
          {serverError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2.5 text-red-600 text-xs font-semibold animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Reset Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3.5"
            noValidate
          >
            {/* New Password Field */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="text-[11px] font-bold uppercase tracking-wider text-neutral-700"
              >
                New Password
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  {...register("password")}
                  className={`w-full h-11 pl-10 pr-11 text-xs sm:text-sm font-medium rounded-xl border bg-neutral-50/50 transition-all outline-none focus:bg-white ${
                    errors.password
                      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-neutral-200 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 p-1 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-[10px] font-semibold text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password.message}
                </span>
              )}

              {/* Password Requirements Helper */}
              {passwordValue.length > 0 && (
                <div className="mt-1 p-2 rounded-lg bg-neutral-50 border border-neutral-100 flex flex-col gap-1 text-[10px]">
                  <div
                    className={`flex items-center gap-1.5 ${
                      hasMinLength
                        ? "text-emerald-600 font-medium"
                        : "text-neutral-400"
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>At least 8 characters</span>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 ${
                      hasUppercase
                        ? "text-emerald-600 font-medium"
                        : "text-neutral-400"
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>At least one uppercase letter (A-Z)</span>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 ${
                      hasNumber
                        ? "text-emerald-600 font-medium"
                        : "text-neutral-400"
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>At least one number (0-9)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="confirmPassword"
                className="text-[11px] font-bold uppercase tracking-wider text-neutral-700"
              >
                Confirm New Password
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none" />
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  {...register("confirmPassword")}
                  className={`w-full h-11 pl-10 pr-4 text-xs sm:text-sm font-medium rounded-xl border bg-neutral-50/50 transition-all outline-none focus:bg-white ${
                    errors.confirmPassword
                      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-neutral-200 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
                  }`}
                />
              </div>
              {errors.confirmPassword && (
                <span className="text-[10px] font-semibold text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !token}
              className="mt-1 w-full h-11 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-black uppercase tracking-widest transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2 shadow-xs"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Updating Password...</span>
                </>
              ) : (
                <span>Update Password</span>
              )}
            </button>
          </form>
        </>
      ) : (
        /* Password Successfully Updated State */
        <div className="flex flex-col items-center text-center py-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <h2 className="text-lg font-black uppercase tracking-tight text-neutral-950 mb-1">
            Password Reset Complete!
          </h2>

          <p className="text-xs text-neutral-600 font-medium leading-relaxed max-w-xs mb-6">
            Your password has been updated successfully. Redirecting you to sign
            in...
          </p>

          <Link
            href="/login"
            className="w-full h-11 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <span>Proceed to Login</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
