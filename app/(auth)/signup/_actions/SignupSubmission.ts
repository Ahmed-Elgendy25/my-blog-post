"use server";

import { supabaseRequest } from "@/lib/supabase/request";
import { createClient } from "@supabase/supabase-js";
import { SignupFormFields } from "../_schema/SignupSchema";

export default async function signupSubmit(data: SignupFormFields) {
  const {
    email,
    firstName,
    lastName,
    password,
    profileImage,
    linkedinProfile,
    twitterProfile,
    instagramProfile,
  } = data;

  try {
    return await supabaseRequest(async (supabase) => {
      // Create user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        console.error("Supabase Auth signUp error:", authError);
        let userMessage = authError.message || "Signup failed";
        if (authError.message?.includes("Signups not allowed")) {
          userMessage = "Account registration is currently disabled.";
        } else if (authError.message?.includes("User already registered")) {
          userMessage = "An account with this email already exists.";
        }
        return { success: false, error: userMessage, errorDetails: authError };
      }

      if (!authData.user) {
        return { success: false, error: "Failed to create user account" };
      }

      let profileImageUrl: string | null = null;

      // Upload profile image using service role client
      if (profileImage && profileImage instanceof File) {
        // Create a service role client for bypassing RLS
        const supabaseAdmin = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!, // Service role key
          {
            auth: {
              autoRefreshToken: false,
              persistSession: false,
            },
          },
        );

        const fileExt = profileImage.name.split(".").pop();
        const fileName = `${authData.user.id}-${Date.now()}.${fileExt}`;

        const { data: uploadData, error: uploadError } =
          await supabaseAdmin.storage
            .from("user-img")
            .upload(fileName, profileImage, {
              cacheControl: "3600",
              upsert: false,
            });

        if (uploadError) {
          console.error("Error uploading profile image:", uploadError);
        } else {
          const { data: urlData } = supabaseAdmin.storage
            .from("user-img")
            .getPublicUrl(fileName);

          profileImageUrl = urlData.publicUrl;
        }
      }

      // Insert user data into users table
      const { error: insertError } = await supabase.from("users").insert({
        id: authData.user.id,
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password,
        user_img: profileImageUrl,
        linkedin_profile: linkedinProfile || null,
        twitter_profile: twitterProfile || null,
        instagram_profile: instagramProfile || null,
      });

      if (insertError) {
        console.error("Error inserting user data:", insertError);
        return {
          success: false,
          error: "Failed to save user profile: " + insertError.message,
        };
      }

      return {
        success: true,
        data: authData,
        message: "Account created successfully!",
      };
    });
  } catch (error) {
    console.error("Signup submission error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Signup failed",
    };
  }
}
