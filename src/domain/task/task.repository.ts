import type { Task, TaskId } from './task.interface'

export interface TaskRepository {
  getAll(): Promise<Task[]>

  save(task: Task): Promise<void>

  delete(id: TaskId): Promise<void>
}
