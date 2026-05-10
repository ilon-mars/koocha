import { defineStore } from 'pinia'
import { ref } from 'vue'

import { injector } from '@/composition/core'
import { TOKENS } from '@/composition'
import type { Task } from '@/domain/task'

export const useTaskStore = defineStore('tasks', () => {
  const taskService = injector.resolve(TOKENS.taskService)

  const tasks = ref<Task[]>([])
  const isLoading = ref(false)

  async function loadTasks() {
    isLoading.value = true

    tasks.value = await taskService.getTasks()

    isLoading.value = false
  }

  async function createTask(title: string) {
    await taskService.createTask(title)
    await loadTasks()
  }

  // async function deleteTask(id: string) {
  //   await taskService.deleteTask(id)
  //   await loadTasks()
  // }

  return {
    tasks,
    isLoading,
    loadTasks,
    createTask,
    // deleteTask,
  }
})
