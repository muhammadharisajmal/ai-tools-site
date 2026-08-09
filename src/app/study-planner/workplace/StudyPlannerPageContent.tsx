"use strict";

"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { askAI } from "@/lib/api/ai";

/* ==========================================================================
   TYPES & INTERFACES
   ========================================================================== */
interface PlannerFormData {
  semester: string;
  degreeProgram: string;
  numberOfSubjects: string;
  subjects: string;
  studyHoursPerDay: string;
  wakeUpTime: string;
  sleepTime: string;
  examDate: string;
  assignmentDeadline: string;
  currentGpa: string;
  targetGpa: string;
  studyGoal: string;
  specialInstructions: string;
  aiMode: string;
  difficulty: "Easy" | "Medium" | "Hard";
  outputLength: "Short" | "Medium" | "Detailed";
  language: "English" | "Urdu";
}

interface SavedPlan {
  id: string;
  title: string;
  timestamp: string;
  formData: PlannerFormData;
  output: string;
  isFavorite: boolean;
  isPinned: boolean;
  stats: {
    wordCount: number;
    charCount: number;
    readingTime: number;
    estimatedStudyHours: number;
  };
}

/* ==========================================================================
   CONSTANTS & TEMPLATES
   ========================================================================== */
const INITIAL_FORM_STATE: PlannerFormData = {
  semester: "",
  degreeProgram: "",
  numberOfSubjects: "",
  subjects: "",
  studyHoursPerDay: "4",
  wakeUpTime: "07:00",
  sleepTime: "23:00",
  examDate: "",
  assignmentDeadline: "",
  currentGpa: "",
  targetGpa: "",
  studyGoal: "",
  specialInstructions: "",
  aiMode: "Daily Study Plan",
  difficulty: "Medium",
  outputLength: "Detailed",
  language: "English",
};

const QUICK_TEMPLATES: Record<string, Partial<PlannerFormData>> = {
  "Computer Science": {
    semester: "4th Semester",
    degreeProgram: "BS Computer Science",
    numberOfSubjects: "5",
    subjects: "Data Structures, Database Systems, Software Engineering, Assembly Language, Linear Algebra",
    studyHoursPerDay: "5",
    studyGoal: "Master core algorithms, optimize SQL queries, and ace architectural DFD design assessments.",
    aiMode: "Weekly Study Plan",
    difficulty: "Hard",
  },
  Engineering: {
    semester: "6th Semester",
    degreeProgram: "Mechanical Engineering",
    numberOfSubjects: "4",
    subjects: "Fluid Mechanics, Thermodynamics II, Control Systems, Machine Design",
    studyHoursPerDay: "6",
    studyGoal: "Understand core dynamic systems formulas and practice thermal cycle calculations.",
    aiMode: "Exam Preparation",
    difficulty: "Hard",
  },
  Medical: {
    semester: "Year 3",
    degreeProgram: "MBBS / Pre-Med",
    numberOfSubjects: "3",
    subjects: "Pathology, Microbiology, Pharmacology",
    studyHoursPerDay: "6",
    wakeUpTime: "06:00",
    studyGoal: "Memorize drug classifications, mechanisms of action, and systemic pathogen profiles.",
    aiMode: "Daily Study Plan",
    difficulty: "Hard",
  },
  Business: {
    semester: "2nd Semester",
    degreeProgram: "BBA",
    numberOfSubjects: "5",
    subjects: "Financial Accounting, Microeconomics, Principles of Management, Business Communication, Marketing",
    studyHoursPerDay: "3",
    studyGoal: "Analyze case studies, build balance sheets, and master corporate messaging frameworks.",
    aiMode: "Balanced Schedule",
    difficulty: "Medium",
  },
  "Final Exams": {
    studyHoursPerDay: "8",
    aiMode: "Crash Course Plan",
    difficulty: "Hard",
    outputLength: "Detailed",
    studyGoal: "Comprehensive high-intensity syllabus review before the final university evaluations.",
    specialInstructions: "Include rigorous past paper practice blocks and breakdown of active recall slots.",
  },
  Midterms: {
    studyHoursPerDay: "5",
    aiMode: "Revision Schedule",
    difficulty: "Medium",
    studyGoal: "Targeted revision of the first half of the syllabus to solidify fundamental concepts.",
  },
  "Assignment Week": {
    studyHoursPerDay: "4",
    aiMode: "Assignment Planner",
    difficulty: "Medium",
    studyGoal: "Deconstruct multi-stage project milestones, research gathering, and systematic drafting schedules.",
  },
  "Quick Revision": {
    studyHoursPerDay: "3",
    aiMode: "Productivity Boost",
    difficulty: "Easy",
    outputLength: "Short",
    studyGoal: "Rapid mental spacing and high-yield concept checks before starting new chapters.",
  },
};

