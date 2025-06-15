import { API_BASE_URL, API_ENDPOINTS } from "@/constants/apiEndPoints";
import { verifySession } from "@/dal";

export async function GetUserById(id: number) {
    try {
        const session = await verifySession();
        if (!session) {
            console.error('No session found');
            return null;
        }

        let { token } = session;
        if (token.startsWith('"') && token.endsWith('"')) token = token.substring(1, token.length - 1);
        if (token.startsWith('Bearer ')) token = token.substring(7);
        
        const authHeader = `Bearer ${token}`;
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_USER_BY_ID}${id}`, {
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('API Error:', errorData);
            throw new Error(`API request failed with status ${response.status}: ${errorData}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in GetUserById:', error);
        return null;
    }
}
