import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search blog articles...",
}: SearchBarProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
        <Search className="w-5 h-5 transition-colors group-focus-within:text-purple-400" />
      </div>

      {/* Search Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search articles"
        className="w-full pl-11 pr-11 py-3.5 sm:py-4 rounded-full bg-slate-900/60 backdrop-blur-xl border border-slate-800 focus:border-purple-500/80 text-white placeholder-slate-400 text-sm sm:text-base font-medium focus:outline-none focus:ring-4 focus:ring-purple-500/20 shadow-xl transition-all duration-300"
      />

      {/* Clear Button (X) */}
      {value.trim().length > 0 && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search input"
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
        >
          <div className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors">
            <X className="w-4 h-4" />
          </div>
        </button>
      )}
    </div>
  );
}