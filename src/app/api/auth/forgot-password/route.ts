import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body?.email ? body.email.trim().toLowerCase() : "";

    if (!email) {
      return NextResponse.json(
        { message: "Email address is required." },
        { status: 400 }
      );
    }

    // 1. Look up user in PostgreSQL with normalized email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Anti-enumeration security: return success even if user isn't found,
    // but log to server console so you can trace test attempts.
    if (!user) {
      console.log(`[FORGOT_PASSWORD] No user found matching: ${email}`);
      return NextResponse.json({
        success: true,
        message:
          "If an account exists with this email, a password reset link has been sent.",
      });
    }

    // 2. Delete any old password reset tokens for this email
    await prisma.passwordResetToken.deleteMany({
      where: { email },
    });

    // 3. Generate a secure 1-hour reset token
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry

    await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expiresAt,
      },
    });

    // 4. Construct reset link
    const baseUrl = process.env.NEXTAUTH_URL;
    const resetLink = `${baseUrl}/reset-password?token=${token}`;

    // 5. Send password reset email
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0f172a; color: #f8fafc; border-radius: 16px;">
        <h2 style="color: #c084fc; margin-bottom: 16px;">Password Reset Request</h2>
        <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6;">
          Hello ${user.name || "there"},
        </p>
        <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6;">
          We received a request to reset your password for your <strong>AI Study Hub</strong> account. Click the button below to set a new password:
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${resetLink}" style="background: linear-gradient(to right, #6366f1, #a855f7, #d946ef); color: #ffffff; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 12px; font-size: 14px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p style="font-size: 12px; color: #94a3b8; line-height: 1.5;">
          This link will expire in 1 hour. If you did not request a password reset, you can safely ignore this email.
        </p>
        <hr style="border: none; border-top: 1px solid #334155; margin: 24px 0;" />
        <p style="font-size: 11px; color: #64748b; text-align: center;">
          AI Study Hub • Next-Gen Academic Intelligence
        </p>
      </div>
    `;

    await sendEmail({
      to: email,
      subject: "Reset Your AI Study Hub Password",
      html: emailHtml,
    });

    console.log(`[FORGOT_PASSWORD] Reset link successfully dispatched to: ${email}`);

    return NextResponse.json({
      success: true,
      message:
        "If an account exists with this email, a password reset link has been sent.",
    });
  } catch (error: any) {
    console.error("[FORGOT_PASSWORD_ERROR]", error);
    return NextResponse.json(
      { message: error?.message || "Failed to process password reset request." },
      { status: 500 }
    );
  }
}