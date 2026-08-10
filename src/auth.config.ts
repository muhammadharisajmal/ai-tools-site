import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      const isProtectedDashboard = 
        pathname.startsWith("/dashboard") || 
        pathname.startsWith("/admin") || 
        pathname.startsWith("/profile") || 
        pathname.startsWith("/settings");
      
      const isProtectedWorkplace = pathname.includes("/workplace");

      if (isProtectedDashboard || isProtectedWorkplace) {
        if (!isLoggedIn) return false;
        
        // Block access if email is not verified
        // @ts-expect-error - emailVerified custom property on session user
        if (!auth.user?.emailVerified) {
          return false; 
        }

        return true;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;