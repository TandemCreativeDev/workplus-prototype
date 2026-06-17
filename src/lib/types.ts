export type Screen =
  | "welcome"
  | "org"
  | "roles-empty"
  | "role-title"
  | "role-match"
  | "role-nomatch"
  | "role-demand"
  | "roles-list"
  | "review"
  | "done";

export type Org = {
  name: string;
  sector: string;
  size: string;
  location: string;
};

export type SscOccupation = {
  id: string;
  soc_id: string;
  title: string;
  description?: string;
  slug?: string;
};

export type Role = {
  id: number;
  localTitle: string;
  matched: SscOccupation | null;
  status: "matched" | "review";
  headcount: string;
  vacancies: string;
  hardToFill: boolean | null;
  demand12: string;
  demand23: string;
};

export type RoleDraft = Omit<Role, "id" | "status" | "matched"> & {
  id: number | null;
  status: "matched" | "review" | null;
  matched: SscOccupation | null;
};
