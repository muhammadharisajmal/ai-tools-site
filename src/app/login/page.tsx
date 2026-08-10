"use client";
import Link from "next/link";
import { useState, FormEvent, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

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

function SignInFormContent() {
  const searchParams = useSearchParams();
  const isAdminAccess = searchParams.get("admin") === "true";
  const callbackUrlParam = searchParams.get("callbackUrl");
  const callbackError = searchParams.get("error");
  const isJustRegistered = searchParams.get("registered") === "true";
  const registeredEmail = searchParams.get("email");

  const [email, setEmail] = useState(registeredEmail || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isUnverified, setIsUnverified] = useState(false);

  useEffect(() => {
    if (isJustRegistered) {
      toast.success("Account created! A verification email has been sent.", {
        duration: 6000,
      });
      setIsUnverified(true);
    }
    if (callbackError === "EMAIL_NOT_VERIFIED") {
      setErrorMessage("Your email has not been verified. Please verify your email first.");
      setIsUnverified(true);
    }
  }, [isJustRegistered, callbackError]);

  const validateEmail = (val: string): boolean => {
    if (!val.trim()) {
      setEmailError("Email address is required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError(null);
    return true;
  };

  const validatePassword = (val: string): boolean => {
    if (!val) {
      setPasswordError("Password is required.");
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsUnverified(false);

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    if (!isEmailValid || !isPasswordValid) return;

    setIsSubmitting(true);
    try {
      const res = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      if (res?.error) {
        // Parse custom error codes returned from NextAuth authorize
        if (res.code === "user_not_found") {
          setErrorMessage("This email is not registered. Please sign up first.");
        } else if (res.code === "email_not_verified") {
          setErrorMessage("Your email has not been verified. Please check your inbox or resend verification.");
          setIsUnverified(true);
        } else if (res.code === "invalid_credentials") {
          setErrorMessage("Incorrect password. Please try again.");
        } else {
          setErrorMessage("Invalid email or password.");
        }
        setIsSubmitting(false);
        return;
      }

      const sessionRes = await fetch("/api/auth/session");
      const sessionData = await sessionRes.json();
      let targetUrl = "/dashboard";
      if (sessionData?.user?.role === "ADMIN") {
        targetUrl = "/admin";
      } else if (callbackUrlParam && !callbackUrlParam.startsWith("/admin")) {
        try {
          const url = new URL(callbackUrlParam, window.location.origin);
          targetUrl = url.pathname + url.search;
        } catch {
          targetUrl = callbackUrlParam;
        }
      }
      window.location.href = targetUrl;
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again later.");
      setIsSubmitting(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email address in the field above.");
      return;
    }
    setIsResending(true);
    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Verification email has been sent successfully.");
      } else {
        toast.error(data.message || "Failed to resend verification email.");
      }
    } catch {
      toast.error("An error occurred while connecting to the server.");
    } finally {
      setIsResending(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setIsGoogleLoading(true);
    try {
      let redirectUrl = "/dashboard";
      if (callbackUrlParam) {
        try {
          const url = new URL(callbackUrlParam, window.location.origin);
          redirectUrl = url.pathname + url.search;
        } catch {
          redirectUrl = "/dashboard";
        }
      }
      await signIn("google", { callbackUrl: redirectUrl });
    } catch {
      setErrorMessage("Unable to connect with Google. Please try again.");
      setIsGoogleLoading(false);
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
              <Link href="/" className="inline-flex items-center gap-2 mb-3 group/brand">
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
              {isAdminAccess && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-semibold text-xs mb-2">
                  <span>🔒 Administrator Portal</span>
                </div>
              )}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {isAdminAccess ? "Administrator Login" : "Welcome Back"}
              </h1>
              <p className="text-sm text-slate-400 mt-1 font-normal">
                {isAdminAccess
                  ? "Authenticate with privileged admin credentials"
                  : "Sign in to continue your AI-powered learning"}
              </p>
            </div>

            {errorMessage && (
              <div
                className="w-full mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm font-medium flex items-center gap-2.5 animate-fadeIn"
                role="alert"
              >
                <svg className="w-5 h-5 flex-shrink-0 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading || isSubmitting || isResending}
              className="w-full mb-6 flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-white font-semibold text-sm shadow-sm hover:bg-slate-800 hover:border-slate-600 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>{isGoogleLoading ? "Connecting to Google..." : "Continue with Google"}</span>
            </button>

            <div className="w-full flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-slate-800" />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">or email</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            <form className="w-full flex flex-col gap-4.5" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  disabled={isSubmitting || isGoogleLoading || isResending}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 text-white border border-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-xs font-medium text-purple-400 hover:text-purple-300">
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  disabled={isSubmitting || isGoogleLoading || isResending}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 text-white border border-slate-800 text-sm outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isGoogleLoading || isResending}
                className="w-full mt-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 px-5 py-3.5 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Resend Verification Button shown ONLY if unverified */}
            {isUnverified && (
              <div className="mt-4 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleResendVerification}
                  disabled={isResending}
                  className="w-full rounded-lg bg-blue-600 py-2.5 text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer font-semibold text-xs transition-colors shadow"
                >
                  {isResending ? "Sending Verification Email..." : "Resend Verification Email"}
                </button>
                <Link href="/signup" className="block text-xs text-slate-400 hover:text-white text-center mt-1">
                  Change Email / Sign Up Again
                </Link>
              </div>
            )}

            <div className="w-full text-center mt-7 pt-4 border-t border-slate-800/80">
              <span className="text-xs text-slate-400">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-semibold text-purple-400 hover:text-purple-300">
                  Sign Up
                </Link>
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <SignInFormContent />
    </Suspense>
  );
}