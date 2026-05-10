<script setup lang="ts">
import { ref, type Ref } from 'vue';
import type { DateValue } from '@internationalized/date';
import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date';
import { CalendarIcon } from 'lucide-vue-next';
import { cn } from '@/lib/utils';
import { UICalendar } from '@/components/ui/calendar';
import { UIPopover, UIPopoverContent, UIPopoverTrigger } from '@/components/ui/popover';
import UIButton from '@/components/ui/button/UIButton.vue';

const defaultPlaceholder = today(getLocalTimeZone());
const date = ref() as Ref<DateValue>;

const df = new DateFormatter('ru-RU', {
  dateStyle: 'short',
});
</script>

<template>
  <UIPopover v-slot="{ close }">
    <UIPopoverTrigger as-child>
      <UIButton
        variant="outline"
        :class="
          cn('w-[140px] justify-start text-left font-normal', !date && 'text-muted-foreground')
        "
      >
        <CalendarIcon />
        {{ date ? df.format(date.toDate(getLocalTimeZone())) : 'Дедлайн' }}
      </UIButton>
    </UIPopoverTrigger>

    <UIPopoverContent class="w-auto p-0" align="start">
      <UICalendar
        v-model="date"
        :default-placeholder="defaultPlaceholder"
        layout="month-and-year"
        initial-focus
        @update:model-value="close"
      />
    </UIPopoverContent>
  </UIPopover>
</template>
