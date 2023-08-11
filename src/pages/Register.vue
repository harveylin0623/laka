<template>
  <p class="pl-[15px] mb-2.5 text-primary-1">必填資訊</p>
  <VeeForm
    ref="veeForm"
    :validation-schema="ruleSchema"
  >
    <div class="form-block mb-2.5 divide-y divide-primary-2">
      <div class="flex items-center py-[5px]">
        <p>手機號碼</p>
        <div class="grow">
          <Field
            v-model.trim="formData.mobile"
            type="text"
            name="mobile"
            class="form-control"
            :placeholder="t('placeholder.mobile')"
            inputmode="numeric"
          />
          <WrongMessage name="mobile" />
        </div>
      </div>
      <div class="flex items-center py-[5px]">
        <p>密碼</p>
        <div class="relative grow">
          <Field
            v-model.trim="formData.password"
            v-visible="visible1"
            type="password"
            name="password"
            class="form-control !pr-8"
            :placeholder="t('placeholder.password')"
          />
          <EyesIcon v-model="visible1" />
          <WrongMessage name="password" />
        </div>
      </div>
      <div class="flex items-center py-[5px]">
        <p>密碼確認</p>
        <div class="relative grow">
          <Field
            v-model.trim="formData.confirm_password"
            v-visible="visible2"
            type="password"
            name="confirm_password"
            class="form-control !pr-8"
            :placeholder="t('placeholder.password')"
          />
          <EyesIcon v-model="visible2" />
          <WrongMessage name="confirm_password" />
        </div>
      </div>
    </div>

    <div class="form-block mb-2.5 divide-y divide-primary-2">
      <div class="flex items-center py-[5px]">
        <p>姓名</p>
        <div class="grow">
          <Field
            v-model.trim="formData.name"
            type="text"
            name="name"
            class="form-control"
            :placeholder="t('placeholder.name')"
          />
          <WrongMessage name="name" />
        </div>
      </div>
      <div class="flex items-center py-[5px]">
        <p>性別</p>
        <div class="grow">
          <Field
            v-model="formData.gender"
            as="select"
            name="gender"
            class="form-control"
          >
            <option
              v-for="value, key in genderList"
              :key="key"
              :value="key"
            >
              {{ value }}
            </option>
          </Field>
          <WrongMessage name="gender" />
        </div>
      </div>
      <div class="flex items-center py-[5px]">
        <p>出生日期</p>
        <div class="grow">
          <flat-pickr
            v-model="formData.birthday"
            :config="flatPickerConfig"
            class="form-control"
            :placeholder="t('placeholder.birthday')"
          />
        </div>
      </div>
    </div>

    <p class="pl-[15px] mt-[25px] mb-2.5 text-primary-1">選填資料</p>

    <div class="form-block mb-2.5 divide-y divide-primary-2">
      <div class="flex items-center py-[5px]">
        <p>推薦品牌</p>
        <div class="grow">
          <Field
            v-model.number="formData.brand_id"
            as="select"
            name="brand"
            class="form-control"
            @change="brandChange"
          >
            <option value="-1"></option>
            <option
              v-for="brand in brandList.data"
              :key="brand.brand_id"
              :value="brand.brand_id"
            >
              {{ brand.title }}
            </option>
          </Field>
        </div>
      </div>
      <div class="flex items-center py-[5px]">
        <p>推薦門市</p>
        <div class="grow">
          <Field
            v-model="formData.recommend_store_code"
            as="select"
            name="store"
            class="form-control"
          >
            <option value=""></option>
            <option
              v-for="store in storeList.data"
              :key="store.code"
              :value="store.code"
            >
              {{ store.title }}
            </option>
          </Field>
        </div>
      </div>
      <div class="flex items-center py-[5px]">
        <p>好友邀請碼</p>
        <div class="grow">
          <Field
            v-model="formData.referrer_code"
            type="text"
            name="referrer_code"
            class="form-control"
            :placeholder="t('placeholder.referrer_code')"
          />
          <WrongMessage name="referrer_code" />
        </div>
      </div>
    </div>
  </VeeForm>

  <div
    v-if="hasTermData"
    class="mt-[25px] mb-5"
  >
    <p class="pl-[15px] mb-2.5 text-primary-1">其他</p>
    <div class="space-y-2.5">
      <TermItem
        v-for="term in termList.data"
        :key="term.id"
        :term-info="term"
        :is-verified="isFirstVerified"
        @term-pop="openTermPopup"
      />
    </div>
  </div>

  <TermPopup
    v-for="term in termList.data"
    :key="term.id"
    v-model="term.isOpen"
    :term-info="term"
    @agree="agreeTerm"
  />

  <TipModal
    ref="errorModal"
    :modal-content="tipInfo.content"
    @confirm="errorConfirm"
  />

  <button
    class="btn btn-primary w-full"
    @click="submitHandler"
  >
    確定
  </button>

  <Loading :is-loading="isLoading" />
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import { Form as VeeForm, Field } from 'vee-validate'
import flatPickr from 'vue-flatpickr-component'
import zhTw from 'flatpickr/dist/l10n/zh-tw'
import 'flatpickr/dist/flatpickr.css'
import mmrmApi from '@/api/mmrm.js'
import { wm_md5, wm_aes } from '@/utilities/crypto.js'
import { useCommonStore } from '@/stores/common.js'
import { sessionStorageObj } from '@/utilities/storage.js'
import EyesIcon from '@/components/EyesIcon/index.vue'
import TermItem from '@/components/TermItem/index.vue'
import TermPopup from '@/components/TermPopup/index.vue'
import WrongMessage from '@/components/WrongMessage/index.vue'

