"use client";

import { useState } from "react";
import Link from "next/link";
import ToolAuthModal from "./ToolAuthModal";
import { Calendar, Sparkles, HelpCircle, BookOpen, Layers, CheckCircle2, History, Lightbulb, Brain } from "lucide-react";

export default function StudyPlannerPreview() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [degreeProgram, setDegreeProgram] = useState("FSC pre Medical");
  const [semester, setSemester] = useState("1");
  const [subjects, setSubjects] = useState("Physics, Biology, Chemistry, English, Islamiyat, Quranic Studies, Urdu");
  const [studyGoal, setStudyGoal] = useState(
    "Memorize core concepts of all subjects importantly Biology, Physics and Chemistry also focus on conceptual study."
  );

  const sampleTemplates = ["Computer Science", "Engineering", "Medical", "Business", "Midterms", "Final Exams"];

  return (
    <div className="space-y-12">
      <ToolAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        toolName="AI Smart Study Planner"
        redirectUrl="/study-planner/workplace"
      />

      {/* Header Hero Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-semibold text-xs">
          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
          <span>Active Optimization Model</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          AI Smart Study Planner
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Plan Smarter. Study Better. Achieve More. Deconstruct heavy semesters into precision milestones.
        </p>
      </div>

      {/* TOOL DESCRIPTION & ARCHITECTURE */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-4">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Tool Description & Cognitive Architecture</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          The <strong>AI Smart Study Planner</strong> creates custom exam preparation and semester revision schedules. By combining Active Recall intervals with Spaced Repetition algorithms, it breaks down complex subject lists (like Data Structures, Linear Algebra, or Pathology) into daily time-allocated revision blocks tailored to your target GPA[cite: 8].
        </p>
      </div>

      {/* HOW TO USE GUIDE */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
        <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>How to Use the Smart Study Planner</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-mono font-bold text-xs flex items-center justify-center">1</span>
            <h4 className="text-xs sm:text-sm font-bold text-white">Enter Degree & Subjects</h4>
            <p className="text-xs text-slate-400">Specify your program, semester, subject listing, and daily study hours[cite: 8].</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <span className="w-6 h-6 rounded-full bg-fuchsia-500/20 text-fuchsia-400 font-mono font-bold text-xs flex items-center justify-center">2</span>
            <h4 className="text-xs sm:text-sm font-bold text-white">Set Target Exam Dates</h4>
            <p className="text-xs text-slate-400">Input major exam dates, current GPA, and target horizon GPA goals[cite: 8].</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 font-mono font-bold text-xs flex items-center justify-center">3</span>
            <h4 className="text-xs sm:text-sm font-bold text-white">Invoke Synthesis Map</h4>
            <p className="text-xs text-slate-400">Generate intelligent multi-week roadmaps with spaced review triggers[cite: 8].</p>
          </div>
        </div>
      </div>

      {/* WORKBENCH PREVIEW LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Form & Preview Area (8 Columns) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Quick Operational Templates Badges[cite: 8] */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 space-y-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Quick Operational Templates
            </span>
            <div className="flex flex-wrap gap-2">
              {sampleTemplates.map((tpl, idx) => (
                <button
                  key={idx}
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:bg-purple-600/20 hover:border-purple-500/40 text-slate-300 text-xs font-medium transition cursor-pointer"
                >
                  + {tpl}
                </button>
              ))}
            </div>
          </div>

          {/* Form Specifications Card[cite: 8] */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>Specify Study Specifications</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  DEGREE PROGRAM *
                </label>
                <input
                  type="text"
                  value={degreeProgram}
                  onChange={(e) => setDegreeProgram(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs font-medium outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  CURRENT SEMESTER / PHASE *
                </label>
                <input
                  type="text"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs font-medium outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                COURSE NAMES / SUBJECT LISTING *
              </label>
              <textarea
                rows={2}
                value={subjects}
                onChange={(e) => setSubjects(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs font-sans placeholder:text-slate-600 outline-none focus:border-indigo-500 transition-colors resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                PRIMARY CORE STRATEGIC GOAL (PROMPT) *
              </label>
              <input
                type="text"
                value={studyGoal}
                onChange={(e) => setStudyGoal(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs font-medium outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Action Footer[cite: 8] */}
            <div className="flex justify-end pt-2 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Intelligent Study Plan</span>
              </button>
            </div>
          </div>

          {/* Sample Intelligent Roadmap Preview (Demo Data)[cite: 8] */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Sample Intelligent Study Plan
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                PREVIEW DEMO DATA
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/60 text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
              <h4 className="text-sm font-bold text-white">Strategic Roadmap: {degreeProgram} ({semester})</h4>
              <p>• <strong>Phase 1 (Days 1 - 3):</strong> High-yield active recall review for Biology & Chemistry core concepts[cite: 8].</p>
              <p>• <strong>Phase 2 (Days 4 - 7):</strong> Practice Physics formula derivations and numerical problem sets[cite: 8].</p>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs flex items-center justify-between">
              <span>Sign in to synthesize live AI study roadmaps optimized for your courses.</span>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="font-bold underline hover:text-white transition-colors cursor-pointer"
              >
                Unlock Planner →
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar: Optimization Console & Cognitive Tips (4 Columns)[cite: 8] */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Active Optimization Model Card matching PDF Page 1[cite: 8] */}
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800/90 font-mono space-y-3 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[10px] text-purple-400">scheduler.sys</span>
            </div>
            <div className="space-y-1 text-xs text-slate-300">
              <p className="text-emerald-400">// ACTIVE OPTIMIZATION MODEL</p>
              <p><span className="text-purple-400">const</span> target = <span className="text-amber-300">"Perfect GPA"</span>;</p>
              <p><span className="text-purple-400">const</span> activeRecall = <span className="text-blue-400">true</span>;</p>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-purple-500 to-fuchsia-500 animate-pulse" />
            </div>
            <span className="text-[10px] text-slate-500 block text-right">System Ready for Inputs</span>
          </div>

          {/* Cognitive Study Architect Tips matching PDF Page 4[cite: 8] */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 backdrop-blur-2xl shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-3">
              <Brain className="w-4 h-4 text-purple-400" />
              <span>Cognitive Study Tips</span>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <h5 className="font-bold text-purple-300">Active Recall</h5>
                <p className="text-slate-400 leading-relaxed text-[11px]">Don't just re-read notes. Close the book and write down everything you remember to build stronger neural pathways[cite: 8].</p>
              </div>
              <div>
                <h5 className="font-bold text-purple-300">Spaced Repetition</h5>
                <p className="text-slate-400 leading-relaxed text-[11px]">Review new material 24 hours later, then 3 days later, then a week later to shift knowledge into long-term memory[cite: 8].</p>
              </div>
              <div>
                <h5 className="font-bold text-purple-300">Feynman Technique</h5>
                <p className="text-slate-400 leading-relaxed text-[11px]">Try to explain a complex topic in the simplest terms possible to an imaginary student[cite: 8].</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom CTA */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-purple-950/60 to-fuchsia-950/60 border border-purple-500/30 text-center space-y-4">
        <h3 className="text-2xl font-black text-white">Master Your Semester Milestone by Milestone</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Sign up for AI Study Hub to access the live AI Smart Study Planner and build high-yield revision schedules.
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