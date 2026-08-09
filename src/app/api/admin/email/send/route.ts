import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    // 1. Check Admin Session
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized access." },
        { status: 401 }
      );
    }

    // 2. Parse Request Body
    const body = await req.json();
    const { subject, body: emailBody, category, recipientType } = body;

    if (!subject?.trim() || !emailBody?.trim()) {
      return NextResponse.json(
        { error: "Subject line and email body content are required." },
        { status: 400 }
      );
    }

    // 3. Build Recipient Query based on EmailComposer values
    let whereClause: Record<string, any> = { email: { not: null } };

    if (recipientType === "VERIFIED_USERS") {
      whereClause.emailVerified = { not: null };
    } else if (recipientType === "STUDENTS_ROLE") {
      whereClause.role = "USER";
    } else if (recipientType === "ADMINS_ROLE") {
      whereClause.role = "ADMIN";
    } else if (recipientType === "STUDY_TIPS_SUBSCRIBERS") {
      whereClause.studyTipsEmails = true;
    } else if (recipientType === "WEEKLY_SUMMARY_SUBSCRIBERS") {
      whereClause.weeklySummaryEmails = true;
    } else if (recipientType === "PRODUCT_UPDATES_SUBSCRIBERS") {
      whereClause.productUpdatesEmails = true;
    } else if (recipientType === "AI_ANNOUNCEMENTS") {
      whereClause.aiAnnouncementsEmails = true;
    }

    // 4. Fetch Recipient Emails
    const recipients = await prisma.user.findMany({
      where: whereClause,
      select: { email: true },
    });

    const emailList = recipients
      .map((r) => r.email)
      .filter((e): e is string => Boolean(e));

    if (emailList.length === 0) {
      return NextResponse.json(
        { error: "No users found matching the selected target audience." },
        { status: 400 }
      );
    }

    // 5. Format Body Linebreaks into HTML Paragraphs
    const formattedParagraphs = emailBody
      .split("\n")
      .filter((line: string) => line.trim() !== "")
      .map((paragraph: string) => `<p style="margin-bottom: 12px; line-height: 1.6;">${paragraph}</p>`)
      .join("");

    const wrappedHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0f172a; color: #f8fafc; border-radius: 16px;">
        <h2 style="color: #c084fc; margin-bottom: 16px; font-size: 20px;">${subject}</h2>
        <div style="font-size: 14px; color: #cbd5e1;">
          ${formattedParagraphs}
        </div>
        <hr style="border: none; border-top: 1px solid #334155; margin: 24px 0;" />
        <p style="font-size: 11px; color: #64748b; text-align: center;">
          Sent from AI Study Hub Broadcast Dispatch Center
        </p>
      </div>
    `;

    // 6. Send Broadcast Email via Resend
    await sendEmail({
      to: emailList,
      subject,
      html: wrappedHtml,
    });

    // 7. Save Audit Log to Database if EmailLog model exists
    try {
      const prismaAny = prisma as any;
      if (prismaAny.emailLog) {
        await prismaAny.emailLog.create({
          data: {
            category: category || "STUDY_TIPS",
            subject,
            recipientCount: emailList.length,
            status: "DELIVERED",
            body: emailBody,
            recipientType: recipientType || "ALL_USERS",
            sentById: session.user.id,
          },
        });
      }
    } catch (logErr) {
      console.error("[EMAIL_LOG_WRITE_ERROR]", logErr);
    }

    return NextResponse.json({
      success: true,
      recipients: emailList.length,
    });
  } catch (error: any) {
    console.error("[ADMIN_EMAIL_SEND_ERROR]", error);
    return NextResponse.json(
      { error: error?.message || "Failed to dispatch broadcast email." },
      { status: 500 }
    );
  }
}