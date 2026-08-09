"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  ExternalLink,
  Star,
  Sparkles,
  BookOpenCheck,
  Code,
  Calendar,
  CheckSquare,
  ArrowRight,
  Mail,
} from "lucide-react";

// Synchronized Background: Dark Navy theme with ambient glows and grid overlay
function AnimatedGradientBg() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-950"
      aria-hidden="true"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -top-32 -left-20 w-[30rem] h-[30rem] bg-gradient-to-tr from-fuchsia-600/30 via-violet-600/20 to-indigo-500/20 rounded-full blur-3xl opacity-50 animate-pulse" />
      <div className="absolute top-1/3 -right-20 w-[28rem] h-[28rem] bg-gradient-to-b from-blue-600/20 via-cyan-500/20 to-violet-600/20 rounded-full blur-3xl opacity-40 animate-pulse [animation-delay:2s]" />
      <div className="absolute bottom-10 left-1/3 w-[22rem] h-[22rem] bg-gradient-to-tr from-purple-600/20 via-indigo-500/20 to-pink-500/20 rounded-full blur-3xl opacity-30 animate-pulse [animation-delay:4s]" />
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
          <Link href="/features" className="hover:text-white transition-colors duration-200">
            Features
          </Link>
          <Link href="/tools" className="text-white font-semibold transition-colors">
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

function Stars({ rating }: { rating: number }) {
  const filled = Math.floor(rating);
  const half = rating - filled >= 0.5;
  return (
    <div className="flex items-center gap-[2px]">
      {[...Array(filled)].map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
      ))}
      {half && <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300/50" />}
      {[...Array(5 - filled - (half ? 1 : 0))].map((_, i) => (
        <Star key={i + filled + 1} className="w-3.5 h-3.5 text-slate-700" />
      ))}
    </div>
  );
}

// Native Platform Assistants
const nativeTools = [
  {
    id: "study-planner",
    name: "AI Study Planner",
    category: "Study",
    description: "Plan study schedules, organize subjects, and manage academic goals.",
    href: "/study-planner",
    icon: <Calendar className="w-6 h-6 text-indigo-400" />,
  },
  {
    id: "writing-assistant",
    name: "AI Writing Assistant",
    category: "Writing",
    description: "Help students generate, improve, and organize essays, assignments, and academic writing.",
    href: "/writing",
    icon: <BookOpenCheck className="w-6 h-6 text-fuchsia-400" />,
  },
  {
    id: "coding-assistant",
    name: "AI Coding Assistant",
    category: "Coding",
    description: "Programming help for students, including coding guidance and debugging support.",
    href: "/coding",
    icon: <Code className="w-6 h-6 text-blue-400" />,
  },
  {
    id: "research-assistant",
    name: "AI Research Assistant",
    category: "Research",
    description: "Research support, brainstorming, topic exploration, and academic assistance.",
    href: "/research",
    icon: <Search className="w-6 h-6 text-purple-400" />,
  },
  {
    id: "productivity-hub",
    name: "Student Productivity Hub",
    category: "Productivity",
    description: "Organize tasks, deadlines, notes, and academic workflow.",
    href: "/productivity",
    icon: <CheckSquare className="w-6 h-6 text-cyan-400" />,
  },
];

// External Tools with Dedicated Tool Review Routes
const externalTools = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    category: "Productivity",
    description: "Powerful conversational AI assistant for essay drafting, math derivation & Q&A.",
    url: "https://chat.openai.com",
    reviewUrl: "/tools/chatgpt",
    rating: 4.9,
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "claude",
    name: "Claude",
    category: "Writing",
    description: "Advanced AI assistant for deep reading synthesis, creative writing & research.",
    url: "https://claude.ai",
    reviewUrl: "/tools/claude",
    rating: 4.8,
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "cursor",
    name: "Cursor AI",
    category: "Coding",
    description: "Project-wide AI coding editor built directly into an IDE fork.",
    url: "https://cursor.so",
    reviewUrl: "/tools/cursor",
    rating: 4.9,
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "notion",
    name: "Notion AI",
    category: "Productivity",
    description: "Supercharge your course docs, study notes, and workspace workflows with AI.",
    url: "https://notion.so/product/ai",
    reviewUrl: "/tools/notion",
    rating: 4.6,
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: "grammarly",
    name: "Grammarly",
    category: "Writing",
    description: "Real-time AI grammar checker, tone adjustment, and plagiarism detector.",
    url: "https://grammarly.com",
    reviewUrl: "/tools/grammarly",
    rating: 4.7,
    color: "from-emerald-400 to-cyan-500",
  },
  {
    id: "perplexity",
    name: "Perplexity AI",
    category: "Research",
    description: "Ask anything and receive real-time answers backed by inline scholarly citations.",
    url: "https://www.perplexity.ai",
    reviewUrl: "/tools/perplexity",
    rating: 4.8,
    color: "from-cyan-400 to-blue-500",
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    category: "Coding",
    description: "Real-time inline code autocompletion and pair programming engine.",
    url: "https://github.com/features/copilot",
    reviewUrl: "/tools/github-copilot",
    rating: 4.8,
    color: "from-slate-700 to-slate-900",
  },
  {
    id: "midjourney",
    name: "Midjourney",
    category: "Design",
    description: "Generative AI image creation for presentations, poster visual design, and artwork.",
    url: "https://midjourney.com",
    reviewUrl: "/tools/midjourney",
    rating: 4.9,
    color: "from-violet-500 to-fuchsia-500",
  },
];

