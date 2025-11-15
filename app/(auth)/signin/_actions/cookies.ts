"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setCookiesAndRedirect(token: string, userId: string) {
  const cookieStore = await cookies();

  console.log("Setting cookies:");
  console.log("Token:", token);
  console.log("User ID:", userId);

  cookieStore.set("token", token);
  cookieStore.set("userId", userId.toString());

  redirect("/");
}
