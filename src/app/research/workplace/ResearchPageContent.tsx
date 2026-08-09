"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  Fragment,
} from "react";
import {
  FaCopy,
  FaFilePdf,
  FaFileWord,
  FaShareAlt,
  FaHeart,
  FaRegHeart,
  FaThumbtack,
  FaRedo,
  FaTrash,
  FaPrint,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
  FaHistory,
  FaStar,
  FaRegStar,
  FaExclamationTriangle,
  FaBook,
  FaInfoCircle,
  FaRegTimesCircle,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import { askAI } from "@/lib/api/ai";

type HtmlDocxModule = {
  asBlob: (html: string) => Promise<Blob>;
};

let htmlDocx: HtmlDocxModule | undefined;
if (typeof window !== "undefined") {
  import("html-docx-js/dist/html-docx").then(
    (mod) => (htmlDocx = mod.default as HtmlDocxModule)
  );
}

type ResearchMode =
  | "Literature Review"
  | "Research Report"
  | "Academic Explanation"
  | "Research Questions"
  | "Study Notes"
  | "Comparison"
  | "Article"
  | "Executive Summary";

const RESEARCH_MODES: ResearchMode[] = [
  "Literature Review",
  "Research Report",
  "Academic Explanation",
  "Research Questions",
  "Study Notes",
  "Comparison",
  "Article",
  "Executive Summary",
];

type AcademicLevel =
  | "High School"
  | "College"
  | "University"
  | "Postgraduate"
  | "PhD";

const ACADEMIC_LEVELS: AcademicLevel[] = [
  "High School",
  "College",
  "University",
  "Postgraduate",
  "PhD",
];

type ResearchDepth = "Quick" | "Standard" | "Deep";
const RESEARCH_DEPTHS: ResearchDepth[] = ["Quick", "Standard", "Deep"];

type OutputLength = "Short" | "Medium" | "Long" | "Detailed";
const OUTPUT_LENGTHS: OutputLength[] = [
  "Short",
  "Medium",
  "Long",
  "Detailed",
];

type CitationStyle = "APA" | "MLA" | "Harvard" | "Chicago" | "IEEE";
const CITATION_STYLES: CitationStyle[] = [
  "APA",
  "MLA",
  "Harvard",
  "Chicago",
  "IEEE",
];

type Language = "English" | "Urdu" | "French" | "German" | "Spanish";
const LANGUAGES: Language[] = [
  "English",
  "Urdu",
  "French",
  "German",
  "Spanish",
];

const EXAMPLE_PLACEHOLDER =
  "Example: Artificial Intelligence in Healthcare";

const RESEARCH_SECTIONS: Array<{
  key: string;
  label: string;
}> = [
  { key: "executiveSummary", label: "Executive Summary" },
  { key: "introduction", label: "Introduction" },
  { key: "keyConcepts", label: "Key Concepts" },
  { key: "currentResearch", label: "Current Research" },
  { key: "advantages", label: "Advantages" },
  { key: "challenges", label: "Challenges" },
  { key: "applications", label: "Applications" },
  { key: "futureTrends", label: "Future Trends" },
  { key: "researchQuestions", label: "Research Questions" },
  { key: "conclusion", label: "Conclusion" },
  { key: "references", label: "References" },
];

const HISTORY_KEY = "researchHistory";
const FAVORITES_KEY = "favoriteResearch";
const PINNED_KEY = "pinnedResearch";
const HISTORY_LIMIT = 20;

interface ResearchParams {
  prompt: string;
  researchMode: ResearchMode;
  academicLevel: AcademicLevel;
  researchDepth: ResearchDepth;
  outputLength: OutputLength;
  citationStyle: CitationStyle;
  language: Language;
}

interface ResearchHistoryItem extends ResearchParams {
  date: number;
  id: string;
  result?: ResearchOutput;
}

interface ResearchOutput {
  originalText: string;
  sections: Partial<Record<string, string>>;
  relatedTopics?: string[];
  suggestedQuestions?: string[];
  stats?: {
    wordCount: number;
    charCount: number;
    estimatedReadingTime: number;
    paragraphCount: number;
    generatedTime: string;
  };
}

function uniqId() {
  return (
    Date.now().toString(36) +
    Math.random().toString(36).slice(2, 10)
  );
}

function getHistory(): ResearchHistoryItem[] {
  try {
    const h = localStorage.getItem(HISTORY_KEY);
    return h ? JSON.parse(h) : [];
  } catch {
    return [];
  }
}

function setHistory(history: ResearchHistoryItem[]) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {}
}

function getFavorites(): ResearchHistoryItem[] {
  try {
    const h = localStorage.getItem(FAVORITES_KEY);
    return h ? JSON.parse(h) : [];
  } catch {
    return [];
  }
}

function setFavorites(favs: ResearchHistoryItem[]) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  } catch {}
}

function getPinned(): ResearchHistoryItem[] {
  try {
    const h = localStorage.getItem(PINNED_KEY);
    return h ? JSON.parse(h) : [];
  } catch {
    return [];
  }
}

function setPinned(pinned: ResearchHistoryItem[]) {
  try {
    localStorage.setItem(PINNED_KEY, JSON.stringify(pinned));
  } catch {}
}

