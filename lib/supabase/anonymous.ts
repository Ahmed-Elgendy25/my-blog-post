import { createClient } from "@supabase/supabase-js";

/**
 * Anonymous Supabase client for build-time operations
 * Use this for generateStaticParams and other build-time functions
 * that don't have access to cookies or request context
 */
export function createAnonymousClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
