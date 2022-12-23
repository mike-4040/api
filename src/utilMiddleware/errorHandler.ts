import type { Request, Response, NextFunction } from 'express';

export class UserError extends Error {
  constructor(message: string, public status = 400) {
    super(message);
  }
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof UserError) {
    res.status(err.status).send({ success: false, message: err.message });
  } else {
    console.error(err);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
}
