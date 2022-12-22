import type { Request, Response } from 'express';

import { dbClient } from '../datastore/dbClient';
import type { Task } from '../types';
import { taskEvents } from '../tasks/events';
import { TASK_EVENTS } from '../constants';

export function getTask(req: Request, res: Response) {
  const { id } = req.params;

  const task = dbClient.getTaskById(id);
  if (!task) {
    res.status(404).send({ success: false, message: 'Record not found' });
    return;
  }

  res.json(task);
}

export function updateTask(req: Request, res: Response) {
  const { id } = req.params;
  // we need to validate the body
  const { name, status } = req.body as Task;

  const taskUpdate: Partial<Task> = {
    name,
    status,
  };

  taskEvents.emit(TASK_EVENTS.taskUpdate, id, taskUpdate);

  res.json({ success: true, message: 'Queued' });
}
