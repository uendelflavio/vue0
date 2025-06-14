<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import type { Calendar } from 'v-calendar'
import { DatePicker } from 'v-calendar'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-icons/vue'
import { computed, nextTick, onMounted, ref } from 'vue'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utils'

/* Extracted from v-calendar */
type DatePickerModel = DatePickerDate | DatePickerRangeObject
type DateSource = Date | string | number
type DatePickerDate = DateSource | Partial<SimpleDateParts> | null
interface DatePickerRangeObject {
  start: Exclude<DatePickerDate, null>
  end: Exclude<DatePickerDate, null>
}
interface SimpleDateParts {
  year: number
  month: number
  day: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

defineOptions({
  inheritAttrs: false,
})
const props = withDefaults(defineProps< {
  modelValue?: string | number | Date | DatePickerModel
  modelModifiers?: object
  columns?: number
  type?: 'single' | 'range'
}>(), {
  type: 'single',
  columns: 1,
})
const emits = defineEmits<{
  (e: 'update:modelValue', payload: typeof props.modelValue): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
})

const datePicker = ref<InstanceType<typeof DatePicker>>()
// @ts-expect-error in this current version of v-calendar has the calendaRef instance, which is required to handle arrow nav.
const calendarRef = computed<InstanceType<typeof Calendar>>(() => datePicker.value.calendarRef)

function handleNav(direction: 'prev' | 'next') {
  if (!calendarRef.value)
    return

  if (direction === 'prev')
    calendarRef.value.movePrev()
  else calendarRef.value.moveNext()
}

onMounted(async () => {
  await nextTick()
  if (modelValue.value instanceof Date && calendarRef.value)
    calendarRef.value.focusDate(modelValue.value)
})
</script>

<template>
  <div class="relative">
    <div class="absolute flex justify-between w-full px-4 top-3 z-[1]">
      <button :class="cn(buttonVariants({ variant: 'outline' }), 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100')" @click="handleNav('prev')">
        <ChevronLeftIcon class="w-4 h-4" />
      </button>
      <button :class="cn(buttonVariants({ variant: 'outline' }), 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100')" @click="handleNav('next')">
        <ChevronRightIcon class="w-4 h-4" />
      </button>
    </div>

    <DatePicker
      ref="datePicker"
      v-bind="$attrs"
      v-model="modelValue"
      :model-modifiers="modelModifiers"
      class="calendar"
      trim-weeks
      transition="none"
      :columns="columns"
    />
  </div>
</template>

<style lang="postcss">
.calendar {
  @apply p-3 text-center;
}
.calendar .vc-pane-layout {
  @apply grid gap-4;
}
.calendar .vc-title {
  @apply text-sm font-medium pointer-events-none;
}
.calendar .vc-pane-header-wrapper {
  @apply hidden;
}
.calendar .vc-weeks {
  @apply mt-4;
}
.calendar .vc-weekdays {
  @apply flex;
}
.calendar .vc-weekday {
  @apply text-muted-foreground rounded-md w-8 font-normal text-[0.8rem];
}
.calendar .vc-weeks {
  @apply w-full space-y-2 flex flex-col [&>_div]:grid [&>_div]:grid-cols-7;
}
.calendar .vc-day:has(.vc-highlights) {
  @apply bg-accent first:rounded-l-md last:rounded-r-md overflow-hidden;
}
.calendar .vc-day-content  {
  @apply text-center text-sm p-0 relative focus-within:relative focus-within:z-20 inline-flex items-center justify-center ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-8 w-8 font-normal aria-selected:opacity-100 select-none;
}
.calendar .vc-day-content:not(.vc-highlight-content-light) {
  @apply rounded-md;
}
.calendar .is-not-in-month:not(:has(.vc-highlight-content-solid)):not(:has(.vc-highlight-content-light)):not(:has(.vc-highlight-content-outline)),
.calendar .vc-disabled {
  @apply text-muted-foreground opacity-50;
}
.calendar .vc-highlight-content-solid, .calendar .vc-highlight-content-outline {
  @apply bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground;
}
.calendar .vc-highlight-content-light {
  @apply bg-accent text-accent-foreground;
}
.calendar .vc-pane-container.in-transition {
  @apply overflow-hidden;
}
.calendar .vc-pane-container {
  @apply w-full relative;
}
:root {
	--vc-slide-translate: 22px;
	--vc-slide-duration: 0.15s;
	--vc-slide-timing: ease;
}

