import { serverClient } from '../ServerClient'

interface AuthResponse {
  access_token: string
  refresh_token: string
}

export const authorizationServer = {
  async login(email: string, cloudflareTurnstileToken: string): Promise<boolean> {
    try {
      const response = await serverClient.post('/authorization/login', {
        email,
        cloudflareTurnstileToken,
      })

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
    const response = await serverClient.get<AuthResponse>('/authorization/verify', {
      params: { token: token },
    })

    if (response.status !== 200) {
      throw new Error('Failed to verify magic link token')
    } else {
      return response.data
    }
  },
}
