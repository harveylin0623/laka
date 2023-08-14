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
            v-model.trim="formData.verifyCode"
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
      <button class="btn btn-primary w-full">驗證</button>
      <button class="btn btn-secondary w-full">重新寄送驗證碼</button>
      <router-link
        to="/"
        class="btn btn-secondary w-full"
      >
        修改手機號碼
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import { Form as VeeForm, Field } from 'vee-validate'
import WrongMessage from '@/components/WrongMessage/index.vue'
import { useCommonStore } from '@/stores/common.js'
import { sessionStorageObj } from '../utilities/storage.js'
import { useCheckHasUserData } from '@/composables/useCheckHasUserData.js'

const { t } = useI18n()
const veeForm = ref(null)
const commonStore = useCommonStore()
const { checkHasUserData } = useCheckHasUserData()

const ruleSchema = reactive({
  verifyConde: 'required',
})

const formData = reactive({
  mobile: '',
  verifyCode: '',
})

const getUserMobiler = () => {
  const userData = sessionStorageObj.getItem(commonStore.userDataKey)
  formData.mobile = userData.mobile
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