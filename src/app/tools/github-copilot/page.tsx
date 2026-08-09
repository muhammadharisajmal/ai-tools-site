"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Brain,
  Code,
  BookOpen,
  FileText,
  Zap,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  Copy,
  Users,
  PenLine,
  Lightbulb,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Book,
  GraduationCap,
} from "lucide-react";

function classNames(...args: any[]) {
  return args.filter(Boolean).join(" ");
}

// -- 1. HERO SECTION --
function HeroSection() {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-4 py-24 overflow-hidden">
      {/* BG GRADIENT SHAPES */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[80vw] md:w-[60vw] h-[80vh] bg-gradient-to-br from-blue-800/50 via-blue-600/60 to-indigo-900/60 blur-3xl rounded-full opacity-40" />
        <div className="absolute bottom-0 right-0 w-60 h-32 bg-gradient-to-bl from-blue-400/40 to-indigo-600/30 blur-2xl rounded-full opacity-20" />
      </div>
      <div className="mx-auto max-w-2xl w-full backdrop-blur-lg bg-white/5 border border-blue-900/40 rounded-3xl shadow-xl p-8 md:p-14 flex flex-col items-center glass-card">
        <div className="mb-4 flex items-center space-x-4">
          <Sparkles className="w-9 h-9 text-blue-400 animate-pulse" />
          <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
            GitHub Copilot
          </span>
        </div>
        <h1 className="text-center text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-200 to-indigo-100 mb-4">
          AI-powered coding assistant that helps you write better code faster
        </h1>
        <p className="text-center text-blue-100/80 font-medium mb-6">
          Turbocharge your coding and learning with an intelligent AI pair programmer, trusted by millions of developers and students globally.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-2">
          <a
            href="https://github.com/features/copilot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-7 py-3 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-150 hover:shadow-blue-500/30 text-lg"
          >
            <Zap className="w-5 h-5 mr-2" />
            Visit Copilot
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
          <Link
            href="/blog/copilot-tutorials"
            className="flex items-center justify-center px-7 py-3 rounded-xl border border-blue-500/60 bg-blue-900/20 text-blue-100 font-semibold shadow hover:bg-blue-800/60 hover:text-white hover:scale-105 transition-all text-lg"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Read Guides
          </Link>
        </div>
      </div>
    </section>
  );
}

