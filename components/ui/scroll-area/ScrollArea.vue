<script setup lang="ts">
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  type ScrollAreaRootProps,
  ScrollAreaViewport,
} from 'reka-ui'
import ScrollBar from './ScrollBar.vue'
import { cn } from '@/utils'

const props = withDefaults(
  defineProps<
    ScrollAreaRootProps & { class?: string }
  >(),
  {
    class: '',
    orientation: 'vertical',
  },
)
</script>

<template>
  <ScrollAreaRoot :type="type" :class="cn('relative overflow-hidden', props.class)">
    <ScrollAreaViewport class="h-full w-full  rounded-[inherit]">
      <slot />
    </ScrollAreaViewport>
    <ScrollBar />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
