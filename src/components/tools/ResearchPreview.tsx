"use client";

import { useState } from "react";
import Link from "next/link";
import ToolAuthModal from "./ToolAuthModal";
import { BookOpen, Sparkles, HelpCircle, Search, Layers, CheckCircle2, History } from "lucide-react";

export default function ResearchPreview() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [prompt, setPrompt] = useState("Artificial Intelligence in Healthcare");
  const [researchMode, setResearchMode] = useState("Research Report");
  const [academicLevel, setAcademicLevel] = useState("University");
  const [researchDepth, setResearchDepth] = useState("Standard");
  const [outputLength, setOutputLength] = useState("Long");
  const [citationStyle, setCitationStyle] = useState("APA");
  const [language, setLanguage] = useState("English");

  const sampleRecentTopics = [
    "Artificial Intelligence in Healthcare",
    "Quantum Computing Applications",
    "Renewable Energy Microgrids",
    "Machine Learning in Financial Fraud",
  ];

  return (
    <div className="space-y-12">
      <ToolAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        toolName="AI Research Assistant"
        redirectUrl="/research/workplace"
      />

      {/* Header Hero Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-semibold text-xs">
          <BookOpen className="w-3.5 h-3.5 text-purple-400" />
          <span>Academic Literature Engine</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          AI Research Assistant
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Research, analyze, summarize, and understand any topic with AI-synthesized scholarly reports.
        </p>
      </div>

      {/* TOOL DESCRIPTION & OVERVIEW */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-4">
        <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Tool Description & Scope</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          The <strong>AI Research Assistant</strong> simplifies literature reviews and academic topic exploration. By configuring parameters like Academic Level (University, PhD), Research Mode, and Citation Style (APA, IEEE), the assistant structures key concepts, historical advancements, current challenges, and relevant research questions into a formal report[cite: 7].
        </p>
      </div>

      {/* HOW TO USE GUIDE */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>How to Use the AI Research Assistant</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 font-mono font-bold text-xs flex items-center justify-center">1</span>
            <h4 className="text-xs sm:text-sm font-bold text-white">Specify Research Topic</h4>
            <p className="text-xs text-slate-400">Enter your research question or subject (e.g., Artificial Intelligence in Healthcare)[cite: 7].</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-mono font-bold text-xs flex items-center justify-center">2</span>
            <h4 className="text-xs sm:text-sm font-bold text-white">Configure Academic Depth</h4>
            <p className="text-xs text-slate-400">Select citation style (APA, IEEE), output length, and target academic level[cite: 7].</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <span className="w-6 h-6 rounded-full bg-fuchsia-500/20 text-fuchsia-400 font-mono font-bold text-xs flex items-center justify-center">3</span>
            <h4 className="text-xs sm:text-sm font-bold text-white">Start Synthesis</h4>
            <p className="text-xs text-slate-400">Synthesize structured literature reviews complete with executive summaries and research questions[cite: 7].</p>
          </div>
        </div>
      </div>

      {/* WORKBENCH PREVIEW LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Controls Panel (8 Columns) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
            
            {/* Topic Input */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Research Topic *
              </label>
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: Artificial Intelligence in Healthcare"
                className="w-full p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-white text-xs sm:text-sm font-sans placeholder:text-slate-600 outline-none focus:border-purple-500 transition-colors leading-relaxed"
              />
            </div>

            {/* Dropdown Options Grid[cite: 7] */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Research Mode
                </label>
                <select
                  value={researchMode}
                  onChange={(e) => setResearchMode(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs font-medium outline-none focus:border-purple-500 transition-colors cursor-pointer"
                >
                  <option value="Research Report">Research Report</option>
                  <option value="Literature Review">Literature Review</option>
                  <option value="Academic Explanation">Academic Explanation</option>
                  <option value="Executive Summary">Executive Summary</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Academic Level
                </label>
                <select
                  value={academicLevel}
                  onChange={(e) => setAcademicLevel(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs font-medium outline-none focus:border-purple-500 transition-colors cursor-pointer"
                >
                  <option value="University">University</option>
                  <option value="High School">High School</option>
                  <option value="College">College</option>
                  <option value="Postgraduate">Postgraduate</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Research Depth
                </label>
                <select
                  value={researchDepth}
                  onChange={(e) => setResearchDepth(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs font-medium outline-none focus:border-purple-500 transition-colors cursor-pointer"
                >
                  <option value="Standard">Standard</option>
                  <option value="Quick">Quick</option>
                  <option value="Deep">Deep</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Output Length
                </label>
                <select
                  value={outputLength}
                  onChange={(e) => setOutputLength(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs font-medium outline-none focus:border-purple-500 transition-colors cursor-pointer"
                >
                  <option value="Long">Long</option>
                  <option value="Short">Short</option>
                  <option value="Medium">Medium</option>
                  <option value="Detailed">Detailed</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Citation Style
                </label>
                <select
                  value={citationStyle}
                  onChange={(e) => setCitationStyle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs font-medium outline-none focus:border-purple-500 transition-colors cursor-pointer"
                >
                  <option value="APA">APA</option>
                  <option value="MLA">MLA</option>
                  <option value="Harvard">Harvard</option>
                  <option value="IEEE">IEEE</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs font-medium outline-none focus:border-purple-500 transition-colors cursor-pointer"
                >
                  <option value="English">English</option>
                  <option value="Urdu">Urdu</option>
                </select>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center pt-2 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full sm:w-auto px-10 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 text-white font-extrabold text-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start Research</span>
              </button>
            </div>
          </div>

          {/* Sample Literature Report Output Preview (Demo Data) */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-purple-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Sample Literature Report Preview
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                PREVIEW DEMO DATA
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/60 text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
              <h4 className="text-sm font-bold text-white">Literature Review: {prompt}</h4>
              <p>• <strong>Executive Summary:</strong> Integration of deep learning diagnostic pipelines in clinical workflows reduces error rates by 18% in medical imaging[cite: 7].</p>
              <p>• <strong>Key Challenges:</strong> Data privacy constraints (HIPAA/GDPR compliance) and algorithmic bias in training datasets remain central hurdles[cite: 7].</p>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs flex items-center justify-between">
              <span>Sign in to start research report synthesis with live citation formatting.</span>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="font-bold underline hover:text-white transition-colors cursor-pointer"
              >
                Unlock Assistant →
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 backdrop-blur-2xl shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-3">
              <History className="w-4 h-4 text-purple-400" />
              <span>Sample Research Topics</span>
            </div>

            <div className="space-y-2">
              {sampleRecentTopics.map((topicText, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPrompt(topicText);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full text-left p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all group flex items-center justify-between cursor-pointer"
                >
                  <span className="text-xs text-slate-300 group-hover:text-purple-300 truncate">
                    {topicText}
                  </span>
                  <span className="text-slate-500 text-xs">→</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 backdrop-blur-xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Research Capabilities
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Scholarly Topic Synthesizer</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>APA, MLA, IEEE Citations[cite: 7]</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Research Question Generator</span>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* Bottom CTA Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-purple-950/60 to-fuchsia-950/60 border border-purple-500/30 text-center space-y-4">
        <h3 className="text-2xl font-black text-white">Elevate Your Academic Research</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Sign up for AI Study Hub to access the live AI Research Assistant and start generating comprehensive research reports today.
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 text-white font-extrabold text-xs shadow-lg shadow-purple-500/25 hover:scale-105 transition-all"
        >
          <span>Get Started Free</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}