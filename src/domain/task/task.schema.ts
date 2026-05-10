import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.string(),

  title: z.string().trim().min(1),

  description: z.string().optional(),

  completed: z.boolean(),

  createdAt: z.coerce.date(),

  updatedAt: z.coerce.date().optional(),

  dueDate: z.coerce.date().optional(),

  priority: z.enum(['low', 'medium', 'high']).optional(),
});

export const CreateTaskSchema = TaskSchema.pick({
  title: true,
  description: true,
  dueDate: true,
  priority: true,
});

export type CreateTaskDto = z.infer<typeof CreateTaskSchema>;
