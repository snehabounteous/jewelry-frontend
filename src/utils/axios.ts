import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

export const serverApi = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export const clientApi = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // sends httpOnly cookies automatically
});


clientApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent retry loop for /auth/me
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/me")
    ) {
      originalRequest._retry = true;
      try {
        // refresh token sent automatically via httpOnly cookie
        await axios.post(`${clientApi.defaults.baseURL}/auth/refresh-token`, {}, { withCredentials: true });

        // Retry original request
        return clientApi(originalRequest);
      } catch (err) {
        console.error("Refresh token failed:", err);
        window.location.href = "/auth";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
