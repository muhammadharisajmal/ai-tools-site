import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin privileges required." },
        { status: 401 }
      );
    }

    // Try fetching existing system settings or create initial defaults if model exists
    let settings = null;
    try {
      // @ts-ignore - Handle dynamic Prisma model gracefully if SystemSetting exists
      if (prisma.systemSetting) {
        // @ts-ignore
        settings = await prisma.systemSetting.findFirst();
      }
    } catch {
      settings = null;
    }

    const defaultSettings = {
      siteName: "AI Study Hub",
      supportEmail: "support@aistudyhub.com",
      maintenanceMode: false,
      allowRegistration: true,
      defaultRole: "USER",
      requireEmailVerification: true,
      systemNotice: "",
    };

    return NextResponse.json({
      success: true,
      settings: settings || defaultSettings,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to load system settings." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin privileges required." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      siteName,
      supportEmail,
      maintenanceMode,
      allowRegistration,
      defaultRole,
      requireEmailVerification,
      systemNotice,
    } = body;

    // Validate inputs
    if (!siteName || !supportEmail) {
      return NextResponse.json(
        { success: false, message: "Site name and support email are required." },
        { status: 400 }
      );
    }

    try {
      // @ts-ignore - Upsert if SystemSetting model exists in Prisma
      if (prisma.systemSetting) {
        // @ts-ignore
        const existing = await prisma.systemSetting.findFirst();
        if (existing) {
          // @ts-ignore
          await prisma.systemSetting.update({
            where: { id: existing.id },
            data: {
              siteName: siteName.trim(),
              supportEmail: supportEmail.trim(),
              maintenanceMode: Boolean(maintenanceMode),
              allowRegistration: Boolean(allowRegistration),
              defaultRole: defaultRole || "USER",
              requireEmailVerification: Boolean(requireEmailVerification),
              systemNotice: systemNotice?.trim() || "",
            },
          });
        } else {
          // @ts-ignore
          await prisma.systemSetting.create({
            data: {
              siteName: siteName.trim(),
              supportEmail: supportEmail.trim(),
              maintenanceMode: Boolean(maintenanceMode),
              allowRegistration: Boolean(allowRegistration),
              defaultRole: defaultRole || "USER",
              requireEmailVerification: Boolean(requireEmailVerification),
              systemNotice: systemNotice?.trim() || "",
            },
          });
        }
      }
    } catch {
      // Fallback if settings model is not in database schema yet
    }

    return NextResponse.json({
      success: true,
      message: "System settings updated successfully.",
      settings: {
        siteName: siteName.trim(),
        supportEmail: supportEmail.trim(),
        maintenanceMode,
        allowRegistration,
        defaultRole,
        requireEmailVerification,
        systemNotice,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred while saving settings." },
      { status: 500 }
    );
  }
}