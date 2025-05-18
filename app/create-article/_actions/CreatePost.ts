'use server'
import { API_BASE_URL, API_ENDPOINTS } from "@/constants/apiEndPoints";
import { cookies } from "next/headers";

interface CreatePostResponse {
  success: boolean;
  error?: Error;
  data?: {
    id: string;
    post: string;
    createdAt: string;
  };
  status?: number;
}


export default async function createPost(post: string): Promise<CreatePostResponse> {
  const cookieStore = await cookies();
  let token = cookieStore.get('token')?.value || '';

  // Remove surrounding quotes if present
  if (token.startsWith('"') && token.endsWith('"')) {
    token = token.substring(1, token.length - 1);
  }
  
  // Remove Bearer prefix if present
  if (token.startsWith('Bearer ')) {
    token = token.substring(7);
  }
  const authHeader = `Bearer ${token}`;

  try {
    const requestBody = {
      authorId: 12,
      content: post,
    };

    const response = await fetch(API_BASE_URL + API_ENDPOINTS.CREATE_POST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader, // Add prefix explicitly
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    return { success: true, data, status: response.status };

  } catch (error) {
    return { success: false, error: error instanceof Error ? error : new Error('Unknown error') };
  }
}


