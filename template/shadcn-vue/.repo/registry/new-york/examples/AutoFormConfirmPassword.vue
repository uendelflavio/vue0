<script setup lang="ts">
import { h } from 'vue'
import * as z from 'zod'
import { AutoForm } from '@/registry/new-york/ui/auto-form'
import { Button } from '@/registry/new-york/ui/button'
import { toast } from '@/registry/new-york/ui/toast'

const schema = z
  .object({
    password: z.string(),
    confirm: z.string(),
  })
  .refine(data => data.password === data.confirm, {
    message: 'Passwords must match.',
    path: ['confirm'],
  })

function onSubmit(values: Record<string, any>) {
  toast({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  })
}
</script>

<template>
  <AutoForm
    class="w-2/3 space-y-6"
    :schema="schema"
    @submit="onSubmit"
  >
    <Button type="submit">
      Submit
    </Button>
  </AutoForm>
</template>
