import { data } from './dataDB2';
import { DB2Record } from './types';

export const dbClient2 = {
  getRecord: (id: string): DB2Record | null => {
    return data[id as keyof typeof data] || null;
  },
};
