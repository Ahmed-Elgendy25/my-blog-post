"use server";

import { supabaseRequest } from "@/lib/supabase/request";
import { ZodError } from "zod";
import { signInSchema } from "../_schema/signin.schema";

interface SignInResponse {
  token: string;
  roles: string[];
  userId: number;
}

export interface SignInState {
  error?: string;
  success?: boolean;
  data?: SignInResponse;
}

export async function signIn(
  prevState: SignInState | null,
  formData: FormData,
): Promise<SignInState> {
  try {
    // Extract form data
    const rawFormData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    console.log("Sign in attempt for email:", rawFormData.email);

    // Validate form data with Zod
    const validatedData = signInSchema.parse(rawFormData);

    // Use Supabase authentication
    return await supabaseRequest(async (supabase) => {
      console.log("Attempting Supabase sign in...");

      const { data, error } = await supabase.auth.signInWithPassword({
        email: validatedData.email,
        password: validatedData.password,
      });

      if (error) {
        console.error("Supabase Auth Error:", error);

        // Provide helpful error messages
        let userMessage = "Invalid email or password";
        if (error.message.includes("Email not confirmed")) {
          userMessage =
            "Please confirm your email before signing in. Check your inbox for a confirmation link.";
        } else if (error.message.includes("Invalid login credentials")) {
          userMessage =
            "Invalid email or password. If you haven't registered yet, please sign up first.";
        }

        return {
          error: userMessage,
          success: false,
        };
      }

      if (!data.user) {
        console.error("No user data returned from Supabase");
        return { error: "Invalid email or password", success: false };
      }

      console.log("Sign in successful:", data.user.email);

      // Fetch user data from users table to get role
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id, role")
        .eq("id", data.user.id)
        .single();

      if (userError) {
        console.error("Error fetching user data:", userError);
      }

      console.log("User role from table:", userData?.role);

      // Extract user metadata or construct response
      const responseData: SignInResponse = {
        token: data.session?.access_token || "",
        roles: userData?.role ? [userData.role] : ["user"],
        userId: userData?.id || 0,
      };

      console.log("Access Token:", responseData.token);
      console.log("User ID:", responseData.userId);
      console.log("Roles:", responseData.roles);

      return { data: responseData, success: true };
    });
  } catch (error) {
    console.error("Sign in error:", error);

    // Handle Zod validation errors
    if (error instanceof ZodError) {
      const firstError = error.errors[0];
      return { error: firstError.message, success: false };
    }
    // Handle any other errors
    return {
      error: error instanceof Error ? error.message : "Sign in failed",
      success: false,
    };
  }
}
