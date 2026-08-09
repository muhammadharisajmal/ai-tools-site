import Link from "next/link";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  ArrowLeft,
  Users,
  Search,
  RotateCw,
  ShieldCheck,
  Mail,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit2,
  Trash2,
  Bell,
  Sparkles,
  CheckCircle2,
  X,
  AlertCircle,
  UserX,
  Loader2,
} from "lucide-react";

// ==========================================
// SERVER ACTIONS
// ==========================================

async function updateUserAction(formData: FormData) {
  "use me";
  "use server";

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as "USER" | "ADMIN";

  if (!id) return;

  await prisma.user.update({
    where: { id },
    data: {
      name: name?.trim() || null,
      role: role || "USER",
    },
  });

  revalidatePath("/admin/users");
}

async function deleteUserAction(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  if (!id) return;

  await prisma.user.delete({
    where: { id },
  });

  revalidatePath("/admin/users");
}

// ==========================================
// UI HELPER COMPONENTS
// ==========================================

function AnimatedGradientBg() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-950" aria-hidden="true">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent blur-[120px] rounded-full" />
      <div className="absolute -top-32 -left-20 w-[30rem] h-[30rem] bg-gradient-to-tr from-fuchsia-600/20 via-violet-600/15 to-indigo-500/15 rounded-full blur-3xl opacity-50" />
      <div className="absolute top-1/3 -right-20 w-[28rem] h-[28rem] bg-gradient-to-b from-blue-600/15 via-cyan-500/15 to-violet-600/15 rounded-full blur-3xl opacity-40" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
}

interface PageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
    view?: string;
    edit?: string;
    delete?: string;
  }>;
}

