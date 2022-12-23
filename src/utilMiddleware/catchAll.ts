import { Request, Response } from 'express';

export const catchAll = (_req: Request, res: Response) =>
  res.status(404).json({ success: false, message: 'Resource Not found'});
