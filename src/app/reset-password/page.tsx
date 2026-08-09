"use client";

import { useState, FormEvent, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, AlertCircle, KeyRound, Eye, EyeOff } from "lucide-react";

function AnimatedGradientBg() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-950"
      aria-hidden="true"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -top-32 -left-20 w-[30rem] h-[30rem] bg-gradient-to-tr from-fuchsia-600/30 via-violet-600/20 to-indigo-500/20 rounded-full blur-3xl opacity-50 animate-pulse" />
      <div className="absolute top-1/3 -right-20 w-[28rem] h-[28rem] bg-gradient-to-b from-blue-600/20 via-cyan-500/20 to-violet-600/20 rounded-full blur-3xl opacity-40 animate-pulse [animation-delay:2s]" />
      <div className="absolute bottom-10 left-1/3 w-[22rem] h-[22rem] bg-gradient-to-tr from-purple-600/20 via-indigo-500/20 to-pink-500/20 rounded-full blur-3xl opacity-30 animate-pulse [animation-delay:4s]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
}

function ResetPasswordFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePassword = (val: string): boolean => {
    if (!val) {
      setPasswordError("Password is required.");
      return false;
    }
    if (val.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const validateConfirmPassword = (val: string, passVal: string): boolean => {
    if (!val) {
      setConfirmPasswordError("Please confirm your password.");
      return false;
    }
    if (val !== passVal) {
      setConfirmPasswordError("Passwords do not match.");
      return false;
    }
    setConfirmPasswordError(null);
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);
    setSuccessMessage(null);

    if (!token) {
      setServerError("Invalid or missing password reset token.");
      return;
    }

    const isPassValid = validatePassword(password);
    const isConfirmValid = validateConfirmPassword(confirmPassword, password);

    if (!isPassValid || !isConfirmValid) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.message || "Failed to reset password. Token may be invalid or expired.");
        setIsSubmitting(false);
        return;
      }

      setSuccessMessage("Password reset successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center font-sans bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white px-4 py-12 antialiased">
      <AnimatedGradientBg />
      <main className="w-full flex items-center justify-center relative z-10">
        <div className="relative w-full max-w-md group">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-fuchsia-500/20 opacity-50 blur-xl transition duration-500 group-hover:opacity-75" />
          <div className="relative w-full bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-2xl flex flex-col px-7 py-9 sm:px-10 sm:py-11 transition-all duration-300">
            
            <div className="text-center mb-7">
              <Link href="/" className="inline-flex items-center gap-2 mb-4 group/brand">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-fuchsia-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover/brand:shadow-indigo-500/40 transition-all duration-300">
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400 font-extrabold text-sm">
                      ✦
                    </span>
                  </div>
                </div>
                <span className="font-extrabold text-lg tracking-tight text-white">
                  AI Study Hub
                </span>
              </Link>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4 text-indigo-400">
                <KeyRound className="w-6 h-6" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Set New Password
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                Please enter and confirm your new account password.
              </p>
            </div>

            {serverError && (
              <div className="w-full mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-medium flex items-center gap-2.5 animate-fadeIn">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                <span>{serverError}</span>
              </div>
            )}

            {successMessage && (
              <div className="w-full mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-start gap-2.5 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400 mt-0.5" />
                <span className="leading-relaxed">{successMessage}</span>
              </div>
            )}

            <form className="flex flex-col gap-4.5 w-full" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    disabled={isSubmitting}
                    suppressHydrationWarning
                    placeholder="At least 8 characters"
                    className={`w-full px-4 py-3 pr-11 rounded-xl bg-slate-950/80 text-white selection:bg-purple-600 selection:text-white caret-indigo-400 border text-sm outline-none transition-all duration-200 focus:ring-2 placeholder:text-slate-500 disabled:opacity-60 disabled:cursor-not-allowed ${
                      passwordError
                        ? "border-red-500/80 focus:ring-red-500/20 focus:border-red-500"
                        : "border-slate-800 focus:ring-indigo-500/20 focus:border-indigo-500"
                    }`}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) validatePassword(e.target.value);
                      if (confirmPassword && confirmPasswordError) {
                        validateConfirmPassword(confirmPassword, e.target.value);
                      }
                    }}
                    onBlur={(e) => validatePassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200 focus:outline-none p-1 rounded-md transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
                {passwordError && (
                  <p className="mt-1.5 text-xs font-medium text-red-400">{passwordError}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    disabled={isSubmitting}
                    suppressHydrationWarning
                    placeholder="Re-enter your password"
                    className={`w-full px-4 py-3 pr-11 rounded-xl bg-slate-950/80 text-white selection:bg-purple-600 selection:text-white caret-indigo-400 border text-sm outline-none transition-all duration-200 focus:ring-2 placeholder:text-slate-500 disabled:opacity-60 disabled:cursor-not-allowed ${
                      confirmPasswordError
                        ? "border-red-500/80 focus:ring-red-500/20 focus:border-red-500"
                        : "border-slate-800 focus:ring-indigo-500/20 focus:border-indigo-500"
                    }`}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (confirmPasswordError) validateConfirmPassword(e.target.value, password);
                    }}
                    onBlur={(e) => validateConfirmPassword(e.target.value, password)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200 focus:outline-none p-1 rounded-md transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
                {confirmPasswordError && (
                  <p className="mt-1.5 text-xs font-medium text-red-400">{confirmPasswordError}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 px-5 py-3.5 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? "Resetting Password..." : "Update Password"}
              </button>
            </form>

            <div className="w-full text-center mt-7 pt-4 border-t border-slate-800/80">
              <span className="text-xs text-slate-400">
                Remember your password?{" "}
                <Link href="/login" className="font-semibold text-purple-400 hover:text-purple-300 inline-flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3 inline" />
                  <span>Back to Login</span>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <ResetPasswordFormContent />
    </Suspense>
  );
}