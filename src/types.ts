import { Request } from 'express';
import { VALID_TASK_STATUSES, VALID_ROLES } from './constants';

export interface Task {
  id: string;
  name: string;
  status: typeof VALID_TASK_STATUSES[number];
  wasCompleted?: boolean; // utility field, to track the Task status was completed at least once
}

export interface User {
  id: number; // likely something like a UUID
  name: string;
  role: typeof VALID_ROLES[number];
}

export type AuthUser = Pick<User, 'id' | 'role'>;

export type SomeRequired<T, K extends keyof T> = Partial<T> &
  Required<Pick<T, K>>;

export interface AuthedRequest extends Request {
  user?: AuthUser;
}
