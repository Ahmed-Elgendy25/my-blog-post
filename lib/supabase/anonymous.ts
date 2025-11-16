import { createClient } from "@supabase/supabase-js";

/**
 * Anonymous Supabase client for build-time operations
 * Use this for generateStaticParams and other build-time functions
 * that don't have access to cookies or request context
 */
export function createAnonymousClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing Supabase environment variables. Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.",
    );
  }

  return createClient(supabaseUrl, supabaseKey);
}
