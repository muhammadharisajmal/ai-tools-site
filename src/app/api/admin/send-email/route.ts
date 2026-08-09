import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import {
  sendStudyTipsEmail,
  sendWeeklySummaryEmail,
  sendProductUpdateEmail,
  sendAIAnnouncementEmail,
} from "@/lib/email-service";

export async function POST(req: Request) {
  try {
    // Check authentication
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    // Read request body
    const { type, subject, html } = await req.json();

    console.log("==================================");
    console.log("ADMIN EMAIL REQUEST");
    console.log("Type:", type);
    console.log("Subject:", subject);

    // Get all users with an email
    const users = await prisma.user.findMany({
      where: {
        email: {
          not: null,
        },
      },
      select: {
        email: true,
      },
    });

    console.log("Users found:", users.length);
    console.log(users);

    let sent = 0;

    for (const user of users) {
      if (!user.email) continue;

      console.log("Processing:", user.email);

      switch (type) {
        case "study":
          await sendStudyTipsEmail(
            user.email,
            subject,
            html
          );
          sent++;
          break;

        case "weekly":
          await sendWeeklySummaryEmail(
            user.email,
            subject,
            html
          );
          sent++;
          break;

        case "product":
          await sendProductUpdateEmail(
            user.email,
            subject,
            html
          );
          sent++;
          break;

        case "announcement":
          await sendAIAnnouncementEmail(
            user.email,
            subject,
            html
          );
          sent++;
          break;

        default:
          console.log("Unknown email type:", type);
      }
    }

    console.log("Emails processed:", sent);
    console.log("==================================");

    return NextResponse.json({
      success: true,
      message: `${sent} email(s) processed.`,
    });
  } catch (error) {
    console.error("[ADMIN_EMAIL_ERROR]", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send emails.",
      },
      { status: 500 }
    );
  }
}