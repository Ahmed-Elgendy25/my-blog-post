import { createClient } from "@/app/utils/supabase/client";
import { verifySession } from "@/dal";

export async function uploadBanner(banner: string) {
    const session = await verifySession()

    if (!session) return null

    const supabase = createClient();

    try {
        const { data, error } = await supabase.from('posts').insert({
            banner: banner,
        });

        if (error) {
            return { data: null, error };
        }
        
        return { data, error: null };
    } catch (error) {
        return { 
            data: null, 
            error: error instanceof Error ? error : new Error('Unknown error during banner upload') 
        };
    }
}