function renderMarkdown(md: string) {
  let html = md || "";
  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");
  html = html.replace(/^\> (.*$)/gim, "<blockquote>$1</blockquote>");
  html = html.replace(/\*\*(.*?)\*\*/gim, "<b>$1</b>");
  html = html.replace(/\*(.*?)\*/gim, "<i>$1</i>");
  html = html.replace(/`([^`]+)`/gim, "<code>$1</code>");
  html = html.replace(/\n-{3,}\n/gim, "<hr/>");
  html = html.replace(
    /(?:^\s*[-*]\s.+\n?)+/gim,
    (item) =>
      `<ul>${item
        .trim()
        .split("\n")
        .map((i) => `<li>${i.replace(/^[-*]\s/, "")}</li>`)
        .join("")}</ul>`
  );
  html = html.replace(
    /(?:^\s*\d+\.\s.+\n?)+/gim,
    (item) =>
      `<ol>${item
        .trim()
        .split("\n")
        .map((i) => `<li>${i.replace(/^\d+\.\s/, "")}</li>`)
        .join("")}</ol>`
  );
  html = html.replace(/\n{2,}/gim, "<br /><br />");
  return html;
}

function formatDate(ts: number) {
  const d = new Date(ts);
  return d.toLocaleString();
}

function estimateReadingTime(words: number): number {
  return Math.ceil(words / 200);
}

function getStats(text: string) {
  const wordCount = (text.match(/\b\w+\b/g) || []).length;
  const charCount = text.replace(/\s/g, "").length;
  const paragraphCount = (text.match(/\n\n/g) || []).length + 1;
  return {
    wordCount,
    charCount,
    paragraphCount,
    estimatedReadingTime: estimateReadingTime(wordCount),
    generatedTime: new Date().toLocaleTimeString(),
  };
}

function splitIntoSections(md: string): ResearchOutput {
  const lines = md.split("\n");
  const sections: Record<string, string> = {};
  let currentSection = "executiveSummary";
  let buf: string[] = [];
  lines.forEach((line) => {
    const matched = line.match(/^#+\s+(.*)$/);
    if (matched) {
      if (buf.length)
        sections[currentSection] = buf.join("\n").trim();
      const heading = matched[1].trim().toLowerCase().replace(/\s+/g, "");
      const sectionKey = RESEARCH_SECTIONS.find(
        (s) =>
          heading.replace(/[^a-z]/gi, "") ===
          s.label.toLowerCase().replace(/[^a-z]/gi, "")
      )?.key;
      currentSection = sectionKey || heading || "section";
      buf = [];
    } else {
      buf.push(line);
    }
  });
  if (buf.length) sections[currentSection] = buf.join("\n").trim();
  return {
    originalText: md,
    sections,
  };
}

function generateRelatedTopics(md: string): string[] {
  const lines = md.match(/(?:[A-Z][a-z]+\s?){2,}/g) || [];
  const keywords =
    md
      .replace(/(?:\n|\r)/g, " ")
      .match(/\b([A-Z][a-z]{3,}(?: [A-Z][a-z]{2,})*)\b/g) || [];
  return Array.from(new Set([...lines, ...keywords])).slice(0, 7);
}

function generateSuggestedQuestions(topic: string): string[] {
  const t = topic.replace(/\?+$/, "").trim();
  if (!t) return [];
  return [
    `What is ${t}?`,
    `How does ${t} work?`,
    `Advantages of ${t}?`,
    `Future of ${t}?`,
  ];
}

function useStickyScroll(ref: React.RefObject<HTMLElement | null>, deps: unknown[]) {
  useEffect(() => {
    if (!ref.current) return;
    setTimeout(() => {
      if (ref.current) {
        ref.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 250);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

function validateParams(params: ResearchParams): string | null {
  if (!params.prompt.trim()) return "Please enter a topic.";
  return null;
}

const ProgressSteps = [
  "Understanding topic...",
  "Searching knowledge...",
  "Analyzing information...",
  "Generating report...",
  "Finalizing...",
];

function LoadingAnimation({ step }: { step: number }) {
  return (
    <div className="flex flex-col items-center gap-4 my-6" aria-live="polite">
      <div className="w-full max-w-xs h-2 bg-gray-200 rounded overflow-hidden">
        <div
          className="h-2"
          style={{
            width: `${((step + 1) / ProgressSteps.length) * 100}%`,
            background:
              "linear-gradient(90deg, #a855f7 0%, #6366f1 100%)",
            transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
      <div className="flex items-center gap-2 text-gray-900 font-semibold">
        <svg
          className="animate-spin w-5 h-5 text-purple-600"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#9CA3AF" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="#9333ea"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
        <span>{ProgressSteps[Math.min(step, ProgressSteps.length - 1)]}</span>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="flex items-center px-3 py-2 rounded bg-gray-50 gap-2 border border-gray-200 text-xs font-medium">
      <span className="text-purple-600">{icon}</span>
      <span className="text-gray-700">{label}:</span>
      <span className="text-gray-900 font-semibold">{value}</span>
    </div>
  );
}

function ResultToolbar({
  onCopy,
  onPdf,
  onDocx,
  onShare,
  onFavorite,
  favorite,
  onPin,
  pinned,
  onRegenerate,
  onClear,
  onPrint,
  reading,
  onRead,
  onStopReading,
  fullscreen,
  onFullscreen,
  onCollapse
}: {
  onCopy: () => void;
  onPdf: () => void;
  onDocx: () => void;
  onShare: () => void;
  onFavorite: () => void;
  favorite: boolean;
  onPin: () => void;
  pinned: boolean;
  onRegenerate: () => void;
  onClear: () => void;
  onPrint: () => void;
  reading: boolean;
  onRead: () => void;
  onStopReading: () => void;
  fullscreen: boolean;
  onFullscreen: () => void;
  onCollapse: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-3 py-3 border-b border-gray-200 items-center px-4" aria-label="Toolbar">
      <button title="Copy" onClick={onCopy} tabIndex={0} aria-label="Copy result" className="toolbar-btn text-gray-700 hover:text-purple-600">
        <FaCopy />
      </button>
      <button title="PDF" onClick={onPdf} tabIndex={0} aria-label="Download PDF" className="toolbar-btn text-gray-700 hover:text-purple-600">
        <FaFilePdf />
      </button>
      <button title="DOCX" onClick={onDocx} tabIndex={0} aria-label="Download Word" className="toolbar-btn text-gray-700 hover:text-purple-600">
        <FaFileWord />
      </button>
      <button title="Share" onClick={onShare} tabIndex={0} aria-label="Share result" className="toolbar-btn text-gray-700 hover:text-purple-600">
        <FaShareAlt />
      </button>
      <button title="Favorite" onClick={onFavorite} tabIndex={0} aria-label="Favorite" className={favorite ? "toolbar-btn text-pink-600" : "toolbar-btn text-gray-700 hover:text-pink-600"}>
        {favorite ? <FaHeart /> : <FaRegHeart />}
      </button>
      <button title="Pin" onClick={onPin} tabIndex={0} aria-label="Pin" className={pinned ? "toolbar-btn text-amber-600" : "toolbar-btn text-gray-700 hover:text-amber-600"}>
        {pinned ? <FaThumbtack /> : <FaThumbtack className="opacity-40" />}
      </button>
      <button title="Regenerate" onClick={onRegenerate} tabIndex={0} aria-label="Regenerate" className="toolbar-btn text-gray-700 hover:text-purple-600">
        <FaRedo />
      </button>
      <button title="Clear" onClick={onClear} tabIndex={0} aria-label="Clear" className="toolbar-btn text-gray-700 hover:text-rose-600">
        <FaTrash />
      </button>
      <button title="Print" onClick={onPrint} tabIndex={0} aria-label="Print" className="toolbar-btn text-gray-700 hover:text-purple-600">
        <FaPrint />
      </button>
      <button
        title={reading ? "Stop Reading" : "Read Aloud"}
        onClick={reading ? onStopReading : onRead}
        tabIndex={0}
        aria-label={reading ? "Stop Reading" : "Read Aloud"}
        className="toolbar-btn text-gray-700 hover:text-purple-600"
      >
        {reading ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
      <button
        title={fullscreen ? "Collapse" : "Fullscreen"}
        onClick={fullscreen ? onCollapse : onFullscreen}
        tabIndex={0}
        aria-label={fullscreen ? "Collapse" : "Fullscreen"}
        className="toolbar-btn text-gray-700 hover:text-purple-600"
      >
        {fullscreen ? <FaCompress /> : <FaExpand />}
      </button>
    </div>
  );
}

function EmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-lg shadow-md border border-gray-200 min-h-[375px]"
      aria-label="Empty State"
    >
      <FaBook className="text-purple-500 text-6xl mb-6" />
      <h2 className="text-2xl font-bold mb-2 text-gray-900">AI Research Assistant</h2>
      <p className="max-w-lg mb-2 text-gray-600">
        Begin your research by entering a topic above and configuring your research preferences.{" "}
        <br />
        Our AI will analyze and summarize scholarly information, create reports, and much more!
      </p>
      <span className="text-gray-400 text-xs">
        Example: Artificial Intelligence in Healthcare
      </span>
    </div>
  );
}

function ErrorState({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg shadow-md border border-red-200 min-h-[200px]" aria-live="assertive">
      <FaExclamationTriangle className="text-red-500 text-4xl mb-3" />
      <h3 className="text-xl font-semibold mb-2 text-gray-900">An error occurred</h3>
      <p className="mb-3 text-gray-600 whitespace-pre-line">{error}</p>
      <button
        className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow transition hover:from-purple-700 hover:to-indigo-700 focus:ring-2 focus:ring-purple-300"
        onClick={onRetry}
      >
        Retry
      </button>
    </div>
  );
}

function HistoryPanel({
  history,
  onLoad,
  onDelete,
  onClear
}: {
  history: ResearchHistoryItem[];
  onLoad: (item: ResearchHistoryItem) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}) {
  if (history.length === 0) {
    return null;
  }
  return (
    <div aria-label="Search History" className="bg-white border border-gray-200 rounded-lg shadow mb-4">
      <div className="flex items-center px-3 py-2 border-b border-gray-200 justify-between">
        <span className="flex gap-2 items-center font-medium text-gray-900">
          <FaHistory className="text-purple-600" />
          History
        </span>
        <button className="text-xs text-purple-600 hover:text-purple-800 font-semibold" onClick={onClear}>
          Clear All
        </button>
      </div>
      <ol className="max-h-72 overflow-y-auto divide-y divide-gray-100">
        {history.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between px-3 py-2 hover:bg-purple-50 transition text-sm"
          >
            <button
              className="flex-1 text-left overflow-hidden whitespace-nowrap overflow-ellipsis"
              aria-label={`Load search: ${item.prompt}`}
              style={{ minWidth: 0 }}
              title={item.prompt}
              tabIndex={0}
              onClick={() => onLoad(item)}
            >
              <span className="font-semibold text-gray-900 max-w-xs inline-block">
                {item.prompt.length > 35
                  ? item.prompt.slice(0, 35) + "..."
                  : item.prompt}
              </span>
              <span className="ml-2 inline-block text-gray-500">
                [{item.researchMode}]
              </span>
              <span className="ml-2 text-gray-400 text-xs">
                {formatDate(item.date)}
              </span>
            </button>
            <button
              className="ml-2 text-gray-400 hover:text-rose-500"
              title="Delete"
              aria-label="Delete history item"
              onClick={() => onDelete(item.id)}
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

function FavoritesPanel({
  favorites,
  onLoad,
  onDelete,
}: {
  favorites: ResearchHistoryItem[];
  onLoad: (item: ResearchHistoryItem) => void;
  onDelete: (id: string) => void;
}) {
  if (favorites.length === 0) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow mb-4" aria-label="Favorites panel">
      <div className="flex items-center px-3 py-2 border-b border-gray-200 justify-between">
        <span className="flex gap-2 items-center font-medium text-pink-600">
          <FaStar /> Favorites
        </span>
      </div>
      <ol className="max-h-60 overflow-y-auto divide-y divide-gray-100">
        {favorites.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between px-3 py-2 hover:bg-pink-50 transition text-sm"
          >
            <button
              className="flex-1 text-left overflow-hidden whitespace-nowrap overflow-ellipsis"
              aria-label={`Load favorite: ${item.prompt}`}
              title={item.prompt}
              tabIndex={0}
              onClick={() => onLoad(item)}
              style={{ minWidth: 0 }}
            >
              <span className="font-semibold text-pink-900 max-w-xs inline-block">
                {item.prompt.length > 35
                  ? item.prompt.slice(0, 35) + "..."
                  : item.prompt}
              </span>
              <span className="ml-2 text-gray-500">
                [{item.researchMode}]
              </span>
            </button>
            <button
              className="ml-2 text-gray-400 hover:text-pink-600"
              title="Remove favorite"
              aria-label="Remove from favorites"
              onClick={() => onDelete(item.id)}
            >
              <FaRegStar />
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

function PinnedPanel({
  pinned,
  onLoad,
  onDelete,
}: {
  pinned: ResearchHistoryItem[];
  onLoad: (item: ResearchHistoryItem) => void;
  onDelete: (id: string) => void;
}) {
  if (pinned.length === 0) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow mb-4" aria-label="Pinned research">
      <div className="flex items-center px-3 py-2 border-b border-gray-200 font-medium text-amber-600 gap-1.5">
        <FaThumbtack className="rotate-45" /> Pinned
      </div>
      <ol className="max-h-48 overflow-y-auto divide-y divide-gray-100">
        {pinned.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between px-3 py-2 hover:bg-amber-50 transition text-sm"
          >
            <button
              className="flex-1 text-left overflow-hidden whitespace-nowrap overflow-ellipsis"
              aria-label={`Load pinned: ${item.prompt}`}
              title={item.prompt}
              tabIndex={0}
              style={{ minWidth: 0 }}
              onClick={() => onLoad(item)}
            >
              <span className="font-semibold text-amber-900 max-w-xs inline-block">
                {item.prompt.length > 35
                  ? item.prompt.slice(0, 35) + "..."
                  : item.prompt}
              </span>
              <span className="ml-2 text-gray-500">
                [{item.researchMode}]
              </span>
            </button>
            <button
              className="ml-2 text-gray-400 hover:text-amber-700"
              title="Unpin"
              aria-label="Remove from pinned"
              onClick={() => onDelete(item.id)}
            >
              <FaThumbtack />
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

function RelatedTopicsPanel({
  topics,
  onLaunch,
}: {
  topics: string[];
  onLaunch: (topic: string) => void;
}) {
  if (!topics || topics.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 py-2" aria-label="Related Topics">
      <span className="mr-2 font-semibold text-gray-900 text-sm">Related:</span>
      {topics.map((topic) => (
        <button
          type="button"
          key={topic}
          className="chip"
          tabIndex={0}
          onClick={() => onLaunch(topic)}
        >
          {topic}
        </button>
      ))}
    </div>
  );
}

function SuggestedQuestionsPanel({
  questions,
  onLaunch,
}: {
  questions: string[];
  onLaunch: (q: string) => void;
}) {
  if (!questions || questions.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 py-2" aria-label="Suggested Questions">
      <span className="mr-2 font-semibold text-gray-900 text-sm">Try asking:</span>
      {questions.map((q) => (
        <button
          key={q}
          tabIndex={0}
          className="chip"
          onClick={() => onLaunch(q)}
        >
          {q}
        </button>
      ))}
    </div>
  );
}

export default function ResearchPageContent() {
  const [prompt, setPrompt] = useState("");
  const [researchMode, setResearchMode] = useState<ResearchMode>(
    "Research Report"
  );
  const [academicLevel, setAcademicLevel] = useState<AcademicLevel>("University");
  const [researchDepth, setResearchDepth] = useState<ResearchDepth>("Standard");
  const [outputLength, setOutputLength] = useState<OutputLength>("Long");
  const [citationStyle, setCitationStyle] = useState<CitationStyle>("APA");
  const [language, setLanguage] = useState<Language>("English");
  const [output, setOutput] = useState<ResearchOutput | null>(null);
  const [, setRawResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistoryState] = useState<ResearchHistoryItem[]>([]);
  const [favorites, setFavoritesState] = useState<ResearchHistoryItem[]>([]);
  const [pinned, setPinnedState] = useState<ResearchHistoryItem[]>([]);
  const [reading, setReading] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [lastRequest, setLastRequest] = useState<ResearchParams | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);
  useStickyScroll(resultRef, [output, error, loading]);

  useEffect(() => {
    setHistoryState(getHistory());
    setFavoritesState(getFavorites());
    setPinnedState(getPinned());
  }, []);

  useEffect(() => setHistory(history), [history]);
  useEffect(() => setFavorites(favorites), [favorites]);
  useEffect(() => setPinned(pinned), [pinned]);

  const submitResearch = useCallback(
    async (forceParams?: ResearchParams) => {
      setError(null);
      setOutput(null);
      setRawResult("");
      setLoading(true);
      setLoadingStep(0);

      let interrupted = false;
      let step = 0;
      function advanceStep() {
        if (interrupted) return;
        setLoadingStep((s) => s + 1);
        if (step < ProgressSteps.length - 1) {
          setTimeout(advanceStep, 350 + Math.random() * 250);
        }
        step++;
      }
      setTimeout(advanceStep, 250);

      const params: ResearchParams = forceParams || {
        prompt,
        researchMode,
        academicLevel,
        researchDepth,
        outputLength,
        citationStyle,
        language,
      };

      const validationError = validateParams(params);
      if (validationError) {
        setError(validationError);
        setLoading(false);
        interrupted = true;
        return;
      }

      setLastRequest(params);

      try {
        const response = await askAI({
          tool: "research",
          prompt: params.prompt,
          researchMode: params.researchMode,
          academicLevel: params.academicLevel,
          researchDepth: params.researchDepth,
          citationStyle: params.citationStyle,
          outputLength: params.outputLength,
          language: params.language,
        });

        if (!response || !response.success || !response.result) {
          throw new Error(
            response && !response.success
              ? response.error
              : "Unable to generate research.\nPlease try again."
          );
        }

        const textResult = response.result;
        setRawResult(textResult);

        const resultSections = splitIntoSections(textResult);
        resultSections.stats = getStats(textResult);
        resultSections.relatedTopics = generateRelatedTopics(textResult);
        resultSections.suggestedQuestions = generateSuggestedQuestions(params.prompt);
        setOutput(resultSections);

        const item: ResearchHistoryItem = {
          ...params,
          date: Date.now(),
          id: uniqId(),
          result: resultSections,
        };

        setHistoryState((prev) => {
          const hist = [item, ...prev.filter((h) => h.prompt !== params.prompt)].slice(0, HISTORY_LIMIT);
          setHistory(hist);
          return hist;
        });
      } catch (e: any) {
        setError(e?.message || "Failed to generate research.");
      } finally {
        interrupted = true;
        setLoading(false);
      }
    },
    [prompt, researchMode, academicLevel, researchDepth, outputLength, citationStyle, language]
  );

  const onRetry = useCallback(() => {
    if (lastRequest) submitResearch(lastRequest);
    else submitResearch();
  }, [lastRequest, submitResearch]);

  const handleCopy = useCallback(() => {
    if (!output) return;
    navigator.clipboard
      .writeText(output.originalText)
      .then(() => {
        if (typeof toast === "function") toast.success("Copied!");
      });
  }, [output]);

  const handlePdf = useCallback(() => {
    if (!output) return;
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
    doc.setFontSize(14);
    doc.text("AI Research Report", 40, 40);
    let y = 70;
    Object.entries(output.sections).forEach(([key, val]) => {
      if (!val) return;
      doc.setFont("helvetica", "bold");
      doc.text(
        RESEARCH_SECTIONS.find((s) => s.key === key)?.label || key,
        40,
        y
      );
      y += 22;
      doc.setFont("helvetica", "normal");
      const paragraphs = val.split("\n");
      paragraphs.forEach((p) => {
        doc.text(p, 56, y, { maxWidth: 500 });
        y += 16;
      });
      y += 8;
    });
    doc.save("research.pdf");
  }, [output]);

  const handleDocx = useCallback(async () => {
    if (!output) return;
    const htmlContent = `<h1>AI Research Report</h1>${Object.entries(
      output.sections
    )
      .map(
        ([key, val]) =>
          val
            ? `<h2>${
                RESEARCH_SECTIONS.find((s) => s.key === key)?.label || key
              }</h2><div>${renderMarkdown(val)}</div>`
            : ""
      )
      .join("")}`;
    if (htmlDocx) {
      const blob = await htmlDocx.asBlob(htmlContent);
      saveAs(blob, "research.docx");
    } else {
      const blob = new Blob([output.originalText], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      saveAs(blob, "research.docx");
    }
  }, [output]);

  const handleShare = useCallback(() => {
    if (!output) return;
    if (
      navigator.share &&
      typeof navigator.share === "function"
    ) {
      navigator
        .share({
          title: `Research: ${prompt}`,
          text: output.originalText,
        })
        .catch(() => {});
    } else {
      navigator.clipboard
        .writeText(output.originalText)
        .then(
          () =>
            typeof toast === "function" &&
            toast.success("Copied to clipboard!")
        );
    }
  }, [output, prompt]);

  const handleFavorite = useCallback(() => {
    if (!output || !lastRequest) return;
    const newItem: ResearchHistoryItem = {
      ...lastRequest,
      date: Date.now(),
      id: uniqId(),
      result: output,
    };
    setFavoritesState((prev) => {
      const found = prev.find(
        (i) => i.prompt === lastRequest.prompt && i.researchMode === lastRequest.researchMode
      );
      if (found) return prev.filter((i) => i.id !== found.id);
      const next = [newItem, ...prev].slice(0, HISTORY_LIMIT);
      setFavorites(next);
      return next;
    });
  }, [output, lastRequest]);

  const handlePin = useCallback(() => {
    if (!output || !lastRequest) return;
    const newItem: ResearchHistoryItem = {
      ...lastRequest,
      date: Date.now(),
      id: uniqId(),
      result: output,
    };
    setPinnedState((prev) => {
      const found = prev.find(
        (i) => i.prompt === lastRequest.prompt && i.researchMode === lastRequest.researchMode
      );
      if (found) return prev.filter((i) => i.id !== found.id);
      const next = [newItem, ...prev].slice(0, HISTORY_LIMIT);
      setPinned(next);
      return next;
    });
  }, [output, lastRequest]);

  const handleRegenerate = useCallback(() => {
    if (lastRequest) submitResearch(lastRequest);
  }, [lastRequest, submitResearch]);

  const handleClear = useCallback(() => {
    setOutput(null);
    setRawResult("");
    setError(null);
  }, []);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleRead = useCallback(() => {
    if (!output) return;
    setReading(true);
    const utter = new window.SpeechSynthesisUtterance(output.originalText);
    utter.lang = language === "Urdu" ? "ur-PK" : language === "French" ? "fr-FR" : language === "German" ? "de-DE" : language === "Spanish" ? "es-ES" : "en-US";
    utter.onend = () => setReading(false);
    window.speechSynthesis.speak(utter);
  }, [output, language]);

  const handleStopReading = useCallback(() => {
    window.speechSynthesis.cancel();
    setReading(false);
  }, []);

  const handleFullscreen = useCallback(() => setFullscreen(true), []);
  const handleCollapse = useCallback(() => setFullscreen(false), []);

  const handleHistoryLoad = useCallback((item: ResearchHistoryItem) => {
    setPrompt(item.prompt);
    setResearchMode(item.researchMode);
    setAcademicLevel(item.academicLevel);
    setResearchDepth(item.researchDepth);
    setOutputLength(item.outputLength);
    setCitationStyle(item.citationStyle);
    setLanguage(item.language);
    setOutput(item.result || null);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleHistoryDelete = useCallback((id: string) => {
    setHistoryState((prev) => {
      const next = prev.filter((h) => h.id !== id);
      setHistory(next);
      return next;
    });
  }, []);

  const handleHistoryClear = useCallback(() => {
    setHistoryState([]);
    setHistory([]);
  }, []);

  const handleFavoriteDelete = useCallback((id: string) => {
    setFavoritesState((prev) => {
      const next = prev.filter((f) => f.id !== id);
      setFavorites(next);
      return next;
    });
  }, []);

  const handlePinnedDelete = useCallback((id: string) => {
    setPinnedState((prev) => {
      const next = prev.filter((p) => p.id !== id);
      setPinned(next);
      return next;
    });
  }, []);

  const handleLaunchTopic = useCallback((topic: string) => {
    setPrompt(topic);
    submitResearch({
      prompt: topic,
      researchMode,
      academicLevel,
      researchDepth,
      outputLength,
      citationStyle,
      language,
    });
  }, [researchMode, academicLevel, researchDepth, outputLength, citationStyle, language, submitResearch]);

  const handleLaunchQuestion = useCallback((question: string) => {
    setPrompt(question);
    submitResearch({
      prompt: question,
      researchMode,
      academicLevel,
      researchDepth,
      outputLength,
      citationStyle,
      language,
    });
  }, [researchMode, academicLevel, researchDepth, outputLength, citationStyle, language, submitResearch]);

  const isFavorite = useMemo(() => {
    if (!output || !lastRequest) return false;
    return favorites.some(
      (i) => i.prompt === lastRequest.prompt && i.researchMode === lastRequest.researchMode
    );
  }, [favorites, output, lastRequest]);

  const isPinned = useMemo(() => {
    if (!output || !lastRequest) return false;
    return pinned.some(
      (i) => i.prompt === lastRequest.prompt && i.researchMode === lastRequest.researchMode
    );
  }, [pinned, output, lastRequest]);

  const stats = useMemo(() => (output && output.stats ? output.stats : null), [output]);

  useEffect(() => {
    if (!fullscreen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [fullscreen]);

  return (
    <div className="flex flex-col items-center w-full pb-8 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-950 min-h-screen text-gray-900">
      <header className="w-full max-w-2xl text-center py-8 mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent mb-3" tabIndex={0}>
          AI Research Assistant
        </h1>
        <h2 className="text-lg sm:text-xl font-semibold text-slate-300 max-w-xl mx-auto">
          Research, analyze, summarize and understand any topic with AI.
        </h2>
      </header>

      <div className="w-full max-w-2xl px-3">
        <HistoryPanel
          history={history}
          onLoad={handleHistoryLoad}
          onDelete={handleHistoryDelete}
          onClear={handleHistoryClear}
        />
        <FavoritesPanel
          favorites={favorites}
          onLoad={handleHistoryLoad}
          onDelete={handleFavoriteDelete}
        />
        <PinnedPanel
          pinned={pinned}
          onLoad={handleHistoryLoad}
          onDelete={handlePinnedDelete}
        />
      </div>

      <form
        className="mx-auto w-full max-w-2xl bg-white rounded-xl shadow-2xl px-6 py-8 flex flex-col gap-6 border border-gray-200"
        aria-label="Research Input"
        onSubmit={(e) => {
          e.preventDefault();
          submitResearch();
        }}
      >
        <div>
          <label htmlFor="topic" className="block text-lg font-bold text-gray-900 mb-2">
            Research Topic
            <span className="sr-only">(required)</span>
          </label>
          <textarea
            aria-label="Enter your research topic"
            id="topic"
            className="w-full min-h-[90px] max-h-48 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base resize-vertical font-medium shadow-sm"
            placeholder={EXAMPLE_PLACEHOLDER}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
            required
            tabIndex={0}
          />
        </div>

        <div
          className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4"
          aria-label="Advanced Options"
        >
          <div className="flex flex-col">
            <label htmlFor="research-mode" className="text-sm font-bold text-gray-900 mb-1">
              Research Mode
            </label>
            <select
              id="research-mode"
              className="bg-white text-gray-900 border border-gray-300 rounded-lg p-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
              value={researchMode}
              onChange={(e) => setResearchMode(e.target.value as ResearchMode)}
              disabled={loading}
              tabIndex={0}
              aria-label="Select research mode"
            >
              {RESEARCH_MODES.map((m) => (
                <option key={m} value={m} className="bg-white text-gray-900">
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="academic-level" className="text-sm font-bold text-gray-900 mb-1">
              Academic Level
            </label>
            <select
              id="academic-level"
              className="bg-white text-gray-900 border border-gray-300 rounded-lg p-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
              value={academicLevel}
              onChange={(e) => setAcademicLevel(e.target.value as AcademicLevel)}
              disabled={loading}
              tabIndex={0}
              aria-label="Select academic level"
            >
              {ACADEMIC_LEVELS.map((l) => (
                <option key={l} value={l} className="bg-white text-gray-900">
                  {l}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="research-depth" className="text-sm font-bold text-gray-900 mb-1">
              Research Depth
            </label>
            <select
              id="research-depth"
              className="bg-white text-gray-900 border border-gray-300 rounded-lg p-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
              value={researchDepth}
              onChange={(e) => setResearchDepth(e.target.value as ResearchDepth)}
              disabled={loading}
              tabIndex={0}
              aria-label="Select research depth"
            >
              {RESEARCH_DEPTHS.map((d) => (
                <option key={d} value={d} className="bg-white text-gray-900">
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="output-length" className="text-sm font-bold text-gray-900 mb-1">
              Output Length
            </label>
            <select
              id="output-length"
              className="bg-white text-gray-900 border border-gray-300 rounded-lg p-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
              value={outputLength}
              onChange={(e) => setOutputLength(e.target.value as OutputLength)}
              disabled={loading}
              tabIndex={0}
              aria-label="Select report length"
            >
              {OUTPUT_LENGTHS.map((l) => (
                <option key={l} value={l} className="bg-white text-gray-900">
                  {l}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="citation-style" className="text-sm font-bold text-gray-900 mb-1">
              Citation Style
            </label>
            <select
              id="citation-style"
              className="bg-white text-gray-900 border border-gray-300 rounded-lg p-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
              value={citationStyle}
              onChange={(e) => setCitationStyle(e.target.value as CitationStyle)}
              disabled={loading}
              tabIndex={0}
              aria-label="Select citation style"
            >
              {CITATION_STYLES.map((c) => (
                <option key={c} value={c} className="bg-white text-gray-900">
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="language" className="text-sm font-bold text-gray-900 mb-1">
              Language
            </label>
            <select
              id="language"
              className="bg-white text-gray-900 border border-gray-300 rounded-lg p-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              disabled={loading}
              tabIndex={0}
              aria-label="Select output language"
            >
              {LANGUAGES.map((l) => (
                <option key={l} value={l} className="bg-white text-gray-900">
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full flex justify-center mt-2">
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className={`rounded-xl px-10 py-3.5 text-lg font-bold transition-all focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 text-white ${
              loading || !prompt.trim()
                ? "opacity-60 cursor-not-allowed"
                : "hover:scale-105 hover:shadow-purple-500/25 active:scale-95"
            }`}
            aria-disabled={loading || !prompt.trim()}
            aria-busy={loading}
          >
            {loading ? (
              <span className="flex gap-2 items-center">
                <svg className="animate-spin w-6 h-6 mr-1" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#fff" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="#fff"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Generating...
              </span>
            ) : (
              "Start Research"
            )}
          </button>
        </div>
      </form>

      <section className={`w-full px-3 max-w-3xl mx-auto pt-8 ${fullscreen ? "fixed inset-0 z-50 bg-slate-950 overflow-y-auto p-4 md:p-10" : ""}`}>
        {loading && <LoadingAnimation step={loadingStep} />}

        {error && !loading && (
          <ErrorState error={error} onRetry={onRetry} />
        )}

        {!output && !loading && !error && <EmptyState />}

        {output && !loading && !error && (
          <div
            className="rounded-xl bg-white shadow-2xl border border-gray-200 mb-8 relative research-result-card overflow-hidden"
            ref={resultRef}
            aria-label="Research Result"
            tabIndex={0}
          >
            <ResultToolbar
              onCopy={handleCopy}
              onPdf={handlePdf}
              onDocx={handleDocx}
              onShare={handleShare}
              onFavorite={handleFavorite}
              favorite={isFavorite}
              onPin={handlePin}
              pinned={isPinned}
              onRegenerate={handleRegenerate}
              onClear={handleClear}
              onPrint={handlePrint}
              reading={reading}
              onRead={handleRead}
              onStopReading={handleStopReading}
              fullscreen={fullscreen}
              onFullscreen={handleFullscreen}
              onCollapse={handleCollapse}
            />

            <div className="flex flex-wrap gap-3 py-3 px-4 border-b border-gray-200 bg-gray-50">
              {stats && (
                <Fragment>
                  <StatCard icon={<FaBook />} label="Words" value={stats.wordCount} />
                  <StatCard icon={<FaInfoCircle />} label="Characters" value={stats.charCount} />
                  <StatCard icon={<FaInfoCircle />} label="Paragraphs" value={stats.paragraphCount} />
                  <StatCard icon={<FaRegTimesCircle />} label="Est. Read (min)" value={stats.estimatedReadingTime} />
                  <StatCard icon={<FaRegTimesCircle />} label="Generated" value={stats.generatedTime} />
                </Fragment>
              )}
            </div>

            <div className="p-6 sm:p-8 pb-4">
              {RESEARCH_SECTIONS.map(({ key, label }) =>
                output.sections[key] ? (
                  <section key={key} className="mb-8 last:mb-0">
                    <h2 className="font-bold text-xl text-purple-900 mb-3 border-b border-purple-100 pb-1">
                      {label}
                    </h2>
                    <div
                      className="text-gray-900 prose prose-purple max-w-none text-base leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: renderMarkdown(output.sections[key]!),
                      }}
                    />
                  </section>
                ) : null
              )}
            </div>

            <div className="border-t border-gray-200 p-4 bg-gray-50/50">
              <RelatedTopicsPanel
                topics={output.relatedTopics || []}
                onLaunch={handleLaunchTopic}
              />
              <SuggestedQuestionsPanel
                questions={output.suggestedQuestions || []}
                onLaunch={handleLaunchQuestion}
              />
            </div>
          </div>
        )}
      </section>

      {fullscreen && (
        <button
          className="fixed right-6 top-6 z-[100] bg-white rounded-full p-3 shadow-xl border border-gray-300 hover:bg-purple-50 text-purple-700"
          style={{ fontSize: 24 }}
          aria-label="Collapse research result"
          tabIndex={0}
          onClick={handleCollapse}
        >
          <FaCompress />
        </button>
      )}

      <style>{`
        .toolbar-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.1rem;
          border-radius: 6px;
          padding: 0.4em 0.6em;
          transition: all .15s;
        }
        .toolbar-btn:hover, .toolbar-btn:focus-visible {
          background: #f3e8ff;
        }
        .chip {
          display: inline-block;
          background: #f3e8ff;
          color: #6b21a8;
          border-radius: 9999px;
          padding: 0.35em 1.1em;
          font-size: 0.9rem;
          font-weight: 700;
          margin-bottom: 0.3em;
          cursor: pointer;
          border: 1px solid #e9d5ff;
          transition: all .15s;
          outline: none;
        }
        .chip:hover, .chip:focus-visible {
          background: #e9d5ff;
          color: #581c87;
        }
        @media (max-width: 640px) {
          .research-result-card {
            margin: 0 -10px;
            border-radius: 0;
            padding: 0 !important;
          }
          .chip { font-size: .85rem; }
          .toolbar-btn { font-size: 1rem; }
        }
      `}</style>
    </div>
  );
}
