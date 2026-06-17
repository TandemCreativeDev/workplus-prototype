export function StepLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        margin: "0 0 8px",
        color: "var(--muted)",
        fontSize: 17,
        fontWeight: 700,
      }}
    >
      {children}
    </p>
  );
}

export function ScreenHeading({
  children,
  size = "lg",
}: {
  children: React.ReactNode;
  size?: "lg" | "xl";
}) {
  const fontSize = size === "xl" ? 42 : 36;
  return (
    <h1
      style={{
        fontSize,
        lineHeight: 1.12,
        fontWeight: 800,
        letterSpacing: "-0.02em",
        color: "var(--ink)",
        margin: "0 0 20px",
        textWrap: "balance",
      }}
    >
      {children}
    </h1>
  );
}

export function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 19,
        lineHeight: 1.55,
        color: "var(--soft)",
        margin: "0 0 28px",
      }}
    >
      {children}
    </p>
  );
}
