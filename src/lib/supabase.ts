import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface DbMenuItem {
  id: string;
  category_id: string;
  name: string;
  price: number | string;
  description: string | null;
  image_url: string | null;
  coming_soon: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface DbMenuCategory {
  id: string;
  menu_type: "shop" | "restaurant";
  name: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}
