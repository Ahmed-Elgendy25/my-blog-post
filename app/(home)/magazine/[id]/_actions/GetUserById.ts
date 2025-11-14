import { supabaseRequest } from "@/lib/supabase/request";

export async function GetUserById(id: number | undefined) {
  // Validate the id parameter
  if (id === undefined || id === null || isNaN(id)) {
    console.error("GetUserById: Invalid id parameter:", id);
    return null;
  }

  try {
    return await supabaseRequest(async (supabase) => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("API Error:", error);
        throw new Error(`API request failed: ${error.message}`);
      }

      return data;
    });
  } catch (error) {
    console.error("Error in GetUserById:", error);
    return null;
  }
}
