"use client";

import Link from "next/link";

export default function ForgotPasswordForm() {
  return (
    <form className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Email Address
        </label>

        <input
          type="email"
          placeholder="Enter your registered email"
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-purple-500"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white transition hover:bg-purple-700"
      >
        Send Reset Link
      </button>

      <p className="text-center text-sm text-slate-400">
        Remember your password?{" "}
        <Link
          href="/login"
          className="font-medium text-purple-400 hover:text-purple-300"
        >
          Back to Login
        </Link>
      </p>
    </form>
  );
}