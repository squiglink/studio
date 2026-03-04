import axios from "axios";
import { useAuthorizationStore } from "@/stores/authorization";

import router from "@/router";

export interface ServerPage<T> {
  page: T[];
  page_count: number;
}

export const serverClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_SERVER_URL,
  timeout: 5000,
});

serverClient.interceptors.request.use(
  (request) => {
    const publicEndpoints = ["/authorization/login", "/authorization/verify"];
    const isPublicEndpoint = publicEndpoints.some((ep) => request.url?.includes(ep));

    if (isPublicEndpoint) {
      return request;
    }

    const authorizationStore = useAuthorizationStore();

    if (authorizationStore.accessToken) {
      request.headers["Authorization"] = `Bearer ${authorizationStore.accessToken}`;
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
      const authorizationStore = useAuthorizationStore();
      if (!authorizationStore.refreshToken) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_SERVER_URL}/authorization/refresh`,
          {
            refresh_token: authorizationStore.refreshToken,
          },
        );
        authorizationStore.setAccessToken(response.data.access_token);
        authorizationStore.setRefreshToken(response.data.refresh_token);
        return serverClient(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed");
        authorizationStore.clearTokens();
        router.push({ name: "login" });
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
