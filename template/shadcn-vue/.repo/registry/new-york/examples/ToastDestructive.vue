<script setup lang="ts">
import { h } from 'vue'
import { Button } from '@/registry/new-york/ui/button'
import { ToastAction } from '@/registry/new-york/ui/toast'
import { useToast } from '@/registry/new-york/ui/toast/use-toast'

const { toast } = useToast()
</script>

<template>
  <Button
    variant="outline" @click="() => {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
        variant: 'destructive',
        action: h(ToastAction, {
          altText: 'Try again',
        }, {
          default: () => 'Try again',
        }),
      });
    }"
  >
    Show Toast
  </Button>
</template>
