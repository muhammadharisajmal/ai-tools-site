"use client";
import Link from "next/link";

function AnimatedGradientBg() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-950" aria-hidden="true">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -top-32 -left-20 w-[30rem] h-[30rem] bg-gradient-to-tr from-fuchsia-600/30 via-violet-600/20 to-indigo-500/20 rounded-full blur-3xl opacity-50 animate-pulse" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
}

export default function GetStartedPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center font-sans bg-slate-950 text-slate-100 px-4 py-12">
      <AnimatedGradientBg />
      <main className="w-full max-w-4xl flex flex-col items-center relative z-10">
        
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-fuchsia-500 p-0.5 shadow-md shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400 font-extrabold text-sm">✦</span>
              </div>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">AI Study Hub</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Get Started</h1>
          <p className="text-sm text-slate-400 mt-2">Choose how you want to continue with AI Study Hub</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          
          {/* Sign In Card */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-7 flex flex-col justify-between shadow-2xl hover:border-slate-700 transition-all">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Sign In</h2>
              <p className="text-sm text-slate-400 mb-6">Already have an account? Sign in to continue your AI-powered learning journey.</p>
            </div>
            <Link
              href="/login"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white font-bold text-sm text-center shadow-lg shadow-indigo-500/25 hover:opacity-95 transition-all"
            >
              Sign In
            </Link>
          </div>

          {/* Sign Up Card */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-7 flex flex-col justify-between shadow-2xl hover:border-slate-700 transition-all">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Sign Up</h2>
              <p className="text-sm text-slate-400 mb-6">New here? Create your free account to unlock AI study assistants and tools.</p>
            </div>
            <Link
              href="/signup"
              className="w-full py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-sm text-center hover:bg-slate-750 transition-all"
            >
              Create Account
            </Link>
          </div>

        </div>

      </main>
    </div>
  );
}