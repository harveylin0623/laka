<template>
  <div
    id="default-layout"
    class="pb-5 bg-base min-h-screen"
  >
    <div class="flex justify-center items-center h-[40px] text-white bg-page-name text-base">{{ pageName }}</div>
    <div class="container">
      <img
        class="mb-[25px] mx-auto"
        :src="stepImgUrl"
        alt=""
      />
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import step1Img from '@/assets/image/step01@3x.png'
import step2Img from '@/assets/image/step02@3x.png'
import step3Img from '@/assets/image/logo.png'

const route = useRoute()
const pageName = computed(() => route.meta.pageName)
const stepIndex = computed(() => route.meta.setpIndex)
const stepImgUrl = computed(() => {
  let imgUrl = ''
  if (stepIndex.value === 1) imgUrl = step1Img
  if (stepIndex.value === 2) imgUrl = step2Img
  if (stepIndex.value === 3) imgUrl = step3Img
  return imgUrl
})

defineOptions({
  name: 'DefaultLayout'
})

</script>