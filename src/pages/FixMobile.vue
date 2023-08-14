<template>
  <VeeForm
    ref="veeForm"
    :validation-schema="ruleSchema"
    class="mb-5"
  >
    <div class="form-block">
      <div class="form-row">
        <p>手機號碼</p>
        <div class="grow">
          <Field
            v-model.trim="formData.mobile"
            type="text"
            name="mobile"
            class="form-control"
            inputmode="numeric"
            :placeholder="t('placeholder.new_mobile')"
          />
          <WrongMessage name="mobile" />
        </div>
      </div>
    </div>
  </VeeForm>

  <div class="px-[15px]">
    <div class="space-y-2.5">
      <button
        class="btn btn-primary w-full"
        @click="submitHandler"
      >
        確定
      </button>
    </div>
  </div>

  <TipModal
    ref="tipModal1"
    :modal-content="tipInfo.content"
    @confirm="tip1ModalToggle"
  />

  <Loading :is-loading="isLoading" />
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import { Form as VeeForm, Field } from 'vee-validate'
import WrongMessage from '@/components/WrongMessage/index.vue'
import { useCommonStore } from '@/stores/common.js'
import { useCheckHasUserData } from '@/composables/useCheckHasUserData.js'
import { sessionStorageObj } from '@/utilities/storage.js'
import { wm_aes } from '@/utilities/crypto.js'
import mmrmApi from '@/api/mmrm.js'

const router = useRouter()
const { t } = useI18n()
const { checkHasUserData } = useCheckHasUserData()
const commonStore = useCommonStore()
const { userDataKey, tempTokenKey } = storeToRefs(commonStore)
const veeForm = ref(null)
const tipModal1 = ref(null)
const isLoading = ref(false)
const tipInfo = reactive({ status: false, content: '' })

const ruleSchema = reactive({
  mobile: 'required|phone',
})

const formData = reactive({
  mobile: '',
})

const updateUserMobile = () => {
  const userData = sessionStorageObj.getItem(userDataKey.value)
  userData.mobile = formData.mobile
  sessionStorageObj.setItem(userDataKey.value, userData)
}

const submitHandler = async() => {
  const { valid } = await veeForm.value.validate()
  if (!valid) return
  isLoading.value = true
  const temp_access_token = sessionStorageObj.getItem(tempTokenKey.value).token
  const response = await mmrmApi.update_register_mobile({
    temp_access_token,
    data: {
      mobile: wm_aes(formData.mobile)
    }
  })
  tipInfo.status = response.rcrm.RC === 'C01'
  tipInfo.content = response.rcrm.RM
  tipModal1.value.toggle()
  if (tipInfo.status) updateUserMobile()
  isLoading.value = false
}

const tip1ModalToggle = () => {
  if (tipInfo.status) {
    router.push('/register2')
  }
  tipModal1.value.toggle()
}

const init = () => {
  checkHasUserData()
}

onMounted(() => {
  init()
})

useHead({ title: t('seo.title.fixMobile') })

</script>