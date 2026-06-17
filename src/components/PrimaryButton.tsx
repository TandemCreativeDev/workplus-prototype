"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  iconChar?: string;
  size?: "md" | "lg";
};

export function PrimaryButton({
  children,
  iconChar = "→",
  size = "md",
  disabled,
  style,
  ...rest
}: Props) {
  const padding = size === "lg" ? "12px 12px 12px 32px" : "11px 11px 11px 30px";
  const fontSize = size === "lg" ? 20 : 19;
  const iconSize = size === "lg" ? 44 : 42;

  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: 16,
    background: disabled ? "#bcbcd8" : "var(--navy)",
    color: "#fff",
    border: "none",
    borderRadius: 999,
    padding,
    fontSize,
    fontWeight: 700,
    cursor: disabled ? "not-allowed" : "pointer",
  } as const;

  return (
    <button type="button" disabled={disabled} style={{ ...base, ...style }} {...rest}>
      {children}
      <span
        style={{
          width: iconSize,
          height: iconSize,
          borderRadius: "50%",
          background: "#fff",
          color: "var(--navy)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size === "lg" ? 20 : 19,
        }}
      >
        {iconChar}
      </span>
    </button>
  );
}

export function SecondaryButton({
  children,
  style,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      type="button"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        background: "#fff",
        color: "var(--navy)",
        border: "2px solid var(--navy)",
        borderRadius: 999,
        padding: "11px 24px",
        fontSize: 18,
        fontWeight: 700,
        cursor: "pointer",
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  style,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      type="button"
      style={{
        background: "none",
        border: "none",
        color: "var(--blue)",
        fontSize: 16,
        cursor: "pointer",
        padding: 0,
        textDecoration: "underline",
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

export function BackLink({ onClick, label = "Back" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        background: "none",
        border: "none",
        color: "var(--blue)",
        fontSize: 16,
        cursor: "pointer",
        padding: 0,
        marginBottom: 26,
        textDecoration: "underline",
      }}
    >
      ← {label}
    </button>
  );
}
