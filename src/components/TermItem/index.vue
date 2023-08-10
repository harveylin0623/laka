<template>
  <div
    class="flex justify-between p-[15px] bg-white rounded-five cursor-pointer"
    @click="termClick"
  >
    <div class="flex items-center">
      <img
        v-if="termInfo.isChecked"
        class="w-[20px] h-[20px]"
        src="/image/checked.png"
        alt=""
      />
      <img
        v-else
        class="w-[20px] h-[15px]"
        src="/image/uncheck.png"
        alt=""
      />
      <p class="ml-[15px] text-primary-1">{{ termInfo.title }}</p>
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
const props = defineProps({
  termInfo: { type: Object, required: true }
})

const emit = defineEmits(['termPop'])

const termClick = () => {
  emit('termPop', props.termInfo.id)
}

defineOptions({
  name: 'TermItem'
})
</script>
