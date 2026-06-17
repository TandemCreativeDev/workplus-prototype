"use client";

import { useSnapshot } from "@/lib/useSnapshot";
import { DEMAND_BANDS } from "@/lib/constants";
import { BackLink, PrimaryButton } from "@/components/PrimaryButton";
import { StepLabel } from "@/components/StepLabel";
import { FieldLabel, FieldHint, NumberInput } from "@/components/Field";

function PillButton({
  selected,
  onClick,
  children,
  size = "md",
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  size?: "md" | "lg";
}) {
  const padding = size === "lg" ? "11px 26px" : "11px 20px";
  const fontSize = size === "lg" ? 18 : 17;
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        borderRadius: 999,
        padding,
        fontSize,
        fontWeight: selected ? 700 : 600,
        cursor: "pointer",
        border: selected ? "2px solid var(--navy)" : "2px solid var(--border)",
        background: selected ? "var(--navy)" : "#fff",
        color: selected ? "#fff" : "var(--soft)",
      }}
    >
      {children}
    </button>
  );
}

export function RoleDemand() {
  const { draft, setDraftField, saveRole, goto } = useSnapshot();
  const stepLabel = draft.id != null ? "Editing a role" : "Add a role";

  const backScreen = draft.status === "review" ? "role-nomatch" : "role-match";

  return (
    <div className="animate-fade">
      <BackLink onClick={() => goto(backScreen)} />
      <StepLabel>{stepLabel}</StepLabel>
      <h1
        style={{
          fontSize: 34,
          lineHeight: 1.12,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          color: "var(--ink)",
          margin: "0 0 8px",
        }}
      >
        How much demand is there for this role?
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <span style={{ fontSize: 18, color: "var(--soft)" }}>For</span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 9,
            background: "var(--lav)",
            borderRadius: 999,
            padding: "6px 15px",
            fontSize: 16,
            fontWeight: 700,
            color: "var(--ink)",
          }}
        >
          {draft.localTitle}
          {draft.status === "matched" && draft.matched ? (
            <span style={{ fontWeight: 500, color: "var(--muted)" }}>
              · {draft.matched.title}
            </span>
          ) : null}
          {draft.status === "review" ? (
            <span style={{ fontWeight: 500, color: "var(--muted)" }}>· under review</span>
          ) : null}
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 22, marginBottom: 28 }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <FieldLabel htmlFor="hc">Current headcount</FieldLabel>
          <FieldHint>People doing this role today.</FieldHint>
          <NumberInput
            id="hc"
            value={draft.headcount}
            onValueChange={(v) => setDraftField("headcount", v)}
            placeholder="0"
          />
        </div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <FieldLabel htmlFor="vac">Current vacancies</FieldLabel>
          <FieldHint>Open positions right now.</FieldHint>
          <NumberInput
            id="vac"
            value={draft.vacancies}
            onValueChange={(v) => setDraftField("vacancies", v)}
            placeholder="0"
          />
        </div>
      </div>

      <div style={{ marginBottom: 30 }}>
        <p style={{ margin: "0 0 10px", fontSize: 19, fontWeight: 600, color: "var(--ink)" }}>
          Is this role hard to fill?
        </p>
        <div style={{ display: "inline-flex", gap: 10 }}>
          <PillButton
            selected={draft.hardToFill === true}
            onClick={() => setDraftField("hardToFill", true)}
            size="lg"
          >
            Yes
          </PillButton>
          <PillButton
            selected={draft.hardToFill === false}
            onClick={() => setDraftField("hardToFill", false)}
            size="lg"
          >
            No
          </PillButton>
        </div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <p style={{ margin: "0 0 4px", fontSize: 19, fontWeight: 600, color: "var(--ink)" }}>
          Expected demand over the next 12 months
        </p>
        <FieldHint>Roughly how many people you expect to need to hire.</FieldHint>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {DEMAND_BANDS.map((b) => (
            <PillButton
              key={b}
              selected={draft.demand12 === b}
              onClick={() => setDraftField("demand12", b)}
            >
              {b}
            </PillButton>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 38 }}>
        <p style={{ margin: "0 0 4px", fontSize: 19, fontWeight: 600, color: "var(--ink)" }}>
          Expected demand over the next 2–3 years
        </p>
        <FieldHint>Your best estimate for the medium term.</FieldHint>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {DEMAND_BANDS.map((b) => (
            <PillButton
              key={b}
              selected={draft.demand23 === b}
              onClick={() => setDraftField("demand23", b)}
            >
              {b}
            </PillButton>
          ))}
        </div>
      </div>

      <PrimaryButton onClick={saveRole} iconChar="✓">
        Save role
      </PrimaryButton>
    </div>
  );
}
