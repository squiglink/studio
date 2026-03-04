import { serverClient } from '../ServerClient'
import type { ServerPage } from '../ServerClient'

export type ServerBrand = {
  id: string
  name: string
  model_count: number
}

export type ServerBrands = ServerPage<ServerBrand>

export const brandsServer = {
  async all(page: number, query: string) {
    const response = await serverClient.get('/brands', { params: { page: page, query: query } })
    return response.data as ServerBrands
  },

  async create(brand: ServerBrand) {
    const response = await serverClient.post('/brands', brand)
    return response.data as ServerBrand
  },

  async edit(brand: ServerBrand) {
    const response = await serverClient.patch(`/brands/${brand.id}`, brand)
    return response.data as ServerBrand
  },
}
