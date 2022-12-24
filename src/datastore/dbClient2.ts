import { data, tasks, users } from './dataDB2';
import type { DB2Record } from './types';
import type { SomeRequired, Task, User } from '../types';
import { UserError } from '../utilMiddleware/errorHandler';
import { ROLES } from '../constants';

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
  getUserById: (id: string): User | null => {
    return users[id as keyof typeof users] || null;
  },
  creteUser: (user: SomeRequired<User, 'name'>): User => {
    if (user.id && dbClient2.getUserById(user.id.toString())) {
      throw new UserError(`dbClient2: user already exists: ${user.id}`);
    }
    const id = Object.keys(users).length + 1;
    const newUser = { ...user, role: ROLES.user, id };
    users[id.toString()] = newUser;
    return newUser;
  },
};
