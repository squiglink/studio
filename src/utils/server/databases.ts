import type { ServerPage } from "../ServerClient";
import { serverClient } from "../ServerClient";

export type ServerDatabase = {
  id: string;
  kind: string;
  path: string;
};

export type ServerDatabasePayload = {
  kind: string;
  path: string;
};

export type ServerDatabaseUpdatePayload = {
  kind?: string;
  path?: string;
};

export type ServerDatabases = ServerPage<ServerDatabase>;

export const databasesServer = {
  async all(page: number, query: string, userId: string) {
    const response = await serverClient.get<ServerDatabases>("/databases", {
      params: { page, query, user_id: userId },
    });
    return response.data;
  },

  async create(database: ServerDatabasePayload) {
    const response = await serverClient.post<ServerDatabase>("/databases", database);
    return response.data;
  },

  async get(id: string) {
    const response = await serverClient.get<ServerDatabase>(`/databases/${id}`);
    return response.data;
  },

  async update(id: string, database: ServerDatabaseUpdatePayload) {
    const response = await serverClient.patch<ServerDatabase>(`/databases/${id}`, database);
    return response.data;
  },
};
