'use server'

import { API_BASE_URL, API_ENDPOINTS } from "@/constants/apiEndPoints";

interface SignInResponse {
  token: string;
  roles: string[];
}

export async function signIn(formData: FormData): Promise<SignInResponse> {
  try {
    // Extract form data
    const email = formData.get('email')
    const password = formData.get('password')

    // Validate form data
    if (!email || !password) {
      throw new Error('Missing required fields')
    }

    const response = await fetch(API_BASE_URL + API_ENDPOINTS.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
      })
    });

    if (!response.ok) {
      throw new Error('Sign in failed')
    }

    const data: SignInResponse = await response.json()
    console.log(data)
    return data

  } catch (error) {
    // Handle any errors
    throw new Error(error instanceof Error ? error.message : 'Sign in failed')
  }
} 