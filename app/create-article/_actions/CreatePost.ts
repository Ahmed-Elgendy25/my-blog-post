'use server'
import { API_BASE_URL, API_ENDPOINTS } from "@/constants/apiEndPoints";
import { verifySession } from "@/dal";
import { cookies } from "next/headers";

interface CreatePostResponse {
  success: boolean;
  error?: Error | unknown;
  data?: {
    id: string;
    postData: {
      content:string;
      title:string;
      durationRead:string;
   

    };
    createdAt: string;

    message?: string;
  };
  status?: number;

}

function replaceImagesWithPlaceholders(html: string): string {
  let index = 0;
  return html.replace(/<img[^>]*src=["']([^"']+)["'][^>]*>/g, () => {
    return `{{image:img${index++}}}`;
  });
}



export default async function createPost(postData: { content: string; title: string; durationRead: string; subTitle:string },banner:string): Promise<CreatePostResponse|null> {

      const session = await verifySession()
      let {token} = session
      if (!session) return null
  
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value || '';

  if (token.startsWith('"') && token.endsWith('"')) token = token.substring(1, token.length - 1);
  if (token.startsWith('Bearer ')) token = token.substring(7);
  const authHeader = `Bearer ${token}`;

  // Replace <img src="..."> with {{image:filename.jpg}}
  
  // Clean and validate the subTitle
  const cleanSubTitle = (subTitle: string): string => {
    if (!subTitle) return '';
    
    // Remove any HTML tags
    const stripped = subTitle.replace(/<[^>]*>?/gm, '');
    
    // Trim whitespace and limit length to 255 characters (adjust as needed)
    return stripped.trim().substring(0, 255);
  };

  const parsedContent = replaceImagesWithPlaceholders(postData.content);
  const cleanedSubTitle = cleanSubTitle(postData.subTitle);

  try {

 
    const requestBody = {
      authorId: userId,
      content: parsedContent,
      title: postData.title,
      durationRead: postData.durationRead,
      postImg: banner,
      subTitle: cleanedSubTitle
    };

    const response = await fetch(API_BASE_URL + API_ENDPOINTS.CREATE_POST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify(requestBody),
    });

    let data = null;
    const contentType = response.headers.get('content-type');
    const text = await response.text();

    if (text && contentType && contentType.includes('application/json')) {
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        // Parsing failed, but we got a response body
        console.error('Error parsing response as JSON:', parseError);
      }
    }

    
    // Check if the HTTP status is successful (2xx)
    if (response.ok) {
      // Create a safe copy of the data to avoid circular references
      const safeData = {
        id: data?.id || "unknown-id",
        postData: {
          content: typeof data?.postData?.content === 'string'
            ? (data.postData.content.length > 1000
              ? data.postData.content.substring(0, 1000) + "..."
              : data.postData.content)
            : postData.content,
          title: data?.postData?.title || postData.title,
          durationRead: data?.postData?.durationRead || postData.durationRead
        },
        createdAt: data?.createdAt || new Date().toISOString(),
        message: data?.message || "Post created successfully"
      };
      
      return { success: true, data: safeData, status: response.status };
    } else {
      // The request completed but the server returned an error status
      return { 
        success: false, 
        error: new Error(data?.message), 
        status: response.status 
      };
    }

  } catch (error) {
    console.error('Error creating post:', error);
    return { 
      success: false, 
      error,
    };
  }
}
