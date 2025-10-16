import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";

export const verifySession = cache(async () => {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    redirect("/signin");
  }

  return { isAuth: true, token: token };
});

// export const deleteSession = async() => {
//   (await cookies()).delete('token')

// }
