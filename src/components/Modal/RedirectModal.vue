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
          確定
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCommonStore } from '@/stores/common.js'

defineProps({
  modalTitle: { type: String, default: '提示' },
  modalContent: { type: String, default: '請重新填寫表單' },
  showCancel: { type: Boolean, default: false }
})

const router = useRouter()
const commonStore = useCommonStore()
const { redirectModalIsOpen, registerPath } = storeToRefs(commonStore)

const isOpen = computed({
  get() {
    return redirectModalIsOpen.value
  },
  set(val) {
    redirectModalIsOpen.value = val
  }
})

const confirmHandler = () => {
  isOpen.value = false
  router.push(registerPath.value)
}

defineOptions({
  name: 'RegsiterModal'
})

</script>