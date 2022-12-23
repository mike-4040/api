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

export const ROLES = {
  admin: 'admin',
  user: 'user',
  guest: 'guest',
} as const;

export const VALID_ROLES = Object.values(ROLES);

export const PERMISSIONS = {
  taskRead: 'taskRead',
  taskUpdate: 'taskUpdate',
  taskDelete: 'taskDelete',
  taskCreate: 'taskCreate',
} as const;

export const VALID_PERMISSIONS = Object.values(PERMISSIONS);

export const PERMISSIONS_BY_ROLE = {
  [ROLES.admin]: [
    PERMISSIONS.taskRead,
    PERMISSIONS.taskUpdate,
    PERMISSIONS.taskDelete,
    PERMISSIONS.taskCreate,
  ],
  [ROLES.user]: [
    PERMISSIONS.taskRead,
    PERMISSIONS.taskUpdate,
    PERMISSIONS.taskCreate,
  ],
  [ROLES.guest]: [PERMISSIONS.taskRead],
} as const;