const LOADING_STEPS = [
  "🧠 Understanding Subjects & Core Constraints...",
  "📅 Mapping High-Efficiency Time Blocks...",
  "📖 Embedding Active Recall & Revision Windows...",
  "🎯 Optimizing Target Performance Ratios...",
  "✅ Rendering Premium Strategic Study Plan...",
];

const STUDY_TIPS = [
  { title: "Active Recall", desc: "Don't just re-read notes. Close the book and write down everything you remember to build stronger neural pathways." },
  { title: "Spaced Repetition", desc: "Review new material 24 hours later, then 3 days later, then a week later to shift knowledge into long-term memory." },
  { title: "Feynman Technique", desc: "Try to explain a complex topic in the simplest terms possible to an imaginary student. It instantly exposes your knowledge gaps." },
  { title: "Interleaving Effect", desc: "Mix different subjects or problem types within a single study session instead of block-studying one topic. It boosts problem-solving speed." },
];

const MOTIVATIONAL_QUOTES = [
  "“Amor Fati — Love your fate, which is in fact your life.”",
  "“The impediment to action advances action. What stands in the way becomes the way.”",
  "“Efficiency is doing things right; effectiveness is doing the right things.”",
  "“The premium on clear thinking has never been higher.”",
];

/* ==========================================================================
   MAIN SYSTEM COMPONENT
   ========================================================================== */
