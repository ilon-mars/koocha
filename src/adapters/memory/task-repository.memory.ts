import type { Task, TaskRepository } from '@/domain/task'

export class MemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = []

  async getAll(): Promise<Task[]> {
    return [...this.tasks]
  }

  async save(task: Task): Promise<void> {
    const index = this.tasks.findIndex(t => t.id === task.id)

    if (index >= 0) {
      this.tasks[index] = task
      return
    }

    this.tasks.push(task)
  }

  async delete(id: string): Promise<void> {
    this.tasks = this.tasks.filter(t => t.id !== id)
  }
}
