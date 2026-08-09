import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import NotificationSwitch from "@/components/settings/notification-switch";
import {
  ArrowLeft,
  Settings as SettingsIcon,
  User,
  Mail,
  ShieldCheck,
  Calendar,
  Sparkles,
  Bell,
  Lock,
  KeyRound,
  History,
  ShieldAlert,
  Download,
  Trash2,
  Info,
  ExternalLink,
  FileText,
  HelpCircle,
} from "lucide-react";

// Synchronized Background: Dark Navy theme with ambient glows and grid overlay
function AnimatedGradientBg() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-950"
      aria-hidden="true"
    >
      {/* Primary Cyan/Indigo ambient radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

      {/* Floating ambient light orbs */}
      <div className="absolute -top-32 -left-20 w-[30rem] h-[30rem] bg-gradient-to-tr from-fuchsia-600/20 via-violet-600/15 to-indigo-500/15 rounded-full blur-3xl opacity-50" />
      <div className="absolute top-1/3 -right-20 w-[28rem] h-[28rem] bg-gradient-to-b from-blue-600/15 via-cyan-500/15 to-violet-600/15 rounded-full blur-3xl opacity-40" />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
}

export default async function SettingsPage() {
  const session = await auth();

  // Redirect unauthenticated users to login
  if (!session || !session.user) {
    redirect("/login");
  }

  const user = session.user;
  const userImage = user.image;
  const loginProvider = userImage ? "Google Account" : "Email Account";

  // Query database for current display name and creation date
  const dbUser = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      createdAt: true,
      name: true,
      email: true,
  
      studyTipsEmails: true,
      weeklySummaryEmails: true,
      productUpdatesEmails: true,
      aiAnnouncementsEmails: true,
    },
  });

  const displayName = dbUser?.name || user.name || "Student";
  const displayEmail = dbUser?.email || user.email || "student@aistudyhub.com";

  const memberSince = dbUser?.createdAt
    ? new Date(dbUser.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Unknown";

  return (
    <div className="relative min-h-screen font-sans bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white antialiased">
      <AnimatedGradientBg />

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
        {/* Navigation Back Link */}
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800 backdrop-blur-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* SETTINGS PAGE HEADER */}
        <section className="relative overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-800/80 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
              <SettingsIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 bg-purple-500/10 px-3 py-0.5 rounded-full border border-purple-500/20 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Account Preferences</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Settings
              </h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1">
            Manage your profile information, email notifications, privacy options, and security settings.
          </p>
        </section>

        {/* SECTION 1: ACCOUNT INFORMATION (READ ONLY) */}
        <section className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-6 shadow-xl">
          <div className="border-b border-slate-800/80 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-400" />
              <h2 className="text-base font-extrabold text-white">
                Account Information
              </h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              Read Only
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-2">
            <div className="relative flex-shrink-0">
              {userImage ? (
                <img
                  src={userImage}
                  alt={displayName}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-xl"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-fuchsia-500 p-0.5 shadow-xl">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-white font-extrabold text-2xl">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white tracking-tight">
                {displayName}
              </h3>
              <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{displayEmail}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-950/60 border border-slate-800/80 px-4 py-3 rounded-2xl space-y-1">
              <span className="text-[10px] uppercase font-mono text-slate-500 flex items-center gap-1">
                <User className="w-3 h-3 text-indigo-400" /> Login Provider
              </span>
              <span className="text-xs font-bold text-slate-200 block">
                {loginProvider}
              </span>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 px-4 py-3 rounded-2xl space-y-1">
              <span className="text-[10px] uppercase font-mono text-slate-500 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-purple-400" /> Member Since
              </span>
              <span className="text-xs font-bold text-slate-200 block">
                {memberSince}
              </span>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 px-4 py-3 rounded-2xl space-y-1">
              <span className="text-[10px] uppercase font-mono text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> Current Plan
              </span>
              <span className="text-xs font-bold text-emerald-400 block">
                Free Student Plan
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 2: EMAIL NOTIFICATIONS */}
        <section className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-5 shadow-xl">
          <div className="border-b border-slate-800/80 pb-3 flex items-center gap-2">
            <Bell className="w-4 h-4 text-fuchsia-400" />
            <h2 className="text-base font-extrabold text-white">
              Email Notifications
            </h2>
          </div>

          <div className="space-y-3">
          <NotificationSwitch
  id="studyTipsEmails"
  title="Study Tips & Guides"
  description="Receive weekly AI prompt techniques, study scheduling tips, and learning strategies."
  defaultChecked={dbUser?.studyTipsEmails ?? true}
/>

<NotificationSwitch
  id="weeklySummaryEmails"
  title="Weekly Summary"
  description="Get an automated digest summarizing your study progress and generated notes."
  defaultChecked={dbUser?.weeklySummaryEmails ?? true}
/>

<NotificationSwitch
  id="productUpdatesEmails"
  title="Product Updates"
  description="Stay updated when new AI tools, features, and platform updates are released."
  defaultChecked={dbUser?.productUpdatesEmails ?? true}
/>

<NotificationSwitch
  id="aiAnnouncementsEmails"
  title="AI Announcements"
  description="Important news regarding AI model upgrades, capacity adjustments, and system status."
  defaultChecked={dbUser?.aiAnnouncementsEmails ?? false}
/>
          </div>
        </section>

        {/* SECTION 3: SECURITY */}
        <section className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-5 shadow-xl">
          <div className="border-b border-slate-800/80 pb-3 flex items-center gap-2">
            <Lock className="w-4 h-4 text-purple-400" />
            <h2 className="text-base font-extrabold text-white">Security</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Change Password - Routes to /profile */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-2">
                  <KeyRound className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-200 block">
                  Change Password
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Update your account password safely via your profile modal.
                </p>
              </div>

              <Link
                href="/profile"
                className="w-full text-center py-2 px-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white rounded-xl font-bold text-xs shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                Change Password
              </Link>
            </div>

            {/* Manage Sessions */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-2">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-200 block">
                  Active Sessions
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Review devices currently logged into your student account.
                </p>
              </div>

              <button
                disabled
                type="button"
                className="w-full py-2 px-3 bg-slate-900 border border-slate-800/80 text-indigo-300 rounded-xl font-mono font-semibold text-[11px] cursor-not-allowed opacity-75"
              >
                1 Session Active
              </button>
            </div>

            {/* Password Change History */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-2">
                  <History className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-200 block">
                  Password Audit
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Historical security log of recent password updates.
                </p>
              </div>

              <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/80 text-[10px] font-mono text-slate-400 text-center">
                Last Changed: <span className="text-slate-300">Recently</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: PRIVACY */}
        <section className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-5 shadow-xl">
          <div className="border-b border-slate-800/80 pb-3 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <h2 className="text-base font-extrabold text-white">Privacy</h2>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Manage your stored personal data, exported records, and account deletion options.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Download Data */}
            <div className="w-full sm:w-auto flex-1 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-300 block">
                    Export Profile Data
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    Download a JSON copy of your account data
                  </span>
                </div>
              </div>
              <button
                disabled
                type="button"
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800/80 text-[10px] font-mono font-semibold text-slate-500 cursor-not-allowed"
              >
                Download Data
              </button>
            </div>

            {/* Delete Account */}
            <div className="w-full sm:w-auto flex-1 p-4 rounded-2xl bg-red-950/20 border border-red-500/20 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                  <Trash2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-red-300 block">
                    Delete Account
                  </span>
                  <span className="text-[10px] text-red-400/70 block">
                    Permanently erase account & data
                  </span>
                </div>
              </div>
              <button
                disabled
                type="button"
                className="px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-[10px] font-mono font-semibold text-red-400 cursor-not-allowed"
              >
                Delete Account
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 5: ABOUT */}
        <section className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-5 shadow-xl">
          <div className="border-b border-slate-800/80 pb-3 flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan-400" />
            <h2 className="text-base font-extrabold text-white">
              About AI Study Hub
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                System Metadata
              </span>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Current Version:</span>
                <span className="font-mono font-bold text-slate-200">v1.2.0-stable</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Build Target:</span>
                <span className="font-mono font-bold text-slate-200">Production</span>
              </div>
              <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-800/60">
                <span className="text-slate-400">Support Email:</span>
                <a
                  href="mailto:support@aistudyhub.com"
                  className="font-mono text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  support@aistudyhub.com
                </a>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                Legal & Governance
              </span>
              <div className="flex flex-col gap-2">
                <Link
                  href="/learn-more"
                  className="inline-flex items-center justify-between text-xs font-medium text-slate-300 hover:text-white transition-colors p-2 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-indigo-400" /> Privacy Policy
                  </span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </Link>
                <Link
                  href="/learn-more"
                  className="inline-flex items-center justify-between text-xs font-medium text-slate-300 hover:text-white transition-colors p-2 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-3.5 h-3.5 text-purple-400" /> Terms of Service
                  </span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}