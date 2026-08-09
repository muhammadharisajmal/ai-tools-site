"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Brain,
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
  GraduationCap,
  Code,
  Book,
} from "lucide-react";

// -- HERO SECTION --
function HeroSection() {
  return (
    <section className="relative w-full z-10 min-h-[350px] flex items-center justify-center px-4 py-20 md:py-32 bg-gradient-to-br from-indigo-200/60 via-cyan-50 to-blue-100 selection:bg-indigo-100/90 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div className="w-[38rem] h-[38rem] rounded-full blur-3xl opacity-30 bg-gradient-to-br from-indigo-300 via-blue-300 to-cyan-200 animate-pulse" />
      </div>
      <div className="relative z-10 max-w-xl w-full mx-auto text-center">
        <div className="inline-flex items-center px-4 py-3 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg ring-1 ring-indigo-100 mb-5">
          <Sparkles className="w-7 h-7 text-cyan-500 mr-2" />
          <span className="text-lg font-semibold text-indigo-800">Perplexity AI</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-br from-indigo-700 via-cyan-600 to-blue-700 bg-clip-text text-transparent mb-4">
          AI-powered answer engine for students
        </h1>
        <p className="text-slate-700/90 text-lg md:text-xl font-medium max-w-xl mx-auto mb-7">
          AI-powered answer engine that helps students research, learn, and explore faster
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
          <a
            href="https://www.perplexity.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-600 text-white font-semibold shadow-lg hover:scale-105 transition text-base"
          >
            Visit Perplexity <ExternalLink className="w-5 h-5" />
          </a>
          <Link
            href="/blog/perplexity-tutorials"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl border border-cyan-200 bg-white/80 text-cyan-700 font-semibold shadow hover:bg-cyan-50 hover:scale-105 transition text-base"
          >
            Read Study Guide <BookOpen className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// -- OVERVIEW SECTION --
const overviewCards = [
  {
    icon: <GraduationCap className="w-7 h-7 text-indigo-500" />,
    title: "Students",
    desc: "Quick answers for homework, exam prep, and concept revision—cited and reliable.",
  },
  {
    icon: <Brain className="w-7 h-7 text-cyan-600" />,
    title: "Researchers",
    desc: "Instant summaries, verified sources, and in-depth topic exploration for study projects.",
  },
  {
    icon: <PenLine className="w-7 h-7 text-blue-600" />,
    title: "Writers",
    desc: "Find trustworthy references, summarize articles, and create research-driven essays.",
  },
  {
    icon: <Code className="w-7 h-7 text-indigo-400" />,
    title: "Developers",
    desc: "Get up-to-date code snippets, explanations, and cite trusted documentation.",
  },
];
function OverviewSection() {
  return (
    <section className="relative z-10 px-4 max-w-5xl mx-auto py-12 md:py-18">
      <div className="mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">What is Perplexity AI?</h2>
        <p className="text-slate-700 text-[1.08rem] max-w-2xl mx-auto font-normal">
          Perplexity AI is a real-time AI research assistant that instantly searches the web, analyzes academic resources, and cites every answer it gives. Students and learners use it to prep for exams, get homework help, and find credible sources—faster than ever.
        </p>
        <div className="flex flex-wrap justify-center mt-6 gap-3 text-xs">
          <span className="px-3 py-1 rounded-lg bg-cyan-100 text-cyan-700 font-medium mr-1">
            Real-time Search
          </span>
          <span className="px-3 py-1 rounded-lg bg-indigo-100 text-indigo-700 font-medium mr-1">
            Cited Answers
          </span>
          <span className="px-3 py-1 rounded-lg bg-blue-100 text-blue-700 font-medium">
            Study Assistance
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        {overviewCards.map((card) => (
          <div
            key={card.title}
            className="bg-white/80 rounded-2xl shadow-lg p-6 flex flex-col items-start gap-2 border border-slate-100 hover:border-cyan-200 backdrop-blur-xl transition-all"
          >
            <div className="mb-2">{card.icon}</div>
            <div className="font-semibold text-lg text-slate-900">{card.title}</div>
            <p className="text-slate-700 text-sm">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// -- FEATURES SECTION --
const features = [
  {
    icon: <Sparkles className="w-7 h-7 text-cyan-500" />,
    title: "Real-time AI Search",
    desc: "Get the latest answers with up-to-date information from across the web.",
  },
  {
    icon: <FileText className="w-7 h-7 text-blue-500" />,
    title: "Cited Answers with Sources",
    desc: "All replies include reliable citations so you can fact-check instantly.",
  },
  {
    icon: <Brain className="w-7 h-7 text-indigo-600" />,
    title: "Deep Research Mode",
    desc: "Explore more complex topics with expanded context and comprehensive search.",
  },
  {
    icon: <Zap className="w-7 h-7 text-cyan-400" />,
    title: "Study Assistant for Exams",
    desc: "Instantly clarify tough questions, revise topics, and prep for exams stress-free.",
  },
  {
    icon: <BookOpen className="w-7 h-7 text-indigo-500" />,
    title: "Summarization of Articles",
    desc: "Summarize articles, papers, and readings into concise, digestible points.",
  },
  {
    icon: <Lightbulb className="w-7 h-7 text-blue-400" />,
    title: "Topic Exploration Assistant",
    desc: "Discover related topics, FAQs, and learning paths with smart suggestions.",
  },
];
function FeaturesSection() {
  return (
    <section className="relative z-10 px-4 max-w-6xl mx-auto py-12 md:py-20">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-7">
        Key Features for Students & Researchers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl bg-white/80 border border-cyan-100 shadow-lg backdrop-blur-xl p-7 flex flex-col items-start gap-3 transition-all hover:scale-[1.03] hover:shadow-cyan-100/30"
          >
            {f.icon}
            <div className="font-semibold text-lg text-slate-900 mt-1">{f.title}</div>
            <p className="text-slate-700 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// -- USE CASES SECTION --
const useCases = [
  {
    icon: <Book className="w-6 h-6 text-indigo-500" />,
    title: "Exam Preparation Research",
  },
  {
    icon: <PenLine className="w-6 h-6 text-cyan-600" />,
    title: "Homework Assistance",
  },
  {
    icon: <FileText className="w-6 h-6 text-blue-600" />,
    title: "Essay Research & Citations",
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-indigo-400" />,
    title: "Quick Topic Explanations",
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-cyan-500" />,
    title: "Notes Summarization",
  },
  {
    icon: <Brain className="w-6 h-6 text-blue-500" />,
    title: "Project Research",
  },
];
function UseCasesSection() {
  return (
    <section className="relative z-10 px-4 max-w-5xl mx-auto py-12 md:py-18">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-7">
        Use Cases for Students
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-3">
        {useCases.map((u) => (
          <div
            key={u.title}
            className="rounded-2xl bg-white/75 shadow border border-blue-100 p-6 flex items-center gap-4 hover:scale-105 hover:shadow-cyan-100/40 hover:border-cyan-300 transition-all duration-150"
          >
            <div className="flex-shrink-0">{u.icon}</div>
            <div className="font-medium text-slate-800">{u.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// -- PROS AND CONS SECTION --
const pros = [
  "Real-time web knowledge",
  "Gives sources/citations",
  "Great for research & study",
  "Fast answers with summaries",
];
const cons = [
  "Not ideal for creative writing",
  "Sometimes depends on search quality",
  "Limited offline capability",
  "Can be less structured than ChatGPT",
];
function ProsConsSection() {
  return (
    <section className="relative z-10 px-4 max-w-4xl mx-auto py-10 md:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold mb-7 text-slate-900 text-center">Pros & Cons</h2>
      <div className="flex flex-col sm:flex-row gap-7">
        <div className="flex-1 rounded-2xl bg-white/80 border border-green-100 shadow p-7 backdrop-blur-xl">
          <div className="flex items-center mb-2 gap-2 font-semibold text-green-700">
            <ThumbsUp className="w-5 h-5" /> Pros
          </div>
          <ul className="text-slate-700 text-sm pl-4 list-disc space-y-2">
            {pros.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div className="flex-1 rounded-2xl bg-white/75 border border-red-100 shadow p-7 backdrop-blur-xl">
          <div className="flex items-center mb-2 gap-2 font-semibold text-red-600">
            <ThumbsDown className="w-5 h-5" /> Cons
          </div>
          <ul className="text-slate-700 text-sm pl-4 list-disc space-y-2">
            {cons.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// -- PRICING SECTION --
const pricing = [
  {
    title: "Free Plan",
    desc: [
      "Basic search",
      "Limited Pro searches",
      "Standard AI answers",
    ],
    highlight: false,
  },
  {
    title: "Pro Plan",
    desc: [
      "Faster answers",
      "Advanced models",
      "More citations & deep research",
    ],
    highlight: true,
  },
];
function PricingSection() {
  return (
    <section className="relative z-10 px-4 max-w-3xl mx-auto py-12 md:py-20">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-slate-900 text-center">Plans & Pricing</h2>
      <div className="flex flex-col md:flex-row gap-7 items-center justify-center">
        {pricing.map((plan) => (
          <div
            key={plan.title}
            className={`
              flex-1 rounded-3xl bg-white/80 border-2 shadow-xl p-8 transition-all backdrop-blur-xl
              ${plan.highlight ?
                "border-cyan-500 shadow-cyan-100/60 scale-105" :
                "border-slate-100"
              }
              max-w-xs w-full
            `}
          >
            <div className={`font-bold text-xl mb-2 ${plan.highlight ? "text-cyan-700" : "text-slate-900"}`}>{plan.title}</div>
            <ul className="text-slate-700 text-sm pl-2 list-disc space-y-2 mb-4">
              {plan.desc.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            {plan.highlight && (
              <div className="mt-3 inline-block px-3 py-1 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-xs font-semibold rounded-full shadow">
                Best for Deep Research
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// -- PROMPT EXAMPLES SECTION --
const promptSamples = [
  "Explain quantum physics with sources",
  "Summarize latest AI trends with citations",
  "Research climate change effects for school project",
  "Compare GPT vs Claude vs Gemini with references",
  "Explain black holes in simple terms",
  "Give me study notes on World War 2",
];
function PromptExamplesSection() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1500);
    } catch {}
  };

  return (
    <section className="relative z-10 px-4 max-w-5xl mx-auto py-12 md:py-18">
      <h2 className="text-2xl sm:text-3xl font-bold mb-7 text-center text-slate-900">Prompt Examples</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {promptSamples.map((prompt, idx) => (
          <div
            key={prompt}
            className="group rounded-xl bg-white/80 backdrop-blur-xl border border-cyan-100 shadow p-5 flex items-center justify-between gap-2 hover:border-indigo-300 transition"
          >
            <span className="text-slate-800 text-sm font-medium">{prompt}</span>
            <button
              aria-label="Copy prompt"
              title="Copy prompt"
              onClick={() => handleCopy(prompt, idx)}
              className="ml-3 p-2 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-cyan-600 transition"
            >
              {copiedIdx === idx ? (
                <span className="text-green-600 font-bold text-xs">Copied!</span>
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

// -- RELATED TOOLS SECTION --
const relatedTools = [
  {
    name: "ChatGPT",
    desc: "General-purpose AI chatbot for Q&A, summaries, and creative text.",
    href: "/tools/chatgpt",
    icon: <Sparkles className="w-8 h-8 text-fuchsia-500" />,
  },
  {
    name: "Claude",
    desc: "Fast, trustworthy AI assistant oriented toward productivity.",
    href: "/tools/claude",
    icon: <Brain className="w-8 h-8 text-cyan-600" />,
  },
  {
    name: "Cursor AI",
    desc: "Powerful AI coding assistant designed for learning to code.",
    href: "/tools/cursor",
    icon: <Code className="w-8 h-8 text-indigo-500" />,
  },
  {
    name: "Notion AI",
    desc: "Workspace AI for notes, docs, and study organization.",
    href: "/tools/notion",
    icon: <BookOpen className="w-8 h-8 text-blue-500" />,
  },
];
function RelatedToolsSection() {
  return (
    <section className="relative z-10 px-4 max-w-5xl mx-auto py-12 md:py-18">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-7 text-center">Related Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {relatedTools.map((t) => (
          <div
            key={t.name}
            className="rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-100 shadow flex flex-col items-center gap-3 p-6 hover:border-cyan-300 hover:shadow-cyan-100/30 hover:scale-105 transition-all text-center"
          >
            <div>{t.icon}</div>
            <div className="font-semibold text-lg text-slate-900">{t.name}</div>
            <p className="text-slate-700 text-sm mb-3">{t.desc}</p>
            <Link
              href={t.href}
              className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-tr from-cyan-500 to-indigo-500 text-white rounded-lg font-medium shadow hover:scale-105 transition text-sm"
            >
              Explore <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

// -- FAQ SECTION --
const FaqList = [
  {
    q: "What is Perplexity AI?",
    a: "Perplexity AI is an AI research and answer engine that provides cited, real-time answers to any question using up-to-date web sources.",
  },
  {
    q: "Is Perplexity good for students?",
    a: "Yes! It's built for students, helping with homework, research, studying, and fast topic explanations—all with cited sources.",
  },
  {
    q: "Does it give real sources?",
    a: "Every answer comes with sources and citations you can check and use in your research or essays.",
  },
  {
    q: "Can it replace Google?",
    a: "Perplexity is a powerful companion for research, but for broad searches or finding websites, Google can still be helpful.",
  },
  {
    q: "Is Perplexity free?",
    a: "Yes! Perplexity offers a generous free plan for research and learning. There are also paid plans for deeper research features.",
  },
];

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="relative z-10 px-4 max-w-3xl mx-auto py-14 md:py-24">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-slate-900">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {FaqList.map((faq, idx) => (
          <div
            key={faq.q}
            className="rounded-xl bg-white/80 border border-slate-100 shadow backdrop-blur-xl"
          >
            <button
              className="w-full px-6 py-4 flex items-center justify-between text-left font-semibold text-indigo-800 group"
              onClick={() => toggle(idx)}
              aria-expanded={openIdx === idx}
              aria-controls={`faq-panel-${idx}`}
            >
              <span>{faq.q}</span>
              {openIdx === idx ? (
                <ChevronUp className="w-5 h-5 text-cyan-500 group-hover:rotate-180 transition-transform" />
              ) : (
                <ChevronDown className="w-5 h-5 text-cyan-400 group-hover:rotate-180 transition-transform" />
              )}
            </button>
            {openIdx === idx && (
              <div
                className="px-6 pb-5 text-slate-700 text-[0.97rem] animate-fadeIn"
                id={`faq-panel-${idx}`}
              >
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// -- NEWSLETTER SECTION --
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[\w-.]+@[\w-]+\.[\w-]{2,}$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1100);
  };

  return (
    <section className="relative z-10 px-4 max-w-xl mx-auto py-16 md:py-24">
      <div className="rounded-2xl bg-white/90 border border-cyan-200 shadow-xl backdrop-blur-xl p-8 flex flex-col items-center">
        <h3 className="text-xl font-bold text-center bg-gradient-to-br from-cyan-600 to-indigo-500 bg-clip-text text-transparent mb-2">
          Get daily research & study tips
        </h3>
        <p className="text-slate-700 mb-5 text-center text-sm">
          Subscribe for AI-powered study guides and productivity insights.
        </p>
        <form className="w-full flex flex-col sm:flex-row gap-3 mt-2" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 rounded-lg bg-white border border-slate-200 px-3 py-2 text-slate-800 text-sm outline-cyan-400 shadow"
            value={email}
            autoComplete="email"
            onChange={e => {
              setStatus("idle");
              setEmail(e.target.value);
            }}
            required
            disabled={status === "success"}
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white font-semibold shadow-sm hover:scale-105 transition text-sm"
            disabled={status === "success" || status === "loading"}
          >
            {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : "Subscribe"}
          </button>
        </form>
        {status === "success" && <p className="text-green-600 mt-2 text-xs">Subscribed! 🎉</p>}
        {status === "error" && <p className="text-red-500 mt-2 text-xs">Please enter a valid email.</p>}
      </div>
    </section>
  );
}

// -- FOOTER SECTION --
function Footer() {
  return (
    <footer className="relative z-30 px-6 py-8 bg-white/95 backdrop-blur-xl border-t border-slate-100 text-slate-600 text-base font-medium mt-16">
      <div className="flex flex-col md:flex-row items-center md:justify-between max-w-6xl mx-auto gap-3">
        <div className="font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-indigo-700">
          AI Study Hub
        </div>
        <nav className="flex gap-8 mt-3 md:mt-0 items-center">
          <Link href="/" className="hover:text-cyan-500 transition">Home</Link>
          <Link href="/#tools" className="hover:text-cyan-500 transition">Tools</Link>
          <Link href="/#features" className="hover:text-cyan-500 transition">Features</Link>
          <Link href="#newsletter" className="hover:text-cyan-500 transition">Newsletter</Link>
        </nav>
        <span className="mt-3 md:mt-0 text-sm">© {new Date().getFullYear()} AI Study Hub.</span>
      </div>
    </footer>
  );
}

// -- PAGE WRAPPER MAIN --
export default function PerplexityPage() {
  return (
    <main className="relative min-h-screen font-sans bg-gradient-to-br from-white via-cyan-50 to-indigo-100 selection:bg-cyan-100 overflow-x-hidden">
      {/* Floating soft BG shapes */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[66rem] h-[40rem] bg-gradient-to-br from-white via-cyan-100 to-indigo-100 blur-3xl rounded-full opacity-40 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-72 h-24 bg-gradient-to-tr from-cyan-200/50 to-white/70 blur-2xl rounded-full opacity-30" />
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