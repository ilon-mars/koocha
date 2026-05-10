import { TOKENS } from '@/composition';
import {
  CreateTaskSchema,
  type CreateTaskDto,
  type Task,
  type TaskRepository,
} from '@/domain/task';

export class TaskService {
  static readonly inject = [TOKENS.taskRepository] as const;

  constructor(private readonly repository: TaskRepository) {}

  async createTask(payload: CreateTaskDto) {
    const validated = CreateTaskSchema.parse(payload);

    const task: Task = {
      id: crypto.randomUUID(),
      title: validated.title,
      description: validated.description,
      dueDate: validated.dueDate,
      priority: validated.priority,
      completed: false,
      createdAt: new Date(),
    };

    await this.repository.save(task);

    return task;
  }

  async getTasks() {
    return this.repository.getAll();
  }
}
