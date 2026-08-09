"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

// Modern dark-navy radial gradient background with subtle animated glow orbs
function AnimatedGradientBg() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-950"
      aria-hidden
    >
      {/* Primary Cyan/Indigo ambient radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
      {/* Floating animated ambient light orbs */}
      <div className="absolute -top-32 -left-20 w-[30rem] h-[30rem] bg-gradient-to-tr from-fuchsia-600/30 via-violet-600/20 to-indigo-500/20 rounded-full blur-3xl opacity-50 animate-pulse" />
      <div className="absolute top-1/3 -right-20 w-[28rem] h-[28rem] bg-gradient-to-b from-blue-600/20 via-cyan-500/20 to-violet-600/20 rounded-full blur-3xl opacity-40 animate-pulse [animation-delay:2s]" />
      <div className="absolute bottom-10 left-1/3 w-[22rem] h-[22rem] bg-gradient-to-tr from-purple-600/20 via-indigo-500/20 to-pink-500/20 rounded-full blur-3xl opacity-30 animate-pulse [animation-delay:4s]" />
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  
  // Retrieve Auth.js Session
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const isAdmin = session?.user?.role === "ADMIN";

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
          <Link
            href="/features"
            className="hover:text-white transition-colors duration-200"
          >
            Features
          </Link>
          <Link
            href="/tools"
            className="hover:text-white transition-colors duration-200"
          >
            Tools
          </Link>
          <Link
            href="/pricing"
            className="hover:text-white transition-colors duration-200"
          >
            Pricing
          </Link>
          <Link
            href="/blog"
            className="hover:text-white transition-colors duration-200"
          >
            Blog
          </Link>
        </div>
        {/* Single Action Button */}
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

