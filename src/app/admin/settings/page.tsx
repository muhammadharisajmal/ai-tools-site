import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import SettingsForm, { SystemSettingsData } from "@/components/admin/settings-form";
import { ArrowLeft, Settings as SettingsIcon, Sparkles } from "lucide-react";

// Synchronized Ambient Gradient Background
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

export default async function AdminSettingsPage() {
  const session = await auth();

  // Server-side Guard
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // Safely attempt retrieving existing settings from PostgreSQL via Prisma
  let settings: SystemSettingsData = {
    siteName: "AI Study Hub",
    supportEmail: "support@aistudyhub.com",
    maintenanceMode: false,
    allowRegistration: true,
    defaultRole: "USER",
    requireEmailVerification: true,
    systemNotice: "",
  };

  try {
    // @ts-ignore - Check if SystemSetting exists in Prisma
    if (prisma.systemSetting) {
      // @ts-ignore
      const dbSettings = await prisma.systemSetting.findFirst();
      if (dbSettings) {
        settings = {
          siteName: dbSettings.siteName || "AI Study Hub",
          supportEmail: dbSettings.supportEmail || "support@aistudyhub.com",
          maintenanceMode: Boolean(dbSettings.maintenanceMode),
          allowRegistration: Boolean(dbSettings.allowRegistration),
          defaultRole: dbSettings.defaultRole || "USER",
          requireEmailVerification: Boolean(dbSettings.requireEmailVerification),
          systemNotice: dbSettings.systemNotice || "",
        };
      }
    }
  } catch {
    // Fallback default settings
  }

  return (
    <div className="relative min-h-screen font-sans bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white antialiased">
      <AnimatedGradientBg />

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
        {/* Back Button */}
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
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <SettingsIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 bg-purple-500/10 px-3 py-0.5 rounded-full border border-purple-500/20 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Global System Preferences</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                System Settings
              </h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-3xl">
            Configure global platform identity, operational access gates, registration defaults, and system-wide notice banners.
          </p>
        </section>

        {/* SETTINGS FORM MODULE */}
        <SettingsForm initialSettings={settings} />
      </main>
    </div>
  );
}