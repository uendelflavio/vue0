<script setup lang="ts">
import { Bold, Italic, Underline } from 'lucide-vue-next'

import { ToggleGroup, ToggleGroupItem } from '@/registry/default/ui/toggle-group'
</script>

<template>
  <ToggleGroup type="multiple" variant="outline">
    <ToggleGroupItem value="bold" aria-label="Toggle bold">
      <Bold class="h-4 w-4" />
    </ToggleGroupItem>
    <ToggleGroupItem value="italic" aria-label="Toggle italic">
      <Italic class="h-4 w-4" />
    </ToggleGroupItem>
    <ToggleGroupItem value="underline" aria-label="Toggle underline">
      <Underline class="h-4 w-4" />
    </ToggleGroupItem>
  </ToggleGroup>
</template>