.calendar .vc-fade-enter-active,
.calendar .vc-fade-leave-active,
.calendar .vc-slide-left-enter-active,
.calendar .vc-slide-left-leave-active,
.calendar .vc-slide-right-enter-active,
.calendar .vc-slide-right-leave-active,
.calendar .vc-slide-up-enter-active,
.calendar .vc-slide-up-leave-active,
.calendar .vc-slide-down-enter-active,
.calendar .vc-slide-down-leave-active,
.calendar .vc-slide-fade-enter-active,
.calendar .vc-slide-fade-leave-active {
	transition:
		opacity var(--vc-slide-duration) var(--vc-slide-timing),
		-webkit-transform var(--vc-slide-duration) var(--vc-slide-timing);
	transition:
		transform var(--vc-slide-duration) var(--vc-slide-timing),
		opacity var(--vc-slide-duration) var(--vc-slide-timing);
	transition:
		transform var(--vc-slide-duration) var(--vc-slide-timing),
		opacity var(--vc-slide-duration) var(--vc-slide-timing),
		-webkit-transform var(--vc-slide-duration) var(--vc-slide-timing);
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
	pointer-events: none;
}

.calendar .vc-none-leave-active,
.calendar .vc-fade-leave-active,
.calendar .vc-slide-left-leave-active,
.calendar .vc-slide-right-leave-active,
.calendar .vc-slide-up-leave-active,
.calendar .vc-slide-down-leave-active {
	position: absolute !important;
	width: 100%;
}

.calendar .vc-none-enter-from,
.calendar .vc-none-leave-to,
.calendar .vc-fade-enter-from,
.calendar .vc-fade-leave-to,
.calendar .vc-slide-left-enter-from,
.calendar .vc-slide-left-leave-to,
.calendar .vc-slide-right-enter-from,
.calendar .vc-slide-right-leave-to,
.calendar .vc-slide-up-enter-from,
.calendar .vc-slide-up-leave-to,
.calendar .vc-slide-down-enter-from,
.calendar .vc-slide-down-leave-to,
.calendar .vc-slide-fade-enter-from,
.calendar .vc-slide-fade-leave-to {
	opacity: 0;
}

.calendar .vc-slide-left-enter-from,
.calendar .vc-slide-right-leave-to,
.calendar .vc-slide-fade-enter-from.direction-left,
.calendar .vc-slide-fade-leave-to.direction-left {
	-webkit-transform: translateX(var(--vc-slide-translate));
	transform: translateX(var(--vc-slide-translate));
}

.calendar .vc-slide-right-enter-from,
.calendar .vc-slide-left-leave-to,
.calendar .vc-slide-fade-enter-from.direction-right,
.calendar .vc-slide-fade-leave-to.direction-right {
	-webkit-transform: translateX(calc(-1 * var(--vc-slide-translate)));
	transform: translateX(calc(-1 * var(--vc-slide-translate)));
}

.calendar .vc-slide-up-enter-from,
.calendar .vc-slide-down-leave-to,
.calendar .vc-slide-fade-enter-from.direction-top,
.calendar .vc-slide-fade-leave-to.direction-top {
	-webkit-transform: translateY(var(--vc-slide-translate));
	transform: translateY(var(--vc-slide-translate));
}

.calendar .vc-slide-down-enter-from,
.calendar .vc-slide-up-leave-to,
.calendar .vc-slide-fade-enter-from.direction-bottom,
.calendar .vc-slide-fade-leave-to.direction-bottom {
	-webkit-transform: translateY(calc(-1 * var(--vc-slide-translate)));
	transform: translateY(calc(-1 * var(--vc-slide-translate)));
}
</style>
