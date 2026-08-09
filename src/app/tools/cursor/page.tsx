"use client";
import { useState, type FormEvent } from "react";
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

// --- 1. HERO SECTION ---
function HeroSection() {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center py-14 sm:py-24 px-4 mb-0">
      {/* Gradient Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[45rem] h-[32rem] bg-gradient-to-tr from-indigo-200 via-blue-200 to-purple-100 blur-2xl rounded-full opacity-60 animate-pulse" />
      </div>
      {/* Glassmorphism Main Card */}
      <div className="max-w-2xl w-full mx-auto bg-white/60 backdrop-blur-2xl rounded-3xl shadow-xl p-10 flex flex-col items-center gap-7 border border-indigo-100">
        <div className="p-4 bg-gradient-to-tr from-indigo-500 via-blue-500 to-purple-600 rounded-full shadow-lg">
          <Sparkles className="w-14 h-14 text-white drop-shadow" strokeWidth={2.2} />
        </div>
        <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-tr from-indigo-500 via-blue-700 to-purple-600 text-center tracking-tight">
          Cursor AI
        </h1>
        <p className="mt-1 text-xl md:text-2xl text-slate-800 text-center font-medium max-w-lg">
          AI-powered code editor that helps students and developers write, understand, and debug code faster
        </p>
        <div className="flex gap-4 mt-2 flex-wrap justify-center">
          <a
            href="https://cursor.sh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-2 rounded-xl bg-gradient-to-tr from-indigo-500 via-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-indigo-200/30 transition text-base gap-2"
          >
            Visit Cursor <ExternalLink className="w-5 h-5" />
          </a>
          <Link
            href="/blog/cursor-tutorials"
            className="inline-flex items-center px-6 py-2 rounded-xl bg-gradient-to-tr from-white via-indigo-100 to-blue-100 text-indigo-600 font-semibold shadow border border-indigo-200 hover:bg-indigo-50 hover:scale-105 transition text-base gap-2"
          >
            Read Guide <BookOpen className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// --- 2. OVERVIEW SECTION ---
const overviewCards = [
  {
    icon: <GraduationCap className="w-7 h-7 text-indigo-500" />,
    title: "Students",
    desc: "Accelerate learning with AI-powered code explanations and examples.",
  },
  {
    icon: <Code className="w-7 h-7 text-blue-500" />,
    title: "Developers",
    desc: "Boost productivity and focus on what matters with automated coding help.",
  },
  {
    icon: <Book className="w-7 h-7 text-purple-500" />,
    title: "Beginners",
    desc: "Learn programming step-by-step with guided AI feedback.",
  },
  {
    icon: <Users className="w-7 h-7 text-indigo-400" />,
    title: "Freelancers",
    desc: "Save time on project work and deliver quality code with AI assistance.",
  },
];

function OverviewSection() {
  return (
    <section className="relative z-10 px-4 max-w-5xl mx-auto py-12 md:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold mb-7 text-center bg-clip-text text-transparent bg-gradient-to-tr from-blue-500 to-purple-600">
        What is Cursor AI?
      </h2>
      <p className="mx-auto max-w-2xl mb-9 text-slate-700 text-center text-base md:text-lg">
        Cursor AI is an AI-powered code editor assistant that helps students, developers, and lifelong learners write, understand, and debug code faster. Whether you're just starting or pushing production code, Cursor makes coding and learning more efficient.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {overviewCards.map((card) => (
          <div
            key={card.title}
            className="bg-white/75 backdrop-blur-xl rounded-2xl shadow-lg p-6 flex flex-col gap-3 items-start border border-transparent hover:border-blue-200 transition-all min-h-[150px]"
          >
            <div>{card.icon}</div>
            <div className="font-semibold text-lg text-slate-800">{card.title}</div>
            <div className="text-slate-600 text-[0.97rem]">{card.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- 3. FEATURES SECTION ---
const features = [
  {
    icon: <Sparkles className="w-6 h-6 text-purple-500" />,
    title: "AI Code Completion",
    desc: "Instantly complete entire blocks of code with context-aware AI suggestions.",
  },
  {
    icon: <Zap className="w-6 h-6 text-indigo-400" />,
    title: "Smart Debugging Assistant",
    desc: "Detect, explain, and fix code errors directly in your workflow.",
  },
  {
    icon: <Brain className="w-6 h-6 text-blue-500" />,
    title: "Code Explanation Tool",
    desc: "Get clear explanations for complex code in any language.",
  },
  {
    icon: <PenLine className="w-6 h-6 text-purple-600" />,
    title: "Refactoring Suggestions",
    desc: "Improve code quality and structure with automated refactoring tips.",
  },
  {
    icon: <BookOpen className="w-6 h-6 text-indigo-600" />,
    title: "Learning Programming Faster",
    desc: "Step-by-step feedback and guidance as you write and explore code.",
  },
  {
    icon: <FileText className="w-6 h-6 text-blue-600" />,
    title: "Project Assistance",
    desc: "Manage and scaffold files, functions, and boilerplates with ease.",
  },
];

function FeaturesSection() {
  return (
    <section className="relative z-10 px-4 max-w-6xl mx-auto py-12 md:py-20">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-tr from-indigo-500 to-blue-600">
        Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-white/80 backdrop-blur-2xl border border-transparent hover:border-indigo-200 rounded-2xl shadow-lg p-7 flex flex-col gap-3 transition-all"
          >
            <div>{f.icon}</div>
            <div className="font-semibold text-lg text-slate-800">{f.title}</div>
            <div className="text-slate-600 text-[0.98rem]">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- 4. USE CASES SECTION ---
const useCases = [
  {
    icon: <BookOpen className="w-7 h-7 text-indigo-500" />,
    desc: "Learn programming step-by-step with interactive AI feedback.",
  },
  {
    icon: <Zap className="w-7 h-7 text-purple-500" />,
    desc: "Debug errors in code instantly with clear explanations.",
  },
  {
    icon: <Sparkles className="w-7 h-7 text-blue-500" />,
    desc: "Build projects faster using automated code generation.",
  },
  {
    icon: <Brain className="w-7 h-7 text-indigo-600" />,
    desc: "Understand complex codebases with code summarization tools.",
  },
  {
    icon: <FileText className="w-7 h-7 text-blue-600" />,
    desc: "Generate boilerplate code and repetitive functions automatically.",
  },
  {
    icon: <Lightbulb className="w-7 h-7 text-purple-400" />,
    desc: "Improve coding skills with targeted suggestions and tips.",
  },
];

function UseCasesSection() {
  return (
    <section className="relative z-10 px-4 max-w-5xl mx-auto py-12 md:py-18">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-tr from-indigo-600 to-purple-600 text-center">
        Use Cases for Coding & Learning
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
        {useCases.map((uc, i) => (
          <div
            key={i}
            className="bg-white/75 backdrop-blur-xl rounded-2xl shadow-lg p-6 flex flex-col gap-2 items-start border border-transparent hover:border-purple-200 transition-all"
          >
            <div>{uc.icon}</div>
            <div className="text-slate-700 text-base mt-2">{uc.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- 5. PROS & CONS SECTION ---
const pros = [
  {
    icon: <ThumbsUp className="w-5 h-5 text-indigo-500" />,
    text: "Very fast coding assistance",
  },
  {
    icon: <ThumbsUp className="w-5 h-5 text-indigo-500" />,
    text: "Great for debugging",
  },
  {
    icon: <ThumbsUp className="w-5 h-5 text-indigo-500" />,
    text: "Helps beginners learn coding",
  },
  {
    icon: <ThumbsUp className="w-5 h-5 text-indigo-500" />,
    text: "Works directly inside editor workflow",
  },
];

const cons = [
  {
    icon: <ThumbsDown className="w-5 h-5 text-purple-400" />,
    text: "Not a full standalone AI chat system",
  },
  {
    icon: <ThumbsDown className="w-5 h-5 text-purple-400" />,
    text: "Requires setup in IDE",
  },
  {
    icon: <ThumbsDown className="w-5 h-5 text-purple-400" />,
    text: "Advanced features may need paid plan",
  },
  {
    icon: <ThumbsDown className="w-5 h-5 text-purple-400" />,
    text: "Not focused on non-coding tasks",
  },
];

function ProsConsSection() {
  return (
    <section className="relative z-10 px-4 max-w-4xl mx-auto py-12 md:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold mb-7 text-center bg-clip-text text-transparent bg-gradient-to-tr from-blue-500 to-purple-600">
        Pros & Cons
      </h2>
      <div className="flex flex-col md:flex-row gap-7 justify-center">
        <div className="flex-1 bg-white/75 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-indigo-100">
          <div className="font-semibold text-indigo-600 mb-3 flex items-center gap-2">
            <ThumbsUp className="w-5 h-5" /> Pros
          </div>
          <ul className="space-y-2">
            {pros.map((p, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700">
                {p.icon} <span>{p.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 bg-white/75 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-purple-100">
          <div className="font-semibold text-purple-500 mb-3 flex items-center gap-2">
            <ThumbsDown className="w-5 h-5" /> Cons
          </div>
          <ul className="space-y-2">
            {cons.map((c, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700">
                {c.icon} <span>{c.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// --- 6. PRICING SECTION ---
function PricingSection() {
  return (
    <section className="relative z-10 px-4 max-w-5xl mx-auto py-12 md:py-20">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-tr from-indigo-600 to-purple-600">
        Pricing
      </h2>
      <div className="flex flex-col sm:flex-row gap-8 justify-center">
        <div className="flex-1 bg-white/80 backdrop-blur-2xl shadow-lg rounded-2xl p-8 flex flex-col items-center border border-indigo-100 min-w-[250px]">
          <div className="font-semibold text-indigo-500 text-lg mb-2">Free Plan</div>
          <div className="text-4xl font-bold mb-1">
            $0<span className="text-xl font-medium text-slate-500">/mo</span>
          </div>
          <div className="mb-6 text-slate-700 text-center text-sm">
            Basic coding assistance, explanations, and learning features.
          </div>
          <button className="px-6 py-2 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 hover:shadow-md transition">
            Get Started Free
          </button>
        </div>
        <div className="flex-1 bg-white/80 backdrop-blur-2xl shadow-2xl rounded-2xl p-8 flex flex-col items-center border border-purple-200 min-w-[250px]">
          <div className="font-semibold text-purple-600 text-lg mb-2">Pro Plan</div>
          <div className="text-4xl font-bold mb-1">
            $20<span className="text-xl font-medium text-slate-500">/mo</span>
          </div>
          <div className="mb-6 text-slate-700 text-center text-sm">
            Access advanced features and boost your productivity further.
          </div>
          <button disabled className="px-6 py-2 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 text-white font-semibold opacity-90 cursor-not-allowed">
            Coming Soon
          </button>
        </div>
      </div>
    </section>
  );
}

// --- 7. PROMPT EXAMPLES SECTION ---
const promptExamples = [
  "Explain this code step by step",
  "Fix bugs in this JavaScript function",
  "Convert this code to React",
  "Optimize this function for performance",
  "Generate a REST API in Node.js",
  "Teach me this algorithm with examples",
];

function PromptExamplesSection() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1200);
  };

  return (
    <section className="relative z-10 px-4 max-w-3xl mx-auto py-12 md:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-600">
        Example Prompts for Cursor AI
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {promptExamples.map((p, idx) => (
          <div
            key={p}
            className="flex items-center group bg-white/80 backdrop-blur-xl border border-transparent hover:border-indigo-200 rounded-xl p-4 mb-2 shadow transition"
          >
            <MessageCircle className="w-5 h-5 flex-shrink-0 text-indigo-500 mr-2" />
            <div className="flex-1 text-slate-700 text-base">{p}</div>
            <button
              className="ml-2 p-2 rounded hover:bg-indigo-100 transition flex items-center"
              onClick={() => handleCopy(p, idx)}
              aria-label="Copy prompt"
            >
              <Copy
                className={`w-5 h-5 ${
                  copiedIdx === idx ? "text-green-600" : "text-slate-400"
                } transition`}
              />
              <span className="ml-1 text-xs text-slate-500">{copiedIdx === idx ? "Copied!" : ""}</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- 8. RELATED TOOLS SECTION ---
const relatedTools = [
  {
    icon: <Sparkles className="w-8 h-8 text-emerald-500" />,
    name: "ChatGPT",
    desc: "Conversational AI for writing, brainstorming, and Q&A.",
    to: "/tools/chatgpt",
    color: "from-emerald-400 to-green-600",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-orange-500" />,
    name: "Claude",
    desc: "Advanced AI assistant for creative and analytical tasks.",
    to: "/tools/claude",
    color: "from-orange-400 to-pink-500",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-blue-500" />,
    name: "Gemini",
    desc: "Powerful AI for research and learning support.",
    to: "/tools/gemini",
    color: "from-blue-400 to-indigo-600",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-fuchsia-500" />,
    name: "Notion AI",
    desc: "Supercharge docs, notes, and workflows with AI.",
    to: "/tools/notion",
    color: "from-fuchsia-500 to-indigo-400",
  },
];

function RelatedToolsSection() {
  return (
    <section className="relative z-10 px-4 max-w-4xl mx-auto py-12 md:py-17">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-tr from-indigo-500 to-purple-500">
        Related Tools
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        {relatedTools.map((tool) => (
          <div
            key={tool.name}
            className={`bg-white/75 backdrop-blur-xl rounded-2xl shadow-lg p-6 flex flex-col gap-3 border border-transparent hover:border-indigo-200 transition-all`}
          >
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${tool.color} flex items-center justify-center shadow-lg mb-2`}
            >
              {tool.icon}
            </div>
            <div className="font-semibold text-lg text-slate-800">{tool.name}</div>
            <div className="text-slate-600 text-[0.97rem]">{tool.desc}</div>
            <Link
              href={tool.to}
              className="inline-flex items-center w-fit mt-2 px-4 py-1.5 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-medium shadow hover:scale-105 hover:shadow-md transition gap-2 text-sm"
            >
              See tool <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- 9. FAQ SECTION ---
const faqList = [
  {
    q: "What is Cursor AI?",
    a: "Cursor AI is an AI-powered code editor that assists with writing, understanding, and debugging code, designed for students and developers.",
  },
  {
    q: "Is Cursor good for beginners?",
    a: "Absolutely! Cursor offers guided feedback and code explanations that help beginners learn programming more efficiently.",
  },
  {
    q: "Can Cursor help in learning coding?",
    a: "Yes, Cursor can explain code, suggest improvements, and provide learning resources and prompts as you code.",
  },
  {
    q: "Is Cursor better than VS Code?",
    a: "Cursor focuses on deeply integrated AI enhancements for coding and learning, but the choice depends on your workflow and needs.",
  },
  {
    q: "Is Cursor free?",
    a: "Cursor offers a free plan with essential AI coding features and a Pro plan for advanced capabilities.",
  },
];

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => setOpenIdx(idx === openIdx ? null : idx);

  return (
    <section className="relative z-10 px-4 max-w-3xl mx-auto py-12 md:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-tr from-indigo-600 to-blue-600">
        Frequently Asked Questions
      </h2>
      <div className="divide-y divide-indigo-100 rounded-2xl bg-white/70 backdrop-blur-2xl shadow-md">
        {faqList.map((faq, idx) => (
          <div key={faq.q}>
            <button
              onClick={() => toggle(idx)}
              className="w-full flex justify-between items-center py-5 px-6 text-slate-800 font-medium text-left focus:outline-none transition hover:bg-indigo-50 rounded-t-2xl"
              aria-expanded={openIdx === idx}
              aria-controls={`faq-panel-${idx}`}
            >
              <span>{faq.q}</span>
              {openIdx === idx ? (
                <ChevronUp className="w-5 h-5 text-indigo-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-indigo-400" />
              )}
            </button>
            <div
              id={`faq-panel-${idx}`}
              className={`px-6 pb-4 text-slate-600 text-base transition-all duration-300 ${
                openIdx === idx
                  ? "max-h-52 opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
              aria-hidden={openIdx !== idx}
            >
              {faq.a}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- 10. NEWSLETTER SECTION ---
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !/^[\w-.]+@[\w-]+\.[\w-.]{2,}$/i.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 2500);
  };

  return (
    <section
      id="newsletter"
      className="relative z-10 flex flex-col items-center justify-center py-14 px-4"
    >
      <div className="max-w-xl w-full mx-auto bg-white/75 backdrop-blur-2xl rounded-2xl shadow-lg p-8 flex flex-col items-center border border-blue-100">
        <div className="p-3 bg-gradient-to-tr from-indigo-500 to-blue-500 rounded-full">
          <Mail className="w-7 h-7 text-white" />
        </div>
        <h3 className="mt-3 font-bold text-lg text-indigo-700 text-center">
          Get the latest AI coding tips & resources
        </h3>
        <form onSubmit={handleSubmit} className="flex w-full mt-5 gap-1">
          <input
            type="email"
            className="flex-1 rounded-l-lg text-base py-2 px-4 outline-none bg-indigo-50 text-indigo-800 border border-indigo-100 focus:ring-2 focus:ring-indigo-200 transition"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setStatus("idle");
            }}
            required
          />
          <button
            type="submit"
            className="px-5 py-2 rounded-r-lg bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 transition"
          >
            Subscribe
          </button>
        </form>
        {status === "success" && (
          <p className="text-green-600 mt-2 text-sm">Subscribed! 🎉</p>
        )}
        {status === "error" && (
          <p className="text-red-500 mt-2 text-sm">
            Please enter a valid email.
          </p>
        )}
      </div>
    </section>
  );
}

function Mail(props: any) {
  // Custom inline icon as lucide-react Mail is not allowed
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      width="1em"
      height="1em"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6 12 13 2 6" />
    </svg>
  );
}

// --- 11. FOOTER ---
function Footer() {
  return (
    <footer className="relative z-30 px-6 py-10 bg-white/90 backdrop-blur-xl border-t border-slate-100 text-slate-600 text-base font-medium mt-20">
      <div className="flex flex-col md:flex-row items-center md:justify-between max-w-6xl mx-auto gap-3">
        <div className="font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-500">
          AI Study Hub
        </div>
        <nav className="flex gap-8 mt-3 md:mt-0 items-center">
          <Link href="/" className="hover:text-indigo-500 transition">
            Home
          </Link>
          <Link href="/#tools" className="hover:text-indigo-500 transition">
            Tools
          </Link>
          <Link href="/#features" className="hover:text-indigo-500 transition">
            Features
          </Link>
          <Link href="#newsletter" className="hover:text-indigo-500 transition">
            Newsletter
          </Link>
        </nav>
        <span className="mt-3 md:mt-0 text-[0.97rem]">
          © {new Date().getFullYear()} AI Study Hub.
        </span>
      </div>
    </footer>
  );
}

export default function CursorPage() {
  return (
    <main className="relative min-h-screen font-sans bg-gradient-to-tr from-indigo-50 via-blue-50 to-purple-100 selection:bg-indigo-100 overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[58rem] h-[36rem] bg-gradient-to-br from-indigo-100 via-blue-100 to-white blur-3xl rounded-full opacity-40 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-32 bg-gradient-to-tr from-indigo-200/60 to-purple-50/70 blur-2xl rounded-full opacity-30" />
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
