<script setup lang="ts">
import { ToastClose } from 'reka-ui'
import { Cross2Icon } from '@radix-icons/vue'
import { cn } from '@/utils'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <ToastClose v-bind="props" :class="cn('absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600', props.class)">
    <Cross2Icon class="h-4 w-4" />
  </ToastClose>
</template>
