import { dbClient1 } from './dbClient1';
import { dbClient2 } from './dbClient2';
import { fromDb1, fromDb2 } from './transformers';
import type { DBRecord } from './types';
import type { Task } from '../types';

type UserCreate = Parameters<typeof dbClient2.creteUser>[0];

export const dbClient = {
  getRecordById: (id: string): DBRecord | undefined => {
    // !Assumption: database 2 is preferred ( migrating from db1 to db2)
    const db2Record = dbClient2.getRecord(id);
    if (db2Record) {
      // we need some kind of logging here to track out migration progress
      console.log('db2 record found');
      return fromDb2(db2Record);
    }

    const db1Record = dbClient1.getRecord(id);
    if (db1Record) {
      console.log('db1 record found');
      return fromDb1(db1Record);
    }

    return undefined;
  },

  getTaskById: (id: string): Task | null => dbClient2.getTaskById(id),

  updateTask: (id: string, taskUpdate: Partial<Task>) =>
    dbClient2.updateTask(id, taskUpdate),

  getUserById: (id: string) => dbClient2.getUserById(id),
  creteUser: (user: UserCreate) => dbClient2.creteUser(user),
};
