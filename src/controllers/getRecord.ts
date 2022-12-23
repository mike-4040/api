import type { Response } from 'express';

import { dbClient } from '../datastore/dbClient';
import type { AuthedRequest } from '../types';

export function getRecord(req: AuthedRequest, res: Response) {
  const { id } = req.params;

  const record = dbClient.getRecordById(id);
  if (!record) {
    res.status(404).send({ success: false, message: 'Record not found' });
    return;
  }

  res.json(record);
}
