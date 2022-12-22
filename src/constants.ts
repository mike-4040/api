export const CONFIG = {
  port: 3000,
} as const;

export const TASK_STATUSES = {
  new: 'new',
  inProgress: 'in-progress',
  completed: 'completed',
} as const;

export const VALID_TASK_STATUSES = Object.values(TASK_STATUSES);

export const TASK_EVENTS = {
  taskUpdate: 'taskUpdate',
} as const;