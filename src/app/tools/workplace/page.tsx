export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ArrowLeft, PenTool, Code2, Zap, BookOpen, Calendar } from "lucide-react";

function AnimatedGradientBg() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-950" aria-hidden="true">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem]" />
    </div>
  );
}

const authenticatedTools = [
  {
    name: "AI Writing Assistant",
    description: "Craft essays, structure assignments, and optimize tone with advanced AI assistance.",
    href: "/writing/workplace",
    icon: <PenTool className="w-6 h-6 text-fuchsia-400" />,
    badge: "Writing",
    color: "from-fuchsia-500/10 to-purple-500/10 border-fuchsia-500/20",
  },
  {
    name: "AI Coding Assistant",
    description: "Generate, debug, and analyze time complexity across C++, TypeScript, and Python.",
    href: "/coding/workplace",
    icon: <Code2 className="w-6 h-6 text-blue-400" />,
    badge: "Coding",
    color: "from-blue-500/10 to-indigo-500/10 border-blue-500/20",
  },
  {
    name: "Productivity Assistant",
    description: "Plan schedules, manage workloads, and conquer academic burnout with time-boxing.",
    href: "/productivity/workplace",
    icon: <Zap className="w-6 h-6 text-cyan-400" />,
    badge: "Productivity",
    color: "from-cyan-500/10 to-blue-500/10 border-cyan-500/20",
  },
  {
    name: "AI Research Assistant",
    description: "Synthesize scholarly literature reports, summaries, and automated citations.",
    href: "/research/workplace",
    icon: <BookOpen className="w-6 h-6 text-purple-400" />,
    badge: "Research",
    color: "from-purple-500/10 to-indigo-500/10 border-purple-500/20",
  },
  {
    name: "AI Smart Study Planner",
    description: "Deconstruct heavy semesters into precision milestones with active recall pacing.",
    href: "/study-planner/workplace",
    icon: <Calendar className="w-6 h-6 text-indigo-400" />,
    badge: "Study Planner",
    color: "from-indigo-500/10 to-purple-500/10 border-indigo-500/20",
  },
];

export default async function AuthenticatedToolsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/tools/workplace");
  }

  if (session.user.role === "ADMIN") {
    redirect("/admin");
  }

  return (
    <div className="relative min-h-screen font-sans bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white antialiased">
      <AnimatedGradientBg />
      
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-700 text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <span className="font-extrabold text-sm text-white tracking-tight">AI Study Hub Workspaces</span>
        </div>
      </header>

      {/* Main Tools Grid */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-8 relative z-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Your Active AI Workspaces
          </h1>
          <p className="text-sm text-slate-400">
            Select any tool below to launch your live, authenticated workspace and generate results instantly.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {authenticatedTools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className={`group relative bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between border transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 ${tool.color}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center transition-transform group-hover:scale-110">
                    {tool.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {tool.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {tool.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-semibold text-indigo-400 flex items-center justify-between group-hover:text-fuchsia-400 transition-colors">
                <span>Launch Workspace</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}