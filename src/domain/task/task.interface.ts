export type TaskId = string

export interface Task {
  id: TaskId
  title: string
  description?: string

  completed: boolean

  createdAt: Date
  updatedAt?: Date

  dueDate?: Date
  priority?: 'low' | 'medium' | 'high'
}
