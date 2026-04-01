import { serverClient } from "../ServerClient";
import type { ServerPage } from "../ServerClient";

export type ServerDatabase = {
  id: string;
  kind: string;
  path: string;
};

export type ServerDatabases = ServerPage<ServerDatabase>;

export const databasesServer = {
  async all(page: number, query: string, userId: string) {
    const response = await serverClient.get("/databases", {
      params: {
        page: page,
        query: query,
        user_id: userId,
      },
    });
    return response.data as ServerDatabases;
  },
};
