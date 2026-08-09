import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resendVerificationSchema } from "@/lib/validations/auth";
import { sendVerificationEmail } from "@/lib/send-verification-email";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = resendVerificationSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.error.issues[0].message,
        },
        { status: 400 }
      );
    }

    const { email } = result.data;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Prevent account enumeration
    if (!user) {
      return NextResponse.json({
        success: true,
        message:
          "If an account exists, a verification email has been sent.",
      });
    }

    // Already verified
    if (user.emailVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is already verified.",
        },
        { status: 400 }
      );
    }

    // Send a fresh verification email
    await sendVerificationEmail(
      user.email!,
      user.name ?? undefined
    );

    return NextResponse.json({
      success: true,
      message:
        "Verification email has been sent successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}