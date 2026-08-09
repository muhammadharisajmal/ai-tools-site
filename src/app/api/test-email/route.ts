import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function GET() {
  try {
    const { data, error } = await resend.emails.send({
      from: "AI Study Hub <onboarding@resend.dev>",
      to: ["harisajmal36@gmail.com"], // Replace manually with your email address
      subject: "AI Study Hub Test Email",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-radius: 8px;">
          <h2 style="color: #4f46e5;">Hello!</h2>
          <p style="font-size: 16px; color: #1e293b;">
            Congratulations 🎉
          </p>
          <p style="font-size: 15px; color: #334155; line-height: 1.5;">
            Your AI Study Hub email service is working successfully.
          </p>
          <p style="font-size: 14px; color: #64748b;">
            This email was sent using Resend.
          </p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to send email.",
      },
      { status: 500 }
    );
  }
}