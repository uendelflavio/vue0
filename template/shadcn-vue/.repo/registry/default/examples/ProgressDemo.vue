<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { Progress } from '@/registry/default/ui/progress'

const progress = ref(13)

watchEffect((cleanupFn) => {
  const timer = setTimeout(() => progress.value = 66, 500)
  cleanupFn(() => clearTimeout(timer))
})
</script>

<template>
  <Progress v-model="progress" class="w-3/5" />
</template>
