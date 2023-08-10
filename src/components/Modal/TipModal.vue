<template>
  <el-dialog
    v-model="isOpen"
    :show-close="false"
    align-center
  >
    <template v-slot:header>
      <div class="my-header">
        <p class="text-[17px] text-center font-semibold">{{ modalTitle }}</p>
      </div>
    </template>
    <div class="text-center font-normal">{{ modalContent }}</div>
    <template v-slot:footer>
      <div class="flex items-center text-primary-5 border-t border-primary-2">
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
          確定
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
  showCancel: { type: Boolean, default: false }
})

const emit = defineEmits(['confirm'])

const isOpen = ref(false)

const toggleModal = () => {
  isOpen.value = !isOpen.value
}

const confirmHandler = () => {
  emit('confirm')
}

defineExpose({ toggleModal })

</script>

<style lang="scss" scoped>

</style>