// utils/auth/logout.ts
"use client";
import { deleteCookie } from "cookies-next";

export function clearAuthCookies() {
  deleteCookie("token");
  deleteCookie("userId");
  deleteCookie("roles");
}
