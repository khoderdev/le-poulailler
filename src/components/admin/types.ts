import type { MenuItem } from "../../types";

export interface EditingItem extends MenuItem {
  category_id: string;
}

export type SaveStatus = "idle" | "saving" | "saved" | "error";

export interface DeleteTarget {
  type: "item" | "menu" | "category";
  id: string;
  name: string;
}
