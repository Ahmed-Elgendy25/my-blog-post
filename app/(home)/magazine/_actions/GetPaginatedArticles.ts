import { API_BASE_URL, API_ENDPOINTS } from "@/constants/apiEndPoints";
import { BlogPostsResponse } from "../_schema/PaginatedArticles";

export async function GetPaginateArticles(
  page: number,
  direction: string,
  size = 4,
): Promise<BlogPostsResponse | null> {
  // Add timestamp to URL to force fresh request
  const url = `${API_BASE_URL}${API_ENDPOINTS.GET_PAGINATED_ARTICLES}?page=${page}&size=${size}&sortBy=date&direction=${direction}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch articles: ${response.status} ${errorText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
