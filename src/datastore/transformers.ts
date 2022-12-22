import { DB1Record, DB2Record, DBRecord } from './types';

export const fromDb1 = (record: DB1Record): DBRecord => {
  return {
    id: record.id,
    customer: {
      firstName: record.firstName,
      lastName: record.lastName,
      age: record.age,
    },
    location: {
      city: record.city,
      state: record.state,
    },
  };
};

export const fromDb2 = (record: DB2Record): DBRecord => {
  return {
    id: record.id,
    customer: {
      firstName: record.customer.firstName,
      lastName: record.customer.lastName,
      age: record.age,
    },
    location: {
      city: record.location.city,
      state: record.location.state,
    },
  };
};
