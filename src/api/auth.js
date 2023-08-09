import { useBaseAxios } from '../composables/useBaseAxios.js'

export const authApi = {
  login(params = {}) {
    return useBaseAxios({
      url: '/third_party_auth/login',
      method: 'post',
      ...params
    })
  },
}