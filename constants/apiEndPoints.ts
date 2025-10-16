export const API_ENDPOINTS = {
    SIGNUP: "/api/auth/register",
    LOGIN: "/api/auth/login",
    CREATE_POST: "/api/posts/create-article",
    GET_PAGINATED_ARTICLES: "/api/posts/paginated",
    GET_SPECIFIC_POST: `/api/posts/`,
    GET_USER_BY_ID: `/api/users/`,
    SUBSCRIBE_USER: `/api/notifications/subscribe/`,
    NOTIFY_USERS: `/api/notifications/notify-new-post/`,
};
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
