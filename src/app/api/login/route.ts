import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "wp_auth";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const password = String(form.get("password") ?? "");
  const expected = process.env.PASSWORD;

  if (!expected || password !== expected) {
    return new NextResponse(null, {
      status: 303,
      headers: {
        Location: "/login?error=1",
        "Cache-Control": "no-store",
      },
    });
  }

  const response = new NextResponse(null, {
    status: 303,
    headers: {
      Location: "/",
      "Cache-Control": "no-store",
    },
  });
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
