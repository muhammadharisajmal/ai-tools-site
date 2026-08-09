"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  FormEvent,
  KeyboardEvent,
} from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, HeadingLevel, TextRun } from "docx";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import {
  Copy,
  Trash,
  RotateCw,
  FileDown,
  FileText,
  Star,
  Share2,
  Pin,
  PinOff,
  History,
  Heart,
  HeartOff,
} from "lucide-react";
import { askAI } from "@/lib/api/ai";

const MAX_HISTORY = 20;
const MAX_FAVORITES = 20;

const TOOLBAR_ICONS = {
  copy: Copy,
  regenerate: RotateCw,
  clear: Trash,
  pdf: FileDown,
  docx: FileText,
  favorite: Heart,
  unfavorite: HeartOff,
  share: Share2,
  pin: Pin,
  unpin: PinOff,
};

type Tone =
  | "Formal"
  | "Simple"
  | "Creative"
  | "Academic"
  | "Conversational"
  | "Friendly";

type WritingType =
  | "Essay"
  | "Assignment"
  | "Summary"
  | "Blog"
  | "Research Notes"
  | "Other";

type OutputLength = "Short" | "Medium" | "Detailed";
type Language = "English" | "Urdu";

type ToolbarAction =
  | "copy"
  | "regenerate"
  | "clear"
  | "pdf"
  | "docx"
  | "favorite"
  | "share"
  | "pin";

interface PromptHistory {
  prompt: string;
  timestamp: number;
  tone: Tone;
  writingType: WritingType;
  language: Language;
  outputLength: OutputLength;
  specialInstructions: string;
}

interface FavoriteItem {
  response: string;
  prompt: string;
  date: string;
}

interface PinnedItem {
  response: string;
  prompt: string;
  date: string;
}

function countWords(text: string) {
  const match = text.trim().match(/\b\w+\b/g);
  return match ? match.length : 0;
}

function countChars(text: string) {
  return text.replace(/\s/g, "").length;
}

function estimateReadingTime(text: string) {
  const words = countWords(text);
  return Math.max(1, Math.round(words / 180));
}

const LOADING_STEPS = [
  { emoji: "🧠", text: "Understanding prompt..." },
  { emoji: "📖", text: "Researching..." },
  { emoji: "✍️", text: "Writing..." },
  { emoji: "✨", text: "Improving quality..." },
  { emoji: "✅", text: "Finalizing..." },
];

const TONES: Tone[] = [
  "Formal",
  "Simple",
  "Creative",
  "Academic",
  "Conversational",
  "Friendly",
];

const WRITING_TYPES: WritingType[] = [
  "Essay",
  "Assignment",
  "Summary",
  "Blog",
  "Research Notes",
  "Other",
];

const OUTPUT_LENGTHS: OutputLength[] = ["Short", "Medium", "Detailed"];
const LANGUAGES: Language[] = ["English", "Urdu"];

const getHistory = (): PromptHistory[] => {
  if (typeof window === "undefined") return [];
  try {
    const h = localStorage.getItem("writing-history");
    if (!h) return [];
    return JSON.parse(h);
  } catch {
    return [];
  }
};

const saveHistory = (history: PromptHistory[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("writing-history", JSON.stringify(history.slice(0, MAX_HISTORY)));
};

function useStickyState<T>(key: string, defaultVal: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return defaultVal;
    try {
      const l = localStorage.getItem(key);
      if (l) return JSON.parse(l);
    } catch {}
    return defaultVal;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value, key]);

  return [value, setValue];
}

