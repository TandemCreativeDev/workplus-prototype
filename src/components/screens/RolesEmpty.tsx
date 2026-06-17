"use client";

import { useSnapshot } from "@/lib/useSnapshot";
import { BackLink, PrimaryButton } from "@/components/PrimaryButton";
import { StepLabel, ScreenHeading } from "@/components/StepLabel";

export function RolesEmpty() {
  const { addRole, goto } = useSnapshot();

  return (
    <div className="animate-fade">
      <BackLink onClick={() => goto("org")} />
      <StepLabel>Step 2 of 3 · Your roles</StepLabel>
      <ScreenHeading>Which roles are you hiring for?</ScreenHeading>
      <p
        style={{
          fontSize: 19,
          lineHeight: 1.55,
          color: "var(--soft)",
          margin: "0 0 32px",
        }}
      >
        Add each role you&apos;re recruiting for now or expect to recruit for. Use whatever
        job title you&apos;d use in an advert — we&apos;ll match it to a standard
        occupation.
      </p>

      <div
        style={{
          border: "2px dashed var(--border)",
          borderRadius: 16,
          padding: "46px 28px",
          textAlign: "center",
          background: "var(--lav2)",
        }}
      >
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 14,
            background: "var(--lav)",
            color: "var(--blue)",
            fontSize: 28,
            fontWeight: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 18px",
          }}
        >
          +
        </div>
        <p style={{ margin: "0 0 22px", fontSize: 18, color: "var(--soft)" }}>
          You haven&apos;t added any roles yet.
        </p>
        <PrimaryButton onClick={addRole} size="md">
          Add a role
        </PrimaryButton>
      </div>
    </div>
  );
}
