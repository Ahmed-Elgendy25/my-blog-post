import { API_BASE_URL, API_ENDPOINTS } from "@/constants/apiEndPoints";

export async function GetUserById(id: number) {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.GET_USER_BY_ID}${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("API Error:", errorData);
      throw new Error(
        `API request failed with status ${response.status}: ${errorData}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in GetUserById:", error);
    return null;
  }
}
