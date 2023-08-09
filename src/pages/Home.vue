<template>
  <div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'

const { t } = useI18n()

useHead({ title: t('seo.title.home') })

</script>

<style lang="scss">

</style>