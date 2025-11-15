"use server";

import { supabaseRequest } from "@/lib/supabase/request";
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

  console.log("Starting signup for email:", email);

  try {
    return await supabaseRequest(async (supabase) => {
      console.log("Calling Supabase Auth signUp...");

      // Create user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        console.error("Supabase Auth signUp error:", authError);

        let userMessage = authError.message || "Signup failed";
        if (authError.message?.includes("Signups not allowed")) {
          userMessage =
            "Account registration is currently disabled. Please contact an administrator.";
        } else if (authError.message?.includes("User already registered")) {
          userMessage =
            "An account with this email already exists. Please sign in instead.";
        }

        return {
          success: false,
          error: userMessage,
          errorDetails: authError,
        };
      }

      if (!authData.user) {
        console.error("No user data returned from signUp");
        return {
          success: false,
          error: "Failed to create user account",
        };
      }

      console.log("Signup successful for user:", authData.user.id);
      console.log("Session created:", !!authData.session);

      // Insert user data into users table
      const { error: insertError } = await supabase.from("users").insert({
        id: authData.user.id,
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password,
        user_img: profileImage || null,
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

      console.log("User profile data saved successfully");

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
