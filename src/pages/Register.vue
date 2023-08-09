<template>
  <p class="pl-[15px] mb-2.5 text-primary-1">必填資訊</p>
  <VeeForm ref="form">
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
            v-model="gender"
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
        </div>
      </div>
    </div>

    <p class="pl-[15px] mt-[25px] mb-2.5 text-primary-1">選填資料</p>

    <div class="form-block mb-2.5 divide-y divide-primary-2">
      <div class="flex items-center py-[5px]">
        <p>推薦品牌</p>
        <div class="grow">
          <Field
            as="select"
            name="brand"
            class="form-control"
          >
            <option value="">brand</option>
          </Field>
        </div>
      </div>
      <div class="flex items-center py-[5px]">
        <p>推薦門市</p>
        <div class="grow">
          <Field
            as="select"
            name="store"
            class="form-control"
          >
            <option value="">store</option>
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

  <div class="mt-[25px] mb-5">
    <p class="pl-[15px] mb-2.5 text-primary-1">其他</p>
    <div class="space-y-2.5">
      <TermItem />
    </div>
  </div>

  <TermPop />

  <button class="btn btn-primary w-full">確定</button>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate'
import EyesIcon from '@/components/EyesIcon/index.vue'
import TermItem from '@/components/TermItem/index.vue'
import TermPop from '@/components/TermPop/index.vue'

const { t } = useI18n()
const form = ref(null)
const visible1 = ref(false)
const visible2 = ref(false)
const gender = ref('M')

onMounted(async() => {
  console.log(form.value)
})

useHead({ title: t('seo.title.register-1') })

</script>