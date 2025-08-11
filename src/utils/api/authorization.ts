import { apiClient } from '../ApiClient'

interface AuthResponse {
  accessToken: string
  refreshToken: string
}

export const authorizationApi = {
  async login(email: string): Promise<boolean> {
    try {
      const response = await apiClient.post('/authorization/login', { email })

      if (response.status !== 200) {
        throw new Error('Failed to send magic link')
      } else {
        return true
      }
    } catch (error) {
      return false
    }
  },

  async verify(token: string): Promise<AuthResponse> {
    const response = await apiClient.get<AuthResponse>('/authorization/verify', {
      params: { token: token },
    })

    if (response.status !== 200) {
      throw new Error('Failed to verify magic link token')
    } else {
      return response.data
    }
  },
}
