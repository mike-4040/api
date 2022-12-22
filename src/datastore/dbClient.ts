import { dbClient1 } from './dbClient1';
import { dbClient2 } from './dbClient2';
import { fromDb1, fromDb2 } from './transformers';
import { DBRecord } from './types';

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
};
