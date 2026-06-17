"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { SscOccupation } from "./types";

type Ctx = {
  results: SscOccupation[];
  query: string;
  loading: boolean;
  error: string | null;
  search: (q: string) => Promise<boolean>;
  clear: () => void;
};

const MatchContext = createContext<Ctx | null>(null);

export function MatchProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<SscOccupation[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (q: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setQuery(q);
    try {
      const res = await fetch(`/api/match?q=${encodeURIComponent(q)}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setError(body.error ?? `Search failed (${res.status})`);
        setResults([]);
        return false;
      }
      const data = (await res.json()) as { results: SscOccupation[] };
      setResults(data.results ?? []);
      return true;
    } catch {
      setError("Couldn't reach the matching service. Please try again.");
      setResults([]);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setResults([]);
    setQuery("");
    setError(null);
  }, []);

  return (
    <MatchContext.Provider value={{ results, query, loading, error, search, clear }}>
      {children}
    </MatchContext.Provider>
  );
}

export function useMatchStore(): Ctx {
  const ctx = useContext(MatchContext);
  if (!ctx) throw new Error("useMatchStore must be used within MatchProvider");
  return ctx;
}
