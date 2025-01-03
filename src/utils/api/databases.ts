import { apiClient } from "../ApiClient";
import type { APIPage } from "../ApiClient";

export type APIDatabase = {
  id: number;
  kind: string;
  path: string;
}

export type APIDatabases = APIPage<APIDatabase>;

export const databasesApi = {
  async all(page: number) {
    const response = await apiClient.get("/databases", { params: { page: page } });
    return response.data as APIDatabases;
  },
}
