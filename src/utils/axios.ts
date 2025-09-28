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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // refresh token is sent automatically via httpOnly cookie
        await axios.post(
          `${baseURL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        // Retry the original request
        return clientApi(originalRequest);
      } catch (err) {
        console.error("Refresh token failed:", err);
        // redirect to login
        window.location.href = "/auth";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
