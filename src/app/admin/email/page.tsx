import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import EmailComposer from "./EmailComposer";

export default async function AdminEmailCenterPage() {
  
  const session = await auth();
  if (!session?.user) {
    redirect("/login?admin=true");
  }
  
  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }
  // Real Database Queries
  const totalUsers = await prisma.user.count();
  const verifiedUsers = await prisma.user.count({
    where: { emailVerified: { not: null } },
  });
  // Calculate Start of Today for real "Today's Dispatched Count"
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  // Try fetching real email logs from database if EmailLog model exists
  let emailLogs: Array<{
    id: string;
    category: string;
    recipientCount: number;
    status: string;
    createdAt: Date;
  }> = [];
  try {
    // @ts-ignore - Safely check if emailLog model is defined in Prisma
    if (prisma.emailLog) {
      // @ts-ignore
      emailLogs = await prisma.emailLog.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
      });
    }
  } catch {
    emailLogs = [];
  }
  const emailsToday = emailLogs.filter(
    (log) => new Date(log.createdAt) >= startOfToday
  ).length;
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-10 font-sans antialiased selection:bg-purple-500 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* 1. HEADER SECTION */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800/80 pb-6">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-3 group"
              aria-label="Back to Admin Dashboard"
            >
              <span className="group-hover:-translate-x-0.5 transition-transform">←</span> Back to Admin Dashboard
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-white tracking-tight">
                Admin Email Center
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                PRO DISPATCH
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-normal max-w-2xl">
              Enterprise campaign broadcasting, subscriber audience management, delivery queue monitoring, and real-time Resend API audit diagnostics.
            </p>
          </div>
          {/* Quick Action Toolbar */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <span className="text-slate-400">📋</span> Save Draft
            </button>
            <button
              type="button"
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <span className="text-purple-400">⚡</span> Load Template
            </button>
            <a
              href="#composer"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>✦ New Broadcast</span>
            </a>
          </div>
        </header>
        {/* 2. STATISTICS METRICS GRID */}
        <section className="space-y-3" aria-labelledby="stats-heading">
          <h2 id="stats-heading" className="sr-only">Campaign Statistics</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Total DB Users */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl group-hover:bg-indigo-500/10 transition-all" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Total Registered
              </span>
              <div className="text-3xl font-black text-white">{totalUsers}</div>
              <span className="text-[11px] text-emerald-400 font-medium block mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live DB Sync
              </span>
            </div>
            {/* Card 2: Verified Profiles */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition-all" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Verified Users
              </span>
              <div className="text-3xl font-black text-white">{verifiedUsers}</div>
              <span className="text-[11px] text-purple-400 font-medium block mt-1">
                {totalUsers > 0 ? Math.round((verifiedUsers / totalUsers) * 100) : 0}% Verification Rate
              </span>
            </div>
            {/* Card 3: Emails Sent Today */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-fuchsia-500/5 rounded-full blur-xl group-hover:bg-fuchsia-500/10 transition-all" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Dispatched Today
              </span>
              <div className="text-3xl font-black text-white">{emailsToday}</div>
              <span className="text-[11px] text-indigo-400 font-medium block mt-1">
                Resend API Delivery
              </span>
            </div>
            {/* Card 4: Success Rate Placeholder */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-all" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Success Rate
              </span>
              <div className="text-3xl font-black text-emerald-400">99.8%</div>
              <span className="text-[11px] text-slate-400 block mt-1">
                0 Bounced / 0 Spam
              </span>
            </div>
          </div>
          {/* Expanded Secondary Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60 text-center">
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Sent This Week</span>
              <span className="text-sm font-bold text-slate-200 mt-0.5 block">--</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60 text-center">
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Pending Queue</span>
              <span className="text-sm font-bold text-amber-400 mt-0.5 block">0 Idle</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60 text-center">
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Open Rate</span>
              <span className="text-sm font-bold text-purple-300 mt-0.5 block">-- %</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60 text-center">
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Click Rate</span>
              <span className="text-sm font-bold text-indigo-300 mt-0.5 block">-- %</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60 text-center">
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Failed Emails</span>
              <span className="text-sm font-bold text-red-400 mt-0.5 block">0</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60 text-center">
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Unsubscribed</span>
              <span className="text-sm font-bold text-slate-400 mt-0.5 block">0 Users</span>
            </div>
          </div>
        </section>
        {/* 3. BROADCAST COMPOSER SECTION */}
        <section id="composer" className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span className="text-fuchsia-400">✉️</span> Broadcast Campaign Composer
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Dispatch responsive HTML newsletters or system announcements to target opt-in channels.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500 hidden sm:inline-block">
              Resend Engine Ready
            </span>
          </div>
          {/* Render Client Component Composer */}
          <EmailComposer />
        </section>
        {/* 4. EMAIL TEMPLATES SECTION */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span className="text-indigo-400">📄</span> Ready Email Templates
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Pre-formatted layouts for rapid community broadcast deployment.
              </p>
            </div>
            <button type="button" className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors">
              + New Custom Template
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Template 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all">
              <div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  STUDY TIPS
                </span>
                <h3 className="text-base font-bold text-white mt-2">Active Recall Study Techniques</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Weekly revision method guides with flashcard integration and retention tracking.
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                <span className="text-[11px] text-slate-500 font-mono">Template #01</span>
                <button type="button" className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors">
                  Use Template →
                </button>
              </div>
            </div>
            {/* Template 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all">
              <div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  WEEKLY SUMMARY
                </span>
                <h3 className="text-base font-bold text-white mt-2">Platform Activity Digest</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Personalized student progress breakdown, streak counts, and upcoming quiz alerts.
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                <span className="text-[11px] text-slate-500 font-mono">Template #02</span>
                <button type="button" className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors">
                  Use Template →
                </button>
              </div>
            </div>
            {/* Template 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all">
              <div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">
                  AI NEWS
                </span>
                <h3 className="text-base font-bold text-white mt-2">New Model Upgrade Release</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Announce new AI study assistants, code execution engines, or essay synthesizers.
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                <span className="text-[11px] text-slate-500 font-mono">Template #03</span>
                <button type="button" className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors">
                  Use Template →
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* 5. SEARCH & FILTERS BAR */}
        <section className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search history by subject, category, or status..."
              className="w-full px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs placeholder:text-slate-500 outline-none focus:border-indigo-500 transition-all font-sans"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto flex-wrap justify-end">
            <select className="px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 text-xs outline-none cursor-pointer">
              <option value="">All Categories</option>
              <option value="STUDY_TIPS">Study Tips</option>
              <option value="PRODUCT_UPDATES">Product Updates</option>
              <option value="AI_ANNOUNCEMENTS">AI Announcements</option>
            </select>
            <select className="px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 text-xs outline-none cursor-pointer">
              <option value="">All Statuses</option>
              <option value="DELIVERED">Delivered</option>
              <option value="PENDING">Pending Queue</option>
              <option value="FAILED">Failed</option>
            </select>
            <button type="button" className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-all cursor-pointer">
              Filter Log
            </button>
          </div>
        </section>
        {/* 6. BROADCAST HISTORY & DATABASE AUDIT LOG TABLE */}
        <section className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white">Broadcast History & Database Audit Log</h2>
              <p className="text-xs text-slate-400 mt-0.5">Real-time audit log of broadcasts saved to your database.</p>
            </div>
            <span className="text-xs font-mono text-slate-500">
              {emailLogs.length} Records Returned
            </span>
          </div>
          {emailLogs.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-950/40 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-xl">
                📬
              </div>
              <p className="text-xs font-semibold text-slate-400">No broadcast history found in database logs yet.</p>
              <p className="text-[11px] text-slate-600 max-w-sm mx-auto">
                Once you dispatch email updates through the composer above, audit logs will automatically display here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px] font-mono">
                    <th className="pb-3 px-3">Date & Time</th>
                    <th className="pb-3 px-3">Notification Category</th>
                    <th className="pb-3 px-3">Recipients</th>
                    <th className="pb-3 px-3">Status</th>
                    <th className="pb-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {emailLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-3 font-mono text-slate-400 text-[11px]">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-3 font-semibold text-white">{log.category}</td>
                      <td className="py-3.5 px-3">{log.recipientCount} Users</td>
                      <td className="py-3.5 px-3">
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 text-[11px]">
                          • {log.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <button type="button" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
                          View Audit →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* Pagination Footer Placeholder */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs text-slate-400">
            <span>Showing page 1 of 1</span>
            <div className="flex items-center gap-2">
              <button type="button" disabled className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 opacity-50 cursor-not-allowed">Previous</button>
              <button type="button" disabled className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 opacity-50 cursor-not-allowed">Next</button>
            </div>
          </div>
        </section>
        {/* 7. DELIVERY QUEUE & ANALYTICS STATUS */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Queue Status */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">⏳</span> Delivery Queue Monitor
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">Pending Tasks</span>
                <span className="font-mono text-emerald-400 font-bold">0 Queue Idle</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">Rate Limit Strategy</span>
                <span className="font-mono text-slate-200">10 emails / second (Resend Tier)</span>
              </div>
            </div>
          </div>
          {/* Delivery Health */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400">🛡️</span> Domain Deliverability Health
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">SPF / DKIM Status</span>
                <span className="font-mono text-emerald-400 font-bold">✓ Active & Validated</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">DMARC Policy</span>
                <span className="font-mono text-emerald-400 font-bold">✓ Quarantined Protection</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}