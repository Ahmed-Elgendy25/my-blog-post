"use server";

import { supabaseRequest } from "@/lib/supabase/request";

export async function GetSpecificPost(id: string) {
  return await supabaseRequest(async (supabase) => {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        *,
        author_id
      `,
      )
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(`Failed to fetch post: ${error.message}`);
    }

    // Map snake_case to camelCase if needed
    if (data && data.author_id !== undefined && data.authorId === undefined) {
      data.authorId = data.author_id;
    }

    return data;
  });
}
