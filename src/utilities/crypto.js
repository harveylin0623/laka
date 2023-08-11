import CryptoJS from 'crypto-js'
const key = CryptoJS.enc.Utf8.parse('2qSGJxgFKzivef2nf41yP9o1gXiePA0R')
const iv = CryptoJS.enc.Utf8.parse('Cjf06A93dAv9bnq8')

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

export const aesEncrypt = (text) => {
  const cipher = CryptoJS.AES.encrypt(text, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return cipher.toString()
}

//key如果錯會回傳空字串,iv錯會報錯誤
export const aesDecrypt = (text) => {
  const cipher = CryptoJS.AES.decrypt(text, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return cipher.toString(CryptoJS.enc.Utf8)
}