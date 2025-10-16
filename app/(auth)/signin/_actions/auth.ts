"use server";

import { API_BASE_URL, API_ENDPOINTS } from "@/constants/apiEndPoints";
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

    const response = await fetch(API_BASE_URL + API_ENDPOINTS.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: validatedData.email,
        password: validatedData.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error || "Invalid email or password";
      return { error: errorMessage, success: false };
    }

    const data: SignInResponse = await response.json();
    return { data, success: true };
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
