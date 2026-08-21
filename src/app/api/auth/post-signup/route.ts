import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/send-verification-email";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.redirect(new URL("/signup", req.url));
  }

  const email = session.user.email.trim().toLowerCase();
  const name = session.user.name || undefined;

  let dbUser = await prisma.user.findFirst({
    where: { email: { equals: email, mode: "insensitive" } },
  });

  // If account already exists and is verified -> go straight to dashboard
  if (dbUser && dbUser.emailVerified) {
    if (dbUser.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If brand new account -> create as unverified and send verification email
  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        name,
        email,
        image: session.user.image,
        emailVerified: null,
        role: "USER",
      },
    });
  }

  try {
    await sendVerificationEmail(email, name);
  } catch (err) {
    console.error("Failed to send verification email:", err);
  }

  return NextResponse.redirect(new URL(`/login?registered=true&email=${encodeURIComponent(email)}`, req.url));
}