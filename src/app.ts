import express from 'express';

import { appListening } from './helpers/appListening';
import { CONFIG } from './constants';
import { catchAll } from './utilMiddleware/catchAll';
import { helloController } from './controllers/helloController';
import { logger } from './utilMiddleware/logger';
import { getRecord } from './controllers/getRecord';


express()
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(logger)
  .get('/', helloController)
  .get('/record/:id', getRecord)
  .get('*', catchAll)
  .listen(CONFIG.port, appListening);
