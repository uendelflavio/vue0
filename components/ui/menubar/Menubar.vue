<script setup lang="ts">
import {
  MenubarRoot,
  type MenubarRootEmits,
  type MenubarRootProps,
} from 'reka-ui'
import { cn } from '@/utils'

const props = defineProps<MenubarRootProps & { class?: string }>()

const emits = defineEmits<MenubarRootEmits>()
</script>

<template>
  <MenubarRoot
    v-bind="props"
    :class="
      cn(
        'flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm',
        props.class,
      )
    "
    @update:model-value="emits('update:modelValue', $event)"
  >
    <slot />
  </MenubarRoot>
</template>
