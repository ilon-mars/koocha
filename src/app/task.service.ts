import { TOKENS } from '@/composition'
import type { Task, TaskRepository } from '@/domain/task'

export class TaskService {
  static readonly inject = [TOKENS.taskRepository] as const

  constructor(
    private readonly repository: TaskRepository,
  ) { }

  async createTask(title: string) {
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date(),
    }

    await this.repository.save(task)

    return task
  }

  async getTasks() {
    return this.repository.getAll()
  }
}
