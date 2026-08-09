import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EditProfileModal from "@/components/profile/edit-profile-modal";
import ChangePasswordModal from "@/components/profile/change-password-modal";
import {
  ArrowLeft,
  User,
  Mail,
  ShieldCheck,
  Calendar,
  Sparkles,
  MessageSquare,
  Bookmark,
  HelpCircle,
  Layers,
  Lock,
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

export default async function ProfilePage() {
  const session = await auth();

  // Redirect to login if user is not authenticated
  if (!session || !session.user) {
    redirect("/login");
  }

  const user = session.user;
  const userName = user.name || "Student";
  const userEmail = user.email || "student@aistudyhub.com";
  const userImage = user.image;
  const loginProvider = userImage ? "Google Account" : "Email Account";

  // Fetch real user creation date from Prisma
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      createdAt: true,
      name: true,
    },
  });

  const displayName = dbUser?.name || userName;

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

        {/* PROFILE HEADER CARD */}
        <section className="relative overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-800/80 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Profile Picture */}
            <div className="relative flex-shrink-0">
              {userImage ? (
                <img
                  src={userImage}
                  alt={displayName}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-xl"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-fuchsia-500 p-0.5 shadow-xl">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-white font-extrabold text-3xl">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}
              <span
                className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-slate-950 rounded-full"
                title="Active Profile"
              />
            </div>

            {/* Profile Info */}
            <div className="space-y-1.5 flex-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 bg-purple-500/10 px-3 py-0.5 rounded-full border border-purple-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Student Profile</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {displayName}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 font-mono flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{userEmail}</span>
              </p>
            </div>
          </div>

          {/* User Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
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
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> Member Status
              </span>
              <span className="text-xs font-bold text-emerald-400 block">
                Free Plan
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
          </div>
        </section>

        {/* STATISTICS CARDS (PLACEHOLDERS) */}
        <section className="space-y-4">
          <div className="border-b border-slate-800/80 pb-3">
            <h2 className="text-lg font-extrabold text-white tracking-tight">
              Study Activity Overview
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Personal usage statistics across AI Study Hub modules.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-800/80 flex items-center justify-between shadow-lg">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 block font-medium">
                  AI Chats
                </span>
                <span className="text-2xl font-black text-white">0</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <MessageSquare className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-800/80 flex items-center justify-between shadow-lg">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 block font-medium">
                  Saved Notes
                </span>
                <span className="text-2xl font-black text-white">0</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400">
                <Bookmark className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-800/80 flex items-center justify-between shadow-lg">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 block font-medium">
                  Quiz Generated
                </span>
                <span className="text-2xl font-black text-white">0</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <HelpCircle className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-800/80 flex items-center justify-between shadow-lg">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 block font-medium">
                  Flashcards
                </span>
                <span className="text-2xl font-black text-white">0</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Layers className="w-5 h-5" />
              </div>
            </div>
          </div>
        </section>

        {/* PROFILE ACTIONS */}
        <section className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-4 shadow-xl">
          <div className="border-b border-slate-800/80 pb-3">
            <h2 className="text-base font-extrabold text-white">
              Account Management
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Profile customization and security settings.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
          <ChangePasswordModal />

            {/* Client Component Modal Trigger */}
            <EditProfileModal initialName={displayName} />
          </div>
        </section>
      </main>
    </div>
  );
}