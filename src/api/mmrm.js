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
  }
}

export default mmrmApi