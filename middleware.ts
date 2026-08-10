import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/writing/workplace",
    "/coding/workplace",
    "/productivity/workplace",
    "/research/workplace",
    "/study-planner/workplace",
  ],
};