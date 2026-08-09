"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, AlertCircle, KeyRound } from "lucide-react";

// Synchronized Background: Dark Navy theme with ambient glows and grid overlay
function AnimatedGradientBg() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-950"
      aria-hidden="true"
    >
      {/* Primary Cyan/Indigo ambient radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

      {/* Floating animated ambient light orbs */}
      <div className="absolute -top-32 -left-20 w-[30rem] h-[30rem] bg-gradient-to-tr from-fuchsia-600/30 via-violet-600/20 to-indigo-500/20 rounded-full blur-3xl opacity-50 animate-pulse" />
      <div className="absolute top-1/3 -right-20 w-[28rem] h-[28rem] bg-gradient-to-b from-blue-600/20 via-cyan-500/20 to-violet-600/20 rounded-full blur-3xl opacity-40 animate-pulse [animation-delay:2s]" />
      <div className="absolute bottom-10 left-1/3 w-[22rem] h-[22rem] bg-gradient-to-tr from-purple-600/20 via-indigo-500/20 to-pink-500/20 rounded-full blur-3xl opacity-30 animate-pulse [animation-delay:4s]" />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Email Validation Helper
  const validateEmail = (val: string): boolean => {
    if (!val.trim()) {
      setEmailError("Email address is required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val.trim())) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError(null);
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);
    setSuccessMessage(null);

    const isEmailValid = validateEmail(email);
    if (!isEmailValid) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.message || "Failed to process request. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setSuccessMessage(
        data.message ||
          "If an account exists with this email, a password reset link has been sent."
      );
      setIsSubmitting(false);
    } catch (err) {
      setServerError("An unexpected network error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center font-sans bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white px-4 py-12 antialiased">
      <AnimatedGradientBg />

      <main className="w-full flex items-center justify-center relative z-10">
        {/* Glassmorphism auth card with subtle glow framing */}
        <div className="relative w-full max-w-md group">
          {/* Background glow */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-fuchsia-500/20 opacity-50 blur-xl transition duration-500 group-hover:opacity-75" />

          <div className="relative w-full bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-2xl flex flex-col px-7 py-9 sm:px-10 sm:py-11 transition-all duration-300">
            {/* Header Title & Branding */}
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
                Forgot Password
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                Enter your email address and we'll send you a secure password reset link.
              </p>
            </div>

            {/* Server Error Alert */}
            {serverError && (
              <div
                className="w-full mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-medium flex items-center gap-2.5 animate-fadeIn"
                role="alert"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Success Alert */}
            {successMessage && (
              <div
                className="w-full mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-start gap-2.5 animate-fadeIn"
                role="status"
              >
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400 mt-0.5" />
                <span className="leading-relaxed">{successMessage}</span>
              </div>
            )}

            {/* Form */}
            <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit} noValidate>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  disabled={isSubmitting}
                  placeholder="name@example.com"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 text-white selection:bg-purple-600 selection:text-white caret-indigo-400 border text-sm outline-none transition-all duration-200 focus:ring-2 placeholder:text-slate-500 disabled:opacity-60 disabled:cursor-not-allowed ${
                    emailError
                      ? "border-red-500/80 focus:ring-red-500/20 focus:border-red-500"
                      : "border-slate-800 focus:ring-indigo-500/20 focus:border-indigo-500"
                  }`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) validateEmail(e.target.value);
                  }}
                  onBlur={(e) => validateEmail(e.target.value)}
                  autoComplete="email"
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? "email-error" : undefined}
                />
                {emailError && (
                  <p id="email-error" className="mt-1.5 text-xs font-medium text-red-400">
                    {emailError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 px-5 py-3.5 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4.5 w-4.5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>

            {/* Back to Login Footer */}
            <div className="w-full text-center mt-7 pt-4 border-t border-slate-800/80">
              <span className="text-xs text-slate-400">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-1 focus:outline-none focus:underline"
                >
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