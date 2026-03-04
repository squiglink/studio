import { serverClient } from "../ServerClient";

interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export const authorizationServer = {
  async login(email: string, cloudflareTurnstileToken: string): Promise<boolean> {
    try {
      await serverClient.post("/authorization/login", {
        email,
        cloudflareTurnstileToken,
      });

      return true;
    } catch {
      return false;
    }
  },

  async verify(token: string): Promise<AuthResponse> {
    const response = await serverClient.get<AuthResponse>("/authorization/verify", {
      params: { token },
    });

    return response.data;
  },
};
