import { apiClient } from '../ApiClient'
import type { APIPage } from '../ApiClient'
import type { APIBrand } from './brands'

export type APIModel = {
  id: string
  name: string
  shop_url: string
  brand: APIBrand
}

export type APICreateModel = {
  name: string
  brand_id: string
}

export type APIModels = APIPage<APIModel>

export const modelsApi = {
  async all(page: number, query: string) {
    const response = await apiClient.get('/models', {
      params: { page: page, query: query },
    })
    return response.data as APIModels
  },

  async create(model: APICreateModel) {
    const response = await apiClient.post('/models', model)
    return response.data as APIModel
  },
}
