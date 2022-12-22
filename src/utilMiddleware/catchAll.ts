import { Request, Response } from 'express';

export const catchAll = (_req: Request, res: Response) =>
  res.status(404).send('Not Found');
