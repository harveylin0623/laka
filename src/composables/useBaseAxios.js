import axios from 'axios'
// import router from '@/router/index.js'

export const useBaseAxios = (options) => {
  const baseAxios = axios.create({
    baseURL: `${import.meta.env.VITE_API_HOST}/api`,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  baseAxios.interceptors.request.use(function (config) {
    return config
  }, function (error) {
    return Promise.reject(error)
  })

  baseAxios.interceptors.response.use(function (response) {
    return response
  }, function (error) {
    return Promise.reject(error)
  })

  return baseAxios({ ...options }).then(res => res.data)
}