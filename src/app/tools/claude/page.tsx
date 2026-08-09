"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  PenLine,
  MessageCircle,
  Brain,
  FileText,
  Zap,
  Code,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  Users,
  ExternalLink,
  Copy,
  Book,
  ChevronDown,
  ChevronUp
} from "lucide-react";

// --- 1. HERO SECTION ---
function HeroSection() {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center py-14 sm:py-24 px-4">
      {/* Gradient Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[46rem] h-[32rem] bg-gradient-to-tr from-indigo-100 via-purple-200 to-blue-100 blur-2xl rounded-full opacity-60 animate-pulse" />
      </div>
      {/* Glassmorphism Card */}
      <div className="max-w-2xl w-full mx-auto bg-white/65 backdrop-blur-2xl rounded-3xl shadow-xl p-10 flex flex-col items-center gap-6 border border-fuchsia-100">
        <div className="p-4 bg-gradient-to-tr from-orange-400 to-pink-500 rounded-full shadow-lg">
          <Sparkles className="w-14 h-14 text-white drop-shadow" strokeWidth={2.4}/>
        </div>
        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-tr from-orange-500 via-fuchsia-600 to-indigo-500 text-center tracking-tight">
          Claude AI
        </h1>
        <p className="mt-1 text-xl md:text-2xl text-slate-800 text-center font-medium max-w-lg">
          Smart, safe, and powerful AI assistant for students and creators
        </p>
        <div className="flex gap-4 mt-4 flex-wrap justify-center">
          <a
            href="https://claude.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-tr from-orange-400 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-orange-200/50 transition text-lg gap-2"
          >
            <ExternalLink className="w-5 h-5" />
            Visit Claude
          </a>
          <Link
            href="/blog/claude-tutorials"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-white/80 border border-orange-200 text-orange-700 font-semibold shadow hover:scale-105 hover:border-pink-300 transition text-lg gap-2"
          >
            <BookOpen className="w-5 h-5" />
            Read Study Guides
          </Link>
        </div>
      </div>
    </section>
  );
}

