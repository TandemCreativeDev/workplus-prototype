import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "wp_auth";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const password = String(form.get("password") ?? "");
  const expected = process.env.PASSWORD;

  const home = new URL("/", request.url);
  const loginUrl = new URL("/login", request.url);

  if (!expected || password !== expected) {
    loginUrl.searchParams.set("error", "1");
    const fail = NextResponse.redirect(loginUrl, { status: 303 });
    fail.headers.set("Cache-Control", "no-store");
    return fail;
  }

  const response = NextResponse.redirect(home, { status: 303 });
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
