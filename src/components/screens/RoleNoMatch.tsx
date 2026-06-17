"use client";

import { useSnapshot } from "@/lib/useSnapshot";
import { PrimaryButton } from "@/components/PrimaryButton";
import { StepLabel } from "@/components/StepLabel";

export function RoleNoMatch() {
  const { draft, goto } = useSnapshot();
  const stepLabel = draft.id != null ? "Editing a role" : "Add a role";

  return (
    <div className="animate-fade">
      <StepLabel>{stepLabel}</StepLabel>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
        <span
          style={{
            width: 46,
            height: 46,
            borderRadius: 12,
            background: "var(--lav)",
            color: "var(--blue)",
            fontSize: 24,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "none",
          }}
        >
          ✓
        </span>
        <h1
          style={{
            fontSize: 32,
            lineHeight: 1.12,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            margin: 0,
          }}
        >
          That&apos;s saved — we&apos;ll review it for you
        </h1>
      </div>
      <p style={{ fontSize: 19, lineHeight: 1.55, color: "var(--soft)", margin: "0 0 16px" }}>
        No problem. We&apos;ve saved &ldquo;
        <strong style={{ color: "var(--ink)" }}>{draft.localTitle}</strong>
        &rdquo; and the Workplus team will match it to the right standard occupation by
        hand. You don&apos;t need to do anything else for this one.
      </p>
      <p style={{ fontSize: 19, lineHeight: 1.55, color: "var(--soft)", margin: "0 0 32px" }}>
        Carry on and tell us how much demand there is for this role.
      </p>

      <div
        style={{
          background: "var(--lav)",
          borderRadius: 14,
          padding: "18px 22px",
          marginBottom: 34,
          display: "flex",
          gap: 13,
          alignItems: "flex-start",
        }}
      >
        <span
          style={{
            color: "var(--blue)",
            fontWeight: 800,
            fontSize: 18,
            lineHeight: 1.4,
          }}
        >
          i
        </span>
        <p style={{ margin: 0, fontSize: 16, color: "var(--soft)", lineHeight: 1.5 }}>
          It&apos;ll show as <strong style={{ color: "var(--ink)" }}>Under review</strong> in
          your list until the team confirms a match.
        </p>
      </div>

      <PrimaryButton onClick={() => goto("role-demand")}>Continue</PrimaryButton>
    </div>
  );
}
