import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
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
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("INVALID_CREDENTIALS");
        }

        const email = (credentials.email as string).trim().toLowerCase();
        const password = credentials.password as string;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          throw new Error("USER_NOT_FOUND");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          throw new Error("INVALID_CREDENTIALS");
        }

        if (!user.emailVerified) {
          throw new Error("EMAIL_NOT_VERIFIED");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          emailVerified: user.emailVerified,
        };
      },
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
      
      let dbUser = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });

      // CASE 1: Brand New User Signup via Google
      if (!dbUser) {
        if (account?.provider === "google") {
          dbUser = await prisma.user.create({
            data: {
              name: user.name,
              email: normalizedEmail,
              image: user.image,
              emailVerified: null, // Explicitly unverified initially
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
          try {
            await sendVerificationEmail(normalizedEmail, user.name ?? undefined);
          } catch (err) {
            console.error("Failed to send verification email on Google signup:", err);
          }
          return `/login?registered=true&email=${encodeURIComponent(normalizedEmail)}`;
        }
        return false;
      }

      // CASE 2: User exists but is NOT yet verified
      if (!dbUser.emailVerified) {
        if (account?.provider === "google") {
          // Ensure account is linked
          const existingAccount = await prisma.account.findFirst({
            where: { userId: dbUser.id, provider: account.provider },
          });
          if (!existingAccount && account) {
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
          try {
            await sendVerificationEmail(normalizedEmail, dbUser.name ?? undefined);
          } catch (err) {
            console.error("Failed to resend verification email:", err);
          }
        }
        return "/login?error=EMAIL_NOT_VERIFIED";
      }

      // CASE 3: User IS verified -> allow sign in and redirect to dashboard
      return true;
    },
    async jwt({ token, user }) {
      const email = token.email || user?.email;
      if (email) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: email.trim().toLowerCase() },
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