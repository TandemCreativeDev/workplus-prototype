import type { ReactNode } from "react";

export function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#e7e7f7",
        padding: "30px 22px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1140px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            background: "#f4f4fc",
            border: "1px solid #dfdff2",
            borderBottom: "none",
            borderRadius: "16px 16px 0 0",
            padding: "13px 18px",
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#e1746a" }} />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#e6c14e" }} />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#6fc081" }} />
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 9,
              background: "#fff",
              border: "1px solid #e2e2f0",
              borderRadius: 9,
              padding: "7px 14px",
              maxWidth: 520,
              margin: "0 auto",
              color: "#6b6b8c",
              fontSize: 13.5,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                width: 13,
                height: 11,
                border: "1.8px solid #8a8aac",
                borderRadius: 3,
                flex: "none",
              }}
            />
            <span style={{ color: "#16163a" }}>workplus.org</span>
            <span style={{ color: "#9595b8" }}>/snapshot/9f3a-2c1b</span>
          </div>
          <div style={{ width: 52 }} />
        </div>

        <div
          style={{
            background: "#fff",
            border: "1px solid #dfdff2",
            borderRadius: "0 0 16px 16px",
            overflow: "hidden",
            boxShadow: "0 24px 60px -28px rgba(20,20,70,.32)",
          }}
        >
          {children}
        </div>

        <p style={{ textAlign: "center", fontSize: 13, color: "#9494b6", margin: "18px 0 0" }}>
          Workplus · Workforce Needs Snapshot · Proof of concept
        </p>
      </div>
    </div>
  );
}
