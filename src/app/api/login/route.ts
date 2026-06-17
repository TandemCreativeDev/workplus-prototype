import { NextRequest, NextResponse } from "next/server";

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

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const password = String(form.get("password") ?? "");
  const expected = process.env.PASSWORD;

  if (!expected || password !== expected) {
    const fail = NextResponse.redirect(publicUrl(request, "/login?error=1"), {
      status: 303,
    });
    fail.headers.set("Cache-Control", "no-store");
    return fail;
  }

  const response = NextResponse.redirect(publicUrl(request, "/"), { status: 303 });
  response.headers.set("Cache-Control", "no-store");
  response.cookies.set({
    name: AUTH_COOKIE,
    value: expected,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
