<script setup lang="ts">
import { MenubarSubTrigger, type MenubarSubTriggerProps } from 'reka-ui'
import { ChevronRightIcon } from '@radix-icons/vue'
import { cn } from '@/utils'

const props = defineProps<MenubarSubTriggerProps & { inset?: boolean, class?: string }>()
</script>

<template>
  <MenubarSubTrigger
    v-bind="props"
    :class="[
      cn(
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
        inset && 'pl-8',
        props.class,
      ),
    ]"
  >
    <slot />
    <ChevronRightIcon class="ml-auto h-4 w-4" />
  </MenubarSubTrigger>
</template>
