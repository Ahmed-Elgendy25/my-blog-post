'use server'

import { API_BASE_URL, API_ENDPOINTS } from "@/constants/apiEndPoints";
import { verifySession } from "@/dal";
type GetPaginatedArticlesTyped ={
    data:{
        id:number, 
        title:string, 
        date:string, 
        durationRead:string, 
        authorId:number, 
        authorName:string, 
        postImg: string;
    }

}

export async function GetPaginateArticles(page:number,direction:string) :Promise<GetPaginatedArticlesTyped|null> {


    const session = await verifySession()
    let {token} = session
    if (!session) return null

   

    if (token.startsWith('"') && token.endsWith('"')) token = token.substring(1, token.length - 1);
    if (token.startsWith('Bearer ')) token = token.substring(7);
    const authHeader = `Bearer ${token}`;

    const url = `${API_BASE_URL}${API_ENDPOINTS.GET_PAGINATED_ARTICLES}?page=${page}&size=6&sortBy=date&direction=${direction}`;


    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': authHeader,
            },
        });

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