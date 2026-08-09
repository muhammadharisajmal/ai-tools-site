"use client";

import Link from "next/link";

// Synchronized with Homepage, Login & Signup: Premium Dark Navy background with radial glows & grid overlay
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

export default function GetStartedPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center font-sans bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white px-4 py-12 antialiased">
      <AnimatedGradientBg />

      <main className="w-full max-w-4xl flex flex-col items-center justify-center relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 group/brand">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-fuchsia-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover/brand:shadow-indigo-500/40 transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400 font-extrabold text-base">
                  ✦
                </span>
              </div>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              AI Study Hub
            </span>
          </Link>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
            Get Started
          </h1>
          <p className="max-w-md text-base sm:text-lg text-slate-400 font-normal">
            Choose how you want to continue with AI Study Hub
          </p>
        </div>

        {/* Choice Cards Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full max-w-2xl px-2">
          {/* Sign In Card */}
          <div className="group relative rounded-3xl p-[1px] bg-gradient-to-b from-slate-800 via-slate-800/50 to-slate-800 hover:from-indigo-500/50 hover:via-purple-500/30 hover:to-indigo-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10">
            <div className="h-full w-full rounded-[23px] bg-slate-900/80 backdrop-blur-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 group-hover:bg-slate-900/90">
              <div>
                {/* User Login Icon */}
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 group-hover:border-indigo-500/40 transition-all duration-300">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                </div>

                <h2 className="text-xl font-extrabold text-white mb-2 tracking-tight">
                  Sign In
                </h2>
                <p className="text-slate-400 text-sm font-normal leading-relaxed mb-6">
                  Already have an account? Sign in to continue your AI-powered learning journey.
                </p>
              </div>

              <Link
                href="/login"
                className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 px-6 py-3.5 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] text-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 block"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Sign Up Card */}
          <div className="group relative rounded-3xl p-[1px] bg-gradient-to-b from-slate-800 via-slate-800/50 to-slate-800 hover:from-fuchsia-500/50 hover:via-purple-500/30 hover:to-fuchsia-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-fuchsia-500/10">
            <div className="h-full w-full rounded-[23px] bg-slate-900/80 backdrop-blur-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 group-hover:bg-slate-900/90">
              <div>
                {/* User Plus Icon */}
                <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center mb-6 text-fuchsia-400 group-hover:scale-110 group-hover:border-fuchsia-500/40 transition-all duration-300">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </div>

                <h2 className="text-xl font-extrabold text-white mb-2 tracking-tight">
                  Sign Up
                </h2>
                <p className="text-slate-400 text-sm font-normal leading-relaxed mb-6">
                  New here? Create your free account to unlock AI study assistants and tools.
                </p>
              </div>

              <Link
                href="/signup"
                className="w-full rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 px-6 py-3.5 text-white font-bold text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] text-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 block"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}