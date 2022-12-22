import express from 'express';

import { appListening } from './helpers/appListening';
import { CONFIG } from './constants';
import { catchAll } from './utilMiddleware/catchAll';
import { getRecord } from './controllers/getRecord';
import { getTask, updateTask } from './controllers/task';
import { helloController } from './controllers/helloController';
import { logger } from './utilMiddleware/logger';

express()
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(logger)
  .get('/', helloController)
  .get('/record/:id', getRecord)
  .get('/task/:id', getTask)
  .patch('/task/:id', updateTask)
  .get('*', catchAll)
  .listen(CONFIG.port, appListening);
