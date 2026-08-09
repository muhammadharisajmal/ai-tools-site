"use client";

import React, { useState, FormEvent } from "react";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto my-12 px-4">
      {/* Decorative Gradient Background Blur */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-fuchsia-600/20 to-indigo-600/20 blur-3xl rounded-3xl pointer-events-none -z-10" />

      {/* Glassmorphism Card */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 sm:p-12 shadow-2xl text-center space-y-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300">
            <Mail className="w-3.5 h-3.5" />
            <span>Weekly Academic Insights</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Stay Updated with AI Study Hub
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            Get the latest AI tools, study tips, coding tutorials, research guides, and productivity articles delivered directly to your inbox.
          </p>
        </div>

        {/* Subscription Form / Success State */}
        {submitted ? (
          <div className="py-6 px-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl max-w-md mx-auto flex items-center justify-center gap-2 text-emerald-300 font-bold text-base sm:text-lg animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Thanks for subscribing!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-3" noValidate>
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <div className="relative w-full flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter your email address"
                  aria-label="Email address for newsletter"
                  className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/80 border text-white placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 transition-all duration-300 shadow-inner ${
                    error
                      ? "border-rose-500/80 focus:ring-rose-500/20"
                      : "border-slate-800 focus:border-purple-500/80 focus:ring-purple-500/20"
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                Subscribe
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center justify-center gap-1.5 text-rose-400 text-xs font-semibold pt-1 animate-shake">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}
          </form>
        )}

        {/* Privacy Text */}
        <p className="text-xs text-slate-400 font-medium">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}