export default function WritingPageContent() {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState<Tone>("Formal");
  const [writingType, setWritingType] = useState<WritingType>("Essay");
  const [language, setLanguage] = useState<Language>("English");
  const [outputLength, setOutputLength] = useState<OutputLength>("Detailed");
  const [specialInstructions, setSpecialInstructions] = useState("");

  const [loading, setLoading] = useState(false);
  const [animatedLoadingIdx, setAnimatedLoadingIdx] = useState(0);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showCopiedAnim, setShowCopiedAnim] = useState(false);

  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [readingTime, setReadingTime] = useState(1);

  const [favoriteList, setFavoriteList] = useStickyState<FavoriteItem[]>("writing-favorites", []);
  const [history, setHistory] = useState<PromptHistory[]>([]);
  const [pinnedList, setPinnedList] = useStickyState<PinnedItem[]>("writing-pins", []);
  const [isPinned, setIsPinned] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [typewriterText, setTypewriterText] = useState("");
  const [typewriting, setTypewriting] = useState(false);

  const outputRef = useRef<HTMLDivElement | null>(null);
  const promptRef = useRef<HTMLTextAreaElement | null>(null);
  const [prevPrompt, setPrevPrompt] = useState<string>("");

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  useEffect(() => {
    if (!output || !typewriting) return;
    let i = 0;
    setTypewriterText("");
    let cancelled = false;

    function nextChar() {
      if (cancelled) return;
      if (i < output.length) {
        setTypewriterText((prev) => prev + output.charAt(i));
        i++;
        setTimeout(nextChar, output[i - 1] === "\n" ? 10 : 18);
      } else {
        setTypewriting(false);
      }
    }
    nextChar();
    return () => {
      cancelled = true;
    };
  }, [output, typewriting]);

  useEffect(() => {
    setWordCount(countWords(output));
    setCharCount(output.length);
    setReadingTime(estimateReadingTime(output));
  }, [output]);

  useEffect(() => {
    if (!loading) {
      setAnimatedLoadingIdx(0);
      return;
    }
    const interval = setInterval(() => {
      setAnimatedLoadingIdx((i) => (i + 1) % LOADING_STEPS.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    setIsFavorite(
      !!output &&
        !!favoriteList.find((item) => item.response === output && item.prompt === prevPrompt)
    );
    setIsPinned(
      !!output && !!pinnedList.find((item) => item.response === output && item.prompt === prevPrompt)
    );
  }, [output, favoriteList, pinnedList, prevPrompt]);

  useEffect(() => {
    if (output && outputRef.current) {
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    }
  }, [output]);

  const generate = useCallback(
    async ({
      prompt: submittedPrompt,
      selectedType,
      selectedTone,
      selectedLanguage,
      selectedLength,
      selectedInstructions,
      historyAction,
    }: {
      prompt: string;
      selectedType: WritingType;
      selectedTone: Tone;
      selectedLanguage: Language;
      selectedLength: OutputLength;
      selectedInstructions: string;
      historyAction?: "from-history";
    }) => {
      setTypewriterText("");
      setTypewriting(false);
      setOutput("");
      setLoading(true);
      setError("");
      setValidationError("");

      try {
        if (!historyAction) {
          const prev: PromptHistory[] = getHistory();
          const newHistory: PromptHistory[] = [
            {
              prompt: submittedPrompt,
              timestamp: Date.now(),
              tone: selectedTone,
              writingType: selectedType,
              language: selectedLanguage,
              outputLength: selectedLength,
              specialInstructions: selectedInstructions,
            },
            ...prev.filter((h) => h.prompt !== submittedPrompt),
          ].slice(0, MAX_HISTORY);
          setHistory(newHistory);
          saveHistory(newHistory);
        }

        setPrevPrompt(submittedPrompt);

        const response = await askAI({
          tool: "writing",
          prompt: submittedPrompt,
          tone: selectedTone,
          writingType: selectedType,
          language: selectedLanguage,
          outputLength: selectedLength,
          specialInstructions: selectedInstructions,
        });

        if (!response || !response.success || !response.result) {
          throw new Error(response && !response.success ? response.error : "Failed to generate text.");
        }

        setOutput(response.result);
        setTypewriting(true);
        setTimeout(() => {
          setLoading(false);
        }, 100);
        setError("");
      } catch (e: any) {
        setLoading(false);
        setOutput("");
        setError(e?.message || "❌ Unable to generate content.\n\nPlease try again.");
      }
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement> | undefined) => {
      if (e) e.preventDefault();
      const trimmed = prompt.trim();
      if (!trimmed) {
        setValidationError("Prompt required.");
        return;
      }
      if (loading) return;
      await generate({
        prompt: trimmed,
        selectedType: writingType,
        selectedTone: tone,
        selectedLanguage: language,
        selectedLength: outputLength,
        selectedInstructions: specialInstructions,
      });
    },
    [prompt, writingType, tone, language, outputLength, specialInstructions, loading, generate]
  );

  const handleClear = useCallback(() => {
    setPrompt("");
    setOutput("");
    setError("");
    setCopied(false);
    setShowCopiedAnim(false);
    setLoading(false);
    setValidationError("");
    setTypewriterText("");
    setTypewriting(false);
    setSpecialInstructions("");
    if (promptRef.current) promptRef.current.focus();
  }, []);

  const handleRegenerate = useCallback(async () => {
    if (loading || !prevPrompt) return;
    await generate({
      prompt: prevPrompt,
      selectedType: writingType,
      selectedTone: tone,
      selectedLanguage: language,
      selectedLength: outputLength,
      selectedInstructions: specialInstructions,
    });
  }, [generate, loading, prevPrompt, writingType, tone, language, outputLength, specialInstructions]);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setShowCopiedAnim(true);
    setTimeout(() => {
      setCopied(false);
      setShowCopiedAnim(false);
    }, 2000);
  }, [output]);

  const handleDownloadPDF = useCallback(() => {
    if (!output) return;
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });
    const lines = doc.splitTextToSize(output, 180);
    doc.setFont("Times", "Normal");
    doc.setFontSize(12);
    let y = 25;
    doc.text("AI Writing Output", 10, 18);
    lines.forEach((line: string) => {
      if (y > 280) {
        doc.addPage();
        y = 25;
      }
      doc.text(line, 10, y);
      y += 7;
    });
    doc.save("AI-Writing.pdf");
  }, [output]);

  const handleDownloadDOCX = useCallback(async () => {
    if (!output) return;
    const paragraphs = output.split(/\n\s*\n/).map((para, idx) =>
      new Paragraph({
        children: [new TextRun({ text: para, break: 1 })],
        spacing: { after: 180 },
        heading: !idx ? HeadingLevel.HEADING_1 : undefined,
      })
    );
    const doc = new Document({
      title: "AI Writing Output",
      sections: [
        {
          properties: {},
          children: [new Paragraph("AI Writing Output"), ...paragraphs],
        },
      ],
    });
    const b = await Packer.toBlob(doc);
    const url = window.URL.createObjectURL(b);
    const a = document.createElement("a");
    a.href = url;
    a.download = "AI-Writing.docx";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.remove();
    }, 150);
  }, [output]);

  const handleFavorite = useCallback(() => {
    if (!output) return;
    if (isFavorite) {
      const updated = favoriteList.filter(
        (item) => item.response !== output || item.prompt !== prevPrompt
      );
      setFavoriteList(updated);
      setIsFavorite(false);
    } else {
      const newFav: FavoriteItem = {
        response: output,
        prompt: prevPrompt,
        date: new Date().toISOString(),
      };
      const newList = [newFav, ...favoriteList.filter((item) => item.response !== output)];
      setFavoriteList(newList.slice(0, MAX_FAVORITES));
      setIsFavorite(true);
    }
  }, [output, prevPrompt, favoriteList, setFavoriteList, isFavorite]);

  const handlePin = useCallback(() => {
    if (!output) return;
    if (isPinned) {
      const updated = pinnedList.filter(
        (item) => item.response !== output || item.prompt !== prevPrompt
      );
      setPinnedList(updated);
      setIsPinned(false);
    } else {
      const pin: PinnedItem = {
        response: output,
        prompt: prevPrompt,
        date: new Date().toISOString(),
      };
      const newPins = [pin, ...pinnedList.filter((item) => item.response !== output)];
      setPinnedList(newPins.slice(0, MAX_HISTORY));
      setIsPinned(true);
    }
  }, [output, prevPrompt, pinnedList, setPinnedList, isPinned]);

  const handleShare = useCallback(async () => {
    if (!output) return;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: "AI Writing Output",
          text: output,
        });
      } catch {}
    } else {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setShowCopiedAnim(true);
      setTimeout(() => {
        setCopied(false);
        setShowCopiedAnim(false);
      }, 2000);
    }
  }, [output]);

  const handlePromptHistoryClick = (item: PromptHistory) => {
    setPrompt(item.prompt);
    setTone(item.tone);
    setWritingType(item.writingType);
    setLanguage(item.language || "English");
    setOutputLength(item.outputLength || "Detailed");
    setSpecialInstructions(item.specialInstructions || "");
    if (promptRef.current) promptRef.current.focus();
  };

  const removeFavorite = (item: FavoriteItem) => {
    setFavoriteList(favoriteList.filter((f) => f !== item));
  };

  const removePin = (item: PinnedItem) => {
    setPinnedList(pinnedList.filter((p) => p !== item));
  };

  const toolbarActions: {
    key: ToolbarAction;
    label: string;
    onClick: () => void;
    icon: React.ElementType;
    show: boolean;
    disabled?: boolean;
    ariaLabel?: string;
  }[] = [
    {
      key: "copy",
      label: !copied ? "Copy" : "Copied ✓",
      onClick: handleCopy,
      icon: TOOLBAR_ICONS.copy,
      show: !!output,
      disabled: false,
      ariaLabel: "Copy AI output",
    },
    {
      key: "regenerate",
      label: loading ? "Regenerating..." : "Regenerate",
      onClick: handleRegenerate,
      icon: TOOLBAR_ICONS.regenerate,
      show: !!output && !!prevPrompt,
      disabled: loading,
      ariaLabel: "Regenerate output",
    },
    {
      key: "clear",
      label: "Clear",
      onClick: handleClear,
      icon: TOOLBAR_ICONS.clear,
      show: !!output || !!prompt,
      disabled: loading,
      ariaLabel: "Clear prompt and output",
    },
    {
      key: "pdf",
      label: "PDF",
      onClick: handleDownloadPDF,
      icon: TOOLBAR_ICONS.pdf,
      show: !!output,
      ariaLabel: "Download as PDF",
    },
    {
      key: "docx",
      label: "DOCX",
      onClick: handleDownloadDOCX,
      icon: TOOLBAR_ICONS.docx,
      show: !!output,
      ariaLabel: "Download as DOCX",
    },
    {
      key: "favorite",
      label: isFavorite ? "Favorited" : "Favorite",
      onClick: handleFavorite,
      icon: isFavorite ? TOOLBAR_ICONS.unfavorite : TOOLBAR_ICONS.favorite,
      show: !!output,
      ariaLabel: "Favorite this response",
    },
    {
      key: "pin",
      label: isPinned ? "Pinned" : "Pin",
      onClick: handlePin,
      icon: isPinned ? TOOLBAR_ICONS.unpin : TOOLBAR_ICONS.pin,
      show: !!output,
      ariaLabel: "Pin this response",
    },
    {
      key: "share",
      label: "Share",
      onClick: handleShare,
      icon: TOOLBAR_ICONS.share,
      show: !!output,
      ariaLabel: "Share AI output",
    },
  ];

  const handlePromptKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(undefined);
    }
  };

  const markdownComponents = useMemo(
    () => ({
      h1: (props: any) => (
        <h1 {...props} className="text-2xl sm:text-3xl font-bold mt-6 mb-4 text-purple-900" />
      ),
      h2: (props: any) => (
        <h2 {...props} className="text-xl sm:text-2xl font-bold mt-5 mb-3 text-purple-800" />
      ),
      h3: (props: any) => (
        <h3 {...props} className="text-lg sm:text-xl font-bold mt-4 mb-2 text-purple-700" />
      ),
      p: (props: any) => (
        <p {...props} className="mb-3 text-gray-900 text-base leading-relaxed" />
      ),
      ul: (props: any) => <ul {...props} className="ml-6 list-disc mb-3 text-gray-900" />,
      ol: (props: any) => <ol {...props} className="ml-6 list-decimal mb-3 text-gray-900" />,
      li: (props: any) => <li {...props} className="mb-1 text-base text-gray-900" />,
      blockquote: (props: any) => (
        <blockquote
          {...props}
          className="border-l-4 border-purple-500 pl-4 italic text-purple-900 bg-purple-50/80 my-3 py-2 rounded-r-md"
        />
      ),
      code({ inline, className, children, ...props }: any) {
        const match = /language-(\w+)/.exec(className || "");
        return !inline ? (
          <SyntaxHighlighter
            style={vscDarkPlus}
            customStyle={{
              borderRadius: "0.5rem",
              background: "#1e1b4b",
              fontSize: "0.95rem",
              padding: "1em",
              margin: "1em 0",
            }}
            language={match ? match[1] : "plaintext"}
            PreTag="div"
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        ) : (
          <code
            {...props}
            className="px-1.5 py-0.5 bg-gray-200 text-purple-900 text-sm rounded font-mono font-semibold"
          >
            {children}
          </code>
        );
      },
      table: (props: any) => (
        <div className="overflow-auto my-4 border border-gray-300 rounded-lg">
          <table {...props} className="min-w-full text-sm table-auto border-collapse bg-white" />
        </div>
      ),
      th: (props: any) => (
        <th {...props} className="bg-purple-100 text-gray-900 font-bold px-4 py-2 border border-gray-300 text-left" />
      ),
      td: (props: any) => (
        <td {...props} className="bg-white text-gray-900 px-4 py-2 border border-gray-200" />
      ),
      hr: (props: any) => <hr className="my-6 border-purple-200" />,
      strong: (props: any) => <strong {...props} className="font-bold text-gray-900" />,
      em: (props: any) => <em {...props} className="italic text-gray-900" />,
      a: (props: any) => (
        <a
          {...props}
          className="underline text-purple-700 hover:text-purple-900 font-medium transition"
          target="_blank"
          rel="noopener noreferrer"
        />
      ),
    }),
    []
  );

  return (
    <div className="relative min-h-screen py-8 px-3 flex flex-col bg-slate-950/20 backdrop-blur-xl">
      <div className="mx-auto max-w-4xl w-full bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 sm:p-10 mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 text-transparent bg-clip-text mb-8">
          AI Writing Assistant
        </h1>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit} aria-label="AI Prompt Input" autoComplete="off">
          
          {/* HIGH-CONTRAST SELECT CONTROLS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-sm text-gray-900" htmlFor="writingType">
                Writing Type:
              </label>
              <select
                id="writingType"
                value={writingType}
                onChange={(e) => setWritingType(e.target.value as WritingType)}
                className="w-full bg-white text-gray-900 font-medium px-3 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                disabled={loading}
              >
                {WRITING_TYPES.map((t) => (
                  <option value={t} key={t} className="bg-white text-gray-900">
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-sm text-gray-900" htmlFor="tone">
                Tone:
              </label>
              <select
                id="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value as Tone)}
                className="w-full bg-white text-gray-900 font-medium px-3 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                disabled={loading}
              >
                {TONES.map((t) => (
                  <option value={t} key={t} className="bg-white text-gray-900">
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-sm text-gray-900" htmlFor="language">
                Language:
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="w-full bg-white text-gray-900 font-medium px-3 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                disabled={loading}
              >
                {LANGUAGES.map((l) => (
                  <option value={l} key={l} className="bg-white text-gray-900">
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-sm text-gray-900" htmlFor="outputLength">
                Output Length:
              </label>
              <select
                id="outputLength"
                value={outputLength}
                onChange={(e) => setOutputLength(e.target.value as OutputLength)}
                className="w-full bg-white text-gray-900 font-medium px-3 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                disabled={loading}
              >
                {OUTPUT_LENGTHS.map((len) => (
                  <option value={len} key={len} className="bg-white text-gray-900">
                    {len}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* MAIN PROMPT TEXTAREA */}
          <div className="flex flex-col gap-2">
            <label className="font-bold text-lg text-gray-900" htmlFor="prompt">
              Prompt
            </label>
            <textarea
              id="prompt"
              ref={promptRef}
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                setValidationError("");
              }}
              onKeyDown={handlePromptKeyDown}
              rows={4}
              className={`w-full resize-none bg-white text-gray-900 border px-4 py-3 rounded-lg font-medium shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition text-base ${
                validationError ? "border-rose-500" : "border-gray-300"
              } placeholder:text-gray-400`}
              placeholder="Describe what you'd like to write about..."
              disabled={loading}
              aria-invalid={!!validationError}
            />
            {validationError && (
              <div className="text-sm text-rose-600 font-bold select-none">
                {validationError}
              </div>
            )}
          </div>

          {/* OPTIONAL SPECIAL INSTRUCTIONS FIELD */}
          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-sm text-gray-900" htmlFor="specialInstructions">
              Special Instructions (Optional)
            </label>
            <input
              type="text"
              id="specialInstructions"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Focus on academic case studies, skip introductory summary..."
              className="w-full bg-white text-gray-900 border border-gray-300 px-4 py-2.5 rounded-lg font-medium shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition text-sm placeholder:text-gray-400"
              disabled={loading}
            />
          </div>

          {/* SUBMIT AND METRICS ROW */}
          <div className="flex flex-wrap gap-4 items-center justify-between w-full pt-2 border-t border-gray-100">
            <button
              type="submit"
              className={`rounded-lg px-8 py-3 font-bold transition-all flex items-center gap-2 shadow-md bg-gradient-to-tr from-purple-600 via-indigo-600 to-fuchsia-600 text-white hover:scale-105 hover:shadow-purple-200 focus:outline-none focus:ring-4 focus:ring-purple-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                loading ? "animate-pulse" : ""
              }`}
              disabled={loading || !prompt.trim()}
            >
              {loading ? (
                <span className="animate-spin">
                  <RotateCw className="h-5 w-5" />
                </span>
              ) : (
                <span>Generate</span>
              )}
            </button>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-gray-900 font-mono text-xs font-semibold rounded bg-purple-50 border border-purple-200 px-2.5 py-1.5">
                Words: {wordCount}
              </span>
              <span className="text-gray-900 font-mono text-xs font-semibold rounded bg-indigo-50 border border-indigo-200 px-2.5 py-1.5">
                Characters: {charCount}
              </span>
              <span className="text-gray-900 font-mono text-xs font-semibold rounded bg-fuchsia-50 border border-fuchsia-200 px-2.5 py-1.5">
                Reading Time: {readingTime} min
              </span>
            </div>
          </div>
        </form>
      </div>

      {/* ERROR DISPLAY */}
      {error ? (
        <div className="mx-auto max-w-2xl w-full">
          <div className="bg-rose-50 p-6 rounded-2xl border border-rose-200 shadow-lg flex flex-col items-center text-center text-rose-800">
            <span className="text-4xl mb-3">❌</span>
            <div className="font-bold text-lg mb-1">{error.split("\n")[0]}</div>
            <div className="mb-4 text-sm font-medium">{error.split("\n")[1]}</div>
            <button
              onClick={handleRegenerate}
              className="px-6 py-2 bg-gradient-to-tr from-purple-600 to-fuchsia-600 text-white font-bold rounded-lg shadow hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-purple-200"
            >
              Retry
            </button>
          </div>
        </div>
      ) : loading ? (
        <div className="mx-auto max-w-2xl w-full">
          <div className="my-12 flex flex-col items-center text-center font-medium text-lg select-none">
            <div className="relative flex justify-center mb-3">
              <span className="text-4xl animate-bounce">{LOADING_STEPS[animatedLoadingIdx].emoji}</span>
            </div>
            <span className="text-purple-900 font-bold text-lg animate-pulse">
              {LOADING_STEPS[animatedLoadingIdx].text}
            </span>
          </div>
        </div>
      ) : output ? (
        <div className="mx-auto max-w-3xl w-full" ref={outputRef}>
          
          {/* TOOLBAR BUTTONS */}
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-end mb-3">
            {toolbarActions.map(
              (act) =>
                act.show && (
                  <button
                    key={act.key}
                    onClick={act.onClick}
                    disabled={!!act.disabled}
                    aria-label={act.ariaLabel}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 shadow-sm hover:bg-purple-50 hover:border-purple-300 transition-all font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 cursor-pointer ${
                      act.disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105 active:scale-95"
                    } ${showCopiedAnim && act.key === "copy" ? "bg-purple-100 border-purple-400" : ""}`}
                  >
                    <act.icon className="h-4 w-4 text-purple-700" />
                    <span>{act.label}</span>
                  </button>
                )
            )}
          </div>

          {/* MARKDOWN RENDER CONTAINER */}
          <div className="bg-white shadow-xl border border-gray-200 rounded-2xl p-6 sm:p-8 text-gray-900 relative prose max-w-none text-base">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} components={markdownComponents}>
              {typewriting ? typewriterText : output}
            </ReactMarkdown>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-lg w-full text-center py-16 select-none">
          <div className="mb-4">
            <svg width="70" height="70" viewBox="0 0 80 80" fill="none" className="mx-auto">
              <defs>
                <linearGradient id="writing-gradient" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#9333ea" />
                  <stop offset="1" stopColor="#c026d3" />
                </linearGradient>
              </defs>
              <circle cx="40" cy="40" r="38" fill="url(#writing-gradient)" fillOpacity="0.12" />
              <rect x="20" y="36" width="40" height="8" rx="4" fill="url(#writing-gradient)" />
              <rect x="30" y="26" width="20" height="6" rx="3" fill="url(#writing-gradient)" opacity="0.8" />
              <rect x="26" y="49" width="28" height="6" rx="3" fill="url(#writing-gradient)" opacity="0.5" />
            </svg>
          </div>
          <div className="font-extrabold text-2xl mb-2 text-gray-900">Start with a prompt!</div>
          <div className="text-gray-600 text-sm">
            Enter your topic, choose style & type.<br />Here is your professional AI writer.
          </div>
        </div>
      )}

      {/* PINNED & RECENT PROMPTS SECTION */}
      {(!!pinnedList.length || !!history.length) && (
        <div className="mx-auto max-w-3xl w-full mt-10 mb-4 space-y-6">
          {pinnedList.length > 0 && (
            <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-5">
              <div className="flex items-center mb-3">
                <Pin className="w-5 h-5 mr-2 text-purple-600" />
                <h3 className="font-bold text-base text-gray-900">Pinned Responses</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pinnedList.map((item, idx) => (
                  <div
                    className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 flex flex-col relative"
                    key={item.response.slice(0, 30) + idx}
                  >
                    <div className="font-semibold text-gray-900 text-sm mb-1 pr-6 line-clamp-1">{item.prompt}</div>
                    <button
                      className="absolute right-2 top-2 focus:outline-none"
                      aria-label="Remove Pin"
                      onClick={() => removePin(item)}
                    >
                      <PinOff className="h-4 w-4 text-gray-400 hover:text-rose-600 transition" />
                    </button>
                    <div className="text-gray-700 line-clamp-3 text-xs mt-1">
                      {item.response.replace(/[#*`_]/g, "")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {history.length > 0 && (
            <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-5">
              <div className="flex items-center mb-3">
                <History className="w-5 h-5 mr-2 text-purple-600" />
                <h3 className="font-bold text-base text-gray-900">Recent Prompts</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {history.slice(0, MAX_HISTORY).map((item, idx) => (
                  <button
                    key={item.prompt + idx}
                    onClick={() => handlePromptHistoryClick(item)}
                    className="bg-gray-50 border border-gray-200 hover:border-purple-300 rounded-lg px-3 py-1.5 font-medium text-xs text-gray-900 shadow-sm hover:bg-purple-50 transition-all text-left"
                  >
                    <span className="max-w-[20ch] inline-block truncate">{item.prompt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* FAVORITES SECTION */}
      {favoriteList.length > 0 && (
        <div className="mx-auto max-w-3xl w-full mb-6">
          <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-5">
            <div className="flex items-center mb-3">
              <Star className="h-5 w-5 mr-2 text-amber-500 fill-amber-500" />
              <h3 className="font-bold text-base text-gray-900">Favorites</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {favoriteList.map((item, idx) => (
                <div
                  className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 flex flex-col relative"
                  key={item.response.slice(0, 30) + idx}
                >
                  <div className="font-semibold text-gray-900 text-sm mb-1 pr-6 line-clamp-1">{item.prompt}</div>
                  <button
                    className="absolute right-2 top-2 focus:outline-none"
                    aria-label="Remove Favorite"
                    onClick={() => removeFavorite(item)}
                  >
                    <HeartOff className="h-4 w-4 text-gray-400 hover:text-rose-600 transition" />
                  </button>
                  <div className="text-gray-700 line-clamp-3 text-xs mt-1">
                    {item.response.replace(/[#*`_]/g, "")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="h-8"></div>
    </div>
  );
}
