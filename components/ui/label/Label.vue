<script setup lang="ts">
import { Label, type LabelProps } from 'reka-ui'
import { cn } from '@/utils'

const props = defineProps<LabelProps & { class?: string }>()
</script>

<template>
  <Label
    v-bind="props"
    :class="
      cn(
        'block text-sm tracking-tight font-medium text-foreground text-left',
        props.class,
      )
    "
  >
    <slot />
  </Label>
</template>
