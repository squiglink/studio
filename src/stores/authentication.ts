import { defineStore } from "pinia";

export const useAuthenticationStore = defineStore("authentication", {
  state: () => ({
    accessToken: localStorage.getItem("accessToken") || "",
    refreshToken: localStorage.getItem("refreshToken") || "",
    userId: localStorage.getItem("userId") || "",
  }),
  actions: {
    setAccessToken(token: string) {
      this.accessToken = token;
      localStorage.setItem("accessToken", token);
    },
    setRefreshToken(token: string) {
      this.refreshToken = token;
      localStorage.setItem("refreshToken", token);
    },
    setUserId(userId: string) {
      this.userId = userId;
      localStorage.setItem("userId", userId);
    },
    clear() {
      this.accessToken = "";
      this.refreshToken = "";
      this.userId = "";
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
    },
  },
});
