<script setup lang="ts">
import { MenubarLabel, type MenubarLabelProps } from 'reka-ui'
import { cn } from '@/utils'

const props = defineProps<MenubarLabelProps & { inset?: boolean, class?: string }>()
</script>

<template>
  <MenubarLabel :class="cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', props.class)">
    <slot />
  </MenubarLabel>
</template>
