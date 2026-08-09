"use client";

import { useState } from "react";
import Link from "next/link";
import ToolAuthModal from "./ToolAuthModal";
import { Zap, Clock, Sparkles, BookOpen, HelpCircle, BarChart2, History, Trash2, CheckCircle2 } from "lucide-react";

export default function ProductivityPreview() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [goal, setGoal] = useState("Prepare for Data Structures Final Exam");
  const [currentTask, setCurrentTask] = useState("want to build basic structure of game");
  const [availableHours, setAvailableHours] = useState("4");
  const [deadline, setDeadline] = useState("2026-07-30");
  const [energyLevel, setEnergyLevel] = useState("Medium");
  const [stressLevel, setStressLevel] = useState("Medium");
  const [productivityMode, setProductivityMode] = useState("Balanced");
  const [preferredMethod, setPreferredMethod] = useState("Pomodoro");
  const [instructions, setInstructions] = useState(
    "Include custom breaks, block specific times, focus on weak topics..."
  );

  const sampleSavedPlans = [
    { title: "Balanced Plan — want to build a game", date: "Jul 31, 04:27 PM" },
    { title: "Balanced Plan — want to build a game", date: "Jul 31, 04:26 PM" },
    { title: "Balanced Plan — Prepare for Data Structure Exa...", date: "Jul 31, 04:25 PM" },
    { title: "Balanced Plan — Prepare for Data Structure Exa...", date: "Jul 26, 11:37 PM" },
  ];

  return (
    <div className="space-y-12">
      <ToolAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        toolName="Productivity Assistant"
        redirectUrl="/productivity/workplace"
      />

      {/* Header Hero Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-semibold text-xs">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>AI-Powered Academic Workflow</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Productivity Assistant
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Plan smarter, stay focused, organize your time, and achieve your academic goals using AI-powered productivity planning.
        </p>
      </div>

      {/* TOOL DESCRIPTION & PURPOSE */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Tool Description & Scope</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          The <strong>Productivity Assistant</strong> transforms overwhelming course workloads into manageable, time-boxed study routines. By taking into account your daily energy levels, stress status, available hours, and major project deadlines, it formulates tailored study blocks (such as 90-minute ultradian cycles or Pomodoro intervals) designed to maximize cognitive focus and eliminate academic burnout[cite: 11].
        </p>
      </div>

      {/* HOW TO USE GUIDE */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
        <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>How to Use the Productivity Assistant</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center">1</span>
            <h4 className="text-xs sm:text-sm font-bold text-white">Define Goals & Constraints</h4>
            <p className="text-xs text-slate-400">Enter your primary goal, current task, available hours, and target deadline date[cite: 11].</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-mono font-bold text-xs flex items-center justify-center">2</span>
            <h4 className="text-xs sm:text-sm font-bold text-white">Set Energy & Strategy</h4>
            <p className="text-xs text-slate-400">Select your current energy level, stress status, productivity mode, and preferred study method[cite: 11].</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <span className="w-6 h-6 rounded-full bg-fuchsia-500/20 text-fuchsia-400 font-mono font-bold text-xs flex items-center justify-center">3</span>
            <h4 className="text-xs sm:text-sm font-bold text-white">Generate Custom Plan</h4>
            <p className="text-xs text-slate-400">Synthesize an actionable schedule complete with single-task rules and active recall breaks[cite: 11].</p>
          </div>
        </div>
      </div>

      {/* WORKBENCH PREVIEW LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Controls Panel (8 Columns) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-cyan-400" />
                <span>Productivity Parameters</span>
              </h2>
              <span className="text-[11px] font-mono text-slate-500">
                All fields optimized for AI synthesis
              </span>
            </div>

            {/* Primary Goal */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                PRIMARY GOAL / OBJECTIVE *
              </label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Example: Prepare for Data Structures Final Exam"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs sm:text-sm font-medium outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* Current Task */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                CURRENT TASK / CONTEXT
              </label>
              <textarea
                rows={2}
                value={currentTask}
                onChange={(e) => setCurrentTask(e.target.value)}
                placeholder="Describe what you are currently working on or struggling with..."
                className="w-full p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs sm:text-sm placeholder:text-slate-600 outline-none focus:border-cyan-500 transition-colors resize-none"
              />
            </div>

            {/* Parameter Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  AVAILABLE HOURS
                </label>
                <input
                  type="number"
                  value={availableHours}
                  onChange={(e) => setAvailableHours(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs font-medium outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  DEADLINE DATE
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs font-medium outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  ENERGY LEVEL
                </label>
                <select
                  value={energyLevel}
                  onChange={(e) => setEnergyLevel(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs font-medium outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                >
                  <option value="Low">Low Energy</option>
                  <option value="Medium">Medium Energy</option>
                  <option value="High">High Energy</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  STRESS LEVEL
                </label>
                <select
                  value={stressLevel}
                  onChange={(e) => setStressLevel(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs font-medium outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                >
                  <option value="Low">Low Stress</option>
                  <option value="Medium">Medium Stress</option>
                  <option value="High">High Stress</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  PRODUCTIVITY MODE
                </label>
                <select
                  value={productivityMode}
                  onChange={(e) => setProductivityMode(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs font-medium outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                >
                  <option value="Balanced">Balanced</option>
                  <option value="Maximum Focus">Maximum Focus</option>
                  <option value="Quick Planning">Quick Planning</option>
                  <option value="Deep Work">Deep Work</option>
                  <option value="Exam Preparation">Exam Preparation</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  PREFERRED METHOD
                </label>
                <select
                  value={preferredMethod}
                  onChange={(e) => setPreferredMethod(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs font-medium outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                >
                  <option value="Pomodoro">Pomodoro</option>
                  <option value="Active Recall">Active Recall</option>
                  <option value="Spaced Repetition">Spaced Repetition</option>
                  <option value="Practice Questions">Practice Questions</option>
                </select>
              </div>
            </div>

            {/* Additional Instructions */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                ADDITIONAL INSTRUCTIONS
              </label>
              <textarea
                rows={2}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Include custom breaks, block specific times, focus on weak topics..."
                className="w-full p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs sm:text-sm placeholder:text-slate-600 outline-none focus:border-cyan-500 transition-colors resize-none"
              />
            </div>

            {/* Action Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => {
                  setGoal("");
                  setCurrentTask("");
                  setInstructions("");
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
              >
                Clear Fields
              </button>

              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 text-white font-extrabold text-xs shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Productivity Plan</span>
              </button>
            </div>
          </div>

          {/* Sample Schedule Output Preview (Demo Data) */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Sample Strategy Plan Preview
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                PREVIEW DEMO DATA
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/60 text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
              <h4 className="text-sm font-bold text-white">
                Balanced Strategy: {goal || "Academic Target"}
              </h4>
              <p>• <strong>Block 1 (90 Mins):</strong> Focus on fundamental principles, graph traversals, and BFS/DFS logic[cite: 11].</p>
              <p>• <strong>Break (20 Mins):</strong> Full physical movement break away from screen devices[cite: 11].</p>
              <p>• <strong>Block 2 (90 Mins):</strong> Solve past practice problems using Active Recall techniques[cite: 11].</p>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs flex items-center justify-between">
              <span>Sign in to synthesize personalized time-boxed productivity schedules.</span>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="font-bold underline hover:text-white transition-colors cursor-pointer"
              >
                Unlock Assistant →
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar: Saved Plans & Protocols (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 backdrop-blur-2xl shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-3">
              <History className="w-4 h-4 text-purple-400" />
              <span>Saved Productivity Plans</span>
            </div>

            <div className="space-y-2">
              {sampleSavedPlans.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-full text-left p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all group cursor-pointer space-y-1"
                >
                  <p className="text-xs font-semibold text-slate-200 group-hover:text-purple-300 truncate">
                    {item.title}
                  </p>
                  <span className="text-[10px] font-mono text-slate-500 block">
                    {item.date}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Time Boxing Protocol Card matching PDF Page 3 */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900/80 to-slate-950/90 border border-purple-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-purple-400 uppercase flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> TIME BOXING PROTOCOL
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white">
              The 90-Minute Ultra-Focus Cycle
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Human energy naturally operates in ultradian rhythms. Work on your primary task for 90 uninterrupted minutes, then take a full 20-minute physical recovery break[cite: 11].
            </p>
          </div>
        </div>

      </div>

      {/* Bottom CTA */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-purple-950/60 to-fuchsia-950/60 border border-purple-500/30 text-center space-y-4">
        <h3 className="text-2xl font-black text-white">Optimize Your Academic Workload Today</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Sign up for AI Study Hub to access the live Productivity Assistant and start building time-boxed study schedules.
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