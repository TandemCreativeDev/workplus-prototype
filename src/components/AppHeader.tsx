"use client";

import { useSnapshot } from "@/lib/useSnapshot";
import type { Screen } from "@/lib/types";

const STAGE_LABEL: Record<Screen, string> = {
  welcome: "",
  org: "Your details",
  "roles-empty": "Your roles",
  "role-title": "Your roles",
  "role-match": "Your roles",
  "role-nomatch": "Your roles",
  "role-demand": "Your roles",
  "roles-list": "Your roles",
  review: "Review",
  done: "Submitted",
};

export function AppHeader() {
  const { screen, startOver } = useSnapshot();
  const isWelcome = screen === "welcome";
  const stageLabel = STAGE_LABEL[screen];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 30px",
        borderBottom: "1px solid #eeeef8",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 2,
          fontWeight: 800,
          fontStyle: "italic",
          fontSize: 27,
          letterSpacing: "-0.03em",
          color: "var(--blue)",
        }}
      >
        work<span style={{ color: "var(--blue)" }}>+</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {isWelcome ? (
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--muted)" }}>
            For employers · Northern Ireland
          </span>
        ) : (
          <>
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "var(--muted)",
                letterSpacing: "0.02em",
              }}
            >
              {stageLabel}
            </span>
            <button
              type="button"
              onClick={startOver}
              style={{
                background: "none",
                border: "none",
                color: "var(--blue)",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "underline",
                padding: 0,
              }}
            >
              Start again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
