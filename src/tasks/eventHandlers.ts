import { TASK_STATUSES, VALID_TASK_STATUSES } from '../constants';
import { dbClient } from '../datastore/dbClient';
import type { Task } from '../types';

export function taskUpdateHandler(id: string, taskUpdate: Partial<Task>) {
  const task = dbClient.getTaskById(id);
  if (!task) {
    console.log(`taskUpdateHandler: task not found: ${id}`);
    return;
  }

  const { name, status } = taskUpdate;

  if (!VALID_TASK_STATUSES.includes(status as any)) {
    console.log(`taskUpdateHandler: invalid status: ${status}`);
    return;
  }

  const { wasCompleted, name: oldName, status: oldStatus } = task;

  const finalTaskUpdate: Partial<Task> = {};

  let somethingChanged = false;
  if (status && status !== oldStatus) {
    if (status === TASK_STATUSES.completed && !wasCompleted) {
      finalTaskUpdate.status = status;
      finalTaskUpdate.wasCompleted = true;
      somethingChanged = true;
    } else if (status !== TASK_STATUSES.completed) {
      finalTaskUpdate.status = status;
      somethingChanged = true;
    }
  }

  if (name && name !== oldName) {
    finalTaskUpdate.name = name;
    somethingChanged = true;
  }

  if (!somethingChanged) {
    console.log(`taskUpdateHandler: nothing changed for task: ${id}`);
    return;
  }

  const success = dbClient.updateTask(id, finalTaskUpdate);
  console.log(`taskUpdateHandler: task updated: ${id}, success: ${success}`);
}
