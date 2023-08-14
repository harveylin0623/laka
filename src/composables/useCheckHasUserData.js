import { storeToRefs } from 'pinia'
import { useCommonStore } from '@/stores/common.js'
import { sessionStorageObj } from '../utilities/storage.js'

export const useCheckHasUserData = () => {
  const commonStore = useCommonStore()
  const { urlParamsKey, userDataKey, redirectModalIsOpen, registerPath } = storeToRefs(commonStore)

  const redirectHandler = () => {
    const urlParamsData = sessionStorageObj.getItem(urlParamsKey.value)
    let path = ''
    if (urlParamsData === null) {
      path = '/register'
    } else {
      const { mobile, redirect_url } = urlParamsData
      path = `/register?mobile=${encodeURIComponent(mobile)}&redirect_url=${encodeURIComponent(redirect_url)}`
    }
    registerPath.value = path
    redirectModalIsOpen.value = true
  }

  const checkHasUserData = () => {
    const userData = sessionStorageObj.getItem(userDataKey.value)
    const hasUserData = userData !== null
    if (!hasUserData) redirectHandler()
    return hasUserData
  }

  return { checkHasUserData, redirectHandler }
}