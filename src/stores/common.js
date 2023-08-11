import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', () => {
  const userDataKey = ref('laka-userInfo')
  const tempTokenKey = ref('laka-temp-token')

  return { userDataKey, tempTokenKey }
})