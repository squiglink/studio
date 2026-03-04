import { serverClient } from "../ServerClient";
import type { ServerPage } from "../ServerClient";
import type { ServerBrand } from "./brands";

export type ServerModel = {
  id: string;
  name: string;
  shop_url: string;
  brand: ServerBrand;
};

export type ServerCreateModel = {
  name: string;
  brand_id: string;
};

export type ServerModels = ServerPage<ServerModel>;

export const modelsServer = {
  async all(page: number, query: string) {
    const response = await serverClient.get("/models", {
      params: { page: page, query: query },
    });
    return response.data as ServerModels;
  },

  async create(model: ServerCreateModel) {
    const response = await serverClient.post("/models", model);
    return response.data as ServerModel;
  },
};
