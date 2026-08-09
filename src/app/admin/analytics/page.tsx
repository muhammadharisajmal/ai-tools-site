import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AnalyticsCharts from "@/components/admin/analytics-charts";
import { ArrowLeft, BarChart3, Sparkles } from "lucide-react";

// Synchronized Ambient Glow Background
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

export default async function AdminAnalyticsPage() {
  const session = await auth();

  // Server-side Admin Guard
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // 1. Fetch Real Daily Registrations (Last 30 Days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const rawUsersPast30Days = await prisma.user.findMany({
    where: {
      createdAt: {
        gte: thirtyDaysAgo,
      },
    },
    select: {
      createdAt: true,
    },
  });

  // Group daily registration counts
  const dailyMap = new Map<string, number>();
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    dailyMap.set(dateStr, 0);
  }

  rawUsersPast30Days.forEach((u) => {
    const dateStr = u.createdAt.toISOString().split("T")[0];
    if (dailyMap.has(dateStr)) {
      dailyMap.set(dateStr, (dailyMap.get(dateStr) || 0) + 1);
    }
  });

  const dailyData = Array.from(dailyMap.entries()).map(([date, count]) => ({
    date: date.substring(5), // "MM-DD"
    registrations: count,
  }));

  // 2. Fetch Real Monthly Registrations (Past 12 Months)
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
  twelveMonthsAgo.setDate(1);

  const rawUsersPast12Months = await prisma.user.findMany({
    where: {
      createdAt: {
        gte: twelveMonthsAgo,
      },
    },
    select: {
      createdAt: true,
    },
  });

  const monthlyMap = new Map<string, number>();
  for (let i = 11; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const monthStr = d.toLocaleString("en-US", { month: "short" });
    monthlyMap.set(monthStr, 0);
  }

  rawUsersPast12Months.forEach((u) => {
    const monthStr = u.createdAt.toLocaleString("en-US", { month: "short" });
    if (monthlyMap.has(monthStr)) {
      monthlyMap.set(monthStr, (monthlyMap.get(monthStr) || 0) + 1);
    }
  });

  const monthlyData = Array.from(monthlyMap.entries()).map(([month, count]) => ({
    month,
    count,
  }));

  // 3. Parallel Fetch for Provider, Verification, and Notification Preferences
  const [
    googleCount,
    credentialCount,
    verifiedCount,
    unverifiedCount,
    studyTipsCount,
    weeklySummaryCount,
    productUpdatesCount,
    aiAnnouncementsCount,
  ] = await Promise.all([
    prisma.user.count({ where: { image: { not: null } } }),
    prisma.user.count({ where: { image: null } }),
    prisma.user.count({ where: { emailVerified: { not: null } } }),
    prisma.user.count({ where: { emailVerified: null } }),
    prisma.user.count({ where: { studyTipsEmails: true } }),
    prisma.user.count({ where: { weeklySummaryEmails: true } }),
    prisma.user.count({ where: { productUpdatesEmails: true } }),
    prisma.user.count({ where: { aiAnnouncementsEmails: true } }),
  ]);

  const providerData = [
    { name: "Google OAuth", value: googleCount, color: "#818cf8" },
    { name: "Email Credentials", value: credentialCount, color: "#c084fc" },
  ];

  const verificationData = [
    { name: "Verified Emails", value: verifiedCount, color: "#34d399" },
    { name: "Unverified Emails", value: unverifiedCount, color: "#fbbf24" },
  ];

  const notificationData = [
    { channel: "Study Tips", subscribers: studyTipsCount },
    { channel: "Weekly Summary", subscribers: weeklySummaryCount },
    { channel: "Product Updates", subscribers: productUpdatesCount },
    { channel: "AI Announcements", subscribers: aiAnnouncementsCount },
  ];

  return (
    <div className="relative min-h-screen font-sans bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white antialiased">
      <AnimatedGradientBg />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
        {/* Back Link */}
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800 backdrop-blur-xl shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Admin Dashboard</span>
          </Link>
        </div>

        {/* HERO HEADER */}
        <section className="relative overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-800/80 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 bg-purple-500/10 px-3 py-0.5 rounded-full border border-purple-500/20 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Real-Time Business Intelligence</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Platform Analytics
              </h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-3xl">
            Visualize user growth trends, authentication distribution, email verification ratios, and active notification audience reach computed directly from your database.
          </p>
        </section>

        {/* CHARTS SECTION */}
        <AnalyticsCharts
          dailyData={dailyData}
          monthlyData={monthlyData}
          providerData={providerData}
          verificationData={verificationData}
          notificationData={notificationData}
        />
      </main>
    </div>
  );
}