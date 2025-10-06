/**
 * Debug utility to test the notification API endpoint
 */

export async function debugNotificationAPI() {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const endpoint = "/api/notifications/notify-new-post/";
    const fullUrl = API_BASE_URL + endpoint;

    console.log("=== NOTIFICATION API DEBUG ===");
    console.log("API_BASE_URL:", API_BASE_URL);
    console.log("Endpoint:", endpoint);
    console.log("Full URL:", fullUrl);
    console.log("===============================");

    // Test if the endpoint exists
    try {
        const response = await fetch(fullUrl, {
            method: "OPTIONS", // CORS preflight
        });

        console.log("OPTIONS Response Status:", response.status);
        console.log(
            "OPTIONS Response Headers:",
            Object.fromEntries(response.headers.entries())
        );
    } catch (error) {
        console.error("OPTIONS request failed:", error);
    }

    return {
        url: fullUrl,
        timestamp: new Date().toISOString(),
    };
}
