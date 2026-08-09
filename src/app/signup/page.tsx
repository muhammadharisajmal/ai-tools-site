"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

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

export default function SignUpPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  const validateFullName = (val: string): boolean => {
    if (!val.trim()) {
      setFullNameError("Full name is required.");
      return false;
    }
    setFullNameError(null);
    return true;
  };

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
    setErrorMessage(null);

    const isNameValid = validateFullName(fullName);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmValid = validateConfirmPassword(confirmPassword, password);

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName.trim(),
          email: email.trim().toLowerCase(),
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || data.error || "Failed to create account. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // Redirect immediately to login with registered query param
      router.push(`/login?registered=true&email=${encodeURIComponent(email.trim().toLowerCase())}`);
    } catch {
      setErrorMessage("An unexpected network error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setIsGoogleLoading(true);
    try {
      await signIn("google", {
        callbackUrl: "/dashboard",
      });
    } catch {
      setErrorMessage("Unable to authenticate with Google. Please try again.");
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
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Create Your Account
              </h1>
              <p className="text-sm text-slate-400 mt-1 font-normal">
                Join thousands of students learning smarter with AI
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
              disabled={isGoogleLoading || isSubmitting}
              className="w-full mb-6 flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-white font-semibold text-sm shadow-sm hover:bg-slate-800 hover:border-slate-600 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
              aria-label="Continue with Google"
            >
              {isGoogleLoading ? (
                <svg className="animate-spin h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              <span>{isGoogleLoading ? "Connecting to Google..." : "Continue with Google"}</span>
            </button>

            <div className="w-full flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-slate-800" />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">or email</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            <form className="flex flex-col gap-4.5 w-full" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  disabled={isSubmitting || isGoogleLoading}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 text-white selection:bg-purple-600 selection:text-white caret-indigo-400 border text-sm outline-none transition-all duration-200 focus:ring-2 placeholder:text-slate-500 disabled:opacity-60 disabled:cursor-not-allowed ${
                    fullNameError
                      ? "border-red-500/80 focus:ring-red-500/20 focus:border-red-500"
                      : "border-slate-800 focus:ring-indigo-500/20 focus:border-indigo-500"
                  }`}
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (fullNameError) validateFullName(e.target.value);
                  }}
                  onBlur={(e) => validateFullName(e.target.value)}
                  autoComplete="name"
                  aria-invalid={!!fullNameError}
                  aria-describedby={fullNameError ? "fullname-error" : undefined}
                />
                {fullNameError && (
                  <p id="fullname-error" className="mt-1.5 text-xs font-medium text-red-400">
                    {fullNameError}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  disabled={isSubmitting || isGoogleLoading}
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

              <div>
                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    disabled={isSubmitting || isGoogleLoading}
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
                    aria-invalid={!!passwordError}
                    aria-describedby={passwordError ? "password-error" : undefined}
                  />
                  <button
                    type="button"
                    disabled={isSubmitting || isGoogleLoading}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200 focus:outline-none p-1 rounded-md transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.025 10.025 0 013.682-.763c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m-4.692-4.692a3 3 0 00-4.243-4.243m4.242 4.242L3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p id="password-error" className="mt-1.5 text-xs font-medium text-red-400">
                    {passwordError}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    disabled={isSubmitting || isGoogleLoading}
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
                    aria-invalid={!!confirmPasswordError}
                    aria-describedby={confirmPasswordError ? "confirm-password-error" : undefined}
                  />
                  <button
                    type="button"
                    disabled={isSubmitting || isGoogleLoading}
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200 focus:outline-none p-1 rounded-md transition-colors"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? (
                      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.025 10.025 0 013.682-.763c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m-4.692-4.692a3 3 0 00-4.243-4.243m4.242 4.242L3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {confirmPasswordError && (
                  <p id="confirm-password-error" className="mt-1.5 text-xs font-medium text-red-400">
                    {confirmPasswordError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isGoogleLoading}
                className="w-full mt-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 px-5 py-3.5 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4.5 w-4.5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="w-full text-center mt-7 pt-4 border-t border-slate-800/80">
              <span className="text-xs text-slate-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-purple-400 hover:text-purple-300 transition-colors focus:outline-none focus:underline"
                >
                  Sign In
                </Link>
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}