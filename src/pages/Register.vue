<template>
  <p class="pl-[15px] mb-2.5 text-primary-1">必填資訊</p>
  <VeeForm ref="veeForm">
    <div class="form-block mb-2.5 divide-y divide-primary-2">
      <div class="flex items-center py-[5px]">
        <p>手機號碼</p>
        <div class="grow">
          <Field
            type="text"
            name="phone"
            class="form-control"
            :placeholder="t('placeholder.phone')"
            rules="required|phone"
            inputmode="numeric"
          />
          <ErrorMessage
            as="p"
            name="phone"
            class="error-text"
          />
        </div>
      </div>
      <div class="flex items-center py-[5px]">
        <p>密碼</p>
        <div class="relative grow">
          <Field
            v-visible="visible1"
            type="password"
            name="password"
            class="form-control !pr-8"
            :placeholder="t('placeholder.password')"
            rules="required|password"
          />
          <EyesIcon v-model="visible1" />
          <ErrorMessage
            as="p"
            name="password"
            class="error-text"
          />
        </div>
      </div>
      <div class="flex items-center py-[5px]">
        <p>密碼確認</p>
        <div class="relative grow">
          <Field
            v-visible="visible2"
            type="password"
            name="confirm_password"
            class="form-control !pr-8"
            :placeholder="t('placeholder.password')"
            rules="required|confirmed:password"
          />
          <EyesIcon v-model="visible2" />
          <ErrorMessage
            as="p"
            name="confirm_password"
            class="error-text"
          />
        </div>
      </div>
    </div>

    <div class="form-block mb-2.5 divide-y divide-primary-2">
      <div class="flex items-center py-[5px]">
        <p>姓名</p>
        <div class="grow">
          <Field
            type="text"
            name="userName"
            class="form-control"
            :placeholder="t('placeholder.userName')"
            rules="required"
          />
          <ErrorMessage
            as="p"
            name="userName"
            class="error-text"
          />
        </div>
      </div>
      <div class="flex items-center py-[5px]">
        <p>姓別</p>
        <div class="grow">
          <Field
            v-model="formData.gender"
            as="select"
            name="gender"
            class="form-control"
            rules="required"
          >
            <option value="M">男性</option>
            <option value="F">女性</option>
            <option value="S">保密</option>
          </Field>
          <ErrorMessage
            as="p"
            name="gender"
            class="error-text"
          />
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
            type="text"
            name="recommandCode"
            class="form-control"
            :placeholder="t('placeholder.recommandCode')"
          />
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

  <TipModal ref="tipModal1" />

  <Loading :is-loading="isLoading" />

  <button class="btn btn-primary w-full">確定</button>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate'
import flatPickr from 'vue-flatpickr-component'
import zhTw from 'flatpickr/dist/l10n/zh-tw'
import 'flatpickr/dist/flatpickr.css'
import EyesIcon from '@/components/EyesIcon/index.vue'
import TermItem from '@/components/TermItem/index.vue'
import TermPopup from '@/components/TermPopup/index.vue'
import mmrmApi from '@/api/mmrm.js'

const { t } = useI18n()
const veeForm = ref(null)
const tipModal1 = ref(null)
const visible1 = ref(false)
const visible2 = ref(false)
const isLoading = ref(false)
const termList = reactive({ data: [] })
const brandList = reactive({ data: [] })
const storeList = reactive({ data: [] })
const formData = reactive({
  brand_id: -1,
  gender: '',
  birthday: '',
  recommend_store_code: ''
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
  let list = await getStoreList()
  formData.recommend_store_code = list.length > 0 ? list[0].code : ''
  storeList.data = list
  isLoading.value = false
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