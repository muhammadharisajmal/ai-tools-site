"use client";

import { useState } from "react";
import Link from "next/link";
import ToolAuthModal from "./ToolAuthModal";
import { PenTool, CheckCircle2, Sparkles, History, HelpCircle, FileText, BookOpen } from "lucide-react";

export default function WritingPreview() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [writingType, setWritingType] = useState("Essay");
  const [language, setLanguage] = useState("English");
  const [tone, setTone] = useState("Formal");
  const [outputLength, setOutputLength] = useState("Detailed");
  const [prompt, setPrompt] = useState("Pakistan India war 1965");
  const [specialInstructions, setSpecialInstructions] = useState(
    "Focus on key military developments, diplomatic outcomes, and historical context."
  );

  const words = prompt.trim() ? prompt.trim().split(/\s+/).length : 0;
  const characters = prompt.length;

  const sampleRecentPrompts = [
    "Pakistan India war 1965",
    "write somethung funny pubg",
    "Write an essay on hist...",
    "write a gangster song I...",
    "Write something about...",
  ];

  return (
    <div className="space-y-12">
      <ToolAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        toolName="AI Writing Assistant"
        redirectUrl="/writing/workplace"
      />

      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300 font-semibold text-xs">
          <PenTool className="w-3.5 h-3.5" />
          <span>Interactive Tool Preview & Guide</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          AI Writing Assistant
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Craft structured academic essays, research reports, and assignment outlines with custom tone controls and citation support[cite: 9].
        </p>
      </div>

      {/* TOOL DESCRIPTION & OVERVIEW CARD */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-4">
        <div className="flex items-center gap-2 text-fuchsia-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Tool Description & Capabilities</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          The <strong>AI Writing Assistant</strong> is engineered for university and high school students who need to draft, refine, and structure complex written assignments[cite: 9, 11]. Whether you are composing a formal history report, synthesizing literature for a term paper, or polishing paragraph flow, the assistant applies natural language processing to ensure correct academic tone, clear paragraph transitions, and proper citation formatting.
        </p>
      </div>

      {/* HOW TO USE GUIDE (3-STEP WORKFLOW) */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
        <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>How to Use the AI Writing Assistant</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <span className="w-6 h-6 rounded-full bg-fuchsia-500/20 text-fuchsia-400 font-mono font-bold text-xs flex items-center justify-center">1</span>
            <h4 className="text-xs sm:text-sm font-bold text-white">Select Format & Tone</h4>
            <p className="text-xs text-slate-400">Choose your writing type (Essay, Summary, Assignment) and set tone parameters like Formal or Academic[cite: 9].</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-mono font-bold text-xs flex items-center justify-center">2</span>
            <h4 className="text-xs sm:text-sm font-bold text-white">Provide Topic Details</h4>
            <p className="text-xs text-slate-400">Enter your prompt description, word limit preferences, and any special instructions[cite: 9].</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 font-mono font-bold text-xs flex items-center justify-center">3</span>
            <h4 className="text-xs sm:text-sm font-bold text-white">Generate & Export</h4>
            <p className="text-xs text-slate-400">Click Generate to synthesize formatted outputs ready for review, PDF export, or DOCX download.</p>
          </div>
        </div>
      </div>

      {/* MAIN PREVIEW WORKBENCH LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Writing Type:
                </label>
                <select
                  value={writingType}
                  onChange={(e) => setWritingType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs font-medium outline-none focus:border-fuchsia-500 transition-colors cursor-pointer"
                >
                  <option value="Essay">Essay</option>
                  <option value="Assignment">Assignment</option>
                  <option value="Summary">Summary</option>
                  <option value="Blog">Blog</option>
                  <option value="Research Notes">Research Notes</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Tone:
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs font-medium outline-none focus:border-fuchsia-500 transition-colors cursor-pointer"
                >
                  <option value="Formal">Formal</option>
                  <option value="Academic">Academic</option>
                  <option value="Persuasive">Persuasive</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Language:
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs font-medium outline-none focus:border-fuchsia-500 transition-colors cursor-pointer"
                >
                  <option value="English">English</option>
                  <option value="Urdu">Urdu</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Output Length:
                </label>
                <select
                  value={outputLength}
                  onChange={(e) => setOutputLength(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs font-medium outline-none focus:border-fuchsia-500 transition-colors cursor-pointer"
                >
                  <option value="Short">Short</option>
                  <option value="Medium">Medium</option>
                  <option value="Detailed">Detailed</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Prompt / Topic Description *
              </label>
              <textarea
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you'd like to write about..."
                className="w-full p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-white text-xs sm:text-sm placeholder:text-slate-600 outline-none focus:border-fuchsia-500 transition-colors font-sans leading-relaxed"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Special Instructions (Optional)
              </label>
              <input
                type="text"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Focus on academic case studies, skip introductory summary..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs placeholder:text-slate-600 outline-none focus:border-fuchsia-500 transition-colors"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span>Words: <strong className="text-slate-200">{words}</strong></span>
                <span>Characters: <strong className="text-slate-200">{characters}</strong></span>
                <span>Reading Time: <strong className="text-slate-200">1 min</strong></span>
              </div>

              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Solution</span>
              </button>
            </div>
          </div>

          {/* SAMPLE OUTPUT DEMO DATA */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-400 animate-pulse" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Sample Output Preview
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                PREVIEW DEMO DATA
              </span>
            </div>

            <div className="space-y-3 font-sans text-xs sm:text-sm text-slate-300 leading-relaxed p-4 rounded-2xl bg-slate-950/60 border border-slate-800/60">
              <h4 className="text-sm font-bold text-white">
                Historical Analysis: The 1965 Indo-Pakistani Conflict
              </h4>
              <p>
                The 1965 conflict between India and Pakistan remains a pivotal moment in South Asian geopolitical history. Rooted in unresolved territorial disputes following the 1947 partition, the conflict escalated through strategic operations along the Line of Control.
              </p>
              <p>
                <strong>Key Diplomatic Outcomes:</strong> The war concluded with the signing of the Tashkent Declaration in January 1966, brokered by the Soviet Union, establishing a ceasefire and restoring pre-war boundary lines.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300 text-xs flex items-center justify-between">
              <span>Sign in to unlock full live essay generation, citations, and export features.</span>
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
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 backdrop-blur-2xl shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-3">
              <History className="w-4 h-4 text-fuchsia-400" />
              <span>Recent Prompts</span>
            </div>

            <div className="space-y-2">
              {sampleRecentPrompts.map((promptText, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPrompt(promptText);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full text-left p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all group flex items-center justify-between cursor-pointer"
                >
                  <span className="text-xs text-slate-300 group-hover:text-fuchsia-300 truncate">
                    {promptText}
                  </span>
                  <span className="text-slate-500 text-xs">→</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 backdrop-blur-xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Writing Capabilities
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Essay & Report Structuring</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Academic Citation Formats</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Grammar & Tone Optimization</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-purple-950/60 to-fuchsia-950/60 border border-purple-500/30 text-center space-y-4">
        <h3 className="text-2xl font-black text-white">Ready to Generate Your Academic Papers?</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Sign up for AI Study Hub to access the live AI Writing Assistant and start crafting top-tier assignments today.
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/25 hover:scale-105 transition-all"
        >
          <span>Get Started Free</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}