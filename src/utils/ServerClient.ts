import axios from "axios";
import { useAuthenticationStore } from "@/stores/authentication";

import router from "@/router";

export interface ServerPage<T> {
  page: T[];
  page_count: number;
}

export const serverClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_SERVER_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

serverClient.interceptors.request.use(
  (request) => {
    const publicEndpoints = ["/authentication/login", "/authentication/verify"];
    const isPublicEndpoint = publicEndpoints.some((ep) => request.url?.includes(ep));

    if (isPublicEndpoint) {
      return request;
    }

    const authenticationStore = useAuthenticationStore();

    if (authenticationStore.accessToken) {
      request.headers["Authorization"] = `Bearer ${authenticationStore.accessToken}`;
    } else {
      router.push({ name: "login" });
      return Promise.reject(new Error("Unauthorized"));
    }

    return request;
  },
  (error) => Promise.reject(error),
);

serverClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      const authenticationStore = useAuthenticationStore();
      if (!authenticationStore.refreshToken) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_SERVER_URL}/authentication/refresh`,
          {
            refresh_token: authenticationStore.refreshToken,
          },
        );
        authenticationStore.setAccessToken(response.data.access_token);
        authenticationStore.setRefreshToken(response.data.refresh_token);
        authenticationStore.setUserId(response.data.user_id);
        return serverClient(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh the tokens.");
        authenticationStore.clear();
        router.push({ name: "login" });
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
