"use client";

import { useState } from "react";
import {
  Sparkles,
  Brain,
  FileText,
  BookOpen,
  Zap,
  PenLine,
  Users,
  Lightbulb,
  MessageCircle,
  GraduationCap,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  Copy,
  ChevronDown,
  ChevronUp,
  Book,
  Code,
} from "lucide-react";
import Link from "next/link";

// 1. HERO SECTION
function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 md:py-24 overflow-hidden bg-gradient-to-br from-[#1a002d] via-[#130026] to-[#0f001b]">
      {/* Glowing/blurred background shapes */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center -z-10">
        <div className="w-[70vw] h-[60vw] max-w-4xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-2/3 rounded-full bg-purple-800/30 blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-44 h-32 bg-gradient-to-tr from-purple-800/40 via-fuchsia-500/20 to-fuchsia-700/10 blur-2xl rounded-3xl opacity-40"></div>
        <div className="absolute left-20 top-10 w-24 h-14 bg-gradient-to-tr from-[#d1aaf7]/40 via-fuchsia-500/30 to-purple-700/10 blur-2xl rounded-xl opacity-30"></div>
      </div>
      <div className="w-full max-w-2xl mx-auto glass-gradient border border-purple-700/40 rounded-3xl shadow-2xl backdrop-blur-lg px-8 py-14 flex flex-col items-center text-center relative z-10">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8 text-purple-300 drop-shadow-glow-fuchsia animate-bounce-slow" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-tr from-fuchsia-400 via-purple-200 to-white bg-clip-text text-transparent mb-4 drop-shadow-lg">
          Midjourney AI
        </h1>
        <p className="text-lg md:text-2xl text-purple-100 max-w-xl mx-auto font-medium mb-8">
          AI-powered image generation tool for artists, designers, and creators.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="https://www.midjourney.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-tr from-[#a259f7] to-[#7846ff] hover:from-fuchsia-500 hover:to-indigo-700 text-white font-semibold shadow-xl hover:scale-105 transition-all border border-purple-400/40"
          >
            Visit Midjourney <ExternalLink className="w-5 h-5" />
          </a>
          <Link
            href="/blog/midjourney-tutorials"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-fuchsia-400 bg-purple-900/70 text-fuchsia-200 hover:bg-fuchsia-950 hover:text-white font-semibold shadow hover:scale-105 transition-all"
          >
            Read Creative Guide <BookOpen className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// 2. OVERVIEW SECTION
const overviewUsers = [
  {
    icon: <PenLine className="w-8 h-8 text-fuchsia-400" />,
    title: "Designers",
    desc: "Create moodboards, graphic assets, and unlock new visual ideas for UI, branding, and more.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-purple-300" />,
    title: "Artists",
    desc: "Bring their visions to life, generate concept art, and experiment with new creative styles.",
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-indigo-400" />,
    title: "Students",
    desc: "Enhance projects, visual reports, and explore creative thinking for assignments and presentations.",
  },
  {
    icon: <Users className="w-8 h-8 text-violet-300" />,
    title: "Content Creators",
    desc: "Produce scroll-stopping visuals, social content, and story assets for any platform.",
  },
];
function OverviewSection() {
  return (
    <section className="relative px-4 py-16 lg:py-20 max-w-6xl mx-auto z-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-5 bg-clip-text bg-gradient-to-tr from-fuchsia-300 via-fuchsia-100 to-white text-transparent">
        What is Midjourney AI?
      </h2>
      <p className="text-center text-lg text-purple-200 max-w-2xl mx-auto mb-10 font-normal">
        Midjourney AI is an advanced image generation tool designed to spark creativity for designers, artists, students, and content creators. Instantly turn your ideas and prompts into visually stunning, unique artwork—perfect for design inspiration, storytelling, and creative exploration.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7 mt-10">
        {overviewUsers.map((user) => (
          <div
            key={user.title}
            className="bg-gradient-to-br from-[#302046]/70 via-[#140047]/60 to-[#43116a]/70 border border-fuchsia-700/40 shadow-xl rounded-2xl p-6 flex flex-col items-center gap-3 backdrop-blur-lg glass-card hover:shadow-fuchsia-500/30 hover:scale-105 transition-all"
          >
            <div>{user.icon}</div>
            <div className="font-semibold text-lg text-white">{user.title}</div>
            <p className="text-purple-100 text-sm text-center">{user.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// 3. FEATURES SECTION
const features = [
  {
    icon: <Sparkles className="w-7 h-7 text-fuchsia-400" />,
    title: "AI Image Generation",
    desc: "Produce detailed, high-resolution images from text prompts with powerful AI.",
  },
  {
    icon: <FileText className="w-7 h-7 text-purple-300" />,
    title: "Text-to-Image Creation",
    desc: "Transform your words and ideas into captivating and unique visuals instantly.",
  },
  {
    icon: <Lightbulb className="w-7 h-7 text-yellow-300" />,
    title: "High-Quality Artistic Styles",
    desc: "Generate stunning visuals—photorealistic, abstract, anime, and more creative styles.",
  },
  {
    icon: <Brain className="w-7 h-7 text-indigo-400" />,
    title: "Concept Visualization",
    desc: "Bring abstract concepts and wild ideas into reality with next-level visualizations.",
  },
  {
    icon: <MessageCircle className="w-7 h-7 text-pink-400" />,
    title: "Creative Prompt Understanding",
    desc: "AI interprets creative and complex prompts for tailored, expressive images.",
  },
  {
    icon: <Zap className="w-7 h-7 text-fuchsia-500" />,
    title: "Design Inspiration Generator",
    desc: "Get inspired with fresh visual directions, rapid design variations, and moodboards.",
  },
];
function FeaturesSection() {
  return (
    <section className="relative px-4 py-16 max-w-6xl mx-auto z-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8 bg-clip-text bg-gradient-to-tr from-fuchsia-200 via-purple-100 to-white text-transparent">
        Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-gradient-to-br from-[#231132]/60 via-[#2a0036]/70 to-[#480e7d]/60 border border-fuchsia-800/30 shadow-xl rounded-2xl p-6 flex flex-col gap-3 items-start hover:shadow-fuchsia-400/20 hover:-translate-y-2 transition-all backdrop-blur-md glass-card"
          >
            <div>{feature.icon}</div>
            <div className="font-semibold text-lg text-white">{feature.title}</div>
            <p className="text-purple-200 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// 4. USE CASES SECTION
const useCases = [
  {
    title: "Poster design ideas",
    desc: "Generate striking, original poster concepts for campaigns, classes, or events.",
    icon: <BookOpen className="w-7 h-7 text-fuchsia-300" />,
  },
  {
    title: "Logo inspiration",
    desc: "Unlock visual approaches for unique logo design, branding, and concepts.",
    icon: <PenLine className="w-7 h-7 text-indigo-300" />,
  },
  {
    title: "Concept art creation",
    desc: "Visualize game worlds, characters, or creative universes in seconds.",
    icon: <Brain className="w-7 h-7 text-purple-400" />,
  },
  {
    title: "Story visualization",
    desc: "Turn story prompts and ideas into immersive scene illustrations.",
    icon: <MessageCircle className="w-7 h-7 text-fuchsia-500" />,
  },
  {
    title: "Social media graphics",
    desc: "Auto-generate eye-catching visuals for captivating posts and campaigns.",
    icon: <Sparkles className="w-7 h-7 text-yellow-300" />,
  },
  {
    title: "Architecture / design ideas",
    desc: "Explore futuristic or eco-friendly designs for buildings and interiors.",
    icon: <Lightbulb className="w-7 h-7 text-green-300" />,
  },
];
function UseCasesSection() {
  return (
    <section className="relative px-4 py-16 max-w-6xl mx-auto z-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8 bg-clip-text bg-gradient-to-tr from-fuchsia-200 via-indigo-100 to-white text-transparent">
        Creative Use Cases
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-7">
        {useCases.map((use) => (
          <div
            key={use.title}
            className="bg-gradient-to-br from-[#39195f]/70 via-[#17002e]/70 to-[#590d74]/70 border border-fuchsia-700/40 shadow-xl rounded-2xl p-6 flex flex-col gap-2 items-start hover:shadow-fuchsia-400/20 hover:scale-105 transition-all backdrop-blur-md glass-card"
          >
            <div>{use.icon}</div>
            <div className="font-semibold text-lg text-white">{use.title}</div>
            <p className="text-purple-200 text-sm">{use.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// 5. PROS & CONS SECTION
const pros = [
  "Extremely high-quality images",
  "Great for creativity and inspiration",
  "Wide style variety",
  "Perfect for design ideation",
];
const cons = [
  "Requires good prompt writing",
  "Paid subscription needed",
  "No free unlimited usage",
  "Learning curve for beginners",
];
function ProsConsSection() {
  return (
    <section className="relative px-4 py-16 max-w-5xl mx-auto z-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8 bg-clip-text bg-gradient-to-tr from-purple-200 via-fuchsia-100 to-white text-transparent">
        Pros & Cons
      </h2>
      <div className="flex flex-col md:flex-row gap-8 mt-6">
        <div className="flex-1 bg-gradient-to-br from-[#1e1937]/70 to-[#390063]/80 border border-purple-700/40 shadow-xl rounded-2xl p-7 backdrop-blur-md glass-card">
          <div className="flex items-center gap-2 mb-4">
            <ThumbsUp className="w-6 h-6 text-green-400" />
            <span className="font-semibold text-lg text-white">Pros</span>
          </div>
          <ul className="list-inside list-disc text-purple-200">
            {pros.map((pro) => (
              <li key={pro} className="mb-2">{pro}</li>
            ))}
          </ul>
        </div>
        <div className="flex-1 bg-gradient-to-br from-[#2e103f]/70 to-[#2d083c]/80 border border-fuchsia-700/40 shadow-xl rounded-2xl p-7 backdrop-blur-md glass-card">
          <div className="flex items-center gap-2 mb-4">
            <ThumbsDown className="w-6 h-6 text-pink-400" />
            <span className="font-semibold text-lg text-white">Cons</span>
          </div>
          <ul className="list-inside list-disc text-purple-200">
            {cons.map((con) => (
              <li key={con} className="mb-2">{con}</li>
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
    <section className="relative px-4 py-16 max-w-4xl mx-auto z-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8 bg-clip-text bg-gradient-to-tr from-fuchsia-200 via-purple-100 to-white text-transparent">
        Pricing
      </h2>
      <div className="flex flex-col md:flex-row gap-8 justify-center mt-5">
        <div className="flex-1 bg-gradient-to-br from-[#1e003b]/70 to-[#35125e]/80 border border-purple-700/30 shadow-lg rounded-2xl p-8 text-center backdrop-blur-md glass-card hover:shadow-fuchsia-300/30 hover:-translate-y-1 transition-all">
          <div className="text-lg font-bold text-fuchsia-100 mb-1">Basic Plan</div>
          <div className="text-3xl font-extrabold text-white mb-2">Free <span className="text-base font-normal text-purple-200">(limited)</span></div>
          <ul className="text-purple-200 text-sm mb-6 flex flex-col gap-1">
            <li>Access to standard model</li>
            <li>Limited images / month</li>
            <li>Community support</li>
          </ul>
          <span className="inline-block px-5 py-2 rounded-lg bg-gradient-to-tr from-purple-700 to-fuchsia-700 text-white font-semibold text-sm shadow">Get Started</span>
        </div>
        <div className="flex-1 bg-gradient-to-br from-[#43005d]/70 to-[#5c17a8]/80 border border-fuchsia-700/50 shadow-lg rounded-2xl p-8 text-center backdrop-blur-md glass-card hover:shadow-fuchsia-500/40 hover:-translate-y-1 transition-all">
          <div className="text-lg font-bold text-fuchsia-100 mb-1">Pro Plan</div>
          <div className="text-3xl font-extrabold text-white mb-2">$10–$30 <span className="text-base font-normal text-purple-200">/mo (placeholder)</span></div>
          <ul className="text-purple-100 text-sm mb-6 flex flex-col gap-1">
            <li>All Basic features</li>
            <li>Priority image creation</li>
            <li>Early access to new models</li>
            <li>Commercial usage rights</li>
          </ul>
          <span className="inline-block px-5 py-2 rounded-lg bg-gradient-to-tr from-fuchsia-700 to-purple-600 text-white font-semibold text-sm shadow">Upgrade</span>
        </div>
      </div>
      <div className="text-xs text-purple-400 font-light mt-5 text-center">No real pricing. Details are placeholder only.</div>
    </section>
  );
}

// 7. PROMPT EXAMPLES SECTION
const promptExamples = [
  "A futuristic city at sunset in cyberpunk style",
  "Minimalist logo design for tech startup",
  "Fantasy forest with glowing lights and rivers",
  "3D product mockup for modern smartphone",
  "Anime style character portrait with neon lighting",
  "Architectural concept of eco-friendly smart home",
];
function PromptExamplesSection() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copyPrompt = async (prompt: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1200);
    } catch {}
  };

  return (
    <section className="relative px-4 py-16 max-w-4xl mx-auto z-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8 bg-clip-text bg-gradient-to-tr from-fuchsia-200 via-purple-100 to-white text-transparent">
        Prompt Examples
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {promptExamples.map((prompt, i) => (
          <div
            key={prompt}
            className="relative flex items-center justify-between bg-gradient-to-br from-[#20002a]/70 via-[#340752]/80 to-[#421167]/70 border border-purple-700/40 shadow-lg rounded-xl px-5 py-5 mb-2 text-white hover:shadow-fuchsia-300/20 hover:scale-[1.03] transition-all backdrop-blur-lg glass-card"
          >
            <span className="text-base md:text-lg font-medium">{prompt}</span>
            <button
              aria-label="Copy prompt"
              onClick={() => copyPrompt(prompt, i)}
              className="ml-4 flex items-center px-2 py-1 rounded-lg hover:bg-fuchsia-800/30 transition"
            >
              <Copy className={`w-5 h-5 ${copiedIdx === i ? "text-green-400" : "text-fuchsia-300"}`} />
              <span className="ml-1 text-xs text-fuchsia-200">
                {copiedIdx === i ? "Copied!" : "Copy"}
              </span>
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
    key: "chatgpt",
    icon: <Brain className="w-7 h-7 text-green-400" />,
    name: "ChatGPT",
    desc: "AI chat assistant for writing, reasoning, and brainstorming.",
    path: "/tools/chatgpt",
  },
  {
    key: "claude",
    icon: <Book className="w-7 h-7 text-violet-400" />,
    name: "Claude",
    desc: "Anthropic's helpful, creative conversational AI assistant.",
    path: "/tools/claude",
  },
  {
    key: "cursor",
    icon: <Code className="w-7 h-7 text-indigo-400" />,
    name: "Cursor AI",
    desc: "AI coding partner for rapid software prototyping and ideas.",
    path: "/tools/cursor",
  },
  {
    key: "grammarly",
    icon: <PenLine className="w-7 h-7 text-pink-400" />,
    name: "Grammarly",
    desc: "AI-powered writing and grammar improvement tool.",
    path: "/tools/grammarly",
  },
];
function RelatedToolsSection() {
  return (
    <section className="relative px-4 py-16 max-w-5xl mx-auto z-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8 bg-clip-text bg-gradient-to-tr from-fuchsia-200 via-purple-100 to-white text-transparent">
        Related AI Tools
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 mt-7">
        {relatedTools.map((tool) => (
          <div
            key={tool.key}
            className="bg-gradient-to-br from-[#160c26]/80 via-[#250042]/80 to-[#44286f]/70 border border-fuchsia-700/40 shadow-md rounded-2xl p-6 flex flex-col gap-3 items-start backdrop-blur-lg glass-card hover:shadow-fuchsia-200/20 hover:scale-105 transition-all"
          >
            <div>{tool.icon}</div>
            <div className="font-semibold text-lg text-white">{tool.name}</div>
            <div className="text-purple-100 text-sm mb-2">{tool.desc}</div>
            <Link
              href={tool.path}
              className="inline-flex items-center gap-1 px-4 py-2 text-fuchsia-200 hover:text-white bg-fuchsia-900/30 border border-fuchsia-900/40 rounded-lg font-medium text-sm hover:bg-fuchsia-800/60 transition"
            >
              Open <ExternalLink className="w-4 h-4 ml-1" />
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
    q: "What is Midjourney AI?",
    a: "Midjourney AI is an artificial intelligence tool that generates high-quality images from text prompts, helping creators, students, and designers translate their imagination into artwork.",
  },
  {
    q: "Is Midjourney free?",
    a: "Midjourney requires a paid subscription for full access. Free trials or limited plans may be available but often come with strict usage limits.",
  },
  {
    q: "Can I use Midjourney for commercial designs?",
    a: "Pro users typically have commercial usage rights. Always review the latest licensing information on their official website to ensure compliance with your project.",
  },
  {
    q: "Do I need coding skills to use Midjourney?",
    a: "No coding skills are required! You generate images simply by entering text prompts within the Midjourney platform.",
  },
  {
    q: "Is Midjourney better than DALL·E?",
    a: "Each has strengths—Midjourney is favored for artistic and creative styles, while DALL·E may be preferred in other scenarios. The best choice depends on your goals and style preferences.",
  },
];
function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="relative px-4 py-16 max-w-3xl mx-auto z-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8 bg-clip-text bg-gradient-to-tr from-fuchsia-200 via-purple-100 to-white text-transparent">
        FAQ
      </h2>
      <div className="flex flex-col gap-4">
        {faqs.map((faq, idx) => (
          <div
            key={faq.q}
            className="rounded-xl bg-gradient-to-br from-[#231033]/90 to-[#350156]/90 border border-fuchsia-700/40 backdrop-blur-lg shadow-md px-6 py-4 mb-1"
          >
            <button
              type="button"
              className="flex w-full justify-between items-center text-base sm:text-lg text-left text-purple-100 font-semibold focus:outline-none"
              onClick={() => setOpenIdx(idx === openIdx ? null : idx)}
              aria-expanded={openIdx === idx}
              aria-controls={`faq-a-${idx}`}
            >
              <span>{faq.q}</span>
              {openIdx === idx ? (
                <ChevronUp className="w-5 h-5 text-fuchsia-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-fuchsia-300" />
              )}
            </button>
            <div
              id={`faq-a-${idx}`}
              className={`transition-all overflow-hidden text-purple-200 text-sm pt-2 ${
                openIdx === idx ? "max-h-56 opacity-100" : "max-h-0 opacity-0"
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

// 10. NEWSLETTER SECTION
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  };

  return (
    <section
      id="newsletter"
      className="relative max-w-xl mx-auto mt-16 mb-10 px-4 z-10"
    >
      <div className="rounded-3xl bg-gradient-to-br from-[#28003e]/70 via-[#4c247d]/40 to-[#0d0017]/80 border border-fuchsia-700/20 px-8 py-10 shadow-xl flex flex-col items-center backdrop-blur-lg glass-card">
        <h3 className="text-xl sm:text-2xl font-bold text-center mb-2 bg-clip-text bg-gradient-to-tr from-fuchsia-300 via-purple-100 to-white text-transparent">
          Join the Creative Newsletter
        </h3>
        <p className="text-purple-200 text-center mb-5 text-base">
          Tips for design prompts and news. Stay up to date with the latest image generation trends!
        </p>
        <form
          className="flex w-full gap-2 mt-3 max-w-lg"
          onSubmit={subscribe}
          autoComplete="off"
        >
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 px-4 py-2 rounded-lg border border-fuchsia-700/50 bg-[#11001a]/70 text-fuchsia-100 placeholder-fuchsia-200 font-medium outline-none focus:ring-2 focus:ring-fuchsia-400 transition"
            value={email}
            onChange={(e) => {
              setStatus("idle");
              setEmail(e.target.value);
            }}
            required
            disabled={status === "success"}
          />
          <button
            type="submit"
            className={`px-5 py-2 rounded-lg font-semibold bg-gradient-to-tr from-fuchsia-700 to-purple-700 hover:from-fuchsia-600 hover:to-purple-600 text-white shadow focus:outline-none transition ${
              status === "success" ? "opacity-80 pointer-events-none" : ""
            }`}
          >
            {status === "success" ? "Subscribed!" : "Subscribe"}
          </button>
        </form>
        {status === "success" && (
          <p className="text-green-400 mt-3 text-xs font-medium">
            You're subscribed! Check your inbox for creative tips 🎉
          </p>
        )}
        {status === "error" && (
          <p className="text-pink-300 mt-3 text-xs font-medium">
            Please enter a valid email address.
          </p>
        )}
      </div>
    </section>
  );
}

// 11. FOOTER
function Footer() {
  return (
    <footer className="relative z-10 px-6 py-8 bg-gradient-to-br from-[#170428]/80 to-[#1d003b]/90 border-t border-fuchsia-800/20 backdrop-blur-xl text-fuchsia-200 text-sm mt-16">
      <div className="flex flex-col md:flex-row items-center md:justify-between max-w-5xl mx-auto gap-3">
        <div className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-purple-500">
          AI Study Hub
        </div>
        <nav className="flex gap-5 mt-2 md:mt-0 items-center">
          <Link href="/" className="hover:text-fuchsia-400 transition">
            Home
          </Link>
          <Link href="/#tools" className="hover:text-fuchsia-400 transition">
            Tools
          </Link>
          <Link href="/#features" className="hover:text-fuchsia-400 transition">
            Features
          </Link>
          <Link href="#newsletter" className="hover:text-fuchsia-400 transition">
            Newsletter
          </Link>
        </nav>
        <span className="mt-3 md:mt-0">
          © {new Date().getFullYear()} AI Study Hub.
        </span>
      </div>
    </footer>
  );
}

// MAIN PAGE WRAPPER
export default function MidjourneyPage() {
  return (
    <main className="min-h-screen font-sans bg-gradient-to-br from-[#140022] via-[#18043d] to-[#351054] selection:bg-fuchsia-900/40 overflow-x-hidden">
      {/* FX background shape layers */}
      <div className="pointer-events-none fixed inset-0 -z-30">
        <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[80rem] h-[60rem] bg-gradient-to-tr from-[#260065] via-[#b024ed30] to-[#17042a90] blur-3xl rounded-full opacity-50 animate-pulse-slow" />
        <div className="absolute right-0 bottom-0 w-80 h-28 bg-gradient-to-tr from-fuchsia-600/40 to-white/40 blur-2xl rounded-full opacity-25" />
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