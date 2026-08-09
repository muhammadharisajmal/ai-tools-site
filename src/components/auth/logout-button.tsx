"use client";

import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function LogoutButton() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  const handleLogout = async () => {
    // 1. Destroy session cookie on server
    await signOut({ redirect: false });

    // 2. Hard navigation to purge client cache and redirect accordingly
    const target = isAdmin ? "/login?admin=true" : "/login";
    window.location.href = target;
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer text-xs font-semibold"
    >
      Logout
    </button>
  );
}