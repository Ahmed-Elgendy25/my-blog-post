"use server";

import { supabaseRequest } from "@/lib/supabase/request";
import { imageUrls } from "../_schema/PostById";

export async function GetImagesPost(folderName: string): Promise<imageUrls[]> {
  return await supabaseRequest(async (supabase) => {
    // Clean the folder name and construct the path
    const cleanedFolder = folderName.trim();

    const path = `upload/${cleanedFolder}`;
    // List files in the directory
    const { data, error } = await supabase.storage.from("posts").list(path);

    if (error) {
      console.error("❌ Error fetching images:", error.message);
      return [];
    }

    if (!data || data.length === 0) {
      console.warn("⚠️ No images found in folder:", path);
      return [];
    }

    // Get public URLs for all files
    const imageUrls = await Promise.all(
      data
        .filter((file) => file.id !== null)
        .map((file) =>
          supabase.storage.from("posts").getPublicUrl(`${path}/${file.name}`),
        ),
    );
    return imageUrls;
  });
}
