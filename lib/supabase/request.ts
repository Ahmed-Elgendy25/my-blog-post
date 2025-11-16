"use server";

/**
 * Centralized Supabase request helper
 *
 * Usage:
 *   import { supabaseRequest } from "@/lib/supabase/request"
 *   return supabaseRequest(async (supabase) => {
 *     // use supabase here (server client)
 *   })
 */
import { createClient } from "./server";
import type { SupabaseClient } from "@supabase/supabase-js";

export type SupabaseFn<T> = (supabase: SupabaseClient) => Promise<T>;

export async function supabaseRequest<T = unknown>(
  fn: SupabaseFn<T>,
): Promise<T> {
  const supabase = await createClient();
  try {
    const res = await fn(supabase);
    return res;
  } catch (err) {
    // Keep server-side logging here for diagnostics
    // The caller can still handle or rethrow the error
    console.error("Supabase request error:", err);
    throw err;
  }
}

export default supabaseRequest;
