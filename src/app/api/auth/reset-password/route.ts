import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

interface ResetPasswordRequestBody {
  token?: string;
  password?: string;
}

export async function POST(req: Request) {
  try {
    const body: ResetPasswordRequestBody = await req.json();
    const { token, password } = body;

    // 1. Validate Input
    if (!token || typeof token !== "string" || !token.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Reset token is required.",
        },
        { status: 400 }
      );
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters long.",
        },
        { status: 400 }
      );
    }

    // 2. Find PasswordResetToken using Prisma
    const resetTokenRecord = await prisma.passwordResetToken.findUnique({
      where: { token: token.trim() },
    });

    if (!resetTokenRecord) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired reset link.",
        },
        { status: 400 }
      );
    }

    // 3. Check Expiration
    const now = new Date();
    if (resetTokenRecord.expiresAt < now) {
      // Delete expired token so it cannot be queried again
      await prisma.passwordResetToken.delete({
        where: { id: resetTokenRecord.id },
      });

      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired reset link.",
        },
        { status: 400 }
      );
    }

    // 4. Find user using email stored inside PasswordResetToken
    const user = await prisma.user.findUnique({
      where: { email: resetTokenRecord.email },
    });

    if (!user) {
      // Delete token if user no longer exists
      await prisma.passwordResetToken.delete({
        where: { id: resetTokenRecord.id },
      });

      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired reset link.",
        },
        { status: 400 }
      );
    }

    // 5. Hash new password using bcryptjs with 12 rounds
    const hashedPassword = await bcrypt.hash(password, 12);

    // 6. Update user password and 7. Delete PasswordResetToken (transactional integrity)
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      }),
      prisma.passwordResetToken.delete({
        where: { id: resetTokenRecord.id },
      }),
    ]);

    // 8. Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Password updated successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[RESET_PASSWORD_API_ERROR]", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}