<template>
  <div
    class="absolute top-[5px] right-[5px] w-[25px] h-[25px]"
    @click="clickHandler"
  >
    <img
      :src="eyesImgUrl"
      alt=""
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import visibleImg from '@/assets/image/visible.png'
import invisibleImg from '@/assets/image/invisible.png'

const props = defineProps({
  modelValue: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

const eyesImgUrl = computed(() => props.modelValue ? invisibleImg : visibleImg )

const clickHandler = () => {
  emit('update:modelValue', !props.modelValue)
}

defineOptions({
  name: 'EyesIcon'
})

</script>