import type { ServerPage } from "../ServerClient";
import { serverClient } from "../ServerClient";

export type ServerBrand = {
  id: string;
  name: string;
  model_count: number;
};

export type ServerBrandPayload = Pick<ServerBrand, "name">;

export type ServerBrands = ServerPage<ServerBrand>;

export const brandsServer = {
  async all(page: number, query: string) {
    const response = await serverClient.get<ServerBrands>("/brands", { params: { page, query } });
    return response.data;
  },

  async create(brand: ServerBrandPayload) {
    const response = await serverClient.post<ServerBrand>("/brands", brand);
    return response.data;
  },
};
