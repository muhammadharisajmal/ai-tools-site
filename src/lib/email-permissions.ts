import { prisma } from "@/lib/prisma";

export type NotificationType =
  | "studyTipsEmails"
  | "weeklySummaryEmails"
  | "productUpdatesEmails"
  | "aiAnnouncementsEmails";

export async function canReceiveEmail(
  email: string,
  notificationType: NotificationType
): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      studyTipsEmails: true,
      weeklySummaryEmails: true,
      productUpdatesEmails: true,
      aiAnnouncementsEmails: true,
    },
  });

  if (!user) {
    return false;
  }

  return Boolean(user[notificationType as keyof typeof user]);
}