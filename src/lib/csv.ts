import type { Org, Role } from "./types";

const COLUMNS = [
  "org_name",
  "sector",
  "size",
  "location",
  "local_job_title",
  "ssc_occupation_id",
  "soc_id",
  "ssc_occupation_title",
  "match_status",
  "headcount",
  "vacancies",
  "hard_to_fill",
  "demand_12m",
  "demand_2_3y",
] as const;

function escape(value: string | number | null | undefined): string {
  const s = value == null ? "" : String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function buildCsv(org: Org, roles: Role[]): string {
  const header = COLUMNS.join(",");
  const rows = roles.map((r) =>
    [
      org.name,
      org.sector,
      org.size,
      org.location,
      r.localTitle,
      r.matched?.id ?? "",
      r.matched?.soc_id ?? "",
      r.matched?.title ?? "",
      r.status === "matched" ? "matched" : "under_review",
      r.headcount,
      r.vacancies,
      r.hardToFill === true ? "yes" : r.hardToFill === false ? "no" : "",
      r.demand12,
      r.demand23,
    ]
      .map(escape)
      .join(",")
  );
  return [header, ...rows].join("\n");
}

export function csvFilename(org: Org): string {
  const slug = (org.name || "snapshot")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  return `workforce-snapshot-${slug || "snapshot"}.csv`;
}

export function downloadCsv(org: Org, roles: Role[]): void {
  const csv = buildCsv(org, roles);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = csvFilename(org);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
