"use client";

import Link from "next/link";
import { ArrowLeft, LayoutDashboard } from "lucide-react";

export default function WorkspaceTopbar({ toolName }: { toolName: string }) {
  return (
    <div className="w-full bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 px-6 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </Link>
        <span className="text-slate-600">/</span>
        <span className="text-xs font-mono font-bold text-purple-400">{toolName}</span>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>All Tools</span>
        </Link>
      </div>
    </div>
  );
}