import { apiClient } from '../ApiClient'
import type { APIPage } from '../ApiClient'

export type APIBrand = {
  id: string
  name: string
  model_count: number
}

export type APIBrands = APIPage<APIBrand>

export const brandsApi = {
  async all(page: number, query: string) {
    const response = await apiClient.get('/brands', { params: { page: page, query: query } })
    return response.data as APIBrands
  },

  async create(brand: APIBrand) {
    const response = await apiClient.post('/brands', brand)
    return response.data as APIBrand
  },

  async edit(brand: APIBrand) {
    const response = await apiClient.patch(`/brands/${brand.id}`, brand)
    return response.data as APIBrand
  },
}
