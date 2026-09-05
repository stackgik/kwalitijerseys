"use client";

import { useState } from "react";
import * as Sentry from "@sentry/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { LoginFormValues, loginSchema } from "@/zod/auth.schema";

const SignInForm = ({ redirectUrl }: { redirectUrl: string }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null);

    try {
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (error) {
        setServerError(
          error.message ?? "Invalid email or password. Please try again.",
        );
        return;
      }

      router.replace(redirectUrl);
      router.refresh();
    } catch (err: unknown) {
      Sentry.captureException(err, { tags: { flow: "login" } });
      setServerError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-5 sm:p-7 rounded-2xl border border-neutral-100 shadow-lg">
      {/* Header Copy */}
      <div className="mb-5 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-extrabold uppercase tracking-widest mb-2">
          <ShieldCheck className="w-3 h-3 text-neutral-900" />
          <span>Member Sign In</span>
        </div>
        <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-neutral-950">
          Welcome Back
        </h2>
        <p className="text-xs text-neutral-500 font-medium mt-0.5">
          Sign in to track orders, manage saved fits & access member drops.
        </p>
      </div>

      {/* Global Server Error Banner */}
      {serverError && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2.5 text-red-600 text-xs font-semibold animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Login Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
        noValidate
      >
        {}
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

        {/* Password Field */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-[11px] font-bold uppercase tracking-wider text-neutral-700"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-[11px] font-bold text-neutral-500 hover:text-neutral-950 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative flex items-center">
            <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
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
            <span className="text-[10px] font-semibold text-red-500 flex items-center gap-1 mt-0.5">
              <AlertCircle className="w-3 h-3" />
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center gap-2 pt-0.5">
          <input
            id="rememberMe"
            type="checkbox"
            {...register("rememberMe")}
            className="w-4 h-4 rounded border-neutral-300 text-neutral-950 focus:ring-neutral-900 accent-neutral-950 cursor-pointer"
          />
          <label
            htmlFor="rememberMe"
            className="text-xs font-semibold text-neutral-600 select-none cursor-pointer"
          >
            Remember me on this device
          </label>
        </div>

        {}
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full h-11 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-black uppercase tracking-widest transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2 shadow-xs"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Signing In...</span>
            </>
          ) : (
            <>
              <span>Log In</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Switch to Signup Link */}
      <div className="mt-6 pt-5 border-t border-neutral-100 text-center">
        <p className="text-xs font-medium text-neutral-500">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/register"
            className="font-black text-neutral-950 uppercase tracking-wide hover:underline inline-flex items-center gap-1"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
