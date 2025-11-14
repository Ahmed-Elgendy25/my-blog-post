import { supabaseRequest } from "@/lib/supabase/request";
import { BlogPostsResponse } from "../_schema/PaginatedArticles";

export async function GetPaginateArticles(
  page: number,
  direction: string,
  size = 6,
): Promise<BlogPostsResponse | null> {
  try {
    return await supabaseRequest(async (supabase) => {
      // Build the query
      let query = supabase
        .from("posts")
        .select("*", { count: "exact" })
        .range(page * size, (page + 1) * size - 1);

      // Apply sorting
      if (direction === "asc") {
        query = query.order("date", { ascending: true });
      } else {
        query = query.order("date", { ascending: false });
      }

      const { data, error, count } = await query;

      if (error) {
        console.error("Fetch error:", error);
        throw error;
      }

      return {
        content: data || [],
        totalElements: count || 0,
        totalPages: Math.ceil((count || 0) / size),
        size,
        number: page,
      } as BlogPostsResponse;
    });
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
