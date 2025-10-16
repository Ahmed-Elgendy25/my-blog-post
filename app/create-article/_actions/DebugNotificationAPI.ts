/**
 * Debug utility to test the notification API endpoint
 */

export async function debugNotificationAPI() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const endpoint = "/api/notifications/notify-new-post/";
  const fullUrl = API_BASE_URL + endpoint;

  // Test if the endpoint exists
  try {
    await fetch(fullUrl, {
      method: "OPTIONS", // CORS preflight
    });
  } catch (error) {
    console.error("OPTIONS request failed:", error);
  }

  return {
    url: fullUrl,
    timestamp: new Date().toISOString(),
  };
}
