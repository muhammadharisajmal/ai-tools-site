"use client";

import { useState, FormEvent } from "react";
import {
  Globe,
  Sliders,
  ShieldAlert,
  Bell,
  CheckCircle2,
  AlertCircle,
  Save,
} from "lucide-react";

export interface SystemSettingsData {
  siteName: string;
  supportEmail: string;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  defaultRole: string;
  requireEmailVerification: boolean;
  systemNotice: string;
}

interface SettingsFormProps {
  initialSettings: SystemSettingsData;
}

export default function SettingsForm({ initialSettings }: SettingsFormProps) {
  // Form States
  const [siteName, setSiteName] = useState(initialSettings.siteName);
  const [supportEmail, setSupportEmail] = useState(initialSettings.supportEmail);
  const [maintenanceMode, setMaintenanceMode] = useState(initialSettings.maintenanceMode);
  const [allowRegistration, setAllowRegistration] = useState(initialSettings.allowRegistration);
  const [defaultRole, setDefaultRole] = useState(initialSettings.defaultRole);
  const [requireEmailVerification, setRequireEmailVerification] = useState(
    initialSettings.requireEmailVerification
  );
  const [systemNotice, setSystemNotice] = useState(initialSettings.systemNotice);

  // Status & Feedback States
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setToastMessage(null);
    setErrorMessage(null);

    if (!siteName.trim()) {
      setErrorMessage("Website name cannot be empty.");
      return;
    }

    if (!supportEmail.trim() || !supportEmail.includes("@")) {
      setErrorMessage("Please enter a valid support email address.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          siteName: siteName.trim(),
          supportEmail: supportEmail.trim(),
          maintenanceMode,
          allowRegistration,
          defaultRole,
          requireEmailVerification,
          systemNotice: systemNotice.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to save settings.");
      }

      setToastMessage("System settings updated successfully.");
      setTimeout(() => {
        setToastMessage(null);
      }, 4000);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "An unexpected error occurred while saving."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert Notice */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-3 backdrop-blur-2xl shadow-2xl animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Error Alert Notice */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-medium flex items-center gap-2.5 animate-fadeIn">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* SECTION 1: GENERAL SYSTEM CONFIGURATION */}
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-6 shadow-xl">
          <div className="border-b border-slate-800/80 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-400" />
              <h2 className="text-base font-extrabold text-white">General Information</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              Core Identity
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="siteName"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
              >
                Website Name
              </label>
              <input
                id="siteName"
                type="text"
                disabled={isSaving}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-slate-800 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all disabled:opacity-50"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="supportEmail"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
              >
                System Support Email
              </label>
              <input
                id="supportEmail"
                type="email"
                disabled={isSaving}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-slate-800 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all disabled:opacity-50"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: ACCESS & SECURITY SETTINGS */}
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-6 shadow-xl">
          <div className="border-b border-slate-800/80 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-400" />
              <h2 className="text-base font-extrabold text-white">Access & Security Rules</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              Authentication Gate
            </span>
          </div>

          <div className="space-y-4">
            {/* Maintenance Mode Toggle */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="space-y-0.5 pr-4">
                <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5 select-none cursor-pointer">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span>Maintenance Mode</span>
                </label>
                <p className="text-[11px] text-slate-400 leading-relaxed select-none">
                  When active, non-admin access is restricted and a maintenance screen is displayed.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={maintenanceMode}
                disabled={isSaving}
                onClick={() => setMaintenanceMode((prev) => !prev)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  maintenanceMode ? "bg-amber-500" : "bg-slate-800"
                } disabled:opacity-50`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
                    maintenanceMode ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Allow User Sign-Ups Toggle */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="space-y-0.5 pr-4">
                <label className="text-xs font-bold text-slate-200 block select-none cursor-pointer">
                  Allow Public User Registration
                </label>
                <p className="text-[11px] text-slate-400 leading-relaxed select-none">
                  Toggle whether new users can register via Credentials or Google OAuth.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={allowRegistration}
                disabled={isSaving}
                onClick={() => setAllowRegistration((prev) => !prev)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  allowRegistration ? "bg-gradient-to-r from-indigo-500 to-fuchsia-500" : "bg-slate-800"
                } disabled:opacity-50`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
                    allowRegistration ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Force Email Verification Toggle */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="space-y-0.5 pr-4">
                <label className="text-xs font-bold text-slate-200 block select-none cursor-pointer">
                  Require Email Verification
                </label>
                <p className="text-[11px] text-slate-400 leading-relaxed select-none">
                  Require credential signups to verify their email via Resend before accessing AI tools.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={requireEmailVerification}
                disabled={isSaving}
                onClick={() => setRequireEmailVerification((prev) => !prev)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  requireEmailVerification ? "bg-gradient-to-r from-indigo-500 to-fuchsia-500" : "bg-slate-800"
                } disabled:opacity-50`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
                    requireEmailVerification ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Default Registration Role */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <label
                htmlFor="defaultRole"
                className="block text-xs font-bold text-slate-200"
              >
                Default New User Role
              </label>
              <select
                id="defaultRole"
                disabled={isSaving}
                value={defaultRole}
                onChange={(e) => setDefaultRole(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 text-white border border-slate-800 text-xs outline-none focus:border-indigo-500 transition-all disabled:opacity-50"
              >
                <option value="USER">USER (Standard Student Access)</option>
                <option value="ADMIN">ADMIN (Privileged Operational Access)</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 3: SYSTEM ANNOUNCEMENT BANNER */}
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-6 shadow-xl">
          <div className="border-b border-slate-800/80 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-fuchsia-400" />
              <h2 className="text-base font-extrabold text-white">Global Banner Notice</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              Broadcast Banner
            </span>
          </div>

          <div>
            <label
              htmlFor="systemNotice"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
            >
              System Announcement Bar Text
            </label>
            <textarea
              id="systemNotice"
              rows={3}
              disabled={isSaving}
              placeholder="e.g. Scheduled system maintenance tonight at 02:00 UTC. AI models will remain accessible..."
              className="w-full p-4 rounded-xl bg-slate-950 text-white border border-slate-800 text-xs outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-y leading-relaxed disabled:opacity-50 placeholder:text-slate-600"
              value={systemNotice}
              onChange={(e) => setSystemNotice(e.target.value)}
            />
            <p className="mt-1.5 text-[11px] text-slate-500 italic">
              Leave empty to hide the global notification banner across student dashboards.
            </p>
          </div>
        </div>

        {/* SUBMIT BUTTON BAR */}
        <div className="flex items-center justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Saving System Configuration...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save System Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}