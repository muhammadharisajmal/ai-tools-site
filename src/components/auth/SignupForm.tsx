"use client";

import Link from "next/link";
import PasswordInput from "./PasswordInput";

export default function SignupForm() {
  return (
    <form className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Full Name
        </label>

        <input
          type="text"
          placeholder="Enter your full name"
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-purple-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-purple-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Password
        </label>

        <PasswordInput
          id="signup-password"
          name="password"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white transition hover:bg-purple-700"
      >
        Create Account
      </button>

      <p className="text-center text-sm text-slate-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-purple-400 hover:text-purple-300"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}