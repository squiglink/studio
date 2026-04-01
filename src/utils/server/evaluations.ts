import { serverClient } from "../ServerClient";

export type ServerCreateEvaluation = {
  model_id: string;
  review_score?: number | null;
  review_url?: string | null;
  shop_url?: string | null;
};

export type ServerEvaluation = {
  created_at: string;
  id: string;
  model_id: string;
  review_score: number | null;
  review_url: string | null;
  shop_url: string | null;
  updated_at: string;
  user_id: string;
};

export type ServerUpdateEvaluation = {
  review_score?: number | null;
  review_url?: string | null;
  shop_url?: string | null;
};

export const evaluationsServer = {
  async create(evaluation: ServerCreateEvaluation) {
    const response = await serverClient.post<ServerEvaluation>("/evaluations", evaluation);
    return response.data;
  },

  async get(userId: string, modelId: string) {
    const response = await serverClient.get<ServerEvaluation>("/evaluations", {
      params: { user_id: userId, model_id: modelId },
    });
    return response.data;
  },

  async update(id: string, evaluation: ServerUpdateEvaluation) {
    const response = await serverClient.patch<ServerEvaluation>(`/evaluations/${id}`, evaluation);
    return response.data;
  },
};
