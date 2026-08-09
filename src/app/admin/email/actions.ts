"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function getEmailCenterData() {
  const session = await auth();

  // Security Guard: Ensure user is an ADMIN
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized access.");
  }

  // 1. Get real total users count from PostgreSQL
  const totalUsers = await prisma.user.count();

  // 2. Get real verified users count (where emailVerified is not null)
  const verifiedUsers = await prisma.user.count({
    where: {
      emailVerified: { not: null },
    },
  });

  // 3. Calculate start of today for tracking emails sent today
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  // Safely check for EmailLog model without causing TypeScript compiler errors
  const prismaAny = prisma as any;
  let emailsTodayCount = 0;
  let recentLogs: Array<{
    id: string;
    category: string;
    subject: string;
    recipientCount: number;
    status: string;
    createdAt: Date;
  }> = [];

  try {
    if (prismaAny.emailLog) {
      emailsTodayCount = await prismaAny.emailLog.count({
        where: {
          createdAt: { gte: startOfToday },
        },
      });

      recentLogs = await prismaAny.emailLog.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
      });
    }
  } catch (err) {
    console.log("EmailLog model not yet initialized in Prisma schema:", err);
    emailsTodayCount = 0;
    recentLogs = [];
  }

  return {
    totalUsers,
    verifiedUsers,
    emailsTodayCount,
    recentLogs,
  };
}