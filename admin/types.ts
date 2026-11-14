export interface Inquiry {
  _id: string;
  name: string;
  email: string;
  project_type: string;
  budget_range?: string;
  phone?: string;
  message: string;
  status: "new" | "contacted" | "in_discussion" | "archived";
  createdAt: string;
  updatedAt?: string;
}

export interface AdminStats {
  total: number;
  new: number;
  contacted: number;
  in_discussion: number;
  archived: number;
}
