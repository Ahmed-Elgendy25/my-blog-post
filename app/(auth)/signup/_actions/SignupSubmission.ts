'use server'
import { API_BASE_URL, API_ENDPOINTS } from "@/constants/apiEndPoints";
import { SignupFormFields } from "../_schema/SignupSchema";

export default async function signupSubmit(data: SignupFormFields) {
   const {email, firstName, lastName, password, confirmPassword, role, profileImage} = data;
   try {
     const response = await fetch(API_BASE_URL + API_ENDPOINTS.SIGNUP, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         email,
         firstName,
         lastName,
         password,
         confirmPassword,
         role,
         profileImage
       })
     });

     return { success: true };
   } catch (error) {
     console.error('Signup error:', error);
     return { success: false, error };
   }
}