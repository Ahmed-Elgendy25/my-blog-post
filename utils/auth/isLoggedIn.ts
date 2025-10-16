// utils/auth/isLoggedIn.ts
"use client";
import { getCookie } from "cookies-next";

export function isLoggedIn() {
  const token = getCookie("token");
  const roles = getCookie("roles");
  const userId = getCookie("userId");

  if (!token || !roles || !userId) return null;

  try {
    return {
      token: String(token),
      roles: JSON.parse(String(roles)),
      userId: parseInt(String(userId)),
    };
  } catch {
    return null;
  }
}
