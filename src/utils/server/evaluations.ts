import { serverClient } from "../ServerClient";

export type ServerEvaluation = {
  id: string;
  model_id: string;
  user_id: string;
  review_score: number | null;
  review_url: string | null;
  shop_url: string | null;
  created_at: string;
  updated_at: string;
};

export type ServerCreateEvaluation = {
  model_id: string;
  review_score?: number | null;
  review_url?: string | null;
  shop_url?: string | null;
};

export type ServerUpdateEvaluation = {
  review_score?: number | null;
  review_url?: string | null;
  shop_url?: string | null;
};

export const evaluationsServer = {
  async create(evaluation: ServerCreateEvaluation) {
    const response = await serverClient.post("/evaluations", evaluation);
    return response.data as ServerEvaluation;
  },

  async update(id: string, evaluation: ServerUpdateEvaluation) {
    const response = await serverClient.patch(`/evaluations/${id}`, evaluation);
    return response.data as ServerEvaluation;
  },
};
