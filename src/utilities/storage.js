import _ from 'lodash'

export const sessionStorageObj = {
  setItem(key, value) {
    if (!_.isPlainObject(value)) throw new Error('need plain object')
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  getItem(key) {
    const data = sessionStorage.getItem(key)
    return data !== null ? JSON.parse(data) : null
  },
  remoiveItem(key) {
    sessionStorage.removeItem(key)
  }
}