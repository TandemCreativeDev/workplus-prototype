"use client";

import { useState } from "react";
import { useSnapshot } from "@/lib/useSnapshot";
import { useMatchStore } from "@/lib/matchStore";
import { BackLink, LinkButton, PrimaryButton } from "@/components/PrimaryButton";
import { StepLabel } from "@/components/StepLabel";
import type { SscOccupation } from "@/lib/types";

export function RoleMatch() {
  const { draft, goto, acceptMatch, flagNoMatch } = useSnapshot();
  const { results } = useMatchStore();
  const [selectedId, setSelectedId] = useState<string | null>(
    results[0]?.id ?? null
  );

  const stepLabel = draft.id != null ? "Editing a role" : "Add a role";
  const selected: SscOccupation | undefined = results.find(
    (r) => r.id === selectedId
  );
  const hasResults = results.length > 0;

  function onAccept() {
    if (!selected) return;
    acceptMatch(selected);
  }

  return (
    <div className="animate-fade">
      <BackLink onClick={() => goto("role-title")} />
      <StepLabel>{stepLabel}</StepLabel>
      <h1
        style={{
          fontSize: 34,
          lineHeight: 1.14,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          color: "var(--ink)",
          margin: "0 0 12px",
        }}
      >
        Which of these best matches &ldquo;{draft.localTitle}&rdquo;?
      </h1>
      <p
        style={{
          fontSize: 18,
          lineHeight: 1.55,
          color: "var(--soft)",
          margin: "0 0 8px",
        }}
      >
        Choose the standard occupation that fits best. Results are ordered most-likely
        first.
      </p>

      {hasResults ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            margin: "26px 0 28px",
          }}
        >
          {results.map((r, idx) => {
            const isSelected = r.id === selectedId;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedId(r.id)}
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  width: "100%",
                  textAlign: "left",
                  border: isSelected ? "2px solid var(--blue)" : "2px solid var(--border)",
                  background: isSelected ? "#f3f3ff" : "#fff",
                  borderRadius: 13,
                  padding: "17px 19px",
                  cursor: "pointer",
                  boxShadow: isSelected ? "0 0 0 1px var(--blue)" : "none",
                  transition: "border-color .12s, background .12s",
                }}
              >
                <span
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    border: "2px solid #b9b9e0",
                    flex: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 1,
                  }}
                >
                  {isSelected ? (
                    <span
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: "var(--blue)",
                      }}
                    />
                  ) : null}
                </span>
                <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                  <span
                    style={{
                      fontSize: 19,
                      fontWeight: 700,
                      color: "var(--ink)",
                      lineHeight: 1.25,
                    }}
                  >
                    {r.title}
                  </span>
                  <span
                    style={{
                      display: "flex",
                      gap: 12,
                      fontSize: 14,
                      color: "var(--muted)",
                    }}
                  >
                    <span>SOC {r.soc_id || "—"}</span>
                    <span>·</span>
                    <span>
                      {idx === 0 ? "Closest match" : `Suggestion ${idx + 1}`}
                    </span>
                  </span>
                  {r.description ? (
                    <span
                      style={{
                        fontSize: 14,
                        color: "var(--soft)",
                        lineHeight: 1.45,
                      }}
                    >
                      {r.description}
                    </span>
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div
          style={{
            background: "var(--lav)",
            borderRadius: 14,
            padding: "22px 24px",
            margin: "26px 0 28px",
          }}
        >
          <p style={{ margin: 0, fontSize: 18, color: "var(--soft)", lineHeight: 1.5 }}>
            We couldn&apos;t find a close standard occupation for that wording. Try
            different words, or flag it for the Workplus team to review.
          </p>
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
        {hasResults ? (
          <PrimaryButton onClick={onAccept} disabled={!selected}>
            Use this occupation
          </PrimaryButton>
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px 26px",
          marginTop: 24,
        }}
      >
        <LinkButton style={{ fontSize: 17 }} onClick={() => goto("role-title")}>
          Search with different words
        </LinkButton>
        <LinkButton style={{ fontSize: 17 }} onClick={flagNoMatch}>
          None of these fit
        </LinkButton>
      </div>
    </div>
  );
}
