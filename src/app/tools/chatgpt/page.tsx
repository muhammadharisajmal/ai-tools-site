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

function classNames(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// --- HERO SECTION ---
function HeroSection() {
  return (
    <section className="relative isolate flex flex-col items-center justify-center px-4 py-20 sm:py-28 min-h-[60vh] z-10">
      {/* Soft BG gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[65vw] h-[35vw] max-w-5xl blur-3xl rounded-3xl opacity-60 bg-gradient-to-tr from-indigo-400/50 via-fuchsia-200/60 to-pink-200/60 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-48 h-24 bg-gradient-to-tr from-fuchsia-200/30 to-blue-200/40 blur-2xl rounded-full opacity-40" />
      </div>
      <div className="max-w-2xl w-full">
        <div className="mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-xl bg-white/60 backdrop-blur-xl border border-fuchsia-100 mb-4 shadow">
            <Sparkles className="w-6 h-6 text-fuchsia-500 mr-2" />
            <span className="font-medium text-lg text-indigo-700">ChatGPT</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-5 bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-fuchsia-500 to-pink-400">
            Your AI-powered study, writing, coding &amp; learning assistant
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-8">
            Supercharge your studying, essays, code, and research with ChatGPT. Designed for students to learn, create, and succeed – faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://chat.openai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-tr from-fuchsia-600 to-indigo-500 text-white shadow-lg hover:scale-105 hover:shadow-fuchsia-100/40 transition-transform duration-150 text-base focus:outline-none"
            >
              <ExternalLink className="w-5 h-5" /> Visit ChatGPT
            </a>
            <Link
              href="/blog/chatgpt-tutorials"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/90 text-fuchsia-700 border border-fuchsia-200 font-semibold shadow hover:bg-fuchsia-50 hover:scale-105 transition text-base"
            >
              <BookOpen className="w-5 h-5" />
              Read Study Guide
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- OVERVIEW SECTION ---
const overviewCards = [
  {
    icon: <GraduationCap className="w-7 h-7 text-indigo-600" />,
    title: "Students",
    desc: "Ace your classes – get study help, notes, explanations & exam prep.",
  },
  {
    icon: <Code className="w-7 h-7 text-fuchsia-600" />,
    title: "Developers",
    desc: "Debug code, learn algorithms, and generate snippets instantly.",
  },
  {
    icon: <PenLine className="w-7 h-7 text-pink-600" />,
    title: "Writers",
    desc: "Draft essays, creative works, emails, and polish your writing.",
  },
  {
    icon: <Book className="w-7 h-7 text-blue-600" />,
    title: "Researchers",
    desc: "Summarize articles, brainstorm ideas, and explain tough topics.",
  },
];

function OverviewSection() {
  return (
    <section className="px-4 max-w-4xl mx-auto py-14 md:py-18">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-5 text-center">
        Learn &amp; achieve more with ChatGPT
      </h2>
      <p className="text-slate-600 text-center max-w-xl mx-auto mb-10">
        ChatGPT is your all-in-one assistant for learning, writing, coding, summarization, and brainstorming. Trusted by thousands of students, writers, and developers to get more done – faster.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-3">
        {overviewCards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl bg-white/70 backdrop-blur-xl border border-fuchsia-100 shadow flex flex-col items-center gap-3 p-6 hover:border-indigo-300 hover:shadow-indigo-100/30 hover:scale-105 transition-all text-center"
          >
            <div>{card.icon}</div>
            <div className="font-semibold text-lg text-slate-900">{card.title}</div>
            <p className="text-slate-700 text-sm">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- FEATURES SECTION ---
const features = [
  {
    icon: <FileText className="w-6 h-6 text-fuchsia-500" />,
    title: "AI Writing Assistant",
    desc: "Quickly draft essays, reports, study notes, emails & more.",
  },
  {
    icon: <Code className="w-6 h-6 text-indigo-600" />,
    title: "Coding Help & Debugging",
    desc: "Fix bugs, learn new code concepts & get instant code suggestions.",
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-blue-500" />,
    title: "Study & Exam Support",
    desc: "Get summaries, explanations, and personalize your study sessions.",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-pink-400" />,
    title: "Summarization Tool",
    desc: "Summarize notes, textbooks, research papers, & videos.",
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-fuchsia-500" />,
    title: "Idea Brainstorming",
    desc: "Unlock creativity with instant brainstorming and outlines.",
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-indigo-500" />,
    title: "Learning Tutor Mode",
    desc: "Chat and learn with personalized step-by-step tutoring.",
  },
];

function FeaturesSection() {
  return (
    <section className="px-4 max-w-6xl mx-auto py-14 md:py-18">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-7 text-center">
        Powerful features built for students
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl bg-white/80 backdrop-blur-xl border border-indigo-100 shadow p-6 flex flex-col items-start gap-2 hover:border-fuchsia-400 hover:shadow-fuchsia-100/25 hover:scale-105 transition-all"
          >
            <div>{feature.icon}</div>
            <div className="font-semibold text-lg text-slate-900">{feature.title}</div>
            <p className="text-slate-700 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- USE CASES SECTION ---
const useCases = [
  {
    icon: <GraduationCap className="w-6 h-6 text-indigo-500" />,
    label: "Exam preparation",
  },
  {
    icon: <FileText className="w-6 h-6 text-fuchsia-500" />,
    label: "Essay writing",
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-pink-500" />,
    label: "Homework help",
  },
  {
    icon: <BookOpen className="w-6 h-6 text-blue-500" />,
    label: "Notes summarization",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-indigo-400" />,
    label: "Concept explanation",
  },
  {
    icon: <Code className="w-6 h-6 text-fuchsia-600" />,
    label: "Project assistance",
  },
];

function UseCasesSection() {
  return (
    <section className="px-4 max-w-4xl mx-auto py-14 md:py-18">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-7 text-center">
        Top use cases for students
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {useCases.map((uc) => (
          <div
            key={uc.label}
            className="flex items-center gap-3 rounded-xl bg-white/80 backdrop-blur border border-indigo-100 shadow px-5 py-4 hover:border-fuchsia-300 hover:shadow-fuchsia-100/30 hover:scale-105 transition-all"
          >
            {uc.icon}
            <span className="font-medium text-slate-800 text-base">{uc.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- PROS & CONS SECTION ---
const pros = [
  {
    icon: <ThumbsUp className="w-5 h-5 text-green-500" />,
    text: "Very versatile AI assistant",
  },
  {
    icon: <ThumbsUp className="w-5 h-5 text-green-500" />,
    text: "Great for writing + coding + learning",
  },
  {
    icon: <ThumbsUp className="w-5 h-5 text-green-500" />,
    text: "Fast responses",
  },
  {
    icon: <ThumbsUp className="w-5 h-5 text-green-500" />,
    text: "Good creativity",
  },
];

const cons = [
  {
    icon: <ThumbsDown className="w-5 h-5 text-red-400" />,
    text: "Can give incorrect answers",
  },
  {
    icon: <ThumbsDown className="w-5 h-5 text-red-400" />,
    text: "Needs verification for research",
  },
  {
    icon: <ThumbsDown className="w-5 h-5 text-red-400" />,
    text: "Free version has limitations",
  },
  {
    icon: <ThumbsDown className="w-5 h-5 text-red-400" />,
    text: "Not always up-to-date",
  },
];

function ProsConsSection() {
  return (
    <section className="px-4 max-w-3xl mx-auto py-14 md:py-18">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-7 text-center">
        Pros &amp; Cons
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        <div className="rounded-2xl bg-white/80 border border-green-100 shadow p-6">
          <h3 className="text-lg font-bold text-green-700 mb-3 flex items-center gap-2">
            <ThumbsUp className="w-6 h-6" />
            Pros
          </h3>
          <ul className="space-y-2">
            {pros.map((p, i) => (
              <li key={i} className="flex items-center gap-2 text-green-900">
                {p.icon}
                <span>{p.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-white/80 border border-red-100 shadow p-6">
          <h3 className="text-lg font-bold text-red-600 mb-3 flex items-center gap-2">
            <ThumbsDown className="w-6 h-6" />
            Cons
          </h3>
          <ul className="space-y-2">
            {cons.map((c, i) => (
              <li key={i} className="flex items-center gap-2 text-red-700">
                {c.icon}
                <span>{c.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// --- PRICING SECTION ---
const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    features: [
      "Basic chat & writing",
      "Limited coding support",
      "Summarization",
      "Limited availability",
    ],
    highlight: false,
  },
  {
    name: "Plus",
    price: "$20",
    period: "/month",
    features: [
      "Priority access",
      "Faster response times",
      "Advanced features",
      "Higher message limits",
    ],
    highlight: true,
  },
];

function PricingSection() {
  return (
    <section className="px-4 max-w-4xl mx-auto py-14 md:py-18" id="pricing">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-9 text-center">
        Pricing
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {pricingTiers.map((tier) => (
          <div
            key={tier.name}
            className={classNames(
              "rounded-2xl bg-white/90 backdrop-blur-xl border shadow p-8 flex flex-col items-center",
              tier.highlight
                ? "border-fuchsia-400 shadow-fuchsia-100/30"
                : "border-indigo-100"
            )}
          >
            <div className="flex items-center gap-2 mb-4">
              {tier.highlight && <Zap className="w-5 h-5 text-fuchsia-500" />}
              <span className="text-2xl font-bold text-slate-900">{tier.name}</span>
            </div>
            <div className="flex items-end gap-1 mb-3">
              <span className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-tr from-indigo-500 to-fuchsia-500">
                {tier.price}
              </span>
              <span className="text-slate-500 mb-0.5">{tier.period}</span>
            </div>
            <ul className="mb-3 space-y-2 text-slate-700 text-base w-full">
              {tier.features.map((f, i) => (
                <li className="flex items-center gap-2" key={i}>
                  <Sparkles className="w-4 h-4 text-fuchsia-400" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              className={classNames(
                "mt-4 px-5 py-2.5 w-full rounded-lg font-medium transition",
                tier.highlight
                  ? "bg-gradient-to-tr from-fuchsia-600 to-indigo-500 text-white shadow hover:scale-105"
                  : "bg-slate-100 text-indigo-700 hover:bg-slate-200 hover:scale-105"
              )}
              disabled
              aria-disabled="true"
              title="Redirects to ChatGPT"
            >
              {tier.name === "Free" ? "Included with OpenAI account" : "Upgrade on OpenAI"}
            </button>
          </div>
        ))}
      </div>
      <div className="text-xs text-slate-400 text-center mt-4">
        Pricing for info only – check OpenAI&apos;s site for latest details.
      </div>
    </section>
  );
}

// --- PROMPT EXAMPLES SECTION ---
const examplePrompts = [
  "Summarize this biology chapter",
  "Explain Newton’s laws in simple terms",
  "Write an essay on climate change",
  "Create study notes for exams",
  "Generate quiz questions",
  "Help me understand calculus",
];

function PromptExamplesSection() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  async function handleCopy(prompt: string, idx: number) {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1400);
    } catch (e) {
      // ignore
    }
  }

  return (
    <section className="px-4 max-w-3xl mx-auto py-14 md:py-18">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-7 text-center">
        Student prompt examples
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {examplePrompts.map((prompt, idx) => (
          <div
            key={prompt}
            className="group rounded-xl bg-white/90 backdrop-blur-xl border border-pink-100 shadow p-5 flex items-center justify-between gap-2 hover:border-fuchsia-300 transition"
          >
            <span className="text-slate-800 text-sm font-medium">{prompt}</span>
            <button
              aria-label="Copy prompt"
              title="Copy prompt"
              onClick={() => handleCopy(prompt, idx)}
              className={classNames(
                "ml-3 p-2 rounded-lg bg-fuchsia-50 hover:bg-fuchsia-100 text-fuchsia-600 transition",
                copiedIdx === idx && "bg-green-50"
              )}
            >
              {copiedIdx === idx ? (
                <span className="text-green-600 font-bold text-xs transition">Copied!</span>
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

// --- RELATED TOOLS SECTION ---
const relatedTools = [
  {
    name: "Claude",
    desc: "Fast, trustworthy AI assistant for productivity.",
    href: "/tools/claude",
    icon: <Brain className="w-8 h-8 text-cyan-600" />,
  },
  {
    name: "Gemini",
    desc: "Google's next-gen study & writing AI.",
    href: "/tools/gemini",
    icon: <Sparkles className="w-8 h-8 text-blue-500" />,
  },
  {
    name: "Perplexity",
    desc: "Web AI for summarized research & Q&A.",
    href: "/tools/perplexity",
    icon: <Lightbulb className="w-8 h-8 text-indigo-600" />,
  },
  {
    name: "Notion AI",
    desc: "All-in-one workspace AI for notes & organization.",
    href: "/tools/notion",
    icon: <BookOpen className="w-8 h-8 text-pink-500" />,
  },
];

function RelatedToolsSection() {
  return (
    <section className="relative z-10 px-4 max-w-5xl mx-auto py-14 md:py-18">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-7 text-center">Related Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {relatedTools.map((t) => (
          <div
            key={t.name}
            className="rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-100 shadow flex flex-col items-center gap-3 p-6 hover:border-fuchsia-300 hover:shadow-fuchsia-100/30 hover:scale-105 transition-all text-center"
          >
            <div>{t.icon}</div>
            <div className="font-semibold text-lg text-slate-900">{t.name}</div>
            <p className="text-slate-700 text-sm mb-3">{t.desc}</p>
            <Link
              href={t.href}
              className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-tr from-fuchsia-500 to-indigo-500 text-white rounded-lg font-medium shadow hover:scale-105 transition text-sm"
            >
              Explore <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- FAQ SECTION ---
const faqList = [
  {
    q: "What is ChatGPT?",
    a: "ChatGPT is an AI assistant developed by OpenAI, designed to help with studying, writing, coding, research, and more through intelligent conversation.",
  },
  {
    q: "Is ChatGPT good for students?",
    a: "Yes! It's tailored for students seeking help with homework, explanations, essay drafting, coding, exam prep, and learning new topics.",
  },
  {
    q: "Can ChatGPT help with coding?",
    a: "Absolutely. ChatGPT can write code, debug snippets, explain syntax, and help you learn programming languages or concepts.",
  },
  {
    q: "Is ChatGPT free?",
    a: "There is a generous free plan, with paid upgrades for more features and priority access. Check OpenAI for updated pricing.",
  },
  {
    q: "Is ChatGPT accurate?",
    a: "Answers are often useful, but ChatGPT can make mistakes. Always double-check information, especially for assignments or research.",
  },
];

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="px-4 max-w-2xl mx-auto py-14 md:py-18">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqList.map((item, idx) => (
          <div
            key={item.q}
            className="rounded-xl bg-white/70 backdrop-blur border border-slate-100 shadow hover:border-fuchsia-200 transition-all"
          >
            <button
              className="flex justify-between w-full items-center px-5 py-4 focus:outline-none"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              aria-expanded={openIdx === idx}
              aria-controls={`faq-content-${idx}`}
            >
              <span className="text-base font-medium text-slate-900">{item.q}</span>
              {openIdx === idx ? (
                <ChevronUp className="w-5 h-5 text-fuchsia-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-fuchsia-400" />
              )}
            </button>
            <div
              id={`faq-content-${idx}`}
              className={classNames(
                "px-5 pb-5 transition-all duration-200 text-slate-700 text-sm",
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

// --- NEWSLETTER SECTION ---
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200); // simulate async
  }

  return (
    <section className="px-4 max-w-lg mx-auto py-14 md:py-18" id="newsletter">
      <div className="rounded-2xl bg-gradient-to-br from-white/70 via-fuchsia-50 to-indigo-50/60 backdrop-blur-xl border border-fuchsia-100 shadow-lg flex flex-col items-center p-8 gap-3">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">Get AI study tips & exclusive guides</h2>
        <p className="text-slate-600 mb-4 text-center text-sm">
          Subscribe to the AI Study Hub newsletter. No spam — just actionable tips & new tool launches.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 w-full" onSubmit={handleSubmit}>
          <input
            type="email"
            required
            autoComplete="email"
            placeholder="Your school email"
            className="flex-1 rounded-lg px-4 py-3 text-base border border-indigo-100 outline-none bg-white placeholder-slate-400 focus:ring-2 focus:ring-fuchsia-300 transition"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            disabled={status === "success" || status === "loading"}
          />
          <button
            type="submit"
            disabled={status === "success" || status === "loading"}
            className="min-w-[120px] rounded-lg px-5 py-3 bg-gradient-to-tr from-fuchsia-600 to-indigo-500 text-white font-semibold shadow hover:scale-105 transition-transform duration-150 focus:outline-none"
          >
            {status === "loading"
              ? "Subscribing..."
              : status === "success"
              ? "Subscribed!"
              : "Subscribe"}
          </button>
        </form>
        {status === "success" && (
          <p className="text-green-600 mt-2 text-xs">Subscribed! 🎉</p>
        )}
        {status === "error" && (
          <p className="text-red-500 mt-2 text-xs">Please enter a valid email.</p>
        )}
      </div>
    </section>
  );
}

// --- FOOTER ---
function Footer() {
  return (
    <footer className="relative z-30 px-6 py-8 bg-white/95 backdrop-blur-xl border-t border-slate-100 text-slate-600 text-base font-medium mt-16">
      <div className="flex flex-col md:flex-row items-center md:justify-between max-w-6xl mx-auto gap-3">
        <div className="font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-fuchsia-500">
          AI Study Hub
        </div>
        <nav className="flex gap-8 mt-3 md:mt-0 items-center">
          <Link href="/" className="hover:text-fuchsia-500 transition">
            Home
          </Link>
          <Link href="/#tools" className="hover:text-fuchsia-500 transition">
            Tools
          </Link>
          <Link href="/#features" className="hover:text-fuchsia-500 transition">
            Features
          </Link>
          <Link href="#newsletter" className="hover:text-fuchsia-500 transition">
            Newsletter
          </Link>
        </nav>
        <span className="mt-3 md:mt-0 text-sm">
          © {new Date().getFullYear()} AI Study Hub.
        </span>
      </div>
    </footer>
  );
}

// --- PAGE WRAPPER MAIN ---
export default function ChatGPTPage() {
  return (
    <main className="relative min-h-screen font-sans bg-gradient-to-br from-white via-fuchsia-50 to-indigo-100 selection:bg-fuchsia-100 overflow-x-hidden">
      {/* Floating soft BG shapes */}
      <div className="pointer-events-none fixed inset-0 -z-20">
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[64rem] h-[36rem] bg-gradient-to-br from-white via-indigo-100 to-fuchsia-100 blur-3xl rounded-full opacity-30 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-72 h-24 bg-gradient-to-tr from-indigo-200/50 to-white/70 blur-2xl rounded-full opacity-20" />
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