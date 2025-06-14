<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { h } from 'vue'
import * as z from 'zod'

import { Button } from '@/registry/new-york/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/registry/new-york/ui/form'
import { Slider } from '@/registry/new-york/ui/slider'
import { toast } from '@/registry/new-york/ui/toast'

const formSchema = toTypedSchema(z.object({
  duration: z.array(
    z.number().min(0).max(60),
  ),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    duration: [30],
  },
})

const onSubmit = handleSubmit((values) => {
  toast({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  })
})
</script>

<template>
  <form class="w-2/3 space-y-6" @submit="onSubmit">
    <FormField v-slot="{ componentField, value }" name="duration">
      <FormItem>
        <FormLabel>Duration</FormLabel>
        <FormControl>
          <Slider
            :model-value="componentField.modelValue"
            :default-value="[30]"
            :max="100"
            :min="0"
            :step="5"
            :name="componentField.name"
            @update:model-value="componentField['onUpdate:modelValue']"
          />
          <FormDescription class="flex justify-between">
            <span>How many minutes are you available?</span>
            <span>{{ value?.[0] }} min</span>
          </FormDescription>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit">
      Submit
    </Button>
  </form>
</template>