export default async function AdminUsersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = params.q?.trim() || "";
  const currentPage = Math.max(1, parseInt(params.page || "1", 10));
  const pageSize = 20;

  const viewUserId = params.view;
  const editUserId = params.edit;
  const deleteUserId = params.delete;

  try {
    // 1. Fetch Real Statistics
    const [totalUsers, googleAccounts, emailAccounts, adminUsers] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { image: { not: null } } }),
      prisma.user.count({ where: { image: null } }),
      prisma.user.count({ where: { role: "ADMIN" } }),
    ]);

    // 2. Build Where Filter for Server-Side Search
    const whereClause = query
      ? {
          OR: [
            { name: { contains: query, mode: "insensitive" as const } },
            { email: { contains: query, mode: "insensitive" as const } },
          ],
        }
      : {};

    // 3. Paginated Query & Filter Count
    const [filteredCount, users] = await Promise.all([
      prisma.user.count({ where: whereClause }),
      prisma.user.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    const totalPages = Math.ceil(filteredCount / pageSize) || 1;

    // Fetch targeted modal users if query parameters exist
    const viewUser = viewUserId ? await prisma.user.findUnique({ where: { id: viewUserId } }) : null;
    const editUser = editUserId ? await prisma.user.findUnique({ where: { id: editUserId } }) : null;
    const deleteUser = deleteUserId ? await prisma.user.findUnique({ where: { id: deleteUserId } }) : null;

    return (
      <div className="relative min-h-screen font-sans bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white antialiased">
        <AnimatedGradientBg />

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
          {/* Navigation Back Link */}
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800 backdrop-blur-xl shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>

          {/* HEADER */}
          <section className="relative overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-800/80 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 bg-purple-500/10 px-3 py-0.5 rounded-full border border-purple-500/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Admin Control Panel</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
                  <Users className="w-7 h-7 text-indigo-400" />
                  <span>Users</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Manage registered users, permissions, and account statuses of AI Study Hub.
                </p>
              </div>

              {/* Server Search & Refresh Form */}
              <div className="flex items-center gap-3 w-full lg:w-auto">
                <form method="GET" className="relative flex-1 lg:w-72">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="q"
                    defaultValue={query}
                    placeholder="Search name or email..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 text-white border border-slate-800 text-xs outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-500"
                    aria-label="Search users"
                  />
                </form>

                <Link
                  href="/admin/users"
                  className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all flex-shrink-0 shadow-md"
                  title="Refresh user records"
                >
                  <RotateCw className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* REAL STATISTICS CARDS */}
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-800/80 flex items-center justify-between shadow-lg hover:border-slate-700/80 transition-all">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 block font-medium">Total Users</span>
                <span className="text-2xl font-black text-white tracking-tight">{totalUsers}</span>
                <span className="text-[10px] text-slate-500 font-mono block">Registered Profiles</span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Users className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-800/80 flex items-center justify-between shadow-lg hover:border-slate-700/80 transition-all">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 block font-medium">Google Accounts</span>
                <span className="text-2xl font-black text-emerald-400 tracking-tight">{googleAccounts}</span>
                <span className="text-[10px] text-slate-500 font-mono block">OAuth Single Sign-On</span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-800/80 flex items-center justify-between shadow-lg hover:border-slate-700/80 transition-all">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 block font-medium">Credentials Accounts</span>
                <span className="text-2xl font-black text-purple-400 tracking-tight">{emailAccounts}</span>
                <span className="text-[10px] text-slate-500 font-mono block">Password Sign-Up</span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Mail className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-800/80 flex items-center justify-between shadow-lg hover:border-slate-700/80 transition-all">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 block font-medium">Administrators</span>
                <span className="text-2xl font-black text-cyan-400 tracking-tight">{adminUsers}</span>
                <span className="text-[10px] text-slate-500 font-mono block">Platform Roles</span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
          </section>

          {/* REAL USERS TABLE CONTAINER */}
          <section className="bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-800/80 shadow-2xl overflow-hidden space-y-4 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div>
                <h2 className="text-base font-extrabold text-white tracking-tight">User Directory</h2>
                <p className="text-xs text-slate-400 mt-0.5">List of verified users registered across the platform.</p>
              </div>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-950/80 px-3 py-1 rounded-full border border-slate-800">
                Showing {filteredCount === 0 ? 0 : (currentPage - 1) * pageSize + 1} -{" "}
                {Math.min(currentPage * pageSize, filteredCount)} of {filteredCount}
              </span>
            </div>

            {/* EMPTY STATE */}
            {users.length === 0 ? (
              <div className="py-16 text-center space-y-3 bg-slate-950/40 rounded-2xl border border-slate-800/50">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                  <UserX className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-white">No Users Found</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  No registered account matches your query <span className="text-purple-400 font-mono">"{query}"</span>.
                </p>
                <Link
                  href="/admin/users"
                  className="inline-block mt-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  Clear Search Filters
                </Link>
              </div>
            ) : (
              /* TABLE */
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/80 text-[10px] uppercase font-mono text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-3.5 px-4 rounded-l-xl">User</th>
                      <th className="py-3.5 px-4">Email Address</th>
                      <th className="py-3.5 px-4">Provider</th>
                      <th className="py-3.5 px-4">Role</th>
                      <th className="py-3.5 px-4">Joined Date</th>
                      <th className="py-3.5 px-4 rounded-r-xl text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {users.map((user) => {
                      const displayName = user.name || "No Name";
                      const initial = (user.name || user.email || "U").charAt(0).toUpperCase();
                      const isGoogle = !!user.image;

                      // Query Params Preservation for Action Navigation
                      const baseQuery = `q=${encodeURIComponent(query)}&page=${currentPage}`;

                      return (
                        <tr key={user.id} className="hover:bg-slate-800/30 transition-colors group">
                          {/* Avatar & Name */}
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="relative flex-shrink-0">
                                {user.image ? (
                                  <img
                                    src={user.image}
                                    alt={displayName}
                                    className="w-9 h-9 rounded-xl object-cover border border-slate-700"
                                  />
                                ) : (
                                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-fuchsia-500 p-0.5 shadow-md">
                                    <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-white font-bold text-xs">
                                      {initial}
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div>
                                <span className="font-bold text-white text-xs block group-hover:text-purple-300 transition-colors">
                                  {displayName}
                                </span>
                                <span className="text-[10px] text-slate-500 font-mono">ID: {user.id}</span>
                              </div>
                            </div>
                          </td>

                          {/* Email */}
                          <td className="py-4 px-4 font-mono text-slate-400">{user.email}</td>

                          {/* Provider */}
                          <td className="py-4 px-4">
                            {isGoogle ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-semibold text-indigo-300">
                                Google
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-semibold text-slate-300">
                                Credentials
                              </span>
                            )}
                          </td>

                          {/* Role */}
                          <td className="py-4 px-4">
                            {user.role === "ADMIN" ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-300">
                                <ShieldCheck className="w-3 h-3 text-purple-400" /> ADMIN
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-400">
                                USER
                              </span>
                            )}
                          </td>

                          {/* Joined Date */}
                          <td className="py-4 px-4 font-mono text-slate-400 text-[11px]">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>

                          {/* Action Buttons */}
                          <td className="py-4 px-4 text-right">
                            <div className="inline-flex items-center gap-1">
                              <Link
                                href={`/admin/users?${baseQuery}&view=${user.id}`}
                                className="p-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                                title="View Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </Link>
                              <Link
                                href={`/admin/users?${baseQuery}&edit=${user.id}`}
                                className="p-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                                title="Edit User"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </Link>
                              <Link
                                href={`/admin/users?${baseQuery}&delete=${user.id}`}
                                className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
                                title="Delete User"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* PAGINATION */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                Showing page <strong className="text-white">{currentPage}</strong> of{" "}
                <strong className="text-white">{totalPages}</strong>
              </span>

              <div className="flex items-center gap-1.5">
                {currentPage > 1 ? (
                  <Link
                    href={`/admin/users?q=${encodeURIComponent(query)}&page=${currentPage - 1}`}
                    className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Previous</span>
                  </Link>
                ) : (
                  <button
                    disabled
                    className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-600 cursor-not-allowed opacity-60 text-xs font-semibold flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Previous</span>
                  </button>
                )}

                <span className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-xs shadow-md shadow-indigo-500/20">
                  {currentPage}
                </span>

                {currentPage < totalPages ? (
                  <Link
                    href={`/admin/users?q=${encodeURIComponent(query)}&page=${currentPage + 1}`}
                    className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <button
                    disabled
                    className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-600 cursor-not-allowed opacity-60 text-xs font-semibold flex items-center gap-1"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* ========================================== */}
          {/* VIEW USER DETAILS DRAWER */}
          {/* ========================================== */}
          {viewUser && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-end animate-fadeIn">
              <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full p-6 sm:p-8 space-y-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <Eye className="w-4 h-4" />
                      </div>
                      <h3 className="text-lg font-extrabold text-white tracking-tight">User Overview</h3>
                    </div>
                    <Link
                      href={`/admin/users?q=${encodeURIComponent(query)}&page=${currentPage}`}
                      className="p-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                    {viewUser.image ? (
                      <img
                        src={viewUser.image}
                        alt={viewUser.name || "User"}
                        className="w-14 h-14 rounded-2xl object-cover border border-slate-700"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-fuchsia-500 p-0.5 shadow-xl">
                        <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-white font-extrabold text-xl">
                        (viewUser.name ?? viewUser.email ?? "User")
  .charAt(0)
  .toUpperCase()
                        </div>
                      </div>
                    )}
                    <div>
                      <h4 className="text-base font-bold text-white">{viewUser.name || "No Name"}</h4>
                      <p className="text-xs text-slate-400 font-mono">{viewUser.email}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950/50 border border-slate-800/60 text-xs">
                      <span className="text-slate-400">User ID:</span>
                      <span className="font-mono text-slate-300 text-[11px]">{viewUser.id}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950/50 border border-slate-800/60 text-xs">
                      <span className="text-slate-400">Role:</span>
                      <span className="font-bold text-purple-300">{viewUser.role}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950/50 border border-slate-800/60 text-xs">
                      <span className="text-slate-400">Provider:</span>
                      <span className="font-bold text-indigo-300">
                        {viewUser.image ? "Google OAuth" : "Email Credentials"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950/50 border border-slate-800/60 text-xs">
                      <span className="text-slate-400">Joined Date:</span>
                      <span className="font-mono text-slate-200">
                        {new Date(viewUser.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                  <Link
                    href={`/admin/users?q=${encodeURIComponent(query)}&page=${currentPage}`}
                    className="w-full text-center py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white font-semibold text-xs transition-colors"
                  >
                    Close Drawer
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* EDIT USER MODAL */}
          {/* ========================================== */}
          {editUser && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
              <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                      <Edit2 className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-extrabold text-white tracking-tight">Edit User Profile</h3>
                  </div>
                  <Link
                    href={`/admin/users?q=${encodeURIComponent(query)}&page=${currentPage}`}
                    className="p-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </Link>
                </div>

                <form action={updateUserAction} className="space-y-4">
                  <input type="hidden" name="id" value={editUser.id} />

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={editUser.name || ""}
                      placeholder="User Name"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-slate-800 text-sm outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      User Role
                    </label>
                    <select
                      name="role"
                      defaultValue={editUser.role}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-slate-800 text-sm outline-none focus:border-indigo-500 transition-all"
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </div>

                  <div className="pt-3 flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/users?q=${encodeURIComponent(query)}&page=${currentPage}`}
                      className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white font-semibold text-xs transition-colors"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* DELETE USER CONFIRMATION MODAL */}
          {/* ========================================== */}
          {deleteUser && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
              <div className="relative w-full max-w-md bg-slate-900 border border-red-500/30 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 text-center">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto">
                  <Trash2 className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-white">Delete Account?</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Are you sure you want to delete <strong className="text-white">{deleteUser.email}</strong>? This action is permanent and removes all account records from the PostgreSQL database.
                  </p>
                </div>

                <form action={deleteUserAction} className="flex items-center gap-3 pt-2">
                  <input type="hidden" name="id" value={deleteUser.id} />
                  <Link
                    href={`/admin/users?q=${encodeURIComponent(query)}&page=${currentPage}`}
                    className="flex-1 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white font-semibold text-xs transition-colors"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-500/20 transition-all"
                  >
                    Delete User
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  } catch (error) {
    // ERROR STATE
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 font-sans text-slate-100">
        <AnimatedGradientBg />
        <div className="max-w-md w-full bg-slate-900/80 backdrop-blur-2xl border border-red-500/30 rounded-3xl p-8 text-center space-y-5 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-extrabold text-white">Database Query Failed</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              An error occurred while fetching user records from PostgreSQL.
            </p>
          </div>
          <Link
            href="/admin/users"
            className="inline-block w-full py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-bold hover:bg-slate-900 transition-colors"
          >
            Retry Request
          </Link>
        </div>
      </div>
    );
  }
}