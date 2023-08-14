import { useBaseAxios } from '../composables/useBaseAxios.js'

const mmrmApi = {
  term(params = {}) {
    return useBaseAxios({
      url: '/term/brief_term',
      method: 'post',
      data: { type: ['register'] },
      ...params
    })
  },
  searchBrand(params = {}) {
    return useBaseAxios({
      url: '/brand/search_brand',
      method: 'post',
      ...params
    })
  },
  brandInfo(params = {}) {
    return useBaseAxios({
      url: '/brand/brand_information',
      method: 'post',
      ...params
    })
  },
  searchStore(params = {}) {
    return useBaseAxios({
      url: '/store/search_store',
      method: 'post',
      ...params
    })
  },
  storeInfo(params = {}) {
    return useBaseAxios({
      url: '/store/store_information',
      method: 'post',
      ...params
    })
  },
  register_check(params = {}) {
    return useBaseAxios({
      url: '/member/register_check',
      method: 'post',
      ...params
    })
  },
  register(params = {}) {
    return useBaseAxios({
      url: '/member/register',
      method: 'post',
      ...params
    })
  },
  resend_register_verify(params = {}) {
    return useBaseAxios({
      url: '/member/resend_register_verify',
      method: 'post',
      ...params
    })
  },
  update_register_mobile(params = {}) {
    return useBaseAxios({
      url: '/member/update_register_mobile',
      method: 'post',
      ...params
    })
  },
}

export default mmrmApi