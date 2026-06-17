import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE = "wp_auth";

function publicUrl(request: NextRequest, pathname: string) {
  const host =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    request.nextUrl.host;
  const proto =
    request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "");
  return new URL(pathname, `${proto}://${host}`);
}

export function proxy(request: NextRequest) {
  const expected = process.env.PASSWORD;
  if (!expected) return NextResponse.next();

  const token = request.cookies.get(AUTH_COOKIE)?.value;
  if (token === expected) return NextResponse.next();

  const response = NextResponse.redirect(publicUrl(request, "/login"));
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export const config = {
  matcher: [
    "/((?!login|api/login|_next/static|_next/image|favicon.ico).*)",
  ],
};
