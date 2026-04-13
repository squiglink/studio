import { serverClient } from "../ServerClient";

export type ServerUser = {
  created_at: string;
  display_name: string;
  email: string;
  id: string;
  role: string;
  scoring_system: string;
  updated_at: string;
  username: string;
};

export const usersServer = {
  async show(id: string) {
    const response = await serverClient.get<ServerUser>(`/users/${id}`);
    return response.data;
  },
};
