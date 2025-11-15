"use server";
import { supabaseRequest } from "@/lib/supabase/request";
import { verifySession } from "@/dal";
import { cookies } from "next/headers";

interface CreatePostResponse {
  success: boolean;
  error?: Error | unknown;
  data?: {
    id: string;
    postData: {
      content: string;
      title: string;
      durationRead: string;
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

export default async function createPost(
  postData: {
    content: string;
    title: string;
    durationRead: string;
    subTitle: string;
  },
  banner: string,
): Promise<CreatePostResponse | null> {
  const session = await verifySession();
  if (!session) return null;

  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value || "";

  // Replace <img src="..."> with {{image:filename.jpg}}

  // Clean and validate the subTitle
  const cleanSubTitle = (subTitle: string): string => {
    if (!subTitle) return "";

    // Remove any HTML tags
    const stripped = subTitle.replace(/<[^>]*>?/gm, "");

    // Trim whitespace and limit length to 255 characters (adjust as needed)
    return stripped.trim().substring(0, 255);
  };

  const parsedContent = replaceImagesWithPlaceholders(postData.content);
  const cleanedSubTitle = cleanSubTitle(postData.subTitle);

  try {
    return await supabaseRequest(async (supabase) => {
      // Insert post into Supabase
      const { data, error } = await supabase
        .from("posts")
        .insert({
          author_id: userId,
          content: parsedContent,
          title: postData.title,
          duration_read: postData.durationRead,
          banner,
          sub_title: cleanedSubTitle,
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating post in Supabase:", error);
        return {
          success: false,
          error: error,
          status: 400,
        };
      }

      console.log("Post created successfully:", data);

      return {
        success: true,
        data: {
          id: data.id,
          postData: {
            content: data.content,
            title: data.title,
            durationRead: data.durationRead,
          },
          createdAt: data.created_at || new Date().toISOString(),
          message: "Post created successfully",
        },
        status: 200,
      };
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return {
      success: false,
      error,
    };
  }
}
