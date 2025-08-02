'use server'
import { createClient } from "@/utils/supabase/client";
import { verifySession } from "@/dal";

export async function uploadImage(file: File, filename: string, path:string) {

        const session = await verifySession()
    
        if (!session) return null
        // Create a unique filename to avoid collisions
        // const uniqueFilename = `${Date.now()}_${filename}`;
        
        // Create Supabase client
        const supabase = createClient();
        
        // Upload the file to Supabase storage
        const {  error } = await supabase.storage
            .from('posts')
            .upload(`${path}/${filename}`, file);

            

            if (error) {
                console.error('Upload error:', error);
                throw error;
            }
          
            try {
                const { data: { publicUrl } } = await supabase.storage
                .from('posts')
                .getPublicUrl(`${path}/${filename}`);
                return { data: publicUrl, error: null,message:"Image has been Uploaded Succesfully" };
            } catch (error) {
                console.error('Upload error:', error);
                throw error;
            }
      


        
     
   
}
