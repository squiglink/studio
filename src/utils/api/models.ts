import { apiClient } from '../ApiClient'
import type { APIPage } from '../ApiClient'
import type { APIBrand } from './brands'

export type APIModel = {
  id: number
  name: string
  shop_url: string
  brand: APIBrand
}

export type APIModels = APIPage<APIModel>

export const modelsApi = {
  async all(page: number) {
    const response = await apiClient.get('/models', { params: { page: page } })
    return response.data as APIModels
  },
}
