<script setup lang="ts">
import { AlertDialogAction, type AlertDialogActionProps } from 'reka-ui'
import { cn } from '@/utils'
import { buttonVariants } from '@/components/ui/button'

const props = defineProps<AlertDialogActionProps>()
</script>

<template>
  <AlertDialogAction v-bind="props" :class="cn(buttonVariants({ variant: 'destructive' }), $attrs.class ?? '')">
    <slot />
  </AlertDialogAction>
</template>
