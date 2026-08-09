"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  FormEvent,
  KeyboardEvent,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import {
  Copy,
  Check,
  RotateCw,
  Trash,
  FileDown,
  FileText,
  Code2,
  Terminal,
  Cpu,
  History,
  Star,
  Share2,
  Sparkles,
} from "lucide-react";
import { askAI } from "@/lib/api/ai";

/* ==========================================================================
   TYPES & INTERFACES
   ========================================================================== */

type ProgrammingLanguage =
  | "C++"
  | "Python"
  | "Java"
  | "JavaScript"
  | "TypeScript"
  | "C#"
  | "Go"
  | "Rust"
  | "PHP"
  | "SQL"
  | "HTML"
  | "CSS"
  | "React"
  | "Next.js"
  | "Node.js";

type Framework =
  | "None"
  | "React"
  | "Next.js"
  | "Express"
  | "Laravel"
  | "Django"
  | "Flask"
  | "Spring"
  | ".NET";

type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "Expert";

type CodeStyle =
  | "Clean & Readable"
  | "Competitive Programming"
  | "Production Ready"
  | "Object Oriented"
  | "Functional"
  | "Minimal";

type Language = "English" | "Urdu";

interface SavedSnippet {
  id: string;
  prompt: string;
  programmingLanguage: ProgrammingLanguage;
  framework: Framework;
  output: string;
  timestamp: string;
}

/* ==========================================================================
   CONSTANTS
   ========================================================================== */

const PROGRAMMING_LANGUAGES: ProgrammingLanguage[] = [
  "C++",
  "Python",
  "Java",
  "JavaScript",
  "TypeScript",
  "C#",
  "Go",
  "Rust",
  "PHP",
  "SQL",
  "HTML",
  "CSS",
  "React",
  "Next.js",
  "Node.js",
];

const FRAMEWORKS: Framework[] = [
  "None",
  "React",
  "Next.js",
  "Express",
  "Laravel",
  "Django",
  "Flask",
  "Spring",
  ".NET",
];

const DIFFICULTIES: Difficulty[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
];

const CODE_STYLES: CodeStyle[] = [
  "Clean & Readable",
  "Competitive Programming",
  "Production Ready",
  "Object Oriented",
  "Functional",
  "Minimal",
];

const LANGUAGES: Language[] = ["English", "Urdu"];

const LOADING_STEPS = [
  "🧠 Analyzing code specifications...",
  "⚙️ Architecting structural logic...",
  "💻 Synthesizing optimized code blocks...",
  "🔍 Formatting complexity & documentation...",
  "✅ Finalizing solution...",
];

/* ==========================================================================
   CODE BLOCK COMPONENT WITH COPY FUNCTIONALITY
   ========================================================================== */

interface CodeBlockProps {
  language?: string;
  value: string;
}

function CodeBlockWrapper({ language, value }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 font-mono text-xs text-slate-400">
        <span className="flex items-center gap-2 text-purple-400 font-semibold uppercase tracking-wider">
          <Terminal className="w-3.5 h-3.5" />
          {language || "code"}
        </span>
        <button
          type="button"
          onClick={handleCopyCode}
          className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-purple-600/20 text-slate-300 hover:text-white transition text-xs border border-slate-700 hover:border-purple-500/50"
          aria-label="Copy code block"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Snippet</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-slate-100 leading-relaxed bg-slate-950/90">
        <code>{value}</code>
      </pre>
    </div>
  );
}

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */

