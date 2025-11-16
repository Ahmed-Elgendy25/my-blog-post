import { supabaseRequest } from "@/lib/supabase/request";
import { BlogPostsResponse } from "../_schema/PaginatedArticles";

export async function GetPaginateArticles(
  page: number,
  direction: string,
  size = 6,
): Promise<BlogPostsResponse | null> {
  try {
    return await supabaseRequest(async (supabase) => {
      // Build the query for posts
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

      if (!data || data.length === 0) {
        return {
          content: [],
          totalElements: 0,
          totalPages: 0,
          size,
          number: page,
        } as unknown as BlogPostsResponse;
      }

      // Get unique author IDs
      const authorIds = [
        ...new Set(data.map((post) => post.author_id).filter(Boolean)),
      ];

      // Fetch all authors in one query
      const { data: authors, error: authorsError } = await supabase
        .from("users")
        .select("id, first_name, last_name")
        .in("id", authorIds);

      if (authorsError) {
        console.error("Authors fetch error:", authorsError);
      }

      // Create a map of author_id to full name
      const authorMap = new Map(
        authors?.map((author) => [
          author.id,
          `${author.first_name || ""} ${author.last_name || ""}`.trim() ||
            "Unknown Author",
        ]) || [],
      );

      // Map the data to include author details
      const mappedData = data.map((post) => ({
        ...post,
        authorId: post.author_id,
        authorName: authorMap.get(post.author_id) || "Unknown Author",
      }));

      return {
        content: mappedData || [],
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
