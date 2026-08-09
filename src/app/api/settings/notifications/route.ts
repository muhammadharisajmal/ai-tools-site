import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const allowedKeys = [
  "studyTipsEmails",
  "weeklySummaryEmails",
  "productUpdatesEmails",
  "aiAnnouncementsEmails",
] as const;

type AllowedKey = (typeof allowedKeys)[number];

export async function PATCH(req: Request) {
  try {
    // Check authentication
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    // Get request body
    const { key, value } = await req.json();

    // Validate key
    if (!allowedKeys.includes(key as AllowedKey)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid notification setting.",
        },
        { status: 400 }
      );
    }

    // Validate value
    if (typeof value !== "boolean") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid value.",
        },
        { status: 400 }
      );
    }

    // Update only the selected notification field
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        [key]: value,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Notification preference updated successfully.",
    });
  } catch (error) {
    console.error("[NOTIFICATION_SETTINGS_ERROR]", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}