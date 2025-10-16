"use server";

import { API_BASE_URL } from "@/constants/apiEndPoints";
import { API_ENDPOINTS } from "@/constants/apiEndPoints";

export async function GetSpecificPost(id: string) {
  const url = `${API_BASE_URL}${API_ENDPOINTS.GET_SPECIFIC_POST}${id}`;

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json();

  return data;
}