function HeroVisual() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-14 relative group">
      {/* Decorative Glow framing behind visual */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 opacity-30 blur-2xl group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
      {/* Main Glassmorphic Panel Window */}
      <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-2xl overflow-hidden">
        {/* Window Topbar */}
        <div className="px-4 py-3 border-b border-slate-800/80 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-700/60" />
            <div className="w-3 h-3 rounded-full bg-slate-700/60" />
            <div className="w-3 h-3 rounded-full bg-slate-700/60" />
          </div>
          <div className="text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1 rounded-md border border-slate-800">
            aistudyhub.ai/dashboard
          </div>
          <div className="w-12" />
        </div>
        {/* Dashboard Visual Content */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Column 1: AI Prompt / Chat Assistant Preview */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs">
                AI
              </div>
              <p className="text-xs text-slate-300 font-mono">
                "Summarize key algorithms in Discrete Math for my final exam..."
              </p>
            </div>
            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                  Study Plan Generated
                </span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-mono">
                  Active Recall Mode
                </span>
              </div>
              <div className="space-y-2">
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 w-3/4" />
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Graph Theory & Trees</span>
                  <span>75% Mastered</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Next Quiz</span>
                <span className="text-sm font-semibold text-slate-200">Data Structures</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">AI Confidence</span>
                <span className="text-sm font-semibold text-emerald-400">92% Ready</span>
              </div>
            </div>
          </div>
          {/* Column 2: Quick Tools Sidebar */}
          <div className="space-y-3 border-t md:border-t-0 md:border-l border-slate-800/80 pt-4 md:pt-0 md:pl-6">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Quick Assistants
            </span>
            {[
              { name: "Essay Architect", tag: "Writing", color: "text-fuchsia-400" },
              { name: "Code Debugger", tag: "Coding", color: "text-blue-400" },
              { name: "Research Synthesizer", tag: "Research", color: "text-purple-400" },
            ].map((item) => (
              <div
                key={item.name}
                className="p-3 rounded-xl bg-slate-800/30 border border-slate-800 hover:border-slate-700 transition flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-200">{item.name}</div>
                  <div className={`text-[10px] font-mono ${item.color}`}>{item.tag}</div>
                </div>
                <span className="text-slate-500 text-xs">→</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative z-10 pt-16 pb-12 md:pt-24 md:pb-20 px-6 flex flex-col items-center justify-center text-center">
      {/* Top Tagline Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-medium text-purple-300 mb-8 backdrop-blur-md shadow-inner">
        <span className="flex h-2 w-2 rounded-full bg-fuchsia-500 animate-ping" />
        <span>Next-Gen Academic Intelligence</span>
      </div>
      {/* Main Headline */}
      <h1 className="max-w-4xl text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6">
        Study Smarter with{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-fuchsia-400">
          AI Tools
        </span>
      </h1>
      {/* Subtitle */}
      <p className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-400 font-normal mb-10 leading-relaxed">
        Discover powerful AI assistants tailored for student success—from deep essay synthesis and active recall planning to fast code execution.
      </p>
      {/* CTA Button Group */}
      <div className="flex gap-4 flex-col sm:flex-row justify-center w-full max-w-sm sm:max-w-none">
        <Link
          href="/tools"
          className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          Explore Tools
        </Link>
        <Link
          href="/features"
          className="inline-flex items-center justify-center bg-slate-900/80 border border-slate-800 backdrop-blur-md px-8 py-3.5 text-slate-200 font-semibold rounded-xl hover:bg-slate-800 hover:text-white hover:border-slate-700 transition-all duration-200 shadow-sm"
        >
          Learn More
        </Link>
      </div>
      {/* Hero Visual Showcase */}
      <HeroVisual />
    </section>
  );
}

function Stats() {
  return (
    <section className="relative z-10 py-12 md:py-16 flex justify-center px-6 max-w-5xl mx-auto">
      <div className="w-full bg-slate-900/50 backdrop-blur-xl shadow-2xl rounded-2xl border border-slate-800/80 px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800/80">
        <div className="pt-4 md:pt-0">
          <span className="block text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-300">
            10K+
          </span>
          <span className="text-slate-400 text-sm font-medium mt-2 block">
            Students Empowered
          </span>
        </div>
        <div className="pt-4 md:pt-0">
          <span className="block text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-fuchsia-300">
            100+
          </span>
          <span className="text-slate-400 text-sm font-medium mt-2 block">
            Integrated AI Workflows
          </span>
        </div>
        <div className="pt-4 md:pt-0">
          <span className="block text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-300">
            24/7
          </span>
          <span className="text-slate-400 text-sm font-medium mt-2 block">
            Productivity Acceleration
          </span>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    name: "AI Writing Assistant",
    href: "/writing",
    icon: (
      <svg
        className="w-7 h-7 text-fuchsia-400"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M11 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
        <path d="M18.5 2a2.121 2.121 0 1 1 3 3L12 14l-4 1 1-4Z" />
      </svg>
    ),
    blurb:
      "Craft essays and research assignments with advanced AI-powered writing, structure, and citation assistance.",
  },
  {
    name: "Smart Study Planner",
    href: "/study-planner",
    icon: (
      <svg
        className="w-7 h-7 text-indigo-400"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="4" width="18" height="18" rx="4" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    blurb:
      "Organize your study schedule, manage exam deadlines, and optimize revision with intelligent active recall prompts.",
  },
  {
    name: "Productivity Assistant",
    href: "/productivity",
    icon: (
      <svg
        className="w-7 h-7 text-cyan-400"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    blurb:
      "Boost focus, prioritize heavy course workloads, and conquer academic burnout with personalized AI coaching.",
  },
];

function Features() {
  return (
    <section id="features" className="relative z-10 px-6 py-16 md:py-24 max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
          AI Features Built for Modern Scholars
        </h2>
        <p className="text-slate-400 text-base max-w-xl mx-auto">
          Tailored tools designed to simplify complex subjects and supercharge your academic output.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {features.map((f) => (
          <Link
            key={f.name}
            href={f.href}
            className="group relative bg-slate-900/60 backdrop-blur-xl rounded-2xl p-8 flex flex-col gap-4 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:border-indigo-500/50">
              {f.icon}
            </div>
            <div className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
              {f.name}
            </div>
            <div className="text-slate-400 text-sm leading-relaxed font-normal">
              {f.blurb}
            </div>
            <div className="mt-auto pt-2 text-xs font-semibold text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Explore Feature <span>→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

const toolCards = [
  {
    name: "ChatGPT",
    desc: "Cutting-edge conversational AI for essays, brainstorming, and complex problem Q&A.",
    url: "https://chat.openai.com/",
    color: "from-fuchsia-500 to-indigo-500",
  },
  {
    name: "Claude",
    desc: "Advanced text model for deep synthesis, paper summaries, and technical writing.",
    url: "https://claude.ai/",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    name: "Cursor AI",
    desc: "AI-native code editor designed to accelerate programming coursework.",
    url: "https://www.cursor.so/",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Notion AI",
    desc: "Smart workspace organization for integrated study plans and lecture summaries.",
    url: "https://www.notion.so/product/ai",
    color: "from-indigo-500 to-purple-500",
  },
];

function Tools() {
  return (
    <section id="tools" className="relative z-10 px-6 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
          Featured AI Engines
        </h2>
        <p className="text-slate-400 text-base max-w-xl mx-auto">
          Direct access to the world's most powerful productivity platforms.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        {toolCards.map((tool) => (
          <div
            key={tool.name}
            className="group bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 flex flex-col items-start border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-purple-500/10"
          >
            <div
              className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-tr ${tool.color} flex items-center justify-center text-white font-black text-xl shadow-lg`}
            >
              {tool.name[0]}
            </div>
            <div className="font-bold text-lg text-white mb-2">{tool.name}</div>
            <div className="text-slate-400 text-sm font-normal mb-6 leading-relaxed">
              {tool.desc}
            </div>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto w-full text-center px-4 py-2.5 bg-slate-800/80 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-fuchsia-500 text-slate-200 hover:text-white rounded-xl font-semibold text-xs border border-slate-700/80 hover:border-transparent transition-all duration-200 shadow-sm"
            >
              Open External Tool ↗
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

const categories = [
  { name: "Writing", icon: "✏️", href: "/writing" },
  { name: "Coding", icon: "💻", href: "/coding" },
  { name: "Productivity", icon: "🚀", href: "/productivity" },
  { name: "Research", icon: "📚", href: "/research" },
  { name: "Study Planner", icon: "📅", href: "/study-planner" },
];

function CategorySection() {
  return (
    <section className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">
          Explore by Learning Domain
        </h2>
        <p className="text-slate-400 text-sm">
          Select a category to view specialized assistants and guides.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((cat) => (
          <Link
            href={cat.href}
            key={cat.name}
            className="flex items-center bg-slate-900/80 backdrop-blur-xl px-6 py-3.5 rounded-xl border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/80 hover:scale-105 transition-all duration-200 font-semibold text-sm text-slate-200 hover:text-white shadow-lg gap-3"
          >
            <span className="text-lg">{cat.icon}</span>
            <span>{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative z-10 px-6 py-16 md:py-28 max-w-5xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-950/40 via-slate-900/80 to-slate-950/90 backdrop-blur-2xl p-10 md:p-16 text-center border border-indigo-500/30 shadow-2xl">
        {/* Glow behind CTA box */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-white tracking-tight">
          Ready to Elevate Your Study Workflow?
        </h2>
        <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto mb-8 font-normal">
          Join thousands of students who are mastering subjects faster with AI Study Hub.
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
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#tools" className="hover:text-white transition-colors">
            Tools
          </a>
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

export default function Home() {
  return (
    <div className="relative min-h-screen font-sans bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white antialiased">
      <AnimatedGradientBg />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Tools />
        <CategorySection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}