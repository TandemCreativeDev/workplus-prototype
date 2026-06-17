"use client";

import type {
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from "react";

export function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      style={{
        display: "block",
        fontSize: 19,
        fontWeight: 600,
        color: "var(--ink)",
        marginBottom: 8,
      }}
    >
      {children}
    </label>
  );
}

export function FieldHint({ children }: { children: ReactNode }) {
  return (
    <p style={{ margin: "0 0 10px", fontSize: 16, color: "var(--muted)" }}>{children}</p>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  fontSize: 19,
  padding: "14px 16px",
  border: "2px solid var(--border)",
  borderRadius: 10,
  background: "#fff",
  color: "var(--ink)",
};

export function TextInput({
  value,
  onValueChange,
  style,
  ...rest
}: Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  value: string;
  onValueChange: (v: string) => void;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onValueChange(e.target.value)}
      style={{ ...inputStyle, ...style }}
      {...rest}
    />
  );
}

export function NumberInput({
  value,
  onValueChange,
  style,
  ...rest
}: Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  value: string;
  onValueChange: (v: string) => void;
}) {
  return (
    <input
      type="number"
      min={0}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onValueChange(e.target.value)}
      style={{
        ...inputStyle,
        width: 140,
        fontSize: 19,
        padding: "13px 15px",
        ...style,
      }}
      {...rest}
    />
  );
}

export function Select({
  value,
  onValueChange,
  children,
  ...rest
}: Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange"> & {
  value: string;
  onValueChange: (v: string) => void;
  children: ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => onValueChange(e.target.value)}
      style={{
        ...inputStyle,
        appearance: "none",
        backgroundImage:
          "linear-gradient(45deg, transparent 50%, var(--muted) 50%), linear-gradient(135deg, var(--muted) 50%, transparent 50%)",
        backgroundPosition:
          "calc(100% - 22px) calc(50% - 3px), calc(100% - 16px) calc(50% - 3px)",
        backgroundSize: "6px 6px, 6px 6px",
        backgroundRepeat: "no-repeat",
      }}
      {...rest}
    >
      {children}
    </select>
  );
}
