"use client";

import { useState } from "react";
import Link from "next/link";
import ToolAuthModal from "./ToolAuthModal";
import { Code2, Cpu, Terminal, Sparkles, CheckCircle2, History, Lightbulb, BookOpen, HelpCircle } from "lucide-react";

export default function CodingPreview() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [programmingLanguage, setProgrammingLanguage] = useState("TypeScript");
  const [framework, setFramework] = useState("Next.js");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [codeStyle, setCodeStyle] = useState("Production Ready");
  const [language, setLanguage] = useState("English");

  const [prompt, setPrompt] = useState(
    "accept an integer input and tell its factorial and also telling whether input number is even or odd"
  );
  const [includeExplanation, setIncludeExplanation] = useState(true);
  const [includeComments, setIncludeComments] = useState(true);
  const [includeComplexity, setIncludeComplexity] = useState(true);

  const sampleRecentExecutions = [
    { lang: "C++", text: "that accept an integer input and tell its factorial..." },
    { lang: "TypeScript", text: "for finding factorial of given numebr as input" },
    { lang: "Python", text: "for finding factorial of given numebr as input" },
    { lang: "C++", text: "for finding factorial of given numebr as input" },
  ];

  return (
    <div className="space-y-12">
      <ToolAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        toolName="AI Coding Assistant"
        redirectUrl="/coding/workplace"
      />

      {/* Header Hero Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 font-semibold text-xs">
          <Cpu className="w-3.5 h-3.5 text-blue-400" />
          <span>Developer Productivity Engine</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          AI Coding Assistant
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Generate, Debug, Optimize, and Explain Code using AI across C++, TypeScript, Python, and SQL[cite: 6].
        </p>
      </div>

      {/* DESCRIPTION & OVERVIEW CARD */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-4">
        <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Tool Description & Purpose</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          The <strong>AI Coding Assistant</strong> acts as an intelligent pair programmer for computer science and engineering coursework[cite: 6]. It converts natural language problem descriptions into production-ready code, explains line-by-line execution logic, analyzes asymptotic time and space complexity ($O(n)$ notation), and identifies runtime bugs across various languages and web frameworks[cite: 6].
        </p>
      </div>

      {/* HOW TO USE GUIDE */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>How to Use the AI Coding Assistant</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-mono font-bold text-xs flex items-center justify-center">1</span>
            <h4 className="text-xs sm:text-sm font-bold text-white">Select Tech Stack</h4>
            <p className="text-xs text-slate-400">Choose your target language (C++, TypeScript, Python), framework, and difficulty level[cite: 6].</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-mono font-bold text-xs flex items-center justify-center">2</span>
            <h4 className="text-xs sm:text-sm font-bold text-white">Describe Goal or Bug</h4>
            <p className="text-xs text-slate-400">Type your programming objective or paste code snippets that require debugging[cite: 6].</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <span className="w-6 h-6 rounded-full bg-fuchsia-500/20 text-fuchsia-400 font-mono font-bold text-xs flex items-center justify-center">3</span>
            <h4 className="text-xs sm:text-sm font-bold text-white">Review & Analyze</h4>
            <p className="text-xs text-slate-400">Synthesize clean code with inline comments, line explanations, and asymptotic complexity checks[cite: 6].</p>
          </div>
        </div>
      </div>

      {/* WORKBENCH PREVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-400" />
                <span>Code Parameters</span>
              </h2>
              <span className="text-[11px] font-mono text-slate-500">
                Press Ctrl + Enter to Generate
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  PROGRAMMING LANGUAGE
                </label>
                <select
                  value={programmingLanguage}
                  onChange={(e) => setProgrammingLanguage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs font-medium outline-none focus:border-blue-500 transition-colors cursor-pointer"
                >
                  <option value="TypeScript">TypeScript</option>
                  <option value="C++">C++</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="SQL">SQL</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  FRAMEWORK
                </label>
                <select
                  value={framework}
                  onChange={(e) => setFramework(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs font-medium outline-none focus:border-blue-500 transition-colors cursor-pointer"
                >
                  <option value="Next.js">Next.js</option>
                  <option value="React">React</option>
                  <option value="Express">Express</option>
                  <option value="None">None</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  DIFFICULTY LEVEL
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs font-medium outline-none focus:border-blue-500 transition-colors cursor-pointer"
                >
                  <option value="Intermediate">Intermediate</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  CODE PARADIGM / STYLE
                </label>
                <select
                  value={codeStyle}
                  onChange={(e) => setCodeStyle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs font-medium outline-none focus:border-blue-500 transition-colors cursor-pointer"
                >
                  <option value="Production Ready">Production Ready</option>
                  <option value="Clean & Readable">Clean & Readable</option>
                  <option value="Competitive Programming">Competitive Programming</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  OUTPUT LANGUAGE
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs font-medium outline-none focus:border-blue-500 transition-colors cursor-pointer"
                >
                  <option value="English">English</option>
                  <option value="Urdu">Urdu</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Describe Coding Goal / Problem *
              </label>
              <textarea
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your coding problem, request an algorithm, or paste code to debug..."
                className="w-full p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-white text-xs sm:text-sm font-mono placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors leading-relaxed"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <label className="flex items-center gap-2.5 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={includeExplanation}
                  onChange={(e) => setIncludeExplanation(e.target.checked)}
                  className="rounded border-slate-700 text-blue-500 focus:ring-blue-500"
                />
                <span>Include Explanation</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={includeComments}
                  onChange={(e) => setIncludeComments(e.target.checked)}
                  className="rounded border-slate-700 text-blue-500 focus:ring-blue-500"
                />
                <span>Include Code Comments</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={includeComplexity}
                  onChange={(e) => setIncludeComplexity(e.target.checked)}
                  className="rounded border-slate-700 text-blue-500 focus:ring-blue-500"
                />
                <span>Time & Space Complexity</span>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => setPrompt("")}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
              >
                Clear All
              </button>

              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-fuchsia-600 text-white font-extrabold text-xs shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Code Solution</span>
              </button>
            </div>
          </div>

          {/* SAMPLE CODE DEMO */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Code Execution Output Preview
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                PREVIEW DEMO DATA
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 font-mono text-xs text-slate-200">
              <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex justify-between text-slate-400">
                <span>factorial_check.ts</span>
                <span className="text-blue-400">TypeScript</span>
              </div>
              <pre className="p-4 overflow-x-auto leading-relaxed text-slate-300">
{`function analyzeInteger(num: number): { factorial: number; isEven: boolean } {
  // Compute factorial for non-negative integers
  let factorial = 1;
  for (let i = 1; i <= num; i++) {
    factorial *= i;
  }
  
  const isEven = num % 2 === 0;
  return { factorial, isEven };
}`}
              </pre>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs flex items-center justify-between">
              <span>Sign in to execute live code synthesis, complexity analysis, and debugging.</span>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="font-bold underline hover:text-white transition-colors cursor-pointer"
              >
                Unlock Tool →
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 backdrop-blur-2xl shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-3">
              <History className="w-4 h-4 text-blue-400" />
              <span>Recent Code Executions</span>
            </div>

            <div className="space-y-2">
              {sampleRecentExecutions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPrompt(item.text);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full text-left p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all group cursor-pointer space-y-1"
                >
                  <span className="text-[10px] font-mono text-blue-400 block font-semibold">
                    {item.lang}
                  </span>
                  <p className="text-xs text-slate-300 group-hover:text-blue-300 truncate">
                    {item.text}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900/80 to-slate-950/90 border border-blue-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-blue-400 uppercase flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" /> PRO TIP
              </span>
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white">
              Complex Algorithmic Prompts
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              When requesting competitive programming solutions or data structures, enable time and space complexity analysis to understand asymptotic runtime performance[cite: 6].
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-purple-950/60 to-blue-950/60 border border-blue-500/30 text-center space-y-4">
        <h3 className="text-2xl font-black text-white">Accelerate Your Programming Coursework</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Sign up for AI Study Hub to access the live AI Coding Assistant for error debugging, code generation, and algorithm explanation.
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-fuchsia-600 text-white font-extrabold text-xs shadow-lg shadow-blue-500/25 hover:scale-105 transition-all"
        >
          <span>Get Started Free</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}