<script setup lang="ts">
import { ToastTitle, type ToastTitleProps } from 'reka-ui'
import { cn } from '@/utils'

const props = defineProps<ToastTitleProps & { class?: string }>()
</script>

<template>
  <ToastTitle v-bind="props" :class="cn('text-sm font-semibold [&+div]:text-xs', props.class)">
    <slot />
  </ToastTitle>
</template>
