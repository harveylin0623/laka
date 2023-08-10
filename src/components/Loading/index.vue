<template>
  <div
    v-show="isLoading"
    class="fixed left-0 top-0 flex justify-center items-center w-full h-screen bg-mask space-x-1"
  >
    <div
      v-for="count in 3"
      :key="count"
      class="w-[23px] h-[23px] rounded-full bg-primary-4 scale-0 dot"
    ></div>
  </div>
</template>

<script setup>
import { watch, toRefs, onBeforeUnmount } from 'vue'

defineOptions({
  name: 'Loading'
})

const props = defineProps({
  isLoading: { type: Boolean, default: false }
})

const { isLoading } = toRefs(props)

watch(isLoading, () => {
  document.body.classList.toggle('overflow-hidden')
})

onBeforeUnmount(() => {
  document.body.classList.remove('overflow-hidden')
})

</script>

<style lang="scss" scoped>
$animDelay: 0.25s;
.dot {
  @for $i from 0 to 3 {
    &:nth-child(#{$i + 1}) {
      animation-delay: $animDelay * $i;
    }
  }
  animation: dotanim 1.5s infinite ease-in-out;
}

@keyframes dotanim {
  0% { transform: scale(0); }
  50% { transform: scale(1); }
  90% { transform: scale(0); }
  100% { transform: scale(0); }
}
</style>