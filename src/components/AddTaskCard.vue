<script setup lang="ts">
import { ref } from 'vue';
import { CreateTaskSchema, type CreateTaskDto } from '@/domain/task';

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
    <input v-model="title" placeholder="Название" type="text" />
    <input v-model="description" placeholder="Описание" type="text" />

    <span>дата</span>

    <ul v-if="errors.length">
      <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
    </ul>

    <button @click="onSubmit">Создать</button>
  </form>
</template>

<style module>
.wrapper {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  gap: 10px;
}
</style>
