<script lang="ts" setup>
import type { CalendarRootEmits, CalendarRootProps, DateValue } from 'reka-ui';
import type { HTMLAttributes, Ref } from 'vue';
import type { LayoutTypes } from '.';
import { getLocalTimeZone, today } from '@internationalized/date';
import { createReusableTemplate, reactiveOmit, useVModel } from '@vueuse/core';
import { CalendarRoot, useDateFormatter, useForwardPropsEmits } from 'reka-ui';
import { createYear, createYearRange, toDate } from 'reka-ui/date';
import { computed, toRaw } from 'vue';
import { cn } from '@/lib/utils';
import { UINativeSelect, UINativeSelectOption } from '@/components/ui/native-select';
import {
  UICalendarCell,
  UICalendarCellTrigger,
  UICalendarGrid,
  UICalendarGridBody,
  UICalendarGridHead,
  UICalendarGridRow,
  UICalendarHeadCell,
  UICalendarHeader,
  UICalendarHeading,
  UICalendarNextButton,
  UICalendarPrevButton,
} from '.';

const props = withDefaults(
  defineProps<
    CalendarRootProps & {
      class?: HTMLAttributes['class'];
      layout?: LayoutTypes;
      yearRange?: DateValue[];
    }
  >(),
  {
    modelValue: undefined,
    layout: undefined,
  },
);
const emits = defineEmits<CalendarRootEmits>();

const delegatedProps = reactiveOmit(props, 'class', 'layout', 'placeholder');

const placeholder = useVModel(props, 'placeholder', emits, {
  passive: true,
  defaultValue: props.defaultPlaceholder ?? today(getLocalTimeZone()),
}) as Ref<DateValue>;

const formatter = useDateFormatter(props.locale ?? 'en');

const yearRange = computed(() => {
  return (
    props.yearRange ??
    createYearRange({
      start:
        props?.minValue ??
        (toRaw(props.placeholder) ?? props.defaultPlaceholder ?? today(getLocalTimeZone())).cycle(
          'year',
          -100,
        ),

      end:
        props?.maxValue ??
        (toRaw(props.placeholder) ?? props.defaultPlaceholder ?? today(getLocalTimeZone())).cycle(
          'year',
          10,
        ),
    })
  );
});

const [DefineMonthTemplate, ReuseMonthTemplate] = createReusableTemplate<{ date: DateValue }>();
const [DefineYearTemplate, ReuseYearTemplate] = createReusableTemplate<{ date: DateValue }>();

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DefineMonthTemplate v-slot="{ date }">
    <div class="**:data-[slot=native-select-icon]:right-1">
      <div class="relative">
        <div class="absolute inset-0 flex h-full items-center text-sm pl-2 pointer-events-none">
          {{ formatter.custom(toDate(date), { month: 'short' }) }}
        </div>
        <UINativeSelect
          class="text-xs h-8 pr-6 pl-2 text-transparent relative"
          :model-value="date.month"
          @change="
            (e: Event) => {
              placeholder = placeholder.set({
                month: Number((e?.target as any)?.value),
              });
            }
          "
        >
          <UINativeSelectOption
            v-for="month in createYear({ dateObj: date })"
            :key="month.toString()"
            :value="month.month"
            :selected="date.month === month.month"
          >
            {{ formatter.custom(toDate(month), { month: 'short' }) }}
          </UINativeSelectOption>
        </UINativeSelect>
      </div>
    </div>
  </DefineMonthTemplate>

  <DefineYearTemplate v-slot="{ date }">
    <div class="**:data-[slot=native-select-icon]:right-1">
      <div class="relative">
        <div class="absolute inset-0 flex h-full items-center text-sm pl-2 pointer-events-none">
          {{ formatter.custom(toDate(date), { year: 'numeric' }) }}
        </div>
        <UINativeSelect
          class="text-xs h-8 pr-6 pl-2 text-transparent relative"
          :model-value="date.year"
          @change="
            (e: Event) => {
              placeholder = placeholder.set({
                year: Number((e?.target as any)?.value),
              });
            }
          "
        >
          <UINativeSelectOption
            v-for="year in yearRange"
            :key="year.toString()"
            :value="year.year"
            :selected="date.year === year.year"
          >
            {{ formatter.custom(toDate(year), { year: 'numeric' }) }}
          </UINativeSelectOption>
        </UINativeSelect>
      </div>
    </div>
  </DefineYearTemplate>

  <CalendarRoot
    v-slot="{ grid, weekDays, date }"
    v-bind="forwarded"
    v-model:placeholder="placeholder"
    data-slot="calendar"
    :class="cn('p-3', props.class)"
  >
    <UICalendarHeader class="pt-0">
      <nav class="flex items-center gap-1 absolute top-0 inset-x-0 justify-between">
        <UICalendarPrevButton>
          <slot name="calendar-prev-icon" />
        </UICalendarPrevButton>
        <UICalendarNextButton>
          <slot name="calendar-next-icon" />
        </UICalendarNextButton>
      </nav>

      <slot
        name="calendar-heading"
        :date="date"
        :month="ReuseMonthTemplate"
        :year="ReuseYearTemplate"
      >
        <template v-if="layout === 'month-and-year'">
          <div class="flex items-center justify-center gap-1">
            <ReuseMonthTemplate :date="date" />
            <ReuseYearTemplate :date="date" />
          </div>
        </template>
        <template v-else-if="layout === 'month-only'">
          <div class="flex items-center justify-center gap-1">
            <ReuseMonthTemplate :date="date" />
            {{ formatter.custom(toDate(date), { year: 'numeric' }) }}
          </div>
        </template>
        <template v-else-if="layout === 'year-only'">
          <div class="flex items-center justify-center gap-1">
            {{ formatter.custom(toDate(date), { month: 'short' }) }}
            <ReuseYearTemplate :date="date" />
          </div>
        </template>
        <template v-else>
          <UICalendarHeading />
        </template>
      </slot>
    </UICalendarHeader>

    <div class="flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
      <UICalendarGrid v-for="month in grid" :key="month.value.toString()">
        <UICalendarGridHead>
          <UICalendarGridRow>
            <UICalendarHeadCell v-for="day in weekDays" :key="day">
              {{ day }}
            </UICalendarHeadCell>
          </UICalendarGridRow>
        </UICalendarGridHead>
        <UICalendarGridBody>
          <UICalendarGridRow
            v-for="(weekDates, index) in month.rows"
            :key="`weekDate-${index}`"
            class="mt-2 w-full"
          >
            <UICalendarCell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
            >
              <UICalendarCellTrigger :day="weekDate" :month="month.value" />
            </UICalendarCell>
          </UICalendarGridRow>
        </UICalendarGridBody>
      </UICalendarGrid>
    </div>
  </CalendarRoot>
</template>
