<script setup lang="ts">
import {
  NavigationMenuTrigger,
  type NavigationMenuTriggerProps,
} from 'reka-ui'
import { ChevronDownIcon } from '@radix-icons/vue'
import { navigationMenuTriggerStyle } from '.'
import { cn } from '@/utils'

const props = defineProps<NavigationMenuTriggerProps & { class?: string }>()
</script>

<template>
  <NavigationMenuTrigger
    :class="cn(navigationMenuTriggerStyle(), 'group', props.class)"
    v-bind="props"
  >
    <slot />
    <ChevronDownIcon
      class="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuTrigger>
</template>