export default function CodingPageContent() {
  // Form States
  const [prompt, setPrompt] = useState<string>("");
  const [programmingLanguage, setProgrammingLanguage] =
    useState<ProgrammingLanguage>("TypeScript");
  const [framework, setFramework] = useState<Framework>("Next.js");
  const [difficulty, setDifficulty] = useState<Difficulty>("Intermediate");
  const [codeStyle, setCodeStyle] = useState<CodeStyle>("Production Ready");
  const [language, setLanguage] = useState<Language>("English");

  // Toggle Switches
  const [includeExplanation, setIncludeExplanation] = useState<boolean>(true);
  const [includeComments, setIncludeComments] = useState<boolean>(true);
  const [includeComplexity, setIncludeComplexity] = useState<boolean>(true);

  // Output & UI States
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [history, setHistory] = useState<SavedSnippet[]>([]);
  const [activeHistoryId, setActiveHistoryId] = useState<string | null>(null);

  const outputRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLTextAreaElement>(null);

  // LocalStorage Hydration
  useEffect(() => {
    const cachedHistory = localStorage.getItem("coding_assistant_history");
    const cachedDraft = localStorage.getItem("coding_assistant_draft");
    if (cachedHistory) {
      try {
        setHistory(JSON.parse(cachedHistory));
      } catch (e) {
        console.error(e);
      }
    }
    if (cachedDraft) {
      try {
        setPrompt(cachedDraft);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Sync draft prompt
  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setPrompt(val);
    setValidationError("");
    localStorage.setItem("coding_assistant_draft", val);
  };

  // Loading animation step timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((s) => (s < LOADING_STEPS.length - 1 ? s + 1 : s));
      }, 2000);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Calculated Metrics
  const stats = useMemo(() => {
    if (!output) return { words: 0, chars: 0, readingTime: 0 };
    const chars = output.length;
    const words = output.trim().split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(words / 200));
    return { words, chars, readingTime };
  }, [output]);

  /* ==========================================================================
     CORE TRANSMISSION HANDLER
     ========================================================================== */

  const handleGenerate = useCallback(async () => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) {
      setValidationError("Please enter a coding problem or requirement.");
      return;
    }

    setLoading(true);
    setError(null);
    setValidationError("");
    setOutput("");

    try {
      const response = await askAI({
        tool: "coding",
        prompt: trimmedPrompt,
        programmingLanguage,
        framework,
        difficulty,
        codeStyle,
        language,
        includeExplanation,
        includeComments,
        includeComplexity,
      });

      if (!response || !response.success || !response.result) {
        throw new Error(
          response && !response.success
            ? response.error
            : "Failed to generate code solution."
        );
      }

      setOutput(response.result);

      // Record History
      const recordId = `code_${Date.now()}`;
      const newSnippet: SavedSnippet = {
        id: recordId,
        prompt: trimmedPrompt,
        programmingLanguage,
        framework,
        output: response.result,
        timestamp: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const updatedHistory = [newSnippet, ...history].slice(0, 20);
      setHistory(updatedHistory);
      setActiveHistoryId(recordId);
      localStorage.setItem(
        "coding_assistant_history",
        JSON.stringify(updatedHistory)
      );

      if (outputRef.current) {
        setTimeout(() => {
          outputRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    } catch (err: any) {
      setError(
        err?.message ||
          "An unexpected error occurred while generating the code."
      );
    } finally {
      setLoading(false);
    }
  }, [
    prompt,
    programmingLanguage,
    framework,
    difficulty,
    codeStyle,
    language,
    includeExplanation,
    includeComments,
    includeComplexity,
    history,
  ]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleGenerate();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleGenerate();
    }
  };

  /* ==========================================================================
     TOOLBAR & EXPORT HANDLERS
     ========================================================================== */

  const handleCopyResponse = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `solution-${programmingLanguage.toLowerCase().replace(/\s+/g, "_")}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadTxt = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `solution-${programmingLanguage.toLowerCase().replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setPrompt("");
    setOutput("");
    setError(null);
    setValidationError("");
    setActiveHistoryId(null);
    localStorage.removeItem("coding_assistant_draft");
    if (promptRef.current) promptRef.current.focus();
  };

  const loadHistoryItem = (item: SavedSnippet) => {
    setPrompt(item.prompt);
    setProgrammingLanguage(item.programmingLanguage);
    setFramework(item.framework);
    setOutput(item.output);
    setActiveHistoryId(item.id);
    setError(null);
  };

  // Custom markdown renderer bindings
  const markdownComponents = useMemo(
    () => ({
      code({ inline, className, children, ...props }: any) {
        const match = /language-(\w+)/.exec(className || "");
        const value = String(children).replace(/\n$/, "");
        if (!inline && (match || value.includes("\n"))) {
          return (
            <CodeBlockWrapper
              language={match ? match[1] : programmingLanguage.toLowerCase()}
              value={value}
            />
          );
        }
        return (
          <code
            className="px-1.5 py-0.5 bg-gray-200 text-purple-900 font-mono text-sm rounded font-semibold"
            {...props}
          >
            {children}
          </code>
        );
      },
      h1: (props: any) => (
        <h1
          {...props}
          className="text-2xl font-bold text-gray-900 mt-6 mb-3 border-b border-gray-200 pb-2"
        />
      ),
      h2: (props: any) => (
        <h2
          {...props}
          className="text-xl font-bold text-purple-900 mt-5 mb-2"
        />
      ),
      h3: (props: any) => (
        <h3 {...props} className="text-lg font-bold text-gray-900 mt-4 mb-2" />
      ),
      p: (props: any) => (
        <p
          {...props}
          className="mb-3 text-gray-900 leading-relaxed text-base"
        />
      ),
      ul: (props: any) => (
        <ul {...props} className="ml-6 list-disc mb-3 text-gray-900" />
      ),
      ol: (props: any) => (
        <ol {...props} className="ml-6 list-decimal mb-3 text-gray-900" />
      ),
      li: (props: any) => (
        <li {...props} className="mb-1 text-base text-gray-900" />
      ),
      blockquote: (props: any) => (
        <blockquote
          {...props}
          className="border-l-4 border-purple-500 pl-4 italic text-purple-900 bg-purple-50 my-3 py-2 rounded-r-md"
        />
      ),
      table: (props: any) => (
        <div className="overflow-x-auto my-4 border border-gray-300 rounded-lg">
          <table
            {...props}
            className="min-w-full text-sm table-auto border-collapse bg-white"
          />
        </div>
      ),
      th: (props: any) => (
        <th
          {...props}
          className="bg-purple-100 text-gray-900 font-bold px-4 py-2 border border-gray-300 text-left"
        />
      ),
      td: (props: any) => (
        <td
          {...props}
          className="bg-white text-gray-900 px-4 py-2 border border-gray-200"
        />
      ),
    }),
    [programmingLanguage]
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white pb-20 font-sans">
      {/* HEADER HERO */}
      <header className="relative border-b border-purple-500/10 bg-gradient-to-b from-purple-950/30 via-slate-950 to-slate-950 px-4 sm:px-6 py-12 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-gradient-to-r from-purple-600/10 via-indigo-600/10 to-fuchsia-600/10 blur-3xl opacity-50 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300">
            <Cpu className="w-3.5 h-3.5" />
            <span>Developer Productivity Engine</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            AI Coding{" "}
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
              Assistant
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 font-light">
            Generate, Debug, Optimize and Explain Code using AI.
          </p>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUT & CONTROL PANEL (8 COLS) */}
        <section className="lg:col-span-8 space-y-6">
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-gray-900"
          >
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-purple-600" />
                <span>Code Parameters</span>
              </h2>
              <span className="text-xs text-gray-500 font-medium">
                Press Ctrl + Enter to Generate
              </span>
            </div>

            {/* DROPDOWN GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Programming Language */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="programmingLanguage"
                  className="block text-xs font-bold text-gray-900 uppercase tracking-wider"
                >
                  Programming Language
                </label>
                <select
                  id="programmingLanguage"
                  value={programmingLanguage}
                  onChange={(e) =>
                    setProgrammingLanguage(e.target.value as ProgrammingLanguage)
                  }
                  className="w-full bg-white text-gray-900 font-medium border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm transition"
                  disabled={loading}
                >
                  {PROGRAMMING_LANGUAGES.map((lang) => (
                    <option key={lang} value={lang} className="bg-white text-gray-900">
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* Framework */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="framework"
                  className="block text-xs font-bold text-gray-900 uppercase tracking-wider"
                >
                  Framework
                </label>
                <select
                  id="framework"
                  value={framework}
                  onChange={(e) => setFramework(e.target.value as Framework)}
                  className="w-full bg-white text-gray-900 font-medium border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm transition"
                  disabled={loading}
                >
                  {FRAMEWORKS.map((fw) => (
                    <option key={fw} value={fw} className="bg-white text-gray-900">
                      {fw}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="difficulty"
                  className="block text-xs font-bold text-gray-900 uppercase tracking-wider"
                >
                  Difficulty Level
                </label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                  className="w-full bg-white text-gray-900 font-medium border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm transition"
                  disabled={loading}
                >
                  {DIFFICULTIES.map((diff) => (
                    <option key={diff} value={diff} className="bg-white text-gray-900">
                      {diff}
                    </option>
                  ))}
                </select>
              </div>

              {/* Code Style */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="codeStyle"
                  className="block text-xs font-bold text-gray-900 uppercase tracking-wider"
                >
                  Code Paradigm / Style
                </label>
                <select
                  id="codeStyle"
                  value={codeStyle}
                  onChange={(e) => setCodeStyle(e.target.value as CodeStyle)}
                  className="w-full bg-white text-gray-900 font-medium border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm transition"
                  disabled={loading}
                >
                  {CODE_STYLES.map((style) => (
                    <option key={style} value={style} className="bg-white text-gray-900">
                      {style}
                    </option>
                  ))}
                </select>
              </div>

              {/* Language */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="language"
                  className="block text-xs font-bold text-gray-900 uppercase tracking-wider"
                >
                  Output Language
                </label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="w-full bg-white text-gray-900 font-medium border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm transition"
                  disabled={loading}
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang} className="bg-white text-gray-900">
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* PROMPT TEXTAREA */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="prompt"
                className="block text-sm font-bold text-gray-900"
              >
                Describe Coding Goal / Problem *
              </label>
              <textarea
                id="prompt"
                ref={promptRef}
                value={prompt}
                onChange={handlePromptChange}
                onKeyDown={handleKeyDown}
                rows={5}
                placeholder="Describe your coding problem, request an algorithm, or paste code to debug..."
                className={`w-full bg-white text-gray-900 placeholder:text-gray-400 border rounded-xl px-4 py-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-sm resize-y ${
                  validationError ? "border-rose-500" : "border-gray-300"
                }`}
                disabled={loading}
              />
              {validationError && (
                <p className="text-xs font-bold text-rose-600 select-none">
                  {validationError}
                </p>
              )}
            </div>

            {/* TOGGLE SWITCHES */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeExplanation}
                  onChange={(e) => setIncludeExplanation(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                  disabled={loading}
                />
                <span className="text-xs font-bold text-gray-900">
                  Include Explanation
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeComments}
                  onChange={(e) => setIncludeComments(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                  disabled={loading}
                />
                <span className="text-xs font-bold text-gray-900">
                  Include Code Comments
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeComplexity}
                  onChange={(e) => setIncludeComplexity(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                  disabled={loading}
                />
                <span className="text-xs font-bold text-gray-900">
                  Time & Space Complexity
                </span>
              </label>
            </div>

            {/* ACTION FOOTER */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-xl transition"
                disabled={loading}
              >
                Clear All
              </button>

              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="px-8 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <span>Synthesizing Solution...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Code Solution</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* OUTPUT TERMINAL & RENDER AREA */}
          <div ref={outputRef} className="scroll-mt-6">
            {error && (
              <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center justify-between shadow-md">
                <div className="flex items-center gap-2 font-medium">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
                <button
                  onClick={handleGenerate}
                  className="px-4 py-1.5 bg-rose-200 hover:bg-rose-300 text-rose-900 rounded-lg text-xs font-bold transition"
                >
                  Retry
                </button>
              </div>
            )}

            {loading && (
              <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 rounded-full border-4 border-t-purple-500 border-r-fuchsia-500 border-b-transparent border-l-transparent animate-spin" />
                <h3 className="text-base font-semibold text-slate-200">
                  Processing Developer Query
                </h3>
                <p className="text-sm font-mono text-purple-400 transition-all">
                  {LOADING_STEPS[loadingStep]}
                </p>
              </div>
            )}

            {!loading && !output && !error && (
              <div className="p-16 text-center rounded-2xl bg-slate-900/30 border border-dashed border-slate-800 flex flex-col items-center justify-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 text-purple-400 text-2xl">
                  <Code2 className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-slate-300">
                  Ready to Code
                </h3>
                <p className="text-xs text-slate-500 max-w-sm">
                  Specify your programming language, framework, and problem instructions to construct solutions.
                </p>
              </div>
            )}

            {!loading && output && (
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xl text-gray-900">
                {/* TOOLBAR */}
                <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleCopyResponse}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-purple-50 text-gray-700 hover:text-purple-700 text-xs font-semibold border border-gray-300 transition flex items-center gap-1.5 shadow-sm"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-600" />
                          <span className="text-green-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Response</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleDownloadMarkdown}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-purple-50 text-gray-700 hover:text-purple-700 text-xs font-semibold border border-gray-300 transition flex items-center gap-1.5 shadow-sm"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                      <span>Download .MD</span>
                    </button>

                    <button
                      onClick={handleDownloadTxt}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-purple-50 text-gray-700 hover:text-purple-700 text-xs font-semibold border border-gray-300 transition flex items-center gap-1.5 shadow-sm"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Download .TXT</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleGenerate}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-purple-50 text-gray-700 hover:text-purple-700 text-xs font-semibold border border-gray-300 transition flex items-center gap-1.5 shadow-sm"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Regenerate</span>
                    </button>

                    <button
                      onClick={handleClear}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-rose-50 text-gray-700 hover:text-rose-700 text-xs font-semibold border border-gray-300 transition flex items-center gap-1.5 shadow-sm"
                    >
                      <Trash className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  </div>
                </div>

                {/* STATS STRIP */}
                <div className="grid grid-cols-3 gap-2 px-6 py-2.5 bg-purple-50/50 border-b border-gray-200 font-mono text-xs text-gray-600">
                  <div>
                    Word Count:{" "}
                    <span className="text-gray-900 font-bold">
                      {stats.words}
                    </span>
                  </div>
                  <div>
                    Characters:{" "}
                    <span className="text-gray-900 font-bold">
                      {stats.chars}
                    </span>
                  </div>
                  <div>
                    Estimated Read Time:{" "}
                    <span className="text-purple-700 font-bold">
                      {stats.readingTime} min
                    </span>
                  </div>
                </div>

                {/* MARKDOWN RENDER CONTENT */}
                <article className="p-6 sm:p-8 text-gray-900 prose prose-purple max-w-none text-base leading-relaxed">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                    components={markdownComponents}
                  >
                    {output}
                  </ReactMarkdown>
                </article>
              </div>
            )}
          </div>
        </section>

        {/* HISTORICAL ARCHIVE SIDEBAR (4 COLS) */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <History className="w-4 h-4 text-purple-400" />
              <span>Recent Code Executions</span>
            </h3>

            {history.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-2">
                No recent code history found in browser local storage.
              </p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {history.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => loadHistoryItem(item)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition flex flex-col gap-1 ${
                      activeHistoryId === item.id
                        ? "bg-purple-600/20 border-purple-500 text-white"
                        : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-semibold text-purple-400">
                        {item.programmingLanguage}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="truncate text-slate-300 font-medium">
                      {item.prompt}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border border-purple-500/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-purple-400 uppercase">
                💡 Pro Tip
              </span>
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
            </div>
            <h4 className="text-sm font-bold text-white">
              Complex Algorithmic Prompts
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              When requesting competitive programming solutions or data structures, enable time and space complexity analysis to understand asymptotic runtime performance.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}