import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role || "USER";
  const pathname = req.nextUrl.pathname;

  const isAuthRoute = pathname === "/login" || pathname === "/signup";
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  
  // Strictly protected routes requiring an active session
  const isProtectedRoute =
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||
    pathname === "/profile" ||
    pathname.startsWith("/profile/") ||
    pathname === "/settings" ||
    pathname.startsWith("/settings/") ||
    pathname.endsWith("/workspace") ||
    isAdminRoute;

  const makeRedirect = (targetUrl: URL) => {
    const res = NextResponse.redirect(targetUrl);
    res.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    res.headers.set("Pragma", "no-cache");
    res.headers.set("Expires", "0");
    return res;
  };

  if (isAuthRoute && isLoggedIn) {
    const target = userRole === "ADMIN" ? "/admin" : "/dashboard";
    return makeRedirect(new URL(target, req.nextUrl.origin));
  }

  if (isProtectedRoute && !isLoggedIn) {
    const redirectUrl = new URL("/login", req.nextUrl.origin);
    if (isAdminRoute) {
      redirectUrl.searchParams.set("admin", "true");
    }
    redirectUrl.searchParams.set("callbackUrl", pathname);
    return makeRedirect(redirectUrl);
  }

  if (isAdminRoute && userRole !== "ADMIN") {
    return makeRedirect(new URL("/dashboard", req.nextUrl.origin));
  }

  const response = NextResponse.next();
  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  return response;
});

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin",
    "/admin/:path*",
    "/profile",
    "/profile/:path*",
    "/settings",
    "/settings/:path*",
    "/writing/workplace",
    "/coding/workplace",
    "/productivity/workplace",
    "/research/workplace",
    "/study-planner/workplace",
    "/login",
    "/signup",
  ],
};