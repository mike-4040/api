import { VALID_TASK_STATUSES } from './constants';

export interface Task {
  id: string;
  name: string;
  status: typeof VALID_TASK_STATUSES[number];
  wasCompleted?: boolean; // utility field, to track the Task status was completed at least once
}
