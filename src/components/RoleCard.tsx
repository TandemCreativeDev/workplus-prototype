"use client";

import type { Role } from "@/lib/types";

const matchedChip: React.CSSProperties = {
  display: "inline-block",
  fontSize: 13,
  fontWeight: 700,
  color: "var(--blue)",
  background: "var(--lav)",
  padding: "5px 13px",
  borderRadius: 999,
};

const reviewChip: React.CSSProperties = {
  display: "inline-block",
  fontSize: 13,
  fontWeight: 700,
  color: "#7a5b00",
  background: "#fbf3da",
  border: "1px solid #efe2b8",
  padding: "5px 13px",
  borderRadius: 999,
};

function numOr(v: string): string {
  return v === "" || v == null ? "0" : v;
}

export function StatusChip({ status }: { status: Role["status"] }) {
  return (
    <span style={status === "matched" ? matchedChip : reviewChip}>
      {status === "matched" ? "Matched" : "Under review"}
    </span>
  );
}

export function OccupationLine({ role }: { role: Role }) {
  if (role.status === "matched" && role.matched) {
    return (
      <p style={{ margin: "0 0 10px", fontSize: 16, color: "var(--soft)" }}>
        Matched to: {role.matched.title}
        {role.matched.soc_id ? (
          <span style={{ color: "var(--muted)" }}> · SOC {role.matched.soc_id}</span>
        ) : null}
      </p>
    );
  }
  return (
    <p style={{ margin: "0 0 10px", fontSize: 16, color: "var(--soft)" }}>
      Awaiting a standard occupation match
    </p>
  );
}

export function RoleSummaryRow({
  role,
  onEdit,
  onRemove,
}: {
  role: Role;
  onEdit: () => void;
  onRemove: () => void;
}) {
  const demandLabel = `Headcount ${numOr(role.headcount)} · ${numOr(role.vacancies)} vacancies`;
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: "18px 20px",
        display: "flex",
        gap: 16,
        alignItems: "flex-start",
        background: "#fff",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            margin: "0 0 6px",
            fontSize: 19,
            fontWeight: 700,
            color: "var(--ink)",
          }}
        >
          {role.localTitle}
        </p>
        <OccupationLine role={role} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <StatusChip status={role.status} />
          <span
            style={{
              display: "inline-block",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--muted)",
              background: "var(--lav2)",
              border: "1px solid var(--border)",
              padding: "4px 11px",
              borderRadius: 999,
            }}
          >
            {demandLabel}
          </span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 16, flex: "none" }}>
        <button
          type="button"
          onClick={onEdit}
          style={{
            background: "none",
            border: "none",
            color: "var(--blue)",
            fontSize: 16,
            cursor: "pointer",
            padding: 0,
            textDecoration: "underline",
          }}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onRemove}
          style={{
            background: "none",
            border: "none",
            color: "var(--muted)",
            fontSize: 16,
            cursor: "pointer",
            padding: 0,
            textDecoration: "underline",
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export function demandWord(v: string): string {
  return v === "" || v == null ? "Not given" : v;
}
