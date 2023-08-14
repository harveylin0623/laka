import axios from 'axios'
import dayjs from 'dayjs'
import { wm_sign } from '@/utilities/crypto.js'

export const useBaseAxios = (options) => {
  const { data = {}, temp_access_token, ...other } = options
  const requestSchema = {
    request_parameter: { ...data },
    timestamp: dayjs().format('YYYY/MM/DD HH:mm:ss')
  }
  if (temp_access_token !== undefined) {
    requestSchema.temp_access_token = temp_access_token
  }

  const sign = wm_sign(requestSchema)

  const baseAxios = axios.create({
    baseURL: `${import.meta.env.VITE_API_HOST}/api`,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'zh-TW',
      'app-id': import.meta.env.VITE_APP_ID,
      'device-uuid': '123'
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

  return baseAxios({ ...other, data: { sign } }).then(res => res.data)
}