"use client";

import Link from "next/link";
import { Lock, Sparkles, ArrowRight, X } from "lucide-react";

interface ToolAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolName: string;
  redirectUrl: string;
}

export default function ToolAuthModal({
  isOpen,
  onClose,
  toolName,
  redirectUrl,
}: ToolAuthModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl text-center space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-fuchsia-500/20 border border-purple-500/30 flex items-center justify-center mx-auto text-fuchsia-400">
          <Lock className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            Authentication Required
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            To generate live outputs using the <strong className="text-purple-300">{toolName}</strong>, please sign in or create a free student account.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-fuchsia-400 flex-shrink-0" />
          <span>Includes free access to all 5 AI Academic Assistants</span>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <Link
            href={`/login?callbackUrl=${encodeURIComponent(redirectUrl)}`}
            className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <span>Sign In to Continue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/signup"
            className="w-full py-3 px-5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-slate-200 hover:text-white font-semibold text-xs hover:bg-slate-800 transition-all text-center"
          >
            Create Free Account
          </Link>
        </div>
      </div>
    </div>
  );
}