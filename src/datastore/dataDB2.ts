import { Task, User } from '../types';

export const data = {
  '2': {
    id: '2',
    customer: {
      firstName: 'Tim',
      lastName: 'Green',
    },
    age: 42,
    location: {
      city: 'San Francisco',
      state: 'CA',
    },
  },

  '4': {
    id: '4',
    customer: {
      firstName: 'Tim',
      lastName: 'Green',
    },
    age: 33,
    location: {
      city: 'San Francisco',
      state: 'CA',
    },
  },
};

export const tasks: Record<string, Task> = {
  '1': {
    id: '1',
    name: 'Task 1',
    status: 'new',
  },
  '2': {
    id: '2',
    name: 'Task 2',
    status: 'in-progress',
  },
};

export const users: Record<string, User> = {
  '1': {
    id: 1,
    name: 'Tim Green',
    role: 'admin',
  },
  '2': {
    id: 2,
    name: 'John Doe',
    role: 'user',
  },
  '3': {
    id: 3,
    name: 'Nobody Know',
    role: 'guest',
  },
};
