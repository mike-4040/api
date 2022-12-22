import { EventEmitter } from 'node:events';

import { taskUpdateHandler } from './eventHandlers';
import { TASK_EVENTS } from '../constants';

class TaskEvents extends EventEmitter {}

export const taskEvents = new TaskEvents();

// mount handlers to events
taskEvents.on(TASK_EVENTS.taskUpdate, taskUpdateHandler);
