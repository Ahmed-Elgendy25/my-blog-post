"use server";
import { API_BASE_URL, API_ENDPOINTS } from "@/constants/apiEndPoints";
import { verifySession } from "@/dal";

interface NotificationResult {
  success: boolean;
  message: string;
  [key: string]: unknown;
}

export async function NotifyUsers(
  title: string,
  path: string,
): Promise<NotificationResult | null> {
  const session = await verifySession();
  let { token } = session;
  if (!session) {
    console.error("No session found");
    return null;
  }

  if (token.startsWith('"') && token.endsWith('"'))
    token = token.substring(1, token.length - 1);
  if (token.startsWith("Bearer ")) token = token.substring(7);
  const authHeader = `Bearer ${token}`;

  // Add timestamp to URL to force fresh request
  const url = `${API_BASE_URL}${API_ENDPOINTS.NOTIFY_USERS}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authHeader,
      },
      body: JSON.stringify({
        title,
        url: path,
      }),
    });

    // Check if response is ok first
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP Error ${response.status}:`, errorText);
      throw new Error(
        `HTTP ${response.status}: ${errorText || response.statusText}`,
      );
    }

    // Check if response has content before parsing JSON
    const responseText = await response.text();

    if (!responseText || responseText.trim() === "") {
      return { success: true, message: "Notification sent successfully" };
    }

    try {
      const data = JSON.parse(responseText);
      return data;
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("Response text:", responseText);
      // Return the raw text if JSON parsing fails
      return { success: true, message: responseText };
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
