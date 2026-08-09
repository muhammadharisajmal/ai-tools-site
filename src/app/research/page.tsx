"use client";

import Link from "next/link";
import ResearchPreview from "@/components/tools/ResearchPreview";

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

function PageNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl py-4">
      <nav className="flex items-center justify-between px-6 md:px-12 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-fuchsia-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400 font-extrabold text-lg">
                ✦
              </span>
            </div>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-slate-200 transition-colors">
            AI Study Hub
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-300">
          <Link href="/#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="/#tools" className="hover:text-white transition-colors">Tools</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 p-[1px] font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="px-5 py-2.5 rounded-[11px] bg-slate-950 text-white group-hover:bg-transparent transition-colors duration-300">
              Get Started
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
}

function PageFooter() {
  return (
    <footer className="relative z-10 px-6 py-12 bg-slate-950/90 border-t border-slate-800/80 text-slate-400 text-sm">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-6">
        <span className="font-extrabold text-lg text-white">AI Study Hub</span>
        <div className="text-xs text-slate-500">
          © {new Date().getFullYear()} AI Study Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function ResearchPublicPage() {
  return (
    <div className="relative min-h-screen font-sans bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white antialiased">
      <AnimatedGradientBg />
      <PageNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-8 pb-20 relative z-10">
        <ResearchPreview />
      </main>
      <PageFooter />
    </div>
  );
}