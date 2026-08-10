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
        
        const user = auth.user as { emailVerified?: Date | null };
        if (!user?.emailVerified) {
          return false; 
        }

        return true;
      }

      return true;
    },
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = (token.role as string) || "USER";
        (session.user as any).emailVerified = token.emailVerified as Date | null;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "USER";
        token.emailVerified = (user as any).emailVerified;
      }
      return token;
    }
  },
} satisfies NextAuthConfig;