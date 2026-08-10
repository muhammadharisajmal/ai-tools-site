import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/send-verification-email";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    ...authConfig.callbacks,
    async redirect({ url, baseUrl }) {
      try {
        const parsedUrl = new URL(url, baseUrl);
        if (parsedUrl.hostname.replace("www.", "") === new URL(baseUrl).hostname.replace("www.", "")) {
          return parsedUrl.pathname + parsedUrl.search;
        }
      } catch {
        if (url.startsWith("/")) return `${baseUrl}${url}`;
      }
      return `${baseUrl}/dashboard`;
    },
    async signIn({ user, account }) {
      if (!user?.email) return false;
      const normalizedEmail = user.email.trim().toLowerCase();
      
      let dbUser = await prisma.user.findFirst({
        where: {
          email: {
            equals: normalizedEmail,
            mode: "insensitive",
          },
        },
      });

      // CASE 1: Brand New User Signup via Google
      if (!dbUser) {
        dbUser = await prisma.user.create({
          data: {
            name: user.name,
            email: normalizedEmail,
            image: user.image,
            emailVerified: new Date(), // Automatically verify Google sign-ins since Google verifies emails
            role: "USER",
          },
        });
        if (account) {
          await prisma.account.create({
            data: {
              userId: dbUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              refresh_token: account.refresh_token,
              access_token: account.access_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              session_state: account.session_state as string | null,
            },
          });
        }
        return true;
      }

      // If user exists but emailVerified was null previously, update it on Google sign-in
      if (!dbUser.emailVerified) {
        await prisma.user.update({
          where: { id: dbUser.id },
          data: { emailVerified: new Date() },
        });
      }

      return true;
    },
    async jwt({ token, user }) {
      const email = token.email || user?.email;
      if (email) {
        try {
          const dbUser = await prisma.user.findFirst({
            where: {
              email: {
                equals: email.trim().toLowerCase(),
                mode: "insensitive",
              },
            },
            select: { id: true, role: true, emailVerified: true },
          });
          if (dbUser) {
            token.id = dbUser.id;
            token.role = dbUser.role || "USER";
            token.emailVerified = dbUser.emailVerified;
          }
        } catch (err) {
          console.error("JWT DB Lookup Error:", err);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.role = (token.role as string) || "USER";
        session.user.emailVerified = token.emailVerified as Date | null;
      }
      return session;
    },
  },
});