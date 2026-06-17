import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE = "wp_auth";

export function proxy(request: NextRequest) {
  const expected = process.env.PASSWORD;
  if (!expected) return NextResponse.next();

  const token = request.cookies.get(AUTH_COOKIE)?.value;
  if (token === expected) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";
  const response = NextResponse.redirect(url);
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export const config = {
  matcher: [
    "/((?!login|api/login|_next/static|_next/image|favicon.ico).*)",
  ],
};