const categoryOptions = ["All", "Study", "Writing", "Coding", "Research", "Productivity", "Design"];

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredNative = useMemo(() => {
    return nativeTools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const filteredExternal = useMemo(() => {
    return externalTools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="relative min-h-screen font-sans bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white antialiased">
      <AnimatedGradientBg />
      <Navbar />

      <main className="relative z-10 pb-20">
        {/* Hero Section */}
        <section className="pt-16 pb-10 md:pt-24 md:pb-14 px-6 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-medium text-purple-300 mb-8 backdrop-blur-md shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>Curated Student Intelligence Stack</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6">
            Discover The Best{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-fuchsia-400">
              AI Tools
            </span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg md:text-xl font-normal max-w-2xl mx-auto mb-10 leading-relaxed">
            Curated for students, researchers, programmers, and creators. Explore built-in study assistants and dedicated guides for external AI tools.
          </p>

          <div className="relative max-w-xl mx-auto shadow-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools by name, description, or domain..."
              className="w-full px-5 py-4 pl-12 rounded-2xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-sm sm:text-base outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 backdrop-blur-xl"
            />
            <Search className="w-5 h-5 text-indigo-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </section>

        {/* Category Filter Tabs */}
        <section className="px-6 mb-14 max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2.5 justify-center">
            {categoryOptions.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/25"
                    : "bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 backdrop-blur-md"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Native Platform Assistants */}
        <section className="px-6 max-w-7xl mx-auto mb-20">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>✦</span> Native Platform Assistants
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Built-in interactive tools accessible directly from your AI Study Hub workspace.
              </p>
            </div>
          </div>

          {filteredNative.length === 0 ? (
            <div className="text-center py-10 bg-slate-900/40 rounded-2xl border border-slate-800/60 max-w-md mx-auto">
              <p className="text-slate-400 text-xs font-medium">
                No native assistants match your search filters.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredNative.map((tool) => (
                <div
                  key={tool.id}
                  className="group relative bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center transition-transform group-hover:scale-105 group-hover:border-indigo-500/50">
                        {tool.icon}
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Available
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm font-normal leading-relaxed mb-6">
                      {tool.description}
                    </p>
                  </div>

                  <Link
                    href={tool.href}
                    className="w-full text-center px-4 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white rounded-xl font-semibold text-xs shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 block"
                  >
                    Launch Assistant →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Featured Spotlight Tool */}
        <section className="px-6 max-w-5xl mx-auto mb-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-950/40 via-slate-900/80 to-slate-950/90 backdrop-blur-2xl p-8 sm:p-12 border border-indigo-500/30 shadow-2xl flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex-shrink-0 flex items-center justify-center shadow-2xl shadow-purple-500/30">
              <Sparkles className="w-10 h-10 text-white" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[11px] font-bold mb-3 shadow-md">
                Featured Spotlight <Sparkles className="w-3 h-3 ml-1" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                Midjourney
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                Unlock creative visual potential. Generate high-resolution AI images, concept artwork, and visual figures in seconds for research posters, presentations, and creative projects.
              </p>

              <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs font-semibold text-slate-200">
                  Design
                </span>
                <Stars rating={4.9} />
              </div>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <a
                  href="https://midjourney.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white rounded-xl font-bold text-xs shadow-lg hover:scale-105 transition-all duration-200"
                >
                  Visit External Tool <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <Link
                  href="/tools/midjourney"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 rounded-xl font-semibold border border-slate-700 text-xs transition-colors"
                >
                  Read Review
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trending External AI Tools */}
        <section className="px-6 max-w-7xl mx-auto mb-20">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>⚡</span> Trending External AI Engines
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Top external platforms with dedicated student usage guides and reviews.
              </p>
            </div>
          </div>

          {filteredExternal.length === 0 ? (
            <div className="text-center py-10 bg-slate-900/40 rounded-2xl border border-slate-800/60 max-w-md mx-auto">
              <p className="text-slate-400 text-xs font-medium">
                No external tools match your search query.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredExternal.map((tool) => (
                <div
                  key={tool.id}
                  className="group relative bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl hover:shadow-purple-500/10"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${tool.color} flex items-center justify-center text-white font-black text-lg shadow-md`}
                      >
                        {tool.name[0]}
                      </div>
                      <Stars rating={tool.rating} />
                    </div>

                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                        {tool.name}
                      </h3>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {tool.category}
                      </span>
                    </div>

                    <p className="text-slate-400 text-xs font-normal leading-relaxed mb-6">
                      {tool.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 bg-slate-800/80 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-fuchsia-500 text-slate-200 hover:text-white rounded-lg font-semibold text-xs border border-slate-700/80 hover:border-transparent transition-all duration-200 flex items-center justify-center gap-1"
                    >
                      <span>Visit</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <Link
                      href={tool.reviewUrl}
                      className="flex-1 text-center py-2 bg-slate-900 text-purple-300 hover:text-white rounded-lg font-semibold text-xs border border-purple-500/30 hover:bg-purple-500/20 transition-all duration-200"
                    >
                      Read Review
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Newsletter Section */}
        <section id="newsletter" className="px-6 max-w-3xl mx-auto mb-16">
          <div className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 border border-slate-800/80 text-center shadow-2xl relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4 text-indigo-400">
              <Mail className="w-6 h-6" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
              Stay Ahead of the Curve
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Join thousands of students unlocking AI-powered productivity tips and exclusive tool guides. No spam, ever.
            </p>

            <form
              className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="Your email address"
                className="w-full flex-1 px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/80 text-white text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition placeholder:text-slate-500"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-200 text-xs flex items-center justify-center gap-2"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
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