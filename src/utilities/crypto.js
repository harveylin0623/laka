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

export const wm_aes = (input) => {
  const keyHash = CryptoJS.SHA384(import.meta.env.VITE_AES_KEY)
  const key = CryptoJS.enc.Hex.parse(keyHash.toString().substring(0,64))
  const iv = CryptoJS.enc.Hex.parse(keyHash.toString().substring(64,96))
  const encrypted = CryptoJS.AES.encrypt(input, key, { iv: iv })
  return encrypted.toString()
}