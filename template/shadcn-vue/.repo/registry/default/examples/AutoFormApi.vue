<script setup lang="ts">
import { h, onMounted, shallowRef } from 'vue'
import * as z from 'zod'
import { AutoForm } from '@/registry/default/ui/auto-form'
import { Button } from '@/registry/default/ui/button'
import { toast } from '@/registry/default/ui/toast'

const schema = shallowRef<z.ZodObject<any, any, any> | null>(null)

onMounted(() => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then((data) => {
      schema.value = z.object({
        user: z.enum(data.map((user: any) => user.name)),
      })
    })
})

function onSubmit(values: Record<string, any>) {
  toast({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  })
}
</script>

<template>
  <div class="flex justify-center w-full">
    <AutoForm
      v-if="schema"
      class="w-2/3 space-y-6"
      :schema="schema"
      @submit="onSubmit"
    >
      <Button type="submit">
        Submit
      </Button>
    </AutoForm>

    <div v-else>
      Loading...
    </div>
  </div>
</template>
