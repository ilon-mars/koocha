<script setup lang="ts">
import { UIDrawer, UIDrawerContent } from '@/components/ui/drawer';
import AddTaskForm from '@/components/AddTaskForm.vue';
import type { CreateTaskDto } from '@/domain/task';

const emit = defineEmits<{
  addTask: [task: CreateTaskDto];
}>();

const onSubmit = (task: CreateTaskDto) => {
  emit('addTask', task);
};
</script>

<template>
  <UIDrawer>
    <UIDrawerContent class="justify-center items-center">
      <div class="w-full max-w-sm">
        <AddTaskForm @submit="onSubmit" />
      </div>
    </UIDrawerContent>
  </UIDrawer>
</template>
