"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Org, Role, RoleDraft, Screen, SscOccupation } from "./types";

type EditReturn = "review" | null;

type State = {
  screen: Screen;
  org: Org;
  roles: Role[];
  draft: RoleDraft;
  editReturn: EditReturn;
  seq: number;
};

const blankOrg: Org = { name: "", sector: "", size: "", location: "" };

const blankDraft = (): RoleDraft => ({
  id: null,
  localTitle: "",
  matched: null,
  status: null,
  headcount: "",
  vacancies: "",
  hardToFill: null,
  demand12: "",
  demand23: "",
});

const initial: State = {
  screen: "welcome",
  org: blankOrg,
  roles: [],
  draft: blankDraft(),
  editReturn: null,
  seq: 1,
};

type Ctx = {
  state: State;
  org: Org;
  roles: Role[];
  draft: RoleDraft;
  screen: Screen;
  editReturn: EditReturn;
  setOrgField: (k: keyof Org, v: string) => void;
  setDraftField: <K extends keyof RoleDraft>(k: K, v: RoleDraft[K]) => void;
  orgValid: boolean;
  goto: (screen: Screen) => void;
  start: () => void;
  saveOrg: () => void;
  backFromOrg: () => void;
  addRole: () => void;
  cancelRole: () => void;
  acceptMatch: (occ: SscOccupation) => void;
  flagNoMatch: () => void;
  saveRole: () => void;
  editRole: (role: Role) => void;
  removeRole: (id: number) => void;
  editOrg: () => void;
  startOver: () => void;
  submit: () => void;
};

const SnapshotContext = createContext<Ctx | null>(null);

export function SnapshotProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(initial);

  const goto = useCallback((screen: Screen) => {
    setState((s) => ({ ...s, screen }));
    if (typeof window !== "undefined") {
      try {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      } catch {
        window.scrollTo(0, 0);
      }
    }
  }, []);

  const setOrgField = useCallback((k: keyof Org, v: string) => {
    setState((s) => ({ ...s, org: { ...s.org, [k]: v } }));
  }, []);

  const setDraftField = useCallback(
    <K extends keyof RoleDraft>(k: K, v: RoleDraft[K]) => {
      setState((s) => ({ ...s, draft: { ...s.draft, [k]: v } }));
    },
    []
  );

  const orgValid = useMemo(() => {
    const o = state.org;
    return Boolean(o.name.trim() && o.sector && o.size && o.location.trim());
  }, [state.org]);

  const start = useCallback(() => goto("org"), [goto]);

  const saveOrg = useCallback(() => {
    setState((s) => {
      const next = s.editReturn === "review"
        ? "review"
        : s.roles.length
          ? "roles-list"
          : "roles-empty";
      return { ...s, screen: next, editReturn: null };
    });
  }, []);

  const backFromOrg = useCallback(() => {
    setState((s) => ({
      ...s,
      screen: s.editReturn === "review" ? "review" : "welcome",
      editReturn: null,
    }));
  }, []);

  const addRole = useCallback(() => {
    setState((s) => ({
      ...s,
      draft: blankDraft(),
      editReturn: s.screen === "review" ? "review" : null,
      screen: "role-title",
    }));
  }, []);

  const cancelRole = useCallback(() => {
    setState((s) => ({
      ...s,
      screen:
        s.editReturn === "review"
          ? "review"
          : s.roles.length
            ? "roles-list"
            : "roles-empty",
      editReturn: null,
    }));
  }, []);

  const acceptMatch = useCallback((occ: SscOccupation) => {
    setState((s) => ({
      ...s,
      draft: { ...s.draft, matched: occ, status: "matched" },
      screen: "role-demand",
    }));
  }, []);

  const flagNoMatch = useCallback(() => {
    setState((s) => ({
      ...s,
      draft: { ...s.draft, matched: null, status: "review" },
      screen: "role-nomatch",
    }));
  }, []);

  const saveRole = useCallback(() => {
    setState((s) => {
      const d = s.draft;
      if (d.status == null) return s;
      const newRole: Role = {
        id: d.id ?? s.seq,
        localTitle: d.localTitle,
        matched: d.matched,
        status: d.status,
        headcount: d.headcount,
        vacancies: d.vacancies,
        hardToFill: d.hardToFill,
        demand12: d.demand12,
        demand23: d.demand23,
      };
      const roles =
        d.id != null
          ? s.roles.map((r) => (r.id === d.id ? newRole : r))
          : [...s.roles, newRole];
      const seq = d.id != null ? s.seq : s.seq + 1;
      const screen = s.editReturn === "review" ? "review" : "roles-list";
      return { ...s, roles, seq, screen, editReturn: null };
    });
  }, []);

  const editRole = useCallback((role: Role) => {
    setState((s) => ({
      ...s,
      draft: {
        id: role.id,
        localTitle: role.localTitle,
        matched: role.matched,
        status: role.status,
        headcount: role.headcount,
        vacancies: role.vacancies,
        hardToFill: role.hardToFill,
        demand12: role.demand12,
        demand23: role.demand23,
      },
      editReturn: s.screen === "review" ? "review" : null,
      screen: "role-demand",
    }));
  }, []);

  const removeRole = useCallback((id: number) => {
    setState((s) => ({ ...s, roles: s.roles.filter((r) => r.id !== id) }));
  }, []);

  const editOrg = useCallback(() => {
    setState((s) => ({ ...s, editReturn: "review", screen: "org" }));
  }, []);

  const startOver = useCallback(() => {
    setState(initial);
  }, []);

  const submit = useCallback(() => goto("done"), [goto]);

  const value: Ctx = {
    state,
    org: state.org,
    roles: state.roles,
    draft: state.draft,
    screen: state.screen,
    editReturn: state.editReturn,
    setOrgField,
    setDraftField,
    orgValid,
    goto,
    start,
    saveOrg,
    backFromOrg,
    addRole,
    cancelRole,
    acceptMatch,
    flagNoMatch,
    saveRole,
    editRole,
    removeRole,
    editOrg,
    startOver,
    submit,
  };

  return (
    <SnapshotContext.Provider value={value}>
      {children}
    </SnapshotContext.Provider>
  );
}

export function useSnapshot(): Ctx {
  const ctx = useContext(SnapshotContext);
  if (!ctx) throw new Error("useSnapshot must be used within SnapshotProvider");
  return ctx;
}
