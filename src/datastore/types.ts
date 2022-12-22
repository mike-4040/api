export interface DB1Record {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  state: string;
}

export interface DB2Record {
  id: string;
  customer: {
    firstName: string;
    lastName: string;
  };
  age: number;
  location: {
    city: string;
    state: string;
  };
}

export interface DBRecord {
  id: string;
  customer: {
    firstName: string;
    lastName: string;
    age: number;
  };
  location: {
    city: string;
    state: string;
  };
}
