import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const token =
      req.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(
        new URL(
          "/verify-email?error=missing-token",
          req.url
        )
      );
    }

    const verification =
      await prisma.emailVerificationToken.findUnique({
        where: {
          token,
        },
      });

    if (!verification) {
      return NextResponse.redirect(
        new URL(
          "/verify-email?error=invalid-token",
          req.url
        )
      );
    }

    if (verification.expiresAt < new Date()) {
      await prisma.emailVerificationToken.delete({
        where: {
          id: verification.id,
        },
      });

      return NextResponse.redirect(
        new URL(
          "/verify-email?error=expired",
          req.url
        )
      );
    }

    await prisma.user.update({
      where: {
        email: verification.email,
      },
      data: {
        emailVerified: new Date(),
      },
    });

    await prisma.emailVerificationToken.delete({
      where: {
        id: verification.id,
      },
    });

    return NextResponse.redirect(
      new URL(
        "/verify-email?success=true",
        req.url
      )
    );
  } catch (error) {
    console.error(error);

    return NextResponse.redirect(
      new URL(
        "/verify-email?error=server",
        req.url
      )
    );
  }
}