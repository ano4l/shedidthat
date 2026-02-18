import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/types/database";

let _supabase: SupabaseClient<Database> | null = null;

function getSupabase(): SupabaseClient<Database> {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error(
        "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables"
      );
    }
    _supabase = createClient<Database>(url, key);
  }
  return _supabase;
}

export { getSupabase };

// Default export as a proxy so existing `supabase.from(...)` calls keep working
export const supabase = new Proxy({} as SupabaseClient<Database>, {
  get(_target, prop, receiver) {
    // During build/SSG, env vars may be missing — return safe stubs
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      // Return no-op functions that resolve to empty data
      if (prop === "from") {
        return () => {
          const chain: any = {
            select: () => chain,
            insert: () => chain,
            update: () => chain,
            delete: () => chain,
            eq: () => chain,
            neq: () => chain,
            in: () => chain,
            gte: () => chain,
            lte: () => chain,
            lt: () => chain,
            gt: () => chain,
            order: () => chain,
            single: () => chain,
            limit: () => chain,
            then: (resolve: any) => resolve({ data: null, error: { message: "Supabase not configured" } }),
          };
          return chain;
        };
      }
      if (prop === "auth") {
        return {
          getSession: () => Promise.resolve({ data: { session: null }, error: null }),
          onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
          signInWithPassword: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
          signOut: () => Promise.resolve({ error: null }),
        };
      }
      if (prop === "storage") {
        return { from: () => ({ upload: () => Promise.resolve({ error: { message: "Supabase not configured" } }), getPublicUrl: () => ({ data: { publicUrl: "" } }) }) };
      }
      return undefined;
    }
    return (getSupabase() as any)[prop];
  },
});
