<script setup lang="ts">
import {
  NavigationMenuRoot,
  type NavigationMenuRootEmits,
  type NavigationMenuRootProps,
} from 'reka-ui'
import NavigationMenuViewport from './NavigationMenuViewport.vue'
import { cn } from '@/utils'

const props = defineProps<NavigationMenuRootProps & { class?: string }>()

const emits = defineEmits<NavigationMenuRootEmits>()
</script>

<template>
  <NavigationMenuRoot
    v-bind="props"
    :class="cn('relative z-10 flex max-w-max flex-1 items-center justify-center', props.class)"
    @update:model-value="emits('update:modelValue', $event)"
  >
    <slot />
    <NavigationMenuViewport />
  </NavigationMenuRoot>
</template>
