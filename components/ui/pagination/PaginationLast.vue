<script setup lang="ts">
import { PaginationLast, type PaginationLastProps, useForwardProps } from 'reka-ui'
import { DoubleArrowRightIcon } from '@radix-icons/vue'
import {
  Button,
} from '@/components/ui/button'

const props = withDefaults(defineProps<PaginationLastProps>(), {
  asChild: true,
})
const forwarded = useForwardProps(props)
</script>

<template>
  <PaginationLast v-bind="forwarded">
    <Button class="w-10 h-10 p-0" variant="outline">
      <slot>
        <DoubleArrowRightIcon />
      </slot>
    </Button>
  </PaginationLast>
</template>
