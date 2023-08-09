import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import _ from 'lodash'

export const useAuthStore = defineStore('auth', () => {
  const profile = ref({})
  const isLogin = computed(() => _.size(profile.value) > 0)

  return { isLogin, profile }
}, {
  persist: true
})