<template>
  <el-dialog
    v-model="isOpen"
    :show-close="false"
    :close-on-click-modal="false"
    align-center
  >
    <template v-slot:header>
      <div class="my-header">
        <p class="text-[17px] text-center font-semibold">{{ modalTitle }}</p>
      </div>
    </template>
    <div class="text-center font-normal">{{ modalContent }}</div>
    <template v-slot:footer>
      <div class="flex items-center text-primary-5 border-t border-primary-2 cursor-pointer">
        <div
          v-if="showCancel"
          class="grow h-[40px] text-center leading-[40px] border-r border-primary-2"
        >
          取消
        </div>
        <div
          class="grow h-[40px] text-center leading-[40px]"
          @click="confirmHandler"
        >
          {{ confirmText }}
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  modalTitle: { type: String, default: '提示' },
  modalContent: { type: String, default: '' },
  showCancel: { type: Boolean, default: false },
  confirmText: { type: String, default: '確定' }
})

const emit = defineEmits(['confirm'])

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
}

const confirmHandler = () => {
  emit('confirm')
}

defineExpose({ toggle })

</script>

<style lang="scss" scoped>

</style>