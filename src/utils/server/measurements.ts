import { serverClient } from "../ServerClient";

export type ServerCreateMeasurement = {
  database_id: string;
  kind: string;
  label: string;
  left_channel?: string;
  model_id: string;
  right_channel?: string;
};

export type ServerMeasurement = {
  created_at: string;
  database_id: string;
  id: string;
  kind: string;
  label: string;
  model_id: string;
  updated_at: string;
};

export type ServerMeasurementDetail = ServerMeasurement & {
  left_channel: string | null;
  right_channel: string | null;
};

export type ServerUpdateMeasurement = {
  database_id?: string;
  kind?: string;
  label?: string;
  left_channel?: string;
  model_id?: string;
  right_channel?: string;
};

export const measurementsServer = {
  async all(databaseId: string, modelId: string) {
    const response = await serverClient.get<ServerMeasurement[]>("/measurements", {
      params: { database_id: databaseId, model_id: modelId },
    });
    return response.data;
  },

  async create(measurement: ServerCreateMeasurement) {
    const response = await serverClient.post<ServerMeasurementDetail>("/measurements", measurement);
    return response.data;
  },

  async get(id: string) {
    const response = await serverClient.get<ServerMeasurementDetail>(`/measurements/${id}`);
    return response.data;
  },

  async remove(id: string) {
    await serverClient.delete(`/measurements/${id}`);
  },

  async update(id: string, measurement: ServerUpdateMeasurement) {
    const response = await serverClient.patch<ServerMeasurementDetail>(
      `/measurements/${id}`,
      measurement,
    );
    return response.data;
  },
};
