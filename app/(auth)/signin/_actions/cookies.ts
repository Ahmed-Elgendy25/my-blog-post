"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setCookiesAndRedirect(
  token: string,
  roles: string[],
  userId: number,
) {
  const cookieStore = await cookies();
  cookieStore.set("token", JSON.stringify(token));
  cookieStore.set("roles", JSON.stringify(roles));
  cookieStore.set("userId", JSON.stringify(userId));
  redirect("/");
}
