import { defineStore } from "pinia";
import { usersServer, type ServerUser } from "@/utils/server/users";
import { useAuthenticationStore } from "./authentication";

export const useUserStore = defineStore("user", {
  state: (): Partial<ServerUser> => ({
    created_at: localStorage.getItem("user.created_at") || undefined,
    display_name: localStorage.getItem("user.display_name") || undefined,
    id: localStorage.getItem("user.id") || undefined,
    scoring_system: localStorage.getItem("user.scoring_system") || undefined,
    updated_at: localStorage.getItem("user.updated_at") || undefined,
    username: localStorage.getItem("user.username") || undefined,
  }),
  actions: {
    async fetch() {
      const authenticationStore = useAuthenticationStore();
      const user = await usersServer.show(authenticationStore.userId);
      this.$patch(user);
      localStorage.setItem("user.created_at", user.created_at);
      localStorage.setItem("user.display_name", user.display_name);
      localStorage.setItem("user.id", user.id);
      localStorage.setItem("user.scoring_system", user.scoring_system);
      localStorage.setItem("user.updated_at", user.updated_at);
      localStorage.setItem("user.username", user.username);
    },
    clear() {
      this.$patch({
        created_at: undefined,
        display_name: undefined,
        id: undefined,
        scoring_system: undefined,
        updated_at: undefined,
        username: undefined,
      });
      localStorage.removeItem("user.created_at");
      localStorage.removeItem("user.display_name");
      localStorage.removeItem("user.id");
      localStorage.removeItem("user.scoring_system");
      localStorage.removeItem("user.updated_at");
      localStorage.removeItem("user.username");
    },
  },
});
