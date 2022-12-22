import { data, tasks } from './dataDB2';
import type { DB2Record } from './types';
import type { Task } from '../types';

export const dbClient2 = {
  getRecord: (id: string): DB2Record | null => {
    return data[id as keyof typeof data] || null;
  },
  getTaskById: (id: string): Task | null => {
    return tasks[id as keyof typeof tasks] || null;
  },
  updateTask: (id: string, taskUpdate: Partial<Task>): boolean => {
    const task = dbClient2.getTaskById(id);
    if (!task) {
      console.log(`dbClient2: task not found: ${id}`);
      return false;
    }

    const updatedTask = { ...task, ...taskUpdate };
    tasks[id as keyof typeof tasks] = updatedTask;
    return true;
  },
};
