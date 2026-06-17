export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const hasError = error === "1";

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
      <div style={{ width: "100%", maxWidth: 1040 }}>
        <div
          style={{
            background: "#fff",
            border: "1px solid #dfdff2",
            borderRadius: 18,
            overflow: "hidden",
            boxShadow: "0 24px 60px -28px rgba(20,20,70,.32)",
          }}
        >
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
            <span
              style={{ fontSize: 14, fontWeight: 600, color: "var(--muted)" }}
            >
              For employers · Northern Ireland
            </span>
          </div>

          <main style={{ padding: "54px 30px 70px" }}>
            <div style={{ maxWidth: 460, margin: "0 auto" }}>
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
                Prototype access
              </span>
              <h1
                style={{
                  fontSize: 36,
                  lineHeight: 1.1,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                  margin: "0 0 14px",
                }}
              >
                Enter the password to continue
              </h1>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: "var(--soft)",
                  margin: "0 0 28px",
                }}
              >
                This is a private preview of the Workplus Workforce Needs
                Snapshot. Ask the Workplus or Tandem team for the password.
              </p>

              <form method="POST" action="/api/login">
                <label
                  htmlFor="password"
                  style={{
                    display: "block",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "var(--ink)",
                    marginBottom: 8,
                  }}
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoFocus
                  autoComplete="current-password"
                  required
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    fontSize: 17,
                    borderRadius: 12,
                    border: hasError
                      ? "2px solid #c8253a"
                      : "1.5px solid var(--border)",
                    background: "#fff",
                    color: "var(--ink)",
                    marginBottom: hasError ? 10 : 22,
                  }}
                />
                {hasError && (
                  <p
                    style={{
                      margin: "0 0 18px",
                      fontSize: 14,
                      color: "#c8253a",
                      fontWeight: 600,
                    }}
                  >
                    That password didn&apos;t match. Try again.
                  </p>
                )}

                <button
                  type="submit"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 16,
                    background: "var(--navy)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 999,
                    padding: "11px 11px 11px 30px",
                    fontSize: 19,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Continue
                  <span
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      background: "#fff",
                      color: "var(--navy)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 19,
                    }}
                  >
                    →
                  </span>
                </button>
              </form>
            </div>
          </main>
        </div>
        <p
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "#9494b6",
            margin: "18px 0 0",
          }}
        >
          Workplus · Workforce Needs Snapshot · Proof of concept
        </p>
      </div>
    </div>
  );
}
