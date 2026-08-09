"use client";

import { useState, type FormEvent } from "react";
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
  Book,
  GraduationCap,
  Code,
} from "lucide-react";

// 1. HERO SECTION
function HeroSection() {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center pt-12 sm:pt-20 px-4 pb-6 sm:pb-10 mb-2">
      {/* Soft Gradient Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[48rem] h-[36rem] bg-gradient-to-br from-white via-slate-100 to-indigo-100 blur-2xl rounded-full opacity-60" />
      </div>
      {/* Main Card */}
      <div className="max-w-2xl w-full mx-auto bg-white/65 backdrop-blur-2xl rounded-3xl shadow-xl p-10 flex flex-col items-center gap-7 border border-slate-100">
        <div className="p-4 bg-gradient-to-br from-white via-indigo-100 to-slate-200 rounded-full shadow mb-0">
          <Sparkles className="w-14 h-14 text-indigo-400 drop-shadow" strokeWidth={2.1} />
        </div>
        <h1 className="font-extrabold text-4xl sm:text-5xl bg-clip-text text-transparent bg-gradient-to-br from-slate-800 to-indigo-800 text-center tracking-tight">
          Notion AI
        </h1>
        <p className="mt-1 text-lg sm:text-xl text-slate-700 text-center font-medium max-w-md">
          Your AI-powered workspace for notes, writing, and study productivity
        </p>
        <div className="flex gap-3 mt-2 flex-wrap justify-center">
          <a
            href="https://www.notion.so/product/ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-2 rounded-xl bg-gradient-to-tr from-slate-900 via-indigo-600 to-slate-600 text-white font-semibold shadow hover:scale-105 transition text-base gap-2"
          >
            Visit Notion AI <ExternalLink className="w-5 h-5" />
          </a>
          <Link
            href="/blog/notion-ai-tutorials"
            className="inline-flex items-center px-6 py-2 rounded-xl border border-indigo-200 bg-white/80 text-indigo-700 font-semibold shadow hover:bg-indigo-50 hover:scale-105 transition text-base gap-2"
          >
            Read Guides <BookOpen className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// 2. OVERVIEW SECTION
const overviewCards = [
  {
    icon: <GraduationCap className="w-7 h-7 text-indigo-500" />,
    title: "Students",
    desc: "Organize study notes, summarize lectures, and write assignments efficiently.",
  },
  {
    icon: <PenLine className="w-7 h-7 text-blue-500" />,
    title: "Writers",
    desc: "Draft essays, structure ideas, and get assistance for your writing.",
  },
  {
    icon: <Users className="w-7 h-7 text-violet-500" />,
    title: "Professionals",
    desc: "Manage meeting notes, tasks, and projects using AI in your workflow.",
  },
  {
    icon: <Lightbulb className="w-7 h-7 text-fuchsia-500" />,
    title: "Researchers",
    desc: "Summarize articles, organize findings, and build searchable knowledge bases.",
  },
];
function OverviewSection() {
  return (
    <section className="relative z-10 px-4 max-w-5xl mx-auto py-10 md:py-16">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">
          What is Notion AI?
        </h2>
        <p className="text-slate-700 text-[1.08rem] max-w-2xl mx-auto text-center font-normal">
          Notion AI integrates advanced writing, summarization, and organizational tools directly into your workspace. Perfect for students, creators, and professionals—streamline your notes, documents, and tasks for ultimate productivity and clarity.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        {overviewCards.map((card) => (
          <div key={card.title} className="bg-white/80 rounded-2xl shadow-lg p-6 flex flex-col items-start gap-2 border border-slate-100 hover:border-indigo-200 backdrop-blur-xl transition-all">
            <div className="mb-2">{card.icon}</div>
            <div className="font-semibold text-lg text-slate-900">{card.title}</div>
            <p className="text-slate-700 text-sm">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// 3. FEATURES SECTION
const features = [
  {
    icon: <Sparkles className="w-7 h-7 text-fuchsia-500" />,
    title: "AI Writing Assistant",
    desc: "Draft, revise, and improve your writing using AI directly in your notes.",
  },
  {
    icon: <BookOpen className="w-7 h-7 text-indigo-600" />,
    title: "Smart Note Summarization",
    desc: "Summarize long notes and readings into concise, actionable sections.",
  },
  {
    icon: <FileText className="w-7 h-7 text-blue-500" />,
    title: "Meeting / Lecture Notes Generator",
    desc: "Automatically generate, organize, and format notes from meetings or lectures.",
  },
  {
    icon: <Zap className="w-7 h-7 text-yellow-500" />,
    title: "Task & Study Organization",
    desc: "Convert written notes into actionable tasks and organized study plans.",
  },
  {
    icon: <Lightbulb className="w-7 h-7 text-indigo-400" />,
    title: "Idea Structuring & Planning",
    desc: "Easily transform brainstorming into structured content and outlines.",
  },
  {
    icon: <MessageCircle className="w-7 h-7 text-fuchsia-500" />,
    title: "Knowledge Base Q&A",
    desc: "Ask questions about your knowledge base and get instant answers.",
  },
];
function FeaturesSection() {
  return (
    <section className="relative z-10 px-4 max-w-6xl mx-auto py-10 md:py-18">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-7">
        Notion AI Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {features.map((feature) => (
          <div key={feature.title} className="bg-white/80 rounded-2xl shadow-lg p-6 flex flex-col gap-2 border border-slate-100 hover:border-indigo-100 backdrop-blur-xl transition-all">
            <div>{feature.icon}</div>
            <div className="font-semibold text-lg text-slate-900 mt-1">{feature.title}</div>
            <div className="text-slate-700 text-sm">{feature.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// 4. USE CASES SECTION
const useCases = [
  {
    icon: <Book className="w-7 h-7 text-indigo-500" />,
    label: "Organize Study Notes",
    desc: "Keep all your class notes, highlights, and insights structured neatly.",
  },
  {
    icon: <PenLine className="w-7 h-7 text-blue-500" />,
    label: "Summarize Lectures",
    desc: "Get concise recaps of dense lecture content for quick review.",
  },
  {
    icon: <GraduationCap className="w-7 h-7 text-fuchsia-500" />,
    label: "Create Revision Plans",
    desc: "Transform your syllabus and notes into actionable study plans.",
  },
  {
    icon: <FileText className="w-7 h-7 text-indigo-400" />,
    label: "Write Assignments & Essays",
    desc: "Get a head start on your written work with AI guidance.",
  },
  {
    icon: <Zap className="w-7 h-7 text-yellow-500" />,
    label: "Convert Messy Notes",
    desc: "Turn disorganized scraps into structured, shareable documents.",
  },
];
function UseCasesSection() {
  return (
    <section className="relative z-10 px-4 max-w-5xl mx-auto py-10 md:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-7 text-center">
        Student Use Cases
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
        {useCases.map((uc) => (
          <div key={uc.label} className="bg-white/75 rounded-2xl shadow-md p-6 flex flex-col gap-2 border border-slate-50 hover:border-indigo-200 backdrop-blur-lg transition-all">
            <div>{uc.icon}</div>
            <div className="font-semibold text-base text-slate-900 mt-2">{uc.label}</div>
            <div className="text-slate-700 text-sm">{uc.desc}</div>
          </div>
        ))}
        {/* 6th Card: to match 5 use cases */}
        <div className="bg-white/75 rounded-2xl shadow-md p-6 flex flex-col gap-2 border border-slate-50 hover:border-indigo-200 backdrop-blur-lg transition-all">
          <div><Brain className="w-7 h-7 text-indigo-400" /></div>
          <div className="font-semibold text-base text-slate-900 mt-2">AI Workspace Flow</div>
          <div className="text-slate-700 text-sm">Boost your study sessions by integrating all productivity features in one workspace.</div>
        </div>
      </div>
    </section>
  );
}

// 5. PROS & CONS SECTION
const pros = [
  { icon: <ThumbsUp className="w-6 h-6 text-green-500" />, text: "Excellent for productivity & organization" },
  { icon: <ThumbsUp className="w-6 h-6 text-green-500" />, text: "Great note structuring" },
  { icon: <ThumbsUp className="w-6 h-6 text-green-500" />, text: "Strong writing + summarization" },
  { icon: <ThumbsUp className="w-6 h-6 text-green-500" />, text: "Works inside workspace flow" },
];
const cons = [
  { icon: <ThumbsDown className="w-6 h-6 text-red-400" />, text: "Not ideal for heavy coding" },
  { icon: <ThumbsDown className="w-6 h-6 text-red-400" />, text: "Requires structured workspace setup" },
  { icon: <ThumbsDown className="w-6 h-6 text-red-400" />, text: "Some features behind paid plan" },
];
function ProsConsSection() {
  return (
    <section className="relative z-10 px-4 max-w-4xl mx-auto py-10 md:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-7 text-center">
        Pros & Cons
      </h2>
      <div className="flex flex-col md:flex-row gap-7 justify-center">
        <div className="flex-1 bg-white/75 rounded-2xl shadow-md p-6 border border-green-100 backdrop-blur-xl">
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
        <div className="flex-1 bg-white/75 rounded-2xl shadow-md p-6 border border-red-100 backdrop-blur-xl">
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

// 6. PRICING SECTION
function PricingSection() {
  return (
    <section className="relative z-10 px-4 max-w-5xl mx-auto py-10 md:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">
        Pricing
      </h2>
      <div className="flex flex-col sm:flex-row gap-8 justify-center">
        <div className="flex-1 min-w-[260px] bg-white/80 shadow rounded-2xl p-8 flex flex-col items-center border border-slate-100 backdrop-blur-2xl">
          <div className="font-semibold text-indigo-500 text-lg mb-1">Free</div>
          <div className="text-4xl font-bold mb-2">$0<span className="text-base text-slate-500">/mo</span></div>
          <div className="mb-5 text-slate-700 text-center text-sm">
            Essential AI writing, notes, and organization features.
          </div>
          <ul className="space-y-2 mb-5 text-sm text-slate-800 flex flex-col items-center">
            <li className="flex gap-2 items-center"><Sparkles className="w-5 h-5 text-fuchsia-500" /> AI writing basics</li>
            <li className="flex gap-2 items-center"><BookOpen className="w-5 h-5 text-indigo-600" /> Note summarization</li>
            <li className="flex gap-2 items-center"><FileText className="w-5 h-5 text-blue-500" /> Knowledge Q&A</li>
          </ul>
          <button className="px-6 py-2 rounded-lg bg-slate-200 text-slate-700 font-semibold hover:bg-slate-300 transition">Use Free</button>
        </div>
        <div className="flex-1 min-w-[260px] bg-white/90 shadow-xl rounded-2xl p-8 flex flex-col items-center border border-indigo-200 backdrop-blur-2xl">
          <div className="font-semibold text-indigo-600 text-lg mb-1">Plus</div>
          <div className="text-4xl font-bold mb-2">$10–$20<span className="text-base text-slate-500">/mo*</span></div>
          <div className="mb-5 text-slate-700 text-center text-sm">
            Advanced AI organization tools, priority features, and team plans.
          </div>
          <ul className="space-y-2 mb-5 text-sm text-slate-800 flex flex-col items-center">
            <li className="flex gap-2 items-center"><Zap className="w-5 h-5 text-yellow-500" /> Enhanced automation</li>
            <li className="flex gap-2 items-center"><Users className="w-5 h-5 text-violet-500" /> Team workspaces</li>
            <li className="flex gap-2 items-center"><PenLine className="w-5 h-5 text-blue-500" /> Priority AI features</li>
          </ul>
          <button disabled className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-slate-500 text-white font-semibold opacity-95 cursor-not-allowed">Coming Soon</button>
          <div className="text-xs text-slate-500 mt-2">*Pricing varies by plan.</div>
        </div>
      </div>
    </section>
  );
}

// 7. PROMPT EXAMPLES SECTION
const prompts = [
  "Summarize these lecture notes into key points",
  "Convert this messy text into structured notes",
  "Create a study plan for exams",
  "Write meeting notes in proper format",
  "Organize my research into sections",
  "Turn this topic into flashcards",
];
function PromptExamplesSection() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const handleCopy = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1100);
  };

  return (
    <section className="relative z-10 px-4 max-w-3xl mx-auto py-10 md:py-14">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">
        Example Prompts for Students
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {prompts.map((p, idx) => (
          <div key={p} className="flex items-center group bg-white/80 backdrop-blur-lg border border-slate-100 hover:border-indigo-200 rounded-xl p-4 mb-2 shadow transition">
            <MessageCircle className="w-5 h-5 flex-shrink-0 text-indigo-500 mr-2" />
            <div className="flex-1 text-slate-800 text-base">{p}</div>
            <button
              className="ml-2 p-2 rounded hover:bg-indigo-100 transition flex items-center"
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

// 8. RELATED TOOLS SECTION
const relatedTools = [
  {
    name: "ChatGPT",
    to: "/tools/chatgpt",
    icon: <Sparkles className="w-7 h-7 text-emerald-500" />,
    desc: "Conversational AI for all tasks.",
  },
  {
    name: "Claude",
    to: "/tools/claude",
    icon: <Sparkles className="w-7 h-7 text-orange-400" />,
    desc: "Advanced assistant for creative work.",
  },
  {
    name: "Cursor",
    to: "/tools/cursor",
    icon: <Sparkles className="w-7 h-7 text-blue-500" />,
    desc: "AI coding partner for your IDE.",
  },
  {
    name: "Gemini",
    to: "/tools/gemini",
    icon: <Sparkles className="w-7 h-7 text-violet-500" />,
    desc: "Google’s multi-modal AI for knowledge research.",
  },
];
function RelatedToolsSection() {
  return (
    <section className="relative z-10 px-4 max-w-4xl mx-auto py-10 md:py-14">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-7 text-center">
        Related Tools
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {relatedTools.map((tool) => (
          <div key={tool.name} className="bg-white/85 rounded-2xl shadow p-6 flex flex-col items-start border border-slate-100 hover:border-indigo-200 backdrop-blur-xl transition-all">
            <div>{tool.icon}</div>
            <div className="font-semibold text-lg text-slate-900 mt-2">{tool.name}</div>
            <div className="text-slate-700 text-sm mb-3">{tool.desc}</div>
            <Link
              href={tool.to}
              className="inline-flex items-center px-4 py-1.5 rounded-md bg-indigo-100 text-indigo-800 font-medium text-sm hover:bg-indigo-200 transition gap-1"
            >
              View <ExternalLink className="w-4 h-4 ml-1" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

// 9. FAQ SECTION
const faqs = [
  {
    question: "What is Notion AI used for?",
    answer: "Notion AI assists with writing, note-taking, summarization, organization, and productivity tasks inside your workspace.",
  },
  {
    question: "Is Notion AI good for students?",
    answer: "Yes—students can summarize lectures, organize study notes, draft essays, and prepare revision plans efficiently within Notion AI.",
  },
  {
    question: "Can it summarize notes?",
    answer: "Absolutely! Simply paste your notes, and Notion AI will create clear, concise summaries or key points.",
  },
  {
    question: "Is Notion AI free?",
    answer: "Notion offers a free plan with basic AI features. Advanced features may require a paid upgrade.",
  },
  {
    question: "Is it better than ChatGPT for productivity?",
    answer: "For workspace organization, writing, and notes, Notion AI offers focused productivity inside your workflow. ChatGPT is more general-purpose.",
  },
];
function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section className="relative z-10 px-4 max-w-2xl mx-auto py-10 md:py-14">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-7 text-center">
        Frequently Asked Questions
      </h2>
      <div className="divide-y divide-slate-200 bg-white/75 rounded-2xl shadow border border-slate-100 backdrop-blur-xl">
        {faqs.map((faq, idx) => (
          <div key={faq.question}>
            <button
              className="w-full text-left flex items-center justify-between gap-2 font-medium py-5 px-6 text-slate-800 hover:bg-indigo-50 transition"
              onClick={() => setOpenIdx(openIdx===idx ? null : idx)}
              aria-expanded={openIdx===idx}
              aria-controls={`faq-content-${idx}`}
            >
              <span>{faq.question}</span>
              {openIdx === idx
                ? <ChevronUp className="w-5 h-5 text-indigo-500" />
                : <ChevronDown className="w-5 h-5 text-slate-400" />
              }
            </button>
            <div
              id={`faq-content-${idx}`}
              className={`px-6 pb-4 text-slate-700 text-sm overflow-hidden transition-all duration-200 ${openIdx === idx ? "max-h-52" : "max-h-0"} ${openIdx === idx ? "block" : "hidden"}`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// 10. NEWSLETTER SECTION
function NewsletterSection() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [email, setEmail] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
      setStatus("error");
      return;
    }
    setTimeout(() => setStatus("success"), 700);
  };

  return (
    <section className="relative z-10 px-4 max-w-xl mx-auto py-8 md:py-12" id="newsletter">
      <div className="bg-white/90 rounded-2xl shadow border border-indigo-100 p-8 flex flex-col items-center gap-2 backdrop-blur-2xl">
        <h3 className="font-semibold text-lg text-slate-900 mb-1">Get study productivity tips</h3>
        <p className="text-slate-700 text-sm mb-3 text-center">
          Join our newsletter for Notion AI strategies, free templates, and student productivity tips!
        </p>
        <form onSubmit={handleSubmit} className="flex w-full gap-2 items-center justify-center mt-2">
          <input
            type="email"
            aria-label="Email address"
            placeholder="Your email"
            className="flex-1 bg-white border border-slate-200 rounded px-3 py-2 text-slate-800 text-sm outline-indigo-400 shadow"
            value={email}
            onChange={e => {
              setStatus("idle");
              setEmail(e.target.value);
            }}
            required
          />
          <button
            type="submit"
            className="px-4 py-2 rounded bg-gradient-to-tr from-indigo-500 to-slate-600 text-white font-semibold shadow-sm hover:scale-105 transition text-sm"
            disabled={status==="success"}
          >
            {status === "success" ? "Subscribed!" : "Subscribe"}
          </button>
        </form>
        {status === "success" && <p className="text-green-600 mt-2 text-xs">Subscribed! 🎉</p>}
        {status === "error" && <p className="text-red-500 mt-2 text-xs">Please enter a valid email.</p>}
      </div>
    </section>
  );
}

// 11. FOOTER
function Footer() {
  return (
    <footer className="relative z-30 px-6 py-8 bg-white/95 backdrop-blur-xl border-t border-slate-100 text-slate-600 text-base font-medium mt-16">
      <div className="flex flex-col md:flex-row items-center md:justify-between max-w-6xl mx-auto gap-3">
        <div className="font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-slate-700">
          AI Study Hub
        </div>
        <nav className="flex gap-8 mt-3 md:mt-0 items-center">
          <Link href="/" className="hover:text-indigo-500 transition">Home</Link>
          <Link href="/#tools" className="hover:text-indigo-500 transition">Tools</Link>
          <Link href="/#features" className="hover:text-indigo-500 transition">Features</Link>
          <Link href="#newsletter" className="hover:text-indigo-500 transition">Newsletter</Link>
        </nav>
        <span className="mt-3 md:mt-0 text-sm">© {new Date().getFullYear()} AI Study Hub.</span>
      </div>
    </footer>
  );
}

// --- PAGE WRAPPER ---
export default function NotionPage() {
  return (
    <main className="relative min-h-screen font-sans bg-gradient-to-br from-white via-indigo-50 to-slate-100 selection:bg-indigo-100 overflow-x-hidden">
      {/* Subtle BG shapes */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[64rem] h-[40rem] bg-gradient-to-br from-white via-indigo-100 to-slate-100 blur-3xl rounded-full opacity-40 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-72 h-24 bg-gradient-to-tr from-indigo-200/50 to-white/70 blur-2xl rounded-full opacity-30" />
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