"use server";

import { supabaseRequest } from "@/lib/supabase/request";
import { SignupFormFields } from "../_schema/SignupSchema";

export default async function signupSubmit(data: SignupFormFields) {
  const { email, firstName, lastName, password, role, profileImage } = data;

  try {
    return await supabaseRequest(async (supabase) => {
      // Create user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            role,
            profile_image: profileImage,
          },
        },
      });

      if (authError) {
        console.error("Signup error:", authError);
        return { success: false, error: authError };
      }

      return { success: true, data: authData };
    });
  } catch (error) {
    console.error("Signup error:", error);
    return { success: false, error };
  }
}
