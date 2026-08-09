"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  FormEvent,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import {
  Zap,
  RotateCw,
  Trash2,
  Copy,
  Check,
  FileDown,
  FileText,
  Clock,
  History,
  Sparkles,
  Calendar,
  BarChart2,
  BookOpen,
} from "lucide-react";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, HeadingLevel, TextRun } from "docx";
import { askAI } from "@/lib/api/ai";

/* ==========================================================================
   TYPES & INTERFACES
   ========================================================================== */

type Level = "Low" | "Medium" | "High";

type ProductivityMode =
  | "Balanced"
  | "Maximum Focus"
  | "Quick Planning"
  | "Deep Work"
  | "Exam Preparation";

type StudyMethod =
  | "Pomodoro"
  | "Active Recall"
  | "Spaced Repetition"
  | "Practice Questions"
  | "Reading Notes"
  | "Mixed";

interface ProductivityFormData {
  goal: string;
  currentTask: string;
  availableHours: string;
  deadline: string;
  energyLevel: Level;
  stressLevel: Level;
  productivityMode: ProductivityMode;
  preferredStudyMethod: StudyMethod;
  specialInstructions: string;
}

interface HistoryItem {
  id: string;
  title: string;
  timestamp: string;
  formData: ProductivityFormData;
  output: string;
  stats: {
    wordCount: number;
    charCount: number;
    readingTime: number;
  };
}

/* ==========================================================================
   CONSTANTS
   ========================================================================== */

const INITIAL_FORM_STATE: ProductivityFormData = {
  goal: "",
  currentTask: "",
  availableHours: "4",
  deadline: "",
  energyLevel: "Medium",
  stressLevel: "Medium",
  productivityMode: "Balanced",
  preferredStudyMethod: "Pomodoro",
  specialInstructions: "",
};

const LEVELS: Level[] = ["Low", "Medium", "High"];

const PRODUCTIVITY_MODES: ProductivityMode[] = [
  "Balanced",
  "Maximum Focus",
  "Quick Planning",
  "Deep Work",
  "Exam Preparation",
];

const STUDY_METHODS: StudyMethod[] = [
  "Pomodoro",
  "Active Recall",
  "Spaced Repetition",
  "Practice Questions",
  "Reading Notes",
  "Mixed",
];

const LOADING_STEPS = [
  "⚡ Evaluating goal and daily constraints...",
  "⏱️ Allocating optimal focus time blocks...",
  "🎯 Structuring task priorities...",
  "💡 Embedding tailored study methods...",
  "✅ Finalizing your personal productivity strategy...",
];

const HISTORY_STORAGE_KEY = "productivity_assistant_history";
const DRAFT_STORAGE_KEY = "productivity_assistant_draft";

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */

