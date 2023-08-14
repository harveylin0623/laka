<template>
  <VeeForm
    ref="veeForm"
    :validation-schema="ruleSchema"
  >
    <div class="form-block">
      <div class="form-row">
        <p>手機驗證碼</p>
        <div class="grow">
          <Field
            v-model.trim="formData.verify_code"
            type="text"
            name="verifyConde"
            class="form-control"
            inputmode="numeric"
          />
          <WrongMessage name="verifyConde" />
        </div>
      </div>
    </div>
  </VeeForm>

  <div class="px-[15px]">
    <p class="my-5 text-primary-1 text-sm">{{ t('send_verify_text', { mobile: formData.mobile }) }}</p>
    <div class="space-y-2.5">
      <button
        class="btn btn-primary w-full"
        @click="verifyHandler"
      >
        驗證
      </button>
      <button
        class="btn btn-secondary w-full"
        @click="sendAgain"
      >
        重新寄送驗證碼
      </button>
      <router-link
        to="/fixMobile"
        class="btn btn-secondary w-full"
      >
        修改手機號碼
      </router-link>
    </div>
  </div>

  <TipModal
    ref="tipModal1"
    :modal-content="tipInfo.content"
    @confirm="tip1ModalToggle"
  />

  <TipModal
    ref="tipModal2"
    :modal-content="tipInfo2.content"
    confirm-text="繼續點餐"
    @confirm="openOutsideWeb"
  />

  <Loading :is-loading="isLoading" />
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import { Form as VeeForm, Field } from 'vee-validate'
import WrongMessage from '@/components/WrongMessage/index.vue'
import { useCommonStore } from '@/stores/common.js'
import { useCheckHasUserData } from '@/composables/useCheckHasUserData.js'
import { sessionStorageObj } from '@/utilities/storage.js'
import { aesEncrypt } from '@/utilities/crypto.js'
import mmrmApi from '@/api/mmrm.js'

const { t } = useI18n()
const { checkHasUserData } = useCheckHasUserData()
const commonStore = useCommonStore()
const { userDataKey, tempTokenKey, urlParamsKey } = storeToRefs(commonStore)
const veeForm = ref(null)
const tipModal1 = ref(null)
const tipModal2 = ref(null)
const isLoading = ref(false)
const tipInfo = reactive({ content: '' })
const tipInfo2 = reactive({ content: t('modal_content.verify_ok') })

const ruleSchema = reactive({
  verifyConde: 'required',
})

const formData = reactive({
  mobile: '',
  verify_code: '',
})

const getUserMobiler = () => {
  const userData = sessionStorageObj.getItem(userDataKey.value)
  formData.mobile = userData.mobile
}

const tip1ModalToggle = () => {
  tipModal1.value.toggle()
}

const sendAgain = async() => {
  isLoading.value = true
  const tokenData = sessionStorageObj.getItem(tempTokenKey.value)
  const response = await mmrmApi.resend_register_verify({ temp_access_token: tokenData.token })
  tipInfo.content = response.rcrm.RM
  tip1ModalToggle()
  isLoading.value = false
}

const verifyHandler = async() => {
  const { valid } = await veeForm.value.validate()
  if (!valid) return
  isLoading.value = true
  const tokenData = sessionStorageObj.getItem(tempTokenKey.value)
  const response = await mmrmApi.register_verify({
    temp_access_token: tokenData.token,
    data: { verify_code: formData.verify_code }
  })
  if (response.rcrm.RC === 'C01') {
    tipModal2.value.toggle()
  } else {
    tipInfo.content = response.rcrm.RM
    tip1ModalToggle()
  }
  isLoading.value = false
}

const openOutsideWeb = () => {
  const userData = sessionStorageObj.getItem(userDataKey.value)
  const mobile = aesEncrypt(userData.mobile)
  const { redirect_url } = sessionStorageObj.getItem(urlParamsKey.value)
  const outsideUrl = `${redirect_url}?mobile=${encodeURIComponent(mobile)}`
  location.href = outsideUrl
}

const init = () => {
  const hasData = checkHasUserData()
  if (hasData) getUserMobiler()
}

onMounted(() => {
  init()
})

useHead({ title: t('seo.title.register-2') })

</script>