<script setup lang="ts">
import {
  NavigationMenuLink,
  type NavigationMenuLinkEmits,
  type NavigationMenuLinkProps,
  useEmitAsProps,
} from 'reka-ui'

const props = defineProps<NavigationMenuLinkProps>()
const emits = defineEmits<NavigationMenuLinkEmits>()
</script>

<template>
  <NavigationMenuLink v-bind="{ ...props, ...useEmitAsProps(emits) }">
    <slot />
  </NavigationMenuLink>
</template>