export default function ProductivityPageContent() {
  // Form State
  const [formData, setFormData] = useState<ProductivityFormData>(INITIAL_FORM_STATE);

  // Response & Async States
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string>("");

  // UI Action States
  const [copied, setCopied] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeHistoryId, setActiveHistoryId] = useState<string | null>(null);

  const outputRef = useRef<HTMLDivElement>(null);

  /* ==========================================================================
     LOCAL STORAGE HYDRATION
     ========================================================================== */

  useEffect(() => {
    const cachedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
    const cachedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);

    if (cachedHistory) {
      try {
        setHistory(JSON.parse(cachedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }

    if (cachedDraft) {
      try {
        setFormData(JSON.parse(cachedDraft));
      } catch (e) {
        console.error("Failed to parse draft form data", e);
      }
    }
  }, []);

  const saveHistoryToStorage = (updatedHistory: HistoryItem[]) => {
    setHistory(updatedHistory);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    setValidationError("");
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(updated));
  };

  /* ==========================================================================
     LOADING STEP ROTATION
     ========================================================================== */

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

  /* ==========================================================================
     TEXT COMPUTATION METRICS
     ========================================================================== */

  const metrics = useMemo(() => {
    if (!output) return { wordCount: 0, charCount: 0, readingTime: 0 };
    const charCount = output.length;
    const wordCount = output.trim().split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));
    return { wordCount, charCount, readingTime };
  }, [output]);

  /* ==========================================================================
     CORE AI TRANSMISSION HANDLER
     ========================================================================== */

  const handleGenerate = useCallback(async () => {
    if (!formData.goal.trim()) {
      setValidationError("Please enter your primary Goal or Objective.");
      return;
    }

    setLoading(true);
    setError(null);
    setValidationError("");
    setOutput("");

    // Create prompt summary parameter from goal for the flat payload format
    const promptText = formData.goal.trim();

    try {
      const response = await askAI({
        tool: "productivity",
        prompt: promptText,
        goal: formData.goal,
        currentTask: formData.currentTask,
        availableHours: formData.availableHours,
        deadline: formData.deadline,
        energyLevel: formData.energyLevel,
        stressLevel: formData.stressLevel,
        productivityMode: formData.productivityMode,
        preferredStudyMethod: formData.preferredStudyMethod,
        specialInstructions: formData.specialInstructions,
      });

      if (!response || !response.success || !response.result) {
        throw new Error(
          response && !response.success
            ? response.error
            : "Failed to generate your productivity plan."
        );
      }

      const resultText = response.result;
      setOutput(resultText);

      // Record to history
      const wordCount = resultText.trim().split(/\s+/).filter(Boolean).length;
      const recordId = `prod_${Date.now()}`;
      const newHistoryItem: HistoryItem = {
        id: recordId,
        title: `${formData.productivityMode} Plan — ${formData.goal.slice(0, 30)}${formData.goal.length > 30 ? "..." : ""}`,
        timestamp: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        formData,
        output: resultText,
        stats: {
          wordCount,
          charCount: resultText.length,
          readingTime: Math.max(1, Math.ceil(wordCount / 200)),
        },
      };

      const updatedHistory = [newHistoryItem, ...history].slice(0, 20);
      saveHistoryToStorage(updatedHistory);
      setActiveHistoryId(recordId);

      if (outputRef.current) {
        setTimeout(() => {
          outputRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    } catch (err: any) {
      setError(
        err?.message || "An unexpected error occurred while contacting the AI."
      );
    } finally {
      setLoading(false);
  }
  }, [formData, history]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleGenerate();
  };

  /* ==========================================================================
     TOOLBAR & EXPORT UTILITIES
     ========================================================================== */

  const handleCopyResponse = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = useCallback(() => {
    if (!output) return;
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    const lines = doc.splitTextToSize(output, 180);
    doc.setFont("Helvetica", "Bold");
    doc.setFontSize(16);
    doc.text("AI Productivity Strategy Plan", 15, 20);
    doc.setFont("Helvetica", "Normal");
    doc.setFontSize(11);
    let y = 30;
    lines.forEach((line: string) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, 15, y);
      y += 6;
    });
    doc.save(`Productivity-Plan-${Date.now()}.pdf`);
  }, [output]);

  const handleDownloadDOCX = useCallback(async () => {
    if (!output) return;
    const paragraphs = output.split(/\n\s*\n/).map((para, idx) =>
      new Paragraph({
        children: [new TextRun({ text: para, break: 1 })],
        spacing: { after: 180 },
        heading: idx === 0 ? HeadingLevel.HEADING_1 : undefined,
      })
    );
    const doc = new Document({
      title: "AI Productivity Strategy Plan",
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: "AI Productivity Strategy Plan",
              heading: HeadingLevel.TITLE,
              spacing: { after: 240 },
            }),
            ...paragraphs,
          ],
        },
      ],
    });
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Productivity-Plan-${Date.now()}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [output]);

  const handleClear = () => {
    setFormData(INITIAL_FORM_STATE);
    setOutput("");
    setError(null);
    setValidationError("");
    setActiveHistoryId(null);
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  };

  const loadHistoryItem = (item: HistoryItem) => {
    setFormData(item.formData);
    setOutput(item.output);
    setActiveHistoryId(item.id);
    setError(null);
    if (outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const deleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = history.filter((h) => h.id !== id);
    saveHistoryToStorage(updated);
    if (activeHistoryId === id) {
      setActiveHistoryId(null);
      setOutput("");
    }
  };

  /* ==========================================================================
     MARKDOWN RENDERER COMPONENTS
     ========================================================================== */

  const markdownComponents = useMemo(
    () => ({
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
      code({ inline, children, ...props }: any) {
        return inline ? (
          <code
            className="px-1.5 py-0.5 bg-gray-200 text-purple-900 font-mono text-sm rounded font-semibold"
            {...props}
          >
            {children}
          </code>
        ) : (
          <pre className="p-4 rounded-xl bg-slate-950 text-slate-100 overflow-x-auto my-4 font-mono text-sm border border-slate-800">
            <code {...props}>{children}</code>
          </pre>
        );
      },
    }),
    []
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white pb-20 font-sans">
      {/* HEADER HERO SECTION */}
      <header className="relative border-b border-purple-500/10 bg-gradient-to-b from-purple-950/30 via-slate-950 to-slate-950 px-4 sm:px-6 py-12 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-gradient-to-r from-purple-600/10 via-fuchsia-600/10 to-indigo-600/10 blur-3xl opacity-50 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300">
            <Zap className="w-3.5 h-3.5 fill-purple-300" />
            <span>AI-Powered Academic Workflow</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            🚀 <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">Productivity</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 font-light leading-relaxed">
            Plan smarter, stay focused, organize your time, and achieve your academic goals using AI-powered productivity planning.
          </p>
        </div>
      </header>

      {/* MAIN LAYOUT GRID */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: FORM & OUTPUT (8 COLS) */}
        <section className="lg:col-span-8 space-y-6">
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-gray-900"
          >
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-purple-600" />
                <span>Productivity Parameters</span>
              </h2>
              <span className="text-xs text-gray-500 font-medium">
                All fields optimized for AI synthesis
              </span>
            </div>

            {/* MAIN GOAL INPUT */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="goal" className="block text-xs font-bold text-gray-900 uppercase tracking-wider">
                Primary Goal / Objective *
              </label>
              <input
                type="text"
                id="goal"
                name="goal"
                value={formData.goal}
                onChange={handleInputChange}
                placeholder="Example: Prepare for Data Structures Final Exam"
                className={`w-full bg-white text-gray-900 placeholder:text-gray-400 border rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-sm ${
                  validationError ? "border-rose-500" : "border-gray-300"
                }`}
                disabled={loading}
                required
              />
              {validationError && (
                <p className="text-xs font-bold text-rose-600 mt-0.5">{validationError}</p>
              )}
            </div>

            {/* CURRENT TASK TEXTAREA */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="currentTask" className="block text-xs font-bold text-gray-900 uppercase tracking-wider">
                Current Task / Context
              </label>
              <textarea
                id="currentTask"
                name="currentTask"
                value={formData.currentTask}
                onChange={handleInputChange}
                rows={3}
                placeholder="Describe what you are currently working on or struggling with..."
                className="w-full bg-white text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-sm resize-y"
                disabled={loading}
              />
            </div>

            {/* PARAMETERS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Available Hours */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="availableHours" className="block text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Available Hours
                </label>
                <input
                  type="number"
                  id="availableHours"
                  name="availableHours"
                  value={formData.availableHours}
                  onChange={handleInputChange}
                  min="0.5"
                  max="24"
                  step="0.5"
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-sm"
                  disabled={loading}
                />
              </div>

              {/* Deadline */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="deadline" className="block text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Deadline Date
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-sm"
                  disabled={loading}
                />
              </div>

              {/* Energy Level */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="energyLevel" className="block text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Energy Level
                </label>
                <select
                  id="energyLevel"
                  name="energyLevel"
                  value={formData.energyLevel}
                  onChange={handleInputChange}
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-sm"
                  disabled={loading}
                >
                  {LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl} className="bg-white text-gray-900">
                      {lvl} Energy
                    </option>
                  ))}
                </select>
              </div>

              {/* Stress Level */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="stressLevel" className="block text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Stress Level
                </label>
                <select
                  id="stressLevel"
                  name="stressLevel"
                  value={formData.stressLevel}
                  onChange={handleInputChange}
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-sm"
                  disabled={loading}
                >
                  {LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl} className="bg-white text-gray-900">
                      {lvl} Stress
                    </option>
                  ))}
                </select>
              </div>

              {/* Productivity Mode */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="productivityMode" className="block text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Productivity Mode
                </label>
                <select
                  id="productivityMode"
                  name="productivityMode"
                  value={formData.productivityMode}
                  onChange={handleInputChange}
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-sm"
                  disabled={loading}
                >
                  {PRODUCTIVITY_MODES.map((mode) => (
                    <option key={mode} value={mode} className="bg-white text-gray-900">
                      {mode}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Study Method */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="preferredStudyMethod" className="block text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Preferred Method
                </label>
                <select
                  id="preferredStudyMethod"
                  name="preferredStudyMethod"
                  value={formData.preferredStudyMethod}
                  onChange={handleInputChange}
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-sm"
                  disabled={loading}
                >
                  {STUDY_METHODS.map((method) => (
                    <option key={method} value={method} className="bg-white text-gray-900">
                      {method}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ADDITIONAL INSTRUCTIONS */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="specialInstructions" className="block text-xs font-bold text-gray-900 uppercase tracking-wider">
                Additional Instructions
              </label>
              <textarea
                id="specialInstructions"
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleInputChange}
                rows={2}
                placeholder="Include custom breaks, block specific times, focus on weak topics..."
                className="w-full bg-white text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-sm resize-none"
                disabled={loading}
              />
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-xl transition"
                disabled={loading}
              >
                Clear Fields
              </button>

              <button
                type="submit"
                disabled={loading || !formData.goal.trim()}
                className="px-8 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <span>Constructing Strategy...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Productivity Plan</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* OUTPUT & RESPONSE AREA */}
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
                  Retry Execution
                </button>
              </div>
            )}

            {loading && (
              <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 rounded-full border-4 border-t-purple-500 border-r-fuchsia-500 border-b-transparent border-l-transparent animate-spin" />
                <h3 className="text-base font-semibold text-slate-200">
                  Synthesizing Personalized Schedule
                </h3>
                <p className="text-sm font-mono text-purple-400 transition-all">
                  {LOADING_STEPS[loadingStep]}
                </p>
              </div>
            )}

            {!loading && !output && !error && (
              <div className="p-16 text-center rounded-2xl bg-slate-900/30 border border-dashed border-slate-800 flex flex-col items-center justify-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 text-purple-400 text-2xl">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-slate-300">
                  Your personalized productivity plan will appear here.
                </h3>
                <p className="text-xs text-slate-500 max-w-sm">
                  Specify your primary goal, available hours, and energy status to generate an actionable schedule.
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
                      onClick={handleDownloadPDF}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-purple-50 text-gray-700 hover:text-purple-700 text-xs font-semibold border border-gray-300 transition flex items-center gap-1.5 shadow-sm"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>

                    <button
                      onClick={handleDownloadDOCX}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-purple-50 text-gray-700 hover:text-purple-700 text-xs font-semibold border border-gray-300 transition flex items-center gap-1.5 shadow-sm"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Download DOCX</span>
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
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  </div>
                </div>

                {/* STATS STRIP */}
                <div className="grid grid-cols-3 gap-2 px-6 py-2.5 bg-purple-50/50 border-b border-gray-200 font-mono text-xs text-gray-600">
                  <div>
                    Word Count:{" "}
                    <span className="text-gray-900 font-bold">
                      {metrics.wordCount}
                    </span>
                  </div>
                  <div>
                    Characters:{" "}
                    <span className="text-gray-900 font-bold">
                      {metrics.charCount}
                    </span>
                  </div>
                  <div>
                    Estimated Read Time:{" "}
                    <span className="text-purple-700 font-bold">
                      {metrics.readingTime} min
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

        {/* RIGHT COLUMN: HISTORY & SIDEBAR (4 COLS) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* HISTORY PANEL */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <History className="w-4 h-4 text-purple-400" />
              <span>Saved Productivity Plans</span>
            </h3>

            {history.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-2">
                No saved history available in current local storage.
              </p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => loadHistoryItem(item)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition flex items-center justify-between cursor-pointer ${
                      activeHistoryId === item.id
                        ? "bg-purple-600/20 border-purple-500 text-white"
                        : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                    }`}
                  >
                    <div className="truncate pr-2 space-y-0.5">
                      <p className="font-semibold truncate text-slate-200">
                        {item.title}
                      </p>
                      <span className="text-[10px] font-mono text-slate-500 block">
                        {item.timestamp}
                      </span>
                    </div>
                    <button
                      onClick={(e) => deleteHistoryItem(item.id, e)}
                      className="p-1 hover:text-rose-400 text-slate-500 transition"
                      title="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* POMODORO TIPS & RECOMMENDATION CARD */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border border-purple-500/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-purple-400 uppercase flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Time Boxing Protocol
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <h4 className="text-sm font-bold text-white">
              The 90-Minute Ultra-Focus Cycle
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Human energy naturally operates in ultradian rhythms. Work on your primary task for 90 uninterrupted minutes, then take a full 20-minute physical recovery break.
            </p>
          </div>

          {/* COGNITIVE GUIDELINES CARD */}
          <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-purple-400" /> Executive Focus Rules
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400 leading-relaxed">
              <p>
                <strong className="text-slate-200">Single-Task Priority:</strong> Multitasking decreases cognitive speed by up to 40%. Complete task blocks sequentially.
              </p>
              <p>
                <strong className="text-slate-200">Active Recall Intervals:</strong> Close your study notes after 25-minute sprints and write down 3 key principles from memory.
              </p>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}