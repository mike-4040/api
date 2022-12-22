import type { Request, Response } from 'express';

import { dbClient } from '../datastore/dbClient';

export function getRecord(req: Request, res: Response) {
  const { id } = req.params;

  const record = dbClient.getRecordById(id);
  if (!record) {
    res.status(404).send({ success: false, message: 'Record not found'});
    return;
  }

  res.json(record);
}
