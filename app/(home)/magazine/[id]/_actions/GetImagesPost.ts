"use server"

import { createClient } from "@/utils/supabase/client";

export async function GetImagesPost(folderName: string) {
  const supabase = createClient();

  // Clean the folder name and construct the path
  const cleanedFolder = folderName.trim();
  const path = `upload/${cleanedFolder}`;

  // List files in the directory
  const { data, error } = await supabase
    .storage
    .from('posts')
    .list(path);

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
    data.map(file => 
      supabase.storage.from('posts').getPublicUrl(`${path}/${file.name}`)
    )
  );

  // Extract the public URLs from the results
  return imageUrls.map(result => result.data.publicUrl);
}
