import CryptoJS from 'crypto-js'

export const wm_sign = (body) => {
  const payload = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(body)))
  const signature = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(payload, import.meta.env.VITE_SIGN_KEY))
  const sign = payload + '.' + signature
  return sign
}

export const wm_md5 = (text) => {
  return CryptoJS.MD5(text).toString()
}