<script setup lang="ts">
import { MenubarSeparator, type MenubarSeparatorProps } from 'reka-ui'
import { cn } from '@/utils'

const props = defineProps<MenubarSeparatorProps>()
</script>

<template>
  <MenubarSeparator :class=" cn('-mx-1 my-1 h-px bg-secondary', $attrs.class ?? '')" v-bind="props" />
</template>
