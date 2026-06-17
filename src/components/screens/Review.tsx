"use client";

import { useSnapshot } from "@/lib/useSnapshot";
import { BackLink, LinkButton, PrimaryButton } from "@/components/PrimaryButton";
import { StepLabel, ScreenHeading } from "@/components/StepLabel";
import { OccupationLine, StatusChip, demandWord } from "@/components/RoleCard";
import type { Role } from "@/lib/types";

function numOr(v: string): string {
  return v === "" || v == null ? "0" : v;
}

function DemandCells({ role }: { role: Role }) {
  const cells: Array<{ label: string; value: string }> = [
    { label: "Headcount", value: numOr(role.headcount) },
    { label: "Vacancies", value: numOr(role.vacancies) },
    {
      label: "Hard to fill",
      value:
        role.hardToFill === true
          ? "Yes"
          : role.hardToFill === false
            ? "No"
            : "Not given",
    },
    { label: "Next 12 mths", value: demandWord(role.demand12) },
    { label: "Next 2–3 yrs", value: demandWord(role.demand23) },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        borderTop: "1px solid #f0f0f8",
        paddingTop: 14,
      }}
    >
      {cells.map((c) => (
        <div key={c.label} style={{ flex: 1, minWidth: 120 }}>
          <p
            style={{
              margin: "0 0 3px",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            {c.label}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
              color: "var(--ink)",
            }}
          >
            {c.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export function Review() {
  const { org, roles, addRole, editRole, removeRole, goto, editOrg, submit } =
    useSnapshot();

  const orgRows: Array<{ label: string; value: string }> = [
    { label: "Name", value: org.name || "—" },
    { label: "Sector", value: org.sector || "—" },
    { label: "Size", value: org.size || "—" },
    { label: "Location", value: org.location || "—" },
  ];

  return (
    <div className="animate-fade">
      <BackLink onClick={() => goto("roles-list")} />
      <StepLabel>Step 3 of 3 · Review</StepLabel>
      <ScreenHeading>Check your answers before submitting</ScreenHeading>

      <h2
        style={{
          fontSize: 21,
          fontWeight: 800,
          color: "var(--ink)",
          margin: "0 0 12px",
        }}
      >
        Organisation
      </h2>
      <div
        style={{
          border: "1px solid var(--border)",
          borderRadius: 14,
          overflow: "hidden",
          marginBottom: 34,
        }}
      >
        {orgRows.map((o, idx) => (
          <div
            key={o.label}
            style={{
              display: "flex",
              gap: 14,
              alignItems: "baseline",
              padding: "15px 20px",
              borderTop: idx === 0 ? "none" : "1px solid #f0f0f8",
            }}
          >
            <span
              style={{
                flex: "0 0 130px",
                fontSize: 16,
                color: "var(--muted)",
                fontWeight: 600,
              }}
            >
              {o.label}
            </span>
            <span style={{ flex: 1, fontSize: 18, color: "var(--ink)" }}>{o.value}</span>
            <LinkButton onClick={editOrg} style={{ flex: "none" }}>
              Change
            </LinkButton>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <h2
          style={{
            fontSize: 21,
            fontWeight: 800,
            color: "var(--ink)",
            margin: 0,
          }}
        >
          Roles ({roles.length})
        </h2>
        <LinkButton onClick={addRole}>+ Add another</LinkButton>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          marginBottom: 38,
        }}
      >
        {roles.map((r) => (
          <div
            key={r.id}
            style={{
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: "18px 20px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 14,
              }}
            >
              <div style={{ minWidth: 0 }}>
                <p
                  style={{
                    margin: "0 0 5px",
                    fontSize: 19,
                    fontWeight: 700,
                    color: "var(--ink)",
                  }}
                >
                  {r.localTitle}
                </p>
                <OccupationLine role={r} />
                <StatusChip status={r.status} />
              </div>
              <div style={{ display: "flex", gap: 16, flex: "none" }}>
                <LinkButton onClick={() => editRole(r)}>Change</LinkButton>
                <LinkButton style={{ color: "var(--muted)" }} onClick={() => removeRole(r.id)}>
                  Remove
                </LinkButton>
              </div>
            </div>
            <DemandCells role={r} />
          </div>
        ))}
      </div>

      <PrimaryButton onClick={submit} size="lg">
        Submit snapshot
      </PrimaryButton>
      <p style={{ margin: "20px 0 0", fontSize: 15, color: "var(--muted)" }}>
        By submitting you confirm these details are accurate to the best of your knowledge.
      </p>
    </div>
  );
}
