<script setup lang="ts">
import { Italic } from 'lucide-vue-next'

import { Toggle } from '@/registry/default/ui/toggle'
</script>

<template>
  <Toggle size="sm" aria-label="Toggle italic">
    <Italic class="w-4 h-4" />
  </Toggle>
</template>
