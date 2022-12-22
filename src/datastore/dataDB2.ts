import { Task } from '../types';

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
