"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Brain,
  FileText,
  BookOpen,
  ExternalLink,
  Users,
  PenLine,
  Lightbulb,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Copy,
  GraduationCap,
  ThumbsUp,
  ThumbsDown,
  Zap,
  Code,
} from "lucide-react";

// -- 1. HERO SECTION --
function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center py-14 sm:py-24 px-4 mb-0">
      {/* Subtle green/blue gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[46rem] h-[34rem] bg-gradient-to-tr from-green-100 via-blue-100 to-white blur-3xl rounded-full opacity-60 animate-pulse" />
        <div className="absolute bottom-20 right-0 w-72 h-28 bg-gradient-to-tr from-green-200/50 to-white/80 blur-2xl rounded-full opacity-20" />
      </div>
      {/* Main Glassmorphism Card */}
      <div className="max-w-2xl w-full mx-auto bg-white/70 backdrop-blur-2xl rounded-3xl shadow-xl p-10 flex flex-col items-center gap-7 border border-green-100">
        <div className="p-4 bg-gradient-to-tr from-green-400 via-blue-400 to-teal-600 rounded-full shadow-lg">
          <Sparkles className="w-14 h-14 text-white drop-shadow" strokeWidth={2.2} />
        </div>
        <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-br from-green-500 via-blue-700 to-teal-700 text-center tracking-tight">
          Grammarly AI
        </h1>
        <p className="mt-1 text-xl md:text-2xl text-slate-800 text-center font-medium max-w-lg">
          Smart writing assistant that improves grammar, clarity, and tone
        </p>
        <div className="flex gap-4 mt-2 flex-wrap justify-center">
          <a
            href="https://www.grammarly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-2 rounded-xl bg-gradient-to-tr from-green-500 via-blue-400 to-teal-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-green-100 transition text-base gap-2"
          >
            Visit Grammarly <ExternalLink className="w-5 h-5" />
          </a>
          <Link
            href="/blog/grammarly-tutorials"
            className="inline-flex items-center px-6 py-2 rounded-xl bg-white/90 text-green-700 font-semibold shadow border border-green-200 hover:bg-green-50 hover:scale-105 transition text-base gap-2"
          >
            Read Writing Guides <BookOpen className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// -- 2. OVERVIEW SECTION --
