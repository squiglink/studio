import type { ServerBrand } from "./brands";
import type { ServerPage } from "../ServerClient";
import { serverClient } from "../ServerClient";

export type ServerModel = {
  brand: ServerBrand;
  id: string;
  name: string;
  shop_url: string;
};

export type ServerCreateModel = {
  brand_id: string;
  name: string;
};

export type ServerModels = ServerPage<ServerModel>;

export const modelsServer = {
  async all(page: number, query: string) {
    const response = await serverClient.get<ServerModels>("/models", { params: { page, query } });
    return response.data;
  },

  async create(model: ServerCreateModel) {
    const response = await serverClient.post<ServerModel>("/models", model);
    return response.data;
  },

  async get(id: string) {
    const response = await serverClient.get<ServerModel>(`/models/${id}`);
    return response.data;
  },
};
