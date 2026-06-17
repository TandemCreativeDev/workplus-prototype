import { NextRequest } from "next/server";

const DEFAULT_BASE_URL = "https://skillsclassification.org/v1";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  if (!q?.trim()) {
    return Response.json({ error: "Missing query parameter: q" }, { status: 400 });
  }

  const baseUrl = process.env.SSC_API_BASE_URL || DEFAULT_BASE_URL;
  const apiKey = process.env.API_KEY;

  const url = `${baseUrl}/search/?q=${encodeURIComponent(q)}&entities=occupations`;

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  // ← ADJUST THIS LINE to match the actual SSC API auth scheme.
  // Common options:
  //   Bearer token:   headers["Authorization"] = `Bearer ${apiKey}`;
  //   Named header:   headers["X-API-Key"] = apiKey ?? "";
  //   Query param:    append `&api_key=${apiKey}` to `url` above instead.
  if (apiKey) {
    headers["Authorization"] = `Bearer ${apiKey}`;
  }

  try {
    const res = await fetch(url, { headers, cache: "no-store" });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return Response.json(
        { error: `SSC API returned ${res.status}`, detail: body.slice(0, 500) },
        { status: res.status }
      );
    }

    const data = await res.json();
    // SSC response: { results: [{ entity_type, id, title, description, slug, soc_id }], result_count, version }
    // Results are already ranked best-first; take top 5.
    const results = Array.isArray(data?.results) ? data.results.slice(0, 5) : [];
    return Response.json({ results });
  } catch {
    return Response.json({ error: "Failed to reach the SSC API" }, { status: 502 });
  }
}
