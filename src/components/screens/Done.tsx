"use client";

import { useSnapshot } from "@/lib/useSnapshot";
import { LinkButton, PrimaryButton } from "@/components/PrimaryButton";
import { downloadCsv } from "@/lib/csv";

export function Done() {
  const { org, roles, startOver } = useSnapshot();
  const orgName = org.name || "your organisation";

  return (
    <div className="animate-pop" style={{ textAlign: "center", paddingTop: 14 }}>
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "var(--blue)",
          color: "#fff",
          fontSize: 38,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 26px",
        }}
      >
        ✓
      </div>
      <h1
        style={{
          fontSize: 38,
          lineHeight: 1.1,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          color: "var(--ink)",
          margin: "0 0 16px",
        }}
      >
        Thank you — that&apos;s submitted
      </h1>
      <p
        style={{
          fontSize: 19,
          lineHeight: 1.55,
          color: "var(--soft)",
          margin: "0 auto 30px",
          maxWidth: 520,
        }}
      >
        We&apos;ve received your workforce snapshot for{" "}
        <strong style={{ color: "var(--ink)" }}>{orgName}</strong>. There&apos;s nothing
        more you need to do.
      </p>

      <div
        style={{
          background: "var(--lav)",
          borderRadius: 16,
          padding: "26px 28px",
          textAlign: "left",
          maxWidth: 540,
          margin: "0 auto 32px",
        }}
      >
        <p
          style={{
            margin: "0 0 16px",
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "0.03em",
            textTransform: "uppercase",
            color: "var(--ink)",
          }}
        >
          What happens next
        </p>
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {[
            "Workplus reviews your roles, including any flagged as under review.",
            "We combine it with other employers' demand to plan apprenticeship and training provision.",
            "We may be in touch if there's a good apprenticeship or training fit for your roles.",
          ].map((line, i) => (
            <li
              key={line}
              style={{
                display: "flex",
                gap: 13,
                fontSize: 17,
                color: "var(--soft)",
                lineHeight: 1.45,
              }}
            >
              <span
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "#fff",
                  color: "var(--blue)",
                  fontWeight: 700,
                  fontSize: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: "none",
                }}
              >
                {i + 1}
              </span>
              {line}
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 14,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <PrimaryButton onClick={() => downloadCsv(org, roles)} iconChar="↓">
          Download CSV
        </PrimaryButton>
      </div>
      <p style={{ fontSize: 16, color: "var(--muted)", margin: "8px 0 8px" }}>
        You can close this window now.
      </p>
      <LinkButton onClick={startOver}>Submit another snapshot</LinkButton>
    </div>
  );
}
