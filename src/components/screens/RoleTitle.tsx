"use client";

import { useState, type FormEvent } from "react";
import { useSnapshot } from "@/lib/useSnapshot";
import { useMatchStore } from "@/lib/matchStore";
import { BackLink, PrimaryButton } from "@/components/PrimaryButton";
import { StepLabel, ScreenHeading } from "@/components/StepLabel";

export function RoleTitle() {
  const { draft, setDraftField, cancelRole, goto, editReturn } = useSnapshot();
  const { search, loading, error } = useMatchStore();
  const [submitted, setSubmitted] = useState(false);

  const titleEmpty = draft.localTitle.trim().length === 0;

  const stepLabel =
    draft.id != null ? "Editing a role" : editReturn === "review" ? "Add a role" : "Add a role";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (titleEmpty || loading) return;
    setSubmitted(true);
    const ok = await search(draft.localTitle.trim());
    if (ok) goto("role-match");
  }

  return (
    <div className="animate-fade">
      <BackLink onClick={cancelRole} label="Back to your roles" />
      <StepLabel>{stepLabel}</StepLabel>
      <ScreenHeading>What do you call this role?</ScreenHeading>
      <p
        style={{
          fontSize: 19,
          lineHeight: 1.55,
          color: "var(--soft)",
          margin: "0 0 26px",
        }}
      >
        Type the job title you&apos;d use yourself, then choose &ldquo;Find match&rdquo; to see
        suggested standard occupations.
      </p>

      <form onSubmit={onSubmit}>
        <div style={{ maxWidth: 560 }}>
          <input
            id="roleTitle"
            type="text"
            autoComplete="off"
            value={draft.localTitle}
            onChange={(e) => setDraftField("localTitle", e.target.value)}
            placeholder="e.g. site foreman"
            style={{
              width: "100%",
              fontSize: 20,
              padding: "15px 17px",
              border: "2px solid var(--border)",
              borderRadius: 10,
              background: "#fff",
              color: "var(--ink)",
            }}
          />
        </div>

        {submitted && error ? (
          <p style={{ margin: "14px 0 0", fontSize: 16, color: "#b03333", maxWidth: 560 }}>
            {error}
          </p>
        ) : null}

        <div style={{ marginTop: 34 }}>
          <PrimaryButton type="submit" disabled={titleEmpty || loading}>
            {loading ? "Finding match…" : "Find match"}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}
