import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', () => {
  const userDataKey = ref('laka-userInfo')
  const tempTokenKey = ref('laka-temp-token')
  const urlParamsKey = ref('laka-url-params')
  const redirectModalIsOpen = ref(false)
  const registerPath = ref('')

  return { userDataKey, tempTokenKey, urlParamsKey, redirectModalIsOpen, registerPath }
})