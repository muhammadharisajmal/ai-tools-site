export const dynamic = "force-dynamic";
export const revalidate = 0;


import Link from "next/link";
import { auth } from "@/auth";
import LogoutButton from "@/components/auth/logout-button";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  Sparkles,
  Wrench,
  Settings,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  MessageSquare,
  HelpCircle,
  FileText,
  Layers,
  Calendar,
  FileCheck2,
  History,
  Bookmark,
  TrendingUp,
  User,
  Activity,
  Check,
  Zap,
  Lock,
} from "lucide-react";

function AnimatedGradientBg() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-950"
      aria-hidden="true"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -top-32 -left-20 w-[30rem] h-[30rem] bg-gradient-to-tr from-fuchsia-600/20 via-violet-600/15 to-indigo-500/15 rounded-full blur-3xl opacity-50" />
      <div className="absolute top-1/3 -right-20 w-[28rem] h-[28rem] bg-gradient-to-b from-blue-600/15 via-cyan-500/15 to-violet-600/15 rounded-full blur-3xl opacity-40" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
}

export default async function DashboardPage() {
  const session = await auth();

  // 1. Unauthenticated users are redirected to login
  if (!session?.user) {
    redirect("/login");
  }

  // 2. Strict Defense-in-Depth: Administrators visiting /dashboard are redirected to /admin
  if (session.user.role === "ADMIN") {
    redirect("/admin");
  }

  const dbUser = session?.user?.id
    ? await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
        select: {
          name: true,
          email: true,
          image: true,
        },
      })
    : null;

  const user = session.user;
  const userName = dbUser?.name ?? user?.name ?? "Student";
  const userEmail = dbUser?.email ?? user?.email ?? "student@aistudyhub.com";
  const userImage = dbUser?.image ?? user?.image;
  const authMethod = userImage ? "Google OAuth" : "Email Credentials";

  const upcomingFeatures = [
    {
      title: "AI Chat",
      description: "Interactive conversational tutor for Q&A and derivations.",
      icon: <MessageSquare className="w-5 h-5 text-slate-500" />,
    },
    {
      title: "Quiz Generator",
      description: "Generate practice test quizzes directly from study notes.",
      icon: <HelpCircle className="w-5 h-5 text-slate-500" />,
    },
    {
      title: "Notes Generator",
      description: "Synthesize lecture transcripts into structured outlines.",
      icon: <FileText className="w-5 h-5 text-slate-500" />,
    },
    {
      title: "Flashcards",
      description: "Convert textbook chapters into active recall memory decks.",
      icon: <Layers className="w-5 h-5 text-slate-500" />,
    },
    {
      title: "Study Planner",
      description: "Organize subjects, exam preparation, and study routines.",
      icon: <Calendar className="w-5 h-5 text-slate-500" />,
    },
    {
      title: "Summarizer",
      description: "Extract executive summaries and bullet points from PDFs.",
      icon: <FileCheck2 className="w-5 h-5 text-slate-500" />,
    },
    {
      title: "History",
      description: "Track and review all past AI interactions and generated files.",
      icon: <History className="w-5 h-5 text-slate-500" />,
    },
    {
      title: "Favorites",
      description: "Bookmark frequently used prompts, guides, and output templates.",
      icon: <Bookmark className="w-5 h-5 text-slate-500" />,
    },
    {
      title: "Analytics",
      description: "Visualize study streak performance and learning statistics.",
      icon: <TrendingUp className="w-5 h-5 text-slate-500" />,
    },
    {
      title: "Profile Management",
      description: "Custom user settings, study preferences, and avatar customization.",
      icon: <User className="w-5 h-5 text-slate-500" />,
    },
  ];

  return (
    <div className="relative min-h-screen font-sans bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white antialiased">
      <AnimatedGradientBg />
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
        <section className="relative overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-800/80 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative flex-shrink-0">
                {userImage ? (
                  <img
                    src={userImage}
                    alt={userName}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-lg"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-fuchsia-500 p-0.5 shadow-xl">
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-white font-extrabold text-2xl">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                  </div>
                )}
                <span
                  className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full"
                  title="Session Active"
                />
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 bg-purple-500/10 px-3 py-0.5 rounded-full border border-purple-500/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Student Control Panel</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Welcome back, {userName}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 font-mono">
                  {userEmail}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="bg-slate-950/60 border border-slate-800/80 px-4 py-2.5 rounded-2xl flex-1 sm:flex-none">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">
                  Auth Method
                </span>
                <span className="text-xs font-bold text-indigo-300">
                  {authMethod}
                </span>
              </div>
              <div className="bg-slate-950/60 border border-slate-800/80 px-4 py-2.5 rounded-2xl flex-1 sm:flex-none">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">
                  Account Status
                </span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Active
                </span>
              </div>
              <div className="bg-slate-950/60 border border-slate-800/80 px-4 py-2.5 rounded-2xl flex-1 sm:flex-none">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">
                  Current Plan
                </span>
                <span className="text-xs font-bold text-purple-300">
                  Free Student Plan
                </span>
              </div>
              <LogoutButton />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="border-b border-slate-800/80 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-400" />
                <span>Your Workspace</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Active tools and personal account controls available in your workspace.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500 hidden sm:inline-block">
              3 Modules Active
            </span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group relative bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-800/80 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 transition-transform group-hover:scale-105">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Available
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  AI Tools
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 font-normal">
                  Browse all AI tools currently available on AI Study Hub.
                </p>
              </div>
              <Link
                href="/tools/workplace"
                className="w-full text-center py-2.5 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-1.5"
              >
                <span>Open AI Tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="group relative bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-800/80 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 transition-transform group-hover:scale-105">
                    <Settings className="w-6 h-6" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  My Account
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 font-normal">
                  Manage your personal profile, credentials, and settings.
                </p>
              </div>
              <Link
                href="/settings"
                className="w-full text-center py-2.5 px-4 bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white rounded-xl font-bold text-xs border border-slate-700/80 hover:border-slate-600 transition-all duration-200 flex items-center justify-center gap-1.5"
              >
                <span>Open Settings</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="group relative bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-800/80 transition-all duration-300 shadow-xl flex flex-col justify-between sm:col-span-2 lg:col-span-1">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    System Normal
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Platform Status
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 font-normal">
                  View your account verification and system operational status.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Authentication:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Database Connection:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-5 border border-slate-800/80 space-y-1 shadow-md">
            <span className="text-xs text-slate-400 block font-medium">
              Account Status
            </span>
            <span className="text-lg font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Active
            </span>
            <span className="text-[10px] text-slate-500 font-mono block">
              Verified Student Account
            </span>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-5 border border-slate-800/80 space-y-1 shadow-md">
            <span className="text-xs text-slate-400 block font-medium">
              Authentication
            </span>
            <span className="text-lg font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400" /> Connected
            </span>
            <span className="text-[10px] text-slate-500 font-mono block">
              {authMethod}
            </span>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-5 border border-slate-800/80 space-y-1 shadow-md">
            <span className="text-xs text-slate-400 block font-medium">
              Membership
            </span>
            <span className="text-lg font-bold text-purple-300 block">
              Free Student Plan
            </span>
            <span className="text-[10px] text-slate-500 font-mono block">
              100% Free Plan
            </span>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-5 border border-slate-800/80 space-y-1 shadow-md">
            <span className="text-xs text-slate-400 block font-medium">
              Last Login
            </span>
            <span className="text-lg font-bold text-white flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-purple-400" /> Today
            </span>
            <span className="text-[10px] text-slate-500 font-mono block">
              Session Active Now
            </span>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-400" />
                <span>Recent Activity</span>
              </h2>
              <span className="text-[10px] font-mono text-slate-500">
                Database Log
              </span>
            </div>
            <div className="py-12 text-center bg-slate-950/50 rounded-2xl border border-slate-800/50">
              <p className="text-xs sm:text-sm text-slate-400 font-medium">
                No activity yet.
              </p>
              <p className="text-[11px] text-slate-600 mt-1 max-w-xs mx-auto">
                This section will display your personal history once tools connect to the database.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-4 shadow-xl">
            <div className="border-b border-slate-800/80 pb-3">
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Platform News</span>
              </h2>
            </div>
            <div className="space-y-4 relative before:absolute before:inset-0 before:left-2.5 before:w-0.5 before:bg-slate-800">
              <div className="relative pl-7 space-y-0.5">
                <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
                <span className="text-xs font-bold text-white block">
                  Authentication Completed
                </span>
                <span className="text-[11px] text-slate-400 block">
                  Secure Auth.js v5 credentials and account system active.
                </span>
              </div>
              <div className="relative pl-7 space-y-0.5">
                <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/40">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
                <span className="text-xs font-bold text-white block">
                  Google Login Enabled
                </span>
                <span className="text-[11px] text-slate-400 block">
                  Single-click Google OAuth authentication supported.
                </span>
              </div>
              <div className="relative pl-7 space-y-0.5">
                <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-400/40">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
                <span className="text-xs font-bold text-white block">
                  AI Tools Available
                </span>
                <span className="text-[11px] text-slate-400 block">
                  Curated directory of external AI tools and student guides published.
                </span>
              </div>
              <div className="relative pl-7 space-y-0.5">
                <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center border border-slate-700">
                  <Clock className="w-3 h-3" />
                </div>
                <span className="text-xs font-bold text-slate-400 block">
                  More AI Features Coming Soon
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Interactive flashcards, quiz generators, and AI chat in development.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="border-b border-slate-800/80 pb-3">
            <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" />
              <span>Upcoming Features</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Interactive study modules currently under active development.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingFeatures.map((item) => (
              <div
                key={item.title}
                className="bg-slate-900/30 backdrop-blur-xl rounded-2xl p-6 border border-slate-800/50 flex flex-col justify-between space-y-4 opacity-70 hover:opacity-85 transition-opacity cursor-not-allowed"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" /> Coming Soon
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-300 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="w-full text-center py-2 px-3 bg-slate-950/80 border border-slate-800/80 text-slate-600 rounded-xl font-mono text-[11px]">
                  Under Development
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white">AI Study Hub</span>
            <span>• Protected Student Control Panel</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>Profile</span>
            </Link>
            <Link
              href="/settings"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Settings</span>
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}