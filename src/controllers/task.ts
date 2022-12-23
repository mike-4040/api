import type { Request, Response } from 'express';

import { dbClient } from '../datastore/dbClient';
import type { Task } from '../types';
import { taskEvents } from '../tasks/events';
import { TASK_EVENTS } from '../constants';
import { UserError } from '../utilMiddleware/errorHandler';

export function getTask(req: Request, res: Response) {
  const { id } = req.params;

  const task = dbClient.getTaskById(id);
  if (!task) {
    throw new UserError('Task not found', 404);
  }

  res.json({ task });
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

export function deleteTask(req: Request, res: Response) {
  const { id } = req.params;

  dbClient.deleteTask(id);

  res.json({ success: true });
}
