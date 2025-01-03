import { apiClient } from "../ApiClient";
import type { APIPage } from "../ApiClient";

export type APIBrand = {
  id: number;
  name: string;
  model_count: number;
}

export type APIBrands = APIPage<APIBrand>;

export const brandsApi = {
  async all(page: number) {
    const response = await apiClient.get("/brands", { params: { page: page } });
    return response.data as APIBrands;
  },

  // create
  // edit
}
