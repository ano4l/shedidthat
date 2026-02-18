import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/types/database";
import { mockSupabase } from "./mock";

const TEST_MODE = process.env.NEXT_PUBLIC_TEST_MODE === "true";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

export const supabase = TEST_MODE
  ? (mockSupabase as any)
  : createClient<Database>(supabaseUrl, supabaseAnonKey);
