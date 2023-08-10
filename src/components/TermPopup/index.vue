<template>
  <div
    class="fixed left-0 top-0 w-full h-screen bg-base"
    :class="isShow"
  >
    <div class="flex justify-center items-center h-[45px] text-white bg-primary-1">
      <img
        class="fixed left-[10px] top-[10px] w-[25px] h-[25px]"
        src="/image/close.png"
        alt=""
        @click="closeHandler"
      />
      <p>隱私權條款</p>
    </div>
    <div class="h-[calc(100vh-90px)] px-2.5 py-[25px] overflow-auto">
      <p class="mb-[25px] text-primary-1 text-center">下滑閱讀完即可點選同意條款按鈕</p>
      <div
        class="p-[15px] bg-white rounded-five"
        v-html="termInfo.content"
      ></div>
    </div>
    <button
      class="btn btn-primary w-full rounded-none"
      @click="agreeTerm"
    >
      我已閱讀完並同意條款
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  termInfo: { type: Object, required: true }
})

const emit = defineEmits(['agree', 'update:modelValue'])

const isShow = computed(() => props.termInfo.isOpen ? 'visible' : 'invisible')

const agreeTerm = () => {
  emit('agree', props.termInfo.id)
}

const closeHandler = () => {
  emit('update:modelValue', false)
}

defineOptions({
  name: 'TermPopup'
})

</script>

<style lang="scss" scoped>

</style>