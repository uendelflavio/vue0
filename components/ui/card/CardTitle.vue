<script setup lang="ts">
const props = defineProps({
  class: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <h3
    :class="
      cn('font-semibold leading-none tracking-tight', props.class)
    "
  >
    <slot />
  </h3>
</template>
