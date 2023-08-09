<template>
  <div
    class="flex justify-between p-[15px] bg-white rounded-five"
  >
    <div class="flex items-center">
      <img
        class="w-[20px] h-[20px]"
        src="/image/checked.png"
        alt=""
      />
      <p class="ml-[15px] text-primary-1">我同意服務條款</p>
    </div>
    <div class="w-[20px] h-[20px]">
      <img
        src="/image/select-right.png"
        alt=""
      />
    </div>
  </div>
</template>

<script setup>
// import uncheckImg from '@/assets/image/uncheck.png'
// import checkedImg from '@/assets/image/checked.png'

defineOptions({
  name: 'TermItem'
})
</script>
