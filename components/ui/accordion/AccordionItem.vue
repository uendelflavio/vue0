<script setup lang="ts">
import { AccordionItem, type AccordionItemProps } from 'reka-ui'
import { cn } from '@/utils'

const props = defineProps<AccordionItemProps & { class?: string }>()
</script>

<template>
  <AccordionItem
    v-bind="props"
    :class="cn('border-b', props.class ?? '')"
  >
    <slot />
  </AccordionItem>
</template>
