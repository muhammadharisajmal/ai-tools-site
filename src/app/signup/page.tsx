"use client";
import Link from "next/link";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

function AnimatedGradientBg() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-950" aria-hidden="true">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -top-32 -left-20 w-[30rem] h-[30rem] bg-gradient-to-tr from-fuchsia-600/30 via-violet-600/20 to-indigo-500/20 rounded-full blur-3xl opacity-50 animate-pulse" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
}

function SignUpFormContent() {
  const searchParams = useSearchParams();
  const callbackUrlParam = searchParams.get("callbackUrl");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    <div className="relative min-h-screen flex items-center justify-center font-sans bg-slate-950 text-slate-100 px-4 py-12">
      <AnimatedGradientBg />
      <main className="w-full flex items-center justify-center relative z-10">
        <div className="relative w-full max-w-md">
          <div className="relative w-full bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-2xl flex flex-col px-7 py-9 sm:px-10 sm:py-11">
            
            <div className="text-center mb-7">
              <Link href="/" className="inline-flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-fuchsia-500 p-0.5 shadow-md shadow-indigo-500/20">
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400 font-extrabold text-sm">✦</span>
                  </div>
                </div>
                <span className="font-extrabold text-lg tracking-tight text-white">AI Study Hub</span>
              </Link>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Create Your Account</h1>
              <p className="text-sm text-slate-400 mt-1">Join thousands of students learning smarter with AI</p>
            </div>

            {errorMessage && (
              <div className="w-full mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm font-medium">
                {errorMessage}
              </div>
            )}

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold text-sm shadow-sm hover:bg-slate-750 hover:border-slate-600 transition-all cursor-pointer disabled:opacity-60"
            >
              <span>{isGoogleLoading ? "Connecting to Google..." : "Continue with Google"}</span>
            </button>

            <div className="w-full text-center mt-7 pt-4 border-t border-slate-800/80">
              <span className="text-xs text-slate-400">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-purple-400 hover:text-purple-300">
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

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <SignUpFormContent />
    </Suspense>
  );
}