export default function StudyPlannerPageContent() {
  // State Engine
  const [formData, setFormData] = useState<PlannerFormData>(INITIAL_FORM_STATE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [output, setOutput] = useState<string>("");
  
  // Persistence Lists
  const [history, setHistory] = useState<SavedPlan[]>([]);
  const [currentPlanId, setCurrentPlanId] = useState<string | null>(null);
  
  // UI Interaction States
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const outputPanelRef = useRef<HTMLDivElement>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize Data Layer from LocalStorage safely on Mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("study_planner_history");
    const savedDraft = localStorage.getItem("study_planner_form_draft");
    if (savedHistory) {
      try { setHistory(JSON.parse(savedHistory)); } catch (e) { console.error(e); }
    }
    if (savedDraft) {
      try { setFormData(JSON.parse(savedDraft)); } catch (e) { console.error(e); }
    }
  }, []);

  // Sync state helpers
  const saveHistoryToStorage = (updated: SavedPlan[]) => {
    setHistory(updated);
    localStorage.setItem("study_planner_history", JSON.stringify(updated));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    localStorage.setItem("study_planner_form_draft", JSON.stringify(updated));
  };

  // Quick Action Utilities
  const applyTemplate = (templateName: string) => {
    const base = { ...INITIAL_FORM_STATE };
    const modifiers = QUICK_TEMPLATES[templateName] || {};
    const updated = { ...base, ...modifiers };
    setFormData(updated);
    localStorage.setItem("study_planner_form_draft", JSON.stringify(updated));
  };

  const clearForm = () => {
    setFormData(INITIAL_FORM_STATE);
    localStorage.removeItem("study_planner_form_draft");
  };

  const loadRandomExample = () => {
    const keys = Object.keys(QUICK_TEMPLATES);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    applyTemplate(randomKey);
  };

  // Statistics Computations
  const computedStats = useMemo(() => {
    if (!output) return { wordCount: 0, charCount: 0, readingTime: 0, estimatedStudyHours: 0 };
    const charCount = output.length;
    const wordCount = output.trim().split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 225));
    const hours = parseInt(formData.studyHoursPerDay, 10) || 4;
    return { wordCount, charCount, readingTime, estimatedStudyHours: hours };
  }, [output, formData.studyHoursPerDay]);

  // Loading Step Rotation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
      }, 2500);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  /* ==========================================================================
     CORE AI TRANSMISSION METHOD
     ========================================================================== */
  const generateStudyPlan = useCallback(async (overrideData?: PlannerFormData) => {
    const targetData = overrideData || formData;
    
    // Friendly Validation
    if (!targetData.degreeProgram.trim()) {
      setError("Please specify your Degree Program.");
      return;
    }
    if (!targetData.semester.trim()) {
      setError("Please enter your current Semester / Phase.");
      return;
    }
    if (!targetData.subjects.trim()) {
      setError("Please list at least one Subject or Course.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setOutput("");
    
    const constructedPrompt = targetData.studyGoal.trim()
      ? targetData.studyGoal
      : `Create a comprehensive ${targetData.aiMode} for ${targetData.degreeProgram} (${targetData.semester}).`;

    try {
      const response = await askAI({
        tool: "studyplanner",
        prompt: constructedPrompt,
        semester: targetData.semester,
        degree: targetData.degreeProgram,
        subjects: targetData.subjects,
        dailyHours: targetData.studyHoursPerDay,
        wakeUpTime: targetData.wakeUpTime,
        sleepTime: targetData.sleepTime,
        examDate: targetData.examDate,
        assignmentDeadline: targetData.assignmentDeadline,
        currentGPA: targetData.currentGpa,
        targetGPA: targetData.targetGpa,
        goal: targetData.studyGoal,
        difficulty: targetData.difficulty,
        studyMode: targetData.aiMode,
        outputLength: targetData.outputLength,
        language: targetData.language,
        specialInstructions: targetData.specialInstructions,
      });

      if (!response || !response.success || !response.result) {
        throw new Error(response && !response.success ? response.error : "Failed to generate study plan.");
      }

      const compiledMarkdown = response.result;
      setOutput(compiledMarkdown);
      
      const newPlanId = `plan_${Date.now()}`;
      const charCount = compiledMarkdown.length;
      const wordCount = compiledMarkdown.trim().split(/\s+/).filter(Boolean).length;
      
      const newRecord: SavedPlan = {
        id: newPlanId,
        title: `${targetData.aiMode} - ${targetData.degreeProgram || "Study Plan"}`,
        timestamp: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
        formData: targetData,
        output: compiledMarkdown,
        isFavorite: false,
        isPinned: false,
        stats: {
          wordCount,
          charCount,
          readingTime: Math.max(1, Math.ceil(wordCount / 225)),
          estimatedStudyHours: parseInt(targetData.studyHoursPerDay, 10) || 4,
        },
      };
      saveHistoryToStorage([newRecord, ...history]);
      setCurrentPlanId(newPlanId);
    } catch (err: any) {
      console.error("AI Communication Failure:", err);
      setError(err?.message || "An unexpected error occurred while processing this operation.");
    } finally {
      setIsLoading(false);
    }
  }, [formData, history]);

  const loadHistoricalRecord = (plan: SavedPlan) => {
    setFormData(plan.formData);
    setOutput(plan.output);
    setCurrentPlanId(plan.id);
    setError(null);
    if (outputPanelRef.current) {
      outputPanelRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  /* ==========================================================================
     TOOLBAR INTERACTION LAYER
     ========================================================================== */
  const executeCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  const triggerDownload = (filename: string, text: string, type: string) => {
    const blob = new Blob([text], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadTxt = () => {
    if (!output) return;
    triggerDownload(`Study-Plan-${formData.degreeProgram.replace(/\s+/g, "-") || "Plan"}.txt`, output, "text/plain");
  };

  const handleDownloadMarkdownAsDoc = (formatType: "pdf" | "docx") => {
    if (!output) return;
    const headingHeader = `====================================================\nAI SMART STUDY ROADMAP: ${formData.degreeProgram.toUpperCase()}\n====================================================\n\n`;
    triggerDownload(`Study-Plan-${Date.now()}.${formatType === "docx" ? "docx" : "pdf"}`, headingHeader + output, "application/vnd.ms-word");
  };

  const executePrint = () => {
    if (!output) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>AI Smart Study Plan - ${formData.degreeProgram}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; padding: 40px; color: #111; }
            table { border-collapse: collapse; width: 100%; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            th { background-color: #f5f5f5; }
            h1, h2, h3 { color: #4f46e5; }
          </style>
        </head>
        <body>
          <h1>AI Smart Study Plan</h1>
          <p><strong>Program:</strong> ${formData.degreeProgram} | <strong>Mode:</strong> ${formData.aiMode}</p>
          <hr />
          <div>${output.replace(/\n/g, "<br/>")}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const handleShare = () => {
    if (!output) return;
    if (navigator.share) {
      navigator.share({
        title: `AI Study Plan - ${formData.degreeProgram}`,
        text: `Check out this systematic AI Study plan optimized for ${formData.degreeProgram}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert(`Share link to platform interface: ${window.location.href}`);
    }
  };

  const startSpeechEngine = () => {
    if (!output) return;
    window.speechSynthesis.cancel();
    const cleanSpeechText = output.replace(/[#*`_|\-]/g, " ");
    const utterance = new SpeechSynthesisUtterance(cleanSpeechText.slice(0, 4000));
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    speechUtteranceRef.current = utterance;
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeechEngine = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const toggleFavorite = (id: string) => {
    const updated = history.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
    saveHistoryToStorage(updated);
  };

  const togglePin = (id: string) => {
    const updated = history.map((p) => (p.id === id ? { ...p, isPinned: !p.isPinned } : p));
    saveHistoryToStorage(updated);
  };

  const deleteRecord = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = history.filter((p) => p.id !== id);
    saveHistoryToStorage(updated);
    if (currentPlanId === id) {
      setCurrentPlanId(null);
      setOutput("");
    }
  };

  const pinnedPlans = useMemo(() => history.filter((p) => p.isPinned), [history]);
  const favoritePlans = useMemo(() => history.filter((p) => p.isFavorite && !p.isPinned), [history]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-fuchsia-500 selection:text-white font-sans antialiased pb-20">
      
      {/* HERO SECTION */}
      <header className="relative overflow-hidden bg-gradient-to-b from-purple-900/20 via-slate-950 to-slate-950 border-b border-purple-500/10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-purple-600/10 via-fuchsia-600/10 to-blue-600/10 blur-3xl rounded-full opacity-50 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-medium text-purple-300 animate-pulse">
              <span>⚡ Powered by Groq AI Real-Time Processing</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
              AI Smart <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">Study Planner</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 font-light max-w-xl leading-relaxed">
              Plan Smarter. Study Better. Achieve More. Deconstruct heavy semesters into precision milestones.
            </p>
          </div>
          
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl relative group">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/20 rounded-full blur-xl group-hover:bg-purple-500/30 transition-all duration-500" />
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <span className="text-xs font-mono text-purple-400">scheduler.sys</span>
              </div>
              <div className="space-y-3 font-mono text-xs text-slate-400">
                <p className="text-green-400">// ACTIVE OPTIMIZATION MODEL</p>
                <p><span className="text-purple-400">const</span> target = <span className="text-amber-300">"Perfect GPA"</span>;</p>
                <p><span className="text-purple-400">const</span> activeRecall = <span className="text-blue-400">true</span>;</p>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-purple-500 to-fuchsia-500 animate-pulse" />
                </div>
                <p className="text-[10px] text-slate-500 text-right">System Ready for Inputs</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: CONTROLS & GENERATOR FORM (8 COLS) */}
        <section className="lg:col-span-8 space-y-8">
          
          {/* QUICK TEMPLATES GRID */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6">
            <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-4 flex items-center gap-2">
              <span>🚀</span> Quick Operational Templates
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {Object.keys(QUICK_TEMPLATES).map((tpl) => (
                <button
                  key={tpl}
                  onClick={() => applyTemplate(tpl)}
                  className="px-3 py-2 text-xs font-medium text-left rounded-xl bg-slate-800/40 border border-slate-700/60 hover:bg-purple-600/20 hover:border-purple-500/40 hover:text-white transition-all duration-200"
                  aria-label={`Load template ${tpl}`}
                >
                  ✨ {tpl}
                </button>
              ))}
            </div>
          </div>

          {/* MAIN PLANNER COMPILATION FORM */}
          <div className="bg-white border border-gray-300 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-gray-900">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-200 pb-4">
              <span>📊</span> Specify Study Specifications
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-1.5">
                  Degree Program *
                </label>
                <input
                  type="text"
                  name="degreeProgram"
                  value={formData.degreeProgram}
                  onChange={handleInputChange}
                  placeholder="e.g., BS Computer Science"
                  className="w-full bg-white text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-1.5">
                  Current Semester / Phase *
                </label>
                <input
                  type="text"
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                  placeholder="e.g., 4th Semester"
                  className="w-full bg-white text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-1.5">
                  Total Number of Subjects
                </label>
                <input
                  type="number"
                  name="numberOfSubjects"
                  value={formData.numberOfSubjects}
                  onChange={handleInputChange}
                  placeholder="e.g., 5"
                  className="w-full bg-white text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-1.5">
                  Daily Allocation (Hours) *
                </label>
                <input
                  type="number"
                  name="studyHoursPerDay"
                  value={formData.studyHoursPerDay}
                  onChange={handleInputChange}
                  min="1"
                  max="24"
                  className="w-full bg-white text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-1.5">
                  Wake Up Time
                </label>
                <input
                  type="time"
                  name="wakeUpTime"
                  value={formData.wakeUpTime}
                  onChange={handleInputChange}
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-1.5">
                  Sleep Target Time
                </label>
                <input
                  type="time"
                  name="sleepTime"
                  value={formData.sleepTime}
                  onChange={handleInputChange}
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-1.5">
                  Target Exam Date
                </label>
                <input
                  type="date"
                  name="examDate"
                  value={formData.examDate}
                  onChange={handleInputChange}
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-1.5">
                  Major Deadline
                </label>
                <input
                  type="date"
                  name="assignmentDeadline"
                  value={formData.assignmentDeadline}
                  onChange={handleInputChange}
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-1.5">
                  Current Cumulative GPA (Optional)
                </label>
                <input
                  type="text"
                  name="currentGpa"
                  value={formData.currentGpa}
                  onChange={handleInputChange}
                  placeholder="e.g., 3.4"
                  className="w-full bg-white text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-1.5">
                  Target Horizon GPA
                </label>
                <input
                  type="text"
                  name="targetGpa"
                  value={formData.targetGpa}
                  onChange={handleInputChange}
                  placeholder="e.g., 3.8"
                  className="w-full bg-white text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-1.5">
                Course Names / Subject Listing *
              </label>
              <textarea
                name="subjects"
                value={formData.subjects}
                onChange={handleInputChange}
                rows={2}
                placeholder="Comma separated values: Data Structures, Database Systems, Software Engineering..."
                className="w-full bg-white text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition resize-none shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-1.5">
                Primary Core Strategic Goal (Prompt) *
              </label>
              <input
                type="text"
                name="studyGoal"
                value={formData.studyGoal}
                onChange={handleInputChange}
                placeholder="e.g., Deep theoretical understanding for upcoming technical interviews."
                className="w-full bg-white text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-sm"
                required
              />
            </div>

            {/* TUNING CONFIGURATIONS / SETTINGS */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-1">
                  AI Mode Strategy
                </label>
                <select
                  name="aiMode"
                  value={formData.aiMode}
                  onChange={handleInputChange}
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-2.5 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
                >
                  <option value="Daily Study Plan" className="bg-white text-gray-900">Daily Study Plan</option>
                  <option value="Weekly Study Plan" className="bg-white text-gray-900">Weekly Study Plan</option>
                  <option value="Monthly Study Plan" className="bg-white text-gray-900">Monthly Study Plan</option>
                  <option value="Exam Preparation" className="bg-white text-gray-900">Exam Preparation</option>
                  <option value="Revision Schedule" className="bg-white text-gray-900">Revision Schedule</option>
                  <option value="Assignment Planner" className="bg-white text-gray-900">Assignment Planner</option>
                  <option value="Crash Course Plan" className="bg-white text-gray-900">Crash Course Plan</option>
                  <option value="Balanced Schedule" className="bg-white text-gray-900">Balanced Schedule</option>
                  <option value="Productivity Boost" className="bg-white text-gray-900">Productivity Boost</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-1">
                  Rigor / Difficulty
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-2.5 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
                >
                  <option value="Easy" className="bg-white text-gray-900">Easy</option>
                  <option value="Medium" className="bg-white text-gray-900">Medium</option>
                  <option value="Hard" className="bg-white text-gray-900">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-1">
                  Output Resolution
                </label>
                <select
                  name="outputLength"
                  value={formData.outputLength}
                  onChange={handleInputChange}
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-2.5 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
                >
                  <option value="Short" className="bg-white text-gray-900">Short</option>
                  <option value="Medium" className="bg-white text-gray-900">Medium</option>
                  <option value="Detailed" className="bg-white text-gray-900">Detailed</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-1">
                  System Language
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-2.5 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
                >
                  <option value="English" className="bg-white text-gray-900">English</option>
                  <option value="Urdu" className="bg-white text-gray-900">Urdu</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-1.5">
                Special Directives & Context Overrides
              </label>
              <textarea
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleInputChange}
                rows={2}
                placeholder="Include custom schedule blockers, focus specifically on weak chapters, skip certain weekdays..."
                className="w-full bg-white text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition resize-none shadow-sm"
              />
            </div>

            {/* SUBMIT UTILITIES & ACTION FOOTER BUTTONS */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={clearForm}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition border border-gray-300"
                >
                  Clear Fields
                </button>
                <button
                  type="button"
                  onClick={loadRandomExample}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-gray-50 border border-gray-300 hover:bg-gray-100 text-gray-700 transition"
                >
                  🎲 Random Preset
                </button>
              </div>

              <button
                type="button"
                onClick={() => generateStudyPlan()}
                disabled={isLoading}
                className="px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white shadow-lg shadow-purple-500/20 disabled:opacity-50 transition-all duration-300 flex items-center gap-2"
              >
                {isLoading ? "Compiling Roadmap..." : "✨ Generate Intelligent Study Plan"}
              </button>
            </div>
          </div>

          {/* OUTPUT DISPLAY PANEL & TOOLBAR */}
          <div 
            ref={outputPanelRef}
            className={`transition-all duration-300 ${
              isFullscreen ? "fixed inset-0 z-50 bg-slate-950 p-6 overflow-y-auto" : "scroll-mt-6"
            }`}
          >
            {error && (
              <div className="p-5 mb-6 rounded-2xl bg-rose-50 border border-rose-200 text-sm text-rose-800 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-2 font-medium"><span>⚠️</span> {error}</div>
                <button 
                  onClick={() => generateStudyPlan()}
                  className="px-4 py-1.5 bg-rose-200 hover:bg-rose-300 text-rose-900 rounded-lg text-xs font-bold transition"
                >
                  Retry Execution
                </button>
              </div>
            )}

            {isLoading && (
              <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 rounded-full border-4 border-t-purple-500 border-r-fuchsia-500 border-b-transparent border-l-transparent animate-spin" />
                <h3 className="text-base font-medium text-slate-200">Assembling Your Strategic Paradigm</h3>
                <p className="text-sm font-mono text-purple-400 transition-all duration-300">{LOADING_STEPS[loadingStep]}</p>
              </div>
            )}

            {!isLoading && !output && (
              <div className="p-16 text-center rounded-2xl bg-slate-900/20 border border-dashed border-slate-800 flex flex-col items-center justify-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 text-2xl">⏳</div>
                <h3 className="text-base font-semibold text-slate-300">Generate your first AI Study Plan</h3>
                <p className="text-xs text-slate-500 max-w-sm">Complete the specifications parameter array above and click generate to invoke custom synthesis maps.</p>
              </div>
            )}

            {!isLoading && output && (
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xl text-gray-900">
                
                {/* DYNAMIC MANAGEMENT TOOLBAR */}
                <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      onClick={executeCopy}
                      title="Copy Raw Text"
                      className="p-2 rounded-lg bg-white hover:bg-purple-50 text-gray-700 hover:text-purple-700 text-xs flex items-center gap-1 border border-gray-300 transition font-semibold"
                    >
                      {copied ? "✅ Copied!" : "📋 Copy"}
                    </button>
                    <button
                      onClick={handleDownloadTxt}
                      title="Export Plain Text File"
                      className="p-2 rounded-lg bg-white hover:bg-purple-50 text-gray-700 hover:text-purple-700 text-xs border border-gray-300 transition font-semibold"
                    >
                      ⬇️ TXT
                    </button>
                    <button
                      onClick={() => handleDownloadMarkdownAsDoc("pdf")}
                      title="Export Portable Document File"
                      className="p-2 rounded-lg bg-white hover:bg-purple-50 text-gray-700 hover:text-purple-700 text-xs border border-gray-300 transition font-semibold"
                    >
                      📄 PDF
                    </button>
                    <button
                      onClick={() => handleDownloadMarkdownAsDoc("docx")}
                      title="Export Word Processing Layout"
                      className="p-2 rounded-lg bg-white hover:bg-purple-50 text-gray-700 hover:text-purple-700 text-xs border border-gray-300 transition font-semibold"
                    >
                      📝 DOCX
                    </button>
                    <button
                      onClick={handleShare}
                      title="Share Resource Handle"
                      className="p-2 rounded-lg bg-white hover:bg-purple-50 text-gray-700 hover:text-purple-700 text-xs border border-gray-300 transition font-semibold"
                    >
                      🔗 Share
                    </button>
                    <button
                      onClick={executePrint}
                      title="Print Matrix Map"
                      className="p-2 rounded-lg bg-white hover:bg-purple-50 text-gray-700 hover:text-purple-700 text-xs border border-gray-300 transition font-semibold"
                    >
                      🖨️ Print
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isSpeaking ? (
                      <button
                        onClick={stopSpeechEngine}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs flex items-center gap-1 font-bold transition border border-rose-300"
                      >
                        ⏹️ Stop Audio
                      </button>
                    ) : (
                      <button
                        onClick={startSpeechEngine}
                        className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-purple-50 text-gray-700 hover:text-purple-700 text-xs flex items-center gap-1 border border-gray-300 transition font-semibold"
                      >
                        🔊 Read Aloud
                      </button>
                    )}

                    {currentPlanId && (
                      <>
                        <button
                          onClick={() => toggleFavorite(currentPlanId)}
                          className={`p-2 rounded-lg text-xs border border-gray-300 transition ${
                            history.find((p) => p.id === currentPlanId)?.isFavorite 
                              ? "bg-amber-100 text-amber-700 border-amber-300" 
                              : "bg-white text-gray-500 hover:bg-gray-100"
                          }`}
                          title="Favorite"
                        >
                          ⭐
                        </button>
                        <button
                          onClick={() => togglePin(currentPlanId)}
                          className={`p-2 rounded-lg text-xs border border-gray-300 transition ${
                            history.find((p) => p.id === currentPlanId)?.isPinned 
                              ? "bg-indigo-100 text-indigo-700 border-indigo-300" 
                              : "bg-white text-gray-500 hover:bg-gray-100"
                          }`}
                          title="Pin Plan"
                        >
                          📌
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="p-2 rounded-lg bg-white hover:bg-gray-100 text-gray-700 text-xs border border-gray-300 transition"
                      title="Toggle Window Scale"
                    >
                      {isFullscreen ? "🗗" : "🗖"}
                    </button>
                  </div>
                </div>

                {/* STATS STRIP CONTAINER */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-6 py-2.5 bg-purple-50/50 border-b border-gray-200 font-mono text-xs text-gray-600">
                  <div>Word Count: <span className="text-gray-900 font-bold">{computedStats.wordCount}</span></div>
                  <div>Characters: <span className="text-gray-900 font-bold">{computedStats.charCount}</span></div>
                  <div>Read Duration: <span className="text-gray-900 font-bold">{computedStats.readingTime} min</span></div>
                  <div>Study Pace: <span className="text-purple-700 font-bold">{computedStats.estimatedStudyHours}h/day</span></div>
                </div>

                {/* ADVANCED RENDERED MARKDOWN CONTENT AREA */}
                <article className="p-6 sm:p-8 text-gray-900 prose prose-purple max-w-none break-words overflow-x-auto text-base leading-relaxed space-y-4">
                  <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                    {output}
                  </ReactMarkdown>
                </article>
              </div>
            )}
          </div>
        </section>

        {/* RIGHT COLUMN: SIDEBAR CONTENT, HISTORY, NOTES (4 COLS) */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* PERSISTED MANAGEMENT HUB (HISTORY / PINNED / FAVORITES) */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <span>🗄️</span> Strategic Archive Hub
            </h3>

            {/* PINNED REVIEWS */}
            {pinnedPlans.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold uppercase text-indigo-400 tracking-wide">📌 Pinned Roadmaps</h4>
                <div className="space-y-1.5">
                  {pinnedPlans.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => loadHistoricalRecord(plan)}
                      className={`group p-2.5 rounded-xl border text-xs text-left cursor-pointer flex items-center justify-between transition ${
                        currentPlanId === plan.id 
                          ? "bg-purple-600/20 border-purple-500 text-white" 
                          : "bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      <div className="truncate pr-2">
                        <p className="font-medium truncate">{plan.title}</p>
                        <span className="text-[10px] text-slate-500 font-mono">{plan.timestamp}</span>
                      </div>
                      <button 
                        onClick={(e) => deleteRecord(plan.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition"
                      >
                        ❌
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAVORITE TRACKS */}
            {favoritePlans.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold uppercase text-amber-400 tracking-wide">⭐ Starred Records</h4>
                <div className="space-y-1.5">
                  {favoritePlans.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => loadHistoricalRecord(plan)}
                      className={`group p-2.5 rounded-xl border text-xs text-left cursor-pointer flex items-center justify-between transition ${
                        currentPlanId === plan.id 
                          ? "bg-purple-600/20 border-purple-500 text-white" 
                          : "bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      <div className="truncate pr-2">
                        <p className="font-medium truncate">{plan.title}</p>
                        <span className="text-[10px] text-slate-500 font-mono">{plan.timestamp}</span>
                      </div>
                      <button 
                        onClick={(e) => deleteRecord(plan.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition"
                      >
                        ❌
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CHRONOLOGICAL RUN HISTORY */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold uppercase text-slate-500 tracking-wide">📅 Generation History</h4>
              {history.length === 0 ? (
                <p className="text-xs text-slate-600 italic">No items available in local archive history.</p>
              ) : (
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {history.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => loadHistoricalRecord(plan)}
                      className={`group p-2.5 rounded-xl border text-xs text-left cursor-pointer flex items-center justify-between transition ${
                        currentPlanId === plan.id 
                          ? "bg-purple-600/20 border-purple-500 text-white" 
                          : "bg-slate-950/40 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                      }`}
                    >
                      <div className="truncate pr-2">
                        <p className="font-medium truncate">{plan.title}</p>
                        <span className="text-[10px] text-slate-500 font-mono">{plan.timestamp}</span>
                      </div>
                      <button 
                        onClick={(e) => deleteRecord(plan.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition"
                      >
                        ❌
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* POMODORO SUGGESTION ENGINE BOX */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border border-purple-500/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-purple-400 uppercase">🍅 Focus Suggestion Matrix</span>
              <span className="w-2 h-2 rounded-full bg-green-500" />
            </div>
            <h4 className="text-sm font-bold text-white">The 50/10 High-Focus Ratio</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Based on your configuration settings, study for 50 minutes with absolutely zero device alerts, then take a 10 minute physical movement break. Repeat twice then execute a longer 25 minute break structure.
            </p>
          </div>

          {/* STUDY TIPS ACADEMY SIDEBAR PANEL */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <span>💡</span> Cognitive Study Architect Tips
            </h3>
            <div className="space-y-3.5">
              {STUDY_TIPS.map((tip, idx) => (
                <div key={idx} className="space-y-0.5 border-l-2 border-purple-500/30 pl-3">
                  <h4 className="text-xs font-semibold text-slate-200">{tip.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* MOTIVATIONAL STRIP PLACEMENT */}
          <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-2xl text-center italic relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 text-xs text-slate-800 font-mono select-none">“</div>
            <p className="text-xs text-slate-400 relative z-10">
              {MOTIVATIONAL_QUOTES[Math.floor((new Date().getDate()) % MOTIVATIONAL_QUOTES.length)]}
            </p>
          </div>

        </aside>
      </main>
    </div>
  );
}
