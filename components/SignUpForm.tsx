"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { SignupFormValues, signupSchema } from "@/zod/auth.schema";

export function SignupForm() {
  const router = useRouter();
  // const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // const redirectUrl = searchParams.get("callbackUrl");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const passwordValue = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  // Password Strength Indicators
  const hasMinLength = passwordValue.length >= 8;
  const hasUppercase = /[A-Z]/.test(passwordValue);
  const hasNumber = /[0-9]/.test(passwordValue);

  const onSubmit = async (data: SignupFormValues) => {
    const { name, email, password } = data;
    setServerError(null);

    const { error } = await authClient.signUp.email({
      name: name,
      email: email,
      password: password,
    });

    if (error) {
      setServerError(
        error.message ?? "Failed to create account. Please try again.",
      );
      return;
    }

    router.replace("");
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-5 sm:p-7 rounded-2xl border border-neutral-100">
      {/* Header Copy */}
      <div className="mb-4 text-center sm:text-left">
        <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-neutral-950">
          Create Your Account
        </h2>
        <p className="text-xs text-neutral-500 font-medium mt-0.5">
          Join the community for exclusive drops & saved wishlist fits.
        </p>
      </div>

      {/* Global Server Error Banner */}
      {serverError && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2.5 text-red-600 text-xs font-semibold animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{serverError}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3.5"
        noValidate
      >
        {/* Full Name Field */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="name"
            className="text-[11px] font-bold uppercase tracking-wider text-neutral-700"
          >
            Full Name
          </label>
          <div className="relative flex items-center">
            <User className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none" />
            <input
              id="name"
              type="text"
              placeholder="e.g. Tunde Ednut"
              autoComplete="name"
              {...register("name")}
              className={`w-full h-11 pl-10 pr-4 text-xs sm:text-sm font-medium rounded-xl border bg-neutral-50/50 transition-all outline-none focus:bg-white ${
                errors.name
                  ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-neutral-200 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
              }`}
            />
          </div>
          {errors.name && (
            <span className="text-[10px] font-semibold text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.name.message}
            </span>
          )}
        </div>

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
            <span className="text-[10px] font-semibold text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-[11px] font-bold uppercase tracking-wider text-neutral-700"
          >
            Password
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

          {/* Interactive Password Requirements Helper */}
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || (isDirty && !isValid)}
          className="mt-1 w-full h-11 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-black uppercase tracking-widest transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2 shadow-xs"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Creating Account...</span>
            </>
          ) : (
            <span>Create Account</span>
          )}
        </button>
      </form>
    </div>
  );
}
