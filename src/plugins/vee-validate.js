import { configure, defineRule } from 'vee-validate'
import i18n from '@/plugins/i18n.js'

const { t } = i18n.global

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: true,
})

defineRule('required', (value) => {
  if (!value || !value.length) {
    return t('validation.required')
  }
  return true
})

defineRule('phone', (value) => {
  if (!value || !value.length) {
    return true
  }
  if (!/^09\d{8}$/.test(value)) {
    return t('validation.phone')
  }
  return true
})

defineRule('email', (value) => {
  if (!value || !value.length) {
    return true
  }
  if (!/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value)) {
    return t('validation.email')
  }
  return true
})

defineRule('password', (value) => {
  if (!value || !value.length) {
    return true
  }
  if (!/^[a-zA-Z0-9 ]{6,12}$/.test(value)) {
    return t('validation.password')
  }
  return true
})

defineRule('confirmed', (value, [target], ctx) => {
  if (value === ctx.form[target]) {
    return true
  }
  return t('validation.confirm_password')
})

defineRule('referrer_code', (value) => {
  if (!value || !value.length) {
    return true
  }
  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6}$/.test(value)) {
    return t('validation.referrer_code')
  }
  return true
})