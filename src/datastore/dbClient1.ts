import { data } from './dataDB1';
import { DB1Record } from './types';

// in real life this would be a class, cause it will require initialization
export const dbClient1 = {
  getRecord: (id: string): DB1Record | null => {
    return data[id as keyof typeof data] || null;
  }
}