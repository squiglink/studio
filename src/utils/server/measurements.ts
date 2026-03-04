import { serverClient } from '../ServerClient'

export type ServerMeasurement = {
  id: string
  kind: string
  label: string
  database_id: string
  model_id: string
  created_at: string
  updated_at: string
}

export type ServerMeasurementDetail = ServerMeasurement & {
  left_channel: string | null
  right_channel: string | null
}

export type ServerCreateMeasurement = {
  database_id: string
  kind: string
  label: string
  left_channel?: string
  right_channel?: string
  model_id: string
}

export type ServerUpdateMeasurement = {
  database_id?: string
  kind?: string
  label?: string
  left_channel?: string
  right_channel?: string
  model_id?: string
}

export const measurementsServer = {
  async all(databaseId: string, modelId: string) {
    const response = await serverClient.get('/measurements', {
      params: { database_id: databaseId, model_id: modelId },
    })
    return response.data as ServerMeasurement[]
  },

  async get(id: string) {
    const response = await serverClient.get(`/measurements/${id}`)
    return response.data as ServerMeasurementDetail
  },

  async create(measurement: ServerCreateMeasurement) {
    const response = await serverClient.post('/measurements', measurement)
    return response.data as ServerMeasurementDetail
  },

  async update(id: string, measurement: ServerUpdateMeasurement) {
    const response = await serverClient.patch(`/measurements/${id}`, measurement)
    return response.data as ServerMeasurementDetail
  },

  async remove(id: string) {
    await serverClient.delete(`/measurements/${id}`)
  },
}
