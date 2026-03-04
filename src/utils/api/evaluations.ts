import { apiClient } from '../ApiClient'

export type APIEvaluation = {
  id: string
  model_id: string
  user_id: string
  review_score: number | null
  review_url: string | null
  shop_url: string | null
  created_at: string
  updated_at: string
}

export type APICreateEvaluation = {
  model_id: string
  review_score?: number | null
  review_url?: string | null
  shop_url?: string | null
}

export type APIUpdateEvaluation = {
  review_score?: number | null
  review_url?: string | null
  shop_url?: string | null
}

export const evaluationsApi = {
  async create(evaluation: APICreateEvaluation) {
    const response = await apiClient.post('/evaluations', evaluation)
    return response.data as APIEvaluation
  },

  async update(id: string, evaluation: APIUpdateEvaluation) {
    const response = await apiClient.patch(`/evaluations/${id}`, evaluation)
    return response.data as APIEvaluation
  },
}
