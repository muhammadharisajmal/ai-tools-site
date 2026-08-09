export const dynamic = "force-dynamic";
export const revalidate = 0;


import Link from "next/link";
import { auth } from "@/auth";
import LogoutButton from "@/components/auth/logout-button";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  Users,
  ShieldCheck,
  UserCheck,
  UserX,
  Send,
  Bell,
  Sparkles,
  TrendingUp,
  Activity,
  ArrowRight,
  Settings,
  BarChart3,
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

export default async function AdminDashboardPage() {
  const session = await auth();

  // 1. Unauthenticated users are redirected to login
  if (!session?.user) {
    redirect("/login?admin=true");
  }

  // 2. Strict Defense-in-Depth: Non-ADMIN users are redirected to student dashboard
  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [
    totalUsers,
    verifiedUsers,
    unverifiedUsers,
    adminUsers,
    newUsersToday,
    newUsersThisWeek,
    googleAccounts,
    credentialAccounts,
    studyTipsSubscribers,
    weeklySummarySubscribers,
    productUpdatesSubscribers,
    aiAnnouncementSubscribers,
    recentUsers,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { emailVerified: { not: null } } }),
    prisma.user.count({ where: { emailVerified: null } }),
    prisma.user.count({ where: { role: "ADMIN" } }),
    prisma.user.count({ where: { createdAt: { gte: startOfToday } } }),
    prisma.user.count({ where: { createdAt: { gte: startOfWeek } } }),
    prisma.user.count({ where: { image: { not: null } } }),
    prisma.user.count({ where: { image: null } }),
    prisma.user.count({ where: { studyTipsEmails: true } }),
    prisma.user.count({ where: { weeklySummaryEmails: true } }),
    prisma.user.count({ where: { productUpdatesEmails: true } }),
    prisma.user.count({ where: { aiAnnouncementsEmails: true } }),
    prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
      },
    }),
  ]);

  return (
    <div className="relative min-h-screen font-sans bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white antialiased">
      <AnimatedGradientBg />
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
        <section className="relative overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-800/80 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 bg-purple-500/10 px-3 py-0.5 rounded-full border border-purple-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Executive Command Center</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Admin Operations
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 font-mono">
                System Health, User Metrics & Platform Controls
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/admin/users"
                className="px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-indigo-500/50 transition-all flex items-center gap-1.5"
              >
                <Users className="w-3.5 h-3.5 text-indigo-400" />
                <span>Users</span>
              </Link>
              <Link
                href="/admin/analytics"
                className="px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-purple-500/50 transition-all flex items-center gap-1.5"
              >
                <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
                <span>Analytics</span>
              </Link>
              <Link
                href="/admin/email"
                className="px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-fuchsia-500/50 transition-all flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-fuchsia-400" />
                <span>Email Center</span>
              </Link>
              <Link
                href="/admin/settings"
                className="px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-cyan-500/50 transition-all flex items-center gap-1.5"
              >
                <Settings className="w-3.5 h-3.5 text-cyan-400" />
                <span>Settings</span>
              </Link>
              <LogoutButton />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="border-b border-slate-800/80 pb-3 flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              <span>User Base Breakdown</span>
            </h2>
            <span className="text-xs font-mono text-slate-500">Live Database Metrics</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-800/80 space-y-2 shadow-lg">
              <span className="text-xs text-slate-400 block font-medium">Total Registered</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-white">{totalUsers}</span>
                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                  Accounts
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">Total DB Registrations</p>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-800/80 space-y-2 shadow-lg">
              <span className="text-xs text-slate-400 block font-medium">Email Verified</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-emerald-400">{verifiedUsers}</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                  <UserCheck className="w-3 h-3" /> Confirmed
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">Verified Email Addresses</p>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-800/80 space-y-2 shadow-lg">
              <span className="text-xs text-slate-400 block font-medium">Unverified</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-amber-400">{unverifiedUsers}</span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 flex items-center gap-1">
                  <UserX className="w-3 h-3" /> Pending
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">Awaiting Verification</p>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-800/80 space-y-2 shadow-lg">
              <span className="text-xs text-slate-400 block font-medium">Administrators</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-purple-400">{adminUsers}</span>
                <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Privileged
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">Role == ADMIN</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="border-b border-slate-800/80 pb-3 flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <span>Velocity & Authentication Methods</span>
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-800/80 space-y-2 shadow-lg">
              <span className="text-xs text-slate-400 block font-medium">New Today</span>
              <span className="text-2xl font-black text-white">{newUsersToday}</span>
              <span className="text-[11px] text-slate-500 font-mono block">Registered since 00:00 UTC</span>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-800/80 space-y-2 shadow-lg">
              <span className="text-xs text-slate-400 block font-medium">New This Week</span>
              <span className="text-2xl font-black text-white">{newUsersThisWeek}</span>
              <span className="text-[11px] text-slate-500 font-mono block">Past 7 calendar days</span>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-800/80 space-y-2 shadow-lg">
              <span className="text-xs text-slate-400 block font-medium">Google OAuth Accounts</span>
              <span className="text-2xl font-black text-cyan-400">{googleAccounts}</span>
              <span className="text-[11px] text-slate-500 font-mono block">Social Authentication</span>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-800/80 space-y-2 shadow-lg">
              <span className="text-xs text-slate-400 block font-medium">Credential Accounts</span>
              <span className="text-2xl font-black text-fuchsia-400">{credentialAccounts}</span>
              <span className="text-[11px] text-slate-500 font-mono block">Email & Password Auth</span>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="border-b border-slate-800/80 pb-3 flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
              <Bell className="w-5 h-5 text-fuchsia-400" />
              <span>Notification Audience Reach</span>
            </h2>
            <Link
              href="/admin/email"
              className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
            >
              <span>Broadcast Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-800/80 space-y-2 shadow-lg">
              <span className="text-xs text-slate-400 block font-medium">Study Tips</span>
              <span className="text-2xl font-black text-indigo-300">{studyTipsSubscribers}</span>
              <span className="text-[11px] text-slate-500 font-mono block">Opted into study guides</span>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-800/80 space-y-2 shadow-lg">
              <span className="text-xs text-slate-400 block font-medium">Weekly Summary</span>
              <span className="text-2xl font-black text-indigo-300">{weeklySummarySubscribers}</span>
              <span className="text-[11px] text-slate-500 font-mono block">Opted into weekly digest</span>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-800/80 space-y-2 shadow-lg">
              <span className="text-xs text-slate-400 block font-medium">Product Updates</span>
              <span className="text-2xl font-black text-indigo-300">{productUpdatesSubscribers}</span>
              <span className="text-[11px] text-slate-500 font-mono block">Opted into feature updates</span>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-800/80 space-y-2 shadow-lg">
              <span className="text-xs text-slate-400 block font-medium">AI Announcements</span>
              <span className="text-2xl font-black text-indigo-300">{aiAnnouncementSubscribers}</span>
              <span className="text-[11px] text-slate-500 font-mono block">Opted into model upgrades</span>
            </div>
          </div>
        </section>

        <section className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Latest Registered Users</span>
            </h2>
            <Link
              href="/admin/users"
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              View All Directory →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-[10px] uppercase font-mono text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">User</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4 rounded-r-xl text-right">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {recentUsers.map((u) => {
                  const initial = (u.name || u.email || "U").charAt(0).toUpperCase();
                  return (
                    <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {u.image ? (
                            <img
                              src={u.image}
                              alt={u.name || "User"}
                              className="w-8 h-8 rounded-xl object-cover border border-slate-700"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5">
                              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-white text-xs">
                                {initial}
                              </div>
                            </div>
                          )}
                          <span className="font-bold text-white">{u.name || "No Name"}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-400">{u.email}</td>
                      <td className="py-3.5 px-4">
                        {u.role === "ADMIN" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-300">
                            ADMIN
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-[10px] font-semibold text-slate-400">
                            USER
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-400 text-[11px]">
                        {new Date(u.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}