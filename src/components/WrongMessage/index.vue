<template>
  <ErrorMessage
    as="p"
    :name="name"
    class="error-text"
  />
</template>

<script setup>
import { ErrorMessage } from 'vee-validate'

defineProps({
  name: { type: String, required: true }
})

defineOptions({
  name: 'WrongMessage'
})

</script>