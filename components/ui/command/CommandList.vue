<script setup lang="ts">
import type { ComboboxContentEmits, ComboboxContentProps } from 'reka-ui'
import { ComboboxContent, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/utils'

const props = defineProps<ComboboxContentProps>()
const emits = defineEmits<ComboboxContentEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <ComboboxContent v-bind="forwarded" :class="cn('max-h-[300px] overflow-y-auto overflow-x-hidden', $attrs.class ?? '')">
    <div role="presentation">
      <slot />
    </div>
  </ComboboxContent>
</template>
