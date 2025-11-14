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

    // Validate form data with Zod
    const validatedData = signInSchema.parse(rawFormData);

    // Use Supabase authentication
    return await supabaseRequest(async (supabase) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: validatedData.email,
        password: validatedData.password,
      });

      if (error) {
        return {
          error: error.message || "Invalid email or password",
          success: false,
        };
      }

      if (!data.user) {
        return { error: "Invalid email or password", success: false };
      }

      // Extract user metadata or construct response
      const responseData: SignInResponse = {
        token: data.session?.access_token || "",
        roles: data.user.user_metadata?.roles || [],
        userId: parseInt(data.user.id) || 0,
      };

      return { data: responseData, success: true };
    });
  } catch (error) {
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
