"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setCookiesAndRedirect(token: string, userId: string) {
  const cookieStore = await cookies();

  cookieStore.set("token", token);
  cookieStore.set("userId", userId.toString());

  redirect("/");
}