const overviewCards = [
  {
    icon: <GraduationCap className="w-7 h-7 text-green-500" />,
    title: "Students",
    desc: "Improve essays, reports, and assignments with instant grammar and clarity checks.",
  },
  {
    icon: <PenLine className="w-7 h-7 text-blue-500" />,
    title: "Writers",
    desc: "Craft flawless content and enhance your writing style for blogs, articles, and more.",
  },
  {
    icon: <Users className="w-7 h-7 text-teal-500" />,
    title: "Professionals",
    desc: "Write better emails, resumes, and workplace content with confidence.",
  },
  {
    icon: <Lightbulb className="w-7 h-7 text-indigo-500" />,
    title: "Content Creators",
    desc: "Create polished, engaging posts and scripts for social, video, and more.",
  },
];
function OverviewSection() {
  return (
    <section className="relative z-10 px-4 max-w-5xl mx-auto py-10 md:py-16">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">
          What is Grammarly AI?
        </h2>
        <p className="text-slate-700 text-[1.09rem] max-w-2xl mx-auto text-center font-normal">
          Grammarly AI is your smart writing partner—an advanced assistant that checks grammar, refines clarity, and polishes tone in everything you write. Whether you are a student, professional, writer, or creative, Grammarly helps you communicate your ideas clearly and confidently.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        {overviewCards.map((card) => (
          <div key={card.title} className="bg-white/80 rounded-2xl shadow-lg p-6 flex flex-col items-start gap-2 border border-green-100 hover:border-blue-200 backdrop-blur-xl transition-all">
            <div className="mb-2">{card.icon}</div>
            <div className="font-semibold text-lg text-slate-900">{card.title}</div>
            <p className="text-slate-700 text-sm">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// -- 3. FEATURES SECTION --
const features = [
  {
    icon: <Sparkles className="w-7 h-7 text-green-500" />,
    title: "Grammar Correction",
    desc: "Detects and corrects grammatical mistakes instantly.",
  },
  {
    icon: <FileText className="w-7 h-7 text-blue-500" />,
    title: "Spell Check",
    desc: "Highlights and fixes spelling errors as you write.",
  },
  {
    icon: <Brain className="w-7 h-7 text-indigo-500" />,
    title: "Tone Detection",
    desc: "Analyze and adjust the tone of your message with ease.",
  },
  {
    icon: <Lightbulb className="w-7 h-7 text-green-400" />,
    title: "Writing Clarity Improvement",
    desc: "Clarifies sentences and eliminates ambiguity for stronger writing.",
  },
  {
    icon: <BookOpen className="w-7 h-7 text-fuchsia-500" />,
    title: "Plagiarism Support",
    desc: "Helps ensure originality and detects duplicate content.",
  },
  {
    icon: <MessageCircle className="w-7 h-7 text-blue-400" />,
    title: "AI Writing Suggestions",
    desc: "Get helpful edits and rewording recommendations for every purpose.",
  },
];
function FeaturesSection() {
  return (
    <section className="relative z-10 px-4 max-w-6xl mx-auto py-10 md:py-18">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-7">
        Grammarly AI Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white/80 rounded-2xl shadow-lg p-6 flex flex-col items-start gap-2 border border-blue-100 hover:shadow-green-100/40 hover:scale-[1.03] hover:border-green-200 backdrop-blur-xl transition-all"
          >
            <div className="mb-2">{feature.icon}</div>
            <div className="font-semibold text-lg text-slate-900">{feature.title}</div>
            <p className="text-slate-700 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// --4. USE CASES SECTION (STUDENTS FOCUS)--
const useCases = [
  {
    icon: <BookOpen className="w-6 h-6 text-blue-500" />,
    label: "Essay writing",
    desc: "Plan, draft, and refine essays with real-time suggestions.",
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-green-500" />,
    label: "Email writing",
    desc: "Compose clear, effective emails for academic and personal needs.",
  },
  {
    icon: <FileText className="w-6 h-6 text-indigo-500" />,
    label: "Assignments improvement",
    desc: "Polish grammar and structure for better grades.",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-green-500" />,
    label: "Grammar correction",
    desc: "Spot and fix all grammar errors as you work.",
  },
  {
    icon: <PenLine className="w-6 h-6 text-blue-400" />,
    label: "Resume writing help",
    desc: "Build standout resumes with tone and clarity checks.",
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-green-400" />,
    label: "Blog writing assistance",
    desc: "Create engaging posts that are error-free and easy to read.",
  },
];
function UseCasesSection() {
  return (
    <section className="relative z-10 px-4 max-w-5xl mx-auto py-10 md:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-6">
        Grammarly for Students: Use Cases
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {useCases.map((usecase) => (
          <div
            key={usecase.label}
            className="bg-white/75 rounded-2xl shadow p-5 flex flex-col gap-2 border border-blue-100 hover:shadow-green-100/40 hover:scale-[1.03] hover:border-green-200 backdrop-blur-xl transition-all"
          >
            <div>{usecase.icon}</div>
            <div className="font-semibold text-base text-slate-900">{usecase.label}</div>
            <p className="text-slate-700 text-sm">{usecase.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// -- 5. PROS & CONS SECTION --
const pros = [
  "Improves grammar and writing quality",
  "Easy to use",
  "Works across platforms",
  "Great for students and professionals",
];
const cons = [
  "Premium features locked behind paywall",
  "Sometimes over-corrects tone",
  "Requires internet connection",
  "Limited offline use",
];
function ProsConsSection() {
  return (
    <section className="relative z-10 px-4 max-w-4xl mx-auto py-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-7 text-center">Pros & Cons</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="bg-white/80 rounded-2xl shadow-lg p-6 border border-green-100">
          <div className="flex items-center mb-3 gap-2">
            <ThumbsUp className="w-5 h-5 text-green-500" />
            <span className="font-semibold text-lg text-green-700">Pros</span>
          </div>
          <ul className="list-disc pl-5 text-slate-700 space-y-2">
            {pros.map((pro) => (
              <li key={pro}>{pro}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white/80 rounded-2xl shadow-lg p-6 border border-blue-100">
          <div className="flex items-center mb-3 gap-2">
            <ThumbsDown className="w-5 h-5 text-blue-500" />
            <span className="font-semibold text-lg text-blue-700">Cons</span>
          </div>
          <ul className="list-disc pl-5 text-slate-700 space-y-2">
            {cons.map((con) => (
              <li key={con}>{con}</li>
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
    <section className="relative z-10 px-4 max-w-3xl mx-auto py-10 md:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-8">Pricing</h2>
      <div className="flex flex-col md:flex-row gap-7 items-center md:justify-center">
        <div className="flex-1 bg-white/90 border border-green-200 backdrop-blur-xl rounded-2xl shadow-lg p-8 flex flex-col gap-3 items-center hover:shadow-green-100/30 hover:scale-105 transition">
          <div className="font-semibold text-lg text-green-700">Free Plan</div>
          <div className="text-4xl font-extrabold text-slate-900 mb-2">Free</div>
          <ul className="text-slate-700 text-sm flex flex-col gap-1 list-disc pl-4">
            <li>Basic grammar & spelling checks</li>
            <li>Browser & app integrations</li>
            <li>Limited tone and clarity suggestions</li>
          </ul>
        </div>
        <div className="flex-1 bg-white/90 border border-blue-200 backdrop-blur-xl rounded-2xl shadow-lg p-8 flex flex-col gap-3 items-center hover:shadow-blue-100/30 hover:scale-105 transition">
          <div className="font-semibold text-lg text-blue-700">Premium Plan</div>
          <div className="text-4xl font-extrabold text-slate-900 mb-2">$12–$30<span className="text-base font-normal text-slate-700">/mo*</span></div>
          <ul className="text-slate-700 text-sm flex flex-col gap-1 list-disc pl-4">
            <li>Advanced grammar, spelling, and style</li>
            <li>Full tone, clarity, & engagement features</li>
            <li>Plagiarism & citation support</li>
          </ul>
          <div className="text-xs mt-2 text-slate-500">*Pricing varies by plan and region</div>
        </div>
      </div>
    </section>
  );
}

// -- 7. PROMPT EXAMPLES SECTION --
const promptExamples = [
  "Correct grammar in this paragraph",
  "Improve clarity of this essay",
  "Rewrite this email professionally",
  "Fix spelling mistakes in this text",
  "Make this sentence more formal",
  "Check tone of this message",
];

function PromptExamplesSection() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const handleCopy = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };
  return (
    <section className="relative z-10 px-4 max-w-4xl mx-auto py-10 md:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-7">
        Prompt Examples
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {promptExamples.map((prompt, idx) => (
          <div
            key={prompt}
            className="bg-white/80 border border-green-100 rounded-xl shadow p-4 flex flex-col gap-4 backdrop-blur-xl group transition hover:shadow-green-100/20"
          >
            <span className="text-slate-700 text-[1.08rem] mb-2">{prompt}</span>
            <button
              type="button"
              onClick={() => handleCopy(prompt, idx)}
              className={`flex items-center justify-center gap-1 text-sm px-3 py-1.5 rounded bg-gradient-to-tr from-green-500 to-blue-400 text-white font-medium shadow hover:scale-110 transition focus:outline-none ${
                copiedIdx === idx ? "bg-gradient-to-tr from-green-400 to-blue-300" : ""
              }`}
            >
              <Copy className="w-4 h-4 mr-1" />
              {copiedIdx === idx ? "Copied!" : "Copy"}
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
    icon: <Brain className="w-8 h-8 text-green-500" />,
    desc: "Conversational AI for writing, research, and brainstorming.",
    link: "/tools/chatgpt",
  },
  {
    name: "Claude",
    icon: <Sparkles className="w-8 h-8 text-indigo-500" />,
    desc: "AI assistant for writing and creative projects.",
    link: "/tools/claude",
  },
  {
    name: "Cursor AI",
    icon: <Code className="w-8 h-8 text-blue-600" />,
    desc: "Code writing and explanation assistant.",
    link: "/tools/cursor",
  },
  {
    name: "Notion AI",
    icon: <BookOpen className="w-8 h-8 text-fuchsia-600" />,
    desc: "Write, organize, and brainstorm with AI inside Notion.",
    link: "/tools/notion",
  },
];
function RelatedToolsSection() {
  return (
    <section className="relative z-10 px-4 max-w-4xl mx-auto py-10 md:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-8">Related Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {relatedTools.map((tool) => (
          <div
            key={tool.name}
            className="bg-white/85 border border-blue-100 rounded-2xl shadow p-6 flex flex-col gap-3 items-start hover:shadow-green-100/30 hover:scale-105 backdrop-blur-xl transition"
          >
            <div>{tool.icon}</div>
            <div className="font-bold text-base text-slate-900">{tool.name}</div>
            <div className="text-slate-700 text-sm mb-2">{tool.desc}</div>
            <Link
              href={tool.link}
              className="rounded bg-gradient-to-tr from-green-500 to-blue-400 text-white px-4 py-1.5 text-xs font-semibold mt-auto transition hover:brightness-110"
            >
              Explore
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

// -- 9. FAQ SECTION --
const faqs = [
  {
    question: "Is Grammarly AI free?",
    answer:
      "Grammarly offers a free version with core grammar and spelling checks. Premium features require a subscription.",
  },
  {
    question: "Can Grammarly improve essays?",
    answer:
      "Absolutely! Grammarly helps students enhance structure, clarity, and correctness in essays and assignments.",
  },
  {
    question: "Is Grammarly good for students?",
    answer:
      "Yes! Students use Grammarly to catch grammar errors, improve clarity, and polish academic writing.",
  },
  {
    question: "Does Grammarly check plagiarism?",
    answer:
      "The Premium version offers plagiarism detection against academic databases and online content.",
  },
  {
    question: "Is Grammarly better than ChatGPT for writing?",
    answer:
      "Grammarly specializes in grammar, clarity, and tone. ChatGPT is broader for idea generation and Q&A. Many writers use both tools together!",
  },
];
function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const toggle = (idx: number) => setOpenIdx((open) => (open === idx ? null : idx));
  return (
    <section className="relative z-10 px-4 max-w-3xl mx-auto py-10 md:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-7 text-center">
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col divide-y divide-green-100 rounded-xl bg-white/90 border border-green-100 shadow backdrop-blur-xl">
        {faqs.map((faq, idx) => (
          <div key={faq.question}>
            <button
              className="w-full flex justify-between items-center px-5 py-5 text-left focus:outline-none group transition hover:bg-green-50 rounded-t-xl"
              onClick={() => toggle(idx)}
              aria-expanded={openIdx === idx}
              aria-controls={`faq-content-${idx}`}
            >
              <span className="font-semibold text-slate-800 text-[1.06rem]">{faq.question}</span>
              {openIdx === idx ? (
                <ChevronUp className="w-5 h-5 text-green-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-green-500" />
              )}
            </button>
            <div
              id={`faq-content-${idx}`}
              className={`overflow-hidden px-5 transition-all text-slate-700 bg-white ${
                openIdx === idx
                  ? "max-h-40 py-3 opacity-100"
                  : "max-h-0 py-0 opacity-0"
              }`}
              style={{ transitionDuration: "300ms" }}
              aria-hidden={openIdx !== idx}
            >
              {faq.answer}
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
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function validate(email: string) {
    return /^\S+@\S+\.\S+$/.test(email);
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate(email)) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
    }
  }
  return (
    <section className="relative z-10 px-4 max-w-lg mx-auto py-12" id="newsletter">
      <div className="bg-white/80 border border-green-100 shadow-lg rounded-2xl backdrop-blur-xl p-8 mx-auto flex flex-col items-center gap-4">
        <Sparkles className="w-7 h-7 text-green-500" />
        <h3 className="font-bold text-xl text-slate-900 mb-1">
          Get Writing Tips & AI News
        </h3>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col sm:flex-row items-center gap-3"
          autoComplete="off"
        >
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 bg-white border border-slate-200 rounded px-3 py-2 text-slate-800 text-sm outline-green-400 shadow"
            value={email}
            onChange={e => {
              setStatus("idle"); setEmail(e.target.value)
            }}
            required
          />
          <button
            type="submit"
            className="px-4 py-2 rounded bg-gradient-to-tr from-green-500 to-blue-400 text-white font-semibold shadow-sm hover:scale-105 transition text-sm"
            disabled={status === "success"}
          >
            {status === "success" ? "Subscribed!" : "Subscribe"}
          </button>
        </form>
        <div className="min-h-[1.5rem] w-full text-center">
          {status === "success" && (
            <span className="text-green-600 text-xs">
              Subscribed! 🎉 Stay tuned for premium writing tips.
            </span>
          )}
          {status === "error" && (
            <span className="text-red-500 text-xs">
              Please enter a valid email.
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Occasionally, we'll send writing strategies, guides, and AI tool updates.
        </p>
      </div>
    </section>
  );
}

// -- 11. FOOTER --
function Footer() {
  return (
    <footer className="relative z-10 px-6 py-8 bg-white/80 backdrop-blur-xl border-t border-slate-100 text-slate-600 text-sm mt-16">
      <div className="flex flex-col md:flex-row items-center md:justify-between max-w-5xl mx-auto gap-3">
        <div className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
          AI Study Hub
        </div>
        <nav className="flex gap-5 mt-2 md:mt-0 items-center">
          <a href="/" className="hover:text-green-500 transition">Home</a>
          <a href="/#tools" className="hover:text-green-500 transition">Tools</a>
          <a href="/#features" className="hover:text-green-500 transition">Features</a>
          <a href="#newsletter" className="hover:text-green-500 transition">Newsletter</a>
        </nav>
        <span className="mt-3 md:mt-0">
          © {new Date().getFullYear()} AI Study Hub.
        </span>
      </div>
    </footer>
  );
}

// -- PAGE WRAPPER MAIN --
export default function GrammarlyPage() {
  return (
    <main className="min-h-screen font-sans bg-gradient-to-br from-white via-green-50 to-blue-50 selection:bg-green-100 overflow-x-hidden">
      {/* Subtle BG shapes for global page */}
      <div className="pointer-events-none fixed inset-0 -z-30">
        <div className="absolute top-36 left-1/2 -translate-x-1/2 w-[80rem] h-[64rem] bg-gradient-to-br from-white via-green-100 to-blue-100 blur-3xl rounded-full opacity-40 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-64 h-24 bg-gradient-to-tr from-blue-200/50 to-white/60 blur-2xl rounded-full opacity-30" />
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