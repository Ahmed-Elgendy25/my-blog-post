import { API_BASE_URL, API_ENDPOINTS } from "@/constants/apiEndPoints";
import { verifySession } from "@/dal";
import { BlogPostsResponse } from "../_schema/PaginatedArticles";

export async function GetPaginateArticles(page: number, direction: string): Promise<BlogPostsResponse | null> {
    const session = await verifySession()
    let { token } = session
    if (!session) {
        console.error('No session found');
        return null;
    }

    if (token.startsWith('"') && token.endsWith('"')) token = token.substring(1, token.length - 1);
    if (token.startsWith('Bearer ')) token = token.substring(7);
    const authHeader = `Bearer ${token}`;

    // Add timestamp to URL to force fresh request
    const url = `${API_BASE_URL}${API_ENDPOINTS.GET_PAGINATED_ARTICLES}?page=${page}&size=6&sortBy=date&direction=${direction}`;
    console.log('Fetching URL:', url);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': authHeader,
                'Cache-Control': 'no-cache',
            },
            cache:'no-store',
             
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            const errorText = await response.text();
            console.error("API Error:", response.status, errorText);
            throw new Error(`Failed to fetch articles: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}