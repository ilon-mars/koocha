<script setup lang="ts">
import type { Task } from '@/domain/task';
import { ref } from 'vue';

const title = ref('');
const description = ref('');

const emit = defineEmits<{
  submit: [task: Pick<Task, 'title' | 'description'>];
}>();

const onSubmit = (e: Event) => {
  e.preventDefault();

  emit('submit', { title: title.value, description: description.value });
};
</script>

<template>
  <form :class="$style.wrapper" @submit="onSubmit">
    <input v-model="title" placeholder="Название" type="text" />
    <input v-model="description" placeholder="Описание" type="text" />

    <span>дата</span>

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
