"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Check,
  X,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  Zap,
  Star,
} from "lucide-react";

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

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl py-4"
          : "bg-transparent py-6"
      }`}
    >
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
          <Link href="/features" className="hover:text-white transition-colors duration-200">
            Features
          </Link>
          <Link href="/tools" className="hover:text-white transition-colors duration-200">
            Tools
          </Link>
          <Link href="/pricing" className="text-white font-semibold transition-colors">
            Pricing
          </Link>
          <Link href="/blog" className="hover:text-white transition-colors duration-200">
            Blog
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/get-started"
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

// Hero Section
function PricingHero() {
  return (
    <section className="relative z-10 pt-16 pb-8 md:pt-24 md:pb-12 px-6 flex flex-col items-center justify-center text-center">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-medium text-purple-300 mb-8 backdrop-blur-md shadow-inner">
        <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
        <span>Transparent & Accessible Learning</span>
      </div>

      <h1 className="max-w-4xl text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6">
        Simple Plans for{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-fuchsia-400">
          Every Student
        </span>
      </h1>

      <p className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-400 font-normal mb-8 leading-relaxed">
        AI Study Hub is completely free to use today. Explore our available features and preview future plan developments.
      </p>
    </section>
  );
}

// Main Pricing Cards Section
function PricingCardsSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  return (
    <section className="relative z-10 px-6 py-8 max-w-7xl mx-auto">
      {/* Optional Billing Cycle Selector (Visual Only for Previewing Future Pricing) */}
      <div className="flex items-center justify-center gap-3 mb-12">
        <span className={`text-xs sm:text-sm font-medium ${billingCycle === "monthly" ? "text-white" : "text-slate-500"}`}>
          Monthly
        </span>
        <button
          onClick={() => setBillingCycle((prev) => (prev === "monthly" ? "annual" : "monthly"))}
          className="relative w-12 h-6 rounded-full bg-slate-800 border border-slate-700 p-0.5 transition-colors duration-200 focus:outline-none cursor-pointer"
          aria-label="Toggle billing cycle preview"
        >
          <div
            className={`w-4.5 h-4.5 rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400 shadow-md transition-transform duration-200 ${
              billingCycle === "annual" ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
        <span className={`text-xs sm:text-sm font-medium flex items-center gap-1.5 ${billingCycle === "annual" ? "text-white" : "text-slate-500"}`}>
          <span>Annual</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
            Preview
          </span>
        </span>
      </div>

      {/* Grid of 3 Cards */}
      <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto items-stretch">
        {/* CARD 1: Free Student Plan (Recommended / Active) */}
        <div className="relative group rounded-3xl p-[1px] bg-gradient-to-b from-indigo-500 via-purple-500 to-fuchsia-500 shadow-2xl shadow-indigo-500/15 flex flex-col justify-between">
          {/* Active Highlight Badge */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white text-[11px] font-bold tracking-wider uppercase shadow-lg">
            Recommended • Available Now
          </div>

          <div className="h-full w-full rounded-[23px] bg-slate-900/90 backdrop-blur-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-extrabold text-white tracking-tight">
                  Free Student Plan
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available Today
                </span>
              </div>

              <p className="text-slate-400 text-xs sm:text-sm mb-6 leading-relaxed">
                Full access to AI Study Hub's core academic tools and student workspace.
              </p>

              {/* Price Display */}
              <div className="mb-8 pb-6 border-b border-slate-800">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-white">$0</span>
                  <span className="text-slate-400 text-xs font-semibold">/ forever free</span>
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  No credit card required
                </span>
              </div>

              {/* Included Features List */}
              <div className="space-y-3.5 mb-8">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
                  What's Included:
                </span>
                {[
                  "Secure Account System",
                  "Google & Email Authentication",
                  "AI Study Planner",
                  "AI Writing Assistance",
                  "AI Coding Assistance",
                  "AI Research Assistance",
                  "Student Productivity Workspace",
                  "Personalized Student Dashboard",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                    <div className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Primary Button */}
            <Link
              href="/get-started"
              className="w-full text-center px-6 py-3.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 block"
            >
              Get Started Free →
            </Link>
          </div>
        </div>

        {/* CARD 2: Student Pro (Coming Soon) */}
        <div className="relative rounded-3xl p-[1px] bg-slate-800/80 flex flex-col justify-between opacity-85 hover:opacity-100 transition-opacity duration-300">
          <div className="h-full w-full rounded-[23px] bg-slate-900/60 backdrop-blur-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-extrabold text-white tracking-tight">
                  Student Pro
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-semibold text-indigo-300">
                  Coming Soon
                </span>
              </div>

              <p className="text-slate-400 text-xs sm:text-sm mb-6 leading-relaxed">
                Planned tier for students needing expanded usage and advanced study features.
              </p>

              {/* Price Display */}
              <div className="mb-8 pb-6 border-b border-slate-800">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-300">Coming Soon</span>
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Future subscription offering
                </span>
              </div>

              {/* Features List */}
              <div className="space-y-3.5 mb-8">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                  Planned Capabilities:
                </span>
                {[
                  "Everything in Free Student Plan",
                  "Expanded AI Tool Usage Limits",
                  "Faster AI Generation Speeds",
                  "Interactive Flashcard Generator (Coming Soon)",
                  "AI Quiz Generator (Coming Soon)",
                  "Priority Assistant Responses",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-xs sm:text-sm text-slate-400">
                    <div className="w-4 h-4 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-2.5 h-2.5" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Disabled Button */}
            <button
              disabled
              className="w-full text-center px-6 py-3.5 bg-slate-800/80 border border-slate-700/80 text-slate-500 rounded-xl font-semibold text-sm cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>
        </div>

        {/* CARD 3: Premium (Coming Soon) */}
        <div className="relative rounded-3xl p-[1px] bg-slate-800/80 flex flex-col justify-between opacity-85 hover:opacity-100 transition-opacity duration-300">
          <div className="h-full w-full rounded-[23px] bg-slate-900/60 backdrop-blur-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-extrabold text-white tracking-tight">
                  Premium
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-semibold text-indigo-300">
                  Coming Soon
                </span>
              </div>

              <p className="text-slate-400 text-xs sm:text-sm mb-6 leading-relaxed">
                Planned tier for research groups, thesis writers, and advanced project collaboration.
              </p>

              {/* Price Display */}
              <div className="mb-8 pb-6 border-b border-slate-800">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-300">Coming Soon</span>
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Future organizational offering
                </span>
              </div>

              {/* Features List */}
              <div className="space-y-3.5 mb-8">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                  Planned Capabilities:
                </span>
                {[
                  "Everything in Student Pro",
                  "Smart Revision Scheduler (Coming Soon)",
                  "Shared Study Group Workspaces",
                  "Advanced Learning Analytics",
                  "Personalized AI Study Model Tuning",
                  "Dedicated Support Channels",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-xs sm:text-sm text-slate-400">
                    <div className="w-4 h-4 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center flex-shrink-0">
                      <Star className="w-2.5 h-2.5" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Disabled Button */}
            <button
              disabled
              className="w-full text-center px-6 py-3.5 bg-slate-800/80 border border-slate-700/80 text-slate-500 rounded-xl font-semibold text-sm cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Feature Comparison Matrix Table
function ComparisonTableSection() {
  const comparisonData = [
    { feature: "Secure Account System", free: true, pro: "Coming Soon", premium: "Coming Soon" },
    { feature: "Google & Email Authentication", free: true, pro: "Coming Soon", premium: "Coming Soon" },
    { feature: "Student Dashboard Workspace", free: true, pro: "Coming Soon", premium: "Coming Soon" },
    { feature: "AI Study Planner Module", free: true, pro: "Coming Soon", premium: "Coming Soon" },
    { feature: "AI Writing Assistant Module", free: true, pro: "Coming Soon", premium: "Coming Soon" },
    { feature: "AI Coding Assistant Module", free: true, pro: "Coming Soon", premium: "Coming Soon" },
    { feature: "AI Research Assistant Module", free: true, pro: "Coming Soon", premium: "Coming Soon" },
    { feature: "Student Productivity Module", free: true, pro: "Coming Soon", premium: "Coming Soon" },
    { feature: "Interactive Flashcard Generator", free: "Roadmap", pro: "Coming Soon", premium: "Coming Soon" },
    { feature: "AI Quiz & Test Generator", free: "Roadmap", pro: "Coming Soon", premium: "Coming Soon" },
    { feature: "Shared Group Workspaces", free: false, pro: "Roadmap", premium: "Coming Soon" },
  ];

  return (
    <section className="relative z-10 px-6 py-16 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          Plan Feature Comparison
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm">
          A clear breakdown of available features versus roadmap possibilities.
        </p>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/80 text-white">
              <th className="p-4 sm:p-5 font-bold">Feature / Capability</th>
              <th className="p-4 sm:p-5 font-bold text-center text-indigo-400">Free Student Plan</th>
              <th className="p-4 sm:p-5 font-bold text-center text-slate-400">Student Pro</th>
              <th className="p-4 sm:p-5 font-bold text-center text-slate-400">Premium</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {comparisonData.map((row) => (
              <tr key={row.feature} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4 sm:p-5 font-medium text-slate-200">{row.feature}</td>
                
                {/* Free Plan Status */}
                <td className="p-4 sm:p-5 text-center">
                  {row.free === true ? (
                    <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto">
                      <Check className="w-3 h-3" />
                    </div>
                  ) : row.free === "Roadmap" ? (
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      Roadmap
                    </span>
                  ) : (
                    <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-800 text-slate-600 mx-auto">
                      <X className="w-3 h-3" />
                    </div>
                  )}
                </td>

                {/* Pro Status */}
                <td className="p-4 sm:p-5 text-center text-slate-500 font-mono text-[11px]">
                  {row.pro}
                </td>

                {/* Premium Status */}
                <td className="p-4 sm:p-5 text-center text-slate-500 font-mono text-[11px]">
                  {row.premium}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// Pricing FAQ Section
function PricingFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is AI Study Hub completely free to use today?",
      a: "Yes! All current study tools—including the Study Planner, Writing Assistant, Coding Assistant, Research Assistant, and Productivity Hub—are 100% free with no hidden fees or credit card requirements.",
    },
    {
      q: "Will paid premium plans be added in the future?",
      a: "We are exploring advanced feature tiers (such as Student Pro) to support higher usage limits and specialized flashcard/quiz tools. However, current platform features will remain accessible.",
    },
    {
      q: "Can I sign in using my Google account?",
      a: "Yes. AI Study Hub supports secure Google OAuth sign-in alongside standard email registration powered by Auth.js.",
    },
    {
      q: "Are additional AI tools being added?",
      a: "Yes. We are actively developing upcoming modules including Flashcard Generators and AI Quiz Creation tools, which are clearly listed in our product roadmap.",
    },
  ];

  return (
    <section className="relative z-10 px-6 py-16 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm">
          Everything you need to know about AI Study Hub pricing and access.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.q}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between text-slate-200 hover:text-white transition-colors cursor-pointer"
              >
                <span className="font-semibold text-sm sm:text-base">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? "rotate-180 text-indigo-400" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-800/50 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Call To Action Section
function FinalCTA() {
  return (
    <section className="relative z-10 px-6 py-16 max-w-5xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-950/40 via-slate-900/80 to-slate-950/90 backdrop-blur-2xl p-10 md:p-14 text-center border border-indigo-500/30 shadow-2xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

        <h2 className="text-3xl sm:text-4xl font-black mb-4 text-white tracking-tight">
          Start Studying for Free Today
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto mb-8 font-normal">
          Create your free account and access AI Study Hub's full suite of academic tools.
        </p>
        <Link
          href="/get-started"
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 px-8 py-3.5 text-white font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-200 text-sm"
        >
          Get Started Free
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 px-6 py-12 bg-slate-950/90 border-t border-slate-800/80 text-slate-400 text-sm">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-6">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-lg text-white">AI Study Hub</span>
        </div>

        <nav className="flex flex-wrap justify-center gap-8 text-xs font-medium text-slate-400">
          <Link href="/features" className="hover:text-white transition-colors">
            Features
          </Link>
          <Link href="/tools" className="hover:text-white transition-colors">
            Tools
          </Link>
          <Link href="/pricing" className="hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="/blog" className="hover:text-white transition-colors">
            Blog
          </Link>
        </nav>

        <div className="text-xs text-slate-500">
          © {new Date().getFullYear()} AI Study Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function PricingPage() {
  return (
    <div className="relative min-h-screen font-sans bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white antialiased">
      <AnimatedGradientBg />
      <Navbar />
      <main>
        <PricingHero />
        <PricingCardsSection />
        <ComparisonTableSection />
        <PricingFAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}