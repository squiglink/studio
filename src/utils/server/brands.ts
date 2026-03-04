import { serverClient } from "../ServerClient";
import type { ServerPage } from "../ServerClient";

export type ServerBrand = {
  id: string;
  name: string;
  model_count: number;
};

export type ServerBrandPayload = Pick<ServerBrand, "name">;

export type ServerBrands = ServerPage<ServerBrand>;

export const brandsServer = {
  async all(page: number, query: string) {
    const response = await serverClient.get("/brands", { params: { page: page, query: query } });
    return response.data as ServerBrands;
  },

  async create(brand: ServerBrandPayload) {
    const response = await serverClient.post("/brands", brand);
    return response.data as ServerBrand;
  },

  async edit(id: string, brand: ServerBrandPayload) {
    const response = await serverClient.patch(`/brands/${id}`, brand);
    return response.data as ServerBrand;
  },
};