const { t } = useI18n()
const veeForm = ref(null)
const errorModal = ref(null)
const visible1 = ref(false)
const visible2 = ref(false)
const isLoading = ref(false)
const isFirstVerified = ref(false)
const termList = reactive({ data: [] })
const brandList = reactive({ data: [] })
const storeList = reactive({ data: [] })
const tipInfo = reactive({ content: '' })
const commonStore = useCommonStore()

const ruleSchema = reactive({
  mobile: 'required|phone',
  password: 'required|password',
  confirm_password: 'required|confirmed:password',
  name: 'required',
  gender: 'required',
  referrer_code: 'referrer_code'
})

const genderList = reactive({ 'M': '男性', 'F': '女性', 'S': '保密' })

const formData = reactive({
  mobile: '',
  password: '',
  confirm_password: '',
  name: '',
  gender: '',
  birthday: '',
  brand_id: -1,
  recommend_store_code: '',
  referrer_code: ''
})

const flatPickerConfig = reactive({
  dateFormat: 'Y/m/d',
  disableMobile: 'true',
  locale: zhTw.zh_tw,
  minDate: new Date(),
  maxDate: new Date()
})

const hasTermData = computed(() => termList.data.length > 0)

const setFlatPickerDate = () => {
  const maxDate = dayjs().subtract(18, 'year').month(0).date(1)
  const minDate = maxDate.subtract(100, 'year')
  flatPickerConfig.minDate = minDate.toDate()
  flatPickerConfig.maxDate = maxDate.toDate()
  formData.birthday = maxDate.format('YYYY/MM/DD')
}

const createTermList = (lists) => {
  if (lists.length === 0) return []
  return lists[0].terms.reduce((prev, current) => {
    prev.push({ ...current, isChecked: false, isOpen: false })
    return prev
  }, [])
}

const openTermPopup = (termId, isOpen = true) => {
  const obj = termList.data.find(item => item.id === termId)
  obj.isOpen = isOpen
  return obj
}

const agreeTerm = (termId) => {
  const obj = openTermPopup(termId, false)
  obj.isChecked = true
}

const getStoreList = async() => {
  const { brand_id } = formData
  if (brand_id === -1 ) return []
  const responseA = await mmrmApi.searchStore({ data: { brand_ids: [brand_id] } })
  const { store_ids } = responseA.results
  if (store_ids.length === 0) return []
  const responseB = await mmrmApi.storeInfo({
    data: { store_ids, query_info: 'summary', all_brands_available: false }
  })
  return responseB.results.store_information
}

const brandChange = async() => {
  isLoading.value = true
  const list = await getStoreList()
  formData.recommend_store_code = list.length > 0 ? list[0].code : ''
  storeList.data = list
  isLoading.value = false
}

const checkTermIsRead = () => {
  return termList.data.every(item => item.isChecked)
}

const registerCheck = async() => {
  const { gender, password, mobile, birthday, referrer_code, name } = formData
  const payload = {
    gender,
    password: wm_aes(wm_md5(password)),
    mobile: wm_aes(mobile),
    birthday,
    referrer_code,
    name
  }
  const { rcrm } = await mmrmApi.register_check({ data: { register_check: payload } })
  return { status: rcrm.RC === 'C01', message: rcrm.RM }
}

const register = async() => {
  const { gender, password, mobile, birthday, referrer_code, name, recommend_store_code } = formData
  const payload = {
    gender,
    password: wm_aes(wm_md5(password)),
    mobile: wm_aes(mobile),
    birthday,
    referrer_code,
    name,
    recommend_store_code
  }
  const { rcrm, results } = await mmrmApi.register({ data: { register: payload } })
  const { RC, RM } = rcrm
  const status = RC === 'C01'
  return { status, message: RM, token: status ? results.temp_access_token : '' }
}

const saveUserData = (token) => {
  sessionStorageObj.setItem(commonStore.userDataKey, formData)
  sessionStorageObj.setItem(commonStore.tempTokenKey, { token })
}

const submitHandler = async() => {
  isFirstVerified.value = true
  const { valid:formIsValid } = await veeForm.value.validate()
  const allTermIsRead = checkTermIsRead()
  isLoading.value = true
  if (formIsValid === false || allTermIsRead === false) return
  const checkRes = await registerCheck()
  if (!checkRes.status) {
    handleError(checkRes.message)
    isLoading.value = false
    return
  }
  const registerRes = await register()
  if (!registerRes.status) {
    handleError(registerRes.message)
    isLoading.value = false
    return
  }
  saveUserData(registerRes.token)
}

const handleError = (message) => {
  tipInfo.content = message
  errorModal.value.toggle()
}

const errorConfirm = () => {
  errorModal.value.toggle()
}

const retriveUserData = async() => {
  const storage = sessionStorageObj.getItem(commonStore.userDataKey)
  if (storage === null) return
  for (let key in storage) {
    if (key === 'recommend_store_code') continue
    formData[key] = storage[key]
  }
  await brandChange()
  formData.recommend_store_code = storage.recommend_store_code
  termList.data.forEach(item => { item.isChecked = true })
}

const init = async() => {
  isLoading.value = true
  const [termData, brandData] = await Promise.all([
    mmrmApi.term(),
    mmrmApi.searchBrand()
  ])
  const brandInfo = await mmrmApi.brandInfo({
    data: { brand_ids: brandData.results.brand_ids, full_info: false }
  })
  termList.data = createTermList(termData.results.term_information)
  brandList.data = brandInfo.results.brand_information
  await retriveUserData()
  isLoading.value = false
}

onMounted(async() => {
  setFlatPickerDate()
  init()
})

useHead({ title: t('seo.title.register-1') })

</script>

<style lang="scss">
.flatpickr-day.selected {
  background-color: #8B169C;
  border-color: #8B169C;
}
</style>