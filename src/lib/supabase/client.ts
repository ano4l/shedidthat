import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/types/database";

let _supabase: SupabaseClient<Database> | null = null;

export const supabase = new Proxy({} as SupabaseClient<Database>, {
  get(_target, prop) {
    if (!_supabase) {
      _supabase = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
      );
    }
    return (_supabase as any)[prop];
  },
});
