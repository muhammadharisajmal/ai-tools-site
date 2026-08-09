"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, Users, PieChart as PieIcon, Bell, ShieldCheck } from "lucide-react";

interface DailyData {
  date: string;
  registrations: number;
}

interface MonthlyData {
  month: string;
  count: number;
}

interface AnalyticsChartsProps {
  dailyData: DailyData[];
  monthlyData: MonthlyData[];
  providerData: { name: string; value: number; color: string }[];
  verificationData: { name: string; value: number; color: string }[];
  notificationData: { channel: string; subscribers: number }[];
}

// Custom Tooltip for Dark Navy Glassmorphic UI
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 border border-slate-800 p-3 rounded-xl shadow-2xl backdrop-blur-xl text-xs space-y-1">
        <p className="font-mono font-bold text-slate-300">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="font-semibold">
            {entry.name}: <span className="text-white font-black">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export default function AnalyticsCharts({
  dailyData,
  monthlyData,
  providerData,
  verificationData,
  notificationData,
}: AnalyticsChartsProps) {
  return (
    <div className="space-y-8">
      {/* 1. DAILY REGISTRATIONS AREA CHART */}
      <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-6 shadow-xl">
        <div className="border-b border-slate-800/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white tracking-tight">
                Daily Registration Velocity
              </h2>
              <p className="text-xs text-slate-400">New user account sign-ups over the past 30 days.</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 w-fit">
            30-Day Trend
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="registrations"
                name="Sign-ups"
                stroke="#818cf8"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRegistrations)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. TWO COLUMN ROW: MONTHLY GROWTH & NOTIFICATION CHANNELS */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Monthly Growth Bar Chart */}
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-6 shadow-xl flex flex-col justify-between">
          <div className="border-b border-slate-800/80 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Users className="w-4 h-4" />
              </div>
              <h2 className="text-base font-extrabold text-white tracking-tight">
                Monthly User Sign-ups
              </h2>
            </div>
            <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
              12-Month History
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Users Joined" fill="#a855f7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Notification Opt-Ins Bar Chart */}
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-6 shadow-xl flex flex-col justify-between">
          <div className="border-b border-slate-800/80 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400">
                <Bell className="w-4 h-4" />
              </div>
              <h2 className="text-base font-extrabold text-white tracking-tight">
                Notification Channel Audience
              </h2>
            </div>
            <span className="text-[10px] font-mono text-fuchsia-400 bg-fuchsia-500/10 px-2.5 py-0.5 rounded-full border border-fuchsia-500/20">
              Active Subscribers
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={notificationData}
                margin={{ top: 10, right: 10, left: 30, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} allowDecimals={false} />
                <YAxis dataKey="channel" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="subscribers" name="Opted-in Users" fill="#d946ef" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. TWO COLUMN ROW: PIE CHARTS (PROVIDERS & VERIFICATION) */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Google vs Credentials Donut Chart */}
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-6 shadow-xl flex flex-col justify-between">
          <div className="border-b border-slate-800/80 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <PieIcon className="w-4 h-4" />
              </div>
              <h2 className="text-base font-extrabold text-white tracking-tight">
                Authentication Providers
              </h2>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
              OAuth vs Credentials
            </span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={providerData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {providerData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Email Verification Status Donut Chart */}
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-6 shadow-xl flex flex-col justify-between">
          <div className="border-b border-slate-800/80 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h2 className="text-base font-extrabold text-white tracking-tight">
                Email Verification Status
              </h2>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Account Security
            </span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={verificationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {verificationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}