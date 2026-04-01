import type { ServerPage } from "../ServerClient";
import { serverClient } from "../ServerClient";

export type ServerDatabase = {
  id: string;
  kind: string;
  path: string;
};

export type ServerDatabases = ServerPage<ServerDatabase>;

export const databasesServer = {
  async all(page: number, query: string, userId: string) {
    const response = await serverClient.get<ServerDatabases>("/databases", {
      params: { page, query, user_id: userId },
    });
    return response.data;
  },
};
