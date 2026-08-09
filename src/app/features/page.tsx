"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// Synchronized with Homepage, Login, Signup & Get Started: Premium Dark Navy background
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
          <Link href="/features" className="text-white font-semibold transition-colors">
            Features
          </Link>
          <Link href="/tools" className="hover:text-white transition-colors duration-200">
            Tools
          </Link>
          <Link href="/pricing" className="hover:text-white transition-colors duration-200">
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

// Section 1: Hero Section
function FeaturesHero() {
  return (
    <section className="relative z-10 pt-16 pb-12 md:pt-24 md:pb-20 px-6 flex flex-col items-center justify-center text-center">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-medium text-purple-300 mb-8 backdrop-blur-md shadow-inner">
        <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
        <span>Built for Modern Academic Workflows</span>
      </div>

      <h1 className="max-w-4xl text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6">
        Powerful Tools Built for{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-fuchsia-400">
          Student Success
        </span>
      </h1>

      <p className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-400 font-normal mb-10 leading-relaxed">
        Explore how AI Study Hub brings together organization, writing, coding assistance, and research support into one seamless workspace.
      </p>

      <div className="flex gap-4 flex-col sm:flex-row justify-center w-full max-w-sm sm:max-w-none">
        <Link
          href="/get-started"
          className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          Get Started
        </Link>
        <Link
          href="/login"
          className="inline-flex items-center justify-center bg-slate-900/80 border border-slate-800 backdrop-blur-md px-8 py-3.5 text-slate-200 font-semibold rounded-xl hover:bg-slate-800 hover:text-white hover:border-slate-700 transition-all duration-200 shadow-sm"
        >
          Sign In to Dashboard
        </Link>
      </div>
    </section>
  );
}

// Section 2: Platform Overview
function PlatformOverview() {
  return (
    <section className="relative z-10 py-12 px-6 max-w-6xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/60 backdrop-blur-2xl p-8 sm:p-12 border border-slate-800/80 shadow-2xl">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            An Integrated Environment for Learning
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            AI Study Hub combines dedicated study modules with secure authentication and a centralized user dashboard. Instead of jumping between disconnected apps, students manage their coursework, assignments, and study routines from a unified dashboard.
          </p>
        </div>
      </div>
    </section>
  );
}

// Section 3: Core Features Grid
const coreFeatures = [
  {
    title: "AI Study Planner",
    href: "/study-planner",
    icon: (
      <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="4" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    description:
      "Organize academic deadlines, structure exam preparation, and manage daily coursework schedules efficiently.",
  },
  {
    title: "AI Writing Assistance",
    href: "/writing",
    icon: (
      <svg className="w-6 h-6 text-fuchsia-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M11 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
        <path d="M18.5 2a2.121 2.121 0 1 1 3 3L12 14l-4 1 1-4Z" />
      </svg>
    ),
    description:
      "Draft essays, refine academic reports, improve sentence structures, and polish written assignments.",
  },
  {
    title: "AI Coding Assistance",
    href: "/coding",
    icon: (
      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
      </svg>
    ),
    description:
      "Understand complex programming syntax, debug algorithms, and accelerate software engineering coursework.",
  },
  {
    title: "AI Research Assistance",
    href: "/research",
    icon: (
      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    description:
      "Conduct preliminary literature synthesis, generate topic outlines, and analyze dense study material.",
  },
  {
    title: "Student Productivity",
    href: "/productivity",
    icon: (
      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    description:
      "Prioritize heavy workloads, reduce study friction, and build consistent habits for academic success.",
  },
  {
    title: "Secure Authentication",
    href: "/login",
    icon: (
      <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    description:
      "Sign in securely via Google OAuth or verified email authentication protected by modern Auth.js standards.",
  },
  {
    title: "Modern Student Dashboard",
    href: "/login",
    icon: (
      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </svg>
    ),
    description:
      "Access a personalized workspace that organizes active study tools and account settings in one interface.",
  },
  {
    title: "Responsive Cross-Platform",
    href: "/",
    icon: (
      <svg className="w-6 h-6 text-fuchsia-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    description:
      "Seamless experience tailored for desktop monitors, laptops, tablets, and mobile devices.",
  },
];

function CoreFeaturesGrid() {
  return (
    <section className="relative z-10 px-6 py-16 md:py-20 max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
          Platform Features
        </h2>
        <p className="text-slate-400 text-base max-w-xl mx-auto">
          Every tool is crafted to address real academic tasks without unnecessary complexity.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {coreFeatures.map((feature) => (
          <Link
            key={feature.title}
            href={feature.href}
            className="group relative bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 cursor-pointer"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-5 transition-transform group-hover:scale-105 group-hover:border-indigo-500/50">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm font-normal leading-relaxed mb-6">
                {feature.description}
              </p>
            </div>
            <div className="text-xs font-semibold text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Open Assistant <span>→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// Section 4: Why Students Love AI Study Hub
function WhyStudentsLoveIt() {
  const pillars = [
    {
      title: "Purpose-Built for Academics",
      detail:
        "Every assistant is structured around real coursework demands—from writing essays to understanding technical code.",
    },
    {
      title: "Clean & Uncluttered Interface",
      detail:
        "No complex menus or confusing options. Access what you need directly from your dashboard.",
    },
    {
      title: "Secure & Reliable",
      detail:
        "Built on modern Next.js and Auth.js infrastructure with Supabase database encryption for complete account security.",
    },
  ];

  return (
    <section className="relative z-10 py-16 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">
          Designed for Focused Learning
        </h2>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          Key principles that guide the AI Study Hub user experience.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {pillars.map((item) => (
          <div
            key={item.title}
            className="p-7 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 space-y-3"
          >
            <h3 className="text-base font-bold text-slate-100">{item.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Section 5: How It Works
function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Create Your Account",
      desc: "Sign up instantly using Google OAuth or your email address to access your personal dashboard.",
    },
    {
      step: "02",
      title: "Choose Your Study Tool",
      desc: "Select from the Study Planner, Writing, Coding, Research, or Productivity assistants.",
    },
    {
      step: "03",
      title: "Accelerate Your Work",
      desc: "Get immediate AI assistance to structure, analyze, write, and execute your academic projects.",
    },
  ];

  return (
    <section className="relative z-10 py-16 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">
          How AI Study Hub Works
        </h2>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Get started in three simple steps.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((s) => (
          <div
            key={s.step}
            className="relative p-8 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 flex flex-col justify-between"
          >
            <div>
              <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-fuchsia-400 mb-4 block font-mono">
                {s.step}
              </span>
              <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Section 6: Future Roadmap (Coming Soon)
function FutureRoadmap() {
  const upcoming = [
    {
      name: "Interactive Flashcard Generator",
      desc: "Automatically transform study notes and reading PDFs into active recall flashcard decks.",
    },
    {
      name: "AI Quiz Generator",
      desc: "Generate custom practice quizzes from your course material to prepare for midterms.",
    },
    {
      name: "Smart Revision Scheduler",
      desc: "Spaced repetition algorithms that remind you when to review key study topics.",
    },
  ];

  return (
    <section className="relative z-10 py-16 px-6 max-w-6xl mx-auto">
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-xl">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300 uppercase tracking-wider mb-3">
            Product Roadmap
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Upcoming Modules (Coming Soon)
          </h2>
          <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
            Features currently in development to expand your academic toolkit.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {upcoming.map((item) => (
            <div
              key={item.name}
              className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-200">{item.name}</h3>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  Coming Soon
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Section 7: Call To Action
function FinalCTA() {
  return (
    <section className="relative z-10 px-6 py-16 md:py-24 max-w-5xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-950/40 via-slate-900/80 to-slate-950/90 backdrop-blur-2xl p-10 md:p-16 text-center border border-indigo-500/30 shadow-2xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-white tracking-tight">
          Start Studying Smarter Today
        </h2>
        <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto mb-8 font-normal">
          Join students utilizing AI Study Hub to organize, write, code, and succeed.
        </p>
        <Link
          href="/get-started"
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 px-9 py-4 text-white font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-200 text-base"
        >
          Get Started for Free
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

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen font-sans bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white antialiased">
      <AnimatedGradientBg />
      <Navbar />
      <main>
        <FeaturesHero />
        <PlatformOverview />
        <CoreFeaturesGrid />
        <WhyStudentsLoveIt />
        <HowItWorks />
        <FutureRoadmap />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}