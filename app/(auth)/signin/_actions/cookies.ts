"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setCookiesAndRedirect(
  token: string,
  roles: string[],
  userId: number,
) {
  const cookieStore = await cookies();

  console.log("Setting cookies:");
  console.log("Token:", token);
  console.log("Roles:", roles);
  console.log("User ID:", userId);

  cookieStore.set("token", token);
  cookieStore.set("roles", JSON.stringify(roles));
  cookieStore.set("userId", userId.toString());

  redirect("/");
}
