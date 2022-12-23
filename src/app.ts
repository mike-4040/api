import express from 'express';

import { appListening } from './helpers/appListening';
import { CONFIG } from './constants';
import { catchAll } from './utilMiddleware/catchAll';
import { getRecord } from './controllers/getRecord';
import { getTask, updateTask } from './controllers/task';
import { helloController } from './controllers/helloController';
import { logger } from './utilMiddleware/logger';
import { signUp, login } from './controllers/auth';
import { errorHandler } from './utilMiddleware/errorHandler';
import { authMiddleware } from './iam/auth';

express()
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(logger)
  .get('/', helloController)
  .post('/auth/login', login) 
  .post('/auth/signup', signUp)
  .use(authMiddleware) // all routes below will be protected
  .get('/record/:id', getRecord)
  .get('/task/:id', getTask)
  .patch('/task/:id', updateTask)
  .use('*', catchAll)
  .use(errorHandler)
  .listen(CONFIG.port, appListening);
