<script setup lang="ts">
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  XCircle,
} from 'lucide-vue-next'
import { type Component, ref } from 'vue'

import { cn } from '@/lib/utils'
import { Button } from '@/registry/default/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/registry/default/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/registry/default/ui/popover'

interface Status {
  value: string
  label: string
  icon: Component
}

const statuses: Status[] = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: HelpCircle,
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: Circle,
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: ArrowUpCircle,
  },
  {
    value: 'done',
    label: 'Done',
    icon: CheckCircle2,
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: XCircle,
  },
]

const open = ref(false)
// const value = ref<typeof statuses[number]>()

const selectedStatus = ref<Status>()
</script>

<template>
  <div class="flex items-center space-x-4">
    <p class="text-sm text-muted-foreground">
      Status
    </p>
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          size="sm"
          class="w-[150px] justify-start"
        >
          <template v-if="selectedStatus">
            <component :is="selectedStatus?.icon" class="mr-2 h-4 w-4 shrink-0" />
            {{ selectedStatus?.label }}
          </template>
          <template v-else>
            + Set status
          </template>
        </Button>
      </PopoverTrigger>
      <PopoverContent class="p-0" side="right" align="start">
        <Command>
          <CommandInput placeholder="Change status..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                v-for="status in statuses"
                :key="status.value"
                :value="status.value"
                @select="(value) => {
                  selectedStatus = status
                  open = false
                }"
              >
                <component
                  :is="status.icon"
                  :key="status.value"
                  :class="cn('mr-2 h-4 w-4', status.value === selectedStatus?.value ? 'opacity-100' : 'opacity-40',
                  )"
                />
                <span>{{ status.label }}</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template>
