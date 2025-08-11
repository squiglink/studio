import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthorizationStore = defineStore('authorization', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
  }),
  actions: {
    setAccessToken(token: string) {
      this.accessToken = token
      localStorage.setItem('accessToken', token)
    },
    setRefreshToken(token: string) {
      this.refreshToken = token
      localStorage.setItem('refreshToken', token)
    },
    clearTokens() {
      this.accessToken = ''
      this.refreshToken = ''
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    },
  },
})
