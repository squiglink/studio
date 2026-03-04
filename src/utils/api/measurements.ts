import { apiClient } from '../ApiClient'

export type APIMeasurement = {
  id: string
  kind: string
  label: string
  database_id: string
  model_id: string
  created_at: string
  updated_at: string
}

export type APIMeasurementDetail = APIMeasurement & {
  left_channel: string | null
  right_channel: string | null
}

export type APICreateMeasurement = {
  database_id: string
  kind: string
  label: string
  left_channel?: string
  right_channel?: string
  model_id: string
}

export type APIUpdateMeasurement = {
  database_id?: string
  kind?: string
  label?: string
  left_channel?: string
  right_channel?: string
  model_id?: string
}

export const measurementsApi = {
  async all(databaseId: string, modelId: string) {
    const response = await apiClient.get('/measurements', {
      params: { database_id: databaseId, model_id: modelId },
    })
    return response.data as APIMeasurement[]
  },

  async get(id: string) {
    const response = await apiClient.get(`/measurements/${id}`)
    return response.data as APIMeasurementDetail
  },

  async create(measurement: APICreateMeasurement) {
    const response = await apiClient.post('/measurements', measurement)
    return response.data as APIMeasurementDetail
  },

  async update(id: string, measurement: APIUpdateMeasurement) {
    const response = await apiClient.patch(`/measurements/${id}`, measurement)
    return response.data as APIMeasurementDetail
  },

  async remove(id: string) {
    await apiClient.delete(`/measurements/${id}`)
  },
}
