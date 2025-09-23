import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://10.106.24.84:4000/api/v1";


export const clientApi = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, 
});


export const serverApi = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  
});


clientApi.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});

clientApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const res = await axios.post(
          `${baseURL}/auth/refresh-token`,
          { token: refreshToken },
          { withCredentials: true }
        );

        const { accessToken } = res.data;
        localStorage.setItem("accessToken", accessToken);

        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return clientApi(originalRequest);
      } catch (err) {
        console.error("Refresh token failed:", err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
