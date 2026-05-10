<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { format, isSameDay } from 'date-fns';
import TaskList from '@/components/TaskList.vue';
import { useTaskStore } from '@/stores/tasks';
import AddTaskBtn from '@/components/AddTaskBtn.vue';
import type { CreateTaskDto } from '@/domain/task';
import AddTaskDrawer from '@/components/AddTaskDrawer.vue';

const store = useTaskStore();

const isTaskCardVisible = ref(false);
const todayDate = format(new Date(), 'dd.MM.yyyy');

const unassignedTasks = computed(() => store.tasks.filter((task) => !task.dueDate));

const todayTasks = computed(() =>
  store.tasks.filter((task) => task.dueDate && isSameDay(task.dueDate, new Date())),
);

const toggleTaskCard = () => {
  isTaskCardVisible.value = !isTaskCardVisible.value;
};

const addTask = async (payload: CreateTaskDto) => {
  await store.createTask(payload);
  isTaskCardVisible.value = false;
};

onMounted(() => {
  store.loadTasks();
});
</script>

<template>
  <div :class="$style.wrapper">
    <TaskList title="Куча" :tasks="unassignedTasks" />
    <TaskList :title="todayDate" :tasks="todayTasks" />

    <AddTaskBtn :class="$style.addBtn" @click="toggleTaskCard" />
    <AddTaskDrawer v-model:open="isTaskCardVisible" @addTask="addTask" />
  </div>
</template>

<style module>
.wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 2px;
    background-color: var(--color-border);
    height: 90%;
    top: 50%;
    left: 50%;
    transform: translate(50%, -50%);
  }
}

.addBtn {
  position: fixed;
  width: 100px;
  height: 40px;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
</style>
