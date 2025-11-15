import { supabaseRequest } from "@/lib/supabase/request";

export async function GetUserById(id: string) {
  if (!id) return null;

  return await supabaseRequest(async (supabase) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("GetUserById - Error:", error);
      return null;
    }

    if (!data) {
      console.warn("GetUserById - No user found in users table for id:", id);
      return null;
    }

    return data;
  });
}
