import express from 'express';

import { appListening } from './helpers/appListening';
import { CONFIG } from './constants';
import { catchAll } from './utilMiddleware/catchAll';
import { helloController } from './helloController';
import { logger } from './utilMiddleware/logger';


express()
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(logger)
  .get('/', helloController)
  .get('*', catchAll)
  .listen(CONFIG.port, appListening);