// --- 2. OVERVIEW SECTION ---
function OverviewSection() {
  return (
    <section className="relative z-10 max-w-3xl mx-auto px-4 py-14 md:py-18">
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-pink-100 p-8 md:p-12 flex flex-col gap-7">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2 bg-clip-text text-transparent bg-gradient-to-tr from-orange-500 to-fuchsia-600">
          What is Claude AI?
        </h2>
        <p className="text-lg text-slate-700">
          <span className="font-semibold text-orange-600">Claude</span> is an advanced, safety-focused AI assistant by Anthropic, designed to help <span className="font-semibold">students</span>, <span className="font-semibold">writers</span>, <span className="font-semibold">developers</span>, and <span className="font-semibold">researchers</span> excel at studying, writing, summarization, and ideation. Claude offers deep contextual understanding, natural conversations, and support for even the most challenging academic tasks.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
          <div className="flex items-start gap-4">
            <GraduationCap className="w-8 h-8 text-indigo-500" strokeWidth={2.2}/>
            <div>
              <div className="font-semibold text-slate-800">Students</div>
              <div className="text-slate-600 text-sm">Prepare for exams, summarize notes, and solve homework efficiently.</div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <PenLine className="w-8 h-8 text-fuchsia-500" strokeWidth={2.2}/>
            <div>
              <div className="font-semibold text-slate-800">Writers</div>
              <div className="text-slate-600 text-sm">Draft essays, polish your prose, or generate creative content.</div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Code className="w-8 h-8 text-orange-500" strokeWidth={2.2}/>
            <div>
              <div className="font-semibold text-slate-800">Developers</div>
              <div className="text-slate-600 text-sm">Understand code, explain concepts, and boost programming skills.</div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Book className="w-8 h-8 text-blue-500" strokeWidth={2.2}/>
            <div>
              <div className="font-semibold text-slate-800">Researchers</div>
              <div className="text-slate-600 text-sm">Summarize papers, conduct research, and analyze large texts.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- 3. FEATURES SECTION ---
const features = [
  {
    icon: <FileText className="w-8 h-8 text-fuchsia-500" />,
    title: "Academic Writing Assistant",
    desc: "Write and edit essays, assignments, and reports with smart suggestions.",
  },
  {
    icon: <BookOpen className="w-8 h-8 text-indigo-500" />,
    title: "Deep Research Help",
    desc: "Break down complex topics, analyze sources, and find reliable information.",
  },
  {
    icon: <Code className="w-8 h-8 text-orange-500" />,
    title: "Code Understanding",
    desc: "Get explanations, analyze code snippets, and debug common errors.",
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
    title: "Long Document Summarization",
    desc: "Summarize textbooks, research papers, and lengthy notes into key points.",
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-pink-500" />,
    title: "Idea Brainstorming",
    desc: "Generate creative ideas, outlines, and innovative approaches for projects.",
  },
  {
    icon: <Brain className="w-8 h-8 text-blue-500" />,
    title: "Study Planning Assistant",
    desc: "Organize your study schedule, track progress, and set academic goals.",
  }
];
function FeaturesSection() {
  return (
    <section className="relative z-10 px-4 max-w-6xl mx-auto py-12 md:py-20">
      <h2 className="text-2xl sm:text-3xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-tr from-orange-400 via-pink-500 to-indigo-600 text-center">
        Powerful Features
      </h2>
      <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="group bg-white/65 backdrop-blur-2xl rounded-2xl shadow-xl px-7 py-8 flex flex-col gap-3 hover:shadow-orange-100/60 border border-transparent hover:border-fuchsia-200 transition-all"
          >
            <div className="flex items-center justify-center mb-2">{f.icon}</div>
            <div className="font-semibold text-lg text-slate-800">{f.title}</div>
            <div className="text-slate-600 text-[0.97rem]">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- 4. USE CASES SECTION ---
const useCases = [
  {
    icon: <GraduationCap className="w-7 h-7 text-indigo-500" />,
    label: "Exam Preparation",
    desc: "Generate quizzes, practice summaries, and smart revision notes."
  },
  {
    icon: <FileText className="w-7 h-7 text-fuchsia-500" />,
    label: "Essay Writing",
    desc: "Draft, review, and structure essays for any academic topic."
  },
  {
    icon: <BookOpen className="w-7 h-7 text-blue-500" />,
    label: "Homework Solving",
    desc: "Get step-by-step guides and study help across all subjects."
  },
  {
    icon: <Zap className="w-7 h-7 text-yellow-500" />,
    label: "Notes Summarization",
    desc: "Condense textbook chapters, lectures, and articles instantly."
  },
  {
    icon: <Lightbulb className="w-7 h-7 text-pink-500" />,
    label: "Learning Difficult Topics",
    desc: "Simplify challenging concepts with clear explanations and examples."
  }
];

function UseCasesSection() {
  return (
    <section className="relative z-10 px-4 max-w-5xl mx-auto py-12 md:py-18">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-tr from-fuchsia-500 to-indigo-600 text-center">
        Use Cases for Students
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
        {useCases.map((uc) => (
          <div
            key={uc.label}
            className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg p-6 flex flex-col gap-2 border border-transparent hover:border-fuchsia-200 transition-all"
          >
            <div>{uc.icon}</div>
            <div className="font-semibold text-lg text-slate-800 mt-2">{uc.label}</div>
            <div className="text-slate-700 text-[0.97rem]">{uc.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- 5. PROS & CONS SECTION ---
const pros = [
  { icon: <ThumbsUp className="w-6 h-6 text-green-500" />, text: "Great for long context understanding" },
  { icon: <ThumbsUp className="w-6 h-6 text-green-500" />, text: "Safe and structured answers" },
  { icon: <ThumbsUp className="w-6 h-6 text-green-500" />, text: "Strong writing quality" },
  { icon: <ThumbsUp className="w-6 h-6 text-green-500" />, text: "Good for research and essays" },
];
const cons = [
  { icon: <ThumbsDown className="w-6 h-6 text-red-400" />, text: "Limited plugins compared to others" },
  { icon: <ThumbsDown className="w-6 h-6 text-red-400" />, text: "Sometimes slower responses" },
  { icon: <ThumbsDown className="w-6 h-6 text-red-400" />, text: "Less coding-focused than ChatGPT" }
];

function ProsConsSection() {
  return (
    <section className="relative z-10 px-4 max-w-4xl mx-auto py-12 md:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold mb-7 text-center bg-clip-text text-transparent bg-gradient-to-tr from-orange-500 to-fuchsia-600">
        Pros & Cons
      </h2>
      <div className="flex flex-col md:flex-row gap-7 justify-center">
        <div className="flex-1 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-green-100">
          <div className="font-semibold text-green-600 mb-3 flex items-center gap-2">
            <ThumbsUp className="w-5 h-5" /> Pros
          </div>
          <ul className="space-y-2">
            {pros.map(({ icon, text }, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700">
                {icon} <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-pink-100">
          <div className="font-semibold text-red-500 mb-3 flex items-center gap-2">
            <ThumbsDown className="w-5 h-5" /> Cons
          </div>
          <ul className="space-y-2">
            {cons.map(({ icon, text }, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700">
                {icon} <span>{text}</span>
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
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-tr from-indigo-500 to-pink-500">
        Pricing
      </h2>
      <div className="flex flex-col sm:flex-row gap-8 justify-center">
        <div className="flex-1 bg-white/70 backdrop-blur-2xl shadow-lg rounded-2xl p-8 flex flex-col items-center border border-indigo-100">
          <div className="font-semibold text-indigo-500 text-lg mb-3">Free</div>
          <div className="text-4xl font-bold mb-2">$0<span className="text-xl font-medium text-slate-500">/mo</span></div>
          <div className="mb-5 text-slate-700 text-center text-sm">
            Basic access to Claude's core features
          </div>
          <ul className="space-y-2 mb-5">
            <li className="flex gap-2 items-center"><Sparkles className="w-5 h-5 text-fuchsia-500" /> Limited prompts/day</li>
            <li className="flex gap-2 items-center"><BookOpen className="w-5 h-5 text-indigo-500" /> Writing & summarization</li>
            <li className="flex gap-2 items-center"><GraduationCap className="w-5 h-5 text-orange-500" /> Study help</li>
          </ul>
          <button className="px-6 py-2 rounded-lg bg-gradient-to-tr from-indigo-500 to-fuchsia-500 text-white font-semibold hover:scale-105 hover:shadow-md transition">Try Free</button>
        </div>
        <div className="flex-1 bg-white/80 backdrop-blur-2xl shadow-2xl rounded-2xl p-8 flex flex-col items-center border border-pink-200">
          <div className="font-semibold text-pink-600 text-lg mb-3">Pro</div>
          <div className="text-4xl font-bold mb-2">$20<span className="text-xl font-medium text-slate-500">/mo</span></div>
          <div className="mb-5 text-slate-700 text-center text-sm">
            Unlock Claude's advanced study capabilities
          </div>
          <ul className="space-y-2 mb-5">
            <li className="flex gap-2 items-center"><Sparkles className="w-5 h-5 text-fuchsia-500" /> Higher limits</li>
            <li className="flex gap-2 items-center"><Brain className="w-5 h-5 text-blue-500" /> Long document support</li>
            <li className="flex gap-2 items-center"><Zap className="w-5 h-5 text-yellow-500" /> Priority access</li>
          </ul>
          <button disabled className="px-6 py-2 rounded-lg bg-gradient-to-tr from-pink-500 to-orange-400 text-white font-semibold opacity-90 cursor-not-allowed">Coming Soon</button>
        </div>
      </div>
    </section>
  );
}

// --- 7. PROMPT EXAMPLES SECTION ---
const prompts = [
  'Summarize this biology chapter...',
  "Explain Newton's laws in simple words...",
  "Write an essay on climate change...",
  'Create revision notes for exams...',
  'Make quiz questions from this topic...',
  'Help me understand calculus basics...'
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
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-tr from-orange-500 via-fuchsia-500 to-indigo-600">
        Example Prompts for Students
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {prompts.map((p, idx) => (
          <div key={p} className="flex items-center group bg-white/70 backdrop-blur-xl border border-transparent hover:border-indigo-200 rounded-xl p-4 mb-2 shadow transition">
            <MessageCircle className="w-5 h-5 flex-shrink-0 text-fuchsia-500 mr-2" />
            <div className="flex-1 text-slate-700 text-base">{p}</div>
            <button
              className="ml-2 p-2 rounded hover:bg-fuchsia-100 transition flex items-center"
              onClick={() => handleCopy(p, idx)}
              aria-label="Copy prompt"
            >
              <Copy className={`w-5 h-5 ${copiedIdx===idx ? "text-green-600" : "text-slate-400"} transition`} />
              <span className="ml-1 text-xs text-slate-500">{copiedIdx===idx ? "Copied!" : ""}</span>
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
    icon: <Sparkles className="w-8 h-8 text-green-600" />,
    name: "ChatGPT",
    desc: "Conversational AI assistant for any topic.",
    href: "/tools/chatgpt",
    color: "from-emerald-400 to-green-600"
  },
  {
    icon: <Sparkles className="w-8 h-8 text-blue-500" />,
    name: "Gemini",
    desc: "Google's flagship large language model.",
    href: "/tools/gemini",
    color: "from-blue-500 to-indigo-500"
  },
  {
    icon: <Sparkles className="w-8 h-8 text-violet-500" />,
    name: "Perplexity",
    desc: "AI research and search assistant.",
    href: "/tools/perplexity",
    color: "from-purple-400 to-indigo-400"
  },
  {
    icon: <Sparkles className="w-8 h-8 text-fuchsia-500" />,
    name: "Notion AI",
    desc: "AI assistant inside your docs & notes.",
    href: "/tools/notion",
    color: "from-fuchsia-500 to-pink-400"
  }
];
function RelatedToolsSection() {
  return (
    <section className="relative z-10 px-4 max-w-4xl mx-auto py-12 md:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-tr from-indigo-600 to-pink-500">
        Related AI Tools
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        {relatedTools.map((tool) => (
          <div
            key={tool.name}
            className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg flex flex-col sm:flex-row items-center gap-4 border border-transparent hover:border-indigo-200 px-6 py-5 transition"
          >
            <div className={`rounded-2xl bg-gradient-to-tr ${tool.color} flex items-center justify-center w-12 h-12 shadow`}>
              {tool.icon}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-lg text-slate-800">{tool.name}</div>
              <div className="text-slate-600 text-sm mb-2">{tool.desc}</div>
              <Link
                href={tool.href}
                className="inline-flex items-center gap-1 px-4 py-1.5 rounded bg-gradient-to-tr from-indigo-500 to-fuchsia-500 text-white font-medium text-sm shadow hover:scale-105 transition"
              >
                Explore <ExternalLink className="w-4 h-4"/>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- 9. FAQ SECTION ---
const faqs = [
  {
    q: "Is Claude good for students?",
    a: "Yes! Claude is designed to help students with studying, writing, summarizing, and understanding complex topics safely and efficiently."
  },
  {
    q: "Can Claude write essays?",
    a: "Absolutely. Claude can help draft and edit essays, provide outlines, enhance structure, and improve clarity and style."
  },
  {
    q: "Is Claude better than ChatGPT for research?",
    a: "Claude excels at understanding long contexts and providing structured, safe answers—especially useful for research and academic work."
  },
  {
    q: "Does Claude support coding?",
    a: "Claude can explain code, spot errors, and even help you understand programming assignments, though it’s less code-focused than some other AIs."
  },
  {
    q: "Is Claude free?",
    a: "Claude offers both free and paid options. Free access covers core features, while Pro offers higher usage and advanced tools."
  }
];

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="relative z-10 max-w-2xl mx-auto px-4 py-14 md:py-18">
      <h2 className="text-2xl sm:text-3xl font-bold mb-7 bg-clip-text text-transparent bg-gradient-to-tr from-orange-500 to-indigo-600 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={faq.q}
              className="bg-white/80 backdrop-blur-xl border border-fuchsia-100 rounded-xl shadow flex flex-col"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="flex justify-between items-center px-5 py-4 w-full text-left font-medium text-slate-800 bg-gradient-to-r from-white/60 to-white/80 rounded-t-xl focus:outline-none"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${idx}`}
              >
                <span>{faq.q}</span>
                <span>
                  {isOpen
                    ? <ChevronUp className="w-5 h-5 text-fuchsia-500" />
                    : <ChevronDown className="w-5 h-5 text-indigo-400" />}
                </span>
              </button>
              {isOpen && (
                <div id={`faq-panel-${idx}`} className="px-5 pb-4 text-slate-700 text-base animate-fadeIn">
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

// --- 10. NEWSLETTER SECTION ---
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Fake subscribe logic
    if (email && email.includes("@")) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 2500);
  };

  return (
    <section id="newsletter" className="relative z-10 px-4 max-w-xl mx-auto py-12 md:py-16">
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-indigo-100 p-7 flex flex-col items-center gap-4">
        <h3 className="font-semibold text-xl text-slate-800 mb-2">✨ Get Study Tips in Your Inbox</h3>
        <p className="text-slate-600 text-sm text-center mb-1">Join our newsletter for AI study hacks and Claude updates.</p>
        <form className="w-full flex flex-col sm:flex-row items-center gap-3" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            className={`flex-1 rounded-xl px-4 py-2 border outline-none bg-white/80 border-slate-200 focus:border-fuchsia-400 transition ${status==="error" ? "border-red-400" : ""}`}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="px-5 py-2 rounded-xl bg-gradient-to-tr from-fuchsia-500 to-indigo-500 text-white font-semibold shadow hover:scale-105 transition">
            Subscribe
          </button>
        </form>
        {status === "success" && <p className="text-green-600 mt-2 text-sm">Subscribed! 🎉</p>}
        {status === "error" && <p className="text-red-500 mt-2 text-sm">Please enter a valid email.</p>}
      </div>
    </section>
  );
}

// --- 11. FOOTER SECTION ---
function Footer() {
  return (
    <footer className="relative z-30 px-6 py-10 bg-white/90 backdrop-blur-xl border-t border-slate-100 text-slate-600 text-base font-medium mt-20">
      <div className="flex flex-col md:flex-row items-center md:justify-between max-w-6xl mx-auto gap-3">
        <div className="font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-500">
          AI Study Hub
        </div>
        <nav className="flex gap-8 mt-3 md:mt-0 items-center">
          <Link href="/" className="hover:text-fuchsia-500 transition">Home</Link>
          <Link href="/#tools" className="hover:text-fuchsia-500 transition">Tools</Link>
          <Link href="/#features" className="hover:text-fuchsia-500 transition">Features</Link>
          <Link href="#newsletter" className="hover:text-fuchsia-500 transition">Newsletter</Link>
        </nav>
        <span className="mt-3 md:mt-0 text-[0.97rem]">© {new Date().getFullYear()} AI Study Hub.</span>
      </div>
    </footer>
  );
}

// --- PAGE WRAPPER --- 
export default function ClaudePage() {
  return (
    <main className="relative min-h-screen font-sans bg-gradient-to-tr from-indigo-50 via-purple-50 to-blue-100 selection:bg-orange-100 overflow-x-hidden">
      {/* Animated soft background shapes */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[58rem] h-[36rem] bg-gradient-to-br from-orange-100 via-fuchsia-100 to-white blur-3xl rounded-full opacity-40 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-32 bg-gradient-to-tr from-fuchsia-200/60 to-indigo-50/70 blur-2xl rounded-full opacity-30" />
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