// -- 2. OVERVIEW SECTION --
function OverviewSection() {
  const users = [
    {
      name: "Students",
      desc: "Level up your programming assignments and learn coding faster.",
      icon: <GraduationCap className="w-8 h-8 text-blue-400" />,
    },
    {
      name: "Developers",
      desc: "Boost productivity and reduce repetitive coding tasks.",
      icon: <Code className="w-8 h-8 text-indigo-400" />,
    },
    {
      name: "Beginners",
      desc: "Kickstart your coding journey with AI-powered help.",
      icon: <Lightbulb className="w-8 h-8 text-blue-300" />,
    },
    {
      name: "Freelancers",
      desc: "Deliver faster and automate boilerplate for projects.",
      icon: <PenLine className="w-8 h-8 text-indigo-300" />,
    },
  ];
  return (
    <section className="relative z-10 max-w-5xl mx-auto px-4 py-14">
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-50 mb-5 text-center">
        What is GitHub Copilot?
      </h2>
      <p className="text-center text-blue-100/80 mb-8 max-w-xl mx-auto font-medium">
        GitHub Copilot is an AI coding assistant that helps you write code, understand concepts, and supercharge your productivity. It's perfect for learning, building projects, debugging, and getting unstuck—no matter your experience level.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7 pt-2">
        {users.map((u) => (
          <div
            key={u.name}
            className="flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-blue-900/50 to-blue-800/60 border border-blue-900/30 shadow group hover:scale-105 transition-all"
          >
            <div className="mb-3">{u.icon}</div>
            <div className="font-bold text-blue-100 text-lg mb-1">{u.name}</div>
            <p className="text-blue-200/70 text-center text-sm">{u.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// -- 3. FEATURES SECTION --
function FeaturesSection() {
  const features = [
    {
      name: "AI Code Completion",
      icon: <Sparkles className="w-7 h-7 text-blue-300" />,
      desc: "Get intelligent code suggestions as you type, powered by advanced AI.",
    },
    {
      name: "Smart Code Suggestions",
      icon: <Lightbulb className="w-7 h-7 text-indigo-300" />,
      desc: "Receive context-aware function calls, variables, and comments.",
    },
    {
      name: "Bug Fixing Assistance",
      icon: <ThumbsUp className="w-7 h-7 text-blue-400" />,
      desc: "Identify and resolve coding errors quickly and efficiently.",
    },
    {
      name: "Multi-language Support",
      icon: <FileText className="w-7 h-7 text-indigo-300" />,
      desc: "Works in JavaScript, Python, C++, and dozens of popular languages.",
    },
    {
      name: "Code Explanation Help",
      icon: <BookOpen className="w-7 h-7 text-blue-300" />,
      desc: "Get concise explanations for complex code and unfamiliar syntax.",
    },
    {
      name: "Boilerplate Generation",
      icon: <PenLine className="w-7 h-7 text-indigo-300" />,
      desc: "Instantly create templates, starter functions, and file structures.",
    },
  ];
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-50 mb-8 text-center">
        Features that Power Up Your Coding
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
        {features.map((f) => (
          <div
            key={f.name}
            className="rounded-2xl bg-gradient-to-br from-blue-900/40 via-blue-800/60 to-indigo-950/40 border border-blue-900/30 shadow flex flex-col items-start gap-3 p-7 hover:border-blue-500 transition group glass-card"
          >
            <div className="mb-2">{f.icon}</div>
            <div className="font-semibold text-lg text-blue-100">
              {f.name}
            </div>
            <p className="text-blue-200/80 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// -- 4. USE CASES SECTION --
function UseCasesSection() {
  const cases = [
    {
      title: "Learning programming faster",
      desc: "Master new languages and concepts with AI guidance and instant feedback.",
      icon: <GraduationCap className="w-7 h-7 text-blue-400" />,
    },
    {
      title: "Debugging assignments",
      desc: "Spot and fix bugs in homework or code projects with smart suggestions.",
      icon: <ThumbsUp className="w-7 h-7 text-indigo-300" />,
    },
    {
      title: "Building projects",
      desc: "Accelerate your capstone, side projects, or hackathon ideas—get unstuck and ship code.",
      icon: <Zap className="w-7 h-7 text-blue-300" />,
    },
    {
      title: "Writing functions quickly",
      desc: "Reduce boilerplate and let Copilot autocomplete repetitive code for you.",
      icon: <PenLine className="w-7 h-7 text-indigo-300" />,
    },
    {
      title: "Understanding codebases",
      desc: "Get on-demand explanations for legacy code and unfamiliar logic.",
      icon: <BookOpen className="w-7 h-7 text-blue-200" />,
    },
  ];
  return (
    <section className="relative z-10 max-w-5xl mx-auto px-4 py-14">
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-50 mb-7 text-center">
        Use Cases for Students & Developers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
        {cases.map((c) => (
          <div
            key={c.title}
            className="rounded-2xl bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border border-blue-900/30 shadow flex flex-col items-start gap-2 p-7 hover:border-indigo-400 hover:shadow-blue-500/10 transition group glass-card"
          >
            <div className="mb-2">{c.icon}</div>
            <div className="font-semibold text-blue-100 text-lg mb-1">
              {c.title}
            </div>
            <p className="text-blue-200/80 text-sm">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// -- 5. PROS & CONS SECTION --
function ProsConsSection() {
  const pros = [
    "Extremely fast code generation",
    "Works inside VS Code / IDEs",
    "Great for productivity",
    "Supports multiple languages",
  ];
  const cons = [
    "Paid subscription required",
    "Can suggest incorrect code sometimes",
    "Requires developer environment setup",
    "Not ideal for non-coding tasks",
  ];
  return (
    <section className="relative z-10 max-w-4xl mx-auto px-4 py-14">
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-50 mb-7 text-center">
        Pros & Cons
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        <div className="rounded-2xl bg-gradient-to-br from-blue-900/40 via-blue-800/60 to-indigo-950/40 border border-blue-900/30 shadow p-7 group glass-card">
          <div className="flex items-center gap-2 mb-4">
            <ThumbsUp className="w-6 h-6 text-green-400" />
            <span className="font-semibold text-blue-100 text-lg">Pros</span>
          </div>
          <ul className="pl-4 space-y-3 text-blue-200/80">
            {pros.map((pro) => (
              <li key={pro} className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400" />
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-blue-900/40 via-blue-800/60 to-indigo-950/40 border border-blue-900/30 shadow p-7 group glass-card">
          <div className="flex items-center gap-2 mb-4">
            <ThumbsDown className="w-6 h-6 text-red-400" />
            <span className="font-semibold text-blue-100 text-lg">Cons</span>
          </div>
          <ul className="pl-4 space-y-3 text-blue-200/80">
            {cons.map((con) => (
              <li key={con} className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-red-400" />
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// -- 6. PRICING SECTION --
function PricingSection() {
  return (
    <section className="relative z-10 max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-50 mb-8 text-center">
        Pricing
      </h2>
      <div className="flex flex-col md:flex-row gap-8 md:justify-center">
        <div className="flex-1 rounded-2xl bg-gradient-to-br from-blue-900/60 via-blue-900/40 to-indigo-950/50 border border-blue-900/30 shadow-xl p-8 flex flex-col items-center text-center glass-card hover:scale-105 transition">
          <div className="text-lg font-bold text-blue-100 mb-1">Free Trial</div>
          <div className="text-3xl font-extrabold text-white bg-gradient-to-r from-blue-300 to-indigo-400 bg-clip-text text-transparent mb-3">0<span className="text-lg align-super">/ limited</span></div>
          <div className="text-blue-200/90 mb-4">Try Copilot with limited usage to experience its coding powers.</div>
          <ul className="text-blue-200/70 text-sm space-y-2 mb-6">
            <li>✔️ Limited suggestions</li>
            <li>✔️ Access in supported IDEs</li>
          </ul>
          <a
            href="https://github.com/features/copilot"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-medium border border-blue-700/40 shadow hover:scale-105 transition-all"
          >
            Try Now
          </a>
        </div>
        <div className="flex-1 rounded-2xl bg-gradient-to-br from-indigo-900/70 to-blue-900/40 border border-indigo-800/40 shadow-xl p-8 flex flex-col items-center text-center glass-card hover:scale-105 transition">
          <div className="text-lg font-bold text-blue-100 mb-1">Pro Plan</div>
          <div className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-blue-300 bg-clip-text text-transparent mb-3">$10–$20<span className="text-lg align-super">/mo</span></div>
          <div className="text-blue-200/90 mb-4">Full-powered AI coding assistant for advanced use cases and daily coding.</div>
          <ul className="text-blue-200/70 text-sm space-y-2 mb-6">
            <li>✔️ Unlimited suggestions</li>
            <li>✔️ Priority support</li>
            <li>✔️ Commercial use allowed</li>
          </ul>
          <a
            href="https://github.com/features/copilot"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-lg bg-gradient-to-tr from-indigo-500 to-blue-600 text-white font-medium border border-indigo-700/40 shadow hover:scale-105 transition-all"
          >
            Get Pro Plan
          </a>
        </div>
      </div>
    </section>
  );
}

// -- 7. PROMPT EXAMPLES SECTION --
function PromptExamplesSection() {
  const prompts = [
    "Generate a React login form",
    "Fix bugs in this Python function",
    "Convert JS code to TypeScript",
    "Build REST API in Node.js",
    "Explain this algorithm",
    "Optimize this function",
  ];
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  function handleCopy(prompt: string, idx: number) {
    navigator.clipboard.writeText(prompt);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1300);
  }

  return (
    <section className="relative z-10 max-w-5xl mx-auto px-4 py-14">
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-50 mb-6 text-center">
        Prompt Examples
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
        {prompts.map((prompt, idx) => (
          <div
            key={prompt}
            className="group rounded-xl bg-gradient-to-br from-blue-900/40 to-indigo-950/60 border border-blue-900/30 shadow p-6 flex items-center justify-between gap-2 hover:border-indigo-400 transition"
          >
            <span className="text-blue-100 text-base font-medium">{prompt}</span>
            <button
              aria-label="Copy prompt"
              title="Copy prompt"
              onClick={() => handleCopy(prompt, idx)}
              className={classNames(
                "ml-3 p-2 rounded-lg bg-blue-950/50 hover:bg-blue-800/50 text-blue-300 transition"
              )}
            >
              {copiedIdx === idx ? (
                <span className="text-green-400 font-bold text-xs">Copied!</span>
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

// -- 8. RELATED TOOLS SECTION --
const relatedTools = [
  {
    name: "ChatGPT",
    desc: "General-purpose AI chatbot for Q&A, summaries, and code help.",
    href: "/tools/chatgpt",
    icon: <Sparkles className="w-8 h-8 text-fuchsia-500" />,
  },
  {
    name: "Claude",
    desc: "Fast, trustworthy AI assistant for productivity and writing.",
    href: "/tools/claude",
    icon: <Brain className="w-8 h-8 text-blue-400" />,
  },
  {
    name: "Cursor AI",
    desc: "AI coding assistant crafted for learning and projects.",
    href: "/tools/cursor",
    icon: <Code className="w-8 h-8 text-indigo-400" />,
  },
  {
    name: "Perplexity",
    desc: "AI research and Q&A tool with real-time internet answers.",
    href: "/tools/perplexity",
    icon: <BookOpen className="w-8 h-8 text-blue-300" />,
  },
];
function RelatedToolsSection() {
  return (
    <section className="relative z-10 max-w-5xl mx-auto px-4 py-14">
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-50 mb-7 text-center">
        Related AI Tools
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {relatedTools.map((t) => (
          <div
            key={t.name}
            className="rounded-2xl bg-gradient-to-br from-blue-900/40 to-indigo-900/30 border border-blue-900/30 shadow flex flex-col items-center gap-3 p-6 hover:scale-105 hover:border-blue-400 hover:shadow-blue-600/10 transition-all text-center glass-card"
          >
            <div>{t.icon}</div>
            <div className="font-semibold text-lg text-blue-100">{t.name}</div>
            <p className="text-blue-200/70 text-sm mb-3">{t.desc}</p>
            <Link
              href={t.href}
              className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-lg font-medium shadow hover:scale-105 transition text-sm"
            >
              Explore <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

// -- 9. FAQ SECTION --
const FaqList = [
  {
    q: "What is GitHub Copilot?",
    a: "GitHub Copilot is an AI-powered code completion tool that suggests code and entire functions in real-time inside your favorite IDEs.",
  },
  {
    q: "Is Copilot good for beginners?",
    a: "Yes! Copilot helps beginners by suggesting code, explaining syntax, and assisting with common programming tasks.",
  },
  {
    q: "Does Copilot replace developers?",
    a: "No. Copilot is a coding assistant—not a replacement. It helps you write code and learn, but human creativity, review, and understanding are essential.",
  },
  {
    q: "Is Copilot free?",
    a: "GitHub Copilot is a paid subscription service, but offers a free trial for new users with limited usage.",
  },
  {
    q: "Which IDE supports Copilot?",
    a: "Copilot is available for VS Code, Visual Studio, Neovim, and JetBrains IDEs like PyCharm and IntelliJ IDEA.",
  },
];
function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  function toggle(idx: number) {
    setOpenIdx(openIdx === idx ? null : idx);
  }

  return (
    <section className="relative z-10 max-w-3xl mx-auto px-4 py-14">
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-50 mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <div className="divide-y divide-blue-900/30 bg-gradient-to-br from-blue-900/30 to-indigo-950/30 rounded-2xl border border-blue-900/20 glass-card">
        {FaqList.map((item, idx) => (
          <div key={item.q}>
            <button
              className="w-full py-4 px-4 flex justify-between items-center text-left focus:outline-none group"
              onClick={() => toggle(idx)}
              aria-expanded={openIdx === idx}
              aria-controls={`faq-panel-${idx}`}
            >
              <span className="font-semibold text-blue-100 group-hover:text-indigo-400 transition">{item.q}</span>
              {openIdx === idx ? (
                <ChevronUp className="w-6 h-6 text-blue-300" />
              ) : (
                <ChevronDown className="w-6 h-6 text-blue-500" />
              )}
            </button>
            <div
              id={`faq-panel-${idx}`}
              className={classNames(
                "text-blue-200/80 text-sm px-6 pb-4 transition-all duration-300",
                openIdx === idx ? "block" : "hidden"
              )}
            >
              {item.a}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// -- 10. NEWSLETTER SECTION --
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error" | "loading">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    // Fake subscribe logic
    setTimeout(() => {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    }, 1000);
  }
  return (
    <section id="newsletter" className="relative z-10 max-w-xl mx-auto px-4 py-14">
      <div className="rounded-2xl bg-gradient-to-br from-blue-950/70 to-indigo-950/50 border border-blue-900/30 shadow-xl p-8 md:p-12 text-center glass-card">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-50 mb-4">
          Get coding tips &amp; AI tools updates
        </h2>
        <p className="text-blue-100/80 font-medium mb-7">
          Sign up for our newsletter. Stay ahead with the latest in AI coding tools.
        </p>
        <form
          className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full max-w-lg mx-auto"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 bg-white/95 border border-blue-200 rounded px-4 py-3 text-blue-900 text-base outline-blue-400 shadow focus:border-blue-400 transition"
            value={email}
            onChange={e => {
              setStatus("idle");
              setEmail(e.target.value);
            }}
            required
            autoComplete="off"
          />
          <button
            type="submit"
            className={classNames(
              "px-6 py-3 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-semibold shadow hover:scale-105 transition text-base min-w-[120px]",
              status === "loading" ? "opacity-70 pointer-events-none" : ""
            )}
            disabled={status === "success" || status === "loading"}
          >
            {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : "Subscribe"}
          </button>
        </form>
        {status === "success" && <p className="text-green-400 mt-2 text-xs">Subscribed! 🎉</p>}
        {status === "error" && <p className="text-red-400 mt-2 text-xs">Please enter a valid email.</p>}
      </div>
    </section>
  );
}

// -- 11. FOOTER --
function Footer() {
  return (
    <footer className="relative z-20 px-6 py-8 bg-gradient-to-b from-blue-950/80 via-blue-900/90 to-indigo-950/90 backdrop-blur-2xl border-t border-blue-900/40 text-blue-300 text-sm mt-16">
      <div className="flex flex-col md:flex-row items-center md:justify-between max-w-6xl mx-auto gap-3">
        <div className="font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
          AI Study Hub
        </div>
        <nav className="flex gap-8 mt-3 md:mt-0 items-center">
          <Link href="/" className="hover:text-blue-400 transition">Home</Link>
          <Link href="/#tools" className="hover:text-blue-400 transition">Tools</Link>
          <Link href="/#features" className="hover:text-blue-400 transition">Features</Link>
          <Link href="#newsletter" className="hover:text-blue-400 transition">Newsletter</Link>
        </nav>
        <span className="mt-3 md:mt-0 text-sm">© {new Date().getFullYear()} AI Study Hub.</span>
      </div>
    </footer>
  );
}

// -- PAGE WRAPPER MAIN --
export default function GitHubCopilotPage() {
  return (
    <main className="min-h-screen font-sans bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-950 text-blue-50 selection:bg-blue-900/50 overflow-x-hidden">
      {/* Soft BG effect */}
      <div className="pointer-events-none fixed inset-0 -z-30">
        <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[80rem] h-[64rem] bg-gradient-to-br from-blue-700/10 via-blue-900/30 to-indigo-900/40 blur-3xl rounded-full opacity-55 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-64 h-24 bg-gradient-to-tr from-indigo-300/30 to-blue-500/30 blur-3xl rounded-full opacity-30" />
      </div>
      <HeroSection />
      <OverviewSection />
      <FeaturesSection />
      <UseCasesSection />
      <ProsConsSection />
      <PricingSection />
      <PromptExamplesSection />
      <RelatedToolsSection />
      <FAQSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}