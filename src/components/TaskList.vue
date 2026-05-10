<script lang="ts" setup>
import type { Task } from '@/domain/task';

interface Props {
  title?: string;
  tasks: Task[];
}

withDefaults(defineProps<Props>(), {
  title: '',
});
</script>

<template>
  <div :class="$style.wrapper">
    <h2 class="listTitle" :class="$style.title">{{ title }}</h2>

    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.title }}
      </li>
    </ul>
  </div>
</template>

<style module>
.wrapper {
  display: flex;
  flex-direction: column;
}

.title {
  margin-bottom: 10px;
}
</style>
