import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const email = session.user.email.trim().toLowerCase();
  const dbUser = await prisma.user.findFirst({
    where: { email: { equals: email, mode: "insensitive" } },
  });

  // If user tries to login but account does not exist -> redirect to signup with error
  if (!dbUser) {
    return NextResponse.redirect(new URL("/signup?error=ACCOUNT_NOT_FOUND", req.url));
  }

  // If user exists but email is not verified -> redirect to login with verification error
  if (!dbUser.emailVerified) {
    return NextResponse.redirect(new URL("/login?error=EMAIL_NOT_VERIFIED&email=" + encodeURIComponent(email), req.url));
  }

  // Role-based routing
  if (dbUser.role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.redirect(new URL("/dashboard", req.url));
}