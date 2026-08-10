import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [], // Providers can be empty here since middleware only needs to verify the session JWT cookie
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      // Define protected routes
      const isProtectedDashboard = pathname.startsWith("/dashboard") || pathname.startsWith("/admin") || pathname.startsWith("/profile") || pathname.startsWith("/settings");
      const isProtectedWorkplace = pathname.includes("/workplace");

      if (isProtectedDashboard || isProtectedWorkplace) {
        return isLoggedIn; // Returns true if logged in, redirects to login if not
      }

      return true;
    },
  },
} satisfies NextAuthConfig;