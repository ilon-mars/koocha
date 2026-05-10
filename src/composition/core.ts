import { createInjector } from 'typed-inject'

import { TOKENS } from './tokens'

import { TaskService } from '@/app/task.service'
import { MemoryTaskRepository } from '@/adapters/memory/task-repository.memory'

export const injector = createInjector()
  .provideClass(TOKENS.taskRepository, MemoryTaskRepository)
  .provideClass(TOKENS.taskService, TaskService)
