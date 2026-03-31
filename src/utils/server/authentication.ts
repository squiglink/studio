import { serverClient } from "../ServerClient";

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user_id: string;
}

export const authenticationServer = {
  async login(email: string, cloudflareTurnstileToken: string): Promise<boolean> {
    try {
      await serverClient.post("/authentication/login", {
        email,
        cloudflareTurnstileToken,
      });

      return true;
    } catch {
      return false;
    }
  },

  async verify(token: string): Promise<AuthResponse> {
    const response = await serverClient.get<AuthResponse>("/authentication/verify", {
      params: { token },
    });

    return response.data;
  },
};
