<script setup lang="ts">
import { ref } from 'vue';
import { UIInput } from '@/components/ui/input';
import { UIButton } from '@/components/ui/button';
import { CreateTaskSchema, type CreateTaskDto } from '@/domain/task';
import DueDatePicker from './DueDatePicker.vue';
import PrioritySelect from './PrioritySelect.vue';

const title = ref('');
const description = ref('');

const errors = ref<string[]>([]);

const emit = defineEmits<{
  submit: [task: CreateTaskDto];
}>();

const onSubmit = (e: Event) => {
  e.preventDefault();

  errors.value = [];

  const result = CreateTaskSchema.safeParse({
    title: title.value,
    description: description.value,
  });

  if (!result.success) {
    result.error.issues.forEach((issue) => errors.value.push(issue.message));

    return;
  }

  emit('submit', result.data);
};
</script>

<template>
  <form :class="$style.wrapper" @submit="onSubmit">
    <UIInput v-model="title" placeholder="Название" type="text" />
    <UIInput v-model="description" placeholder="Описание" type="text" />

    <DueDatePicker />
    <PrioritySelect />

    <ul v-if="errors.length">
      <li v-for="(error, i) in errors" :key="i" :class="$style.error">{{ error }}</li>
    </ul>

    <UIButton variant="ghost" @click="onSubmit">Создать</UIButton>
  </form>
</template>

<style module>
.wrapper {
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
}

.error {
  color: var(--color-destructive);
}
</style>
