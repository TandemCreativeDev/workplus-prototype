"use client";

import { useSnapshot } from "@/lib/useSnapshot";
import { PrimaryButton } from "@/components/PrimaryButton";

function Bullet({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9,
        fontSize: 16,
        color: "var(--ink)",
        fontWeight: 600,
      }}
    >
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "var(--lav)",
          color: "var(--blue)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
        }}
      >
        {icon}
      </span>
      {children}
    </div>
  );
}

export function Welcome() {
  const { start } = useSnapshot();

  return (
    <div className="animate-fade">
      <span
        style={{
          display: "inline-block",
          background: "var(--lav)",
          color: "var(--blue)",
          fontSize: 14,
          fontWeight: 700,
          padding: "7px 14px",
          borderRadius: 999,
          marginBottom: 24,
        }}
      >
        Workforce Needs Snapshot
      </span>
      <h1
        style={{
          fontSize: 42,
          lineHeight: 1.08,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          color: "var(--ink)",
          margin: "0 0 20px",
          textWrap: "balance",
        }}
      >
        Help shape apprenticeships and training across NI
      </h1>
      <p style={{ fontSize: 19, lineHeight: 1.55, color: "var(--soft)", margin: "0 0 16px" }}>
        Workplus works with learning providers to plan apprenticeship and training provision.
        Tell us which roles you&apos;re hiring for, and we&apos;ll use it to plan the right
        courses in the right places.
      </p>
      <p style={{ fontSize: 19, lineHeight: 1.55, color: "var(--soft)", margin: "0 0 28px" }}>
        You&apos;ll describe your organisation, then add each role you&apos;re recruiting for.
        We match every role to a standard occupation as you go — you just confirm it looks
        right.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 22px", marginBottom: 30 }}>
        <Bullet icon="◷">About 5 minutes</Bullet>
        <Bullet icon="↪">No login or account needed</Bullet>
        <Bullet icon="↺">Stays on this device until you submit</Bullet>
      </div>

      <div
        style={{
          background: "var(--lav)",
          borderRadius: 16,
          padding: "24px 26px",
          marginBottom: 34,
        }}
      >
        <p
          style={{
            margin: "0 0 14px",
            fontSize: 15,
            fontWeight: 700,
            color: "var(--ink)",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
          }}
        >
          What you&apos;ll need
        </p>
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: 11,
          }}
        >
          {[
            "Your organisation's name, sector, size and location",
            "The job titles you're hiring for, in your own words",
            "Rough numbers: headcount, vacancies and future demand",
          ].map((line) => (
            <li
              key={line}
              style={{ display: "flex", gap: 11, fontSize: 17, color: "var(--soft)" }}
            >
              <span style={{ color: "var(--blue)", fontWeight: 800 }}>›</span>
              {line}
            </li>
          ))}
        </ul>
      </div>

      <PrimaryButton onClick={start}>Start now</PrimaryButton>
      <p style={{ margin: "24px 0 0", fontSize: 14, color: "var(--muted)" }}>
        Your answers are shared only with Workplus and the learning providers planning
        provision in your area.
      </p>
    </div>
  );
}
