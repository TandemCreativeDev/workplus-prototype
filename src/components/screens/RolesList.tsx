"use client";

import { useSnapshot } from "@/lib/useSnapshot";
import { PrimaryButton, SecondaryButton } from "@/components/PrimaryButton";
import { StepLabel, ScreenHeading } from "@/components/StepLabel";
import { RoleSummaryRow } from "@/components/RoleCard";

export function RolesList() {
  const { roles, addRole, editRole, removeRole, goto } = useSnapshot();
  const countLabel = roles.length === 1 ? "1 role" : `${roles.length} roles`;

  return (
    <div className="animate-fade">
      <StepLabel>Step 2 of 3 · Your roles</StepLabel>
      <ScreenHeading>Your roles</ScreenHeading>
      <p
        style={{
          fontSize: 18,
          lineHeight: 1.5,
          color: "var(--soft)",
          margin: "0 0 28px",
        }}
      >
        {countLabel} added. Add more, or finish when you&apos;re done.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          marginBottom: 30,
        }}
      >
        {roles.map((r) => (
          <RoleSummaryRow
            key={r.id}
            role={r}
            onEdit={() => editRole(r)}
            onRemove={() => removeRole(r.id)}
          />
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
        <SecondaryButton onClick={addRole}>+ Add another role</SecondaryButton>
        <PrimaryButton onClick={() => goto("review")} size="md">
          I&apos;m done
        </PrimaryButton>
      </div>
    </div>
  );
}
